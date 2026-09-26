export type Role = "CLIENT" | "ADMIN" | "SUPER_ADMIN" | "PRIMARY_ADMIN";

export const ALL_PERMISSIONS = [
  "users.view", "users.create", "users.edit", "users.delete",
  "admins.create", "admins.edit", "admins.remove",
  "super_admins.create", "super_admins.edit", "super_admins.remove",
  "clients.view", "clients.create", "clients.edit", "clients.delete",
  "clients.services.view", "clients.services.manage",
  "projects.view", "projects.create", "projects.edit", "projects.delete",
  "panels.view", "panels.create", "panels.edit", "panels.allocate",
  "payments.view", "payments.create", "payments.edit",
  "documents.view", "documents.upload", "documents.delete", "documents.verify",
  "notifications.view", "notifications.create",
  "reports.view", "reports.export",
  "audit_logs.view",
  "system.settings",
  "website.settings",
  "warranty.view", "warranty.manage", "warranty.claims.manage",
  "enquiries.view", "enquiries.manage",
  "faqs.manage",
  "roles.view", "roles.manage",
] as const;

export type Perm = (typeof ALL_PERMISSIONS)[number];

const SUPER: Perm[] = [
  "clients.view", "clients.create", "clients.edit", "clients.delete",
  "clients.services.view", "clients.services.manage",
  "admins.create", "admins.edit", "admins.remove",
  "projects.view", "projects.create", "projects.edit", "projects.delete",
  "panels.view", "panels.create", "panels.edit", "panels.allocate",
  "payments.view", "payments.create", "payments.edit",
  "documents.view", "documents.upload", "documents.delete", "documents.verify",
  "notifications.view", "notifications.create",
  "reports.view", "reports.export",
  "audit_logs.view", "users.view",
  "warranty.view", "warranty.manage", "warranty.claims.manage",
  "enquiries.view", "enquiries.manage", "faqs.manage",
];

const ADMIN: Perm[] = [
  "clients.view", "clients.create", "clients.edit",
  "clients.services.view", "clients.services.manage",
  "projects.view", "panels.view", "panels.allocate",
  "payments.view", "payments.create", "payments.edit",
  "documents.view", "documents.upload", "documents.verify",
  "notifications.view", "notifications.create", "reports.view",
  "warranty.view", "warranty.claims.manage",
  "enquiries.view", "enquiries.manage",
];

export const DEFAULT_ROLE_PERMS: Record<Role, readonly string[]> = {
  PRIMARY_ADMIN: ALL_PERMISSIONS,
  SUPER_ADMIN: SUPER,
  ADMIN,
  CLIENT: [],
};

export function isStaff(role: string) {
  return role === "ADMIN" || role === "SUPER_ADMIN" || role === "PRIMARY_ADMIN";
}

export function canManageRole(actor: Role, target: Role) {
  if (actor === "PRIMARY_ADMIN") return target !== "PRIMARY_ADMIN";
  if (actor === "SUPER_ADMIN") return target === "ADMIN";
  return false;
}

