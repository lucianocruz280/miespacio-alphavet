import { HeartPulse, Menu } from "lucide-react"

const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/20 backdrop-blur-md ">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2 group cursor-pointer">
          <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white">
            <HeartPulse width="20" />
          </div>
          <span className="text-lg font-semibold tracking-tight text-slate-900 group-hover:text-blue-600 transition-colors">
            Alphavet
          </span>
        </div>

        <nav className="hidden md:flex items-center gap-8">
          <a href="#servicios" className="text-sm font-medium text-white hover:text-blue-600 transition-colors">Servicios</a>
          <a href="#precios" className="text-sm font-medium text-white hover:text-blue-600 transition-colors">Precios</a>
          <a href="#testimonios" className="text-sm font-medium text-white hover:text-blue-600 transition-colors">Testimonios</a>
          <a href="#contacto" className="text-sm font-medium text-white hover:text-blue-600 transition-colors">Contacto</a>
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <a href="/auth/signin" className="text-sm font-medium text-white hover:text-slate-900 px-3 py-2">
            Iniciar sesión
          </a>
          <a href="/auth/signup" className="text-sm font-medium bg-slate-900 text-white px-4 py-2 rounded-lg hover:bg-slate-800 transition-all shadow-sm">
            Registrarse
          </a>
        </div>

        <button className="md:hidden text-slate-500">
          <Menu width="24" />
        </button>
      </div>
    </header>
  )
}

export default Header
