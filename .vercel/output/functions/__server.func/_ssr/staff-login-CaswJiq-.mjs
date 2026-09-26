import { o as __toESM } from "../_runtime.mjs";
import { H as require_react, S as require_jsx_runtime, b as useNavigate, v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as getMe } from "./profile-CaSHhhIo.mjs";
import { t as authClient } from "./client-B40BzJxt.mjs";
import { n as Sun } from "../_libs/lucide-react.mjs";
import { t as ThemeToggle } from "./theme-toggle-72quO4YF.mjs";
import { a as Lab, i as Field, n as Btn } from "./ui-CXzw7Q9b.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/staff-login-CaswJiq-.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function StaffLogin() {
	const navigate = useNavigate();
	const [email, setEmail] = (0, import_react.useState)("admin@solan.energy");
	const [password, setPassword] = (0, import_react.useState)("SolanFarm2026!");
	const [err, setErr] = (0, import_react.useState)("");
	const [busy, setBusy] = (0, import_react.useState)(false);
	async function onSubmit(e) {
		e.preventDefault();
		setBusy(true);
		setErr("");
		try {
			const res = await authClient.signIn.email({
				email,
				password
			});
			if (res.error) throw new Error(res.error.message || "Sign in failed");
			if ((await getMe()).role === "CLIENT") {
				await navigate({ to: "/client/dashboard" });
				return;
			}
			await navigate({ to: "/staff/dashboard" });
		} catch (ex) {
			setErr(ex instanceof Error ? ex.message : "Failed");
		} finally {
			setBusy(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid min-h-screen lg:grid-cols-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "hidden flex-col justify-between bg-cover bg-center p-10 text-white lg:flex",
			style: { backgroundImage: `linear-gradient(90deg, rgba(15,23,42,.88), rgba(15,23,42,.45)), url("/img/hero-plant.jpg")` },
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/",
					className: "flex items-center gap-2 font-display text-lg font-bold text-white no-underline",
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
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-mono text-xs tracking-widest text-gold uppercase",
					children: "Operations console"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-3 font-display text-4xl font-semibold",
					children: "Admin, Super Admin and Primary Admin."
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/login",
					className: "text-sm text-gold no-underline",
					children: "← Client sign in"
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex items-center bg-bg p-6",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto w-full max-w-sm",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mb-6 flex justify-end",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ThemeToggle, {})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-2xl font-semibold",
						children: "Staff sign in"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 mb-6 text-sm text-muted",
						children: "Use a seeded operations account."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						onSubmit,
						className: "space-y-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lab, { children: "Email" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								type: "email",
								value: email,
								onChange: (e) => setEmail(e.target.value),
								required: true
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lab, { children: "Password" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								type: "password",
								value: password,
								onChange: (e) => setPassword(e.target.value),
								required: true
							})] }),
							err ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm text-danger",
								children: err
							}) : null,
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
								variant: "gold",
								className: "w-full",
								disabled: busy,
								type: "submit",
								children: busy ? "Please wait…" : "Sign in"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-6 rounded-lg border border-line bg-card p-4 font-mono text-xs text-muted",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mb-2 font-sans text-[10px] tracking-widest uppercase",
								children: "Seeded accounts"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "primary@solan.energy" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "super@solan.energy" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "admin@solan.energy" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2",
								children: "Password: SolanFarm2026!"
							})
						]
					})
				]
			})
		})]
	});
}
//#endregion
export { StaffLogin as component };
