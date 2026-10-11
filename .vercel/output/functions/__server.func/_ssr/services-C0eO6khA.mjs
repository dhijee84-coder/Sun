import { o as __toESM } from "../_runtime.mjs";
import { Z as require_react, w as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { p as inr } from "./seed-ReQMGFmm.mjs";
import { n as getPublicSite } from "./router-DBiPuqu_.mjs";
import { n as PublicShell, t as PageHero } from "./public-shell-DS30Z_td.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/services-C0eO6khA.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Services() {
	const [items, setItems] = (0, import_react.useState)([]);
	(0, import_react.useEffect)(() => {
		getPublicSite().then((s) => setItems(s.services)).catch(() => {});
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PublicShell, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHero, {
		kicker: "Services",
		title: "Farm operations included. Optional extras on request.",
		image: "/img/hero-farm.jpg"
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "mx-auto grid max-w-6xl gap-5 px-4 py-16 md:grid-cols-3",
		children: items.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
			className: "rounded-lg border border-line bg-card p-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "font-display text-xl font-semibold",
					children: s.name
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted",
					children: s.description
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-4 font-mono text-gold",
					children: Number(s.base_price) ? inr(s.base_price) : "Included / on request"
				})
			]
		}, s.id))
	})] });
}
//#endregion
export { Services as component };
