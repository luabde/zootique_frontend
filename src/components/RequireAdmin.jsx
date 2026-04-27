import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hook/useAuth";

/**
 * Protege rutas solo para administradores.
 * Requiere que el usuario este autenticado y que su rol sea "admin".
 */
export default function RequireAdmin({ children }) {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Caso 1: sin sesión -> login.
    if (!loading && !user) {
      navigate("/login", { replace: true });
      return;
    }

    // Caso 2: hay sesión pero no es admin -> home.
    if (!loading && user && user.rol !== "admin") {
      navigate("/", { replace: true });
    }
  }, [user, loading, navigate]);

  // Mientras se resuelve sesión o si no cumple rol, no renderizamos la vista protegida.
  if (loading) return null;
  if (!user || user.rol !== "admin") return null;
  return children;
}
