import { o as __toESM } from "../_runtime.mjs";
import { H as require_react, S as require_jsx_runtime, b as useNavigate, v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as getMe } from "./profile-CaSHhhIo.mjs";
import { r as signIn, t as authClient } from "./client-B40BzJxt.mjs";
import { n as Sun } from "../_libs/lucide-react.mjs";
import { t as ThemeToggle } from "./theme-toggle-72quO4YF.mjs";
import { a as Lab, i as Field, n as Btn } from "./ui-CXzw7Q9b.mjs";
import { t as GROK_PROVIDERS } from "./server-C0CRWoi3.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/login-B7HCJE0o.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
async function goAfterAuth(navigate) {
	await navigate({ to: (await getMe()).role === "CLIENT" ? "/client/dashboard" : "/staff/dashboard" });
}
function Login() {
	const navigate = useNavigate();
	const [mode, setMode] = (0, import_react.useState)("in");
	const [email, setEmail] = (0, import_react.useState)("demo@solan.energy");
	const [password, setPassword] = (0, import_react.useState)("SolanFarm2026!");
	const [name, setName] = (0, import_react.useState)("");
	const [err, setErr] = (0, import_react.useState)("");
	const [busy, setBusy] = (0, import_react.useState)(false);
	async function onEmail(e) {
		e.preventDefault();
		setErr("");
		setBusy(true);
		try {
			if (mode === "up") {
				const res = await authClient.signUp.email({
					email,
					password,
					name: name || "Solan client"
				});
				if (res.error) throw new Error(res.error.message || "Sign up failed");
			} else {
				const res = await authClient.signIn.email({
					email,
					password
				});
				if (res.error) throw new Error(res.error.message || "Sign in failed");
			}
			await goAfterAuth(navigate);
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
			style: { backgroundImage: `linear-gradient(90deg, rgba(15,23,42,.88), rgba(15,23,42,.45)), url("/img/hero-farm.jpg")` },
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
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "font-display text-4xl font-semibold",
					children: "Buy farm panels. Pay for the energy they generate."
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-4 max-w-md text-white/80",
					children: "Nothing goes on your roof. Track generation, warranty and usage billing here."
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-mono text-xs tracking-widest text-gold uppercase",
					children: "Open-land farms · usage billing"
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
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mb-6 inline-flex rounded-md border border-line bg-bg p-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: `rounded px-3 py-2 text-xs font-mono uppercase ${mode === "in" ? "bg-cell text-gold" : "text-muted"}`,
							onClick: () => setMode("in"),
							children: "Sign in"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: `rounded px-3 py-2 text-xs font-mono uppercase ${mode === "up" ? "bg-cell text-gold" : "text-muted"}`,
							onClick: () => setMode("up"),
							children: "Register"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-2xl font-semibold",
						children: mode === "in" ? "Client sign in" : "Create a client account"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 mb-6 text-sm text-muted",
						children: "Email and password, or Google / X."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mb-5 space-y-2",
						children: GROK_PROVIDERS.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: () => signIn(p.providerId, { callbackURL: "/portal" }),
							className: "w-full rounded-md border border-line px-4 py-2.5 text-sm hover:bg-cell",
							children: ["Continue with ", p.label]
						}, p.providerId))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						onSubmit: onEmail,
						className: "space-y-3",
						children: [
							mode === "up" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lab, { children: "Name" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								value: name,
								onChange: (e) => setName(e.target.value),
								required: true
							})] }) : null,
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
								children: busy ? "Please wait…" : mode === "in" ? "Sign in" : "Register"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 text-xs text-muted",
						children: "Demo client: demo@solan.energy / SolanFarm2026!"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/staff-login",
						className: "mt-3 inline-block text-sm text-gold no-underline",
						children: "Staff / admin sign in →"
					})
				]
			})
		})]
	});
}
//#endregion
export { Login as component };
