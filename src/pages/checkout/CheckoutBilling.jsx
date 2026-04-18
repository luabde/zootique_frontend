import { CheckoutStepper } from "../../components/checkout/CheckoutStepper";
import { CheckoutSummary } from "../../components/checkout/CheckoutSummary";
import { useCart } from "../../hook/useCart";
import { useNavigate } from "react-router-dom";
import { useCheckout } from "../../hook/useCheckout";
import { LocationIcon } from "../../components/checkout/locationIcon";
import { ContactIcon } from "../../components/checkout/contactIcon";

export function CheckoutBilling() {
    const { cart, subtotal } = useCart();
    const shipping = 0;
    const navigate = useNavigate();
    const { formData, addresses, shippingAddressId } = useCheckout();

    const selectedAddress = addresses.find(addr => addr._id === shippingAddressId);

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-6xl mx-auto px-4 py-10 lg:px-8">

                {/* Header */}
                <div className="mb-8">
                    <button
                        onClick={() => navigate("/checkout")}
                        className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-800 transition-colors duration-200 mb-6"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        Volver a datos de envío
                    </button>
                    <h1 className="text-2xl font-bold text-gray-900">Resumen del pedido</h1>
                </div>

                {/* Stepper */}
                <CheckoutStepper currentStep={2} />

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-6">

                        {/* Datos de contacto y dirección */}
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8">
                            <h2 className="text-lg font-bold text-gray-800 mb-5">Datos de envío</h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

                                {/* Contacto */}
                                <div className="bg-gray-50 rounded-xl p-4">
                                    <div className="flex items-center gap-3 mb-3">
                                        <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center">
                                            <ContactIcon />
                                        </div>
                                        <h3 className="text-sm font-semibold text-gray-700">Datos de contacto</h3>
                                    </div>
                                    <div className="space-y-1 text-sm text-gray-600">
                                        <p className="font-medium">{formData.nombre} {formData.apellidos}</p>
                                        <p>{formData.email}</p>
                                        <p>{formData.telefono}</p>
                                    </div>
                                </div>

                                {/* Dirección */}
                                <div className="bg-gray-50 rounded-xl p-4">
                                    <div className="flex items-center gap-3 mb-3">
                                        <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center">
                                            <LocationIcon />
                                        </div>
                                        <h3 className="text-sm font-semibold text-gray-700">Dirección de envío</h3>
                                    </div>
                                    {selectedAddress ? (
                                        <div className="text-sm text-gray-600 space-y-1">
                                            <p className="font-medium">{selectedAddress.calle}{selectedAddress.numero_piso && `, ${selectedAddress.numero_piso}`}</p>
                                            <p>{selectedAddress.codigo_postal} {selectedAddress.ciudad}</p>
                                            <p>{selectedAddress.provincia}, {selectedAddress.pais}</p>
                                        </div>
                                    ) : (
                                        <p className="text-sm text-gray-500 italic">No se ha seleccionado dirección</p>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* CTA */}
                        <div className="flex justify-end">
                            <button
                                onClick={() => navigate("/checkout/complete")}
                                className="flex items-center gap-2 py-3 px-8 rounded-xl
                                           bg-emerald-600 hover:bg-emerald-700 active:scale-95
                                           text-white font-semibold text-sm
                                           shadow-sm shadow-emerald-200
                                           transition-all duration-200"
                            >
                                Continuar al pago
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </button>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="lg:col-span-1">
                        <CheckoutSummary cart={cart} subtotal={subtotal} shipping={shipping} />
                    </div>
                </div>
            </div>
        </div>
    );
}
