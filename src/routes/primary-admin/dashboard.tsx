import { createFileRoute, Navigate } from "@tanstack/react-router";

export const Route = createFileRoute("/primary-admin/dashboard")({
  component: () => <Navigate to="/staff/dashboard" />,
});
