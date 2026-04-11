import { createContext } from "react";

/** Misma base que usa el resto del proyecto (cart, etc.) — debe coincidir con CORS en el backend */
const API_BASE = "http://localhost:3000/api";

export const AuthContext = createContext(null);

/**
 * Llama a POST /api/auth/registrar.
 */
async function registerRequest(userData) {
  try {
    const res = await fetch(`http://localhost:3000/api/auth/registrar`, {
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

    console.log("Se ha registrado el usuario correctamente");

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

export function AuthProvider({ children }) {
  return (
    <AuthContext.Provider value={{ 
      registerRequest 
      }}>
      {children}
    </AuthContext.Provider>
  );
}
