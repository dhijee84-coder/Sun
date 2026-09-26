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
          return Response.json({
            ok: true,
            db: dbSource,
            users: users[0]?.n ?? 0,
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
