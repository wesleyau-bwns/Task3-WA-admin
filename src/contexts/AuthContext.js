import { createContext, useContext, useState } from "react";
import { getAuthenticatedAdmin, getPermissions } from "../api/endpoints/auth";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const [permissions, setPermissions] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchAdmin = async () => {
    setLoading(true);
    try {
      const response = await getAuthenticatedAdmin();
      const admin = response.data.admin || null;
      setAdmin(admin);
    } catch {
      setAdmin(null);
    } finally {
      setLoading(false);
    }
  };

  const fetchPermissions = async () => {
    try {
      const response = await getPermissions();
      const perms = response.data.permissions || [];
      setPermissions(perms);
    } catch (err) {
      setPermissions([]);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        admin,
        permissions,
        loading,
        setAdmin,
        fetchAdmin,
        fetchPermissions,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
