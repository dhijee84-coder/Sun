/**
 * Kysely dialect for Better Auth over Node's built-in SQLite (node:sqlite).
 */
import type { DatabaseSync } from "node:sqlite";
import {
  CompiledQuery,
  type DatabaseConnection,
  type DatabaseIntrospector,
  type Dialect,
  type Driver,
  type Kysely,
  type QueryCompiler,
  type QueryResult,
  type TransactionSettings,
  SqliteAdapter,
  SqliteIntrospector,
  SqliteQueryCompiler,
} from "kysely";

type Client = DatabaseSync;

export function sqliteDialect(
  getClient: () => Promise<Client> | Client,
): Dialect {
  return {
    createAdapter: () => new SqliteAdapter(),
    createDriver: () => new LazySqliteDriver(getClient),
    createQueryCompiler: (): QueryCompiler => new SqliteQueryCompiler(),
    createIntrospector: (db: Kysely<unknown>): DatabaseIntrospector =>
      new SqliteIntrospector(db),
  };
}

function bind(params: readonly unknown[]): unknown[] {
  return params.map((p) => {
    if (p === true) return 1;
    if (p === false) return 0;
    if (p === undefined) return null;
    return p;
  });
}

class LazySqliteDriver implements Driver {
  private client: Client | undefined;

  constructor(private readonly getClient: () => Promise<Client> | Client) {}

  async init(): Promise<void> {
    this.client = await this.getClient();
  }

  async acquireConnection(): Promise<DatabaseConnection> {
    if (this.client === undefined) this.client = await this.getClient();
    return new SqliteConnection(this.client);
  }

  async releaseConnection(_connection: DatabaseConnection): Promise<void> {}

  async beginTransaction(conn: DatabaseConnection, _settings: TransactionSettings): Promise<void> {
    await (conn as SqliteConnection).executeQuery(CompiledQuery.raw("begin"));
  }

  async commitTransaction(conn: DatabaseConnection): Promise<void> {
    await (conn as SqliteConnection).executeQuery(CompiledQuery.raw("commit"));
  }

  async rollbackTransaction(conn: DatabaseConnection): Promise<void> {
    await (conn as SqliteConnection).executeQuery(CompiledQuery.raw("rollback"));
  }

  async destroy(): Promise<void> {
    this.client = undefined;
  }
}

class SqliteConnection implements DatabaseConnection {
  constructor(private readonly client: Client) {}

  async executeQuery<O>(compiledQuery: CompiledQuery): Promise<QueryResult<O>> {
    const sql = compiledQuery.sql.trim();
    const params = bind(compiledQuery.parameters);
    const upper = sql.slice(0, 12).toUpperCase();
    if (upper.startsWith("BEGIN") || upper.startsWith("COMMIT") || upper.startsWith("ROLLBACK") || upper.startsWith("END")) {
      this.client.exec(sql);
      return { rows: [] };
    }
    const stmt = this.client.prepare(sql);
    const isQuery = /^\s*(select|pragma|with)\b/i.test(sql) || /\breturning\b/i.test(sql);
    if (isQuery) {
      const rows = (params.length ? stmt.all(...(params as never[])) : stmt.all()) as O[];
      const mapped = rows.map((row) => {
        const out: Record<string, unknown> = { ...(row as object) };
        for (const [k, v] of Object.entries(out)) {
          if (
            (v === 0 || v === 1) &&
            /^(is_|show_|allowed|emailVerified)/i.test(k)
          ) {
            out[k] = Boolean(v);
          }
        }
        return out as O;
      });
      return { rows: mapped };
    }
    const info = params.length ? stmt.run(...(params as never[])) : stmt.run();
    return {
      numAffectedRows: BigInt(info.changes ?? 0),
      rows: [] as O[],
    };
  }

  async *streamQuery<O>(
    compiledQuery: CompiledQuery,
    chunkSize: number,
  ): AsyncIterableIterator<QueryResult<O>> {
    const result = await this.executeQuery<O>(compiledQuery);
    for (let i = 0; i < result.rows.length; i += chunkSize) {
      yield { rows: result.rows.slice(i, i + chunkSize) };
    }
  }
}
