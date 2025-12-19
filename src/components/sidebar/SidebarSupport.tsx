import { MessageCircle } from "lucide-react"

const SidebarSupport = () => {
  return (
    <div className="flex items-center gap-3 pt-2">
      <img
        src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix"
        className="w-10 h-10 rounded-full border"
      />
      <div className="flex-1">
        <p className="text-sm font-medium text-slate-900">
          Soporte al cliente
        </p>
        <p className="text-xs text-slate-500">
          Respuesta en menos de 5 min
        </p>
      </div>
      <MessageCircle className="w-6 h-6 text-slate-300" />
    </div>
  )
}

export default SidebarSupport
