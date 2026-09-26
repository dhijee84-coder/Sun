import { o as __toESM } from "../_runtime.mjs";
import { H as require_react, S as require_jsx_runtime, b as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as getMe } from "./profile-CaSHhhIo.mjs";
import { a as useCurrentUserState, t as RedirectToSignIn } from "./gates-B_IGPI9u.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/portal-BhAih-Xx.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Portal() {
	const { user, isPending } = useCurrentUserState();
	const navigate = useNavigate();
	(0, import_react.useEffect)(() => {
		if (isPending) return;
		if (!user) return;
		getMe().then((m) => navigate({ to: m.role === "CLIENT" ? "/client/dashboard" : "/staff/dashboard" })).catch(() => navigate({ to: "/login" }));
	}, [
		user,
		isPending,
		navigate
	]);
	if (isPending) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "grid min-h-screen place-items-center bg-bg text-muted",
		children: "Opening portal…"
	});
	if (!user) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RedirectToSignIn, { to: "/login" });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "grid min-h-screen place-items-center bg-bg text-muted",
		children: "Opening portal…"
	});
}
//#endregion
export { Portal as component };
