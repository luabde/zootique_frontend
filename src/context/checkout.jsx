import { children, createContext, useEffect, useState } from "react";
import { useRoutes } from "react-router-dom";

export const CheckoutContext = createContext();

export function CheckoutProvider({children}){
    const userId = "691f7fc7d045de9c1bd6ff0e"; // Id de usuario provisional hasta tener sistema de usuarios en frontend
    const [user, setUser] = useState(null);
    const [addresses, setAddresses] = useState([]);

    const [shippingAddressId, setShippingAddressId] = useState(null);
    const [orderId, setOrderId] = useState(null);

    // Estado del formulario de checkout
    const [formData, setFormData] = useState({
        nombre: "", apellidos: "", email: "", telefono: "",
        direccionElegida: ""
    });

    //  Obtener la info del user para autocompletado en el frontend
    useEffect(()=>{
        getUser();
    }, []);

    const getUser = async () => {
        try {
            const res = await fetch(`http://localhost:3000/api/users/${userId}`);
            const json = await res.json();
            console.log('User data loaded:', json.message);

            setUser(json.message);
            setAddresses(json.message.direcciones);

            // Autocompletar formData con datos del usuario
            setFormData(prev => ({
                ...prev,
                nombre: json.message.nombre || prev.nombre,
                apellidos: json.message.apellidos || prev.apellidos,
                email: json.message.email || prev.email,
                telefono: json.message.telefono || prev.telefono
            }));
        } catch (err) {
            console.error('Error loading user:', err);
        }
    };

    // Función para manejar selección de dirección
    const selectAddress = async (selectedAddressId) => {
        setShippingAddressId(selectedAddressId);
        setFormData(prev => ({ ...prev, direccionElegida: selectedAddressId }));
    };

    // Permite crear una nueva dirección al usuario desde el formulario de facturación
    const createNewAddress = async (addressData) =>{
        try {
            const res = await fetch(`http://localhost:3000/api/users/${userId}/direcciones`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(addressData)
            });

            const json = await res.json();
            console.log("Dirección guardada en BD:", json);

            // Seleccionar automáticamente la nueva dirección
            setShippingAddressId(json.id); // Asumiendo que json.id es el ID de la nueva dirección
            setFormData(prev => ({ ...prev, direccionElegida: json.id }));

            // Recargar usuario para obtener direcciones actualizadas
            await getUser();

        } catch (err) {
            console.error("Error creando dirección:", err);
        }

    };

    const createOrder = async (orderData) => {
        try {
            const res = await fetch(`http://localhost:3000/api/orders/${userId}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(orderData)
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



    return <CheckoutContext.Provider value={{
        user,
        addresses,
        selectAddress,
        createNewAddress,
        shippingAddressId,
        formData,
        setFormData,
        orderId,
        createOrder
        }}>
            {children}
    </CheckoutContext.Provider>
}