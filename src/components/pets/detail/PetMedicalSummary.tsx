import { ShieldCheck, CalendarCheck, AlertCircle } from "lucide-react"
import { useTranslation } from "react-i18next"

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
  const { t } = useTranslation('common')

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
          {t("pets.detail.medicalSummary.title")}
        </h2>
      </div>

      <div className="p-6 space-y-6 flex-1">

        {/* Vacunas */}
        <StatusItem
          title={t("pets.detail.medicalSummary.vaccines.title")}
          description={
            vaccinesUpToDate === undefined
              ? t("pets.detail.medicalSummary.vaccines.noRecord")
              : vaccinesUpToDate
              ? t("pets.detail.medicalSummary.vaccines.upToDate")
              : t("pets.detail.medicalSummary.vaccines.pending")
          }
          icon={<ShieldCheck className="w-4 h-4 text-green-600" />}
          bg="bg-green-50 border-green-100"
        />

        {/* Última visita */}
        <StatusItem
          title={t("pets.detail.medicalSummary.lastVisit.title")}
          description={formattedDate || t("pets.detail.medicalSummary.lastVisit.noVisit")}
          icon={<CalendarCheck className="w-4 h-4 text-blue-600" />}
          bg="bg-blue-50 border-blue-100"
        />

        {/* Alergias */}
        <StatusItem
          title={t("pets.detail.medicalSummary.allergies.title")}
          description={
            allergies && allergies.length > 0
              ? allergies.join(", ")
              : t("pets.detail.medicalSummary.allergies.noAllergies")
          }
          icon={<AlertCircle className="w-4 h-4 text-amber-600" />}
          bg="bg-amber-50 border-amber-100"
        />

        {/* Notas */}
        {notes && (
          <div>
            <p className="text-xs font-medium text-slate-400 uppercase tracking-wide mb-2">
              {t("pets.detail.medicalSummary.notes.title")}
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