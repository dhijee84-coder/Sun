import { Link } from "@tanstack/react-router";
import { Sun } from "lucide-react";

export function BrandLogo({
  to = "/",
  light = false,
  compact = false,
}: {
  to?: string;
  light?: boolean;
  compact?: boolean;
}) {
  return (
    <Link
      to={to}
      className={`flex items-center gap-2 font-display font-bold no-underline ${
        compact ? "text-sm" : "text-[17px]"
      } ${light ? "text-white" : "text-fg"}`}
    >
      <span
        className={`inline-flex items-center justify-center rounded-md bg-gold text-bg ${
          compact ? "size-8" : "size-9"
        }`}
      >
        <Sun className={compact ? "size-3.5" : "size-4"} />
      </span>
      <span className="tracking-[0.08em]">SOLAN</span>
    </Link>
  );
}
