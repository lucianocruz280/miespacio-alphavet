import CalendarSelector from "../CalendarSelector"
import TimeSlotSelector from "../TimeSlotSelector"
import VeterinarianSelector from "../VeterinarianSelector"
import Button from "@/components/ui/Button"
import { AppointmentDraft } from "@/types/appointments"
import { useTranslation } from "react-i18next"
import useAxios from "@/hooks/useAxios"

type DoctorResponse = {
  user: {
    id: string
    name: string
    avatarUrl?: string
  }
}

type StepScheduleProps = {
  draft: AppointmentDraft
  onChange: (patch: Partial<AppointmentDraft>) => void
  onNext: () => void
  onPrev: () => void
}

const StepSchedule = ({
  draft,
  onChange,
  onNext,
  onPrev,
}: StepScheduleProps) => {
  const { t } = useTranslation('common')
  const canContinue = !!draft.date && !!draft.time

  const { data: doctors } = useAxios<DoctorResponse[]>(
    {
      method: "get",
      url: `branches/${draft.branchId}/doctors`,
      skip: !draft.branchId
    },
    [draft.branchId]
  )

  const availableVets = doctors?.map((doc: DoctorResponse) => ({
    id: doc.user.id,
    name: doc.user.name || "Doctor",
    avatarUrl: doc.user.avatarUrl
  })) ?? []

  const handleVetSelect = (vetId?: string) => {
    onChange({
      vetId,
      time: undefined
    })
  }

  return (
    <section className="space-y-10">

      <div>
        <h1 className="text-2xl font-semibold text-slate-900">
          {t('appointments.schedule.title')}
        </h1>
        <p className="text-slate-500 mt-1">
          {t('appointments.schedule.subtitle')}
        </p>
      </div>

      {/* ================= DOCTOR ================= */}

      <VeterinarianSelector
        vets={availableVets}
        selectedVetId={draft.vetId}
        onSelect={handleVetSelect}
      />

      {/* ================= MOBILE ================= */}

      <div className="block md:hidden space-y-4">

        <details open={!draft.date} className="bg-white rounded-xl border">
          <summary className="cursor-pointer px-4 py-3 font-medium">
            {t('appointments.schedule.dateLabel')}
            {draft.date && (
              <span className="ml-2 text-sm text-blue-600">
                {draft.date} · {t('appointments.schedule.editBtn')}
              </span>
            )}
          </summary>

          <div className="p-4">
            <CalendarSelector
              selectedDate={draft.date}
              onSelect={(date) => {
                onChange({ date, time: undefined })
              }}
            />
          </div>
        </details>

        {draft.date && (
          <details open={!draft.time} className="bg-white rounded-xl border">
            <summary className="cursor-pointer px-4 py-3 font-medium">
              {t('appointments.schedule.timeLabel')}
              {draft.time && (
                <span className="ml-2 text-sm text-blue-600">
                  {draft.time} · {t('appointments.schedule.editBtn')}
                </span>
              )}
            </summary>

            <div className="p-4">
              <TimeSlotSelector
                branchId={draft.branchId!}
                date={draft.date}
                veterinarianId={draft.vetId}
                selectedTime={draft.time}
                onSelect={(time) => onChange({ time })}
              />
            </div>
          </details>
        )}

      </div>

      {/* ================= DESKTOP ================= */}

      <div className="hidden md:grid md:grid-cols-2 gap-8">

        <CalendarSelector
          selectedDate={draft.date}
          onSelect={(date) => {
            onChange({ date, time: undefined })
          }}
        />

        {draft.date && (
          <TimeSlotSelector
            branchId={draft.branchId!}
            date={draft.date}
            veterinarianId={draft.vetId}
            selectedTime={draft.time}
            onSelect={(time) => onChange({ time })}
          />
        )}

      </div>

      {/* ================= FOOTER ================= */}

      <div className="pt-6 border-t border-slate-100 flex justify-between">
        <Button variant="ghost" onClick={onPrev}>
          {t('appointments.schedule.backBtn')}
        </Button>

        <Button
          disabled={!canContinue}
          onClick={onNext}
        >
          {t('appointments.schedule.continueBtn')}
        </Button>
      </div>

    </section>
  )
}

export default StepSchedule