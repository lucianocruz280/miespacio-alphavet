import { Facebook, Instagram, Linkedin } from "lucide-react"

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-400 py-16 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Marca */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-white font-bold shadow-lg shadow-primary-500/20">
                <span className="text-xl">A</span>
              </div>
              <span className="text-2xl font-bold text-white tracking-tight">
                AlphaVet
                <span className="block text-sm font-medium text-slate-400">
                  Hospital Veterinario
                </span>
              </span>
            </div>

            <p className="max-w-sm text-sm leading-relaxed mb-6">
              Hospital veterinario dedicado al cuidado integral de las mascotas,
              comprometido con la excelencia médica, la atención humana y el
              bienestar animal.
            </p>

            {/* Redes sociales oficiales */}
            <div className="flex items-center gap-4">
              <a
                href="#"
                aria-label="Facebook"
                className="hover:text-primary transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                aria-label="Instagram"
                className="hover:text-primary transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                aria-label="LinkedIn"
                className="hover:text-primary transition-colors"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Servicios */}
          <div>
            <h4 className="text-white font-bold mb-6">Servicios</h4>
            <ul className="space-y-4 text-sm">
              <li>
                <a href="#servicios" className="hover:text-white transition-colors">
                  Consulta médica veterinaria
                </a>
              </li>
              <li>
                <a href="#servicios" className="hover:text-white transition-colors">
                  Estética veterinaria
                </a>
              </li>
              <li>
                <a href="#servicios" className="hover:text-white transition-colors">
                  Cirugías veterinarias
                </a>
              </li>
              <li>
                <a href="#servicios" className="hover:text-white transition-colors">
                  Alimentos y productos veterinarios
                </a>
              </li>
            </ul>
          </div>

          {/* Compañía */}
          <div>
            <h4 className="text-white font-bold mb-6">Compañía</h4>
            <ul className="space-y-4 text-sm">
              <li>
                <a href="#nosotros" className="hover:text-white transition-colors">
                  Nosotros
                </a>
              </li>
              <li>
                <a href="#servicios" className="hover:text-white transition-colors">
                  Servicios
                </a>
              </li>
              <li>
                <a href="#contacto" className="hover:text-white transition-colors">
                  Contacto
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Aviso de privacidad
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Legal */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs">
          <p>
            © {new Date().getFullYear()} AlphaVet Hospital Veterinario. Todos los
            derechos reservados.
          </p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">
              Términos y Condiciones
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Política de Privacidad
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
