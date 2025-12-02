export function ProductCard({ nombre, descr, precio, stock, tipo, url}) {

  return (
    <div className="flex flex-col bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden w-full max-w-xs sm:max-w-sm">
      <div className="bg-gray-50 h-60 flex items-center justify-center">
        <img
          src={url}
          alt={nombre}
          className="h-40"
        />
      </div>

      <div className="p-4 flex flex-col">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-lg font-semibold text-gray-800 h-16">{nombre}</h3>
          <span className="p-2 bg-gray-100 text-gray-600 text-xs font-medium uppercase rounded">
            {tipo}
          </span>
        </div>

        <p className="mt-2 text-gray-600 text-sm h-12 flex items-center">{descr}</p>

        <div className="mt-3 flex items-center justify-between">
          <span className="text-lg font-bold text-gray-900">
            ${precio}
          </span>
          <span className={`text-sm font-medium text-green-600`}>
            Stock: ${stock}
          </span>
        </div>
            <a
                href="#"
                className="mt-4 w-full py-2.5 px-4 rounded-lg font-medium text-white!
                    bg-emerald-600 hover:bg-emerald-700
                    transition-colors duration-200 text-center no-underline block"
            >
            Comprar
            </a>
      </div>
    </div>
  );
}