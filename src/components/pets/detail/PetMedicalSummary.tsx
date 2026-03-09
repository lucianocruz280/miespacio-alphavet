import { ShieldCheck, CalendarCheck, AlertCircle } from "lucide-react"

type PetMedicalSummaryProps = {
  vaccinesUpToDate?: boolean
  lastVisit?: string
  allergies?: string[]
  notes?: string
}

const PetMedicalSummary = ({
  vaccinesUpToDate,
  lastVisit,
  allergies,
  notes,
}: PetMedicalSummaryProps) => {

  const formattedDate = lastVisit
    ? new Date(lastVisit).toLocaleDateString("es-MX", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
    : null

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden flex flex-col">

      <div className="px-6 py-5 border-b border-slate-100">
        <h2 className="text-base font-semibold text-slate-900">
          Estado de salud
        </h2>
      </div>

      <div className="p-6 space-y-6 flex-1">

        {/* Vacunas */}
        <StatusItem
          title="Vacunas"
          description={
            vaccinesUpToDate === undefined
              ? "Sin registro"
              : vaccinesUpToDate
              ? "Al día"
              : "Pendientes"
          }
          icon={<ShieldCheck className="w-4 h-4 text-green-600" />}
          bg="bg-green-50 border-green-100"
        />

        {/* Última visita */}
        <StatusItem
          title="Última visita"
          description={formattedDate || "Sin visitas registradas"}
          icon={<CalendarCheck className="w-4 h-4 text-blue-600" />}
          bg="bg-blue-50 border-blue-100"
        />

        {/* Alergias */}
        <StatusItem
          title="Alergias"
          description={
            allergies && allergies.length > 0
              ? allergies.join(", ")
              : "Sin alergias registradas"
          }
          icon={<AlertCircle className="w-4 h-4 text-amber-600" />}
          bg="bg-amber-50 border-amber-100"
        />

        {/* Notas */}
        {notes && (
          <div>
            <p className="text-xs font-medium text-slate-400 uppercase tracking-wide mb-2">
              Notas
            </p>

            <p className="text-sm text-slate-600 bg-slate-50 p-3 rounded-lg border border-slate-100">
              {notes}
            </p>
          </div>
        )}

      </div>

    </div>
  )
}

const StatusItem = ({
  title,
  description,
  icon,
  bg,
}: {
  title: string
  description: string
  icon: React.ReactNode
  bg: string
}) => {

  return (
    <div className="flex items-start gap-3">

      <div
        className={`mt-0.5 w-8 h-8 rounded-lg flex items-center justify-center shrink-0 border ${bg}`}
      >
        {icon}
      </div>

      <div>
        <p className="text-sm font-medium text-slate-900">
          {title}
        </p>

        <p className="text-xs text-slate-500">
          {description}
        </p>
      </div>

    </div>
  )
}

export default PetMedicalSummary