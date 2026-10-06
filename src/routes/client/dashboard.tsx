import { createFileRoute, Navigate } from "@tanstack/react-router";
import { RedirectToSignIn } from "@/lib/auth/gates";
import { useCurrentUserState } from "@/lib/auth/use-current-user";
import { PortalShell, Stat, TableWrap, Td, Th } from "@/components/solan/portal-shell";
import { Area, Btn, Card, Field, Lab, Pill, warrantyTone } from "@/components/solan/ui";
import { CLIENT_NAV } from "@/lib/solan/permissions";
import { getMe } from "@/lib/solan/profile";
import {
  createClaim, createTicket, getCatalogServices, getClientClaims, getClientDocs,
  getClientGeneration, getClientNotifs, getClientOverview, getClientPanels,
  getClientPayments, getClientTickets, markNotifRead, replyTicket, requestService,
  saveConnection, saveKyc,
} from "@/lib/solan/client";
import { inr } from "@/lib/solan/ids";
import { useEffect, useMemo, useState } from "react";

export const Route = createFileRoute("/client/dashboard")({ component: ClientDash });

function ClientDash() {
  const { user, isPending } = useCurrentUserState();
  const [me, setMe] = useState<Awaited<ReturnType<typeof getMe>> | null>(null);
  const [tab, setTab] = useState("home");
  const [ov, setOv] = useState<Awaited<ReturnType<typeof getClientOverview>> | null>(null);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    if (isPending) return;
    getMe().then(setMe).catch(() => setMe(null));
  }, [user, isPending]);

  useEffect(() => {
    if (!me || me.role !== "CLIENT") return;
    getClientOverview().then(setOv).catch((e) => setMsg(e.message));
  }, [me]);

  if (isPending) return <div className="grid min-h-screen place-items-center bg-bg text-muted">Loading…</div>;
  if (!me && !user) return <RedirectToSignIn to="/login" />;
  if (me && me.role !== "CLIENT") return <Navigate to="/staff/dashboard" />;
  if (!me || !ov) return <div className="grid min-h-screen place-items-center bg-bg text-muted">Opening client portal…</div>;

  const vis = ov.profile as Record<string, unknown>;
  const items = CLIENT_NAV.filter((n) => !("vis" in n) || vis[n.vis as string] !== false).map((n) => ({ id: n.id, label: n.label }));

  return (
    <PortalShell title="Client portal" role="CLIENT" items={items} tab={tab} onTab={setTab}>
      {msg ? <p className="mb-4 text-sm text-danger">{msg}</p> : null}
      {tab === "home" ? <Home ov={ov} onTab={setTab} /> : null}
      {tab === "kyc" ? <Kyc ov={ov} reload={() => getClientOverview().then(setOv)} /> : null}
      {tab === "bill" ? <Bill ov={ov} reload={() => getClientOverview().then(setOv)} /> : null}
      {tab === "project" ? <Project ov={ov} /> : null}
      {tab === "panels" ? <Panels /> : null}
      {tab === "warranty" ? <Warranty /> : null}
      {tab === "money" ? <Payments /> : null}
      {tab === "docs" ? <Docs /> : null}
      {tab === "gen" ? <Gen /> : null}
      {tab === "services" ? <Services /> : null}
      {tab === "support" ? <Support /> : null}
      {tab === "notifications" ? <Notifs /> : null}
      {tab === "settings" ? (
        <Card>
          <h2 className="font-display text-xl font-semibold">Account</h2>
          <p className="mt-2 text-sm text-muted">{ov.user.name} · {ov.user.email} · {ov.user.phone || "no phone"}</p>
          <p className="mt-4 text-sm text-muted">Use the sun/moon control in the header to switch day and night mode. Preference is saved on this device.</p>
        </Card>
      ) : null}
    </PortalShell>
  );
}

