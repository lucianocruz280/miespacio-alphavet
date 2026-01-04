import { Calendar, ArrowRight } from "lucide-react"
import { useRouter } from "next/router"

type PetCardProps = {
  name: string
  meta: string
  lastVisit: string
  imageUrl: string
  statusColor?: "emerald" | "amber"
  selectable?: boolean
  selected?: boolean
  onSelect?: () => void
}

const PetCard = ({
  name,
  meta,
  lastVisit,
  imageUrl,
  statusColor,
  selectable = false,
  selected = false,
  onSelect,
}: PetCardProps) => {
  const router = useRouter()
  const handleClick = () => {
    if (selectable && onSelect) {
      onSelect()
      return
    }

    router.push("/pets/id")
  }
  return (
    <button onClick={handleClick} className={`group w-full h-full relative cursor-pointer flex items-start gap-4 p-5 bg-white rounded-xl border border-slate-200 shadow-[0_1px_2px_rgba(0,0,0,0.02)] hover:border-blue-400 hover:shadow-md transition-all text-left ${selected
      ? "border-blue-600 ring-2 ring-blue-200 bg-blue-50"
      : "bg-white border-slate-200 hover:border-blue-400 hover:shadow-md"
      }`}>
      <div className="relative shrink-0">
        <img
          src={imageUrl}
          alt={name}
          className="w-14 h-14 rounded-full object-cover border border-slate-100 bg-slate-100"
        />

        {statusColor && (
          <span className="absolute -bottom-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-white ring-2 ring-white">
            <div
              className={`h-2 w-2 rounded-full bg-${statusColor}-500`}
            />
          </span>
        )}
      </div>

      <div className="flex-1 min-w-0 pt-0.5">
        <h3 className="font-medium text-slate-900 truncate group-hover:text-blue-600 transition-colors">
          {name}
        </h3>

        <p className="text-xs text-slate-500 truncate mb-3">
          {meta}
        </p>

        <div className="flex items-center gap-1.5 text-xs text-slate-400 group-hover:text-slate-500 transition-colors bg-slate-50 w-fit px-2 py-1 rounded-md border border-slate-100">
          <Calendar className="w-3 h-3" />
          <span>Última visita: {lastVisit}</span>
        </div>
      </div>

      <div className="absolute top-5 right-5 text-slate-300 opacity-0 group-hover:opacity-100 transition-opacity">
        <ArrowRight className="w-4 h-4" />
      </div>
    </button>
  )
}

export default PetCard
