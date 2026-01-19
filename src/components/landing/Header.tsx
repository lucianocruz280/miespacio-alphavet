import Link from "next/link"
import { useEffect, useState } from "react"

const Header = () => {
  const [solid, setSolid] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const section = document.getElementById("hero")
    if (!section) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        setSolid(entry.isIntersecting)
      },
      {
        rootMargin: "-80px 0px 0px 0px",
        threshold: 0,
      }
    )

    observer.observe(section)
    return () => observer.disconnect()
  }, [])

  return (
    <>
      <header
        className={`
          fixed top-0 left-0 right-0 z-50 transition-all duration-300 backdrop-blur-sm
          ${solid ? "bg-transparent" : "bg-white glass border-b border-primary-50/20"}
        `}
      >
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-white font-bold shadow-lg shadow-primary-800">
              <span className="text-xl">A</span>
            </div>
            <span
              className={`text-2xl font-bold tracking-tight transition-colors ${
                solid ? "text-white" : "text-slate-900"
              }`}
            >
              Alpha<span className="text-primary">vet</span>
            </span>
          </div>

          <nav className="hidden md:flex items-center gap-10">
            {["servicios", "nosotros", "contacto"].map((item) => (
              <a
                key={item}
                href={`#${item}`}
                className={`text-sm font-medium transition-colors ${
                  solid
                    ? "text-white/90 hover:text-white"
                    : "text-slate-600 hover:text-primary"
                }`}
              >
                {item.charAt(0).toUpperCase() + item.slice(1)}
              </a>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <Link
              href="/auth/signin"
              className={`text-sm font-medium transition-colors ${
                solid
                  ? "text-white/90 hover:text-white"
                  : "text-slate-600 hover:text-primary"
              }`}
            >
              Acceso
            </Link>
            <Link
              href="/auth/signup"
              className="bg-primary text-white px-6 py-2.5 rounded-xl text-sm font-bold shadow-md transition-all active:scale-95"
            >
              Registrarse
            </Link>
          </div>

          <button
            onClick={() => setOpen(!open)}
            className="md:hidden flex flex-col justify-center gap-1.5 z-50"
            aria-label="Abrir menú"
          >
            <span
              className={`h-0.5 w-6 rounded bg-current transition-all ${
                open ? "rotate-45 translate-y-2" : ""
              } ${solid ? "text-white" : "text-slate-900"}`}
            />
            <span
              className={`h-0.5 w-6 rounded bg-current transition-all ${
                open ? "opacity-0" : ""
              } ${solid ? "text-white" : "text-slate-900"}`}
            />
            <span
              className={`h-0.5 w-6 rounded bg-current transition-all ${
                open ? "-rotate-45 -translate-y-2" : ""
              } ${solid ? "text-white" : "text-slate-900"}`}
            />
          </button>
        </div>
      </header>

      <div
        className={`
          fixed inset-0 z-40 bg-black/40 backdrop-blur-sm transition-opacity
          ${open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}
        `}
        onClick={() => setOpen(false)}
      />

      <div
        className={`
          fixed top-0 left-0 right-0 z-50 bg-white rounded-b-3xl shadow-xl
          transform transition-all duration-300
          ${open ? "translate-y-0 opacity-100" : "-translate-y-10 opacity-0 pointer-events-none"}
        `}
      >
        <div className="pt-10 pb-10 px-6 flex flex-col gap-6 text-center">
          {["servicios", "nosotros", "contacto"].map((item) => (
            <a
              key={item}
              href={`#${item}`}
              onClick={() => setOpen(false)}
              className="text-lg font-semibold text-slate-900 hover:text-primary transition-colors"
            >
              {item.charAt(0).toUpperCase() + item.slice(1)}
            </a>
          ))}

          <div className="pt-6 border-t border-slate-100 flex flex-col gap-4">
            <Link
              href="/auth/signin"
              onClick={() => setOpen(false)}
              className="text-slate-700 font-medium"
            >
              Acceso
            </Link>
            <Link
              href="/auth/signup"
              onClick={() => setOpen(false)}
              className="bg-primary text-white py-3 rounded-xl font-bold shadow-md"
            >
              Registrarse
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}

export default Header
