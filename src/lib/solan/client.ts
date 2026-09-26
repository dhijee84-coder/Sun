import { createServerFn } from "@tanstack/react-start";
import { getSql } from "@/lib/db";
import { authMiddleware } from "@/lib/auth/middleware";
import { CLAIM_TRANSITIONS } from "./permissions";
import { nid, warrantyStatus } from "./ids";
import { audit, loadProfile } from "./profile";
import { ensureSeeded } from "./seed";

async function clientOf(userId: string) {
  await ensureSeeded();
  const sql = await getSql();
  const u = await sql<{ email: string | null; name: string }>`select email, name from "user" where id = ${userId}`;
  const profile = await loadProfile(userId, u[0]?.email, u[0]?.name);
  if (profile.role !== "CLIENT" || !profile.clientId) {
    const err = new Error("Forbidden");
    (err as Error & { status?: number }).status = 403;
    throw err;
  }
  return { sql, profile, clientId: profile.clientId };
}

export const getClientOverview = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    const { sql, profile, clientId } = await clientOf(context.userId);
    const [cp] = await sql<{
      id: string; kyc_status: string; pan_number: string | null; pan_name: string | null;
      aadhaar_masked: string | null; onboarding_stage: string; address: string; city: string;
      state: string; pincode: string; show_generation: boolean; show_payments: boolean;
      show_project: boolean; show_panels: boolean; show_documents: boolean; show_services: boolean;
      show_support: boolean; show_notifications: boolean;
    }>`select * from client_profiles where id = ${clientId}`;
    const [ec] = await sql<{
      rr_number: string | null;
      discom: string | null;
      service_address: string | null;
      avg_monthly_units: string | null;
    }>`select rr_number, discom, service_address, avg_monthly_units::text as avg_monthly_units
       from electricity_connections where client_id = ${clientId}`;
    const [proj] = await sql<{
      allocated_panel_count: number; allocated_capacity_kw: string; contract_total: string;
      project_name: string; location: string; project_code: string;
    }>`select cp.allocated_panel_count, cp.allocated_capacity_kw::text, cp.contract_total::text,
              p.project_name, p.location, p.project_code
       from client_projects cp join projects p on p.id = cp.project_id where cp.client_id = ${clientId}`;
    const stages = await sql<{
      id: string; stage_number: number; stage_name: string; percentage: string; status: string;
      payment_required: boolean; payment_status: string;
    }>`select id, stage_number, stage_name, percentage::text, status, payment_required, payment_status
       from project_stages where client_id = ${clientId} order by stage_number`;
    const unread = await sql<{ n: number }>`select count(*)::int as n from notifications where user_id = ${context.userId} and is_read = false`;
    return {
      user: { name: profile.fullName, email: profile.email, phone: profile.phone, role: profile.role },
      profile: cp,
      electricity: ec || null,
      project: proj || null,
      stages,
      unread: unread[0]?.n ?? 0,
    };
  });

export const getClientPanels = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    const { sql, clientId } = await clientOf(context.userId);
    const [setting] = await sql<{ value: string }>`select value from system_settings where key = 'warranty_expiring_days'`;
    const days = Number(setting?.value || 90);
    const rows = await sql<{
      id: string; serial_number: string; watt_rating: number; status: string;
      warranty_end_date: string | null; warranty_start_date: string | null; manufacturer: string; model: string;
    }>`select id, serial_number, watt_rating, status, warranty_end_date, warranty_start_date, manufacturer, model
       from panels where client_id = ${clientId} order by serial_number`;
    return rows.map((p) => ({ ...p, warranty_status: warrantyStatus(p.warranty_end_date, days) }));
  });

export const getClientClaims = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    const { sql, clientId } = await clientOf(context.userId);
    return sql<{
      id: string; panel_id: string; issue: string; details: string; status: string; created_at: string; serial_number: string;
    }>`select c.id, c.panel_id, c.issue, c.details, c.status, c.created_at::text, p.serial_number
       from warranty_claims c join panels p on p.id = c.panel_id
       where c.client_id = ${clientId} order by c.created_at desc`;
  });

export const createClaim = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((d: { panelId: string; issue: string; details: string }) => d)
  .handler(async ({ context, data }) => {
    const { sql, clientId, profile } = await clientOf(context.userId);
    const [panel] = await sql<{ id: string }>`select id from panels where id = ${data.panelId} and client_id = ${clientId}`;
    if (!panel) throw new Error("Panel not found");
    if (!data.issue.trim()) throw new Error("Describe the issue");
    const id = nid("WCL");
    await sql`insert into warranty_claims (id, panel_id, client_id, issue, details, status)
      values (${id}, ${data.panelId}, ${clientId}, ${data.issue.trim()}, ${data.details.trim()}, 'SUBMITTED')`;
    await sql`update panels set status = 'MAINTENANCE' where id = ${data.panelId}`;
    await audit(profile.userId, "WARRANTY_CLAIM_CREATE", "warranty_claim", id, data.issue);
    return { id };
  });

export const getClientPayments = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    const { sql, clientId } = await clientOf(context.userId);
    return sql<{ id: string; amount: string; payment_method: string; transaction_reference: string | null; status: string; paid_at: string | null; created_at: string }>`
      select id, amount::text, payment_method, transaction_reference, status, paid_at::text, created_at::text
      from payments where client_id = ${clientId} order by created_at desc`;
  });

export const getClientGeneration = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    const { sql, clientId } = await clientOf(context.userId);
    const days = await sql<{ day: string; kwh: string }>`
      select day::text, kwh::text from generation_daily where client_id = ${clientId} order by day`;
    const total = days.reduce((s, d) => s + Number(d.kwh), 0);
    return { days, total, month: days.slice(-30).reduce((s, d) => s + Number(d.kwh), 0) };
  });

