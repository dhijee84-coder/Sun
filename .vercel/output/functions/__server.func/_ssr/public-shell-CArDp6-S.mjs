import { o as __toESM } from "../_runtime.mjs";
import { H as require_react, S as require_jsx_runtime, d as useRouterState, v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { r as createServerFn } from "./ssr.mjs";
import { a as getMe, i as createSsrRpc } from "./profile-CaSHhhIo.mjs";
import { a as useCurrentUserState, i as UserButton, n as SignedIn, r as SignedOut } from "./gates-B_IGPI9u.mjs";
import { n as Sun } from "../_libs/lucide-react.mjs";
import { t as ThemeToggle } from "./theme-toggle-72quO4YF.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/public-shell-CArDp6-S.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var getPublicSite = createServerFn({ method: "GET" }).handler(createSsrRpc("2162254bcf7554e4213846cce98d3f671567f0c3c636cf452865e0ed79d35335"));
var submitEnquiry = createServerFn({ method: "POST" }).validator((d) => d).handler(createSsrRpc("15111aa7338831f558e4c86ab424fe90e3ea917c1d32099ef5dd5877228b8172"));
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
	const { user, isPending } = useCurrentUserState();
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
		}).catch(() => {});
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
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/",
							className: "flex items-center gap-2.5 font-display text-[17px] font-bold text-fg no-underline",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "inline-flex size-9 items-center justify-center rounded-md bg-gold text-bg",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sun, { className: "size-4" })
								}),
								"SOL",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-gold",
									children: "AN"
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
							className: `max-md:absolute max-md:left-0 max-md:right-0 max-md:top-[72px] max-md:flex-col max-md:border-b max-md:border-line max-md:bg-card max-md:p-4 ${open ? "max-md:flex" : "max-md:hidden"} hidden items-center gap-6 md:flex`,
							children: [
								NAV.map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: n.to,
									className: `text-sm no-underline ${pathname === n.to ? "text-gold" : "text-fg/80 hover:text-gold"}`,
									children: n.label
								}, n.to)),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/login",
									className: "text-sm text-fg/80 no-underline md:hidden",
									children: "Client Login"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/staff-login",
									className: "text-sm text-fg/80 no-underline md:hidden",
									children: "Staff Login"
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ThemeToggle, {}),
								isPending ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-8 w-8 animate-pulse rounded-full bg-cell" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SignedOut, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/staff-login",
									className: "hidden rounded-md border border-line px-3 py-2 text-sm text-fg no-underline sm:inline-flex",
									children: "Staff"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/login",
									className: "inline-flex min-h-11 items-center rounded-md bg-gold px-4 py-2 text-sm font-semibold text-bg no-underline",
									children: "Client Login"
								})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SignedIn, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
									href: portal,
									className: "inline-flex min-h-11 items-center rounded-md bg-gold px-4 py-2 text-sm font-semibold text-bg no-underline",
									children: "Portal"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserButton, {})] })] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									className: "inline-flex size-11 items-center justify-center rounded-md border border-line md:hidden",
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
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "font-display text-base font-bold",
							children: ["SOL", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-gold",
								children: "AN"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
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
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "flex min-h-[220px] items-end bg-cover bg-center px-4 py-12 text-white",
		style: { backgroundImage: `linear-gradient(90deg, rgba(15,23,42,.82), rgba(15,23,42,.35)), url('${image}')` },
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto w-full max-w-6xl",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-mono text-[11px] tracking-[0.16em] text-gold uppercase",
				children: kicker
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-2 font-display text-4xl font-semibold tracking-tight",
				children: title
			})]
		})
	});
}
//#endregion
export { submitEnquiry as i, PublicShell as n, getPublicSite as r, PageHero as t };
