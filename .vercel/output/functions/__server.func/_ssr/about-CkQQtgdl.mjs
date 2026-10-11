import { w as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as PublicShell, t as PageHero } from "./public-shell-DS30Z_td.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/about-CkQQtgdl.js
var import_jsx_runtime = require_jsx_runtime();
function About() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PublicShell, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHero, {
		kicker: "About us",
		title: "Open land. Company farms. Client-owned panels.",
		image: "/img/hero-farm.jpg"
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "mx-auto max-w-3xl px-4 py-16",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-lg text-muted",
			children: "Solan develops solar parks on empty land. We do not mount anything on houses. You purchase panels at a Solan farm. We install, maintain, insure and operate them. You pay for the energy those panels generate."
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-10 grid gap-6 sm:grid-cols-3",
			children: [
				["Land", "We acquire and operate farm sites."],
				["Panels", "You buy serial-tracked capacity."],
				["Energy", "Usage billing from live generation."]
			].map(([t, d]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-lg border border-line bg-card p-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "font-display text-lg font-semibold",
					children: t
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted",
					children: d
				})]
			}, t))
		})]
	})] });
}
//#endregion
export { About as component };
