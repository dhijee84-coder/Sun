import { o as __toESM } from "../_runtime.mjs";
import { Z as require_react, b as Link, w as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { i as getMe } from "./profile-DQCRTp4N.mjs";
import { t as GROK_PROVIDERS } from "./server-ChNo9lfy.mjs";
import { i as signIn, r as rememberEmailSession, t as authClient } from "./client-CBLWHvnL.mjs";
import { n as ThemeToggle, t as BrandLogo } from "./theme-toggle-DPRXcjIk.mjs";
import { a as Lab, i as Field, n as Btn } from "./ui-CXzw7Q9b.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/login-B4-wbmUI.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
async function goAfterAuth() {
	const to = (await getMe()).role === "CLIENT" ? "/client/dashboard" : "/staff/dashboard";
	window.location.assign(to);
}
function Login() {
	const [mode, setMode] = (0, import_react.useState)("in");
	const [email, setEmail] = (0, import_react.useState)("demo@solan.energy");
	const [password, setPassword] = (0, import_react.useState)("SolanFarm2026!");
	const [name, setName] = (0, import_react.useState)("");
	const [err, setErr] = (0, import_react.useState)("");
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [ready, setReady] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => setReady(true), []);
	async function onEmail(e) {
		e?.preventDefault();
		if (!ready || busy) return;
		setErr("");
		setBusy(true);
		try {
			let em = email.trim();
			let pw = password;
			if (em === "9999999999") {
				em = "demo@solan.energy";
				if (pw === "1234") pw = "SolanFarm2026!";
			}
			if (mode === "up") {
				const res = await authClient.signUp.email({
					email: em,
					password: pw,
					name: name || "Solan client"
				});
				if (res.error) throw new Error(res.error.message || "Sign up failed");
				await rememberEmailSession(res.data?.token);
			} else {
				const res = await authClient.signIn.email({
					email: em,
					password: pw
				});
				if (res.error) throw new Error(res.error.message || "Sign in failed");
				await rememberEmailSession(res.data?.token);
			}
			await goAfterAuth();
		} catch (ex) {
			setErr(ex instanceof Error ? ex.message : "Failed");
		} finally {
			setBusy(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "auth-split grid min-h-dvh lg:grid-cols-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
			className: "auth-hero relative hidden overflow-hidden lg:flex lg:flex-col lg:justify-between",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: "/img/hero-farm.jpg",
					alt: "",
					className: "absolute inset-0 h-full w-full object-cover"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-r from-[#0f172a]/90 to-[#0f172a]/40" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative z-10 flex h-full flex-col justify-between p-10 text-white",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BrandLogo, { light: true }),
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
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mb-5 inline-flex rounded-md border border-line bg-bg p-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: `min-h-10 rounded px-4 text-xs font-mono uppercase ${mode === "in" ? "bg-cell text-gold" : "text-muted"}`,
							onClick: () => setMode("in"),
							children: "Sign in"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: `min-h-10 rounded px-4 text-xs font-mono uppercase ${mode === "up" ? "bg-cell text-gold" : "text-muted"}`,
							onClick: () => setMode("up"),
							children: "Register"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-2xl font-semibold",
						children: mode === "in" ? "Client sign in" : "Create a client account"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 mb-5 text-sm text-muted",
						children: "Email and password, or Google / X."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mb-5 space-y-2",
						children: GROK_PROVIDERS.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: () => signIn(p.providerId, { callbackURL: "/portal" }),
							className: "min-h-12 w-full rounded-md border border-line px-4 text-sm hover:bg-cell",
							children: ["Continue with ", p.label]
						}, p.providerId))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						action: "#",
						method: "post",
						onSubmit: onEmail,
						className: "space-y-3",
						children: [
							mode === "up" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lab, { children: "Name" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								value: name,
								onChange: (e) => setName(e.target.value),
								required: true
							})] }) : null,
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lab, { children: "Email or demo mobile" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								type: "text",
								autoComplete: "username",
								inputMode: "email",
								value: email,
								onChange: (e) => setEmail(e.target.value),
								required: true
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lab, { children: "Password or OTP" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
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
								onClick: () => void onEmail(),
								children: !ready ? "Loading…" : busy ? "Please wait…" : mode === "in" ? "Sign in" : "Register"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 text-xs leading-relaxed text-muted",
						children: "Demo client: demo@solan.energy / SolanFarm2026! — or mobile 9999999999 / OTP 1234"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/staff-login",
						className: "mt-4 inline-flex min-h-11 items-center text-sm text-gold no-underline",
						children: "Staff / admin sign in →"
					})
				]
			})]
		})]
	});
}
//#endregion
export { Login as component };
