import { createFileRoute, Navigate } from "@tanstack/react-router";
import { RedirectToSignIn } from "@/lib/auth/gates";
import { useCurrentUserState } from "@/lib/auth/use-current-user";
import { PortalShell, Stat, TableWrap, Td, Th } from "@/components/solan/portal-shell";
import { Area, Btn, Card, Field, Lab, Pill } from "@/components/solan/ui";
import { STAFF_NAV, type Role } from "@/lib/solan/permissions";
import { getMe } from "@/lib/solan/profile";
import {
  allocatePanels, exportCsv, getCms, getPermissionMatrix, getStaffDashboard,
  listAudit, listClaims, listClients, listDocuments, listEnquiries, listPayments,
  listProjects, listServicesAdmin, listStaffUsers, listTickets, quoteService,
  recordPayment, saveAnnouncement, saveContent, saveFaq, saveSetting,
  setEnquiryStatus, setPermission, setStaffRole, staffNotify, staffReplyTicket,
  toggleProjectPublic, transitionClaim, verifyDocument,
} from "@/lib/solan/staff";
import { inr } from "@/lib/solan/ids";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/staff/dashboard")({ component: StaffDash });

function can(role: Role, perms: string[], code?: string) {
  if (!code) return true;
  if (role === "PRIMARY_ADMIN") return true;
  return perms.includes(code);
}

function StaffDash() {
  const { user, isPending } = useCurrentUserState();
  const [me, setMe] = useState<Awaited<ReturnType<typeof getMe>> | null>(null);
  const [tab, setTab] = useState("dashboard");
  const [err, setErr] = useState("");

  useEffect(() => {
    if (isPending) return;
    getMe().then(setMe).catch((e) => setErr(e.message));
  }, [user, isPending]);

  if (isPending) return <div className="grid min-h-screen place-items-center bg-bg text-muted">Loading…</div>;
  if (!user && !me) return <RedirectToSignIn to="/staff-login" />;
  if (me && me.role === "CLIENT") return <Navigate to="/client/dashboard" />;
  if (!me) return <div className="grid min-h-screen place-items-center bg-bg text-muted">{err || "Opening staff portal…"}</div>;

  const role = me.role as Exclude<Role, "CLIENT">;
  const items = (STAFF_NAV[role] || []).filter((n) => can(me.role, me.permissions, n.perm));

  return (
    <PortalShell title="Operations" role={me.role} items={items} tab={tab} onTab={setTab}>
      {tab === "dashboard" ? <Dash /> : null}
      {tab === "clients" ? <Clients /> : null}
      {tab === "projects" ? <Projects /> : null}
      {tab === "allocate" ? <Allocate /> : null}
      {tab === "warranty" ? <Claims /> : null}
      {tab === "payments" ? <Pays /> : null}
      {tab === "services" ? <Svcs /> : null}
      {tab === "tickets" ? <Tickets /> : null}
      {tab === "documents" ? <Docs /> : null}
      {tab === "enquiries" ? <Enquiries /> : null}
      {tab === "staff" ? <Staff me={me} /> : null}
      {tab === "reports" ? <Reports /> : null}
      {tab === "audit" ? <Audit /> : null}
      {tab === "website" || tab === "faqs" || tab === "announcements" || tab === "settings" ? <Cms tab={tab} /> : null}
      {tab === "permissions" ? <Perms /> : null}
      {tab === "notifications" ? <Notify /> : null}
    </PortalShell>
  );
}

function Dash() {
  const [d, setD] = useState<Awaited<ReturnType<typeof getStaffDashboard>> | null>(null);
  useEffect(() => { getStaffDashboard().then(setD).catch(() => {}); }, []);
  if (!d) return <p className="text-muted">Loading…</p>;
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      <Stat label="Clients" value={d.clients} />
      <Stat label="Panels" value={d.panels} />
      <Stat label="Allocated" value={d.allocated} />
      <Stat label="Open tickets" value={d.openTickets} />
      <Stat label="Open claims" value={d.openClaims} />
      <Stat label="New enquiries" value={d.newEnquiries} />
    </div>
  );
}