export const getClientDocs = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    const { sql, clientId } = await clientOf(context.userId);
    return sql<{ id: string; document_type: string; original_filename: string; status: string; notes: string; uploaded_at: string }>`
      select id, document_type, original_filename, status, notes, uploaded_at::text from documents where client_id = ${clientId} order by uploaded_at desc`;
  });

export const getClientTickets = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    const { sql, clientId } = await clientOf(context.userId);
    const tickets = await sql<{ id: string; subject: string; category: string; description: string; priority: string; status: string; created_at: string }>`
      select id, subject, category, description, priority, status, created_at::text from support_tickets where client_id = ${clientId} order by created_at desc`;
    const replies = await sql<{ id: string; ticket_id: string; body: string; created_at: string; author_user_id: string }>`
      select r.id, r.ticket_id, r.body, r.created_at::text, r.author_user_id
      from ticket_replies r
      join support_tickets t on t.id = r.ticket_id
      where t.client_id = ${clientId}
      order by r.created_at`;
    return tickets.map((t) => ({ ...t, replies: replies.filter((r) => r.ticket_id === t.id) }));
  });

export const createTicket = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((d: { subject: string; category: string; description: string }) => d)
  .handler(async ({ context, data }) => {
    const { sql, clientId, profile } = await clientOf(context.userId);
    if (!data.subject.trim() || !data.description.trim()) throw new Error("Subject and details required");
    const id = nid("TCK");
    await sql`insert into support_tickets (id, client_id, subject, category, description)
      values (${id}, ${clientId}, ${data.subject.trim()}, ${data.category || "GENERAL"}, ${data.description.trim()})`;
    await audit(profile.userId, "TICKET_CREATE", "ticket", id, data.subject);
    return { id };
  });

export const replyTicket = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((d: { ticketId: string; body: string }) => d)
  .handler(async ({ context, data }) => {
    const { sql, clientId } = await clientOf(context.userId);
    const [t] = await sql<{ id: string }>`select id from support_tickets where id = ${data.ticketId} and client_id = ${clientId}`;
    if (!t) throw new Error("Ticket not found");
    await sql`insert into ticket_replies (id, ticket_id, author_user_id, body)
      values (${nid("RPL")}, ${data.ticketId}, ${context.userId}, ${data.body.trim()})`;
    await sql`update support_tickets set status = 'WAITING_FOR_CLIENT' where id = ${data.ticketId} and status = 'IN_PROGRESS'`;
    return { ok: true };
  });

export const getClientNotifs = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    await clientOf(context.userId);
    const sql = await getSql();
    return sql<{ id: string; title: string; message: string; kind: string; is_read: boolean; created_at: string }>`
      select id, title, message, kind, is_read, created_at::text from notifications where user_id = ${context.userId} order by created_at desc`;
  });

export const markNotifRead = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((id: string) => id)
  .handler(async ({ context, data }) => {
    const sql = await getSql();
    await sql`update notifications set is_read = true where id = ${data} and user_id = ${context.userId}`;
    return { ok: true };
  });

export const getCatalogServices = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    const { sql, clientId } = await clientOf(context.userId);
    const catalog = await sql<{ id: string; name: string; description: string; base_price: string }>`
      select id, name, description, base_price::text from services where is_active = true`;
    const mine = await sql<{ id: string; service_id: string; status: string; quoted_price: string | null; notes: string; name: string }>`
      select r.id, r.service_id, r.status, r.quoted_price::text, r.notes, s.name
      from service_requests r join services s on s.id = r.service_id
      where r.client_id = ${clientId} order by r.created_at desc`;
    return { catalog, mine };
  });

export const requestService = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((d: { serviceId: string; notes: string }) => d)
  .handler(async ({ context, data }) => {
    const { sql, clientId } = await clientOf(context.userId);
    await sql`insert into service_requests (id, client_id, service_id, notes)
      values (${nid("SR")}, ${clientId}, ${data.serviceId}, ${data.notes || ""})`;
    return { ok: true };
  });

export const saveKyc = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((d: { pan: string; panName: string; aadhaar: string; address: string; city: string; state: string; pincode: string }) => d)
  .handler(async ({ context, data }) => {
    const { sql, clientId } = await clientOf(context.userId);
    await sql`update client_profiles set pan_number = ${data.pan}, pan_name = ${data.panName},
      aadhaar_masked = ${data.aadhaar}, address = ${data.address}, city = ${data.city},
      state = ${data.state}, pincode = ${data.pincode}, kyc_status = 'VERIFIED', onboarding_stage = 'KYC_DONE'
      where id = ${clientId}`;
    return { ok: true };
  });

export const saveConnection = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((d: { rr: string; discom: string; address: string; units: number }) => d)
  .handler(async ({ context, data }) => {
    const { sql, clientId } = await clientOf(context.userId);
    const existing = await sql`select id from electricity_connections where client_id = ${clientId}`;
    if (existing.length) {
      await sql`update electricity_connections set rr_number = ${data.rr}, discom = ${data.discom},
        service_address = ${data.address}, avg_monthly_units = ${data.units} where client_id = ${clientId}`;
    } else {
      await sql`insert into electricity_connections (id, client_id, rr_number, discom, service_address, avg_monthly_units)
        values (${nid("EC")}, ${clientId}, ${data.rr}, ${data.discom}, ${data.address}, ${data.units})`;
    }
    return { ok: true };
  });

export { CLAIM_TRANSITIONS };
