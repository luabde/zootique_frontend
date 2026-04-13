import { useState } from "react";
import { CheckoutStepper } from "../../components/checkout/CheckoutStepper";
import { CheckoutSummary } from "../../components/checkout/CheckoutSummary";
import { useCart } from "../../hook/useCart";
import { useNavigate } from "react-router-dom";
import { useCheckout } from "../../hook/useCheckout";
import { LocationIcon } from "../../components/checkout/locationIcon";
import {ContactIcon} from '../../components/checkout/contactIcon';

export function CheckoutBilling(){
    const { cart, subtotal } = useCart();
    const shipping = 0;
    const navigate = useNavigate();
    const { user, formData, addresses, shippingAddressId } = useCheckout();

    // Encontrar la dirección seleccionada
    const selectedAddress = addresses.find(addr => addr._id === shippingAddressId);

    return(
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
                    Volver al paso anterior
                  </button>
        
                  <h1 className="text-2xl font-bold text-gray-900">Checkout</h1>
                </div>
        
                {/* Stepper */}
                <CheckoutStepper currentStep={2} />

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Form */}
                    <div className="lg:col-span-2">
                        {/* Resumen de datos */}
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8 mb-6">
                            <h2 className="text-lg font-bold text-gray-800 mb-6">Resumen de tu pedido</h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                {/* Datos de contacto */}
                                <div className="bg-gray-50 rounded-xl p-4">
                                    <div className="flex items-center gap-3 mb-3">
                                        <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center">
                                            <ContactIcon></ContactIcon>
                                        </div>
                                        <h3 className="text-sm font-semibold text-gray-700">Datos de contacto</h3>
                                    </div>
                                    <div className="space-y-1 text-sm text-gray-600">
                                        <p><span className="font-medium">{formData.nombre} {formData.apellidos}</span></p>
                                        <p>{formData.email}</p>
                                        <p>{formData.telefono}</p>
                                    </div>
                                </div>

                                {/* Dirección de envío */}
                                <div className="bg-gray-50 rounded-xl p-4">
                                    <div className="flex items-center gap-3 mb-3">
                                        <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center">
                                            <LocationIcon></LocationIcon>
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

                        {/* Datos de pago */}
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8">
                            <div className="mb-6">
                                <h2 className="text-lg font-bold text-gray-800">Datos de pago</h2>
                                <p className="text-sm text-gray-400 mt-1">Introduce los datos de tu tarjeta</p>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {/* Número de tarjeta */}
                                <div className="sm:col-span-2 flex flex-col gap-1.5">
                                    <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
                                        Número de tarjeta <span className="text-red-400">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="1234 5678 9012 3456"
                                        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-800
                                                   placeholder:text-gray-300 bg-white
                                                   focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent
                                                   transition-all duration-200"
                                    />
                                </div>

                                {/* Fecha de expiración */}
                                <div className="flex flex-col gap-1.5">
                                    <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
                                        Fecha de expiración <span className="text-red-400">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="MM/AA"
                                        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-800
                                                   placeholder:text-gray-300 bg-white
                                                   focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent
                                                   transition-all duration-200"
                                    />
                                </div>

                                {/* CVV */}
                                <div className="flex flex-col gap-1.5">
                                    <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
                                        CVV <span className="text-red-400">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="123"
                                        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-800
                                                   placeholder:text-gray-300 bg-white
                                                   focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent
                                                   transition-all duration-200"
                                    />
                                </div>

                                {/* Nombre en la tarjeta */}
                                <div className="sm:col-span-2 flex flex-col gap-1.5">
                                    <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
                                        Nombre en la tarjeta <span className="text-red-400">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Como aparece en la tarjeta"
                                        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-800
                                                   placeholder:text-gray-300 bg-white
                                                   focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent
                                                   transition-all duration-200"
                                    />
                                </div>
                            </div>

                            {/* CTA */}
                            <div className="mt-8 flex justify-end">
                                <button
                                onClick={() => navigate("/checkout/complete")}
                                    className="flex items-center gap-2 py-3 px-8 rounded-xl
                                               bg-emerald-600 hover:bg-emerald-700 active:scale-95
                                               text-white font-semibold text-sm
                                               shadow-sm shadow-emerald-200
                                               transition-all duration-200"
                                >
                                    Pagar
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </button>
                            </div>
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