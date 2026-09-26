import { o as __toESM } from "../_runtime.mjs";
import { H as require_react, S as require_jsx_runtime, v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { i as UserButton } from "./gates-B_IGPI9u.mjs";
import { n as Sun } from "../_libs/lucide-react.mjs";
import { t as ThemeToggle } from "./theme-toggle-72quO4YF.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/portal-shell-vK6kU5-B.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function PortalShell({ title, role, items, tab, onTab, children }) {
	const [open, setOpen] = (0, import_react.useState)(false);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-bg text-fg md:grid md:grid-cols-[240px_1fr]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
			className: `border-line bg-card md:sticky md:top-0 md:h-screen md:border-r ${open ? "block" : "hidden"} md:block`,
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex h-[64px] items-center gap-2 border-b border-line px-4",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/",
						className: "flex items-center gap-2 font-display text-sm font-bold text-fg no-underline",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "inline-flex size-8 items-center justify-center rounded-md bg-gold text-bg",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sun, { className: "size-4" })
							}),
							"SOL",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-gold",
								children: "AN"
							})
						]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "px-4 pt-4 font-mono text-[10px] tracking-widest text-muted uppercase",
					children: role.replace(/_/g, " ")
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
					className: "flex flex-col gap-0.5 p-2",
					children: items.map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => {
							onTab(n.id);
							setOpen(false);
						},
						className: `rounded-md px-3 py-2.5 text-left text-sm ${tab === n.id ? "bg-gold/15 font-semibold text-gold" : "text-fg/80 hover:bg-cell"}`,
						children: n.label
					}, n.id))
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
			className: "sticky top-0 z-30 flex h-[64px] items-center justify-between gap-3 border-b border-line px-4",
			style: { background: "var(--sol-header)" },
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "inline-flex size-11 items-center justify-center rounded-md border border-line md:hidden",
					onClick: () => setOpen((v) => !v),
					"aria-label": "Menu",
					children: "☰"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "font-display text-lg font-semibold",
					children: title
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ThemeToggle, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserButton, {})]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "p-4 md:p-6",
			children
		})] })]
	});
}
function Stat({ label, value }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-lg border border-line bg-card p-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "font-mono text-[10px] tracking-wider text-muted uppercase",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-1 font-display text-2xl font-semibold",
			children: value
		})]
	});
}
function TableWrap({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "overflow-x-auto rounded-lg border border-line",
		children
	});
}
function Th({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
		className: "px-3 py-2 text-left font-mono text-[10px] tracking-wider text-muted uppercase",
		children
	});
}
function Td({ children, className = "" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
		className: `px-3 py-2 text-sm ${className}`,
		children
	});
}
//#endregion
export { Th as a, Td as i, Stat as n, TableWrap as r, PortalShell as t };
