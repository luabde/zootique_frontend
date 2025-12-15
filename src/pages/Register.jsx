import { Link } from "react-router-dom";
import { InputComp } from "../components/input";

export default function Register() {
  return (
    <div className="relative flex justify-center items-center">
      
      <div className="w-full flex justify-center items-center mt-8">
        <div className="container shadow rounded-2xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
          <div className=" flex flex-col items-center justify-center lg:items-start gap-5 lg:max-w-5/6">
            <h2 className="text-3xl font-bold mb-8">Registrate</h2>
            <p>Ingresa tus credenciales para acceder a tu tienda de animales favorita.</p>
            <form className="flex flex-col gap-6 w-full">
              <div className="flex flex-col gap-4">
                <InputComp labelName="Nombre" placeholder="Tu nombre" type="text" />
                <InputComp labelName="Apellidos" placeholder="Tus apellidos" type="text" />
                <InputComp labelName="Email" placeholder="Tu email" type="email" />
                <InputComp labelName="Teléfono" placeholder="Tu número de teléfono" type="number" />
                <InputComp labelName="Contraseña" placeholder="Tu contraseña" type="password" />
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