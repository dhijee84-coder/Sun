import { r as createServerFn } from "./ssr.mjs";
import { _ as warrantyStatus, d as getSql, h as nid, u as ensureSeeded } from "./seed-ReQMGFmm.mjs";
import { t as authMiddleware } from "./middleware-9X6yXS5P.mjs";
import { a as loadProfile, r as audit } from "./profile-DQCRTp4N.mjs";
import { t as createServerRpc } from "./createServerRpc-CcvdN_gc.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/client-D22oYH1W.js
async function clientOf(userId) {
	await ensureSeeded();
	const sql = await getSql();
	const u = await sql`select email, name from "user" where id = ${userId}`;
	const profile = await loadProfile(userId, u[0]?.email, u[0]?.name);
	if (profile.role !== "CLIENT" || !profile.clientId) {
		const err = /* @__PURE__ */ new Error("Forbidden");
		err.status = 403;
		throw err;
	}
	return {
		sql,
		profile,
		clientId: profile.clientId
	};
}
var getClientOverview_createServerFn_handler = createServerRpc({
	id: "e5ed5c0c16cf1a374ab8b543412406c4745104b8b5902de0e28e404970d61ad5",
	name: "getClientOverview",
	filename: "src/lib/solan/client.ts"
}, (opts) => getClientOverview.__executeServer(opts));
var getClientOverview = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(getClientOverview_createServerFn_handler, async ({ context }) => {
	const { sql, profile, clientId } = await clientOf(context.userId);
	const [cp] = await sql`select * from client_profiles where id = ${clientId}`;
	const [ec] = await sql`select rr_number, discom, service_address, avg_monthly_units::text as avg_monthly_units
       from electricity_connections where client_id = ${clientId}`;
	const [proj] = await sql`select cp.allocated_panel_count, cp.allocated_capacity_kw::text, cp.contract_total::text,
              p.project_name, p.location, p.project_code
       from client_projects cp join projects p on p.id = cp.project_id where cp.client_id = ${clientId}`;
	const stages = await sql`select id, stage_number, stage_name, percentage::text, status, payment_required, payment_status
       from project_stages where client_id = ${clientId} order by stage_number`;
	const unread = await sql`select count(*)::int as n from notifications where user_id = ${context.userId} and is_read = false`;
	return {
		user: {
			name: profile.fullName,
			email: profile.email,
			phone: profile.phone,
			role: profile.role
		},
		profile: cp,
		electricity: ec || null,
		project: proj || null,
		stages,
		unread: unread[0]?.n ?? 0
	};
});
var getClientPanels_createServerFn_handler = createServerRpc({
	id: "45a2019842cab6138da3d46c99f55f6b1523fbe29f4995797f58a74dce2b323f",
	name: "getClientPanels",
	filename: "src/lib/solan/client.ts"
}, (opts) => getClientPanels.__executeServer(opts));
var getClientPanels = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(getClientPanels_createServerFn_handler, async ({ context }) => {
	const { sql, clientId } = await clientOf(context.userId);
	const [setting] = await sql`select value from system_settings where key = 'warranty_expiring_days'`;
	const days = Number(setting?.value || 90);
	return (await sql`select id, serial_number, watt_rating, status, warranty_end_date, warranty_start_date, manufacturer, model
       from panels where client_id = ${clientId} order by serial_number`).map((p) => ({
		...p,
		warranty_status: warrantyStatus(p.warranty_end_date, days)
	}));
});
var getClientClaims_createServerFn_handler = createServerRpc({
	id: "04267e44f832f1f2fe5ef2654328ea7c3fb043e559a0e8708271d4e361445c96",
	name: "getClientClaims",
	filename: "src/lib/solan/client.ts"
}, (opts) => getClientClaims.__executeServer(opts));
var getClientClaims = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(getClientClaims_createServerFn_handler, async ({ context }) => {
	const { sql, clientId } = await clientOf(context.userId);
	return sql`select c.id, c.panel_id, c.issue, c.details, c.status, c.created_at::text, p.serial_number
       from warranty_claims c join panels p on p.id = c.panel_id
       where c.client_id = ${clientId} order by c.created_at desc`;
});
var createClaim_createServerFn_handler = createServerRpc({
	id: "8ef5f0d6dbf6b2bdef70b72fbb8cf309b6a94a43246216ffaba459da32bc4364",
	name: "createClaim",
	filename: "src/lib/solan/client.ts"
}, (opts) => createClaim.__executeServer(opts));
var createClaim = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((d) => d).handler(createClaim_createServerFn_handler, async ({ context, data }) => {
	const { sql, clientId, profile } = await clientOf(context.userId);
	const [panel] = await sql`select id from panels where id = ${data.panelId} and client_id = ${clientId}`;
	if (!panel) throw new Error("Panel not found");
	if (!data.issue.trim()) throw new Error("Describe the issue");
	const id = nid("WCL");
	await sql`insert into warranty_claims (id, panel_id, client_id, issue, details, status)
      values (${id}, ${data.panelId}, ${clientId}, ${data.issue.trim()}, ${data.details.trim()}, 'SUBMITTED')`;
	await sql`update panels set status = 'MAINTENANCE' where id = ${data.panelId}`;
	await audit(profile.userId, "WARRANTY_CLAIM_CREATE", "warranty_claim", id, data.issue);
	return { id };
});
var getClientPayments_createServerFn_handler = createServerRpc({
	id: "65e10088bfa9c3dc55b3ab3113774399633826e526897263926851524d4d1a64",
	name: "getClientPayments",
	filename: "src/lib/solan/client.ts"
}, (opts) => getClientPayments.__executeServer(opts));
var getClientPayments = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(getClientPayments_createServerFn_handler, async ({ context }) => {
	const { sql, clientId } = await clientOf(context.userId);
	return sql`
      select id, amount::text, payment_method, transaction_reference, status, paid_at::text, created_at::text
      from payments where client_id = ${clientId} order by created_at desc`;
});
var getClientGeneration_createServerFn_handler = createServerRpc({
	id: "0e6f92d04aa69556c5678be4c9a2b39a3354e905234ce165d0cffa352f6a6dda",
	name: "getClientGeneration",
	filename: "src/lib/solan/client.ts"
}, (opts) => getClientGeneration.__executeServer(opts));
var getClientGeneration = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(getClientGeneration_createServerFn_handler, async ({ context }) => {
	const { sql, clientId } = await clientOf(context.userId);
	const days = await sql`
      select day::text, kwh::text from generation_daily where client_id = ${clientId} order by day`;
	return {
		days,
		total: days.reduce((s, d) => s + Number(d.kwh), 0),
		month: days.slice(-30).reduce((s, d) => s + Number(d.kwh), 0)
	};
});
var getClientDocs_createServerFn_handler = createServerRpc({
	id: "b660ae4c2f21cd85f5aabf271824ab42e83dd35f00bf4a13914cdab85d9b31ca",
	name: "getClientDocs",
	filename: "src/lib/solan/client.ts"
}, (opts) => getClientDocs.__executeServer(opts));
var getClientDocs = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(getClientDocs_createServerFn_handler, async ({ context }) => {
	const { sql, clientId } = await clientOf(context.userId);
	return sql`
      select id, document_type, original_filename, status, notes, uploaded_at::text from documents where client_id = ${clientId} order by uploaded_at desc`;
});
var getClientTickets_createServerFn_handler = createServerRpc({
	id: "dbb25affdf1534e77bf44ec01b098ba364d8d2c49e6534ed8e8039ee901325ed",
	name: "getClientTickets",
	filename: "src/lib/solan/client.ts"
}, (opts) => getClientTickets.__executeServer(opts));
var getClientTickets = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(getClientTickets_createServerFn_handler, async ({ context }) => {
	const { sql, clientId } = await clientOf(context.userId);
	const tickets = await sql`
      select id, subject, category, description, priority, status, created_at::text from support_tickets where client_id = ${clientId} order by created_at desc`;
	const replies = await sql`
      select r.id, r.ticket_id, r.body, r.created_at::text, r.author_user_id
      from ticket_replies r
      join support_tickets t on t.id = r.ticket_id
      where t.client_id = ${clientId}
      order by r.created_at`;
	return tickets.map((t) => ({
		...t,
		replies: replies.filter((r) => r.ticket_id === t.id)
	}));
});
var createTicket_createServerFn_handler = createServerRpc({
	id: "88c6df1ffb58cf33509d38df73fb08e988c56c42df1b02243b6e321abbbd8a67",
	name: "createTicket",
	filename: "src/lib/solan/client.ts"
}, (opts) => createTicket.__executeServer(opts));
var createTicket = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((d) => d).handler(createTicket_createServerFn_handler, async ({ context, data }) => {
	const { sql, clientId, profile } = await clientOf(context.userId);
	if (!data.subject.trim() || !data.description.trim()) throw new Error("Subject and details required");
	const id = nid("TCK");
	await sql`insert into support_tickets (id, client_id, subject, category, description)
      values (${id}, ${clientId}, ${data.subject.trim()}, ${data.category || "GENERAL"}, ${data.description.trim()})`;
	await audit(profile.userId, "TICKET_CREATE", "ticket", id, data.subject);
	return { id };
});
var replyTicket_createServerFn_handler = createServerRpc({
	id: "b3ac90e35e972dad45de49508579ed9028e7069de434d6c497e20c9c8641ad27",
	name: "replyTicket",
	filename: "src/lib/solan/client.ts"
}, (opts) => replyTicket.__executeServer(opts));
var replyTicket = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((d) => d).handler(replyTicket_createServerFn_handler, async ({ context, data }) => {
	const { sql, clientId } = await clientOf(context.userId);
	const [t] = await sql`select id from support_tickets where id = ${data.ticketId} and client_id = ${clientId}`;
	if (!t) throw new Error("Ticket not found");
	await sql`insert into ticket_replies (id, ticket_id, author_user_id, body)
      values (${nid("RPL")}, ${data.ticketId}, ${context.userId}, ${data.body.trim()})`;
	await sql`update support_tickets set status = 'WAITING_FOR_CLIENT' where id = ${data.ticketId} and status = 'IN_PROGRESS'`;
	return { ok: true };
});
var getClientNotifs_createServerFn_handler = createServerRpc({
	id: "ac1884f88a480b0bf8899a8b91e86fb6233ca48dda42496cfe0237a1b4dad863",
	name: "getClientNotifs",
	filename: "src/lib/solan/client.ts"
}, (opts) => getClientNotifs.__executeServer(opts));
var getClientNotifs = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(getClientNotifs_createServerFn_handler, async ({ context }) => {
	await clientOf(context.userId);
	return (await getSql())`
      select id, title, message, kind, is_read, created_at::text from notifications where user_id = ${context.userId} order by created_at desc`;
});
var markNotifRead_createServerFn_handler = createServerRpc({
	id: "7fbb888f389f28a1a40666da0735f6b7aa8c199e2914ebdb92c0126caf511edc",
	name: "markNotifRead",
	filename: "src/lib/solan/client.ts"
}, (opts) => markNotifRead.__executeServer(opts));
var markNotifRead = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((id) => id).handler(markNotifRead_createServerFn_handler, async ({ context, data }) => {
	await (await getSql())`update notifications set is_read = true where id = ${data} and user_id = ${context.userId}`;
	return { ok: true };
});
var getCatalogServices_createServerFn_handler = createServerRpc({
	id: "99106640cf38c3cc72a270fd4b199fdaaddc3f489955243308f7141d85199557",
	name: "getCatalogServices",
	filename: "src/lib/solan/client.ts"
}, (opts) => getCatalogServices.__executeServer(opts));
var getCatalogServices = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(getCatalogServices_createServerFn_handler, async ({ context }) => {
	const { sql, clientId } = await clientOf(context.userId);
	return {
		catalog: await sql`
      select id, name, description, base_price::text from services where is_active = true`,
		mine: await sql`
      select r.id, r.service_id, r.status, r.quoted_price::text, r.notes, s.name
      from service_requests r join services s on s.id = r.service_id
      where r.client_id = ${clientId} order by r.created_at desc`
	};
});
var requestService_createServerFn_handler = createServerRpc({
	id: "b6ee36c6489005c27a8dc1c2157172fd4b2144f78bb014d814c391d499bbed41",
	name: "requestService",
	filename: "src/lib/solan/client.ts"
}, (opts) => requestService.__executeServer(opts));
var requestService = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((d) => d).handler(requestService_createServerFn_handler, async ({ context, data }) => {
	const { sql, clientId } = await clientOf(context.userId);
	await sql`insert into service_requests (id, client_id, service_id, notes)
      values (${nid("SR")}, ${clientId}, ${data.serviceId}, ${data.notes || ""})`;
	return { ok: true };
});
var saveKyc_createServerFn_handler = createServerRpc({
	id: "f18d2186fb874470977161d06cb39081cce580700c8d3c0187d48f712427b6d0",
	name: "saveKyc",
	filename: "src/lib/solan/client.ts"
}, (opts) => saveKyc.__executeServer(opts));
var saveKyc = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((d) => d).handler(saveKyc_createServerFn_handler, async ({ context, data }) => {
	const { sql, clientId } = await clientOf(context.userId);
	await sql`update client_profiles set pan_number = ${data.pan}, pan_name = ${data.panName},
      aadhaar_masked = ${data.aadhaar}, address = ${data.address}, city = ${data.city},
      state = ${data.state}, pincode = ${data.pincode}, kyc_status = 'VERIFIED', onboarding_stage = 'KYC_DONE'
      where id = ${clientId}`;
	return { ok: true };
});
var saveConnection_createServerFn_handler = createServerRpc({
	id: "efb16b6355edfcd11d3055e53d5ba0fb3b8b61207a732389e0af64ab4b1bb0bf",
	name: "saveConnection",
	filename: "src/lib/solan/client.ts"
}, (opts) => saveConnection.__executeServer(opts));
var saveConnection = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((d) => d).handler(saveConnection_createServerFn_handler, async ({ context, data }) => {
	const { sql, clientId } = await clientOf(context.userId);
	if ((await sql`select id from electricity_connections where client_id = ${clientId}`).length) await sql`update electricity_connections set rr_number = ${data.rr}, discom = ${data.discom},
        service_address = ${data.address}, avg_monthly_units = ${data.units} where client_id = ${clientId}`;
	else await sql`insert into electricity_connections (id, client_id, rr_number, discom, service_address, avg_monthly_units)
        values (${nid("EC")}, ${clientId}, ${data.rr}, ${data.discom}, ${data.address}, ${data.units})`;
	return { ok: true };
});
//#endregion
export { createClaim_createServerFn_handler, createTicket_createServerFn_handler, getCatalogServices_createServerFn_handler, getClientClaims_createServerFn_handler, getClientDocs_createServerFn_handler, getClientGeneration_createServerFn_handler, getClientNotifs_createServerFn_handler, getClientOverview_createServerFn_handler, getClientPanels_createServerFn_handler, getClientPayments_createServerFn_handler, getClientTickets_createServerFn_handler, markNotifRead_createServerFn_handler, replyTicket_createServerFn_handler, requestService_createServerFn_handler, saveConnection_createServerFn_handler, saveKyc_createServerFn_handler };
