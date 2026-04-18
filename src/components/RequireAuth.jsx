import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hook/useAuth";

/**
 * Protege rutas que requieren autenticación.
 *
 * Sin el estado loading existía un problema al volver de páginas externas
 * (como la pasarela de pago de Stripe): la app recarga desde cero, user
 * arranca en null y RequireAuth redirigía al login antes de que getSession()
 * pudiera recuperar la sesión de la cookie.
 *
 * Con loading sabemos distinguir tres situaciones:
 *   - loading=true              → aún no sabemos si hay sesión, esperar
 *   - loading=false, user=null  → no hay sesión, redirigir a /login
 *   - loading=false, user={...} → hay sesión, mostrar la página
 */
export default function RequireAuth({ children }) {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Solo redirigimos cuando loading es false, es decir, cuando getSession()
    // ya ha terminado y sabemos con certeza que no hay usuario.
    if (!loading && !user) {
      navigate("/login", { replace: true });
    }
  }, [user, loading, navigate]);

  // Mientras getSession() no ha terminado, no renderizamos nada.
  if (loading) return null;
  if (!user) return null;
  return children;
}
