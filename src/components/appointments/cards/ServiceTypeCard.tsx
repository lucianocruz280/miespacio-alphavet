import {
  Stethoscope,
  Syringe,
  Scissors,
  Pill,
  Siren,
} from "lucide-react"

const iconMap = {
  stethoscope: Stethoscope,
  syringe: Syringe,
  pill: Pill,
  siren: Siren,
}

type ServiceTypeCardProps = {
  label: string
  icon: keyof typeof iconMap
  selected?: boolean
  onSelect: () => void
}

const ServiceTypeCard = ({
  label,
  icon,
  selected,
  onSelect,
}: ServiceTypeCardProps) => {
  const Icon = iconMap[icon]

  return (
    <button
      type="button"
      onClick={onSelect}
      className={`
        p-4 rounded-xl border cursor-pointer text-center transition-all
        ${selected
          ? "border-blue-600 bg-blue-50 shadow-sm"
          : "border-slate-200 bg-white hover:border-slate-400"}
      `}
    >
      <div
        className={`
          mx-auto w-10 h-10 mb-2 rounded-full flex items-center justify-center
          ${selected
            ? "bg-blue-100 text-blue-600"
            : "bg-slate-100 text-slate-500"}
        `}
      >
        <Icon size={20} />
      </div>

      <span className="text-sm font-medium text-slate-900">
        {label}
      </span>
    </button>
  )
}

export default ServiceTypeCard
