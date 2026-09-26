import { createServerFn } from "@tanstack/react-start";
import { getSql } from "@/lib/db";
import { authMiddleware } from "@/lib/auth/middleware";
import { ALL_PERMISSIONS, CLAIM_TRANSITIONS, canManageRole, type Role } from "./permissions";
import { csvCell, nid, warrantyStatus } from "./ids";
import { assertPerm, assertStaff, audit, loadProfile, type Profile } from "./profile";
import { ensureSeeded } from "./seed";

async function staffOf(userId: string) {
  await ensureSeeded();
  const sql = await getSql();
  const u = await sql<{ email: string | null; name: string }>`select email, name from "user" where id = ${userId}`;
  const profile = await loadProfile(userId, u[0]?.email, u[0]?.name);
  assertStaff(profile);
  return { sql, profile };
}

export const getStaffDashboard = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    const { sql, profile } = await staffOf(context.userId);
    const [c] = await sql<{ n: number }>`select count(*)::int as n from client_profiles`;
    const [p] = await sql<{ n: number }>`select count(*)::int as n from panels`;
    const [a] = await sql<{ n: number }>`select count(*)::int as n from panels where status in ('ALLOCATED','INSTALLED')`;
    const [t] = await sql<{ n: number }>`select count(*)::int as n from support_tickets where status not in ('CLOSED','RESOLVED')`;
    const [w] = await sql<{ n: number }>`select count(*)::int as n from warranty_claims where status not in ('CLOSED','REJECTED')`;
    const [e] = await sql<{ n: number }>`select count(*)::int as n from enquiries where status = 'NEW'`;
    return { me: profile, clients: c.n, panels: p.n, allocated: a.n, openTickets: t.n, openClaims: w.n, newEnquiries: e.n };
  });

export const listClients = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    const { sql, profile } = await staffOf(context.userId);
    assertPerm(profile, "clients.view");
    return sql<{
      id: string; user_id: string; full_name: string; email: string | null; phone: string | null;
      kyc_status: string; city: string; onboarding_stage: string; panels: number;
    }>`select c.id, c.user_id, p.full_name, p.email, p.phone, c.kyc_status, c.city, c.onboarding_stage,
              (select count(*)::int from panels x where x.client_id = c.id) as panels
       from client_profiles c join profiles p on p.user_id = c.user_id
       order by c.created_at desc`;
  });

export const listProjects = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    const { sql, profile } = await staffOf(context.userId);
    assertPerm(profile, "projects.view");
    return sql<{
      id: string; project_code: string; project_name: string; location: string; status: string;
      total_panels: number; is_public: boolean; available: number;
    }>`select id, project_code, project_name, location, status, total_panels, is_public,
              (select count(*)::int from panels x where x.project_id = projects.id and x.status = 'AVAILABLE') as available
       from projects order by project_code`;
  });

export const toggleProjectPublic = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((id: string) => id)
  .handler(async ({ context, data }) => {
    const { sql, profile } = await staffOf(context.userId);
    assertPerm(profile, "projects.edit");
    await sql`update projects set is_public = not is_public where id = ${data}`;
    await audit(profile.userId, "PROJECT_PUBLIC_TOGGLE", "project", data, "");
    return { ok: true };
  });

export const allocatePanels = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((d: { projectId: string; clientId: string; count: number }) => d)
  .handler(async ({ context, data }) => {
    const { sql, profile } = await staffOf(context.userId);
    assertPerm(profile, "panels.allocate");
    const n = Math.max(1, Math.min(50, Number(data.count) || 1));
    const avail = await sql<{ id: string }>`
      select id from panels where project_id = ${data.projectId} and status = 'AVAILABLE' order by added_sequence limit ${n}`;
    if (avail.length < n) throw new Error(`Only ${avail.length} panels available`);
    const start = new Date();
    const iso = start.toISOString().slice(0, 10);
    const end = new Date(start);
    end.setFullYear(end.getFullYear() + 25);
    const endIso = end.toISOString().slice(0, 10);
    for (const p of avail) {
      await sql`update panels set status = 'ALLOCATED', client_id = ${data.clientId},
        purchase_date = ${iso}, warranty_start_date = ${iso}, warranty_end_date = ${endIso}
        where id = ${p.id}`;
    }
    const existing = await sql<{ id: string }>`select id from client_projects where client_id = ${data.clientId}`;
    if (existing.length) {
      await sql`update client_projects set allocated_panel_count = allocated_panel_count + ${n},
        allocated_capacity_kw = allocated_capacity_kw + ${n * 0.4} where client_id = ${data.clientId}`;
    } else {
      await sql`insert into client_projects (id, client_id, project_id, allocated_panel_count, allocated_capacity_kw)
        values (${nid("CP")}, ${data.clientId}, ${data.projectId}, ${n}, ${n * 0.4})`;
    }
    await audit(profile.userId, "PANEL_ALLOCATE", "client", data.clientId, `${n} panels`);
    return { allocated: n };
  });