function Home({ ov, onTab }: { ov: Awaited<ReturnType<typeof getClientOverview>>; onTab: (id: string) => void }) {
  const done = ov.stages.filter((s) => s.status === "COMPLETED").length;
  return (
    <div className="space-y-5">
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <Stat label="Allocated panels" value={ov.project?.allocated_panel_count ?? 0} />
        <Stat label="Capacity" value={`${ov.project?.allocated_capacity_kw ?? 0} kW`} />
        <Stat label="KYC" value={ov.profile.kyc_status} />
        <Stat label="Unread" value={ov.unread} />
      </div>
      <Card>
        <p className="font-mono text-[10px] tracking-wider text-muted uppercase">Farm project</p>
        <h2 className="mt-1 font-display text-2xl font-semibold">{ov.project?.project_name || "No farm allocated yet"}</h2>
        <p className="text-sm text-muted">{ov.project?.location} · {ov.project?.project_code}</p>
        <p className="mt-3 text-sm">Onboarding {done}/{ov.stages.length} stages complete.</p>
        <div className="mt-4 flex flex-wrap gap-2">
          <Btn variant="gold" onClick={() => onTab("panels")}>My panels</Btn>
          <Btn onClick={() => onTab("warranty")}>Warranty</Btn>
          <Btn onClick={() => onTab("gen")}>Generation</Btn>
        </div>
      </Card>
    </div>
  );
}

function Kyc({ ov, reload }: { ov: Awaited<ReturnType<typeof getClientOverview>>; reload: () => void }) {
  const p = ov.profile;
  const [status, setStatus] = useState("");
  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    try {
      await saveKyc({ data: {
        pan: String(fd.get("pan") || ""),
        panName: String(fd.get("panName") || ""),
        aadhaar: String(fd.get("aadhaar") || ""),
        address: String(fd.get("address") || ""),
        city: String(fd.get("city") || ""),
        state: String(fd.get("state") || ""),
        pincode: String(fd.get("pincode") || ""),
      } });
      setStatus("Saved.");
      reload();
    } catch (err) { setStatus(err instanceof Error ? err.message : "Failed"); }
  }
  return (
    <Card className="max-w-xl">
      <h2 className="mb-4 font-display text-xl font-semibold">Profile & KYC</h2>
      <form onSubmit={onSubmit} className="space-y-3">
        <div><Lab>PAN</Lab><Field name="pan" defaultValue={p.pan_number || ""} /></div>
        <div><Lab>Name on PAN</Lab><Field name="panName" defaultValue={p.pan_name || ""} /></div>
        <div><Lab>Aadhaar (masked)</Lab><Field name="aadhaar" defaultValue={p.aadhaar_masked || ""} /></div>
        <div><Lab>Address</Lab><Field name="address" defaultValue={p.address || ""} /></div>
        <div className="grid gap-3 sm:grid-cols-3">
          <div><Lab>City</Lab><Field name="city" defaultValue={p.city || ""} /></div>
          <div><Lab>State</Lab><Field name="state" defaultValue={p.state || ""} /></div>
          <div><Lab>PIN</Lab><Field name="pincode" defaultValue={p.pincode || ""} /></div>
        </div>
        <Btn variant="gold" type="submit">Save KYC</Btn>
        {status ? <p className="text-sm text-leaf">{status}</p> : null}
      </form>
    </Card>
  );
}

function Bill({ ov, reload }: { ov: Awaited<ReturnType<typeof getClientOverview>>; reload: () => void }) {
  const e = ov.electricity;
  const [status, setStatus] = useState("");
  async function onSubmit(ev: React.FormEvent<HTMLFormElement>) {
    ev.preventDefault();
    const fd = new FormData(ev.currentTarget);
    try {
      await saveConnection({ data: {
        rr: String(fd.get("rr") || ""),
        discom: String(fd.get("discom") || ""),
        address: String(fd.get("address") || ""),
        units: Number(fd.get("units") || 0),
      } });
      setStatus("Saved.");
      reload();
    } catch (err) { setStatus(err instanceof Error ? err.message : "Failed"); }
  }
  return (
    <Card className="max-w-xl">
      <h2 className="mb-2 font-display text-xl font-semibold">Usage connection</h2>
      <p className="mb-4 text-sm text-muted">This is the meter we bill farm generation against. Hardware stays at the Solan park — not on a house.</p>
      <form onSubmit={onSubmit} className="space-y-3">
        <div><Lab>RR / consumer number</Lab><Field name="rr" defaultValue={e?.rr_number || ""} /></div>
        <div><Lab>DISCOM</Lab><Field name="discom" defaultValue={e?.discom || ""} /></div>
        <div><Lab>Billing address</Lab><Field name="address" defaultValue={e?.service_address || ""} /></div>
        <div><Lab>Average monthly units</Lab><Field name="units" type="number" defaultValue={e?.avg_monthly_units ?? 0} /></div>
        <Btn variant="gold" type="submit">Save connection</Btn>
        {status ? <p className="text-sm text-leaf">{status}</p> : null}
      </form>
    </Card>
  );
}

