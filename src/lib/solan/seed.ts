import { getSql } from "@/lib/db";
import { ALL_PERMISSIONS, DEFAULT_ROLE_PERMS, STAGE_DEFS, type Role } from "./permissions";
import { nid, STAFF_SEED } from "./ids";

const globalRef = globalThis as typeof globalThis & { __solanSeededV3__?: Promise<void> };

const DEMO_PASSWORD_HASH =
  "e33ceec2ddabb3b41bbda77721b6fa88:9de66b7294465389ed0cefd29e4458856cb9b50ee6b19c10c6eed95e928eb380b70ff5668f4aca2f76a3e80512c316857b293e075a5496167c967b90205f2b69";

async function ensureAuthUsers() {
  const sql = await getSql();
  for (const u of STAFF_SEED) {
    const found = await sql<{ id: string }>`select id from "user" where email = ${u.email}`;
    const id = found[0]?.id ?? crypto.randomUUID();
    if (!found.length) {
      await sql`insert into "user" (id, name, email, "emailVerified") values (${id}, ${u.name}, ${u.email}, true)`;
    }
    const acc = await sql<{ id: string }>`
      select id from "account" where "userId" = ${id} and "providerId" = ${"credential"}`;
    if (acc.length) {
      await sql`update "account" set password = ${DEMO_PASSWORD_HASH}, "updatedAt" = now() where id = ${acc[0].id}`;
    } else {
      await sql`insert into "account" (id, "accountId", "providerId", "userId", password, "createdAt", "updatedAt")
        values (${crypto.randomUUID()}, ${id}, ${"credential"}, ${id}, ${DEMO_PASSWORD_HASH}, now(), now())`;
    }
  }
}

