import { a as getServerFnById, i as TSS_SERVER_FUNCTION, r as createServerFn } from "./ssr.mjs";
import { r as getSql } from "./db-DtyDCssu.mjs";
import { t as authMiddleware } from "./middleware-BnQG7PXd.mjs";
import { c as ensureSeeded, d as nid, f as roleForEmail, i as DEFAULT_ROLE_PERMS, u as isStaff } from "./seed-i8Ev38tG.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/profile-CaSHhhIo.js
var createSsrRpc = (functionId) => {
	const url = "/_serverFn/" + functionId;
	const serverFnMeta = { id: functionId };
	const fn = async (...args) => {
		return (await getServerFnById(functionId, { origin: "server" }))(...args);
	};
	return Object.assign(fn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
async function loadProfile(userId, email, name) {
	await ensureSeeded();
	const sql = await getSql();
	let rows = await sql`
    select user_id, role, full_name, email, phone from profiles where user_id = ${userId}`;
	if (!rows.length) {
		const role = roleForEmail(email);
		await sql`insert into profiles (user_id, role, full_name, email)
      values (${userId}, ${role}, ${name || "Solan user"}, ${email || null})
      on conflict (user_id) do nothing`;
		if (role === "CLIENT") await sql`insert into client_profiles (id, user_id, kyc_status, onboarding_stage)
        values (${nid("C")}, ${userId}, 'PENDING', 'REGISTERED')
        on conflict (user_id) do nothing`;
		rows = await sql`select user_id, role, full_name, email, phone from profiles where user_id = ${userId}`;
	}
	const p = rows[0];
	const client = await sql`select id from client_profiles where user_id = ${userId}`;
	const permRows = await sql`
    select code from role_permissions where role = ${p.role} and allowed = true`;
	const permissions = permRows.length ? permRows.map((r) => r.code) : [...DEFAULT_ROLE_PERMS[p.role] || []];
	return {
		userId: p.user_id,
		role: p.role,
		fullName: p.full_name,
		email: p.email,
		phone: p.phone,
		permissions,
		clientId: client[0]?.id ?? null
	};
}
function assertPerm(profile, code) {
	if (profile.role === "PRIMARY_ADMIN") return;
	if (!profile.permissions.includes(code)) {
		const err = /* @__PURE__ */ new Error("Forbidden");
		err.status = 403;
		throw err;
	}
}
function assertStaff(profile) {
	if (!isStaff(profile.role)) {
		const err = /* @__PURE__ */ new Error("Forbidden");
		err.status = 403;
		throw err;
	}
}
var getMe = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(createSsrRpc("548a1f26dd020c7e3b2500078563b8e3e202af9e897db87b2ffec235ceadafda"));
async function audit(actorId, action, entity, entityId, detail) {
	await (await getSql())`insert into audit_logs (id, actor_user_id, action, entity, entity_id, detail)
    values (${nid("AUD")}, ${actorId}, ${action}, ${entity}, ${entityId}, ${detail})`;
}
//#endregion
export { getMe as a, createSsrRpc as i, assertStaff as n, loadProfile as o, audit as r, assertPerm as t };
