import Button from "@/components/ui/Button"
import { CheckCircle } from "lucide-react"
import { useTranslation } from "react-i18next"

type ClinicConfirmationViewProps = {
  draft: {
    petId?: string
    branchId?: string
    serviceType?: string
    date?: string
    time?: string
    vetId?: string
  }
  onFinish: () => void
}

const ClinicConfirmationView = ({
  draft,
  onFinish,
}: ClinicConfirmationViewProps) => {
  const { t } = useTranslation('common')
  return (
    <section className="max-w-3xl mx-auto">

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8 text-center space-y-6">
        <div className="mx-auto w-14 h-14 rounded-full bg-emerald-100 flex items-center justify-center">
          <CheckCircle className="w-7 h-7 text-emerald-600" />
        </div>

        <div>
          <h1 className="text-2xl font-semibold text-slate-900">
            {t('appointments.clinicConfirmation.title')}
          </h1>
          <p className="text-slate-500 mt-1">
            {t('appointments.clinicConfirmation.subtitle')}
          </p>
        </div>

        <div className="bg-slate-50 rounded-xl p-5 text-left space-y-3 text-sm">

          <div className="flex justify-between">
            <span className="text-slate-500">{t('appointments.clinicConfirmation.petLabel')}</span>
            <span className="font-medium text-slate-900">
              {draft.petId || "—"}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-slate-500">{t('appointments.clinicConfirmation.serviceLabel')}</span>
            <span className="font-medium text-slate-900">
              {draft.serviceType || "—"}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-slate-500">{t('appointments.clinicConfirmation.branchLabel')}</span>
            <span className="font-medium text-slate-900">
              {draft.branchId || "—"}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-slate-500">{t('appointments.clinicConfirmation.dateLabel')}</span>
            <span className="font-medium text-blue-600">
              {draft.date || "—"}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-slate-500">{t('appointments.clinicConfirmation.timeLabel')}</span>
            <span className="font-medium text-blue-600">
              {draft.time || "—"}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-slate-500">{t('appointments.clinicConfirmation.vetLabel')}</span>
            <span className="font-medium text-slate-900">
              {draft.vetId || t('appointments.clinicConfirmation.anyVet')}
            </span>
          </div>
        </div>

        <p className="text-sm text-slate-400">
          {t('appointments.clinicConfirmation.reminderText')}
        </p>

 
        <div className="pt-4">
          <Button onClick={onFinish}>
            {t('appointments.clinicConfirmation.viewAppointmentsBtn')}
          </Button>
        </div>
      </div>
    </section>
  )
}

export default ClinicConfirmationView