function Clients() {
  const [rows, setRows] = useState<Awaited<ReturnType<typeof listClients>>>([]);
  useEffect(() => { listClients().then(setRows).catch(() => {}); }, []);
  return (
    <TableWrap>
      <table className="w-full">
        <thead className="bg-card"><tr><Th>Name</Th><Th>Email</Th><Th>Phone</Th><Th>KYC</Th><Th>City</Th><Th>Panels</Th></tr></thead>
        <tbody>
          {rows.map((c) => (
            <tr key={c.id} className="border-t border-line">
              <Td>{c.full_name}</Td><Td>{c.email}</Td><Td>{c.phone}</Td>
              <Td><Pill tone={c.kyc_status === "VERIFIED" ? "leaf" : "gold"}>{c.kyc_status}</Pill></Td>
              <Td>{c.city}</Td><Td>{c.panels}</Td>
            </tr>
          ))}
        </tbody>
      </table>
    </TableWrap>
  );
}

function Projects() {
  const [rows, setRows] = useState<Awaited<ReturnType<typeof listProjects>>>([]);
  async function load() { setRows(await listProjects()); }
  useEffect(() => { load().catch(() => {}); }, []);
  return (
    <TableWrap>
      <table className="w-full">
        <thead className="bg-card"><tr><Th>Code</Th><Th>Farm</Th><Th>Location</Th><Th>Panels</Th><Th>Available</Th><Th>Public</Th></tr></thead>
        <tbody>
          {rows.map((p) => (
            <tr key={p.id} className="border-t border-line">
              <Td className="font-mono text-gold">{p.project_code}</Td>
              <Td>{p.project_name}</Td><Td>{p.location}</Td>
              <Td>{p.total_panels}</Td><Td>{p.available}</Td>
              <Td>
                <Btn onClick={async () => { await toggleProjectPublic({ data: p.id }); await load(); }}>{p.is_public ? "Public" : "Private"}</Btn>
              </Td>
            </tr>
          ))}
        </tbody>
      </table>
    </TableWrap>
  );
}

function Allocate() {
  const [clients, setClients] = useState<Awaited<ReturnType<typeof listClients>>>([]);
  const [projects, setProjects] = useState<Awaited<ReturnType<typeof listProjects>>>([]);
  const [status, setStatus] = useState("");
  useEffect(() => {
    listClients().then(setClients).catch(() => {});
    listProjects().then(setProjects).catch(() => {});
  }, []);
  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    try {
      const r = await allocatePanels({ data: { projectId: String(fd.get("projectId")), clientId: String(fd.get("clientId")), count: Number(fd.get("count")) } });
      setStatus(`Allocated ${r.allocated} panels.`);
    } catch (err) { setStatus(err instanceof Error ? err.message : "Failed"); }
  }
  return (
    <Card className="max-w-xl">
      <h2 className="mb-3 font-display text-xl font-semibold">FIFO panel allocation</h2>
      <form onSubmit={onSubmit} className="space-y-3">
        <div><Lab>Client</Lab>
          <select name="clientId" className="min-h-11 w-full rounded-md border border-line bg-bg px-3" required>
            {clients.map((c) => <option key={c.id} value={c.id}>{c.full_name} ({c.panels} panels)</option>)}
          </select>
        </div>
        <div><Lab>Farm</Lab>
          <select name="projectId" className="min-h-11 w-full rounded-md border border-line bg-bg px-3" required>
            {projects.map((p) => <option key={p.id} value={p.id}>{p.project_code} · {p.available} available</option>)}
          </select>
        </div>
        <div><Lab>Count</Lab><Field name="count" type="number" defaultValue={1} min={1} max={50} /></div>
        <Btn variant="gold" type="submit">Allocate</Btn>
        {status ? <p className="text-sm text-leaf">{status}</p> : null}
      </form>
    </Card>
  );
}

function Claims() {
  const [data, setData] = useState<Awaited<ReturnType<typeof listClaims>> | null>(null);
  const [err, setErr] = useState("");
  async function load() { setData(await listClaims()); }
  useEffect(() => { load().catch((e) => setErr(e.message)); }, []);
  if (!data) return <p className="text-muted">{err || "Loading…"}</p>;
  return (
    <TableWrap>
      <table className="w-full">
        <thead className="bg-card"><tr><Th>Claim</Th><Th>Client</Th><Th>Serial</Th><Th>Issue</Th><Th>Status</Th><Th>Next</Th></tr></thead>
        <tbody>
          {data.claims.map((c) => (
            <tr key={c.id} className="border-t border-line">
              <Td className="font-mono">{c.id}</Td>
              <Td>{c.full_name}</Td>
              <Td>{c.serial_number}</Td>
              <Td>{c.issue}</Td>
              <Td><Pill>{c.status}</Pill></Td>
              <Td>
                <div className="flex flex-wrap gap-1">
                  {(data.transitions[c.status] || []).map((s) => (
                    <Btn key={s} className="min-h-9 px-2 py-1 text-xs" onClick={async () => {
                      try { await transitionClaim({ data: { claimId: c.id, status: s } }); await load(); setErr(""); }
                      catch (e) { setErr(e instanceof Error ? e.message : "Failed"); }
                    }}>{s.replace(/_/g, " ")}</Btn>
                  ))}
                </div>
              </Td>
            </tr>
          ))}
        </tbody>
      </table>
      {err ? <p className="p-3 text-sm text-danger">{err}</p> : null}
    </TableWrap>
  );
}

