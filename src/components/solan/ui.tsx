import type { ButtonHTMLAttributes, InputHTMLAttributes, TextareaHTMLAttributes } from "react";

export function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`rounded-lg border border-line bg-card p-5 ${className}`}>{children}</div>;
}

export function Pill({ children, tone = "sky" }: { children: React.ReactNode; tone?: "gold" | "leaf" | "sky" | "danger" | "muted" }) {
  const map = {
    gold: "text-gold bg-gold/10",
    leaf: "text-leaf bg-leaf/10",
    sky: "text-sky bg-sky/10",
    danger: "text-danger bg-danger/10",
    muted: "text-muted bg-cell",
  };
  return <span className={`inline-block rounded-sm border border-current px-2 py-0.5 font-mono text-[10px] tracking-wider uppercase ${map[tone]}`}>{children}</span>;
}

export function Btn({
  children, variant = "ghost", className = "", ...rest
}: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: "ghost" | "gold" | "ember" | "danger" }) {
  const v = {
    ghost: "border-line bg-transparent text-fg hover:border-muted",
    gold: "border-gold bg-gold font-semibold text-bg hover:brightness-110",
    ember: "border-ember bg-ember font-semibold text-bg",
    danger: "border-danger bg-danger text-bg",
  }[variant];
  return (
    <button
      type={rest.type || "button"}
      className={`inline-flex min-h-11 items-center justify-center gap-2 rounded-md border px-4 py-2 text-sm disabled:opacity-40 ${v} ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
}

export function Field(props: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className={`min-h-11 w-full rounded-md border border-line bg-bg px-3 py-2 text-fg placeholder:text-muted ${props.className || ""}`}
    />
  );
}

export function Area(props: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      {...props}
      className={`min-h-28 w-full rounded-md border border-line bg-bg px-3 py-2 text-fg placeholder:text-muted ${props.className || ""}`}
    />
  );
}

export function Lab({ children }: { children: React.ReactNode }) {
  return <label className="mb-1.5 block text-xs tracking-wide text-muted">{children}</label>;
}

export function Eyebrow({ children }: { children: React.ReactNode }) {
  return <p className="font-mono text-[10.5px] tracking-[0.16em] text-muted uppercase">{children}</p>;
}

export function warrantyTone(s: string) {
  if (s === "ACTIVE") return "leaf" as const;
  if (s === "EXPIRING_SOON") return "gold" as const;
  return "danger" as const;
}
