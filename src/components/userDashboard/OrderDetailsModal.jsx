export default function OrderDetailsModal({ order, addresses, onClose }) {
  if (!order) return null;

  const address = addresses?.find((dir) => dir._id === order.direccion_envio_id);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="bg-white rounded-[32px] shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col animate-in zoom-in-95 duration-300">
        <div className="p-6 sm:p-8 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
          <div>
            <h3 className="text-xl font-black text-gray-900 tracking-tight">Detalles del Pedido</h3>
            <p className="text-xs font-bold text-emerald-600 uppercase tracking-widest mt-1">#{order._id.slice(-8)}</p>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-white border border-gray-100 flex items-center justify-center text-gray-400 hover:text-gray-600 hover:rotate-90 transition-all duration-300 shadow-sm"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-8">
          <div className="space-y-4">
            <h4 className="text-xs font-black text-gray-400 uppercase tracking-[0.2em]">Productos</h4>
            <div className="space-y-3">
              {order.items?.map((item, idx) => (
                <div key={idx} className="flex justify-between items-center bg-gray-50/50 p-4 rounded-2xl border border-gray-100/50">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-white border border-gray-100 flex items-center justify-center text-emerald-600 font-bold shadow-sm">
                      {item.cantidad}x
                    </div>
                    <div>
                      <p className="text-sm font-bold text-gray-900">{item.nombre}</p>
                      <p className="text-xs text-gray-500 font-medium">Unitario: {item.precio?.toFixed(2)}€</p>
                    </div>
                  </div>
                  <p className="text-sm font-bold text-gray-900">{(item.precio_total || item.precio * item.cantidad).toFixed(2)}€</p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            <div className="space-y-3">
              <h4 className="text-xs font-black text-gray-400 uppercase tracking-[0.2em]">Direccion de Envio</h4>
              {address ? (
                <div className="text-sm text-gray-600 font-medium leading-relaxed">
                  <p className="text-gray-900 font-bold mb-1">{address.nombre}</p>
                  <p>{address.calle}</p>
                  <p>
                    {address.codigo_postal}, {address.ciudad}
                  </p>
                  <p>
                    {address.provincia}, {address.pais}
                  </p>
                </div>
              ) : (
                <p className="text-sm text-gray-400 italic">Informacion de direccion no disponible</p>
              )}
            </div>
            <div className="space-y-3">
              <h4 className="text-xs font-black text-gray-400 uppercase tracking-[0.2em]">Estado y Fecha</h4>
              <div className="space-y-2">
                <span
                  className={`inline-flex px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${
                    order.estado === "completado"
                      ? "bg-emerald-100 text-emerald-700"
                      : order.estado === "pendiente"
                        ? "bg-amber-100 text-amber-700"
                        : "bg-gray-100 text-gray-600"
                  }`}
                >
                  {order.estado}
                </span>
                <p className="text-sm text-gray-600 font-medium">Fecha: {new Date(order.fecha_pedido).toLocaleDateString()}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="p-6 sm:p-8 bg-gray-50/50 border-t border-gray-100">
          <div className="flex justify-between items-center">
            <p className="text-base font-bold text-gray-500 uppercase tracking-widest">Total Pagado</p>
            <p className="text-3xl font-black text-gray-900 tracking-tight">{(order.subtotal || 0).toFixed(2)}€</p>
          </div>
        </div>
      </div>
    </div>
  );
}
