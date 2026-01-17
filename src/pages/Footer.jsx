import { useCart } from "../hook/useCart"

export function Footer(){
    const { cart } = useCart()
    return(
        <div className="bg-gray-800 text-white p-4">
            <p className="text-center mb-2">DEBUG - Contenido del carrito:</p>
            <pre className="bg-gray-900 p-3 rounded text-xs overflow-auto max-h-40">
                {JSON.stringify(cart, null, 2)}
            </pre>
        </div>
    )
}