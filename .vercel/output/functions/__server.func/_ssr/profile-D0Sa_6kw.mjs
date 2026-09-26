import { r as createServerFn } from "./ssr.mjs";
import { r as getSql } from "./db-DtyDCssu.mjs";
import { t as authMiddleware } from "./middleware-BnQG7PXd.mjs";
import { c as ensureSeeded, d as nid, f as roleForEmail, i as DEFAULT_ROLE_PERMS } from "./seed-i8Ev38tG.mjs";
import { t as createServerRpc } from "./createServerRpc-CcvdN_gc.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/profile-D0Sa_6kw.js
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
var getMe_createServerFn_handler = createServerRpc({
	id: "548a1f26dd020c7e3b2500078563b8e3e202af9e897db87b2ffec235ceadafda",
	name: "getMe",
	filename: "src/lib/solan/profile.ts"
}, (opts) => getMe.__executeServer(opts));
var getMe = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(getMe_createServerFn_handler, async ({ context }) => {
	const u = await (await getSql())`
      select email, name from "user" where id = ${context.userId}`;
	return loadProfile(context.userId, u[0]?.email, u[0]?.name);
});
//#endregion
export { getMe_createServerFn_handler };
