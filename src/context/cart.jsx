import { createContext, useEffect, useState } from "react";
import { useAuth } from "../hook/useAuth";

// Crear el contexto
export const CartContext = createContext();

// Crear provider
export function CartProvider({ children }) {
    // Intentar cargar el carrito de localStorage al iniciar
    const [cart, setCart] = useState([])
    const [subtotal, setSubtotal] = useState(0)
    const [totalQuantity, setTotalQuantity] = useState(0)
    const { user } = useAuth();

    // Cuando se cargue el provider, se obtendran los productos del carrito
    useEffect(() => {
        getCartFromBackend();
    }, [user?.id]); // Ejecutamos de nuevo cuando cambie el user?.id

    const addToCart = async (product) => {
        const userId = user?.id;
        if (!userId) return;

        // Verificar si el producto esta en el carrito
        const productInCart = cart.findIndex(item => item.id === product.id)

        // Cuando ya estaba en el carrito, a la cantidad del item se le añade 1
        if (productInCart >= 0) {
            try {
                const item = cart[productInCart];
                const res = await fetch(`http://localhost:3000/api/cart/${userId}/items/${item.itemId}`, {
                    method: 'PUT',
                    credentials: "include",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        cantidad: item.cantidad + 1
                    })
                });

                const data = await res.json();

                if (data.status === "success") {
                    console.log("Cantidad actualizada");
                } else {
                    console.error("Error actualizando la cantidad");
                }

            } catch (err) {
                console.error("Error actualizando la cantidad: ", err);
            }

            getCartFromBackend();
            return;
        }

        // Si el producto no esta en el carrito
        // Tambien se añade el nuevo producto al carrito en el backend
        try {
            const res = await fetch(`http://localhost:3000/api/cart/${userId}/items`, {
                method: 'POST',
                credentials: "include",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    productId: product.id,
                    cantidad: product.cantidad
                })
            });

            const data = await res.json();

            if (data.status != "success") {
                console.error("Error del backend al insertar:", data);
                return;
            }

            console.log("Producto insertado correctamente:", data);
            getCartFromBackend();

        } catch (err) {
            console.error("Error insertando el producto en el carrito: ", err);
        }
    }

    const decrementQuantity = async (product) => {
        const userId = user?.id;
        if (!userId) return;

        if (product.cantidad > 1) {
            // Añadir al backend la nueva cantidad cuando la cantidad sea mayor que 1
            try {
                const res = await fetch(`http://localhost:3000/api/cart/${userId}/items/${product.itemId}`, {
                    method: 'PUT',
                    credentials: "include",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        cantidad: product.cantidad - 1
                    })
                });

                const data = await res.json();

                if (data.status === "success") {
                    console.log("Cantidad actualizada correctamente");
                } else {
                    console.error("Error actualizando la cantidad");
                }
            } catch (err) {
                console.error("Error actualizando la cantidad: ", err);
            }
        } else {
            // En el caso de que la cantidad sea 1, al restar se debe de eliminar el producto del carrito  
            removeFromCart(product);
        }

        getCartFromBackend();

    }

    const removeFromCart = async (product) => {
        const userId = user?.id;
        if (!userId) return;

        // Actualizar el carrito de la base de datos
        try {
            // Se le pasa el itemId, porque el product id no tiene que ver con el carrito, el que cuenta es el id del item dentro del carrito
            const res = await fetch(`http://localhost:3000/api/cart/${userId}/items/${product.itemId}`, {
                method: 'DELETE',
                credentials: "include",
            });

            const data = await res.json();

            if (data.status === "success") {
                console.log("Item eliminado del carrito correctamente");
            } else {
                console.error("Error eliminando el item del carrito");
            }

        } catch (err) {
            console.error("Error eliminado el producto del carrito: ", err);
        }

        getCartFromBackend();
    }

    const clearCart = async () => {
        // setCart([])

        const userId = user?.id;
        if (!userId) return;

        // Actualizamos tambien la base de datos
        try {
            const res = await fetch(`http://localhost:3000/api/cart/${userId}`, {
                method: 'DELETE',
                credentials: "include",
            });

            const data = await res.json();

            if (data.status === "success") {
                console.log("Carrito vaciado correctamente");
            } else {
                console.error("Error al vaciar el carrito");
            }

        } catch (err) {
            console.error("Error vaciando el carrito: ", err);
        }

        getCartFromBackend();
    }

    // Función para obtener la info del carrito asociada a un user
    const getCartFromBackend = async () => {
        const userId = user?.id;
        if (!userId) {
            setCart([]);
            setSubtotal(0);
            setTotalQuantity(0);
            return;
        }

        // Obtenemos el carrito, si no exixte para ese user, lo va a crear
        const json = await fetch(`http://localhost:3000/api/cart/${userId}`, {
            credentials: "include",
        }).then((res) => res.json());
        const carrito = json.data;

        if (!carrito?.items) {
            setCart([]);
            setSubtotal(0);
            setTotalQuantity(0);
            return;
        }

        const itemsFormateados = carrito.items.map(item => ({
            id: item.product_id._id,           // ID del producto
            itemId: item._id,                  // ID del item en carrito

            // Datos del producto
            nombre: item.product_id.nombre,
            descr: item.product_id.descripcion,
            tipo: item.product_id.tipo,
            precio: item.product_id.precio.toString(),
            stock: item.product_id.stock.toString(),
            url: item.product_id.url,

            // Datos del carrito
            cantidad: item.cant_producto,
            precioTotalItem: item.precio_total // Total de esta linea

        }));

        setCart(itemsFormateados);
        setSubtotal(carrito.precio_total_prods);
        setTotalQuantity(carrito.cantidad_total_prods);

    };

    return (
        <CartContext.Provider value={{
            cart,
            addToCart,
            clearCart,
            removeFromCart,
            decrementQuantity,
            getCartFromBackend,
            subtotal,
            totalQuantity
        }}>
            {children}
        </CartContext.Provider>
    )
}