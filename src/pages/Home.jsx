import { useState, useEffect } from 'react'
import { ProductCard } from '../components/ProductCard'

export default function Home() {
  const [productos, setProductos] = useState([]);

  useEffect(() =>{
    // UseEffect, se ejecuta cuando se carga la pagina

    // Funcion para hacer el fetch a la bd
    const cargarProductos = async () =>{
      try{
        const res = await fetch('http://localhost:3000/api/products');
        const data = await res.json();
        
        const prodsFormateados = data.data.map(prod =>{
          return{
            id: prod._id,
            nombre: prod.nombre,
            descr: prod.descripcion,
            precio: prod.precio.toString(),
            tipo: prod.tipo,
            stock: prod.stock.toString(),
            url: prod.url
          };
        });

        setProductos(prodsFormateados);
      }catch(err){
        console.error("Error al cargar los productos: ", err);
      }
    }

    cargarProductos();

  }, []);

  
   return(
    <>
      <div className="w-full">
        <div className="max-w-7xl mx-auto lg:p-4 md:p-3 p-1">
          <h2 className='text-center text-4xl font-bold mb-8'>Productos Destacados</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
            {productos.map(producto => (
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
    </>
  )
}