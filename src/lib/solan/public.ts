import { createServerFn } from "@tanstack/react-start";
import { getSql, dbSource } from "@/lib/db";
import { nid } from "./ids";
import { ensureSeeded } from "./seed";

export const warmApp = createServerFn({ method: "GET" }).handler(async () => {
  await ensureSeeded();
  return { ok: true as const, db: dbSource };
});

export const getPublicSite = createServerFn({ method: "GET" }).handler(async () => {
  await ensureSeeded();
  const sql = await getSql();
  const contentRows = await sql<{ key: string; value: string }>`select key, value from website_content`;
  const content: Record<string, string> = {};
  for (const r of contentRows) content[r.key] = r.value;
  const faqs = await sql<{ id: string; question: string; answer: string }>`
    select id, question, answer from faqs where is_published = true order by sort_order`;
  const announcements = await sql<{ id: string; title: string; message: string; cta_text: string; cta_url: string }>`
    select id, title, message, cta_text, cta_url from announcements where is_active = true order by created_at desc`;
  const projects = await sql<{
    id: string; project_code: string; project_name: string; location: string;
    capacity_kw: string; total_panels: number; public_description: string; status: string;
  }>`select id, project_code, project_name, location, capacity_kw::text, total_panels, public_description, status
     from projects where is_public = true order by project_code`;
  const services = await sql<{ id: string; name: string; description: string; base_price: string }>`
    select id, name, description, base_price::text from services where is_active = true`;
  return { content, faqs, announcements, projects, services };
});

export const submitEnquiry = createServerFn({ method: "POST" })
  .validator((d: { name: string; email: string; phone?: string; message: string }) => d)
  .handler(async ({ data }) => {
    if (!data.name.trim() || !data.email.trim() || !data.message.trim()) {
      throw new Error("Name, email and message are required");
    }
    const sql = await getSql();
    await sql`insert into enquiries (id, name, email, phone, message)
      values (${nid("ENQ")}, ${data.name.trim()}, ${data.email.trim()}, ${data.phone?.trim() || ""}, ${data.message.trim()})`;
    return { ok: true };
  });
