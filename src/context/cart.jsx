import { children, createContext, useEffect, useState } from "react";

// Crear el contexto
export const CartContext = createContext();

// Crear provider
export function CartProvider({ children }) {
    // Intentar cargar el carrito de localStorage al iniciar
    const [cart, setCart] = useState([])

    // Cuando se cargue el provider, se obtendran los productos del carrito
    useEffect(() =>{
        getCartFromBackend();
    }, []);

    const addToCart = async (product) => {
        // Verificar si el producto esta en el carrito
        const productInCart = cart.findIndex(item => item.id === product.id)
        const userId = "691f7fc7d045de9c1bd6ff0e"; // Id de usuario provisional hasta tener sistema de usuarios en frontend
        
        // Cuando ya estaba en el carrito, a la cantidad del item se le añade 1
        if (productInCart >= 0) {
            try{
                const res = await fetch(`http://localhost:3000/api/cart/${userId}/items/${product.itemId}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        cantidad: product.cantidad + 1
                    })
                });

                const data = await res.json();

                if(data.status === "success"){
                    console.log("Cantidad actualizada");
                }else{
                    console.error("Error actualizando la cantidad");
                }

            }catch(err){
                console.error("Error actualizando la cantidad: ", err);
            }

            getCartFromBackend();
            return;
        }

        // Si el producto no esta en el carrito
        // Tambien se añade el nuevo producto al carrito en el backend
        try{
            const res = await fetch(`http://localhost:3000/api/cart/${userId}/items`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    productId: product.id,
                    cantidad: product.cantidad
                })
            });

            const data = await res.json();

            if(data.status != "success"){
                console.error("Error del backend al insertar:", data);
                return;
            }

            console.log("Producto insertado correctamente:", data);
            getCartFromBackend();

        }catch(err){
            console.error("Error insertando el producto en el carrito: ", err);
        }
    }

    const decrementQuantity = async (product) => {
        const userId = "691f7fc7d045de9c1bd6ff0e"; // Id de usuario provisional hasta tener sistema de usuarios en frontend

        if (product.cantidad > 1) {
            // Añadir al backend la nueva cantidad cuando la cantidad sea mayor que 1
            try{
                const res = await fetch(`http://localhost:3000/api/cart/${userId}/items/${product.itemId}`, { 
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        cantidad: product.cantidad - 1
                    })
                });

                const data = await res.json();

                if(data.status === "success"){
                    console.log("Cantidad actualizada correctamente");
                }else{
                    console.error("Error actualizando la cantidad");
                }
            }catch(err){
                console.error("Error actualizando la cantidad: ", err);
            }
        } else {
            // En el caso de que la cantidad sea 1, al restar se debe de eliminar el producto del carrito  
            removeFromCart(product);
        }
        
        getCartFromBackend();

    }

    const removeFromCart = async (product) => {
        // Actualizar el carrito de la base de datos
        try{
            const userId = "691f7fc7d045de9c1bd6ff0e"; // Id de usuario provisional hasta tener sistema de usuarios en frontend
            // Se le pasa el itemId, porque el product id no tiene que ver con el carrito, el que cuenta es el id del item dentro del carrito
            const res = await fetch(`http://localhost:3000/api/cart/${userId}/items/${product.itemId}`, {
                method: 'DELETE'
            });

            const data = await res.json();

            if(data.status === "success"){
                console.log("Item eliminado del carrito correctamente");
            }else{
                console.error("Error eliminando el item del carrito");
            }

        }catch(err){
            console.error("Error eliminado el producto del carrito: ", err);
        }

        getCartFromBackend();
    }

    const clearCart = async () => {
        // setCart([])

        // Actualizamos tambien la base de datos
        const userId = "691f7fc7d045de9c1bd6ff0e"; // Id de usuario provisional hasta tener sistema de usuarios en frontend

        try{
            const res = await fetch(`http://localhost:3000/api/cart/${userId}`, {
                method: 'DELETE'
            });
            
            const data = await res.json();

            if(data.status === "success"){
                console.log("Carrito vaciado correctamente");
            }else{
                console.error("Error al vaciar el carrito");
            }

        }catch(err){
            console.error("Error vaciando el carrito: ", err);
        }

        getCartFromBackend();
    }

    // Función para obtener la info del carrito asociada a un user
    const getCartFromBackend = async () =>{
        const userId = "691f7fc7d045de9c1bd6ff0e"; // Id de usuario provisional hasta tener sistema de usuarios en frontend

        // Obtenemos el carrito, si no exixte para ese user, lo va a crear
        const carrito = await fetch(`http://localhost:3000/api/cart/${userId}`)
        .then(res => res.json())
        .then(carrito => carrito.data);

        const carritoFormateado = carrito.items.map(item => ({
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
            cantidad: item.cant_producto

        }));

        setCart(carritoFormateado);

    };

    return (
        <CartContext.Provider value={{
            cart,
            addToCart,
            clearCart,
            removeFromCart,
            decrementQuantity,
            getCartFromBackend
        }}>
            {children}
        </CartContext.Provider>
    )
}