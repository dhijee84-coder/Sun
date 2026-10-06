import { createFileRoute } from "@tanstack/react-router";
import { dbSource, getSql } from "@/lib/db";
import { ensureSeeded } from "@/lib/solan/seed";

export const Route = createFileRoute("/api/health")({
  server: {
    handlers: {
      GET: async () => {
        try {
          await ensureSeeded();
          const sql = await getSql();
          const users = await sql<{ n: number }>`select count(*)::int as n from "user"`;
          const vercel = Boolean(process.env.VERCEL);
          return Response.json({
            ok: true,
            db: dbSource,
            users: users[0]?.n ?? 0,
            vercel,
            loginReady: true,
            hint:
              vercel && dbSource !== "neon"
                ? "Using sqlite.db until DATABASE_URL (Neon) is set. Sessions persist on this instance; attach Neon for a live shared database."
                : undefined,
          });
        } catch (err) {
          console.error("[solan] health failed", err);
          return Response.json(
            { ok: false, error: err instanceof Error ? err.message : "health failed" },
            { status: 500 },
          );
        }
      },
    },
  },
});