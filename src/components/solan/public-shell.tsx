import { Link, useRouterState } from "@tanstack/react-router";
import { UserButton } from "@/lib/auth/gates";
import { useCurrentUserState } from "@/lib/auth/use-current-user";
import { useIsPhone } from "@/lib/solan/layout";
import { ThemeToggle } from "./theme-toggle";
import { Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { getPublicSite } from "@/lib/solan/public";
import { getMe } from "@/lib/solan/profile";

const NAV = [
  { to: "/about", label: "About Us" },
  { to: "/solar", label: "Our Farms" },
  { to: "/how-it-works", label: "How it works" },
  { to: "/services", label: "Services" },
  { to: "/projects", label: "Projects" },
  { to: "/faq", label: "FAQ" },
  { to: "/contact", label: "Contact Us" },
];

export function PublicShell({ children }: { children: React.ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const { user } = useCurrentUserState();
  const phone = useIsPhone();
  const [open, setOpen] = useState(false);
  const [ann, setAnn] = useState<{ title: string; message: string; cta_url: string; cta_text: string } | null>(null);
  const [footer, setFooter] = useState({ email: "hello@solan.energy", phone: "+91 44 4000 1234", text: "" });
  const [portal, setPortal] = useState("/client/dashboard");

  useEffect(() => {
    getPublicSite().then((s) => {
      setAnn(s.announcements[0] || null);
      setFooter({
        email: s.content.support_email || "hello@solan.energy",
        phone: s.content.support_phone || "+91 44 4000 1234",
        text: s.content.footer_text || "",
      });
    }).catch((err) => {
      console.error("[solan] public site failed", err);
    });
  }, []);

  useEffect(() => {
    if (!user) return;
    getMe().then((m) => {
      setPortal(m.role === "CLIENT" ? "/client/dashboard" : "/staff/dashboard");
    }).catch(() => {});
  }, [user]);

  return (
    <div className="min-h-screen bg-bg text-fg">
      {ann ? (
        <div className="flex flex-wrap items-center justify-center gap-3 border-b border-line bg-gold/10 px-4 py-2.5 text-sm">
          <strong>{ann.title}</strong>
          <span className="text-muted">{ann.message}</span>
          {ann.cta_url ? <a href={ann.cta_url} className="text-gold">{ann.cta_text || "Learn more"}</a> : null}
        </div>
      ) : null}
      <header className="sticky top-0 z-40 h-[72px] border-b border-line backdrop-blur-md" style={{ background: "var(--sol-header)" }}>
        <div className="mx-auto flex h-full max-w-6xl items-center justify-between gap-4 px-4">
          <Link to="/" className="flex items-center gap-2.5 font-display text-[17px] font-bold text-fg no-underline">
            <span className="inline-flex size-9 items-center justify-center rounded-md bg-gold text-bg">
              <Sun className="size-4" />
            </span>
            SOL<span className="text-gold">AN</span>
          </Link>
          <nav className={`pub-nav-desktop ${open ? "is-open" : ""} ${phone ? (open ? "flex flex-col absolute left-0 right-0 top-[72px] z-30 border-b border-line bg-card p-4" : "hidden") : "hidden items-center gap-6 md:flex"}`}>
            {NAV.map((n) => (
              <Link key={n.to} to={n.to} className={`text-sm no-underline ${pathname === n.to ? "text-gold" : "text-fg/80 hover:text-gold"}`}>
                {n.label}
              </Link>
            ))}
            <Link to="/login" className={`text-sm text-fg/80 no-underline ${phone ? "" : "md:hidden"}`}>Client Login</Link>
            <Link to="/staff-login" className={`text-sm text-fg/80 no-underline ${phone ? "" : "md:hidden"}`}>Staff Login</Link>
          </nav>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            {user ? (
              <>
                <a href={portal} className="inline-flex min-h-11 items-center rounded-md bg-gold px-4 py-2 text-sm font-semibold text-bg no-underline">Portal</a>
                <UserButton />
              </>
            ) : (
              <>
                <Link to="/staff-login" className={`rounded-md border border-line px-3 py-2 text-sm text-fg no-underline ${phone ? "hidden" : "hidden sm:inline-flex"}`}>Staff</Link>
                <Link to="/login" className="inline-flex min-h-11 items-center rounded-md bg-gold px-4 py-2 text-sm font-semibold text-bg no-underline">Client Login</Link>
              </>
            )}
            <button type="button" className={`pub-menu-btn size-11 items-center justify-center rounded-md border border-line ${phone ? "inline-flex" : "inline-flex md:hidden"}`} onClick={() => setOpen((v) => !v)} aria-label="Menu">☰</button>
          </div>
        </div>
      </header>
      <main>{children}</main>
      <footer className="mt-8 border-t border-line bg-[#0f172a] px-4 py-12 text-slate-200">
        <div className="mx-auto grid max-w-6xl gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="font-display text-base font-bold">SOL<span className="text-gold">AN</span></div>
            <p className="mt-2 text-sm text-slate-400">{footer.text || "We own the land and the farm. You own the panels. We maintain everything and bill energy on usage."}</p>
          </div>
          <div>
            <div className="font-mono text-[10px] tracking-[0.16em] text-slate-400 uppercase">Explore</div>
            {NAV.slice(0, 4).map((n) => <Link key={n.to} to={n.to} className="mt-2 block text-sm text-slate-400 no-underline hover:text-gold">{n.label}</Link>)}
          </div>
          <div>
            <div className="font-mono text-[10px] tracking-[0.16em] text-slate-400 uppercase">Portals</div>
            <Link to="/login" className="mt-2 block text-sm text-slate-400 no-underline hover:text-gold">Client Login</Link>
            <Link to="/staff-login" className="mt-2 block text-sm text-slate-400 no-underline hover:text-gold">Staff Login</Link>
            <Link to="/faq" className="mt-2 block text-sm text-slate-400 no-underline hover:text-gold">FAQ</Link>
            <Link to="/contact" className="mt-2 block text-sm text-slate-400 no-underline hover:text-gold">Contact Us</Link>
          </div>
          <div>
            <div className="font-mono text-[10px] tracking-[0.16em] text-slate-400 uppercase">Contact</div>
            <p className="mt-2 text-sm text-slate-400">{footer.email}</p>
            <p className="text-sm text-slate-400">{footer.phone}</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export function PageHero({ kicker, title, image }: { kicker: string; title: string; image: string }) {
  return (
    <section className="relative flex min-h-[220px] items-end overflow-hidden bg-[#0f172a] px-4 py-12 text-white">
      <img src={image} alt="" fetchPriority="high" decoding="async" className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#0f172a]/85 to-[#0f172a]/30" />
      <div className="relative z-10 mx-auto w-full max-w-6xl">
        <p className="font-mono text-[11px] tracking-[0.16em] text-gold uppercase">{kicker}</p>
        <h1 className="mt-2 font-display text-4xl font-semibold tracking-tight">{title}</h1>
      </div>
    </section>
  );
}