function Project({ ov }: { ov: Awaited<ReturnType<typeof getClientOverview>> }) {
  return (
    <div className="space-y-4">
      <Card>
        <h2 className="font-display text-xl font-semibold">{ov.project?.project_name}</h2>
        <p className="text-sm text-muted">{ov.project?.location} · {ov.project?.project_code}</p>
        <p className="mt-2 text-sm">Contract {inr(ov.project?.contract_total)} · {ov.project?.allocated_panel_count} panels · {ov.project?.allocated_capacity_kw} kW</p>
      </Card>
      <Card>
        <h3 className="mb-3 font-semibold">Commissioning stages</h3>
        <ol className="space-y-2">
          {ov.stages.map((s) => (
            <li key={s.id} className="flex flex-wrap items-center justify-between gap-2 border-b border-line py-2 last:border-0">
              <span className="text-sm">{s.stage_number}. {s.stage_name}</span>
              <span className="flex gap-2">
                <Pill tone={s.status === "COMPLETED" ? "leaf" : s.status === "IN_PROGRESS" ? "gold" : "muted"}>{s.status}</Pill>
                {s.payment_required ? <Pill tone={s.payment_status === "PAID" ? "leaf" : "gold"}>{s.payment_status}</Pill> : null}
              </span>
            </li>
          ))}
        </ol>
      </Card>
    </div>
  );
}

function Panels() {
  const [rows, setRows] = useState<Awaited<ReturnType<typeof getClientPanels>>>([]);
  useEffect(() => { getClientPanels().then(setRows).catch(() => {}); }, []);
  return (
    <TableWrap>
      <table className="w-full">
        <thead className="bg-card"><tr><Th>Serial</Th><Th>Model</Th><Th>W</Th><Th>Status</Th><Th>Warranty</Th><Th>Ends</Th></tr></thead>
        <tbody>
          {rows.map((p) => (
            <tr key={p.id} className="border-t border-line">
              <Td className="font-mono text-gold">{p.serial_number}</Td>
              <Td>{p.manufacturer} {p.model}</Td>
              <Td>{p.watt_rating}</Td>
              <Td>{p.status}</Td>
              <Td><Pill tone={warrantyTone(p.warranty_status)}>{p.warranty_status}</Pill></Td>
              <Td>{p.warranty_end_date}</Td>
            </tr>
          ))}
        </tbody>
      </table>
    </TableWrap>
  );
}

function Warranty() {
  const [panels, setPanels] = useState<Awaited<ReturnType<typeof getClientPanels>>>([]);
  const [claims, setClaims] = useState<Awaited<ReturnType<typeof getClientClaims>>>([]);
  const [status, setStatus] = useState("");
  async function reload() {
    const [p, c] = await Promise.all([getClientPanels(), getClientClaims()]);
    setPanels(p); setClaims(c);
  }
  useEffect(() => { reload().catch(() => {}); }, []);
  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    try {
      await createClaim({ data: { panelId: String(fd.get("panelId")), issue: String(fd.get("issue")), details: String(fd.get("details")) } });
      setStatus("Claim submitted.");
      e.currentTarget.reset();
      await reload();
    } catch (err) { setStatus(err instanceof Error ? err.message : "Failed"); }
  }
  return (
    <div className="space-y-5">
      <Card className="max-w-xl">
        <h2 className="mb-3 font-display text-xl font-semibold">File a warranty claim</h2>
        <form onSubmit={onSubmit} className="space-y-3">
          <div>
            <Lab>Panel</Lab>
            <select name="panelId" className="min-h-11 w-full rounded-md border border-line bg-bg px-3" required>
              {panels.map((p) => <option key={p.id} value={p.id}>{p.serial_number} · {p.warranty_status}</option>)}
            </select>
          </div>
          <div><Lab>Issue</Lab><Field name="issue" required placeholder="Hotspot / output drop / physical damage" /></div>
          <div><Lab>Details</Lab><Area name="details" /></div>
          <Btn variant="gold" type="submit">Submit claim</Btn>
          {status ? <p className="text-sm text-leaf">{status}</p> : null}
        </form>
      </Card>
      <TableWrap>
        <table className="w-full">
          <thead className="bg-card"><tr><Th>Claim</Th><Th>Serial</Th><Th>Issue</Th><Th>Status</Th><Th>Opened</Th></tr></thead>
          <tbody>
            {claims.map((c) => (
              <tr key={c.id} className="border-t border-line">
                <Td className="font-mono">{c.id}</Td>
                <Td>{c.serial_number}</Td>
                <Td>{c.issue}</Td>
                <Td><Pill>{c.status}</Pill></Td>
                <Td>{c.created_at?.slice(0, 10)}</Td>
              </tr>
            ))}
          </tbody>
        </table>
      </TableWrap>
    </div>
  );
}

