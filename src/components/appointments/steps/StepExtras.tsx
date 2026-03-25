import Button from "@/components/ui/Button"
import { useTranslation } from "react-i18next"

type AppointmentDraft = {
    coupon?: string
    notes?: string
}

type StepExtrasProps = {
    draft: AppointmentDraft
    onChange: (patch: Partial<AppointmentDraft>) => void
    onNext: () => void
    onPrev: () => void
}

const StepExtras = ({
    draft,
    onChange,
    onNext,
    onPrev,
}: StepExtrasProps) => {
    const { t } = useTranslation('common')
    return (
        <section className="space-y-8">

            <div>
                <h1 className="text-2xl font-semibold text-slate-900 tracking-tight mb-2">
                    {t('appointments.extrasStep.title')}
                </h1>
                <p className="text-slate-500">
                    {t('appointments.extrasStep.subtitle')}
                </p>
            </div>


            <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-4">
                <label className="block text-sm font-medium text-slate-900">
                    {t('appointments.extrasStep.promoCode')}
                </label>

                <div className="flex gap-2">
                    <input
                        type="text"
                        placeholder={t('appointments.extrasStep.promoPlaceholder')}
                        value={draft.coupon ?? ""}
                        onChange={(e) => onChange({ coupon: e.target.value })}
                        className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm
              focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                    />

                    <Button variant="secondary">
                        {t('appointments.extrasStep.applyBtn')}
                    </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                    {/* <button
                        type="button"
                        onClick={() => onChange({ coupon: "BIENVENIDA10" })}
                        className="text-xs bg-green-50 text-green-700 px-3 py-1.5 rounded-full border border-green-100
              flex items-center gap-1 hover:bg-green-100 transition-colors"
                    >
                        <Icon icon="lucide:tag" width={12} />
                        10% OFF Primera Visita
                    </button> */}
                </div>
            </div>
            <div className="space-y-2">
                <label className="block text-sm font-medium text-slate-900">
                    {t('appointments.extrasStep.notes')}
                </label>

                <textarea
                    rows={4}
                    value={draft.notes ?? ""}
                    onChange={(e) => onChange({ notes: e.target.value })}
                    placeholder={t('appointments.extrasStep.notesPlaceholder')}
                    className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm resize-none
            focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                />
            </div>


            <div className="pt-6 border-t border-slate-100 flex justify-between items-center">
                <button
                    type="button"
                    onClick={onPrev}
                    className="text-slate-500 hover:text-slate-900 font-medium px-4 py-2 rounded-lg
            hover:bg-slate-100 transition-all"
                >
                    {t('appointments.extrasStep.backBtn')}
                </button>

                <Button onClick={onNext}>
                    {t('appointments.extrasStep.continueBtn')}
                </Button>
            </div>

        </section>
    )
}

export default StepExtras
