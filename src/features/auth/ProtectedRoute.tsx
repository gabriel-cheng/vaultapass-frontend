import type { ReactNode } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useCurrentUser } from "../../features/auth/api/useCurrentUser";

interface ProtectedRouteProps {
  children?: ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const location = useLocation();
  const currentUser = useCurrentUser();

  if (currentUser.isPending) {
    return null;
  }

  if (currentUser.isError) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  if (children) {
    return children;
  }

  return <Outlet />;
}
