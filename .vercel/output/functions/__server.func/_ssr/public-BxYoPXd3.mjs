import { r as createServerFn } from "./ssr.mjs";
import { r as getSql } from "./db-DtyDCssu.mjs";
import { c as ensureSeeded, d as nid } from "./seed-i8Ev38tG.mjs";
import { t as createServerRpc } from "./createServerRpc-CcvdN_gc.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/public-BxYoPXd3.js
var getPublicSite_createServerFn_handler = createServerRpc({
	id: "2162254bcf7554e4213846cce98d3f671567f0c3c636cf452865e0ed79d35335",
	name: "getPublicSite",
	filename: "src/lib/solan/public.ts"
}, (opts) => getPublicSite.__executeServer(opts));
var getPublicSite = createServerFn({ method: "GET" }).handler(getPublicSite_createServerFn_handler, async () => {
	await ensureSeeded();
	const sql = await getSql();
	const contentRows = await sql`select key, value from website_content`;
	const content = {};
	for (const r of contentRows) content[r.key] = r.value;
	return {
		content,
		faqs: await sql`
    select id, question, answer from faqs where is_published = true order by sort_order`,
		announcements: await sql`
    select id, title, message, cta_text, cta_url from announcements where is_active = true order by created_at desc`,
		projects: await sql`select id, project_code, project_name, location, capacity_kw::text, total_panels, public_description, status
     from projects where is_public = true order by project_code`,
		services: await sql`
    select id, name, description, base_price::text from services where is_active = true`
	};
});
var submitEnquiry_createServerFn_handler = createServerRpc({
	id: "15111aa7338831f558e4c86ab424fe90e3ea917c1d32099ef5dd5877228b8172",
	name: "submitEnquiry",
	filename: "src/lib/solan/public.ts"
}, (opts) => submitEnquiry.__executeServer(opts));
var submitEnquiry = createServerFn({ method: "POST" }).validator((d) => d).handler(submitEnquiry_createServerFn_handler, async ({ data }) => {
	if (!data.name.trim() || !data.email.trim() || !data.message.trim()) throw new Error("Name, email and message are required");
	await (await getSql())`insert into enquiries (id, name, email, phone, message)
      values (${nid("ENQ")}, ${data.name.trim()}, ${data.email.trim()}, ${data.phone?.trim() || ""}, ${data.message.trim()})`;
	return { ok: true };
});
//#endregion
export { getPublicSite_createServerFn_handler, submitEnquiry_createServerFn_handler };
