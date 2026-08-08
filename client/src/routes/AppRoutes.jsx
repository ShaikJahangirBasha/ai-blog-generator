import { Routes, Route } from "react-router-dom";

import DashboardLayout from "../layouts/DashboardLayout";

import LandingPage from "../pages/LandingPage";
import Dashboard from "../pages/Dashboard";
import GenerateBlog from "../pages/GenerateBlog";
import Settings from "../pages/Settings";
import NotFound from "../pages/NotFound";

import ProtectedRoute from "./ProtectedRoute";

function AppRoutes() {
  return (
    <Routes>
      {/* Public */}

      <Route
        path="/"
        element={<LandingPage />}
      />

      {/* Protected */}

      <Route
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route
          path="/dashboard"
          element={<Dashboard />}
        />

        <Route
          path="/generate"
          element={<GenerateBlog />}
        />

        <Route
          path="/settings"
          element={<Settings />}
        />
      </Route>

      {/* Future */}

      {/* <Route
        path="/blog/:id"
        element={
          <ProtectedRoute>
            <BlogDetails />
          </ProtectedRoute>
        }
      /> */}

      <Route
        path="*"
        element={<NotFound />}
      />
    </Routes>
  );
}

export default AppRoutes;