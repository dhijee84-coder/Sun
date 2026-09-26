import { Link } from "@tanstack/react-router";
import { UserButton } from "@/lib/auth/gates";
import { ThemeToggle } from "./theme-toggle";
import { Sun } from "lucide-react";
import { useState } from "react";

export type NavItem = { id: string; label: string };

export function PortalShell({
  title,
  role,
  items,
  tab,
  onTab,
  children,
}: {
  title: string;
  role: string;
  items: NavItem[];
  tab: string;
  onTab: (id: string) => void;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div className="min-h-screen bg-bg text-fg md:grid md:grid-cols-[240px_1fr]">
      <aside className={`border-line bg-card md:sticky md:top-0 md:h-screen md:border-r ${open ? "block" : "hidden"} md:block`}>
        <div className="flex h-[64px] items-center gap-2 border-b border-line px-4">
          <Link to="/" className="flex items-center gap-2 font-display text-sm font-bold text-fg no-underline">
            <span className="inline-flex size-8 items-center justify-center rounded-md bg-gold text-bg"><Sun className="size-4" /></span>
            SOL<span className="text-gold">AN</span>
          </Link>
        </div>
        <p className="px-4 pt-4 font-mono text-[10px] tracking-widest text-muted uppercase">{role.replace(/_/g, " ")}</p>
        <nav className="flex flex-col gap-0.5 p-2">
          {items.map((n) => (
            <button
              key={n.id}
              type="button"
              onClick={() => { onTab(n.id); setOpen(false); }}
              className={`rounded-md px-3 py-2.5 text-left text-sm ${tab === n.id ? "bg-gold/15 font-semibold text-gold" : "text-fg/80 hover:bg-cell"}`}
            >
              {n.label}
            </button>
          ))}
        </nav>
      </aside>
      <div>
        <header className="sticky top-0 z-30 flex h-[64px] items-center justify-between gap-3 border-b border-line px-4" style={{ background: "var(--sol-header)" }}>
          <div className="flex items-center gap-2">
            <button type="button" className="inline-flex size-11 items-center justify-center rounded-md border border-line md:hidden" onClick={() => setOpen((v) => !v)} aria-label="Menu">☰</button>
            <h1 className="font-display text-lg font-semibold">{title}</h1>
          </div>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <UserButton />
          </div>
        </header>
        <div className="p-4 md:p-6">{children}</div>
      </div>
    </div>
  );
}

export function Stat({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="rounded-lg border border-line bg-card p-4">
      <p className="font-mono text-[10px] tracking-wider text-muted uppercase">{label}</p>
      <p className="mt-1 font-display text-2xl font-semibold">{value}</p>
    </div>
  );
}

export function TableWrap({ children }: { children: React.ReactNode }) {
  return <div className="overflow-x-auto rounded-lg border border-line">{children}</div>;
}

export function Th({ children }: { children?: React.ReactNode }) {
  return <th className="px-3 py-2 text-left font-mono text-[10px] tracking-wider text-muted uppercase">{children}</th>;
}

export function Td({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <td className={`px-3 py-2 text-sm ${className}`}>{children}</td>;
}
