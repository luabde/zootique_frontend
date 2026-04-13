// Sidebar reutilizable en todos los pasos del checkout

export function CheckoutSummary({ cart = [], subtotal = 0, shipping = 0, discount = 0 }) {
  const total = subtotal + shipping - discount;

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden sticky top-6">
      {/* Header */}
      <div className="bg-gray-50 px-6 py-4 border-b border-gray-100">
        <h2 className="text-base font-bold text-gray-800 tracking-tight">Resumen del pedido</h2>
        <p className="text-xs text-gray-500 mt-0.5">
          {cart.reduce((acc, item) => acc + item.cantidad, 0)} producto(s)
        </p>
      </div>

      {/* Items */}
      <div className="px-6 py-4 max-h-64 overflow-y-auto space-y-3">
        {cart.length === 0 ? (
          <p className="text-sm text-gray-400 text-center py-4">El carrito está vacío</p>
        ) : (
          cart.map(item => (
            <div key={item.id} className="flex items-center gap-3">
              {/* Thumbnail */}
              <div className="w-12 h-12 bg-gray-50 rounded-lg flex items-center justify-center flex-shrink-0 border border-gray-100">
                <img src={item.url} alt={item.nombre} className="w-9 h-9 object-contain" />
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-800 truncate">{item.nombre}</p>
                <p className="text-xs text-gray-400">x{item.cantidad}</p>
              </div>

              {/* Price */}
              <span className="text-sm font-semibold text-gray-700 flex-shrink-0">
                ${Number(item.precioTotalItem).toFixed(2)}
              </span>
            </div>
          ))
        )}
      </div>

      {/* Divider */}
      <div className="border-t border-dashed border-gray-200 mx-6" />

      {/* Totals */}
      <div className="px-6 py-4 space-y-2.5">
        <div className="flex justify-between text-sm text-gray-500">
          <span>Subtotal</span>
          <span className="font-medium text-gray-700">${Number(subtotal).toFixed(2)}</span>
        </div>

        <div className="flex justify-between text-sm text-gray-500">
          <span>Envío</span>
          <span className="font-medium text-gray-700">${shipping.toFixed(2)}</span>
        </div>

        {discount > 0 && (
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Descuento</span>
            <span className="font-medium text-emerald-600">-${discount.toFixed(2)}</span>
          </div>
        )}

        <div className="pt-3 border-t border-gray-100 flex justify-between items-center">
          <span className="text-base font-bold text-gray-800">Total</span>
          <span className="text-xl font-bold text-gray-900">${total.toFixed(2)}</span>
        </div>
      </div>

      {/* Secure badge */}
      <div className="px-6 pb-5">
        <div className="flex items-center justify-center gap-2 py-2.5 px-3 bg-gray-50 rounded-lg">
          <svg className="w-3.5 h-3.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
          <span className="text-xs text-gray-400 font-medium">Pago 100% seguro</span>
        </div>
      </div>
    </div>
  );
}