import { S as require_jsx_runtime, v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as PublicShell, t as PageHero } from "./public-shell-CArDp6-S.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/how-it-works-ni_0hMDC.js
var import_jsx_runtime = require_jsx_runtime();
var STEPS = [
	["Buy panels", "Choose capacity from a live Solan farm. Serials are reserved from available stock."],
	["We commission", "Solan installs, inspects and interconnects on our land. You never host hardware."],
	["Track generation", "The client portal shows daily kWh from your strings."],
	["Pay for usage", "Billing follows actual generation, not a rooftop estimate."],
	["We maintain", "Cleaning, warranty and replacements stay with Solan operations."]
];
function How() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PublicShell, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHero, {
		kicker: "How it works",
		title: "Four steps from purchase to usage billing.",
		image: "/img/hero-plant.jpg"
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "mx-auto max-w-3xl px-4 py-16",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
			className: "space-y-6",
			children: STEPS.map(([t, d], i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
				className: "flex gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "font-display text-2xl font-semibold text-gold",
					children: String(i + 1).padStart(2, "0")
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "font-display text-xl font-semibold",
					children: t
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-muted",
					children: d
				})] })]
			}, t))
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
			to: "/login",
			className: "mt-10 inline-flex min-h-11 items-center rounded-md bg-gold px-5 py-2 font-semibold text-bg no-underline",
			children: "Open client portal"
		})]
	})] });
}
//#endregion
export { How as component };
