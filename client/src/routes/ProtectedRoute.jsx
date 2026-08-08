import { Navigate } from "react-router-dom";

import useAuth from "../hooks/useAuth";

function ProtectedRoute({ children }) {
  const {
    loading,
    isAuthenticated,
  } = useAuth();

  // Show loader while checking auth
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-100">
        <div className="h-10 w-10 rounded-full border-4 border-slate-300 border-t-blue-600 animate-spin" />
      </div>
    );
  }

  // Not logged in
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  // Logged in
  return children;
}

export default ProtectedRoute;