export const listClaims = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    const { sql, profile } = await staffOf(context.userId);
    assertPerm(profile, "warranty.view");
    const [setting] = await sql<{ value: string }>`select value from system_settings where key = 'warranty_expiring_days'`;
    const days = Number(setting?.value || 90);
    const claims = await sql<{
      id: string; issue: string; details: string; status: string; created_at: string;
      serial_number: string; client_id: string; panel_id: string; full_name: string;
    }>`select c.id, c.issue, c.details, c.status, c.created_at::text, p.serial_number, c.client_id, c.panel_id, pr.full_name
       from warranty_claims c
       join panels p on p.id = c.panel_id
       join client_profiles cp on cp.id = c.client_id
       join profiles pr on pr.user_id = cp.user_id
       order by c.created_at desc`;
    return { claims, days, transitions: CLAIM_TRANSITIONS };
  });

export const transitionClaim = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((d: { claimId: string; status: string }) => d)
  .handler(async ({ context, data }) => {
    const { sql, profile } = await staffOf(context.userId);
    assertPerm(profile, "warranty.claims.manage");
    const [c] = await sql<{ status: string; panel_id: string; client_id: string }>`
      select status, panel_id, client_id from warranty_claims where id = ${data.claimId}`;
    if (!c) throw new Error("Claim not found");
    const allowed = CLAIM_TRANSITIONS[c.status] || [];
    if (!allowed.includes(data.status)) throw new Error(`Cannot move ${c.status} → ${data.status}`);
    await sql`update warranty_claims set status = ${data.status}, updated_at = now() where id = ${data.claimId}`;
    if (data.status === "REPLACED" || data.status === "REPAIRED" || data.status === "CLOSED") {
      await sql`update panels set status = 'INSTALLED' where id = ${c.panel_id}`;
    }
    const [cp] = await sql<{ user_id: string }>`select user_id from client_profiles where id = ${c.client_id}`;
    if (cp) {
      await sql`insert into notifications (id, user_id, title, message, kind)
        values (${nid("NTF")}, ${cp.user_id}, 'Warranty claim updated', ${`Status is now ${data.status.replace(/_/g, " ")}.`}, 'WARRANTY')`;
    }
    await audit(profile.userId, "WARRANTY_TRANSITION", "warranty_claim", data.claimId, `${c.status}->${data.status}`);
    return { ok: true };
  });

export const listTickets = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    const { sql } = await staffOf(context.userId);
    const tickets = await sql<{
      id: string; subject: string; category: string; description: string; status: string; priority: string;
      created_at: string; full_name: string;
    }>`select t.id, t.subject, t.category, t.description, t.status, t.priority, t.created_at::text, p.full_name
       from support_tickets t
       join client_profiles c on c.id = t.client_id
       join profiles p on p.user_id = c.user_id
       order by t.created_at desc`;
    const replies = await sql<{ ticket_id: string; body: string; created_at: string }>`
      select ticket_id, body, created_at::text from ticket_replies order by created_at`;
    return tickets.map((t) => ({ ...t, replies: replies.filter((r) => r.ticket_id === t.id) }));
  });

export const staffReplyTicket = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((d: { ticketId: string; body: string; status?: string }) => d)
  .handler(async ({ context, data }) => {
    const { sql, profile } = await staffOf(context.userId);
    await sql`insert into ticket_replies (id, ticket_id, author_user_id, body)
      values (${nid("RPL")}, ${data.ticketId}, ${profile.userId}, ${data.body.trim()})`;
    if (data.status) await sql`update support_tickets set status = ${data.status} where id = ${data.ticketId}`;
    else await sql`update support_tickets set status = 'IN_PROGRESS' where id = ${data.ticketId}`;
    return { ok: true };
  });