function Pays() {
  const [rows, setRows] = useState<Awaited<ReturnType<typeof listPayments>>>([]);
  const [clients, setClients] = useState<Awaited<ReturnType<typeof listClients>>>([]);
  const [status, setStatus] = useState("");
  async function load() { setRows(await listPayments()); }
  useEffect(() => { load().catch(() => {}); listClients().then(setClients).catch(() => {}); }, []);
  return (
    <div className="space-y-5">
      <Card className="max-w-xl">
        <h2 className="mb-3 font-semibold">Record payment</h2>
        <form className="space-y-3" onSubmit={async (e) => {
          e.preventDefault();
          const fd = new FormData(e.currentTarget);
          try {
            await recordPayment({ data: { clientId: String(fd.get("clientId")), amount: Number(fd.get("amount")), method: String(fd.get("method")) } });
            setStatus("Recorded.");
            await load();
          } catch (err) { setStatus(err instanceof Error ? err.message : "Failed"); }
        }}>
          <div><Lab>Client</Lab>
            <select name="clientId" className="min-h-11 w-full rounded-md border border-line bg-bg px-3">{clients.map((c) => <option key={c.id} value={c.id}>{c.full_name}</option>)}</select>
          </div>
          <div><Lab>Amount</Lab><Field name="amount" type="number" required /></div>
          <div><Lab>Method</Lab><Field name="method" defaultValue="UPI" /></div>
          <Btn variant="gold" type="submit">Save</Btn>
          {status ? <p className="text-sm text-leaf">{status}</p> : null}
        </form>
      </Card>
      <TableWrap>
        <table className="w-full">
          <thead className="bg-card"><tr><Th>ID</Th><Th>Client</Th><Th>Amount</Th><Th>Method</Th><Th>Status</Th></tr></thead>
          <tbody>{rows.map((p) => <tr key={p.id} className="border-t border-line"><Td className="font-mono">{p.id}</Td><Td>{p.full_name}</Td><Td>{inr(p.amount)}</Td><Td>{p.payment_method}</Td><Td>{p.status}</Td></tr>)}</tbody>
        </table>
      </TableWrap>
    </div>
  );
}

function Svcs() {
  const [data, setData] = useState<Awaited<ReturnType<typeof listServicesAdmin>> | null>(null);
  useEffect(() => { listServicesAdmin().then(setData).catch(() => {}); }, []);
  if (!data) return <p className="text-muted">Loading…</p>;
  return (
    <div className="space-y-4">
      {data.reqs.map((r) => (
        <Card key={r.id} className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="font-semibold">{r.name}</p>
            <p className="text-sm text-muted">{r.full_name} · {r.status} {r.quoted_price ? `· ${inr(r.quoted_price)}` : ""}</p>
          </div>
          <div className="flex gap-2">
            <Btn onClick={async () => { await quoteService({ data: { id: r.id, status: "QUOTED", price: Number(r.quoted_price || 0) } }); setData(await listServicesAdmin()); }}>Quote</Btn>
            <Btn variant="gold" onClick={async () => { await quoteService({ data: { id: r.id, status: "COMPLETED" } }); setData(await listServicesAdmin()); }}>Complete</Btn>
          </div>
        </Card>
      ))}
    </div>
  );
}

