import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { authClient, rememberEmailSession } from "@/lib/auth/client";
import { ThemeToggle } from "@/components/solan/theme-toggle";
import { Btn, Field, Lab } from "@/components/solan/ui";
import { getMe } from "@/lib/solan/profile";
import { Sun } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/staff-login")({ component: StaffLogin });

function StaffLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("admin@solan.energy");
  const [password, setPassword] = useState("SolanFarm2026!");
  const [err, setErr] = useState("");
  const [busy, setBusy] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setErr("");
    try {
      const res = await authClient.signIn.email({ email, password });
      if (res.error) throw new Error(res.error.message || "Sign in failed");
      await rememberEmailSession(res.data?.token);
      const me = await getMe();
      if (me.role === "CLIENT") {
        await navigate({ to: "/client/dashboard" });
        return;
      }
      await navigate({ to: "/staff/dashboard" });
    } catch (ex) {
      setErr(ex instanceof Error ? ex.message : "Failed");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="auth-split grid min-h-dvh lg:grid-cols-2">
      <aside className="auth-hero relative hidden overflow-hidden lg:flex">
        <img src="/img/hero-plant.jpg" alt="" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0f172a]/90 to-[#0f172a]/40" />
        <div className="relative z-10 flex h-full flex-col justify-between p-10 text-white">
          <Link to="/" className="flex items-center gap-2 font-display text-lg font-bold text-white no-underline">
            <span className="inline-flex size-9 items-center justify-center rounded-md bg-gold text-bg"><Sun className="size-4" /></span>
            SOL<span className="text-gold">AN</span>
          </Link>
          <div>
            <p className="font-mono text-xs tracking-widest text-gold uppercase">Operations console</p>
            <h1 className="mt-3 font-display text-4xl font-semibold">Admin, Super Admin and Primary Admin.</h1>
          </div>
          <Link to="/login" className="text-sm text-gold no-underline">← Client sign in</Link>
        </div>
      </aside>
      <div className="auth-pane flex min-h-dvh flex-col bg-bg">
        <header className="auth-mobile-bar flex h-14 shrink-0 items-center justify-between border-b border-line px-4">
          <Link to="/" className="flex items-center gap-2 font-display text-base font-bold text-fg no-underline">
            <span className="inline-flex size-8 items-center justify-center rounded-md bg-gold text-bg"><Sun className="size-4" /></span>
            SOL<span className="text-gold">AN</span>
          </Link>
          <ThemeToggle />
        </header>
        <div className="auth-card mx-auto w-full max-w-md px-5 py-5">
          <h2 className="font-display text-2xl font-semibold">Staff sign in</h2>
          <p className="mt-1 mb-6 text-sm text-muted">Use a seeded operations account.</p>
          <form onSubmit={onSubmit} className="space-y-3">
            <div><Lab>Email</Lab><Field type="email" inputMode="email" autoComplete="username" value={email} onChange={(e) => setEmail(e.target.value)} required /></div>
            <div><Lab>Password</Lab><Field type="password" autoComplete="current-password" value={password} onChange={(e) => setPassword(e.target.value)} required /></div>
            {err ? <p className="text-sm text-danger">{err}</p> : null}
            <Btn variant="gold" className="min-h-12 w-full" disabled={busy} type="submit">{busy ? "Please wait…" : "Sign in"}</Btn>
          </form>
          <div className="mt-6 rounded-lg border border-line bg-card p-4 font-mono text-xs leading-relaxed text-muted">
            <p className="mb-2 font-sans text-[10px] tracking-widest uppercase">Seeded accounts</p>
            <p>primary@solan.energy</p>
            <p>super@solan.energy</p>
            <p>admin@solan.energy</p>
            <p className="mt-2">Password: SolanFarm2026!</p>
          </div>
          <Link to="/login" className="mt-4 inline-flex min-h-11 items-center text-sm text-gold no-underline lg:hidden">← Client sign in</Link>
        </div>
      </div>
    </div>
  );
}
