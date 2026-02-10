import { useEffect, useState } from "react"

export default function Filters({ mostrarFiltros, setMostrarFiltros, filtros, setFiltros }) {
    const [maxPrice, setMaxPrice] = useState(filtros.precioMaximo);
    const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("Todas las categorías");

    useEffect(() => {
        setMaxPrice(filtros.precioMaximo);
        setCategoriaSeleccionada(filtros.tipo === 'todas' ? 'Todas las categorías' : filtros.tipo);
    }, [filtros]);

    const handleChangeMaxPrice = (event) => {
        setMaxPrice(event.target.value);

        setFiltros(prevFiltros => ({
            // Cusando pones ({}) devuelves el objeto directamente, si solopones {} tienees que poner return
            ...prevFiltros,
            precioMaximo: event.target.value
        }));
    }

    const setCategoria = (categoria) => {
        setCategoriaSeleccionada(categoria);

        // Para establecer el nuevo filtro se usa la categoria directamente en vede categoriaSeleccionada, porque
        // categoriaSeleccionada al estar en la mismoa funcion tiene el valor antiguo hasta que se finaliza esta
        setFiltros(prevFiltros => ({
            ...prevFiltros,
            tipo: categoria === 'Todas las categorías' ? 'todas' : categoria
        }));
    }

    return (
        <>
            <aside className={`
                    ${mostrarFiltros ? 'block' : 'hidden'} 
                    lg:block 
                    bg-white shadow rounded-xl p-4 lg:p-5 
                    lg:sticky lg:top-28 lg:h-[calc(100vh-8rem)] 
                    col-span-1
                    mb-4 lg:mb-0
                `}>
                <div className="flex-col justify-between items-center lg:block mb-4">
                    <h2 className="text-base lg:text-lg font-semibold mb-4">Filtrar por categoría</h2>
                    <div className="flex flex-col gap-2 lg:gap-3 mb-6">
                        {['Todas las categorías', 'Alimento', 'Accesorio', 'Higiene y cuidado', 'Salud', 'Juguete', 'Hábitat', 'Servicios'].map((categoria) => (
                            <button
                                key={categoria}
                                onClick={() => setCategoria(categoria)}
                                className={`lg:w-auto w-fit text-left px-1 py-2 rounded-lg text-sm transition ${categoriaSeleccionada === categoria
                                        ? 'border-b-2 border-amber-300 rounded-b-none text-gray-700 font-medium'
                                        : 'text-gray-700 hover:bg-gray-100'
                                    }`}
                            >
                                {categoria}
                            </button>
                        ))}
                    </div>

                </div>

                <div className="flex-col justify-start items-center lg:block mb-4">
                    <h2 className="text-base lg:text-lg font-semibold mb-4">Filtrar por precio</h2>
                    <input onChange={handleChangeMaxPrice} className="w-full h-2 rounded-lg cursor-pointer appearance-none bg-gray-200 accent-amber-300"
                        value={maxPrice}
                        type="range"
                        min='0'
                        max='200'
                    />
                    <span>{maxPrice}€</span>
                </div>

                <button
                    onClick={() => setMostrarFiltros(false)}
                    className="lg:hidden flex-1 py-2.5 px-4 rounded-lg font-medium text-white
                        bg-emerald-600 hover:bg-emerald-700
                        transition-colors duration-200 mt-8"
                >
                    Aplicar filtros
                </button>
            </aside>
        </>
    )
}