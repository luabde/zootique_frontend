import { Link } from "react-router-dom";
import { InputComp } from "../components/input";

export default function Login() {
  return (
    <div className="relative flex justify-center items-center">
      
      <div className="w-full flex justify-center items-center mt-8">
        <div className="container shadow rounded-2xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
          <div className=" flex flex-col items-center justify-center lg:items-start gap-5 lg:max-w-5/6">
            <h2 className="text-3xl font-bold mb-8">Inicia Sessión</h2>
            <p>Ingresa tus credenciales para acceder a tu tienda de animales favorita.</p>
            <form className="flex flex-col gap-6 w-full">
              <div className="flex flex-col gap-4">
                  <InputComp labelName="Email" placeholder="Tu email" type="text" />
                  <InputComp labelName="Contraseña" placeholder="Tu contraseña" type="password" />
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