export const STAFF_NAV: Record<Exclude<Role, "CLIENT">, { id: string; label: string; perm?: string }[]> = {
  ADMIN: [
    { id: "dashboard", label: "Dashboard" },
    { id: "clients", label: "Clients", perm: "clients.view" },
    { id: "projects", label: "Projects & panels", perm: "projects.view" },
    { id: "allocate", label: "Allocate panels", perm: "panels.allocate" },
    { id: "warranty", label: "Warranty claims", perm: "warranty.view" },
    { id: "payments", label: "Payments", perm: "payments.view" },
    { id: "services", label: "Services", perm: "clients.services.view" },
    { id: "tickets", label: "Support tickets" },
    { id: "documents", label: "Documents", perm: "documents.view" },
    { id: "enquiries", label: "Enquiries", perm: "enquiries.view" },
    { id: "notifications", label: "Notifications", perm: "notifications.view" },
  ],
  SUPER_ADMIN: [
    { id: "dashboard", label: "Dashboard" },
    { id: "clients", label: "Clients", perm: "clients.view" },
    { id: "projects", label: "Projects & panels", perm: "projects.view" },
    { id: "allocate", label: "Allocate panels", perm: "panels.allocate" },
    { id: "warranty", label: "Warranty claims", perm: "warranty.view" },
    { id: "payments", label: "Payments", perm: "payments.view" },
    { id: "services", label: "Services", perm: "clients.services.view" },
    { id: "tickets", label: "Support tickets" },
    { id: "documents", label: "Documents", perm: "documents.view" },
    { id: "enquiries", label: "Enquiries", perm: "enquiries.view" },
    { id: "staff", label: "Admins", perm: "admins.create" },
    { id: "reports", label: "Reports", perm: "reports.view" },
    { id: "audit", label: "Audit logs", perm: "audit_logs.view" },
    { id: "notifications", label: "Notifications", perm: "notifications.view" },
  ],
  PRIMARY_ADMIN: [
    { id: "dashboard", label: "Organization" },
    { id: "staff", label: "Admins & Super Admins", perm: "users.view" },
    { id: "clients", label: "Clients", perm: "clients.view" },
    { id: "projects", label: "Projects & panels", perm: "projects.view" },
    { id: "allocate", label: "Allocate panels", perm: "panels.allocate" },
    { id: "warranty", label: "Warranty claims", perm: "warranty.view" },
    { id: "payments", label: "Payments", perm: "payments.view" },
    { id: "services", label: "Services", perm: "clients.services.view" },
    { id: "tickets", label: "Support tickets" },
    { id: "enquiries", label: "Enquiries", perm: "enquiries.view" },
    { id: "website", label: "Website CMS", perm: "website.settings" },
    { id: "faqs", label: "FAQs", perm: "faqs.manage" },
    { id: "announcements", label: "Announcements", perm: "website.settings" },
    { id: "permissions", label: "Roles & permissions", perm: "roles.view" },
    { id: "settings", label: "System settings", perm: "system.settings" },
    { id: "reports", label: "Reports", perm: "reports.view" },
    { id: "audit", label: "Audit logs", perm: "audit_logs.view" },
    { id: "notifications", label: "Notifications", perm: "notifications.view" },
  ],
};

export const CLIENT_NAV = [
  { id: "home", label: "Dashboard" },
  { id: "kyc", label: "My profile" },
  { id: "bill", label: "Connection" },
  { id: "project", label: "My project", vis: "show_project" },
  { id: "panels", label: "My panels", vis: "show_panels" },
  { id: "warranty", label: "Warranty", vis: "show_panels" },
  { id: "money", label: "Payments", vis: "show_payments" },
  { id: "docs", label: "Documents", vis: "show_documents" },
  { id: "gen", label: "Generation", vis: "show_generation" },
  { id: "services", label: "Services", vis: "show_services" },
  { id: "support", label: "Support", vis: "show_support" },
  { id: "notifications", label: "Notifications", vis: "show_notifications" },
  { id: "settings", label: "Settings" },
] as const;

export const CLAIM_TRANSITIONS: Record<string, string[]> = {
  SUBMITTED: ["UNDER_REVIEW", "REJECTED"],
  UNDER_REVIEW: ["MORE_INFORMATION_REQUIRED", "APPROVED", "REJECTED"],
  MORE_INFORMATION_REQUIRED: ["UNDER_REVIEW", "REJECTED"],
  APPROVED: ["REPLACEMENT_REQUIRED", "REPAIRED", "CLOSED"],
  REPLACEMENT_REQUIRED: ["REPLACED", "CLOSED"],
  REPLACED: ["CLOSED"],
  REPAIRED: ["CLOSED"],
  REJECTED: ["CLOSED"],
  CLOSED: [],
};

export const STAGE_DEFS = [
  { n: 1, name: "KYC verification", pct: 5, pay: false },
  { n: 2, name: "Farm allocation", pct: 10, pay: false },
  { n: 3, name: "Agreement", pct: 10, pay: true },
  { n: 4, name: "Panel payment", pct: 40, pay: true },
  { n: 5, name: "Panel allocation", pct: 10, pay: false },
  { n: 6, name: "Farm commissioning", pct: 15, pay: false },
  { n: 7, name: "Grid interconnection", pct: 5, pay: false },
  { n: 8, name: "Usage billing live", pct: 5, pay: false },
];
