import { useContext } from "react";
import { AuthContext } from "../context/auth.jsx";

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (context == null) {
    throw new Error("useAuth tiene que ser usado con AuthProvider");
  }

  return context;
};
