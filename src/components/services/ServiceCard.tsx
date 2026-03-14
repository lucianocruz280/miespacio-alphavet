import { LucideIcon } from "lucide-react"
import { useRouter } from "next/router"

type Props = {
  title: string
  description: string
  duration: string
  code: "HOSPITAL" | "ESTETICA" | "FARMACIA" | "CREMATORIO" | "ECOMMERCE"
  price: string
  icon: LucideIcon
  disabled?: boolean
}

export default function ServiceCard({
  title,
  description,
  duration,
  code,
  price,
  icon: Icon,
  disabled = false,
}: Props) {

  const router = useRouter()

  const handleClick = () => {
    if (disabled) return
    router.push(`/appointments?code=${code}`)
  }

  return (
    <button
      disabled={disabled}
      onClick={handleClick}
      className={`group flex flex-col p-4 md:p-6 border rounded-xl text-left transition-all
      ${
        disabled
          ? "bg-slate-100 border-slate-200 cursor-not-allowed opacity-60"
          : "bg-white border-slate-200 hover:border-blue-400 hover:shadow-md cursor-pointer"
      }`}
    >
      <div className="flex gap-4 mb-4">

        <div
          className={`w-12 h-12 rounded-lg flex items-center justify-center
          ${
            disabled
              ? "bg-slate-200"
              : "bg-blue-50 group-hover:bg-blue-100"
          }`}
        >
          <Icon
            className={`w-6 h-6 ${
              disabled ? "text-slate-400" : "text-blue-600"
            }`}
          />
        </div>

        <div>
          <h3
            className={`text-base md:text-lg font-medium ${
              disabled ? "text-slate-400" : "text-slate-900"
            }`}
          >
            {title}
          </h3>

          <p className="text-sm text-slate-500">
            {description}
          </p>
        </div>
      </div>

      <div className="mt-auto pt-4 flex justify-between text-sm border-t border-slate-50">
        <span className="text-slate-400">
          Duración: {duration}
        </span>

        <span
          className={`font-medium ${
            disabled ? "text-slate-400" : "text-slate-900"
          }`}
        >
          desde {price}
        </span>
      </div>
    </button>
  )
}
