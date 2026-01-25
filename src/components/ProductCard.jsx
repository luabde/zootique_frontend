import { useCart } from '../hook/useCart'
import { AddCart } from './AddCartItem';
import { RemoveCart } from './RemoveCartItem';

export function ProductCard({ id, nombre, descr, precio, stock, tipo, url }) {

  // Llamamos al hook para poder usar el contexto del Cart
  const { addToCart, cart, removeFromCart } = useCart()

  const producto = {
    id,
    nombre,
    descr,
    precio,
    stock,
    tipo,
    url
  };

  // Función para saber si un producto esta o no en el carrito para saber el icono de carrito que poner
  const getProductInCart = id => {
    // Devuelve el producto si esta en el carrito, sino undefined
    return cart.find(prod => prod.id === id);
  }
  const itemInCart = getProductInCart(id);
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
            Stock: {stock}
          </span>
        </div>
        <div className="mt-4 flex items-center justify-between gap-2">
          <button
            type="button"
            className="flex-1 py-2.5 px-4 rounded-lg font-medium text-white
                bg-emerald-600 hover:bg-emerald-700
                transition-colors duration-200"
          >
            Ver más
          </button>

          {/* Condicional para que dependiendo de si el producto esta en el carrito o no se muestre el icono para añadir o eliminar en la card del producto */}
          {
            // Funcion para saber si el producto esta dentro del carrito
            itemInCart
              ?
              <button
                type="button"
                onClick={() => removeFromCart(itemInCart)}
                className="p-2 text-shadow-black rounded-lg 
                 hover:scale-110
                transition-all duration-200"
                title="Quitar del carrito"
              >
                <RemoveCart />
              </button>
              :
              <button
                type="button"
                onClick={() => addToCart(producto)}
                className="p-2 text-shadow-black rounded-lg 
                  hover:scale-110
                  transition-all duration-200"
                title="Añadir al carrito"
              >
                <AddCart />
              </button>
          }
        </div>
      </div>
    </div>
  );
}