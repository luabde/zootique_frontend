import { useEffect, useState } from "react";
import AdminGeneralTab from "../components/adminDashboard/AdminGeneralTab";
import AdminUsersTab from "../components/adminDashboard/AdminUsersTab";
import AdminOrdersTab from "../components/adminDashboard/AdminOrdersTab";
import AdminProductsTab from "../components/adminDashboard/AdminProductsTab";

const API_BASE = "http://localhost:3000/api";

const currency = new Intl.NumberFormat("es-ES", { style: "currency", currency: "EUR" });
const dateFormatter = new Intl.DateTimeFormat("es-ES", { dateStyle: "medium" });
const monthFormatter = new Intl.DateTimeFormat("es-ES", { month: "short" });

// Parser robusto para fechas de pedidos:
// 1) Intenta parseo nativo (ISO / Date válido).
// 2) Si viene como "dd/mm/yyyy", lo transforma manualmente.
// 3) Como último recurso, intenta extraer fecha del ObjectId de Mongo.
function parseOrderDate(order) {
  if (order?.fecha_pedido) {
    const nativeDate = new Date(order.fecha_pedido);
    if (!Number.isNaN(nativeDate.getTime())) return nativeDate;

    if (typeof order.fecha_pedido === "string") {
      const ddmmyyyyMatch = order.fecha_pedido.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
      if (ddmmyyyyMatch) {
        const [, day, month, year] = ddmmyyyyMatch;
        const parsed = new Date(Date.UTC(Number(year), Number(month) - 1, Number(day)));
        if (!Number.isNaN(parsed.getTime())) return parsed;
      }
    }
  }

  // Fallback: timestamp embebido en ObjectId (primeros 4 bytes = epoch seconds).
  if (typeof order?._id === "string" && order._id.length >= 8) {
    const seconds = Number.parseInt(order._id.slice(0, 8), 16);
    if (!Number.isNaN(seconds)) {
      const fromObjectId = new Date(seconds * 1000);
      if (!Number.isNaN(fromObjectId.getTime())) return fromObjectId;
    }
  }

  return null;
}

