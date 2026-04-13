
import { CartItem } from "../components/CartItem";
import { useCart } from "../hook/useCart";
import { ClearCartIcon } from "../components/clearCartIcon";
import { Link } from "react-router-dom";

export default function Cart() {

  const { cart, clearCart, addToCart, decrementQuantity, removeFromCart, subtotal } = useCart()

  const shipping = 0
  const discount = 0
  const total = subtotal - discount + shipping

  return (
    <div className="max-w-7xl mx-auto p-4 lg:p-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-sm">
            <div className="bg-gray-50 px-6 py-3 border-b border-gray-200 sticky top-0">
              <div className="flex items-center justify-between ">
                <span className="font-semibold text-gray-700">Producto</span>
                <span className="font-semibold text-gray-700">Total</span>
              </div>
            </div>

            <div className="flex flex-col gap-3.5 pt-3.5">
              {cart.length === 0 ? (
                <div className="py-12 text-center">
                  <p className="text-gray-500 text-lg">Tu carrito está vacío</p>
                  <a
                    href="/"
                    className="mt-4 inline-block text-emerald-600 hover:text-emerald-700 font-medium"
                  >
                    Ir a la tienda
                  </a>
                </div>
              ) : (
                cart.length > 0 && (
                  cart.map(item => {
                    return (
                      <CartItem
                        key={item.id}
                        prod={item}
                        addToCart={addToCart}
                        decrementQuantity={decrementQuantity}
                        removeFromCart={removeFromCart}
                      />
                    )
                  })
                )
              )}

            </div>
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-sm p-6 sticky top-4">
            <h2 className="text-xl font-bold mb-6">Resumen del Pedido</h2>

            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span className="font-medium">${Number(subtotal).toFixed(2)}</span>
              </div>

              <div className="flex justify-between text-gray-600">
                <span>Envío</span>
                <span className="font-medium">${shipping.toFixed(2)}</span>
              </div>

              <div className="flex justify-between text-gray-600">
                <span>Descuento</span>
                <span className="font-medium text-green-600">-$0.00</span>
              </div>

              <div className="pb-3.5 border-b border-gray-200 pt-3 mt-3">
                <div className="flex justify-between text-lg">
                  <span className="font-bold">Total</span>
                  <span className="font-bold">${total.toFixed(2)}</span>
                </div>
              </div>
            </div>

            <Link to={"/checkout"} className="mt-4 w-full py-2.5 px-4 rounded-lg font-medium   text-white bg-emerald-600 hover:bg-emerald-700 transition-colors duration-200 text-center no-underline block">
              Pagar
            </Link>
          </div>
        </div>

      </div>

      {/* En el caso de que no haya items en el carrito no mostrara volver a la tienda aobajo, no el icono para vaciar el carrito */}
      {cart.length > 0 &&
        <div className="mt-6">
          <a
            href="/"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 font-medium"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Volver a la tienda
          </a>

          <button className="p-2 text-shadow-black rounded-lg
                hover:scale-110
                transition-all duration-200" onClick={clearCart} title="Vaciar carrito">
            <ClearCartIcon />
          </button>
        </div>
      }

    </div>
  );

}