function Tickets() {
  const [rows, setRows] = useState<Awaited<ReturnType<typeof listTickets>>>([]);
  useEffect(() => { listTickets().then(setRows).catch(() => {}); }, []);
  return (
    <div className="space-y-4">
      {rows.map((t) => (
        <Card key={t.id}>
          <div className="flex flex-wrap justify-between gap-2">
            <h3 className="font-semibold">{t.subject} · {t.full_name}</h3>
            <Pill>{t.status}</Pill>
          </div>
          <p className="mt-1 text-sm text-muted">{t.description}</p>
          {t.replies.map((r, i) => <p key={i} className="mt-2 rounded-md bg-cell p-2 text-sm">{r.body}</p>)}
          <form className="mt-3 flex flex-wrap gap-2" onSubmit={async (e) => {
            e.preventDefault();
            const fd = new FormData(e.currentTarget);
            await staffReplyTicket({ data: { ticketId: t.id, body: String(fd.get("body")), status: String(fd.get("status")) } });
            e.currentTarget.reset();
            setRows(await listTickets());
          }}>
            <Field name="body" placeholder="Reply…" required className="flex-1" />
            <select name="status" className="min-h-11 rounded-md border border-line bg-bg px-3">
              <option>IN_PROGRESS</option><option>WAITING_FOR_CLIENT</option><option>RESOLVED</option><option>CLOSED</option>
            </select>
            <Btn type="submit" variant="gold">Send</Btn>
          </form>
        </Card>
      ))}
    </div>
  );
}

function Docs() {
  const [rows, setRows] = useState<Awaited<ReturnType<typeof listDocuments>>>([]);
  async function load() { setRows(await listDocuments()); }
  useEffect(() => { load().catch(() => {}); }, []);
  return (
    <TableWrap>
      <table className="w-full">
        <thead className="bg-card"><tr><Th>Client</Th><Th>Type</Th><Th>File</Th><Th>Status</Th><Th></Th></tr></thead>
        <tbody>
          {rows.map((d) => (
            <tr key={d.id} className="border-t border-line">
              <Td>{d.full_name}</Td><Td>{d.document_type}</Td><Td>{d.original_filename}</Td>
              <Td><Pill>{d.status}</Pill></Td>
              <Td><Btn onClick={async () => { await verifyDocument({ data: { id: d.id, status: "VERIFIED" } }); await load(); }}>Verify</Btn></Td>
            </tr>
          ))}
        </tbody>
      </table>
    </TableWrap>
  );
}

function Enquiries() {
  const [rows, setRows] = useState<Awaited<ReturnType<typeof listEnquiries>>>([]);
  async function load() { setRows(await listEnquiries()); }
  useEffect(() => { load().catch(() => {}); }, []);
  return (
    <div className="space-y-3">
      {rows.map((e) => (
        <Card key={e.id}>
          <p className="font-semibold">{e.name} · {e.email}</p>
          <p className="text-sm text-muted">{e.phone} · {e.status}</p>
          <p className="mt-2 text-sm">{e.message}</p>
          <div className="mt-3 flex gap-2">
            {["NEW", "IN_PROGRESS", "CLOSED"].map((s) => (
              <Btn key={s} onClick={async () => { await setEnquiryStatus({ data: { id: e.id, status: s } }); await load(); }}>{s}</Btn>
            ))}
          </div>
        </Card>
      ))}
    </div>
  );
}

function Staff({ me }: { me: Awaited<ReturnType<typeof getMe>> }) {
  const [rows, setRows] = useState<Awaited<ReturnType<typeof listStaffUsers>>>([]);
  const [err, setErr] = useState("");
  async function load() { setRows(await listStaffUsers()); }
  useEffect(() => { load().catch((e) => setErr(e.message)); }, []);
  const options = me.role === "PRIMARY_ADMIN" ? ["ADMIN", "SUPER_ADMIN"] : me.role === "SUPER_ADMIN" ? ["ADMIN"] : [];
  return (
    <div className="space-y-3">
      {err ? <p className="text-sm text-danger">{err}</p> : null}
      {rows.map((u) => (
        <Card key={u.user_id} className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="font-semibold">{u.full_name}</p>
            <p className="text-sm text-muted">{u.email} · {u.role}</p>
          </div>
          {options.length && u.role !== "PRIMARY_ADMIN" ? (
            <select className="min-h-11 rounded-md border border-line bg-bg px-3" defaultValue={u.role} onChange={async (e) => {
              try { await setStaffRole({ data: { userId: u.user_id, role: e.target.value as Role } }); await load(); setErr(""); }
              catch (ex) { setErr(ex instanceof Error ? ex.message : "Failed"); }
            }}>
              <option value={u.role}>{u.role}</option>
              {options.filter((o) => o !== u.role).map((o) => <option key={o} value={o}>{o}</option>)}
            </select>
          ) : <Pill tone="gold">{u.role}</Pill>}
        </Card>
      ))}
    </div>
  );
}