export const listPayments = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    const { sql, profile } = await staffOf(context.userId);
    assertPerm(profile, "payments.view");
    return sql<{ id: string; amount: string; status: string; payment_method: string; created_at: string; full_name: string }>`
      select pay.id, pay.amount::text, pay.status, pay.payment_method, pay.created_at::text, p.full_name
      from payments pay
      join client_profiles c on c.id = pay.client_id
      join profiles p on p.user_id = c.user_id
      order by pay.created_at desc`;
  });

export const recordPayment = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((d: { clientId: string; amount: number; method: string }) => d)
  .handler(async ({ context, data }) => {
    const { sql, profile } = await staffOf(context.userId);
    assertPerm(profile, "payments.create");
    const id = nid("PAY");
    await sql`insert into payments (id, client_id, amount, payment_method, status, paid_at, transaction_reference)
      values (${id}, ${data.clientId}, ${data.amount}, ${data.method || "UPI"}, 'SUCCESS', now(), ${id})`;
    await audit(profile.userId, "PAYMENT_RECORD", "payment", id, String(data.amount));
    return { id };
  });

export const listEnquiries = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    const { sql, profile } = await staffOf(context.userId);
    assertPerm(profile, "enquiries.view");
    return sql<{ id: string; name: string; email: string; phone: string; message: string; status: string; created_at: string }>`
      select id, name, email, phone, message, status, created_at::text from enquiries order by created_at desc`;
  });

export const setEnquiryStatus = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((d: { id: string; status: string }) => d)
  .handler(async ({ context, data }) => {
    const { sql, profile } = await staffOf(context.userId);
    assertPerm(profile, "enquiries.manage");
    await sql`update enquiries set status = ${data.status} where id = ${data.id}`;
    return { ok: true };
  });

export const listStaffUsers = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    const { sql, profile } = await staffOf(context.userId);
    assertPerm(profile, "users.view");
    return sql<{ user_id: string; role: Role; full_name: string; email: string | null; is_active: boolean }>`
      select user_id, role, full_name, email, is_active from profiles where role != 'CLIENT' order by role, full_name`;
  });

export const setStaffRole = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((d: { userId: string; role: Role }) => d)
  .handler(async ({ context, data }) => {
    const { sql, profile } = await staffOf(context.userId);
    const [target] = await sql<{ role: Role }>`select role from profiles where user_id = ${data.userId}`;
    if (!target) throw new Error("User not found");
    if (!canManageRole(profile.role, target.role) || !canManageRole(profile.role, data.role)) {
      throw new Error("You cannot manage that role");
    }
    await sql`update profiles set role = ${data.role} where user_id = ${data.userId}`;
    await audit(profile.userId, "STAFF_ROLE", "profile", data.userId, data.role);
    return { ok: true };
  });

export const getPermissionMatrix = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    const { sql, profile } = await staffOf(context.userId);
    assertPerm(profile, "roles.view");
    const rows = await sql<{ role: Role; code: string; allowed: boolean }>`select role, code, allowed from role_permissions`;
    const matrix: Record<string, Record<string, boolean>> = {};
    for (const code of ALL_PERMISSIONS) {
      matrix[code] = { CLIENT: false, ADMIN: false, SUPER_ADMIN: false, PRIMARY_ADMIN: true };
    }
    for (const r of rows) {
      if (!matrix[r.code]) matrix[r.code] = { CLIENT: false, ADMIN: false, SUPER_ADMIN: false, PRIMARY_ADMIN: true };
      matrix[r.code][r.role] = r.allowed;
    }
    return { permissions: ALL_PERMISSIONS, matrix };
  });

export const setPermission = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((d: { role: Role; code: string; allowed: boolean }) => d)
  .handler(async ({ context, data }) => {
    const { sql, profile } = await staffOf(context.userId);
    assertPerm(profile, "roles.manage");
    if (data.role === "PRIMARY_ADMIN") throw new Error("Primary Admin always has every permission");
    await sql`insert into role_permissions (role, code, allowed) values (${data.role}, ${data.code}, ${data.allowed})
      on conflict (role, code) do update set allowed = ${data.allowed}`;
    await audit(profile.userId, "PERM_SET", "role_permission", data.role, `${data.code}=${data.allowed}`);
    return { ok: true };
  });

