import { useState, useEffect } from "react"
import { ProductCard } from "../components/ProductCard";
import Filters from '../components/Filters';

export default function AllProducts() {
    const [productos, setProductos] = useState([]);
    const [mostrarFiltros, setMostrarFiltros] = useState(false);
    const [contador, setContador] = useState(0);
    const [filtros, setFiltros] = useState({
        tipo: "todas",
        precioMaximo: 200
    }

    )

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "instant" });
    }, []);


    useEffect(() => {
        const cargarProductos = async () => {
            try {
                const res = await fetch('http://localhost:3000/api/products');
                const data = await res.json();

                const prodsFormateados = data.data.map(prod => {
                    return {
                        id: prod._id,
                        nombre: prod.nombre,
                        descr: prod.descripcion,
                        precio: Number(prod.precio),
                        tipo: prod.tipo,
                        stock: prod.stock.toString(),
                        url: prod.url
                    };
                });

                setProductos(prodsFormateados);
                setContador(prodsFormateados.length);
            } catch (err) {
                console.error("Error al cargar los productos: ", err);
            }
        };

        cargarProductos();
    }, []);

    const filterProducts = (productos) => {
        return productos.filter(producto => {
            return (
                producto.precio <= filtros.precioMaximo &&
                (filtros.tipo === "todas" || producto.tipo === filtros.tipo)
            );
        });
    };

    const filteredProducts = filterProducts(productos);

    return (
        <>
            <div className="max-w-7xl mx-auto lg:p-4 md:p-3 p-2 mb-8">

                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 px-2 sticky top-0 z-30 bg-white py-4 lg:border-0">
                    <div className="flex items-center gap-3 w-full sm:w-auto">
                        <button
                            onClick={() => setMostrarFiltros(!mostrarFiltros)}
                            className="lg:hidden pl-0 pt-2 pr-2 pb-2 rounded-lg hover:bg-gray-100 transition"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M3 6h18M6 12h12M10 18h4" />
                            </svg>
                        </button>

                        <h2 className='text-2xl sm:text-3xl lg:text-4xl font-bold'>
                            Productos <span className="text-lg sm:text-xl lg:text-2xl font-normal text-gray-500">({contador})</span>
                        </h2>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 lg:gap-6 mt-4 lg:mt-6">
                    <Filters mostrarFiltros={mostrarFiltros} setMostrarFiltros={setMostrarFiltros} filtros={filtros} setFiltros={setFiltros}></Filters>

                    {/* Contenedor de productos */}
                    <div className="col-span-1 lg:col-span-3">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 justify-items-center">
                            {
                                filteredProducts.length === 0
                                    ? (
                                        <div className="col-span-full flex flex-col items-center justify-center py-20 px-4">
                                            <h3 className="text-2xl font-bold text-gray-800 mb-2">
                                                No encontramos productos
                                            </h3>
                                            <p className="text-gray-500 mb-6 text-center max-w-md">
                                                Intenta ajustar los filtros o explora otras categorías
                                            </p>
                                            <button
                                                onClick={() => {
                                                    setFiltros({ tipo: "todas", precioMaximo: 200 });
                                                }}
                                                className="px-6 py-3 text-white rounded-lg  bg-emerald-600 hover:bg-emerald-700 transition-all hover:scale-105 shadow-md"
                                            >
                                                Restablecer filtros
                                            </button>
                                        </div>
                                    )
                                    : filteredProducts.map(producto => (
                                        <ProductCard
                                            key={producto.id}
                                            id={producto.id}
                                            nombre={producto.nombre}
                                            descr={producto.descr}
                                            precio={producto.precio}
                                            tipo={producto.tipo}
                                            stock={producto.stock}
                                            url={producto.url}
                                        />
                                    ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}