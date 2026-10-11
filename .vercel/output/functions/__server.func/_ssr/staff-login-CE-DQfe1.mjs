import { o as __toESM } from "../_runtime.mjs";
import { Z as require_react, b as Link, w as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { i as getMe } from "./profile-DQCRTp4N.mjs";
import { r as rememberEmailSession, t as authClient } from "./client-CBLWHvnL.mjs";
import { n as ThemeToggle, t as BrandLogo } from "./theme-toggle-DPRXcjIk.mjs";
import { a as Lab, i as Field, n as Btn } from "./ui-CXzw7Q9b.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/staff-login-CE-DQfe1.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function StaffLogin() {
	const [email, setEmail] = (0, import_react.useState)("admin@solan.energy");
	const [password, setPassword] = (0, import_react.useState)("SolanFarm2026!");
	const [err, setErr] = (0, import_react.useState)("");
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [ready, setReady] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => setReady(true), []);
	async function onSubmit(e) {
		e?.preventDefault();
		if (!ready || busy) return;
		setBusy(true);
		setErr("");
		try {
			const res = await authClient.signIn.email({
				email,
				password
			});
			if (res.error) throw new Error(res.error.message || "Sign in failed");
			await rememberEmailSession(res.data?.token);
			const me = await getMe();
			window.location.assign(me.role === "CLIENT" ? "/client/dashboard" : "/staff/dashboard");
		} catch (ex) {
			setErr(ex instanceof Error ? ex.message : "Failed");
		} finally {
			setBusy(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "auth-split grid min-h-dvh lg:grid-cols-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
			className: "auth-hero relative hidden overflow-hidden lg:flex",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: "/img/hero-plant.jpg",
					alt: "",
					className: "absolute inset-0 h-full w-full object-cover"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-r from-[#0f172a]/90 to-[#0f172a]/40" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative z-10 flex h-full flex-col justify-between p-10 text-white",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BrandLogo, { light: true }),
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
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "auth-pane flex min-h-dvh flex-col bg-bg",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "auth-mobile-bar flex h-14 shrink-0 items-center justify-between border-b border-line px-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BrandLogo, { compact: true }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ThemeToggle, {})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "auth-card mx-auto flex w-full max-w-md flex-1 flex-col justify-center px-5 py-8",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-2xl font-semibold",
						children: "Staff sign in"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 mb-6 text-sm text-muted",
						children: "Use a seeded operations account."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						action: "#",
						method: "post",
						onSubmit,
						className: "space-y-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lab, { children: "Email" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								type: "email",
								inputMode: "email",
								autoComplete: "username",
								value: email,
								onChange: (e) => setEmail(e.target.value),
								required: true
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lab, { children: "Password" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								type: "password",
								autoComplete: "current-password",
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
								className: "min-h-12 w-full",
								disabled: !ready || busy,
								type: "button",
								onClick: () => void onSubmit(),
								children: !ready ? "Loading…" : busy ? "Please wait…" : "Sign in"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-6 rounded-lg border border-line bg-card p-4 font-mono text-xs leading-relaxed text-muted",
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
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/login",
						className: "mt-4 inline-flex min-h-11 items-center text-sm text-gold no-underline lg:hidden",
						children: "← Client sign in"
					})
				]
			})]
		})]
	});
}
//#endregion
export { StaffLogin as component };
