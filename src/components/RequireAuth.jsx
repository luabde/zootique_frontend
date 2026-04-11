import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hook/useAuth";

/** Solo renderiza hijos si hay usuario en sesión; si no, redirige a /login */
export default function RequireAuth({ children }) {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login", { replace: true });
    }
  }, [user, navigate]);

  if (!user) return null;
  return children;
}