export const getCms = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    const { sql, profile } = await staffOf(context.userId);
    assertPerm(profile, "website.settings");
    const content = await sql<{ key: string; value: string }>`select key, value from website_content`;
    const faqs = await sql<{ id: string; question: string; answer: string; is_published: boolean; sort_order: number }>`
      select id, question, answer, is_published, sort_order from faqs order by sort_order`;
    const anns = await sql<{ id: string; title: string; message: string; is_active: boolean; cta_text: string; cta_url: string }>`
      select id, title, message, is_active, cta_text, cta_url from announcements order by created_at desc`;
    const settings = await sql<{ key: string; value: string }>`select key, value from system_settings`;
    return { content, faqs, anns, settings };
  });

export const saveContent = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((d: { key: string; value: string }) => d)
  .handler(async ({ context, data }) => {
    const { sql, profile } = await staffOf(context.userId);
    assertPerm(profile, "website.settings");
    await sql`insert into website_content (key, value) values (${data.key}, ${data.value})
      on conflict (key) do update set value = ${data.value}`;
    await audit(profile.userId, "CMS_SAVE", "website_content", data.key, "");
    return { ok: true };
  });

export const saveSetting = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((d: { key: string; value: string }) => d)
  .handler(async ({ context, data }) => {
    const { sql, profile } = await staffOf(context.userId);
    assertPerm(profile, "system.settings");
    await sql`insert into system_settings (key, value) values (${data.key}, ${data.value})
      on conflict (key) do update set value = ${data.value}`;
    await audit(profile.userId, "SETTING_SAVE", "system_settings", data.key, data.value);
    return { ok: true };
  });

export const saveFaq = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((d: { id?: string; question: string; answer: string }) => d)
  .handler(async ({ context, data }) => {
    const { sql, profile } = await staffOf(context.userId);
    assertPerm(profile, "faqs.manage");
    if (data.id) {
      await sql`update faqs set question = ${data.question}, answer = ${data.answer} where id = ${data.id}`;
    } else {
      await sql`insert into faqs (id, question, answer, sort_order) values (${nid("FAQ")}, ${data.question}, ${data.answer}, 99)`;
    }
    return { ok: true };
  });

export const listAudit = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    const { sql, profile } = await staffOf(context.userId);
    assertPerm(profile, "audit_logs.view");
    return sql<{ id: string; action: string; entity: string; entity_id: string; detail: string; created_at: string; actor: string | null }>`
      select a.id, a.action, a.entity, a.entity_id, a.detail, a.created_at::text, p.full_name as actor
      from audit_logs a left join profiles p on p.user_id = a.actor_user_id
      order by a.created_at desc limit 200`;
  });

export const listDocuments = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    const { sql, profile } = await staffOf(context.userId);
    assertPerm(profile, "documents.view");
    return sql<{ id: string; document_type: string; original_filename: string; status: string; full_name: string }>`
      select d.id, d.document_type, d.original_filename, d.status, p.full_name
      from documents d join client_profiles c on c.id = d.client_id join profiles p on p.user_id = c.user_id
      order by d.uploaded_at desc`;
  });

export const verifyDocument = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((d: { id: string; status: string }) => d)
  .handler(async ({ context, data }) => {
    const { sql, profile } = await staffOf(context.userId);
    assertPerm(profile, "documents.verify");
    await sql`update documents set status = ${data.status} where id = ${data.id}`;
    return { ok: true };
  });

