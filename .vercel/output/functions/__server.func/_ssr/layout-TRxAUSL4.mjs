import { o as __toESM } from "../_runtime.mjs";
import { Z as require_react } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/layout-TRxAUSL4.js
var import_react = /* @__PURE__ */ __toESM(require_react());
/** True when the visitor is on a real phone, even if the preview iframe is desktop-wide. */
function detectPhone() {
	if (typeof window === "undefined") return false;
	const short = Math.min(window.screen.width || 0, window.screen.height || 0);
	const touch = (navigator.maxTouchPoints || 0) > 0 || "ontouchstart" in window;
	return window.innerWidth < 768 || touch && short > 0 && short < 820;
}
function useIsPhone() {
	const [phone, setPhone] = (0, import_react.useState)(() => typeof document !== "undefined" && document.documentElement.getAttribute("data-layout") === "phone");
	(0, import_react.useEffect)(() => {
		const apply = () => {
			const on = detectPhone();
			document.documentElement.setAttribute("data-layout", on ? "phone" : "desktop");
			setPhone(on);
		};
		apply();
		window.addEventListener("resize", apply);
		window.addEventListener("orientationchange", apply);
		return () => {
			window.removeEventListener("resize", apply);
			window.removeEventListener("orientationchange", apply);
		};
	}, []);
	return phone;
}
//#endregion
export { useIsPhone as t };
