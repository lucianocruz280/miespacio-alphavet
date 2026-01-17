import Link from 'next/link'
import { useEffect, useState } from 'react'

const Header = () => {
    const [solid, setSolid] = useState(false)

    useEffect(() => {
        const section = document.getElementById('nosotros')
        if (!section) return

        const observer = new IntersectionObserver(
            ([entry]) => {
                setSolid(entry.isIntersecting)
            },
            {
                rootMargin: '-80px 0px 0px 0px', // altura del header
                threshold: 0,
            }
        )

        observer.observe(section)

        return () => observer.disconnect()
    }, [])
    return (
        <header
            className={`
    fixed top-0 left-0 right-0 z-50 transition-all duration-300
    ${solid
                    ? 'bg-white glass border-b border-primary-50/20'
                    : 'bg-transparent backdrop-blur-md'}
  `}
        >

            <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-white font-bold shadow-lg shadow-primary-200">
                        <span className="text-xl">A</span>
                    </div>
                    <span
                        className={`text-2xl font-bold tracking-tight transition-colors ${solid ? 'text-slate-900' : 'text-white'
                            }`}
                    >
                        Alpha<span className="text-primary">vet</span>
                    </span>

                </div>

                <nav className="hidden md:flex items-center gap-10">
                    <a href="#servicios" className="text-sm font-medium text-slate-600 hover:text-primary transition-colors">Servicios</a>
                    <a
                        href="#nosotros"
                        className={`text-sm font-medium transition-colors ${solid
                            ? 'text-slate-600 hover:text-primary'
                            : 'text-white/90 hover:text-white'
                            }`}
                    >
                        Nosotros
                    </a>

                    <a href="#precios" className="text-sm font-medium text-slate-600 hover:text-primary transition-colors">Precios</a>
                    <a href="#contacto" className="text-sm font-medium text-slate-600 hover:text-primary transition-colors">Contacto</a>
                </nav>

                <div className="hidden md:flex items-center gap-4">
                    <Link
                        href="/auth/signin"
                        className={`text-sm font-semibold transition-colors px-4 py-2 ${solid
                                ? 'text-slate-600 hover:text-primary'
                                : 'text-white hover:text-white/80'
                            }`}
                    >
                        Acceso
                    </Link>

                    <Link href="/auth/signup" className="bg-primary text-white px-6 py-2.5 rounded-xl text-sm font-bold shadow-md shadow-primary-100 hover:shadow-lg hover:shadow-primary-200 transition-all active:scale-95">
                        Registrarse
                    </Link>
                </div>
            </div>
        </header>
    )
}

export default Header

