import { Link, useNavigate } from "react-router-dom";
import { InputComp } from "../components/input";
import { useAuth } from "../hook/useAuth";
import { useState } from "react";

export default function Register() {
  const navigate = useNavigate();
  const { registerRequest } = useAuth();
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    nombre: "",
    apellidos: "",
    email: "",
    telefono: "",
    username: "",
    contraseña: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (error) setError(null);
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError(null);

    const required = [
      ["nombre", "Nombre"],
      ["apellidos", "Apellidos"],
      ["email", "Email"],
      ["telefono", "Teléfono"],
      ["username", "Usuario"],
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

    // Obtenemos los datos del formulario, y si el telefono esta vacio, se devuelve vacio, sino se convierte a numero y se reemplazan los caracteres no numericos por vacio
    const payload = {
      ...formData,
      telefono:
        formData.telefono === ""
          ? formData.telefono
          : Number(String(formData.telefono).replace(/\D/g, "")),
    };
    
    const result = await registerRequest(payload);
    console.log(result);

    // Cuando el resultado es ok, se navega a la pagina de login para que se pueda iniciar sesion
    if (result.ok) {
      navigate("/login");
    } else {
      setError(
        result.message ||
          "No se pudo completar el registro. Inténtalo de nuevo."
      );
    }
  };
  return (
    <div className="relative flex justify-center items-center">
      
      <div className="w-full flex justify-center items-center mt-8">
        <div className="container shadow rounded-2xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
          <div className=" flex flex-col items-center justify-center lg:items-start gap-5 lg:max-w-5/6">
            <h2 className="text-3xl font-bold mb-8">Registrate</h2>
            <p>Ingresa tus credenciales para acceder a tu tienda de animales favorita.</p>
            {error && (
              <div
                role="alert"
                className="w-full rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800"
              >
                {error}
              </div>
            )}
            <form className="flex flex-col gap-6 w-full" onSubmit={handleRegister}>
              <div className="flex flex-col gap-4">
                <InputComp name="nombre" labelName="Nombre" placeholder="Tu nombre" type="text" value={formData.nombre} onChange={handleChange} />
                <InputComp name="apellidos" labelName="Apellidos" placeholder="Tus apellidos" type="text" value={formData.apellidos} onChange={handleChange} />
                <InputComp name="email" labelName="Email" placeholder="Tu email" type="email" value={formData.email} onChange={handleChange} />
                <InputComp name="telefono" labelName="Teléfono" placeholder="Tu número de teléfono" type="number" value={formData.telefono} onChange={handleChange} />
                <InputComp name="username" labelName="Username" placeholder="Tu username" type="text" value={formData.username} onChange={handleChange} />
                <InputComp name="contraseña" labelName="Contraseña" placeholder="Tu contraseña" type="password" value={formData.contraseña} onChange={handleChange} />
              </div>
              <input
                type="submit"
                value={"Regístrate"}
                className="
                  mt-4 w-full py-2.5 px-4 rounded-lg font-medium text-white!
                  bg-emerald-600 hover:bg-emerald-700
                  transition-colors duration-200 text-center no-underline block"
              />
            </form>
            <p>¿Tienes cuenta?  <Link to="/login" className="underline">Inicia Sessión</Link></p>
          </div>
          <div
            className="bg-[url('/img/register.png')] bg-cover bg-center w-full h-48 sm:h-64 lg:h-full shadow-md rounded-lg"
            role="img" 
            aria-label="Imagen mujer con perro"
          ></div>

        </div>
      </div>

      </div>
    </div>
  )
}