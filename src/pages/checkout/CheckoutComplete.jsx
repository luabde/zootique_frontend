import { useNavigate } from "react-router-dom";
import { useCart } from "../../hook/useCart";
import { useCheckout } from "../../hook/useCheckout";
import { CheckoutStepper } from "../../components/checkout/CheckoutStepper";
import { CheckoutSummary } from "../../components/checkout/CheckoutSummary";

export function CheckoutComplete() {
  const navigate = useNavigate();
  const { cart, subtotal } = useCart();
  const { shippingAddressId, createOrder } = useCheckout();

  const shipping = 0;
  const total = subtotal + shipping;

  const handleConfirmOrder = async () => {
    const orderData = {
      product_data: cart.map(item => ({
        id: item.id,
        cantidad: item.cantidad,
        precio_unitario: item.precio
      })),
      direction_id: shippingAddressId,
      total_pedido: total,
      estado: "pendiente",
      fecha_fin: new Date().toISOString()
    };

    // Creamos un array de productos para pasarlo a stripe mas adelante en el backend
    const stripeProducts = cart.map(item => ({
      name: item.nombre,
      price: Number(item.precio),
      quantity: Number(item.cantidad),
    }));

    const sessionUrl = await createOrder(orderData, stripeProducts);
    if (!sessionUrl) return;

    // Usar redireccion en vede redirectToCheckout, ya que en la nueva version de stripe no se puede usar
    window.location.href = sessionUrl;
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="max-w-6xl mx-auto px-4 py-10 lg:px-8">

        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate("/checkout/billing")}
            className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-800 transition-colors duration-200 mb-6"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Volver al resumen
          </button>
          <h1 className="text-2xl font-bold text-gray-900">Pago</h1>
        </div>

        {/* Stepper */}
        <CheckoutStepper currentStep={3} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8">

              {/* Icono + mensaje */}
              <div className="flex flex-col items-center text-center py-6">
                <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-8 h-8 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                      d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                  </svg>
                </div>
                <h2 className="text-lg font-bold text-gray-800 mb-1">Listo para pagar</h2>
                <p className="text-sm text-gray-500 max-w-sm">
                  Serás redirigido a la pasarela de pago segura de Stripe para completar la compra.
                </p>
              </div>

              {/* Total destacado */}
              <div className="bg-gray-50 rounded-xl p-4 flex items-center justify-between mb-8">
                <span className="text-sm font-semibold text-gray-600">Total a pagar</span>
                <span className="text-2xl font-bold text-gray-900">{Number(total).toFixed(2)}€</span>
              </div>

              {/* Botón de pago */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-gray-100">
                <p className="text-xs text-gray-400 max-w-xs text-center sm:text-left">
                  Al confirmar aceptas nuestros términos y condiciones. No se guardará ningún dato de tu tarjeta.
                </p>
                <button
                  onClick={handleConfirmOrder}
                  disabled={cart.length === 0}
                  className="w-full sm:w-auto flex items-center justify-center gap-3 py-4 px-10 rounded-xl
                             font-bold text-sm transition-all duration-300
                             bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg shadow-emerald-200
                             active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Confirmar y Pagar
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <CheckoutSummary cart={cart} subtotal={subtotal} shipping={shipping} />
          </div>
        </div>
      </div>
    </div>
  );
}
