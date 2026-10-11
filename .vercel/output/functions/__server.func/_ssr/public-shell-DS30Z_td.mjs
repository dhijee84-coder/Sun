import { o as __toESM } from "../_runtime.mjs";
import { Z as require_react, b as Link, p as useRouterState, w as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { i as getMe } from "./profile-DQCRTp4N.mjs";
import { n as getPublicSite } from "./router-DBiPuqu_.mjs";
import { n as UserButton, r as useCurrentUserState } from "./gates-CBZ3D9wg.mjs";
import { t as useIsPhone } from "./layout-TRxAUSL4.mjs";
import { n as ThemeToggle, t as BrandLogo } from "./theme-toggle-DPRXcjIk.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/public-shell-DS30Z_td.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var NAV = [
	{
		to: "/about",
		label: "About Us"
	},
	{
		to: "/solar",
		label: "Our Farms"
	},
	{
		to: "/how-it-works",
		label: "How it works"
	},
	{
		to: "/services",
		label: "Services"
	},
	{
		to: "/projects",
		label: "Projects"
	},
	{
		to: "/faq",
		label: "FAQ"
	},
	{
		to: "/contact",
		label: "Contact Us"
	}
];
function PublicShell({ children }) {
	const pathname = useRouterState({ select: (s) => s.location.pathname });
	const { user } = useCurrentUserState();
	const phone = useIsPhone();
	const [open, setOpen] = (0, import_react.useState)(false);
	const [ann, setAnn] = (0, import_react.useState)(null);
	const [footer, setFooter] = (0, import_react.useState)({
		email: "hello@solan.energy",
		phone: "+91 44 4000 1234",
		text: ""
	});
	const [portal, setPortal] = (0, import_react.useState)("/client/dashboard");
	(0, import_react.useEffect)(() => {
		getPublicSite().then((s) => {
			setAnn(s.announcements[0] || null);
			setFooter({
				email: s.content.support_email || "hello@solan.energy",
				phone: s.content.support_phone || "+91 44 4000 1234",
				text: s.content.footer_text || ""
			});
		}).catch((err) => {
			console.error("[solan] public site failed", err);
		});
	}, []);
	(0, import_react.useEffect)(() => {
		if (!user) return;
		getMe().then((m) => {
			setPortal(m.role === "CLIENT" ? "/client/dashboard" : "/staff/dashboard");
		}).catch(() => {});
	}, [user]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-bg text-fg",
		children: [
			ann ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-center justify-center gap-3 border-b border-line bg-gold/10 px-4 py-2.5 text-sm",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: ann.title }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-muted",
						children: ann.message
					}),
					ann.cta_url ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: ann.cta_url,
						className: "text-gold",
						children: ann.cta_text || "Learn more"
					}) : null
				]
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
				className: "sticky top-0 z-40 h-[72px] border-b border-line backdrop-blur-md",
				style: { background: "var(--sol-header)" },
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto flex h-full max-w-6xl items-center justify-between gap-4 px-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BrandLogo, {}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
							className: `pub-nav-desktop ${open ? "is-open" : ""} ${phone ? open ? "flex flex-col absolute left-0 right-0 top-[72px] z-30 border-b border-line bg-card p-4" : "hidden" : "hidden items-center gap-6 md:flex"}`,
							children: [
								NAV.map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: n.to,
									className: `text-sm no-underline ${pathname === n.to ? "text-gold" : "text-fg/80 hover:text-gold"}`,
									children: n.label
								}, n.to)),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/login",
									className: `text-sm text-fg/80 no-underline ${phone ? "" : "md:hidden"}`,
									children: "Client Login"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/staff-login",
									className: `text-sm text-fg/80 no-underline ${phone ? "" : "md:hidden"}`,
									children: "Staff Login"
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ThemeToggle, {}),
								user ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
									href: portal,
									className: "inline-flex min-h-11 items-center rounded-md bg-gold px-4 py-2 text-sm font-semibold text-bg no-underline",
									children: "Portal"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserButton, {})] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/staff-login",
									className: `rounded-md border border-line px-3 py-2 text-sm text-fg no-underline ${phone ? "hidden" : "hidden sm:inline-flex"}`,
									children: "Staff"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/login",
									className: "inline-flex min-h-11 items-center rounded-md bg-gold px-4 py-2 text-sm font-semibold text-bg no-underline",
									children: "Client Login"
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									className: `pub-menu-btn size-11 items-center justify-center rounded-md border border-line ${phone ? "inline-flex" : "inline-flex md:hidden"}`,
									onClick: () => setOpen((v) => !v),
									"aria-label": "Menu",
									children: "☰"
								})
							]
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", { children }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("footer", {
				className: "mt-8 border-t border-line bg-[#0f172a] px-4 py-12 text-slate-200",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto grid max-w-6xl gap-8 sm:grid-cols-2 lg:grid-cols-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BrandLogo, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-sm text-slate-400",
							children: footer.text || "We own the land and the farm. You own the panels. We maintain everything and bill energy on usage."
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "font-mono text-[10px] tracking-[0.16em] text-slate-400 uppercase",
							children: "Explore"
						}), NAV.slice(0, 4).map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: n.to,
							className: "mt-2 block text-sm text-slate-400 no-underline hover:text-gold",
							children: n.label
						}, n.to))] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "font-mono text-[10px] tracking-[0.16em] text-slate-400 uppercase",
								children: "Portals"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/login",
								className: "mt-2 block text-sm text-slate-400 no-underline hover:text-gold",
								children: "Client Login"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/staff-login",
								className: "mt-2 block text-sm text-slate-400 no-underline hover:text-gold",
								children: "Staff Login"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/faq",
								className: "mt-2 block text-sm text-slate-400 no-underline hover:text-gold",
								children: "FAQ"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/contact",
								className: "mt-2 block text-sm text-slate-400 no-underline hover:text-gold",
								children: "Contact Us"
							})
						] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "font-mono text-[10px] tracking-[0.16em] text-slate-400 uppercase",
								children: "Contact"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-sm text-slate-400",
								children: footer.email
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm text-slate-400",
								children: footer.phone
							})
						] })
					]
				})
			})
		]
	});
}
function PageHero({ kicker, title, image }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "relative flex min-h-[220px] items-end overflow-hidden bg-[#0f172a] px-4 py-12 text-white",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: image,
				alt: "",
				fetchPriority: "high",
				decoding: "async",
				className: "absolute inset-0 h-full w-full object-cover"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-r from-[#0f172a]/85 to-[#0f172a]/30" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative z-10 mx-auto w-full max-w-6xl",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-mono text-[11px] tracking-[0.16em] text-gold uppercase",
					children: kicker
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-2 font-display text-4xl font-semibold tracking-tight",
					children: title
				})]
			})
		]
	});
}
//#endregion
export { PublicShell as n, PageHero as t };