function Payments() {
  const [rows, setRows] = useState<Awaited<ReturnType<typeof getClientPayments>>>([]);
  useEffect(() => { getClientPayments().then(setRows).catch(() => {}); }, []);
  return (
    <TableWrap>
      <table className="w-full">
        <thead className="bg-card"><tr><Th>ID</Th><Th>Amount</Th><Th>Method</Th><Th>Ref</Th><Th>Status</Th></tr></thead>
        <tbody>
          {rows.map((p) => (
            <tr key={p.id} className="border-t border-line">
              <Td className="font-mono">{p.id}</Td>
              <Td>{inr(p.amount)}</Td>
              <Td>{p.payment_method}</Td>
              <Td>{p.transaction_reference}</Td>
              <Td><Pill tone="leaf">{p.status}</Pill></Td>
            </tr>
          ))}
        </tbody>
      </table>
    </TableWrap>
  );
}

function Docs() {
  const [rows, setRows] = useState<Awaited<ReturnType<typeof getClientDocs>>>([]);
  useEffect(() => { getClientDocs().then(setRows).catch(() => {}); }, []);
  return (
    <TableWrap>
      <table className="w-full">
        <thead className="bg-card"><tr><Th>Type</Th><Th>File</Th><Th>Status</Th><Th>Notes</Th></tr></thead>
        <tbody>
          {rows.map((d) => (
            <tr key={d.id} className="border-t border-line">
              <Td>{d.document_type}</Td>
              <Td>{d.original_filename}</Td>
              <Td><Pill tone={d.status === "VERIFIED" ? "leaf" : "gold"}>{d.status}</Pill></Td>
              <Td>{d.notes}</Td>
            </tr>
          ))}
        </tbody>
      </table>
    </TableWrap>
  );
}

function Gen() {
  const [g, setG] = useState<Awaited<ReturnType<typeof getClientGeneration>> | null>(null);
  useEffect(() => { getClientGeneration().then(setG).catch(() => {}); }, []);
  const max = useMemo(() => Math.max(1, ...(g?.days.map((d) => Number(d.kwh)) || [1])), [g]);
  if (!g) return <p className="text-muted">Loading generation…</p>;
  return (
    <div className="space-y-4">
      <div className="grid gap-3 sm:grid-cols-2">
        <Stat label="Last 30 days" value={`${g.month.toFixed(1)} kWh`} />
        <Stat label="Recorded total" value={`${g.total.toFixed(1)} kWh`} />
      </div>
      <Card>
        <p className="mb-3 text-sm text-muted">Daily generation from your farm strings. You are billed on this usage.</p>
        <div className="flex h-36 items-end gap-0.5">
          {g.days.slice(-30).map((d) => (
            <div key={d.day} className="flex-1 rounded-t bg-gold/80" style={{ height: `${(Number(d.kwh) / max) * 100}%` }} title={`${d.day}: ${d.kwh} kWh`} />
          ))}
        </div>
      </Card>
    </div>
  );
}