export async function ensureSeeded() {
  if (!globalRef.__solanSeededV3__) {
    globalRef.__solanSeededV3__ = (async () => {
      const sql = await getSql();
      await ensureAuthUsers();

      const users = await sql<{ id: string; email: string; name: string }>`
        select id, email, name from "user"`;
      const byEmail = Object.fromEntries(users.map((u) => [u.email, u]));

      for (const s of STAFF_SEED) {
        const u = byEmail[s.email];
        if (!u) continue;
        await sql`
          insert into profiles (user_id, role, full_name, email, phone)
          values (${u.id}, ${s.role}, ${s.name}, ${s.email}, ${s.role === "CLIENT" ? "9999999999" : null})
          on conflict (user_id) do nothing`;
      }

      const existingPerms = await sql`select 1 from role_permissions limit 1`;
      if (!existingPerms.length) {
        for (const role of Object.keys(DEFAULT_ROLE_PERMS) as Role[]) {
          for (const code of ALL_PERMISSIONS) {
            const allowed = DEFAULT_ROLE_PERMS[role].includes(code);
            await sql`insert into role_permissions (role, code, allowed) values (${role}, ${code}, ${allowed}) on conflict do nothing`;
          }
        }
      }

      const existingProjects = await sql`select 1 from projects limit 1`;
      let projectIds: string[] = [];
      let serviceIds: string[] = [];
      if (!existingProjects.length) {

      const content: Record<string, string> = {
        company_name: "Solan",
        footer_text: "We own the land and the farm. You own the panels. We maintain everything and bill energy on usage.",
        support_email: "hello@solan.energy",
        support_phone: "+91 44 4000 1234",
        hero_heading: "You buy the panels. We run the farm.",
        hero_desc: "Solan builds solar parks on open land. Clients purchase panels there. We install, maintain and operate everything — and you pay for the energy those panels generate.",
        about_blurb: "Solan is not a rooftop installer. We develop solar farms on empty land, sell panel capacity to clients, and keep the plant running.",
      };
      for (const [k, v] of Object.entries(content)) {
        await sql`insert into website_content (key, value) values (${k}, ${v}) on conflict do nothing`;
      }
      await sql`insert into system_settings (key, value) values ('warranty_expiring_days', '90') on conflict do nothing`;
      await sql`insert into system_settings (key, value) values ('panel_watt', '400') on conflict do nothing`;
      await sql`insert into system_settings (key, value) values ('panel_price', '62000') on conflict do nothing`;

      const faqs = [
        ["Do you install on my roof?", "No. Solan only builds farms on open land we operate. Nothing is mounted on your house."],
        ["What do I buy?", "You buy serial-tracked panels at a Solan farm. We install, maintain and sell you the energy they generate."],
        ["How is billing done?", "Usage billing. You pay for the kilowatt-hours your panels produce, shown in the client portal."],
        ["What is the warranty?", "Manufacturer warranty is typically 25 years. Claims are filed from your portal against a panel serial."],
        ["Can I visit the farm?", "Yes. Scheduled farm visits can be requested through support tickets."],
      ];
      for (let i = 0; i < faqs.length; i++) {
        const f = faqs[i];
        await sql`insert into faqs (id, question, answer, sort_order) values (${nid("FAQ")}, ${f[0]}, ${f[1]}, ${i})`;
      }
      await sql`insert into announcements (id, title, message, cta_text, cta_url)
        values (${nid("ANN")}, 'Open-land farms, usage billing', 'Buy panels at Chennai Solar Park A. We operate the plant. You pay for generation.', 'See farms', '/solar')`;

      const services = [
        ["Extra cleaning cycle", "Additional farm-side module cleaning beyond the included schedule.", 4500],
        ["Generation report pack", "Certified monthly generation extract for lenders or tax filing.", 2500],
        ["Farm visit", "Guided walkthrough of your allocated strings at the park.", 0],
      ];
      for (const [name, desc, price] of services) {
        const id = nid("SVC");
        serviceIds.push(id);
        await sql`insert into services (id, name, description, base_price) values (${id}, ${name}, ${desc}, ${price})`;
      }

      const specs = [
        ["CHN-001", "Chennai Solar Park A", "Chennai, Tamil Nadu", true, "Open-land farm south of Chennai. 48 kW commissioned block."],
        ["BLR-001", "Bengaluru Solar Ridge", "Bengaluru, Karnataka", true, "Ridge farm with high irradiance and dedicated O&M crew."],
        ["HYD-001", "Hyderabad Solar Commons", "Hyderabad, Telangana", false, "Expansion park — not yet listed publicly."],
      ] as const;
      for (const [code, name, loc, pub, desc] of specs) {
        const id = nid("PRJ");
        projectIds.push(id);
        await sql`insert into projects (id, project_code, project_name, location, capacity_kw, total_panels, status, is_public, public_description, commissioning_date)
          values (${id}, ${code}, ${name}, ${loc}, ${48}, ${120}, 'ACTIVE', ${pub}, ${desc}, '2024-06-01')`;
        for (let i = 1; i <= 120; i++) {
          await sql`insert into panels (id, serial_number, project_id, watt_rating, status, added_sequence)
            values (${nid("PNL")}, ${`${code}-P${String(i).padStart(5, "0")}`}, ${id}, 400, 'AVAILABLE', ${i})`;
        }
      }
      } else {
        const existing = await sql<{ id: string }>`select id from projects order by project_code`;
        projectIds = existing.map((p) => p.id);
      }

      const demoUser = byEmail["demo@solan.energy"];
      if (!demoUser) return;
      const clientId = nid("C");
      await sql`insert into client_profiles (id, user_id, address, city, state, pincode, kyc_status, pan_number, pan_name, aadhaar_masked, onboarding_stage, admin_notes)
        values (${clientId}, ${demoUser.id}, 'Demo Solar Address, T. Nagar', 'Chennai', 'Tamil Nadu', '600017', 'VERIFIED', 'ABCDE1234F', 'DEMO SOLAR CUSTOMER', 'XXXX XXXX 4321', 'ACTIVE', '[DEMO] Seeded client for portal testing.')
        on conflict (user_id) do nothing`;
      const cp = (await sql<{ id: string }>`select id from client_profiles where user_id = ${demoUser.id}`)[0];
      if (!cp) return;
      const cid = cp.id;

      const hasDemo = await sql`select 1 from panels where client_id = ${cid} limit 1`;
      if (hasDemo.length) return;

      await sql`insert into electricity_connections (id, client_id, rr_number, discom, division, service_address, tariff, sanctioned_load_kw, avg_monthly_units, avg_monthly_bill, proposed_kw, system_cost, subsidy_estimate, payable_amount)
        values (${nid("EC")}, ${cid}, 'TNEB-DEMO-999001', 'TANGEDCO', 'Chennai South, T. Nagar', 'Demo Solar Address, T. Nagar, Chennai 600017', 'LT Domestic', 5, 350, 2485, 4, 248000, 78000, 170000)
        on conflict (client_id) do nothing`;

      for (const [type, status] of [
        ["PAN", "VERIFIED"], ["AADHAAR", "VERIFIED"], ["ELECTRICITY_BILL", "VERIFIED"], ["AGREEMENT", "VERIFIED"],
      ]) {
        await sql`insert into documents (id, client_id, document_type, original_filename, status, notes)
          values (${nid("DOC")}, ${cid}, ${type}, ${`demo_${type.toLowerCase()}.pdf`}, ${status}, 'Demo document')`;
      }

      const avail = await sql<{ id: string; serial_number: string }>`
        select id, serial_number from panels where project_id = ${projectIds[0]} and status = 'AVAILABLE' order by added_sequence limit 10`;
      const today = new Date();
      const iso = (d: Date) => d.toISOString().slice(0, 10);
      for (let i = 0; i < avail.length; i++) {
        const start = new Date(today);
        start.setFullYear(start.getFullYear() - 2);
        const end = new Date(start);
        end.setFullYear(end.getFullYear() + 25);
        if (i === 0) {
          end.setTime(today.getTime() + 40 * 86400000);
        }
        await sql`update panels set status = 'INSTALLED', client_id = ${cid},
          installation_date = ${iso(start)}, purchase_date = ${iso(start)},
          warranty_start_date = ${iso(start)}, warranty_end_date = ${iso(end)}
          where id = ${avail[i].id}`;
      }
      await sql`insert into client_projects (id, client_id, project_id, allocated_panel_count, allocated_capacity_kw, contract_total)
        values (${nid("CP")}, ${cid}, ${projectIds[0]}, 10, 4, 170000) on conflict (client_id) do nothing`;

      for (const st of STAGE_DEFS) {
        const status = st.n <= 5 ? "COMPLETED" : st.n === 6 ? "IN_PROGRESS" : "NOT_STARTED";
        const pay = st.pay ? (st.n <= 5 ? "PAID" : "NOT_DUE") : "NOT_DUE";
        await sql`insert into project_stages (id, client_id, stage_number, stage_name, percentage, status, payment_required, payment_status)
          values (${nid("STG")}, ${cid}, ${st.n}, ${st.name}, ${st.pct}, ${status}, ${st.pay}, ${pay})`;
      }
      await sql`insert into payments (id, client_id, amount, payment_method, transaction_reference, status, paid_at)
        values (${nid("PAY")}, ${cid}, 68000, 'UPI', 'UPI-DEMO-001', 'SUCCESS', now())`;
      await sql`insert into payments (id, client_id, amount, payment_method, transaction_reference, status, paid_at)
        values (${nid("PAY")}, ${cid}, 102000, 'NEFT', 'NEFT-DEMO-002', 'SUCCESS', now())`;

      for (let d = 29; d >= 0; d--) {
        const day = new Date(today);
        day.setDate(day.getDate() - d);
        const kwh = 12 + Math.round(Math.sin(d / 3) * 3 + (d % 5));
        await sql`insert into generation_daily (id, client_id, day, kwh)
          values (${nid("GEN")}, ${cid}, ${iso(day)}::date, ${kwh}) on conflict do nothing`;
      }

      await sql`insert into notifications (id, user_id, title, message, kind)
        values (${nid("NTF")}, ${demoUser.id}, 'Welcome to Solan', 'Your 10 farm panels are live. Generation is billing on usage.', 'INFO')`;
      await sql`insert into notifications (id, user_id, title, message, kind)
        values (${nid("NTF")}, ${demoUser.id}, 'Warranty watch', 'One panel is expiring soon. Open Warranty to review.', 'WARN')`;

      await sql`insert into support_tickets (id, client_id, subject, category, description, status)
        values (${nid("TCK")}, ${cid}, 'When is the next farm cleaning?', 'MAINTENANCE', 'Please share the next scheduled cleaning for Chennai Park A.', 'OPEN')`;

      if (serviceIds[0]) {
        await sql`insert into service_requests (id, client_id, service_id, status, quoted_price, notes)
          values (${nid("SR")}, ${cid}, ${serviceIds[0]}, 'QUOTED', 4500, 'Optional extra cleaning')`;
      }

      const admin = byEmail["admin@solan.energy"];
      await sql`insert into audit_logs (id, actor_user_id, action, entity, entity_id, detail)
        values (${nid("AUD")}, ${admin?.id ?? null}, 'SEED', 'system', 'bootstrap', 'Demo data seeded')`;
    })().catch((err) => {
      console.error("[solan] seed failed", err);
      globalRef.__solanSeededV3__ = undefined;
      throw err;
    });
  }
  return globalRef.__solanSeededV3__;
}
