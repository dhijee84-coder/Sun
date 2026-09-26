import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { RedirectToSignIn } from "@/lib/auth/gates";
import { useCurrentUserState } from "@/lib/auth/use-current-user";
import { getMe } from "@/lib/solan/profile";
import { useEffect } from "react";

export const Route = createFileRoute("/portal")({ component: Portal });

function Portal() {
  const { user, isPending } = useCurrentUserState();
  const navigate = useNavigate();
  useEffect(() => {
    if (isPending) return;
    if (!user) return;
    getMe()
      .then((m) => navigate({ to: m.role === "CLIENT" ? "/client/dashboard" : "/staff/dashboard" }))
      .catch(() => navigate({ to: "/login" }));
  }, [user, isPending, navigate]);
  if (isPending) return <div className="grid min-h-screen place-items-center bg-bg text-muted">Opening portal…</div>;
  if (!user) return <RedirectToSignIn to="/login" />;
  return <div className="grid min-h-screen place-items-center bg-bg text-muted">Opening portal…</div>;
}
