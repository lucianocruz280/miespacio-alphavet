const Header = () => {
    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
            <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold">
                        V
                    </div>
                    <span className="text-lg font-semibold text-slate-900">Alphavet</span>
                </div>

                <nav className="hidden md:flex items-center gap-8">
                    <a href="#servicios" className="text-sm text-slate-500 hover:text-blue-600">Servicios</a>
                    <a href="#precios" className="text-sm text-slate-500 hover:text-blue-600">Precios</a>
                    <a href="#testimonios" className="text-sm text-slate-500 hover:text-blue-600">Testimonios</a>
                    <a href="#contacto" className="text-sm text-slate-500 hover:text-blue-600">Contacto</a>
                </nav>

                <div className="hidden md:flex gap-3">
                    <a href="/auth/signin" className="text-sm px-3 py-2 text-slate-600 hover:text-slate-900">Iniciar sesión</a>
                    <a href="/auth/signup" className="bg-slate-900 text-white px-4 py-2 rounded-lg text-sm">Registrarse</a>
                </div>
            </div>
        </header>
    )
}

export default Header