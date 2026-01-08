import { useAuth } from "../contexts/AuthContext";
import { clearTokens } from "./tokenService";
import { logoutRequest } from "../api/endpoints/auth";

export const useLogout = () => {
  const { setAdmin } = useAuth();

  const logout = async () => {
    try {
      await logoutRequest();
    } catch (err) {
      // Still proceed with local logout
    } finally {
      clearTokens();
      setAdmin(null);
      window.location.href = `${window.location.origin}/login`;
    }
  };

  return logout;
};
