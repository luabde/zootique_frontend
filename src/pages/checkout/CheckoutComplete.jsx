import { useNavigate } from "react-router-dom";
import { useCart } from "../../hook/useCart";
import { useCheckout } from "../../hook/useCheckout";
import { CheckoutStepper } from "../../components/checkout/CheckoutStepper";
import { CheckoutSummary } from "../../components/checkout/CheckoutSummary";
import { ContactIcon } from "../../components/checkout/contactIcon";
import { LocationIcon } from "../../components/checkout/locationIcon";

export function CheckoutComplete() {
  const navigate = useNavigate();
  const { cart, subtotal, clearCart } = useCart();
  const { user, formData, addresses, shippingAddressId, orderId, createOrder } = useCheckout();
  
  const shipping = cart.length > 0 ? 5.99 : 0;
  const total = subtotal + shipping;

  // Encontrar la dirección seleccionada para mostrar en el resumen
  const selectedAddress = addresses.find(addr => addr._id === shippingAddressId);

  const handleConfirmOrder = async () => {
    const orderData = {
      product_data: cart.map(item => ({
        id: item.id,
        cantidad: item.cantidad,
        precio_unitario: item.precio
      })),
      direction_id: shippingAddressId,
      total_pedido: total,
      estado: "preparacion",
      fecha_fin: new Date().toISOString()
    };

    const success = await createOrder(orderData);
    if (success) {
        await clearCart(); 
    }
  };

  // Si ya se ha realizado el pedido con éxito
  if (orderId) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white rounded-3xl shadow-xl border border-gray-100 p-8 text-center animate-in fade-in zoom-in duration-500">
          <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">¡Pedido Realizado!</h2>
          <p className="text-gray-500 mb-6">
            Gracias por tu compra. Tu pedido <span className="font-semibold text-gray-800">#{orderId.slice(-8).toUpperCase()}</span> ha sido procesado correctamente.
          </p>
          <div className="space-y-3">
            <button
              onClick={() => navigate("/")}
              className="w-full py-3 px-6 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl transition-all duration-200 shadow-lg shadow-emerald-100"
            >
              Volver a la tienda
            </button>
          </div>
        </div>
      </div>
    );
  }

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
            Volver al pago
          </button>
          <h1 className="text-2xl font-bold text-gray-900">Resumen y Confirmación</h1>
        </div>

        {/* Stepper */}
        <CheckoutStepper currentStep={3} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            {/* Tarjeta Informativa de Resumen */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8">
              <h2 className="text-lg font-bold text-gray-800 mb-6">Revisa tus datos</h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                {/* Contacto */}
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center">
                      <ContactIcon />
                    </div>
                    <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wider">Contacto</h3>
                  </div>
                  <div className="space-y-1 text-sm text-gray-600 bg-gray-50 p-4 rounded-xl">
                    <p className="font-bold text-gray-800">{formData.nombre} {formData.apellidos}</p>
                    <p>{formData.email}</p>
                    <p>{formData.telefono}</p>
                  </div>
                </div>

                {/* Envío */}
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center">
                      <LocationIcon />
                    </div>
                    <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wider">Dirección de Envío</h3>
                  </div>
                  <div className="space-y-1 text-sm text-gray-600 bg-gray-50 p-4 rounded-xl">
                    {selectedAddress ? (
                      <>
                        <p className="font-bold text-gray-800">{selectedAddress.calle}, {selectedAddress.numero_piso}</p>
                        <p>{selectedAddress.codigo_postal} {selectedAddress.ciudad}</p>
                        <p>{selectedAddress.provincia}, {selectedAddress.pais}</p>
                      </>
                    ) : (
                      <p className="italic">Sin dirección seleccionada</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Botón de Acción Final */}
              <div className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-gray-100">
                <p className="text-xs text-gray-400 max-w-xs text-center sm:text-left">
                  Al hacer clic en "Confirmar y Pagar", aceptas nuestros términos y condiciones y procederemos a procesar tu pedido.
                </p>
                <button
                  onClick={handleConfirmOrder}
                  disabled={cart.length === 0}
                  className="w-full sm:w-auto flex items-center justify-center gap-3 py-4 px-10 rounded-xl
                             font-bold text-sm transition-all duration-300
                             bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg shadow-emerald-200 active:scale-[0.98]"
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