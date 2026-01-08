import { createContext, useContext, useState } from "react";
import { getAuthenticatedAdmin } from "../api/endpoints/auth";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // Initialize admin from localStorage if available
  const [admin, internalSetAdmin] = useState(() => {
    const storedAdmin = localStorage.getItem("admin");
    return storedAdmin ? JSON.parse(storedAdmin) : null;
  });

  const [loading, setLoading] = useState(false);

  // Persist admin across browser refreshes
  const setAdmin = (newAdmin) => {
    internalSetAdmin(newAdmin);
    if (newAdmin) {
      localStorage.setItem("admin", JSON.stringify(newAdmin));
    } else {
      localStorage.removeItem("admin");
    }
  };

  const fetchAdmin = async () => {
    setLoading(true);
    try {
      const data = await getAuthenticatedAdmin();
      setAdmin(data.admin);
    } catch (error) {
      setAdmin(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ admin, setAdmin, loading, fetchAdmin }}>
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
