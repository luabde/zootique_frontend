import { Link } from 'react-router-dom'

export function Footer() {
    return (
        <footer className="bg-gray-100 text-gray-600 pt-12 pb-8 px-4 mt-auto border-t border-gray-200">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 border-b border-emerald-100 pb-12">
                {/* Brand Section */}
                <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-3">
                        <img className="w-10" src="/img/logo.png" alt="Logo Zootique" />
                        <span className="text-xl font-bold text-emerald-900 tracking-tight">Zootique</span>
                    </div>
                    <p className="text-sm leading-relaxed max-w-xs text-gray-500">
                        Tu boutique premium para mascotas. Calidad, estilo y cuidado para los miembros más especiales de tu familia.
                    </p>
                </div>

                {/* Quick Links */}
                <div className="flex flex-col gap-4">
                    <h4 className="text-emerald-800 font-semibold text-lg">Explorar</h4>
                    <nav className="flex flex-col gap-2.5">
                        <Link to="/" className="hover:text-emerald-600 transition-colors duration-200 text-sm">Inicio</Link>
                        <Link to="/cart" className="hover:text-emerald-600 transition-colors duration-200 text-sm">Mi Carrito</Link>
                        <Link to="/login" className="hover:text-emerald-600 transition-colors duration-200 text-sm">Mi Cuenta</Link>
                    </nav>
                </div>

                {/* Contact Section */}
                <div className="flex flex-col gap-4">
                    <h4 className="text-emerald-800 font-semibold text-lg">Contacto</h4>
                    <div className="flex flex-col gap-2.5 text-sm">
                        <p className="flex items-center gap-2">
                            <span className="text-emerald-600 font-medium">Email:</span> hola@zootique.com
                        </p>
                        <p className="flex items-center gap-2">
                            <span className="text-emerald-600 font-medium">Tel:</span> +34 900 000 000
                        </p>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-400">
                <p>© {new Date().getFullYear()} Zootique. Todos los derechos reservados.</p>
                <div className="flex gap-6">
                    <span className="hover:text-emerald-600 cursor-pointer transition-colors">Privacidad</span>
                    <span className="hover:text-emerald-600 cursor-pointer transition-colors">Términos</span>
                    <span className="hover:text-emerald-600 cursor-pointer transition-colors">Cookies</span>
                </div>
            </div>
        </footer>
    )
}