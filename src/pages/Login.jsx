import { Link } from "react-router-dom";
import { InputComp } from "../components/input";
import { useAuth } from "../hook/useAuth";
import { useState } from "react";

export default function Login() {
  const { loginRequest } = useAuth();
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    email: "",
    contraseña: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (error) setError(null);
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);

    const required = [
      ["email", "Email"],
      ["contraseña", "Contraseña"],
    ];
    for (const [key, label] of required) {
      const raw = formData[key];
      const empty =
        raw === undefined ||
        raw === null ||
        (typeof raw === "string" && raw.trim() === "");
      if (empty) {
        setError(`El campo «${label}» es obligatorio.`);
        return;
      }
    }

    const result = await loginRequest({
      email: formData.email.trim(),
      contraseña: formData.contraseña,
    });

    if (!result?.ok) {
      setError(
        result?.message ||
          "No se pudo iniciar sesión. Inténtalo de nuevo."
      );
    }
    /* Si va bien, loginRequest ya navega a "/" desde el contexto */
  };

  return (
    <div className="relative flex justify-center items-center">
      
      <div className="w-full flex justify-center items-center mt-8">
        <div className="container shadow rounded-2xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
          <div className=" flex flex-col items-center justify-center lg:items-start gap-5 lg:max-w-5/6">
            <h2 className="text-3xl font-bold mb-8">Inicia Sessión</h2>
            <p>Ingresa tus credenciales para acceder a tu tienda de animales favorita.</p>
            {error && (
              <div
                role="alert"
                className="w-full rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800"
              >
                {error}
              </div>
            )}
            <form className="flex flex-col gap-6 w-full" onSubmit={handleLogin}>
              <div className="flex flex-col gap-4">
                  <InputComp
                    name="email"
                    labelName="Email"
                    placeholder="Tu email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                  <InputComp
                    name="contraseña"
                    labelName="Contraseña"
                    placeholder="Tu contraseña"
                    type="password"
                    value={formData.contraseña}
                    onChange={handleChange}
                  />
              </div>
              <div className="flex flex-col md:flex-row justify-between">
                <div className="flex items-center gap-2">
                  <input 
                    type="checkbox" 
                    className="h-4 w-4 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500" 
                  />
                  <label className="text-gray-700">Recordar</label>
                </div>

                <div>
                  <a href="#" className="text-gray-400">Has olvidado tu contraseña?</a>
                </div>
              </div>
              <input 
                type="submit" 
                value={"Iniciar Sessión"} 
                className="
                  mt-4 w-full py-2.5 px-4 rounded-lg font-medium text-white!
                  bg-emerald-600 hover:bg-emerald-700
                  transition-colors duration-200 text-center no-underline block"
              />
            </form>
            <p>¿No tienes cuenta?  <Link to="/register" className="underline">Regístrate</Link></p>
          </div>
          <div
            className="bg-[url('/img/login.png')] bg-cover bg-center w-full h-48 sm:h-64 lg:h-full shadow-md rounded-lg"
            role="img" 
            aria-label="Imagen mujer con perro"
          ></div>

        </div>
      </div>

      </div>
    </div>
  )
}
