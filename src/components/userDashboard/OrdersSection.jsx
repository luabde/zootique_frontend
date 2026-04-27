import { Link } from "react-router-dom";

export default function OrdersSection({ loadingOrders, orders, onOpenOrder }) {
  return (
    <div>
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Historial de Pedidos</h2>
        <p className="text-gray-500 text-sm mt-1">Revisa el estado y detalle de tus compras anteriores.</p>
      </div>

      {loadingOrders ? (
        <div className="flex justify-center py-20">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-emerald-600"></div>
        </div>
      ) : orders.length > 0 ? (
        <div className="space-y-5">
          {orders.map((order) => (
            <div
              key={order._id}
              className="border border-gray-100 rounded-3xl p-6 hover:border-emerald-200 hover:shadow-xl hover:shadow-emerald-50/50 transition-all duration-300 group"
            >
              <div className="flex flex-wrap justify-between items-start gap-4">
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-gray-100 flex items-center justify-center text-gray-400 group-hover:bg-emerald-100 group-hover:text-emerald-600 transition-colors">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-900">Pedido #{order?._id?.slice(-6) || "XXXXXX"}</p>
                    <p className="text-xs text-gray-500 font-medium mt-0.5">
                      {order?.fecha_pedido
                        ? new Date(order.fecha_pedido).toLocaleDateString("es-ES", {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                          })
                        : "Fecha no disponible"}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xl font-black text-gray-900">{(order.subtotal || order.total || 0).toFixed(2)}€</p>
                  <span
                    className={`inline-flex px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest mt-1.5 ${
                      order.estado === "completado"
                        ? "bg-emerald-100 text-emerald-700"
                        : order.estado === "pendiente"
                          ? "bg-amber-100 text-amber-700"
                          : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {order.estado}
                  </span>
                </div>
              </div>

              <div className="mt-6 pt-5 border-t border-gray-50 flex justify-between items-center">
                <p className="text-xs text-gray-400 font-semibold">{order.items?.length || 0} productos en este envio</p>
                <button
                  onClick={() => onOpenOrder(order)}
                  className="text-xs font-bold text-emerald-600 hover:text-emerald-700 uppercase tracking-widest flex items-center gap-1.5 group/btn"
                >
                  Detalles
                  <svg className="w-4 h-4 transform group-hover/btn:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-gray-50/50 rounded-[40px] border-2 border-dashed border-gray-200">
          <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 border border-gray-100 shadow-sm">
            <svg className="w-8 h-8 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
          </div>
          <p className="text-gray-500 font-semibold">Aun no has realizado ningun pedido.</p>
          <Link
            to="/allProducts"
            className="mt-6 inline-flex items-center gap-2 text-xs font-bold text-emerald-600 hover:text-emerald-700 uppercase tracking-widest px-6 py-3 bg-white border border-emerald-100 rounded-2xl shadow-sm hover:shadow-md transition-all"
          >
            Ir a la tienda
          </Link>
        </div>
      )}
    </div>
  );
}
