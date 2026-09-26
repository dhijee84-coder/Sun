import { createServerFn } from "@tanstack/react-start";
import { getSql } from "@/lib/db";
import { authMiddleware } from "@/lib/auth/middleware";
import { DEFAULT_ROLE_PERMS, isStaff, type Role } from "./permissions";
import { nid, roleForEmail } from "./ids";
import { ensureSeeded } from "./seed";

export type Profile = {
  userId: string;
  role: Role;
  fullName: string;
  email: string | null;
  phone: string | null;
  permissions: string[];
  clientId: string | null;
};

export async function loadProfile(userId: string, email?: string | null, name?: string | null): Promise<Profile> {
  await ensureSeeded();
  const sql = await getSql();
  let rows = await sql<{ user_id: string; role: Role; full_name: string; email: string | null; phone: string | null }>`
    select user_id, role, full_name, email, phone from profiles where user_id = ${userId}`;
  if (!rows.length) {
    const role = roleForEmail(email);
    await sql`insert into profiles (user_id, role, full_name, email)
      values (${userId}, ${role}, ${name || "Solan user"}, ${email || null})
      on conflict (user_id) do nothing`;
    if (role === "CLIENT") {
      await sql`insert into client_profiles (id, user_id, kyc_status, onboarding_stage)
        values (${nid("C")}, ${userId}, 'PENDING', 'REGISTERED')
        on conflict (user_id) do nothing`;
    }
    rows = await sql`select user_id, role, full_name, email, phone from profiles where user_id = ${userId}`;
  }
  const p = rows[0];
  const client = await sql<{ id: string }>`select id from client_profiles where user_id = ${userId}`;
  const permRows = await sql<{ code: string }>`
    select code from role_permissions where role = ${p.role} and allowed = true`;
  const permissions = permRows.length
    ? permRows.map((r) => r.code)
    : [...(DEFAULT_ROLE_PERMS[p.role] || [])];
  return {
    userId: p.user_id,
    role: p.role,
    fullName: p.full_name,
    email: p.email,
    phone: p.phone,
    permissions,
    clientId: client[0]?.id ?? null,
  };
}

export function assertPerm(profile: Profile, code: string) {
  if (profile.role === "PRIMARY_ADMIN") return;
  if (!profile.permissions.includes(code)) {
    const err = new Error("Forbidden");
    (err as Error & { status?: number }).status = 403;
    throw err;
  }
}

export function assertStaff(profile: Profile) {
  if (!isStaff(profile.role)) {
    const err = new Error("Forbidden");
    (err as Error & { status?: number }).status = 403;
    throw err;
  }
}

export const getMe = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    const sql = await getSql();
    const u = await sql<{ email: string | null; name: string }>`
      select email, name from "user" where id = ${context.userId}`;
    return loadProfile(context.userId, u[0]?.email, u[0]?.name);
  });

export async function audit(actorId: string | null, action: string, entity: string, entityId: string, detail: string) {
  const sql = await getSql();
  await sql`insert into audit_logs (id, actor_user_id, action, entity, entity_id, detail)
    values (${nid("AUD")}, ${actorId}, ${action}, ${entity}, ${entityId}, ${detail})`;
}
