import { o as __toESM } from "../_runtime.mjs";
import { S as useNavigate, Z as require_react, w as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { i as getMe } from "./profile-DQCRTp4N.mjs";
import { r as useCurrentUserState, t as RedirectToSignIn } from "./gates-CBZ3D9wg.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/portal-BWJYfdBK.js
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
