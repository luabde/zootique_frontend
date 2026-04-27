import { useEffect, useState } from "react";
import { useAuth } from "../hook/useAuth";
import UserDashboardTabs from "../components/userDashboard/UserDashboardTabs";
import UserDashboardAlert from "../components/userDashboard/UserDashboardAlert";
import ProfileSection from "../components/userDashboard/ProfileSection";
import OrdersSection from "../components/userDashboard/OrdersSection";
import AddressesSection, { emptyAddress } from "../components/userDashboard/AddressesSection";
import OrderDetailsModal from "../components/userDashboard/OrderDetailsModal";

const API_BASE = "http://localhost:3000/api";

export default function UserDashboard() {
  // Datos de la sesión activa. `getSession` se usa para refrescar el usuario
  // después de cambios (perfil/direcciones) y mantener Navbar + dashboard sincronizados.
  const { user, getSession } = useAuth();

  // Estado de navegación y UI.
  const [activeTab, setActiveTab] = useState("profile"); // Pestaña activa: profile, orders o addresses.
  const [orders, setOrders] = useState([]); // Pedidos cargados del usuario.
  const [loadingOrders, setLoadingOrders] = useState(false); // Muestra estado de carga en la sección de pedidos.
  const [editingProfile, setEditingProfile] = useState(false); // Activa/desactiva el modo edición del perfil.
  const [showAddressForm, setShowAddressForm] = useState(false); // Controla si se ve el formulario de nueva dirección.
  const [selectedOrder, setSelectedOrder] = useState(null); // Pedido seleccionado para abrir el modal de detalles.

  // Estado de formularios controlados.
  const [formData, setFormData] = useState({
    nombre: user?.nombre || "",
    email: user?.email || "",
  });
  const [addressData, setAddressData] = useState(emptyAddress);

  // Mensaje global (exito/error) mostrado arriba del contenido.
  const [message, setMessage] = useState({ type: "", text: "" });

  // `userData` contiene la ficha completa del usuario (incluye direcciones).
  const [userData, setUserData] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true);

  // Carga inicial (o cuando cambia el usuario autenticado).
  useEffect(() => {
    if (user) {
      fetchFullUser();
    }
  }, [user]);

  useEffect(() => {
    if (activeTab === "orders" && user) {
      fetchOrders();
    }
  }, [activeTab, user]);


  // Llamadas a la API para obtener los datos del usuario, pedidos, actualizar user, añadir direcciones,
  // eliminar direcciones
  const fetchUserData = async (userId) => {
    const res = await fetch(`${API_BASE}/users/${userId}`, {
      credentials: "include",
    });
    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "No se pudo cargar el usuario");
    }

    return data.message;
  };

  const fetchUserOrders = async (userId) => {
    const res = await fetch(`${API_BASE}/orders/${userId}`, {
      credentials: "include",
    });
    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "No se pudieron cargar los pedidos");
    }

    return data.data || [];
  };

  const updateUser = async (userId, updateData) => {
    const res = await fetch(`${API_BASE}/users/${userId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(updateData),
    });
    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Error al actualizar");
    }

    return data.data;
  };

  const addAddress = async (userId, dataAddress) => {
    const res = await fetch(`${API_BASE}/users/${userId}/direcciones`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(dataAddress),
    });
    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Error al anadir direccion");
    }

    return data.data;
  };

  const deleteAddress = async (userId, addressId) => {
    const res = await fetch(`${API_BASE}/users/${userId}/direcciones/${addressId}`, {
      method: "DELETE",
      credentials: "include",
    });
    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Error al eliminar direccion");
    }
  };

  // Carga la informacion base del usuario y deja preparado el formulario de perfil.
  const fetchFullUser = async () => {
    setLoadingUser(true);
    try {
      const data = await fetchUserData(user.id);
      setUserData(data);
      setFormData({
        nombre: data.nombre || "",
        email: data.email || "",
      });
    } catch (err) {
      console.error("Error fetching full user:", err);
      setMessage({ type: "error", text: err.message });
    } finally {
      setLoadingUser(false);
    }
  };

  // Carga los pedidos solo cuando hace falta (al entrar en la tab "orders").
  const fetchOrders = async () => {
    setLoadingOrders(true);
    try {
      const data = await fetchUserOrders(user.id);
      setOrders(data);
    } catch (err) {
      console.error("Error fetching orders:", err);
      setMessage({ type: "error", text: err.message });
    } finally {
      setLoadingOrders(false);
    }
  };

  // Guarda cambios del perfil y refresca sesion/datos para evitar UI desactualizada.
  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    setMessage({ type: "", text: "" });
    try {
      await updateUser(user.id, formData);
      setMessage({ type: "success", text: "Perfil actualizado correctamente" });
      setEditingProfile(false);
      await getSession();
      fetchFullUser();
    } catch (err) {
      setMessage({ type: "error", text: err.message });
    }
  };

  // Crea una direccion, resetea el formulario y recarga los datos del usuario.
  const handleAddAddress = async (e) => {
    e.preventDefault();
    setMessage({ type: "", text: "" });
    try {
      await addAddress(user.id, addressData);
      setMessage({ type: "success", text: "Dirección añadida correctamente" });
      setShowAddressForm(false);
      setAddressData(emptyAddress);
      await getSession();
      fetchFullUser();
    } catch (err) {
      setMessage({ type: "error", text: err.message });
    }
  };

  // Elimina una direccion tras confirmacion explicita del usuario.
  const handleDeleteAddress = async (addressId) => {
    if (!window.confirm("¿Estás seguro de que quieres eliminar esta dirección?")) return;
    try {
      await deleteAddress(user.id, addressId);
      setMessage({ type: "success", text: "Dirección eliminada" });
      await getSession();
      fetchFullUser();
    } catch (err) {
      setMessage({ type: "error", text: err.message });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50/50 pt-6 pb-12">
      {/* Ver el detalle completo de un pedido */}
      {selectedOrder && (
        <OrderDetailsModal
          order={selectedOrder}
          addresses={userData?.direcciones}
          onClose={() => setSelectedOrder(null)}
        />
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Mi Cuenta</h1>
          <p className="mt-2 text-sm text-gray-600">
            Gestiona tu información, pedidos y direcciones desde un solo lugar.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar de tabs del dashboard */}
          <UserDashboardTabs
            activeTab={activeTab}
            onTabChange={(tabId) => {
              setActiveTab(tabId);
              setMessage({ type: "", text: "" });
            }}
          />

          <main className="flex-1 bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden min-h-[550px]">
            <div className="p-6 sm:p-10">
              {/* Loader principal mientras se obtiene la informacion del usuario */}
              {loadingUser ? (
                <div className="flex flex-col items-center justify-center py-24">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mb-4"></div>
                  <p className="text-gray-500 font-medium italic">Cargando tu información personal...</p>
                </div>
              ) : (
                <>
                  <UserDashboardAlert message={message} />

                  {/* Tab de perfil */}
                  {activeTab === "profile" && (
                    <ProfileSection
                      user={user}
                      userData={userData}
                      editingProfile={editingProfile}
                      formData={formData}
                      setFormData={setFormData}
                      onEditStart={() => setEditingProfile(true)}
                      onEditCancel={() => {
                        setEditingProfile(false);
                        setFormData({ nombre: userData?.nombre || "", email: userData?.email || "" });
                      }}
                      onSubmit={handleProfileUpdate}
                    />
                  )}

                  {/* Tab de pedidos */}
                  {activeTab === "orders" && (
                    <OrdersSection
                      loadingOrders={loadingOrders}
                      orders={orders}
                      onOpenOrder={setSelectedOrder}
                    />
                  )}

                  {/* Tab de direcciones */}
                  {activeTab === "addresses" && (
                    <AddressesSection
                      addresses={userData?.direcciones || []}
                      showAddressForm={showAddressForm}
                      addressData={addressData}
                      setAddressData={setAddressData}
                      onShowForm={() => setShowAddressForm(true)}
                      onHideForm={() => setShowAddressForm(false)}
                      onSubmit={handleAddAddress}
                      onDeleteAddress={handleDeleteAddress}
                    />
                  )}
                </>
              )}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
