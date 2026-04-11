import { createContext, useEffect, useState } from "react";
import { useAuth } from "../hook/useAuth";

export const CheckoutContext = createContext();

export function CheckoutProvider({ children }) {
    const { user: authUser } = useAuth();

    /** Perfil completo desde GET /api/users/:id (direcciones, email, etc.) */
    const [user, setUser] = useState(null);
    const [addresses, setAddresses] = useState([]);

    const userId = authUser?.id;

    const [shippingAddressId, setShippingAddressId] = useState(null);
    const [orderId, setOrderId] = useState(null);

    const [formData, setFormData] = useState({
        nombre: "",
        apellidos: "",
        email: "",
        telefono: "",
        direccionElegida: "",
    });

    const getUser = async () => {
        if (!userId) {
            setUser(null);
            setAddresses([]);
            return;
        }

        try {
            const res = await fetch(`http://localhost:3000/api/users/${userId}`, {
                credentials: "include",
            });
            const json = await res.json();

            if (!res.ok || json.status !== "success" || typeof json.message !== "object") {
                return;
            }

            setUser(json.message);
            setAddresses(json.message.direcciones ?? []);

            setFormData((prev) => ({
                ...prev,
                nombre: json.message.nombre || prev.nombre,
                apellidos: json.message.apellidos || prev.apellidos,
                email: json.message.email || prev.email,
                telefono: json.message.telefono || prev.telefono,
            }));
        } catch (err) {
            console.error("Error loading user:", err);
        }
    };

    useEffect(() => {
        void getUser();
    }, [userId]);

    const selectAddress = async (selectedAddressId) => {
        setShippingAddressId(selectedAddressId);
        setFormData((prev) => ({ ...prev, direccionElegida: selectedAddressId }));
    };

    const createNewAddress = async (addressData) => {
        if (!userId) return;

        try {
            const res = await fetch(
                `http://localhost:3000/api/users/${userId}/direcciones`,
                {
                    method: "POST",
                    credentials: "include",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(addressData),
                }
            );

            const json = await res.json();
            console.log("Dirección guardada en BD:", json);

            const newId = json.data?._id ?? json.id;
            if (newId) {
                setShippingAddressId(newId);
                setFormData((prev) => ({ ...prev, direccionElegida: newId }));
            }

            await getUser();
        } catch (err) {
            console.error("Error creando dirección:", err);
        }
    };

    const createOrder = async (orderData) => {
        if (!userId) return false;

        try {
            const res = await fetch(`http://localhost:3000/api/orders/${userId}`, {
                method: "POST",
                credentials: "include",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(orderData),
            });

            const json = await res.json();

            if (json.status === "success") {
                setOrderId(json.data._id);
                return true;
            }
            return false;
        } catch (err) {
            console.error("Error creando pedido:", err);
            return false;
        }
    };

    return (
        <CheckoutContext.Provider
            value={{
                user,
                addresses,
                selectAddress,
                createNewAddress,
                shippingAddressId,
                formData,
                setFormData,
                orderId,
                createOrder,
            }}
        >
            {children}
        </CheckoutContext.Provider>
    );
}
