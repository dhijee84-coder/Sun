import { o as __toESM } from "../_runtime.mjs";
import { H as require_react, S as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as PublicShell, r as getPublicSite, t as PageHero } from "./public-shell-CArDp6-S.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/faq-DyJWmWFD.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Faq() {
	const [faqs, setFaqs] = (0, import_react.useState)([]);
	(0, import_react.useEffect)(() => {
		getPublicSite().then((s) => setFaqs(s.faqs)).catch(() => {});
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PublicShell, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHero, {
		kicker: "FAQ",
		title: "Straight answers about farm-side solar.",
		image: "/img/hero-plant.jpg"
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "mx-auto max-w-3xl px-4 py-16",
		children: faqs.map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("details", {
			className: "border-b border-line py-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("summary", {
				className: "cursor-pointer font-semibold",
				children: f.question
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-muted",
				children: f.answer
			})]
		}, f.id))
	})] });
}
//#endregion
export { Faq as component };
