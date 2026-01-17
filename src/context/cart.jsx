import { children, createContext, useState } from "react";

// Crear el contexto
export const CartContext = createContext();

// Crear provider
export function CartProvider ({children}){
    const [cart, setCart] = useState([])

    const addToCart = product =>{
        // Verificar si el producto esta en el carrito
        const productInCart = cart.findIndex(item => item.id === product.id)
        
        // Cuando ya estaba en el carrito, a la cantidad del item se le añade 1
        if(productInCart >= 0){
            const newCart = structuredClone(cart); // Creamos copia de cart para que cuando se modifique se reenderice
            newCart[productInCart].cantidad += 1
            return setCart(newCart)
        }

        // Si el producto no esta en el carrito
        // Usa el estado anterior, crea un nuevo array manteniendo lo que habia previamente, pero añadiendo el producto con la cantidad 1
        setCart(prevState =>([
            ...prevState,
            {
                ...product,
                cantidad: 1
            }
        ]))
    }

    const removeFromCart = product =>{
        const newCart = structuredClone(cart)
        const index = newCart.findIndex(item => item.id === product.id)

        newCart.splice(index, 1)
        setCart(newCart)
    }

    const clearCart = () => {
        setCart([])
    }

    return(
        <CartContext.Provider value={{
            cart,
            addToCart,
            clearCart,
            removeFromCart
        }}>
            {children}
        </CartContext.Provider>
    )
}