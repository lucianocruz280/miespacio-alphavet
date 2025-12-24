import { Icon } from '@iconify/react'

const Footer = () => {
  return (
    <footer className="bg-slate-50 border-t border-slate-200 py-12">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded bg-slate-900 flex items-center justify-center text-white">
            <Icon icon="lucide:heart-pulse" width={14} />
          </div>
          <span className="text-base font-semibold text-slate-900">
            Alphavet
          </span>
        </div>

        <p className="text-sm text-slate-400 text-center md:text-right">
          © 2023 VetCare. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  )
}

export default Footer
