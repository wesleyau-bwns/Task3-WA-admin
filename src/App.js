import { useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";

import ProtectedRoute from "./components/ProtectedRoute";
import SignIn from "./pages/SignIn";
import UnauthorizedPage from "./pages/Unauthorized";
import MainLayout from "./layouts/MainLayout";

import { ALL_PAGES } from "./constants/pages";

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    if (window.location.pathname === "/") {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/login" element={<SignIn />} />
      <Route path="/unauthorized" element={<UnauthorizedPage />} />

      {/* Protected Routes */}
      {ALL_PAGES.map((page) => (
        <Route
          key={page.path || "index"}
          path={`/${page.path}`}
          element={
            <ProtectedRoute allowedPermissions={page.allowedPermissions}>
              <MainLayout>
                <page.component />
              </MainLayout>
            </ProtectedRoute>
          }
        />
      ))}
    </Routes>
  );
}

export default App;
