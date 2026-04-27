import AdminSectionCard from "./AdminSectionCard";

export default function AdminOrdersTab({ loading, orders, formatCurrency, formatDate, onChangeStatus }) {
  return (
    <AdminSectionCard title="Gestion de pedidos" description="Control de estados y seguimiento de pedidos.">
      {loading ? (
        <p className="text-sm text-gray-500">Cargando pedidos...</p>
      ) : (
        <div className="space-y-3">
          {orders.map((order) => (
            <article key={order._id} className="rounded-2xl border border-gray-100 bg-gray-50/50 p-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <p className="text-sm font-bold text-gray-900">Pedido #{order._id?.slice(-6) || "------"}</p>
                <div className="flex items-center gap-2">
                  <select
                    value={order.estado}
                    onChange={(e) => onChangeStatus(order, e.target.value)}
                    className="rounded-xl border border-gray-200 bg-white px-3 py-1.5 text-xs font-semibold"
                  >
                    <option value="pendiente">pendiente</option>
                    <option value="paid">paid</option>
                    <option value="preparacion">preparacion</option>
                    <option value="recogida">recogida</option>
                    <option value="reparto">reparto</option>
                    <option value="entregado">entregado</option>
                  </select>
                </div>
              </div>
              <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-gray-500">
                <span>Total: {formatCurrency(Number(order.subtotal || 0))}</span>
                <span>Items: {order.items?.length || 0}</span>
                <span>Fecha: {order.fecha_pedido ? formatDate(new Date(order.fecha_pedido)) : "-"}</span>
              </div>
            </article>
          ))}
        </div>
      )}
    </AdminSectionCard>
  );
}
