import { useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import LoadingScreen from "./LoadingScreen";
import { hasAccessToken } from "../services/tokenService";
import { useAuth } from "../contexts/AuthContext";

export default function ProtectedRoute({
  children,
  allowedPermissions = [],
  requireAll = false,
}) {
  const { admin, loading, fetchAdmin } = useAuth();
  const location = useLocation();

  useEffect(() => {
    // Attempt to fetch admin
    if (hasAccessToken() && !admin && !loading) fetchAdmin();
  }, [admin, loading, fetchAdmin]);

  // Admin fetch in progress
  if (loading) return <LoadingScreen />;

  // Admin fetch unsuccessful
  if (!admin && !loading) return <Navigate to="/login" replace />;

  // Check permissions if specified
  if (allowedPermissions.length > 0) {
    const hasPermission = requireAll
      ? allowedPermissions.every((p) => admin.permissions?.includes(p))
      : allowedPermissions.some((p) => admin.permissions?.includes(p));

    if (!hasPermission) {
      console.log("[ProtectedRoute] Unauthorized access:", {
        path: location.pathname,
        adminPermissions: admin.permissions,
        allowedPermissions,
      });

      return <Navigate to="/unauthorized" replace />;
    }
  }

  // Render protected content
  return children;
}
