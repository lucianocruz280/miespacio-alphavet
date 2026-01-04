import SidebarItem from "../ui/SidebarItem"
import { PawPrint, LayoutList, Calendar, Home } from "lucide-react"

const SidebarNavigation = () => {
  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-[0_2px_8px_-2px_rgba(0,0,0,0.05)] p-5">
      <h3 className="text-slate-900 font-medium tracking-tight mb-3">
        Mi Panel
      </h3>

      <nav className="space-y-1">
         <SidebarItem icon={Home} label="Inicio" href="/" />
        <SidebarItem icon={PawPrint} label="Mis Mascotas" href="/pets" />
        <SidebarItem icon={LayoutList} label="Mis Servicios" />
        <SidebarItem icon={Calendar} label="Mis Citas" />
      </nav>
    </div>
  )
}

export default SidebarNavigation
