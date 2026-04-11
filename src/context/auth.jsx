import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const API_BASE = "http://localhost:3000/api";

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  /**
   * Llama a POST /api/auth/registrar.
   */
  async function registerRequest(userData) {
    try {
      const res = await fetch(`${API_BASE}/auth/registrar`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        /** Necesario para que el navegador guarde las cookies httpOnly (accessToken, refreshToken) que envía Express */
        credentials: "include",
        body: JSON.stringify(userData),
      });

      let data = {};
      data = await res.json();

      if (!res.ok) {
        return {
          ok: false,
          status: res.status,
          message: data.message || "No se pudo completar el registro",
        };
      }

      return {
        ok: true,
        usuario: data.data?.usuario,
        message: data.message,
      };
    } catch (err) {
      return {
        ok: false,
        message: err?.message || "Error de red al registrar",
      };
    }
  }

  /**
   * GET /api/auth/me — sesión actual. Si el access caducó pero hay refresh válido, intenta renovar y vuelve a pedir /me.
   */
  async function getSession() {
    try {
      let res = await fetch(`${API_BASE}/auth/me`, {
        credentials: "include",
      });

      let data = await res.json().catch(() => ({}));

      if (!res.ok && (res.status === 401 || res.status === 403)) {
        const ref = await fetch(`${API_BASE}/auth/refresh-token`, {
          method: "POST",
          credentials: "include",
        });
        if (ref.ok) {
          res = await fetch(`${API_BASE}/auth/me`, {
            credentials: "include",
          });
          data = await res.json().catch(() => ({}));
        }
      }

      if (!res.ok) {
        setUser(null);
        return {
          ok: false,
          status: res.status,
          message: data.message || "No hay sesión",
        };
      }

      setUser(data.data);

      return {
        ok: true,
        usuario: data.data,
        message: data.message,
      };
    } catch (err) {
      setUser(null);
      return {
        ok: false,
        message: err?.message || "Error de red",
      };
    }
  }

  /**
   * POST /api/auth/refresh-token — pide un accessToken nuevo usando la cookie refreshToken (sesión larga).
   * No devuelve usuario; solo renueva la cookie de acceso para que /me vuelva a funcionar si el access había caducado.
   */
  async function refreshToken() {
    try {
      const res = await fetch(`${API_BASE}/auth/refresh-token`, {
        method: "POST",
        credentials: "include",
      });

      let data = {};
      data = await res.json();

      if (!res.ok) {
        return {
          ok: false,
          status: res.status,
          message: data.message || "No se pudo renovar la sesión",
        };
      }

      return {
        ok: true,
        message: data.message,
      };
    } catch (err) {
      return {
        ok: false,
        message: err?.message || "Error de red al renovar",
      };
    }
  }

  /**
   * Login: 1) POST credenciales → el servidor pone accessToken + refreshToken en cookies.
   * 2) getSession (/me) rellena `user` en el estado.
   * 3) Si /me falla (p. ej. access aún no válido o timing raro), se intenta refresh y otro /me.
   * 4) Navegación a "/" si todo va bien; la página de Login solo muestra error si devolvemos ok: false.
   */
  async function loginRequest(credentials) {
    try {
      // Paso A: validar credenciales y recibir cookies de sesión
      const res = await fetch(`${API_BASE}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(credentials),
      });

      let data = {};
      data = await res.json();

      if (!res.ok) {
        return {
          ok: false,
          status: res.status,
          message: data.message || "No se pudo iniciar sesión",
        };
      }

      // Paso B: leer usuario con el token que acaban de guardar las cookies
      const result = await getSession();

      if (result.ok) {
        navigate("/");
        return {
          ok: true,
          usuario: result.usuario,
          message: data.message,
        };
      }
      // Paso C: si /me falló, puede ser access caducado o carrera; pedimos un access nuevo y volvemos a intentar /me
      const refreshResult = await refreshToken();

      if (refreshResult.ok) {
        const second = await getSession();
        if (!second.ok) {
          navigate("/login");
          return {
            ok: false,
            message: second.message || "No se pudo obtener la sesión",
          };
        }
        navigate("/");
        return {
          ok: true,
          usuario: second.usuario,
          message: data.message,
        };
      }

      return {
        ok: false,
        message: refreshResult.message || "No se pudo renovar la sesión",
      };
    } catch (err) {
      return {
        ok: false,
        message: err?.message || "Error al iniciar sesión",
      };
    }
  }

  async function logout() {
    try {
      const res = await fetch(`${API_BASE}/auth/logout`, {
        method: "POST",
        credentials: "include",
      });
      await res.json().catch(() => ({}));
      setUser(null);
      navigate("/");
      return { ok: res.ok };
    } catch (err) {
      setUser(null);
      return { ok: false, message: err?.message };
    }
  }

  return (
    <AuthContext.Provider
      value={{
        registerRequest,
        loginRequest,
        getSession,
        refreshToken,
        logout,
        user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
