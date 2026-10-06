import { pendingMigrations } from "../../scripts/migration-plan.mjs";

/** Which database backend is active. */
export type DbSource = "neon" | "sqlite";

// An empty/whitespace DATABASE_URL (an easy misconfig in deploy UIs) must mean
// "unset" — otherwise production would silently run on the PGLite fallback.
const rawDatabaseUrl =
  typeof process !== "undefined" ? process.env.DATABASE_URL : undefined;
const databaseUrl =
  rawDatabaseUrl && rawDatabaseUrl.trim() ? rawDatabaseUrl : undefined;

/**
 * Active backend: real **Neon** when `DATABASE_URL` is set, otherwise a file
 * SQLite database at `sqlite.db` (copied to `/tmp` on Vercel). Swap in Neon
 * later by setting `DATABASE_URL`; no app-query changes.
 */
export const dbSource: DbSource = databaseUrl ? "neon" : "sqlite";

/**
 * Minimal shared SQL surface, satisfied by both Neon and PGLite. Both the
 * tagged-template and `.query()` forms resolve to an array of row objects:
 *
 *   const sql = await getSql();
 *   const rows = await sql`select * from todos where id = ${id}`; // parameterized
 *   const rows2 = await sql.query("select * from todos where id = $1", [id]);
 */
export interface Sql {
  <T = Record<string, unknown>>(
    strings: TemplateStringsArray,
    ...values: unknown[]
  ): Promise<T[]>;
  query<T = Record<string, unknown>>(
    text: string,
    params?: unknown[],
  ): Promise<T[]>;
}

/**
 * Init state lives on globalThis as promises: dev HMR creates new instances of
 * this module, and two instances racing module-level state would open a second
 * pool or run two concurrent PGLite migration passes (whose duplicate
 * `_migrations` insert rejects — and would get memoized, poisoning every later
 * `getSql()`). A failed init clears its slot so the next call retries.
 */
const globalRef = globalThis as typeof globalThis & {
  __pgSqlPromise__?: Promise<Sql>;
  __sqliteInstance__?: import("node:sqlite").DatabaseSync;
};

function pgToSqliteDdl(sql: string): string {
  return sql
    .replace(/\btimestamptz\b/gi, "text")
    .replace(/\bboolean\b/gi, "integer")
    .replace(/\bnumeric\b/gi, "real")
    .replace(/\bdate\b/gi, "text")
    .replace(/default now\(\)/gi, "default (datetime('now'))")
    .replace(/CURRENT_TIMESTAMP/gi, "(datetime('now'))");
}

function pgToSqliteQuery(text: string): string {
  return text
    .replace(/::(?:int|integer|text|date|timestamptz|numeric|bool|boolean)\b/gi, "")
    .replace(/\bilike\b/gi, "like")
    .replace(/\bnow\(\)/gi, "datetime('now')")
    .replace(/\$(\d+)/g, "?");
}

function sqliteBind(params: unknown[]): unknown[] {
  return params.map((p) => {
    if (p === true) return 1;
    if (p === false) return 0;
    if (p === undefined) return null;
    return p;
  });
}

async function sqliteFilePath(): Promise<string> {
  const { join } = await import("node:path");
  if (process.env.VERCEL || process.env.SQLITE_PATH === "/tmp/solan.sqlite") {
    return "/tmp/solan.sqlite";
  }
  return process.env.SQLITE_PATH?.trim() || join(process.cwd(), "sqlite.db");
}

/**
 * Result-type parity: Postgres sends every value as text plus a type OID — the
 * JS value is the DRIVER's parsing choice, and pg and PGLite disagree (pg:
 * int8 -> string, date -> local-midnight Date; PGLite: int8 -> BigInt, which
 * JSON.stringify rejects, date -> UTC Date). Normalize both so preview and
 * production return identical, JSON-safe shapes:
 *   int8/bigint (incl. count(*)) -> number (past 2^53 loses precision — cast
 *                                   `::text` if you ever need huge integers)
 *   date                         -> 'YYYY-MM-DD' string
 *   interval                     -> Postgres interval text
 * numeric already comes back as a string on both (arbitrary precision).
 */
