// CheckoutInfo.jsx — Paso 1: Datos personales y dirección de envío

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../hook/useCart";
import { CheckoutStepper } from "../../components/checkout/CheckoutStepper";
import { CheckoutSummary } from "../../components/checkout/CheckoutSummary";
import { AddressForm } from "../../components/checkout/AddressForm";
import { useCheckout } from "../../hook/useCheckout";

export default function CheckoutInfo() {
  const {user, addresses, createNewAddress, selectAddress, shippingAddressId, formData, setFormData} = useCheckout();
  const navigate = useNavigate();
  const { cart, subtotal } = useCart();

  const shipping = 0;

  const [errors, setErrors] = useState({});

  const validate = () => {
    const required = ["nombre", "apellidos", "email", "telefono", "direccionElegida"];
    const newErrors = {};
    required.forEach(field => {
      if (!String(formData[field] || '').trim()) newErrors[field] = true;
    });
    // Validación básica email
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = true;
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;

    navigate("/checkout/billing");
  };

  const hasErrors = Object.keys(errors).length > 0;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-10 lg:px-8">

        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate("/cart")}
            className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-800 transition-colors duration-200 mb-6"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Volver al carrito
          </button>

          <h1 className="text-2xl font-bold text-gray-900">Checkout</h1>
        </div>

        {/* Stepper */}
        <CheckoutStepper currentStep={1} />

        {/* Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8">

              <div className="mb-6">
                <h2 className="text-lg font-bold text-gray-800">Datos de contacto</h2>
                <p className="text-sm text-gray-400 mt-1">Te enviaremos la confirmación del pedido</p>
              </div>

              {/* Alerta de errores */}
              {hasErrors && (
                <div className="mb-6 flex items-center gap-3 p-4 bg-red-50 border border-red-100 rounded-xl">
                  <svg className="w-4 h-4 text-red-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="text-sm text-red-600">Por favor, completa todos los campos obligatorios.</p>
                </div>
              )}
              <AddressForm
                addresses={addresses}
                data={formData}
                onChange={setFormData}
                showEmail={true}
                showPhone={true}
                createNewAddress={createNewAddress}
                onSelectAddress={selectAddress}
                shippingAddressId={shippingAddressId}
              />

              {/* CTA */}
              <div className="mt-8 flex justify-end">
                <button
                  onClick={handleSubmit}
                  className="flex items-center gap-2 py-3 px-8 rounded-xl
                             bg-emerald-600 hover:bg-emerald-700 active:scale-95
                             text-white font-semibold text-sm
                             shadow-sm shadow-emerald-200
                             transition-all duration-200"
                >
                  Continuar a facturación
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