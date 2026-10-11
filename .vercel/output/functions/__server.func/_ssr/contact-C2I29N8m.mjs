import { o as __toESM } from "../_runtime.mjs";
import { Z as require_react, w as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { r as submitEnquiry } from "./router-DBiPuqu_.mjs";
import { n as PublicShell, t as PageHero } from "./public-shell-DS30Z_td.mjs";
import { a as Lab, i as Field, n as Btn, t as Area } from "./ui-CXzw7Q9b.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/contact-C2I29N8m.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Contact() {
	const [status, setStatus] = (0, import_react.useState)("");
	async function onSubmit(e) {
		e.preventDefault();
		const fd = new FormData(e.currentTarget);
		try {
			await submitEnquiry({ data: {
				name: String(fd.get("name") || ""),
				email: String(fd.get("email") || ""),
				phone: String(fd.get("phone") || ""),
				message: String(fd.get("message") || "")
			} });
			setStatus("Received. An operations lead will reply.");
			e.currentTarget.reset();
		} catch (err) {
			setStatus(err instanceof Error ? err.message : "Could not send");
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PublicShell, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHero, {
		kicker: "Contact",
		title: "Talk to Solan operations.",
		image: "/img/hero-farm.jpg"
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "mx-auto max-w-xl px-4 py-16",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
			onSubmit,
			className: "space-y-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lab, { children: "Name" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					name: "name",
					required: true
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lab, { children: "Email" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					name: "email",
					type: "email",
					required: true
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lab, { children: "Phone" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, { name: "phone" })] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lab, { children: "Message" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Area, {
					name: "message",
					required: true
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
					variant: "gold",
					type: "submit",
					children: "Send enquiry"
				}),
				status ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-leaf",
					children: status
				}) : null
			]
		})
	})] });
}
//#endregion
export { Contact as component };