const OID_INT8 = 20;
const OID_DATE = 1082;
const OID_INTERVAL = 1186;
const identity = (v: string) => v;

type Run = <T>(text: string, params: unknown[]) => Promise<T[]>;

/** Wrap a query runner in the tagged-template + `.query()` `Sql` surface. */
function toSql(run: Run): Sql {
  const sql = (async <T = Record<string, unknown>>(
    strings: TemplateStringsArray,
    ...values: unknown[]
  ): Promise<T[]> => {
    // Rebuild with $1, $2, … placeholders so values stay parameterized.
    let text = strings[0];
    for (let i = 0; i < values.length; i += 1) text += `$${i + 1}${strings[i + 1]}`;
    return run<T>(text, values);
  }) as unknown as Sql;
  sql.query = <T = Record<string, unknown>>(text: string, params: unknown[] = []) =>
    run<T>(text, params);
  return sql;
}

function createNeonSql(): Promise<Sql> {
  globalRef.__pgSqlPromise__ ??= (async () => {
    // Regular Postgres driver: node-postgres (`pg`) — works directly with Neon's
    // pooled endpoint. One pool per process; warm serverless instances reuse it.
    const { Pool, types } = await import("pg");
    types.setTypeParser(OID_INT8, Number);
    types.setTypeParser(OID_DATE, identity);
    types.setTypeParser(OID_INTERVAL, identity);
    const pool = new Pool({ connectionString: databaseUrl });
    await pool.query(
      "create table if not exists _migrations (name text primary key, applied_at timestamptz not null default now())",
    );
    const migrations = import.meta.glob("/migrations/*.sql", {
      query: "?raw",
      import: "default",
      eager: true,
    }) as Record<string, string>;
    const doneRows = await pool.query<{ name: string }>("select name from _migrations");
    const done = doneRows.rows.map((r) => r.name);
    for (const { name, path } of pendingMigrations(Object.keys(migrations), done)) {
      const client = await pool.connect();
      try {
        await client.query("BEGIN");
        await client.query(migrations[path]);
        await client.query("insert into _migrations (name) values ($1)", [name]);
        await client.query("COMMIT");
      } catch (err) {
        try {
          await client.query("ROLLBACK");
        } catch {
          /* keep original */
        }
        throw err;
      } finally {
        client.release();
      }
    }
    return toSql(async <T>(text: string, params: unknown[]) => {
      const res = await pool.query(text, params);
      return res.rows as T[];
    });
  })().catch((err) => {
    globalRef.__pgSqlPromise__ = undefined;
    throw err;
  });
  return globalRef.__pgSqlPromise__;
}

