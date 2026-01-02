import { useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import LoadingScreen from "./LoadingScreen";
import { hasAccessToken } from "../utils/tokenService";
import { useAuth } from "../contexts/AuthContext";

export default function ProtectedRoute({
  children,
  allowedPermissions = [],
  requireAll = false,
}) {
  const { user, loading, fetchUser } = useAuth();
  const location = useLocation();

  useEffect(() => {
    // Attempt to fetch user
    if (hasAccessToken() && !user && !loading) fetchUser();
  }, [user, loading, fetchUser]);

  // User fetch in progress
  if (loading) return <LoadingScreen />;

  // User fetch unsuccessful
  if (!user && !loading) return <Navigate to="/login" replace />;

  // Check permissions if specified
  if (allowedPermissions.length > 0) {
    const hasPermission = requireAll
      ? allowedPermissions.every((p) => user.permissions?.includes(p))
      : allowedPermissions.some((p) => user.permissions?.includes(p));

    if (!hasPermission) {
      console.log("[ProtectedRoute] Unauthorized access:", {
        path: location.pathname,
        userPermissions: user.permissions,
        allowedPermissions,
      });

      return <Navigate to="/unauthorized" replace />;
    }
  }

  // Render protected content once user is authenticated
  return children;
}
