import { S as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/ui-CXzw7Q9b.js
var import_jsx_runtime = require_jsx_runtime();
function Card({ children, className = "" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: `rounded-lg border border-line bg-card p-5 ${className}`,
		children
	});
}
function Pill({ children, tone = "sky" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: `inline-block rounded-sm border border-current px-2 py-0.5 font-mono text-[10px] tracking-wider uppercase ${{
			gold: "text-gold bg-gold/10",
			leaf: "text-leaf bg-leaf/10",
			sky: "text-sky bg-sky/10",
			danger: "text-danger bg-danger/10",
			muted: "text-muted bg-cell"
		}[tone]}`,
		children
	});
}
function Btn({ children, variant = "ghost", className = "", ...rest }) {
	const v = {
		ghost: "border-line bg-transparent text-fg hover:border-muted",
		gold: "border-gold bg-gold font-semibold text-bg hover:brightness-110",
		ember: "border-ember bg-ember font-semibold text-bg",
		danger: "border-danger bg-danger text-bg"
	}[variant];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type: rest.type || "button",
		className: `inline-flex min-h-11 items-center justify-center gap-2 rounded-md border px-4 py-2 text-sm disabled:opacity-40 ${v} ${className}`,
		...rest,
		children
	});
}
function Field(props) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
		...props,
		className: `min-h-11 w-full rounded-md border border-line bg-bg px-3 py-2 text-fg placeholder:text-muted ${props.className || ""}`
	});
}
function Area(props) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
		...props,
		className: `min-h-28 w-full rounded-md border border-line bg-bg px-3 py-2 text-fg placeholder:text-muted ${props.className || ""}`
	});
}
function Lab({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
		className: "mb-1.5 block text-xs tracking-wide text-muted",
		children
	});
}
function warrantyTone(s) {
	if (s === "ACTIVE") return "leaf";
	if (s === "EXPIRING_SOON") return "gold";
	return "danger";
}
//#endregion
export { Lab as a, Field as i, Btn as n, Pill as o, Card as r, warrantyTone as s, Area as t };