export const exportCsv = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .validator((kind: "clients" | "payments" | "panels" | "claims") => kind)
  .handler(async ({ context, data }) => {
    const { sql, profile } = await staffOf(context.userId);
    assertPerm(profile, "reports.export");
    let header: string[] = [];
    let rows: string[][] = [];
    if (data === "clients") {
      header = ["name", "email", "phone", "kyc", "city", "panels"];
      const r = await listLike(sql, `select p.full_name, p.email, p.phone, c.kyc_status, c.city,
        (select count(*)::int from panels x where x.client_id = c.id)::text as panels
        from client_profiles c join profiles p on p.user_id = c.user_id`);
      rows = r.map((x) => Object.values(x).map((v) => String(v ?? "")));
    } else if (data === "payments") {
      header = ["id", "amount", "status", "method", "client"];
      const r = await listLike(sql, `select pay.id, pay.amount::text, pay.status, pay.payment_method, p.full_name
        from payments pay join client_profiles c on c.id = pay.client_id join profiles p on p.user_id = c.user_id`);
      rows = r.map((x) => Object.values(x).map((v) => String(v ?? "")));
    } else if (data === "panels") {
      header = ["serial", "status", "project", "client", "warranty_end", "warranty_status"];
      const [setting] = await sql<{ value: string }>`select value from system_settings where key = 'warranty_expiring_days'`;
      const days = Number(setting?.value || 90);
      const r = await sql<{ serial_number: string; status: string; project_code: string; client: string | null; warranty_end_date: string | null }>`
        select pn.serial_number, pn.status, pr.project_code, pf.full_name as client, pn.warranty_end_date
        from panels pn join projects pr on pr.id = pn.project_id
        left join client_profiles cp on cp.id = pn.client_id
        left join profiles pf on pf.user_id = cp.user_id
        order by pn.serial_number`;
      rows = r.map((x) => [x.serial_number, x.status, x.project_code, x.client || "", x.warranty_end_date || "", warrantyStatus(x.warranty_end_date, days)]);
    } else {
      header = ["id", "serial", "issue", "status", "client"];
      const r = await sql<{ id: string; serial_number: string; issue: string; status: string; full_name: string }>`
        select c.id, p.serial_number, c.issue, c.status, pr.full_name
        from warranty_claims c join panels p on p.id = c.panel_id
        join client_profiles cp on cp.id = c.client_id join profiles pr on pr.user_id = cp.user_id`;
      rows = r.map((x) => [x.id, x.serial_number, x.issue, x.status, x.full_name]);
    }
    const csv = [header.map(csvCell).join(","), ...rows.map((row) => row.map(csvCell).join(","))].join("\n");
    await audit(profile.userId, "CSV_EXPORT", "report", data, `${rows.length} rows`);
    return { filename: `solan-${data}.csv`, csv };
  });

async function listLike(sql: Awaited<ReturnType<typeof getSql>>, q: string) {
  return sql.query<Record<string, unknown>>(q);
}

export const staffNotify = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((d: { userId: string; title: string; message: string }) => d)
  .handler(async ({ context, data }) => {
    const { sql, profile } = await staffOf(context.userId);
    assertPerm(profile, "notifications.create");
    await sql`insert into notifications (id, user_id, title, message)
      values (${nid("NTF")}, ${data.userId}, ${data.title}, ${data.message})`;
    return { ok: true };
  });

export const listServicesAdmin = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    const { sql, profile } = await staffOf(context.userId);
    assertPerm(profile, "clients.services.view");
    const catalog = await sql<{ id: string; name: string; description: string; base_price: string; is_active: boolean }>`
      select id, name, description, base_price::text, is_active from services order by name`;
    const reqs = await sql<{ id: string; status: string; quoted_price: string | null; name: string; full_name: string }>`
      select r.id, r.status, r.quoted_price::text, s.name, p.full_name
      from service_requests r join services s on s.id = r.service_id
      join client_profiles c on c.id = r.client_id join profiles p on p.user_id = c.user_id
      order by r.created_at desc`;
    return { catalog, reqs };
  });

export const quoteService = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((d: { id: string; status: string; price?: number }) => d)
  .handler(async ({ context, data }) => {
    const { sql, profile } = await staffOf(context.userId);
    assertPerm(profile, "clients.services.manage");
    await sql`update service_requests set status = ${data.status}, quoted_price = ${data.price ?? null} where id = ${data.id}`;
    return { ok: true };
  });

export const saveAnnouncement = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((d: { id?: string; title: string; message: string; cta_text?: string; cta_url?: string; is_active?: boolean }) => d)
  .handler(async ({ context, data }) => {
    const { sql, profile } = await staffOf(context.userId);
    assertPerm(profile, "website.settings");
    if (data.id) {
      await sql`update announcements set title = ${data.title}, message = ${data.message},
        cta_text = ${data.cta_text || ""}, cta_url = ${data.cta_url || ""}, is_active = ${data.is_active ?? true}
        where id = ${data.id}`;
    } else {
      await sql`insert into announcements (id, title, message, cta_text, cta_url, is_active)
        values (${nid("ANN")}, ${data.title}, ${data.message}, ${data.cta_text || ""}, ${data.cta_url || ""}, ${data.is_active ?? true})`;
    }
    await audit(profile.userId, "ANN_SAVE", "announcement", data.id || "new", data.title);
    return { ok: true };
  });

export type { Profile };
