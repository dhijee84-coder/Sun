import { r as createServerFn } from "./ssr.mjs";
import { r as getSql } from "./db-DtyDCssu.mjs";
import { t as authMiddleware } from "./middleware-BnQG7PXd.mjs";
import { c as ensureSeeded, d as nid, n as CLAIM_TRANSITIONS, o as canManageRole, p as warrantyStatus, s as csvCell, t as ALL_PERMISSIONS } from "./seed-i8Ev38tG.mjs";
import { n as assertStaff, o as loadProfile, r as audit, t as assertPerm } from "./profile-CaSHhhIo.mjs";
import { t as createServerRpc } from "./createServerRpc-CcvdN_gc.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/staff-DLRM63mX.js
async function staffOf(userId) {
	await ensureSeeded();
	const sql = await getSql();
	const u = await sql`select email, name from "user" where id = ${userId}`;
	const profile = await loadProfile(userId, u[0]?.email, u[0]?.name);
	assertStaff(profile);
	return {
		sql,
		profile
	};
}
var getStaffDashboard_createServerFn_handler = createServerRpc({
	id: "39c9c99c42d4e8e66c380e74389454c245dd1be6b8635a37bc159a7d3cf9dbeb",
	name: "getStaffDashboard",
	filename: "src/lib/solan/staff.ts"
}, (opts) => getStaffDashboard.__executeServer(opts));
var getStaffDashboard = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(getStaffDashboard_createServerFn_handler, async ({ context }) => {
	const { sql, profile } = await staffOf(context.userId);
	const [c] = await sql`select count(*)::int as n from client_profiles`;
	const [p] = await sql`select count(*)::int as n from panels`;
	const [a] = await sql`select count(*)::int as n from panels where status in ('ALLOCATED','INSTALLED')`;
	const [t] = await sql`select count(*)::int as n from support_tickets where status not in ('CLOSED','RESOLVED')`;
	const [w] = await sql`select count(*)::int as n from warranty_claims where status not in ('CLOSED','REJECTED')`;
	const [e] = await sql`select count(*)::int as n from enquiries where status = 'NEW'`;
	return {
		me: profile,
		clients: c.n,
		panels: p.n,
		allocated: a.n,
		openTickets: t.n,
		openClaims: w.n,
		newEnquiries: e.n
	};
});
var listClients_createServerFn_handler = createServerRpc({
	id: "063935b2adaf9d7c01d1235d3fc4cc26956b9cd17400321dd86b88db008605a2",
	name: "listClients",
	filename: "src/lib/solan/staff.ts"
}, (opts) => listClients.__executeServer(opts));
var listClients = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(listClients_createServerFn_handler, async ({ context }) => {
	const { sql, profile } = await staffOf(context.userId);
	assertPerm(profile, "clients.view");
	return sql`select c.id, c.user_id, p.full_name, p.email, p.phone, c.kyc_status, c.city, c.onboarding_stage,
              (select count(*)::int from panels x where x.client_id = c.id) as panels
       from client_profiles c join profiles p on p.user_id = c.user_id
       order by c.created_at desc`;
});
var listProjects_createServerFn_handler = createServerRpc({
	id: "b114c0cfa4ef75b6f91ebde8c46e69dfed7cfbbdba52cdbe2c8c00a2ac20534e",
	name: "listProjects",
	filename: "src/lib/solan/staff.ts"
}, (opts) => listProjects.__executeServer(opts));
var listProjects = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(listProjects_createServerFn_handler, async ({ context }) => {
	const { sql, profile } = await staffOf(context.userId);
	assertPerm(profile, "projects.view");
	return sql`select id, project_code, project_name, location, status, total_panels, is_public,
              (select count(*)::int from panels x where x.project_id = projects.id and x.status = 'AVAILABLE') as available
       from projects order by project_code`;
});
var toggleProjectPublic_createServerFn_handler = createServerRpc({
	id: "da34827094dc4277179b70f3ad4ffdaf9fbd2c3ca88ce799b2360f5c4767515e",
	name: "toggleProjectPublic",
	filename: "src/lib/solan/staff.ts"
}, (opts) => toggleProjectPublic.__executeServer(opts));
var toggleProjectPublic = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((id) => id).handler(toggleProjectPublic_createServerFn_handler, async ({ context, data }) => {
	const { sql, profile } = await staffOf(context.userId);
	assertPerm(profile, "projects.edit");
	await sql`update projects set is_public = not is_public where id = ${data}`;
	await audit(profile.userId, "PROJECT_PUBLIC_TOGGLE", "project", data, "");
	return { ok: true };
});
var allocatePanels_createServerFn_handler = createServerRpc({
	id: "5ec012bfd5fc3114a38f34517402a9bcf20e7420d821edab8f658fd74085d606",
	name: "allocatePanels",
	filename: "src/lib/solan/staff.ts"
}, (opts) => allocatePanels.__executeServer(opts));
var allocatePanels = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((d) => d).handler(allocatePanels_createServerFn_handler, async ({ context, data }) => {
	const { sql, profile } = await staffOf(context.userId);
	assertPerm(profile, "panels.allocate");
	const n = Math.max(1, Math.min(50, Number(data.count) || 1));
	const avail = await sql`
      select id from panels where project_id = ${data.projectId} and status = 'AVAILABLE' order by added_sequence limit ${n}`;
	if (avail.length < n) throw new Error(`Only ${avail.length} panels available`);
	const start = /* @__PURE__ */ new Date();
	const iso = start.toISOString().slice(0, 10);
	const end = new Date(start);
	end.setFullYear(end.getFullYear() + 25);
	const endIso = end.toISOString().slice(0, 10);
	for (const p of avail) await sql`update panels set status = 'ALLOCATED', client_id = ${data.clientId},
        purchase_date = ${iso}, warranty_start_date = ${iso}, warranty_end_date = ${endIso}
        where id = ${p.id}`;
	if ((await sql`select id from client_projects where client_id = ${data.clientId}`).length) await sql`update client_projects set allocated_panel_count = allocated_panel_count + ${n},
        allocated_capacity_kw = allocated_capacity_kw + ${n * .4} where client_id = ${data.clientId}`;
	else await sql`insert into client_projects (id, client_id, project_id, allocated_panel_count, allocated_capacity_kw)
        values (${nid("CP")}, ${data.clientId}, ${data.projectId}, ${n}, ${n * .4})`;
	await audit(profile.userId, "PANEL_ALLOCATE", "client", data.clientId, `${n} panels`);
	return { allocated: n };
});
var listClaims_createServerFn_handler = createServerRpc({
	id: "bfcb6d08f0aeb4e3fb794691ac4f43f0b171b9474533e7fbf9a543bc8cf17eb5",
	name: "listClaims",
	filename: "src/lib/solan/staff.ts"
}, (opts) => listClaims.__executeServer(opts));
var listClaims = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(listClaims_createServerFn_handler, async ({ context }) => {
	const { sql, profile } = await staffOf(context.userId);
	assertPerm(profile, "warranty.view");
	const [setting] = await sql`select value from system_settings where key = 'warranty_expiring_days'`;
	const days = Number(setting?.value || 90);
	return {
		claims: await sql`select c.id, c.issue, c.details, c.status, c.created_at::text, p.serial_number, c.client_id, c.panel_id, pr.full_name
       from warranty_claims c
       join panels p on p.id = c.panel_id
       join client_profiles cp on cp.id = c.client_id
       join profiles pr on pr.user_id = cp.user_id
       order by c.created_at desc`,
		days,
		transitions: CLAIM_TRANSITIONS
	};
});
var transitionClaim_createServerFn_handler = createServerRpc({
	id: "178698cbb6e9b6cdfaba96787095b39eadd7179d43e15c9b6264190360bdcbb7",
	name: "transitionClaim",
	filename: "src/lib/solan/staff.ts"
}, (opts) => transitionClaim.__executeServer(opts));
var transitionClaim = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((d) => d).handler(transitionClaim_createServerFn_handler, async ({ context, data }) => {
	const { sql, profile } = await staffOf(context.userId);
	assertPerm(profile, "warranty.claims.manage");
	const [c] = await sql`
      select status, panel_id, client_id from warranty_claims where id = ${data.claimId}`;
	if (!c) throw new Error("Claim not found");
	if (!(CLAIM_TRANSITIONS[c.status] || []).includes(data.status)) throw new Error(`Cannot move ${c.status} → ${data.status}`);
	await sql`update warranty_claims set status = ${data.status}, updated_at = now() where id = ${data.claimId}`;
	if (data.status === "REPLACED" || data.status === "REPAIRED" || data.status === "CLOSED") await sql`update panels set status = 'INSTALLED' where id = ${c.panel_id}`;
	const [cp] = await sql`select user_id from client_profiles where id = ${c.client_id}`;
	if (cp) await sql`insert into notifications (id, user_id, title, message, kind)
        values (${nid("NTF")}, ${cp.user_id}, 'Warranty claim updated', ${`Status is now ${data.status.replace(/_/g, " ")}.`}, 'WARRANTY')`;
	await audit(profile.userId, "WARRANTY_TRANSITION", "warranty_claim", data.claimId, `${c.status}->${data.status}`);
	return { ok: true };
});
var listTickets_createServerFn_handler = createServerRpc({
	id: "8ca22512cc546b464c44749e3393686047011d9d2225e3a586442d1fafd7ecf3",
	name: "listTickets",
	filename: "src/lib/solan/staff.ts"
}, (opts) => listTickets.__executeServer(opts));
var listTickets = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(listTickets_createServerFn_handler, async ({ context }) => {
	const { sql } = await staffOf(context.userId);
	const tickets = await sql`select t.id, t.subject, t.category, t.description, t.status, t.priority, t.created_at::text, p.full_name
       from support_tickets t
       join client_profiles c on c.id = t.client_id
       join profiles p on p.user_id = c.user_id
       order by t.created_at desc`;
	const replies = await sql`
      select ticket_id, body, created_at::text from ticket_replies order by created_at`;
	return tickets.map((t) => ({
		...t,
		replies: replies.filter((r) => r.ticket_id === t.id)
	}));
});
var staffReplyTicket_createServerFn_handler = createServerRpc({
	id: "0ee679ddd4f5692a5498146e63d995270e01392f8e6b9d97c900a9bdb5193b4c",
	name: "staffReplyTicket",
	filename: "src/lib/solan/staff.ts"
}, (opts) => staffReplyTicket.__executeServer(opts));
var staffReplyTicket = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((d) => d).handler(staffReplyTicket_createServerFn_handler, async ({ context, data }) => {
	const { sql, profile } = await staffOf(context.userId);
	await sql`insert into ticket_replies (id, ticket_id, author_user_id, body)
      values (${nid("RPL")}, ${data.ticketId}, ${profile.userId}, ${data.body.trim()})`;
	if (data.status) await sql`update support_tickets set status = ${data.status} where id = ${data.ticketId}`;
	else await sql`update support_tickets set status = 'IN_PROGRESS' where id = ${data.ticketId}`;
	return { ok: true };
});
var listPayments_createServerFn_handler = createServerRpc({
	id: "9bf99978249c1b0c09b964630de7e9b9019e47d0ffc914ba435ed5a961765657",
	name: "listPayments",
	filename: "src/lib/solan/staff.ts"
}, (opts) => listPayments.__executeServer(opts));
var listPayments = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(listPayments_createServerFn_handler, async ({ context }) => {
	const { sql, profile } = await staffOf(context.userId);
	assertPerm(profile, "payments.view");
	return sql`
      select pay.id, pay.amount::text, pay.status, pay.payment_method, pay.created_at::text, p.full_name
      from payments pay
      join client_profiles c on c.id = pay.client_id
      join profiles p on p.user_id = c.user_id
      order by pay.created_at desc`;
});
var recordPayment_createServerFn_handler = createServerRpc({
	id: "fbe7b3e094d9621d67ba9ae4302ef1894c90f2c4376121ea1ba2e1025c450065",
	name: "recordPayment",
	filename: "src/lib/solan/staff.ts"
}, (opts) => recordPayment.__executeServer(opts));
var recordPayment = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((d) => d).handler(recordPayment_createServerFn_handler, async ({ context, data }) => {
	const { sql, profile } = await staffOf(context.userId);
	assertPerm(profile, "payments.create");
	const id = nid("PAY");
	await sql`insert into payments (id, client_id, amount, payment_method, status, paid_at, transaction_reference)
      values (${id}, ${data.clientId}, ${data.amount}, ${data.method || "UPI"}, 'SUCCESS', now(), ${id})`;
	await audit(profile.userId, "PAYMENT_RECORD", "payment", id, String(data.amount));
	return { id };
});
var listEnquiries_createServerFn_handler = createServerRpc({
	id: "3b3e4a7a56ae20a83f9ae00eaad0e74f5f5b9903a1e8ebe6d7036850177586dd",
	name: "listEnquiries",
	filename: "src/lib/solan/staff.ts"
}, (opts) => listEnquiries.__executeServer(opts));
var listEnquiries = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(listEnquiries_createServerFn_handler, async ({ context }) => {
	const { sql, profile } = await staffOf(context.userId);
	assertPerm(profile, "enquiries.view");
	return sql`
      select id, name, email, phone, message, status, created_at::text from enquiries order by created_at desc`;
});
var setEnquiryStatus_createServerFn_handler = createServerRpc({
	id: "565dc50fd3060e32f542676e6ea49f2116663cd553011c2117333d52ae997fb1",
	name: "setEnquiryStatus",
	filename: "src/lib/solan/staff.ts"
}, (opts) => setEnquiryStatus.__executeServer(opts));
var setEnquiryStatus = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((d) => d).handler(setEnquiryStatus_createServerFn_handler, async ({ context, data }) => {
	const { sql, profile } = await staffOf(context.userId);
	assertPerm(profile, "enquiries.manage");
	await sql`update enquiries set status = ${data.status} where id = ${data.id}`;
	return { ok: true };
});
var listStaffUsers_createServerFn_handler = createServerRpc({
	id: "eb1fa1fce99031ccf2f9d24e57d399ddd59766fbc975448dae55bbf1b6dd5aff",
	name: "listStaffUsers",
	filename: "src/lib/solan/staff.ts"
}, (opts) => listStaffUsers.__executeServer(opts));
var listStaffUsers = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(listStaffUsers_createServerFn_handler, async ({ context }) => {
	const { sql, profile } = await staffOf(context.userId);
	assertPerm(profile, "users.view");
	return sql`
      select user_id, role, full_name, email, is_active from profiles where role != 'CLIENT' order by role, full_name`;
});
var setStaffRole_createServerFn_handler = createServerRpc({
	id: "fb811620297f284f670141f7764f237123a4636f92d36412225c647ae064b6b2",
	name: "setStaffRole",
	filename: "src/lib/solan/staff.ts"
}, (opts) => setStaffRole.__executeServer(opts));
var setStaffRole = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((d) => d).handler(setStaffRole_createServerFn_handler, async ({ context, data }) => {
	const { sql, profile } = await staffOf(context.userId);
	const [target] = await sql`select role from profiles where user_id = ${data.userId}`;
	if (!target) throw new Error("User not found");
	if (!canManageRole(profile.role, target.role) || !canManageRole(profile.role, data.role)) throw new Error("You cannot manage that role");
	await sql`update profiles set role = ${data.role} where user_id = ${data.userId}`;
	await audit(profile.userId, "STAFF_ROLE", "profile", data.userId, data.role);
	return { ok: true };
});
var getPermissionMatrix_createServerFn_handler = createServerRpc({
	id: "690d74d8a4a7747bcd2f7091a9a7d35155997c7c20056489c9269628de8c1b2a",
	name: "getPermissionMatrix",
	filename: "src/lib/solan/staff.ts"
}, (opts) => getPermissionMatrix.__executeServer(opts));
var getPermissionMatrix = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(getPermissionMatrix_createServerFn_handler, async ({ context }) => {
	const { sql, profile } = await staffOf(context.userId);
	assertPerm(profile, "roles.view");
	const rows = await sql`select role, code, allowed from role_permissions`;
	const matrix = {};
	for (const code of ALL_PERMISSIONS) matrix[code] = {
		CLIENT: false,
		ADMIN: false,
		SUPER_ADMIN: false,
		PRIMARY_ADMIN: true
	};
	for (const r of rows) {
		if (!matrix[r.code]) matrix[r.code] = {
			CLIENT: false,
			ADMIN: false,
			SUPER_ADMIN: false,
			PRIMARY_ADMIN: true
		};
		matrix[r.code][r.role] = r.allowed;
	}
	return {
		permissions: ALL_PERMISSIONS,
		matrix
	};
});
var setPermission_createServerFn_handler = createServerRpc({
	id: "42e1f595db23eda586618858bb6196700c4836c581af5911c7a470c776010940",
	name: "setPermission",
	filename: "src/lib/solan/staff.ts"
}, (opts) => setPermission.__executeServer(opts));
var setPermission = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((d) => d).handler(setPermission_createServerFn_handler, async ({ context, data }) => {
	const { sql, profile } = await staffOf(context.userId);
	assertPerm(profile, "roles.manage");
	if (data.role === "PRIMARY_ADMIN") throw new Error("Primary Admin always has every permission");
	await sql`insert into role_permissions (role, code, allowed) values (${data.role}, ${data.code}, ${data.allowed})
      on conflict (role, code) do update set allowed = ${data.allowed}`;
	await audit(profile.userId, "PERM_SET", "role_permission", data.role, `${data.code}=${data.allowed}`);
	return { ok: true };
});
var getCms_createServerFn_handler = createServerRpc({
	id: "0b31643e30ccc28d2d3d281f8b9e4fa281fea9cd1288c23c8a0aa47d0552492a",
	name: "getCms",
	filename: "src/lib/solan/staff.ts"
}, (opts) => getCms.__executeServer(opts));
var getCms = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(getCms_createServerFn_handler, async ({ context }) => {
	const { sql, profile } = await staffOf(context.userId);
	assertPerm(profile, "website.settings");
	return {
		content: await sql`select key, value from website_content`,
		faqs: await sql`
      select id, question, answer, is_published, sort_order from faqs order by sort_order`,
		anns: await sql`
      select id, title, message, is_active, cta_text, cta_url from announcements order by created_at desc`,
		settings: await sql`select key, value from system_settings`
	};
});
var saveContent_createServerFn_handler = createServerRpc({
	id: "6106aa0fd2be45fd3f878659b4a3051cf3484b8e28aea8bc0188bed693c15572",
	name: "saveContent",
	filename: "src/lib/solan/staff.ts"
}, (opts) => saveContent.__executeServer(opts));
var saveContent = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((d) => d).handler(saveContent_createServerFn_handler, async ({ context, data }) => {
	const { sql, profile } = await staffOf(context.userId);
	assertPerm(profile, "website.settings");
	await sql`insert into website_content (key, value) values (${data.key}, ${data.value})
      on conflict (key) do update set value = ${data.value}`;
	await audit(profile.userId, "CMS_SAVE", "website_content", data.key, "");
	return { ok: true };
});
var saveSetting_createServerFn_handler = createServerRpc({
	id: "dbdf417f0e57a9d924198ab1e3c830297eeccfd2c455c2e39485339aedbc92a7",
	name: "saveSetting",
	filename: "src/lib/solan/staff.ts"
}, (opts) => saveSetting.__executeServer(opts));
var saveSetting = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((d) => d).handler(saveSetting_createServerFn_handler, async ({ context, data }) => {
	const { sql, profile } = await staffOf(context.userId);
	assertPerm(profile, "system.settings");
	await sql`insert into system_settings (key, value) values (${data.key}, ${data.value})
      on conflict (key) do update set value = ${data.value}`;
	await audit(profile.userId, "SETTING_SAVE", "system_settings", data.key, data.value);
	return { ok: true };
});
var saveFaq_createServerFn_handler = createServerRpc({
	id: "7a7bc229f6f3c4943b21bc4d4600dbf7bb10de49f9cb3824b0961bb9c22221f9",
	name: "saveFaq",
	filename: "src/lib/solan/staff.ts"
}, (opts) => saveFaq.__executeServer(opts));
var saveFaq = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((d) => d).handler(saveFaq_createServerFn_handler, async ({ context, data }) => {
	const { sql, profile } = await staffOf(context.userId);
	assertPerm(profile, "faqs.manage");
	if (data.id) await sql`update faqs set question = ${data.question}, answer = ${data.answer} where id = ${data.id}`;
	else await sql`insert into faqs (id, question, answer, sort_order) values (${nid("FAQ")}, ${data.question}, ${data.answer}, 99)`;
	return { ok: true };
});
var listAudit_createServerFn_handler = createServerRpc({
	id: "a8fda0d5e6cd6039e92477595e29a36a9601f7a65e12cd2668448e2fb7992570",
	name: "listAudit",
	filename: "src/lib/solan/staff.ts"
}, (opts) => listAudit.__executeServer(opts));
var listAudit = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(listAudit_createServerFn_handler, async ({ context }) => {
	const { sql, profile } = await staffOf(context.userId);
	assertPerm(profile, "audit_logs.view");
	return sql`
      select a.id, a.action, a.entity, a.entity_id, a.detail, a.created_at::text, p.full_name as actor
      from audit_logs a left join profiles p on p.user_id = a.actor_user_id
      order by a.created_at desc limit 200`;
});
var listDocuments_createServerFn_handler = createServerRpc({
	id: "dce32ec0efa8b531c6b6b31b2a7048f96956f2698a59acc3c41735663b8cb4c3",
	name: "listDocuments",
	filename: "src/lib/solan/staff.ts"
}, (opts) => listDocuments.__executeServer(opts));
var listDocuments = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(listDocuments_createServerFn_handler, async ({ context }) => {
	const { sql, profile } = await staffOf(context.userId);
	assertPerm(profile, "documents.view");
	return sql`
      select d.id, d.document_type, d.original_filename, d.status, p.full_name
      from documents d join client_profiles c on c.id = d.client_id join profiles p on p.user_id = c.user_id
      order by d.uploaded_at desc`;
});
var verifyDocument_createServerFn_handler = createServerRpc({
	id: "73b4ab909928f572772e9edc0e115451a0b98c251dcc1fc06185cb2d76d0d963",
	name: "verifyDocument",
	filename: "src/lib/solan/staff.ts"
}, (opts) => verifyDocument.__executeServer(opts));
var verifyDocument = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((d) => d).handler(verifyDocument_createServerFn_handler, async ({ context, data }) => {
	const { sql, profile } = await staffOf(context.userId);
	assertPerm(profile, "documents.verify");
	await sql`update documents set status = ${data.status} where id = ${data.id}`;
	return { ok: true };
});
var exportCsv_createServerFn_handler = createServerRpc({
	id: "5a3d08781c1ab78112b283d4b828ef21cd2cfe9240bb4b26da1ccbb02ef91abd",
	name: "exportCsv",
	filename: "src/lib/solan/staff.ts"
}, (opts) => exportCsv.__executeServer(opts));
var exportCsv = createServerFn({ method: "GET" }).middleware([authMiddleware]).validator((kind) => kind).handler(exportCsv_createServerFn_handler, async ({ context, data }) => {
	const { sql, profile } = await staffOf(context.userId);
	assertPerm(profile, "reports.export");
	let header = [];
	let rows = [];
	if (data === "clients") {
		header = [
			"name",
			"email",
			"phone",
			"kyc",
			"city",
			"panels"
		];
		rows = (await listLike(sql, `select p.full_name, p.email, p.phone, c.kyc_status, c.city,
        (select count(*)::int from panels x where x.client_id = c.id)::text as panels
        from client_profiles c join profiles p on p.user_id = c.user_id`)).map((x) => Object.values(x).map((v) => String(v ?? "")));
	} else if (data === "payments") {
		header = [
			"id",
			"amount",
			"status",
			"method",
			"client"
		];
		rows = (await listLike(sql, `select pay.id, pay.amount::text, pay.status, pay.payment_method, p.full_name
        from payments pay join client_profiles c on c.id = pay.client_id join profiles p on p.user_id = c.user_id`)).map((x) => Object.values(x).map((v) => String(v ?? "")));
	} else if (data === "panels") {
		header = [
			"serial",
			"status",
			"project",
			"client",
			"warranty_end",
			"warranty_status"
		];
		const [setting] = await sql`select value from system_settings where key = 'warranty_expiring_days'`;
		const days = Number(setting?.value || 90);
		rows = (await sql`
        select pn.serial_number, pn.status, pr.project_code, pf.full_name as client, pn.warranty_end_date
        from panels pn join projects pr on pr.id = pn.project_id
        left join client_profiles cp on cp.id = pn.client_id
        left join profiles pf on pf.user_id = cp.user_id
        order by pn.serial_number`).map((x) => [
			x.serial_number,
			x.status,
			x.project_code,
			x.client || "",
			x.warranty_end_date || "",
			warrantyStatus(x.warranty_end_date, days)
		]);
	} else {
		header = [
			"id",
			"serial",
			"issue",
			"status",
			"client"
		];
		rows = (await sql`
        select c.id, p.serial_number, c.issue, c.status, pr.full_name
        from warranty_claims c join panels p on p.id = c.panel_id
        join client_profiles cp on cp.id = c.client_id join profiles pr on pr.user_id = cp.user_id`).map((x) => [
			x.id,
			x.serial_number,
			x.issue,
			x.status,
			x.full_name
		]);
	}
	const csv = [header.map(csvCell).join(","), ...rows.map((row) => row.map(csvCell).join(","))].join("\n");
	await audit(profile.userId, "CSV_EXPORT", "report", data, `${rows.length} rows`);
	return {
		filename: `solan-${data}.csv`,
		csv
	};
});
async function listLike(sql, q) {
	return sql.query(q);
}
var staffNotify_createServerFn_handler = createServerRpc({
	id: "febb91b722b71d3ade23df07af3f643ae6b079b184e23e368e29a8b3caa78fca",
	name: "staffNotify",
	filename: "src/lib/solan/staff.ts"
}, (opts) => staffNotify.__executeServer(opts));
var staffNotify = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((d) => d).handler(staffNotify_createServerFn_handler, async ({ context, data }) => {
	const { sql, profile } = await staffOf(context.userId);
	assertPerm(profile, "notifications.create");
	await sql`insert into notifications (id, user_id, title, message)
      values (${nid("NTF")}, ${data.userId}, ${data.title}, ${data.message})`;
	return { ok: true };
});
var listServicesAdmin_createServerFn_handler = createServerRpc({
	id: "f9b985636e22deb7d4803ff3cc3989b872794ade7e6f42b2c7001fa852834ef0",
	name: "listServicesAdmin",
	filename: "src/lib/solan/staff.ts"
}, (opts) => listServicesAdmin.__executeServer(opts));
var listServicesAdmin = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(listServicesAdmin_createServerFn_handler, async ({ context }) => {
	const { sql, profile } = await staffOf(context.userId);
	assertPerm(profile, "clients.services.view");
	return {
		catalog: await sql`
      select id, name, description, base_price::text, is_active from services order by name`,
		reqs: await sql`
      select r.id, r.status, r.quoted_price::text, s.name, p.full_name
      from service_requests r join services s on s.id = r.service_id
      join client_profiles c on c.id = r.client_id join profiles p on p.user_id = c.user_id
      order by r.created_at desc`
	};
});
var quoteService_createServerFn_handler = createServerRpc({
	id: "c4cee150f7c85294112a458bb7bf5ba715100bc7cf9de11a1e2f0b4d859a3eee",
	name: "quoteService",
	filename: "src/lib/solan/staff.ts"
}, (opts) => quoteService.__executeServer(opts));
var quoteService = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((d) => d).handler(quoteService_createServerFn_handler, async ({ context, data }) => {
	const { sql, profile } = await staffOf(context.userId);
	assertPerm(profile, "clients.services.manage");
	await sql`update service_requests set status = ${data.status}, quoted_price = ${data.price ?? null} where id = ${data.id}`;
	return { ok: true };
});
var saveAnnouncement_createServerFn_handler = createServerRpc({
	id: "7bf577ce68f9747e20c83ded19607f26c0cea49147b1bfcaffc669dc4f22e46f",
	name: "saveAnnouncement",
	filename: "src/lib/solan/staff.ts"
}, (opts) => saveAnnouncement.__executeServer(opts));
var saveAnnouncement = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((d) => d).handler(saveAnnouncement_createServerFn_handler, async ({ context, data }) => {
	const { sql, profile } = await staffOf(context.userId);
	assertPerm(profile, "website.settings");
	if (data.id) await sql`update announcements set title = ${data.title}, message = ${data.message},
        cta_text = ${data.cta_text || ""}, cta_url = ${data.cta_url || ""}, is_active = ${data.is_active ?? true}
        where id = ${data.id}`;
	else await sql`insert into announcements (id, title, message, cta_text, cta_url, is_active)
        values (${nid("ANN")}, ${data.title}, ${data.message}, ${data.cta_text || ""}, ${data.cta_url || ""}, ${data.is_active ?? true})`;
	await audit(profile.userId, "ANN_SAVE", "announcement", data.id || "new", data.title);
	return { ok: true };
});
//#endregion
export { allocatePanels_createServerFn_handler, exportCsv_createServerFn_handler, getCms_createServerFn_handler, getPermissionMatrix_createServerFn_handler, getStaffDashboard_createServerFn_handler, listAudit_createServerFn_handler, listClaims_createServerFn_handler, listClients_createServerFn_handler, listDocuments_createServerFn_handler, listEnquiries_createServerFn_handler, listPayments_createServerFn_handler, listProjects_createServerFn_handler, listServicesAdmin_createServerFn_handler, listStaffUsers_createServerFn_handler, listTickets_createServerFn_handler, quoteService_createServerFn_handler, recordPayment_createServerFn_handler, saveAnnouncement_createServerFn_handler, saveContent_createServerFn_handler, saveFaq_createServerFn_handler, saveSetting_createServerFn_handler, setEnquiryStatus_createServerFn_handler, setPermission_createServerFn_handler, setStaffRole_createServerFn_handler, staffNotify_createServerFn_handler, staffReplyTicket_createServerFn_handler, toggleProjectPublic_createServerFn_handler, transitionClaim_createServerFn_handler, verifyDocument_createServerFn_handler };
