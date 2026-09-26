export function nid(prefix: string) {
  const hex = Math.random().toString(16).slice(2, 12).toUpperCase();
  return `${prefix}-${hex}`;
}

export function inr(n: number | string | null | undefined) {
  return "₹" + Math.round(Number(n || 0)).toLocaleString("en-IN");
}

export function warrantyStatus(end: string | null | undefined, expiringDays = 90) {
  if (!end) return "VOID";
  const e = new Date(end.slice(0, 10) + "T00:00:00Z");
  const today = new Date();
  const t = Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate());
  const endMs = e.getTime();
  if (Number.isNaN(endMs)) return "VOID";
  if (endMs < t) return "EXPIRED";
  const soon = t + expiringDays * 86400000;
  if (endMs <= soon) return "EXPIRING_SOON";
  return "ACTIVE";
}

export function csvCell(v: unknown) {
  let s = String(v ?? "");
  if (/^[=+\-@]/.test(s)) s = "'" + s;
  if (/[",\n]/.test(s)) s = `"${s.replace(/"/g, '""')}"`;
  return s;
}

export const STAFF_SEED = [
  { email: "primary@solan.energy", name: "System Owner", role: "PRIMARY_ADMIN" as const, password: "SolanFarm2026!" },
  { email: "super@solan.energy", name: "Super Admin", role: "SUPER_ADMIN" as const, password: "SolanFarm2026!" },
  { email: "admin@solan.energy", name: "Operations Admin", role: "ADMIN" as const, password: "SolanFarm2026!" },
  { email: "demo@solan.energy", name: "Demo Solar Customer", role: "CLIENT" as const, password: "SolanFarm2026!" },
];

export function roleForEmail(email: string | null | undefined) {
  const hit = STAFF_SEED.find((s) => s.email === email?.toLowerCase());
  return hit?.role ?? "CLIENT";
}
