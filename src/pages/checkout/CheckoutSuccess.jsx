import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCheckout } from "../../hook/useCheckout";
import { useCart } from "../../hook/useCart";

export function CheckoutSuccess() {
  const navigate = useNavigate();
  const { orderId } = useCheckout();
  const { clearCart } = useCart();

  useEffect(() => {
    // Vaciamos el carrito cuando se paga el pedido
    clearCart();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-xl border border-gray-100 p-8 text-center animate-in fade-in zoom-in duration-500">
        <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-10 h-10 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Pago completado</h2>
        <p className="text-gray-500 mb-6">
          {orderId
            ? <>Tu pedido <span className="font-semibold text-gray-800">#{orderId.slice(-8).toUpperCase()}</span> se ha pagado correctamente.</>
            : "Tu pago se ha procesado correctamente."}
        </p>
        <button
          onClick={() => navigate("/")}
          className="w-full py-3 px-6 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl transition-all duration-200 shadow-lg shadow-emerald-100"
        >
          Volver a la tienda
        </button>
      </div>
    </div>
  );
}
