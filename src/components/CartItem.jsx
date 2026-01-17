export function CartItem({ prod, addToCart, decrementQuantity, removeFromCart }) {
    return (
        <div className="flex flex-col md:flex-row max-w-full gap-4 md:gap-6 
                justify-center items-start md:items-center 
                border-b border-gray-200 p-6">
            <div className="bg-gray-100 p-4 rounded w-60 h-60 flex justify-center items-center">
                <img
                    src={prod.url}
                    className="h-40"
                />
            </div>

            <div className="flex flex-col md:flex-row justify-between w-full gap-6">

                <div className="flex flex-col gap-4 flex-1">
                    <div className="flex flex-col gap-1.5">
                        <h3 className="text-lg font-semibold text-gray-800">
                            {prod.nombre}
                        </h3>

                        <span className="w-fit px-3 py-1 bg-green-100 text-gray-600 
                                        text-xs font-medium uppercase rounded">
                            {prod.tipo}
                        </span>
                    </div>

                    <p className="text-gray-600 max-w-2xl text-sm leading-relaxed">
                        {prod.descr}
                    </p>

                    <div className="flex items-center gap-6 mt-2">
                        <div className="flex items-center gap-1">
                            <button
                                className="w-8 h-8 flex justify-center items-center 
                                         bg-gray-100 text-gray-700 
                                         rounded-md font-bold text-lg 
                                         hover:bg-gray-200 transition-colors duration-300"
                                onClick={() => decrementQuantity(prod)}
                            >
                                −
                            </button>

                            <p className="text-md font-semibold text-gray-700 w-6 text-center">
                                {prod.cantidad}
                            </p>

                            <button
                                className="w-8 h-8 flex justify-center items-center 
                                         bg-gray-100 text-gray-700 
                                         rounded-md font-bold text-lg 
                                         hover:bg-gray-200 transition-colors duration-300"
                                onClick={() => addToCart(prod)}
                            >
                                +
                            </button>
                        </div>

                        <div className="flex gap-3 pl-4 border-l border-gray-200">
                            <svg xmlns="http://www.w3.org/2000/svg" height="22px" viewBox="0 -960 960 960" width="22px" fill="#666666"><path d="m480-144-50-45q-100-89-165-152.5t-102.5-113Q125-504 110.5-545T96-629q0-89 61-150t150-61q49 0 95 21t78 59q32-38 78-59t95-21q89 0 150 61t61 150q0 43-14 83t-51.5 89q-37.5 49-103 113.5T528-187l-48 43Zm0-97q93-83 153-141.5t95.5-102Q764-528 778-562t14-67q0-59-40-99t-99-40q-35 0-65.5 14.5T535-713l-35 41h-40l-35-41q-22-26-53.5-40.5T307-768q-59 0-99 40t-40 99q0 33 13 65.5t47.5 75.5q34.5 43 95 102T480-241Zm0-264Z" /></svg>

                            <button onClick={() => removeFromCart(prod)} title="Eliminar del carrito" className="hover:scale-110 transition-transform duration-200">
                                <svg xmlns="http://www.w3.org/2000/svg" height="22px" viewBox="0 -960 960 960" width="22px" fill="#666666"><path d="M312-144q-29.7 0-50.85-21.15Q240-186.3 240-216v-480h-48v-72h192v-48h192v48h192v72h-48v479.57Q720-186 698.85-165T648-144H312Zm336-552H312v480h336v-480ZM384-288h72v-336h-72v336Zm120 0h72v-336h-72v336ZM312-696v480-480Z" /></svg>
                            </button>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col items-start md:items-end gap-4 min-w-[130px] pt-1">
                    <div className="flex flex-col items-start md:items-end">
                        <span className="text-xs text-gray-400">Unitario</span>
                        <p className="text-gray-600 font-semibold">
                            ${Number(prod.precio).toFixed(2)}
                        </p>
                    </div>

                    <div className="flex flex-col items-start md:items-end">
                        <span className="text-xs text-gray-500 font-bold tracking-wide">Total</span>
                        <p className="text-emerald-700 text-xl font-bold">
                            ${(Number(prod.precio) * Number(prod.cantidad)).toFixed(2)}
                        </p>
                    </div>
                </div>
            </div>
        </div>

    )
}