async function createSqliteSql(): Promise<Sql> {
  const { DatabaseSync } = await import("node:sqlite");
  if (!globalRef.__sqliteInstance__) {
    const db = new DatabaseSync(await sqliteFilePath());
    db.exec("PRAGMA journal_mode = WAL;");
    db.exec("PRAGMA busy_timeout = 5000;");
    db.exec("PRAGMA foreign_keys = ON;");
    db.exec(
      "create table if not exists _migrations (name text primary key, applied_at text not null default (datetime('now')))",
    );
    const migrations = import.meta.glob("/migrations/*.sql", {
      query: "?raw",
      import: "default",
      eager: true,
    }) as Record<string, string>;
    const done = db.prepare("select name from _migrations").all() as { name: string }[];
    const doneNames = done.map((r) => r.name);
    for (const { name, path } of pendingMigrations(Object.keys(migrations), doneNames)) {
      db.exec("BEGIN");
      try {
        db.exec(pgToSqliteDdl(migrations[path]));
        db.prepare("insert into _migrations (name) values (?)").run(name);
        db.exec("COMMIT");
      } catch (err) {
        db.exec("ROLLBACK");
        throw err;
      }
    }
    globalRef.__sqliteInstance__ = db;
  }
  const db = globalRef.__sqliteInstance__;

  return toSql(async <T>(text: string, params: unknown[]) => {
    const sqliteSql = pgToSqliteQuery(text);
    const bound = sqliteBind(params);
    const isQuery = /^\s*(select|pragma|with)\b/i.test(sqliteSql) || /\breturning\b/i.test(sqliteSql);
    const stmt = db.prepare(sqliteSql);
    if (isQuery) {
      const rows = (bound.length ? stmt.all(...(bound as never[])) : stmt.all()) as T[];
      return rows.map((row) => {
        const out: Record<string, unknown> = {};
        for (const [k, v] of Object.entries(row as object)) {
          if (typeof v === "bigint") out[k] = Number(v);
          else if (
            (v === 0 || v === 1) &&
            /^(is_|show_|allowed|emailVerified|payment_required)/i.test(k)
          ) {
            out[k] = Boolean(v);
          } else out[k] = v;
        }
        return out as T;
      });
    }
    bound.length ? stmt.run(...(bound as never[])) : stmt.run();
    return [] as T[];
  });
}

let sqlPromise: Promise<Sql> | null = null;

async function createSql(): Promise<Sql> {
  if (typeof window !== "undefined") {
    throw new Error(
      "@/lib/db is server-only — call getSql() from a createServerFn handler " +
        "or a server route loader, never from client code.",
    );
  }
  return dbSource === "neon" ? createNeonSql() : createSqliteSql();
}

/**
 * Get the shared, **server-only** SQL client. Neon when `DATABASE_URL` is set,
 * otherwise file SQLite (`sqlite.db`). Memoized — safe to call per request.
 *
 * Schema comes from `migrations/*.sql`, auto-applied before the first query on
 * both backends — define tables there, never inline in server functions.
 */
export function getSql(): Promise<Sql> {
  sqlPromise ??= createSql().catch((err) => {
    sqlPromise = null; // don't memoize failures — let the next call retry
    throw err;
  });
  return sqlPromise;
}

/**
 * Shared SQLite handle (preview / Vercel fallback). Throws when DATABASE_URL is set.
 */
export async function getSqlite(): Promise<import("node:sqlite").DatabaseSync> {
  if (dbSource !== "sqlite") {
    throw new Error("getSqlite() is only available when DATABASE_URL is unset");
  }
  await getSql();
  const db = globalRef.__sqliteInstance__;
  if (!db) throw new Error("SQLite instance failed to initialize");
  return db;
}

/** @deprecated PGLite replaced by sqlite.db — kept so old imports compile. */
export async function getPglite(): Promise<never> {
  throw new Error("PGLite fallback was replaced by sqlite.db");
}

/**
 * Finish DB bootstrap before the server handles traffic.
 *
 * - **PGLite** (preview / no `DATABASE_URL`): open the in-memory DB and apply
 *   `migrations/*.sql`. Idempotent — concurrent callers share one promise.
 * - **Neon**: no-op (pool is created lazily on first query).
 *
 * Vite `configureServer` awaits this at dev startup; production imports of this
 * module kick it off immediately (see bottom of file).
 */
export function ensureDbReady(): Promise<void> {
  return getSql().then(() => undefined);
}

// Server-only eager start: kick PGLite bootstrap as soon as this module loads in
// Node. Client bundles never hit this path (`getSql` throws in the browser).
const globalBoot = globalThis as typeof globalThis & {
  __pgBootstrapPromise__?: Promise<void>;
};
if (typeof window === "undefined" && dbSource === "sqlite") {
  globalBoot.__pgBootstrapPromise__ ??= ensureDbReady().catch((err) => {
    globalBoot.__pgBootstrapPromise__ = undefined;
    console.error("[db] SQLite bootstrap failed:", err);
    throw err;
  });
}
