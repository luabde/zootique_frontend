import { useContext } from "react"; // Permite acceder al contexto
import { CheckoutContext } from "../context/checkout"; // Importas el contexto

export const useCheckout = () =>{
    const context = useContext(CheckoutContext)

    if(context === undefined){
        throw new Error('useCart tiene que ser usado con CartProvider')
    }

    return context
}