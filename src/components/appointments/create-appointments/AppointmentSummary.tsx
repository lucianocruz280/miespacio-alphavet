import { Calendar, Clock, ClipboardCheck } from "lucide-react"

type Props = {
  petName?: string
  petSpecies?: string
  date?: string | null
  time?: string | null
  type?: string
  reason?: string
  onConfirm: () => void
  onCancel: () => void
}

const formatDate = (date?: string | null) => {
  if (!date) return "—"
  return new Date(date).toLocaleDateString("es-MX", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  })
}

const AppointmentSummary = ({
  petName,
  petSpecies,
  date,
  time,
  type,
  reason,
  onConfirm,
  onCancel,
}: Props) => {
  const isReady = petName && date && time

  return (
    <div className="bg-slate-900 rounded-2xl shadow-xl p-6 text-white sticky top-6">
      <h3 className="font-semibold text-lg mb-6 flex items-center gap-2">
        <ClipboardCheck className="w-5 h-5 text-blue-400" />
        Resumen
      </h3>

      <div className="space-y-4 text-sm">
        <div className="flex justify-between border-b border-slate-800 pb-3">
          <span className="text-slate-400">Paciente</span>
          <span className="font-medium">
            {petName || "—"}
            {petSpecies && (
              <span className="ml-2 text-xs px-2 py-0.5 rounded bg-slate-800">
                {petSpecies}
              </span>
            )}
          </span>
        </div>

        <div className="flex justify-between border-b border-slate-800 pb-3">
          <span className="text-slate-400 flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            Fecha
          </span>
          <span className="font-medium text-blue-300">
            {formatDate(date)}
          </span>
        </div>

        <div className="flex justify-between border-b border-slate-800 pb-3">
          <span className="text-slate-400 flex items-center gap-1">
            <Clock className="w-4 h-4" />
            Hora
          </span>
          <span className="font-medium">{time || "—"}</span>
        </div>

        <div className="flex justify-between border-b border-slate-800 pb-3">
          <span className="text-slate-400">Tipo</span>
          <span className="font-medium">{type}</span>
        </div>

        <div className="flex justify-between pt-1">
          <span className="text-slate-400">Motivo</span>
          <span className="font-medium text-slate-300 italic max-w-[150px] truncate">
            {reason || "Sin especificar"}
          </span>
        </div>
      </div>

      <div className="mt-8 space-y-3">
        <button
          disabled={!isReady}
          onClick={onConfirm}
          className={`w-full py-3 rounded-xl font-medium transition
            ${
              isReady
                ? "bg-blue-600 hover:bg-blue-500"
                : "bg-slate-700 cursor-not-allowed"
            }
          `}
        >
          Confirmar cita
        </button>

        <button
          onClick={onCancel}
          className="w-full py-3 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition"
        >
          Cancelar
        </button>
      </div>
    </div>
  )
}

export default AppointmentSummary