function Reports() {
  const [status, setStatus] = useState("");
  async function dl(kind: "clients" | "payments" | "panels" | "claims") {
    try {
      const r = await exportCsv({ data: kind });
      const a = document.createElement("a");
      a.href = URL.createObjectURL(new Blob([r.csv], { type: "text/csv;charset=utf-8" }));
      a.download = r.filename;
      a.click();
      setStatus(`Exported ${r.filename}`);
    } catch (e) { setStatus(e instanceof Error ? e.message : "Export denied"); }
  }
  return (
    <Card>
      <h2 className="mb-3 font-display text-xl font-semibold">CSV reports</h2>
      <p className="mb-4 text-sm text-muted">Formula injection is sanitized. Exports are written to the audit log.</p>
      <div className="flex flex-wrap gap-2">
        <Btn variant="gold" onClick={() => dl("clients")}>Clients</Btn>
        <Btn variant="gold" onClick={() => dl("payments")}>Payments</Btn>
        <Btn variant="gold" onClick={() => dl("panels")}>Panels</Btn>
        <Btn variant="gold" onClick={() => dl("claims")}>Warranty claims</Btn>
      </div>
      {status ? <p className="mt-3 text-sm text-leaf">{status}</p> : null}
    </Card>
  );
}

function Audit() {
  const [rows, setRows] = useState<Awaited<ReturnType<typeof listAudit>>>([]);
  useEffect(() => { listAudit().then(setRows).catch(() => {}); }, []);
  return (
    <TableWrap>
      <table className="w-full">
        <thead className="bg-card"><tr><Th>When</Th><Th>Actor</Th><Th>Action</Th><Th>Entity</Th><Th>Detail</Th></tr></thead>
        <tbody>
          {rows.map((a) => (
            <tr key={a.id} className="border-t border-line">
              <Td>{a.created_at?.slice(0, 19)}</Td><Td>{a.actor}</Td><Td className="font-mono">{a.action}</Td>
              <Td>{a.entity}</Td><Td>{a.detail}</Td>
            </tr>
          ))}
        </tbody>
      </table>
    </TableWrap>
  );
}

function Cms({ tab }: { tab: string }) {
  const [data, setData] = useState<Awaited<ReturnType<typeof getCms>> | null>(null);
  const [status, setStatus] = useState("");
  async function load() { setData(await getCms()); }
  useEffect(() => { load().catch((e) => setStatus(e.message)); }, []);
  if (!data) return <p className="text-muted">{status || "Loading CMS…"}</p>;
  return (
    <div className="space-y-5">
      {tab === "website" ? (
        <Card className="max-w-xl">
          <h2 className="mb-3 font-semibold">Website copy</h2>
          {data.content.map((c) => (
            <form key={c.key} className="mb-3" onSubmit={async (e) => {
              e.preventDefault();
              const fd = new FormData(e.currentTarget);
              await saveContent({ data: { key: c.key, value: String(fd.get("value")) } });
              setStatus("Saved.");
              await load();
            }}>
              <Lab>{c.key}</Lab>
              <div className="flex gap-2"><Field name="value" defaultValue={c.value} /><Btn type="submit">Save</Btn></div>
            </form>
          ))}
        </Card>
      ) : null}
      {tab === "faqs" ? (
        <div className="space-y-3">
          {data.faqs.map((f) => (
            <form key={f.id} className="rounded-lg border border-line bg-card p-4 space-y-2" onSubmit={async (e) => {
              e.preventDefault();
              const fd = new FormData(e.currentTarget);
              await saveFaq({ data: { id: f.id, question: String(fd.get("question")), answer: String(fd.get("answer")) } });
              setStatus("FAQ saved.");
            }}>
              <Field name="question" defaultValue={f.question} />
              <Area name="answer" defaultValue={f.answer} />
              <Btn type="submit">Save FAQ</Btn>
            </form>
          ))}
          <form className="rounded-lg border border-line bg-card p-4 space-y-2" onSubmit={async (e) => {
            e.preventDefault();
            const fd = new FormData(e.currentTarget);
            await saveFaq({ data: { question: String(fd.get("question")), answer: String(fd.get("answer")) } });
            e.currentTarget.reset();
            await load();
          }}>
            <h3 className="font-semibold">New FAQ</h3>
            <Field name="question" placeholder="Question" required />
            <Area name="answer" placeholder="Answer" required />
            <Btn variant="gold" type="submit">Add</Btn>
          </form>
        </div>
      ) : null}
      {tab === "announcements" ? (
        <div className="space-y-3">
          {data.anns.map((a) => (
            <form key={a.id} className="rounded-lg border border-line bg-card p-4 space-y-2" onSubmit={async (e) => {
              e.preventDefault();
              const fd = new FormData(e.currentTarget);
              await saveAnnouncement({ data: { id: a.id, title: String(fd.get("title")), message: String(fd.get("message")), cta_text: String(fd.get("cta")), cta_url: String(fd.get("url")), is_active: true } });
              setStatus("Announcement saved.");
            }}>
              <Field name="title" defaultValue={a.title} />
              <Area name="message" defaultValue={a.message} />
              <div className="grid gap-2 sm:grid-cols-2"><Field name="cta" defaultValue={a.cta_text} /><Field name="url" defaultValue={a.cta_url} /></div>
              <Btn type="submit">Save</Btn>
            </form>
          ))}
        </div>
      ) : null}
      {tab === "settings" ? (
        <Card className="max-w-xl">
          {data.settings.map((s) => (
            <form key={s.key} className="mb-3" onSubmit={async (e) => {
              e.preventDefault();
              const fd = new FormData(e.currentTarget);
              await saveSetting({ data: { key: s.key, value: String(fd.get("value")) } });
              setStatus("Setting saved.");
            }}>
              <Lab>{s.key}</Lab>
              <div className="flex gap-2"><Field name="value" defaultValue={s.value} /><Btn type="submit">Save</Btn></div>
            </form>
          ))}
        </Card>
      ) : null}
      {status ? <p className="text-sm text-leaf">{status}</p> : null}
    </div>
  );
}

