import Link from "next/link"
import { LucideIcon, ChevronRight } from "lucide-react"

type SidebarItemProps = {
  label: string
  icon?: LucideIcon
  href?: string
}

const SidebarItem = ({ label, icon: Icon, href }: SidebarItemProps) => {
  const Content = (
    <>
      {Icon ? (
        <Icon className="w-4 h-4 text-slate-400 group-hover:text-blue-500 transition-colors" />
      ) : (
        <span className="w-2 h-2 rounded-full bg-slate-300" />
      )}

      <span className="font-medium">{label}</span>

      <ChevronRight className="w-4 h-4 ml-auto text-slate-300 group-hover:text-slate-400 transition-colors" />
    </>
  )

  const baseClasses =
    "group w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-all"

  if (href) {
    return (
      <Link href={href} className={baseClasses}>
        {Content}
      </Link>
    )
  }

  return (
    <button className={baseClasses}>
      {Content}
    </button>
  )
}

export default SidebarItem
