import { useEffect, useState } from "react";

/** True when the visitor is on a real phone, even if the preview iframe is desktop-wide. */
export function detectPhone() {
  if (typeof window === "undefined") return false;
  const short = Math.min(window.screen.width || 0, window.screen.height || 0);
  const touch = (navigator.maxTouchPoints || 0) > 0 || "ontouchstart" in window;
  return window.innerWidth < 768 || (touch && short > 0 && short < 820);
}

export function useIsPhone() {
  const [phone, setPhone] = useState(() =>
    typeof document !== "undefined" && document.documentElement.getAttribute("data-layout") === "phone",
  );
  useEffect(() => {
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
