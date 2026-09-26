import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { GROK_PROVIDERS, authClient, authEnabled, signIn } from "@/lib/auth/client";
import { ThemeToggle } from "@/components/solan/theme-toggle";
import { Btn, Field, Lab } from "@/components/solan/ui";
import { getMe } from "@/lib/solan/profile";
import { Sun } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/login")({ component: Login });

async function goAfterAuth(navigate: ReturnType<typeof useNavigate>) {
  const me = await getMe();
  await navigate({ to: me.role === "CLIENT" ? "/client/dashboard" : "/staff/dashboard" });
}

function Login() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"in" | "up">("in");
  const [email, setEmail] = useState("demo@solan.energy");
  const [password, setPassword] = useState("SolanFarm2026!");
  const [name, setName] = useState("");
  const [err, setErr] = useState("");
  const [busy, setBusy] = useState(false);

  async function onEmail(e: React.FormEvent) {
    e.preventDefault();
    setErr("");
    setBusy(true);
    try {
      let em = email.trim();
      let pw = password;
      if (em === "9999999999") {
        em = "demo@solan.energy";
        if (pw === "1234") pw = "SolanFarm2026!";
      }
      if (mode === "up") {
        const res = await authClient.signUp.email({ email: em, password: pw, name: name || "Solan client" });
        if (res.error) throw new Error(res.error.message || "Sign up failed");
      } else {
        const res = await authClient.signIn.email({ email: em, password: pw });
        if (res.error) throw new Error(res.error.message || "Sign in failed");
      }
      await goAfterAuth(navigate);
    } catch (ex) {
      setErr(ex instanceof Error ? ex.message : "Failed");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <div
        className="hidden flex-col justify-between bg-cover bg-center p-10 text-white lg:flex"
        style={{ backgroundImage: `linear-gradient(90deg, rgba(15,23,42,.88), rgba(15,23,42,.45)), url("/img/hero-farm.jpg")` }}
      >
        <Link to="/" className="flex items-center gap-2 font-display text-lg font-bold text-white no-underline">
          <span className="inline-flex size-9 items-center justify-center rounded-md bg-gold text-bg"><Sun className="size-4" /></span>
          SOL<span className="text-gold">AN</span>
        </Link>
        <div>
          <h1 className="font-display text-4xl font-semibold">Buy farm panels. Pay for the energy they generate.</h1>
          <p className="mt-4 max-w-md text-white/80">Nothing goes on your roof. Track generation, warranty and usage billing here.</p>
        </div>
        <p className="font-mono text-xs tracking-widest text-gold uppercase">Open-land farms · usage billing</p>
      </div>
      <div className="flex items-center bg-bg p-6">
        <div className="mx-auto w-full max-w-sm">
          <div className="mb-6 flex justify-end"><ThemeToggle /></div>
          <div className="mb-6 inline-flex rounded-md border border-line bg-bg p-1">
            <button type="button" className={`rounded px-3 py-2 text-xs font-mono uppercase ${mode === "in" ? "bg-cell text-gold" : "text-muted"}`} onClick={() => setMode("in")}>Sign in</button>
            <button type="button" className={`rounded px-3 py-2 text-xs font-mono uppercase ${mode === "up" ? "bg-cell text-gold" : "text-muted"}`} onClick={() => setMode("up")}>Register</button>
          </div>
          <h2 className="font-display text-2xl font-semibold">{mode === "in" ? "Client sign in" : "Create a client account"}</h2>
          <p className="mt-1 mb-6 text-sm text-muted">Email and password, or Google / X.</p>
          {authEnabled ? (
            <div className="mb-5 space-y-2">
              {GROK_PROVIDERS.map((p) => (
                <button
                  key={p.providerId}
                  type="button"
                  onClick={() => signIn(p.providerId, { callbackURL: "/portal" })}
                  className="w-full rounded-md border border-line px-4 py-2.5 text-sm hover:bg-cell"
                >
                  Continue with {p.label}
                </button>
              ))}
            </div>
          ) : <p className="text-sm text-muted">Sign-in is disabled.</p>}
          <form onSubmit={onEmail} className="space-y-3">
            {mode === "up" ? <div><Lab>Name</Lab><Field value={name} onChange={(e) => setName(e.target.value)} required /></div> : null}
            <div><Lab>Email or demo mobile</Lab><Field type="text" autoComplete="username" value={email} onChange={(e) => setEmail(e.target.value)} required /></div>
            <div><Lab>Password or OTP</Lab><Field type="password" autoComplete="current-password" value={password} onChange={(e) => setPassword(e.target.value)} required /></div>
            {err ? <p className="text-sm text-danger">{err}</p> : null}
            <Btn variant="gold" className="w-full" disabled={busy} type="submit">{busy ? "Please wait…" : mode === "in" ? "Sign in" : "Register"}</Btn>
          </form>
          <p className="mt-4 text-xs text-muted">Demo client: demo@solan.energy / SolanFarm2026! — or mobile 9999999999 / OTP 1234</p>
          <Link to="/staff-login" className="mt-3 inline-block text-sm text-gold no-underline">Staff / admin sign in →</Link>
        </div>
      </div>
    </div>
  );
}