export default function AdminDashboard() {
  // Control de pestaña activa (estructura tipo dashboard de cliente).
  const [activeTab, setActiveTab] = useState("general");
  // Estado global de carga y feedback de operaciones.
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState({ type: "", text: "" });
  // Datos principales del panel.
  const [users, setUsers] = useState([]);
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  // Estado del formulario para crear producto.
  const [newProduct, setNewProduct] = useState({
    nombre: "",
    descripcion: "",
    precio: "",
    tipo: "Accesorio",
    animales: [],
    stock: "",
    url: "",
  });
  const [editingProductId, setEditingProductId] = useState(null);
  const [editingProductData, setEditingProductData] = useState({ nombre: "", precio: "", stock: "" });

  // Definición de navegación interna del panel.
  const adminTabs = [
    { id: "general", label: "Resumen general" },
    { id: "users", label: "Usuarios" },
    { id: "orders", label: "Pedidos" },
    { id: "products", label: "Productos" },
  ];

  const loadAdminData = async () => {
    setLoading(true);
    setMessage({ type: "", text: "" });
    try {
      // 1) Cargamos usuarios
      const usersRes = await fetch(`${API_BASE}/users`, { credentials: "include" });
      const usersData = await usersRes.json();
      if (!usersRes.ok) throw new Error(usersData.message || "No se pudieron cargar los usuarios");

      // 2) Cargamos catálogo de productos.
      const productsRes = await fetch(`${API_BASE}/products`, { credentials: "include" });
      const productsData = await productsRes.json();
      if (!productsRes.ok) throw new Error(productsData.message || "No se pudieron cargar los productos");

      // 3) Cargamos pedidos por usuario y luego los unificamos.
      // Se usa este enfoque para no depender de /orders global.
      const ordersByUser = await Promise.all(
        (usersData.data || []).map(async (user) => {
          const res = await fetch(`${API_BASE}/orders/${user._id}`, { credentials: "include" });
          const data = await res.json();
          if (!res.ok) return [];
          return Array.isArray(data.data) ? data.data : [];
        })
      );

      const mergedOrders = ordersByUser
        .flat()
        .sort((a, b) => new Date(b.fecha_pedido || 0) - new Date(a.fecha_pedido || 0));

      setUsers(usersData.data || []);
      setProducts(productsData.data || []);
      setOrders(mergedOrders);
    } catch (err) {
      setMessage({ type: "error", text: err.message || "Error al cargar datos del panel admin" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Carga inicial del dashboard.
    loadAdminData();
  }, []);

  // Métricas agregadas que alimentan las tarjetas del resumen general.
  // Suma de facturación acumulada usando el subtotal de todos los pedidos cargados.
  const totalRevenue = orders.reduce((acc, order) => acc + Number(order.subtotal || 0), 0);
  // Cantidad de pedidos que siguen en estado pendiente.
  const pendingOrders = orders.filter((order) => order.estado === "pendiente").length;
  // Número de productos con stock crítico (5 o menos unidades).
  const lowStockProducts = products.filter((product) => Number(product.stock || 0) <= 5).length;
  // Objeto resumen con métricas globales para las tarjetas del panel general.
  const stats = {
    // Total de usuarios registrados en la plataforma.
    totalUsers: users.length,
    // Total de pedidos cargados en el dashboard.
    totalOrders: orders.length,
    // Facturación total calculada en la constante superior.
    totalRevenue,
    // Total de pedidos pendientes calculado arriba.
    pendingOrders,
    // Total de productos con stock bajo calculado arriba.
    lowStockProducts,
  };

  // Datos para el grafico:
  // - Siempre mostramos los ultimos 12 meses.
  // - Solo contamos pedidos que NO estan en pendiente.
  const monthlySales = (() => {
    const now = new Date();
    const months = [];

    // 1) Crear los ultimos 12 meses (del mas antiguo al actual).
    for (let i = 11; i >= 0; i -= 1) {
      const date = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth() - i, 1));
      const key = `${date.getUTCFullYear()}-${String(date.getUTCMonth() + 1).padStart(2, "0")}`;
      const label = `${monthFormatter.format(date).replace(".", "")} ${date.getUTCFullYear()}`;
      months.push({ key, label });
    }

    // 2) Quedarnos solo con ventas cerradas (estado distinto de pendiente).
    const salesOrders = orders.filter((order) => {
      const normalizedStatus = String(order.estado || "").toLowerCase().trim();
      return normalizedStatus !== "pendiente" && normalizedStatus !== "pending";
    });

    // 3) Para cada mes, contar cuantas ventas cerradas hay.
    const values = months.map((month) => {
      return salesOrders.reduce((count, order) => {
        const parsedDate = parseOrderDate(order);
        if (!parsedDate) return count;
        const orderKey = `${parsedDate.getUTCFullYear()}-${String(parsedDate.getUTCMonth() + 1).padStart(2, "0")}`;
        return orderKey === month.key ? count + 1 : count;
      }, 0);
    });

    return {
      labels: months.map((month) => month.label),
      values,
      keys: months.map((month) => month.key),
    };
  })();

  const updateUser = async (userId, payload) => {
    // Update genérico para rol/baneo desde la tabla de usuarios.
    const res = await fetch(`${API_BASE}/users/${userId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(payload),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "No se pudo actualizar el usuario");
  };

  const deleteUser = async (userId) => {
    // Borrado de usuario desde CRUD de usuarios.
    const res = await fetch(`${API_BASE}/users/${userId}`, {
      method: "DELETE",
      credentials: "include",
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "No se pudo eliminar el usuario");
  };

  const updateOrderStatus = async (orderId, estado) => {
    // Cambio de estado de pedido desde la pestaña de pedidos.
    const res = await fetch(`${API_BASE}/orders/${orderId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ estado }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "No se pudo actualizar el pedido");
  };

  const createProduct = async (e) => {
    e.preventDefault();
    try {
      // Convertimos precio/stock a número para respetar el esquema de backend.
      const payload = {
        ...newProduct,
        precio: Number(newProduct.precio),
        stock: Number(newProduct.stock),
      };
      const res = await fetch(`${API_BASE}/products`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "No se pudo crear el producto");
      setMessage({ type: "success", text: "Producto creado correctamente" });
      setNewProduct({ nombre: "", descripcion: "", precio: "", tipo: "Accesorio", animales: [], stock: "", url: "" });
      loadAdminData();
    } catch (err) {
      setMessage({ type: "error", text: err.message });
    }
  };

  const saveProductEdit = async () => {
    // Guarda edición rápida (nombre, precio, stock) del producto seleccionado.
    try {
      const res = await fetch(`${API_BASE}/products/${editingProductId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          nombre: editingProductData.nombre,
          precio: Number(editingProductData.precio),
          stock: Number(editingProductData.stock),
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "No se pudo actualizar el producto");
      setMessage({ type: "success", text: "Producto actualizado correctamente" });
      setEditingProductId(null);
      loadAdminData();
    } catch (err) {
      setMessage({ type: "error", text: err.message });
    }
  };

  const removeProduct = async (productId) => {
    // Eliminación directa de producto.
    try {
      const res = await fetch(`${API_BASE}/products/${productId}`, {
        method: "DELETE",
        credentials: "include",
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "No se pudo eliminar el producto");
      setMessage({ type: "success", text: "Producto eliminado correctamente" });
      loadAdminData();
    } catch (err) {
      setMessage({ type: "error", text: err.message });
    }
  };

  const handleToggleRole = async (user) => {
    try {
      await updateUser(user._id, { rol: user.rol === "admin" ? "cliente" : "admin" });
      setMessage({ type: "success", text: "Rol actualizado" });
      loadAdminData();
    } catch (err) {
      setMessage({ type: "error", text: err.message });
    }
  };

  const handleToggleBan = async (user) => {
    try {
      await updateUser(user._id, { bann: !user.bann });
      setMessage({ type: "success", text: "Estado de usuario actualizado" });
      loadAdminData();
    } catch (err) {
      setMessage({ type: "error", text: err.message });
    }
  };

  const handleDeleteUser = async (user) => {
    if (!window.confirm("¿Eliminar este usuario?")) return;
    try {
      await deleteUser(user._id);
      setMessage({ type: "success", text: "Usuario eliminado" });
      loadAdminData();
    } catch (err) {
      setMessage({ type: "error", text: err.message });
    }
  };

  const handleOrderStatusChange = async (order, nextStatus) => {
    try {
      await updateOrderStatus(order._id, nextStatus);
      setMessage({ type: "success", text: "Estado del pedido actualizado" });
      loadAdminData();
    } catch (err) {
      setMessage({ type: "error", text: err.message });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50/50 pt-6 pb-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <header className="mb-8">
          <h1 className="text-3xl font-black tracking-tight text-gray-900">Panel de administracion</h1>
          <p className="mt-2 text-sm text-gray-600">Gestion de usuarios, pedidos y productos.</p>
        </header>

        <aside className="mb-8">
          <nav className="flex flex-wrap gap-2">
            {adminTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`rounded-2xl px-4 py-2 text-sm font-semibold transition-all ${
                  activeTab === tab.id
                    ? "bg-emerald-600 text-white"
                    : "border border-gray-200 bg-white text-gray-600 hover:bg-gray-50"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </aside>

        {message.text && (
          <div
            className={`mb-6 rounded-2xl border p-4 text-sm font-semibold ${
              message.type === "success"
                ? "border-emerald-100 bg-emerald-50 text-emerald-700"
                : "border-red-100 bg-red-50 text-red-700"
            }`}
          >
            {message.text}
          </div>
        )}

        {/* Pestaña 1: visión ejecutiva + placeholders de gráficos */}
        {activeTab === "general" && (
          <AdminGeneralTab
            loading={loading}
            stats={{
              ...stats,
              totalRevenueFormatted: currency.format(stats.totalRevenue),
            }}
            monthlySales={monthlySales}
          />
        )}

        {/* Pestaña 2: CRUD de usuarios */}
        {activeTab === "users" && (
          <AdminUsersTab
            loading={loading}
            users={users}
            onToggleRole={handleToggleRole}
            onToggleBan={handleToggleBan}
            onDeleteUser={handleDeleteUser}
          />
        )}

        {/* Pestaña 3: gestión de pedidos */}
        {activeTab === "orders" && (
          <AdminOrdersTab
            loading={loading}
            orders={orders}
            formatCurrency={currency.format}
            formatDate={dateFormatter.format}
            onChangeStatus={handleOrderStatusChange}
          />
        )}

        {/* Pestaña 4: gestión de productos (crear, editar y eliminar) */}
        {activeTab === "products" && (
          <AdminProductsTab
            loading={loading}
            products={products}
            newProduct={newProduct}
            setNewProduct={setNewProduct}
            editingProductId={editingProductId}
            editingProductData={editingProductData}
            setEditingProductId={setEditingProductId}
            setEditingProductData={setEditingProductData}
            formatCurrency={currency.format}
            onCreateProduct={createProduct}
            onSaveEdit={saveProductEdit}
            onDeleteProduct={removeProduct}
          />
        )}
      </div>
    </div>
  );
}