function Services() {
  const [data, setData] = useState<Awaited<ReturnType<typeof getCatalogServices>> | null>(null);
  const [status, setStatus] = useState("");
  useEffect(() => { getCatalogServices().then(setData).catch(() => {}); }, []);
  if (!data) return <p className="text-muted">Loading…</p>;
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      {data.catalog.map((s) => (
        <Card key={s.id}>
          <h3 className="font-display text-lg font-semibold">{s.name}</h3>
          <p className="mt-1 text-sm text-muted">{s.description}</p>
          <p className="mt-2 font-mono text-gold">{Number(s.base_price) ? inr(s.base_price) : "On request"}</p>
          <Btn className="mt-3" onClick={async () => {
            try { await requestService({ data: { serviceId: s.id, notes: "Requested from portal" } }); setStatus("Requested."); getCatalogServices().then(setData); }
            catch (e) { setStatus(e instanceof Error ? e.message : "Failed"); }
          }}>Request</Btn>
        </Card>
      ))}
      <Card className="lg:col-span-2">
        <h3 className="mb-2 font-semibold">My requests</h3>
        {status ? <p className="mb-2 text-sm text-leaf">{status}</p> : null}
        {data.mine.map((r) => <p key={r.id} className="border-b border-line py-2 text-sm">{r.name} · {r.status} {r.quoted_price ? `· ${inr(r.quoted_price)}` : ""}</p>)}
      </Card>
    </div>
  );
}

function Support() {
  const [tickets, setTickets] = useState<Awaited<ReturnType<typeof getClientTickets>>>([]);
  const [status, setStatus] = useState("");
  useEffect(() => { getClientTickets().then(setTickets).catch(() => {}); }, []);
  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    try {
      await createTicket({ data: { subject: String(fd.get("subject")), category: String(fd.get("category")), description: String(fd.get("description")) } });
      setStatus("Opened.");
      e.currentTarget.reset();
      setTickets(await getClientTickets());
    } catch (err) { setStatus(err instanceof Error ? err.message : "Failed"); }
  }
  return (
    <div className="space-y-5">
      <Card className="max-w-xl">
        <h2 className="mb-3 font-display text-xl font-semibold">New ticket</h2>
        <form onSubmit={onSubmit} className="space-y-3">
          <div><Lab>Subject</Lab><Field name="subject" required /></div>
          <div><Lab>Category</Lab>
            <select name="category" className="min-h-11 w-full rounded-md border border-line bg-bg px-3">
              <option>GENERAL</option><option>MAINTENANCE</option><option>BILLING</option><option>WARRANTY</option>
            </select>
          </div>
          <div><Lab>Details</Lab><Area name="description" required /></div>
          <Btn variant="gold" type="submit">Open ticket</Btn>
          {status ? <p className="text-sm text-leaf">{status}</p> : null}
        </form>
      </Card>
      {tickets.map((t) => (
        <Card key={t.id}>
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h3 className="font-semibold">{t.subject}</h3>
            <Pill>{t.status}</Pill>
          </div>
          <p className="mt-1 text-sm text-muted">{t.category} · {t.description}</p>
          <div className="mt-3 space-y-2">
            {t.replies.map((r) => <p key={r.id} className="rounded-md bg-cell p-2 text-sm">{r.body}</p>)}
          </div>
          <form className="mt-3 flex gap-2" onSubmit={async (e) => {
            e.preventDefault();
            const fd = new FormData(e.currentTarget);
            await replyTicket({ data: { ticketId: t.id, body: String(fd.get("body")) } });
            e.currentTarget.reset();
            setTickets(await getClientTickets());
          }}>
            <Field name="body" placeholder="Reply…" required />
            <Btn type="submit">Send</Btn>
          </form>
        </Card>
      ))}
    </div>
  );
}

function Notifs() {
  const [rows, setRows] = useState<Awaited<ReturnType<typeof getClientNotifs>>>([]);
  useEffect(() => { getClientNotifs().then(setRows).catch(() => {}); }, []);
  return (
    <div className="space-y-3">
      {rows.map((n) => (
        <Card key={n.id} className={n.is_read ? "opacity-70" : ""}>
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="font-semibold">{n.title}</p>
              <p className="text-sm text-muted">{n.message}</p>
            </div>
            {!n.is_read ? <Btn onClick={async () => { await markNotifRead({ data: n.id }); setRows(await getClientNotifs()); }}>Mark read</Btn> : <Pill tone="muted">READ</Pill>}
          </div>
        </Card>
      ))}
    </div>
  );
}
