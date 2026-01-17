/*
    Hook que permite acceder al contexto de cart de una forma mas sencilla.
    Gracias a esto, en vede repetir en cada componente que se quiere usar:

    import { CartContext } from '../context/cart.jsx'
     const context = useContext(CartContext)

    usas el hook.

    Al final los hooks son como funciones de react, aunque tu puedes crearte las propias
*/

import { useContext } from "react"; // Permite acceder al contexto
import { CartContext } from '../context/cart.jsx' // Importas el contexto

export const useCart = () =>{
    const context = useContext(CartContext)

    if(context === undefined){
        throw new Error('useCart tiene que ser usado con CartProvider')
    }

    return context
}