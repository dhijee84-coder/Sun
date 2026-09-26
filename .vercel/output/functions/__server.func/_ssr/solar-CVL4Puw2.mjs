import { o as __toESM } from "../_runtime.mjs";
import { H as require_react, S as require_jsx_runtime, v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as PublicShell, r as getPublicSite, t as PageHero } from "./public-shell-CArDp6-S.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/solar-CVL4Puw2.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Solar() {
	const [projects, setProjects] = (0, import_react.useState)([]);
	(0, import_react.useEffect)(() => {
		getPublicSite().then((s) => setProjects(s.projects)).catch(() => {});
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PublicShell, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHero, {
		kicker: "Our farms",
		title: "Parks on open land, not rooftops.",
		image: "/img/hero-cells.jpg"
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "mx-auto max-w-6xl px-4 py-16",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "max-w-2xl text-muted",
				children: "Every farm is owned and operated by Solan. Clients buy panels from live inventory. Nothing is installed on a house."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-8 grid gap-5 md:grid-cols-2",
				children: projects.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
					className: "rounded-lg border border-line bg-card p-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-mono text-xs text-gold",
							children: p.project_code
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "mt-1 font-display text-2xl font-semibold",
							children: p.project_name
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-sm text-muted",
							children: [
								p.location,
								" · ",
								p.total_panels,
								" panels · ",
								Number(p.capacity_kw),
								" kW"
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 text-sm text-muted",
							children: p.public_description
						})
					]
				}, p.id))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/projects",
				className: "mt-8 inline-block font-semibold text-sky no-underline",
				children: "See public projects →"
			})
		]
	})] });
}
//#endregion
export { Solar as component };
