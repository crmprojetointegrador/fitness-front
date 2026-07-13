import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { UserContext } from "../context/UserContext";

export default function ProtectedRoute() {
  const context = useContext(UserContext);

  if (!context) return null;

  if (!context.estaLogado) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}