function Perms() {
  const [data, setData] = useState<Awaited<ReturnType<typeof getPermissionMatrix>> | null>(null);
  const [err, setErr] = useState("");
  useEffect(() => { getPermissionMatrix().then(setData).catch((e) => setErr(e.message)); }, []);
  if (!data) return <p className="text-muted">{err || "Loading matrix…"}</p>;
  const roles = ["ADMIN", "SUPER_ADMIN", "PRIMARY_ADMIN"] as const;
  return (
    <TableWrap>
      <table className="w-full">
        <thead className="bg-card"><tr><Th>Permission</Th>{roles.map((r) => <Th key={r}>{r}</Th>)}</tr></thead>
        <tbody>
          {data.permissions.map((code) => (
            <tr key={code} className="border-t border-line">
              <Td className="font-mono text-xs">{code}</Td>
              {roles.map((r) => (
                <Td key={r}>
                  {r === "PRIMARY_ADMIN" ? <Pill tone="gold">ALWAYS</Pill> : (
                    <input type="checkbox" checked={!!data.matrix[code]?.[r]} onChange={async (e) => {
                      try {
                        await setPermission({ data: { role: r, code, allowed: e.target.checked } });
                        setData(await getPermissionMatrix());
                      } catch (ex) { setErr(ex instanceof Error ? ex.message : "Failed"); }
                    }} />
                  )}
                </Td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {err ? <p className="p-3 text-sm text-danger">{err}</p> : null}
    </TableWrap>
  );
}

function Notify() {
  const [clients, setClients] = useState<Awaited<ReturnType<typeof listClients>>>([]);
  const [status, setStatus] = useState("");
  useEffect(() => { listClients().then(setClients).catch(() => {}); }, []);
  return (
    <Card className="max-w-xl">
      <h2 className="mb-3 font-semibold">Send notification</h2>
      <form className="space-y-3" onSubmit={async (e) => {
        e.preventDefault();
        const fd = new FormData(e.currentTarget);
        try {
          await staffNotify({ data: { userId: String(fd.get("userId")), title: String(fd.get("title")), message: String(fd.get("message")) } });
          setStatus("Sent.");
        } catch (err) { setStatus(err instanceof Error ? err.message : "Failed"); }
      }}>
        <div><Lab>Client user</Lab>
          <select name="userId" className="min-h-11 w-full rounded-md border border-line bg-bg px-3">
            {clients.map((c) => <option key={c.user_id} value={c.user_id}>{c.full_name}</option>)}
          </select>
        </div>
        <div><Lab>Title</Lab><Field name="title" required /></div>
        <div><Lab>Message</Lab><Area name="message" required /></div>
        <Btn variant="gold" type="submit">Send</Btn>
        {status ? <p className="text-sm text-leaf">{status}</p> : null}
      </form>
    </Card>
  );
}
