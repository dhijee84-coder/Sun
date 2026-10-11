import { o as __toESM } from "../_runtime.mjs";
import { Z as require_react, b as Link, w as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as Sun, r as Moon } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/theme-toggle-DPRXcjIk.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function BrandLogo({ to = "/", light = false, compact = false }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
		to,
		className: `flex items-center gap-2 font-display font-bold no-underline ${compact ? "text-sm" : "text-[17px]"} ${light ? "text-white" : "text-fg"}`,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: `inline-flex items-center justify-center rounded-md bg-gold text-bg ${compact ? "size-8" : "size-9"}`,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sun, { className: compact ? "size-3.5" : "size-4" })
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "tracking-[0.08em]",
			children: "SOLAN"
		})]
	});
}
function ThemeToggle() {
	const [theme, setTheme] = (0, import_react.useState)("dark");
	(0, import_react.useEffect)(() => {
		const t = document.documentElement.getAttribute("data-theme") === "light" ? "light" : "dark";
		setTheme(t);
	}, []);
	function toggle() {
		const next = theme === "dark" ? "light" : "dark";
		document.documentElement.setAttribute("data-theme", next);
		localStorage.setItem("solan-theme", next);
		setTheme(next);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type: "button",
		onClick: toggle,
		"aria-label": theme === "dark" ? "Switch to day mode" : "Switch to night mode",
		className: "inline-flex size-11 items-center justify-center rounded-md border border-line bg-card text-fg hover:border-gold hover:text-gold",
		children: theme === "dark" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sun, { className: "size-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Moon, { className: "size-4" })
	});
}
//#endregion
export { ThemeToggle as n, BrandLogo as t };
