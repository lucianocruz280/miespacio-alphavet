import CalendarSelector from "../CalendarSelector"
import TimeSlotSelector from "../TimeSlotSelector"
import Button from "@/components/ui/Button"
import VeterinarianSelector from "../VeterinarianSelector"

type AppointmentDraft = {
  date?: string
  time?: string
  vetId?: string
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
  const canContinue = !!draft.date && !!draft.time

  return (
    <section className="space-y-10">

      <div>
        <h1 className="text-2xl font-semibold text-slate-900">
          Fecha y horario
        </h1>
        <p className="text-slate-500 mt-1">
          Elige el día y la hora que mejor te convenga.
        </p>
      </div>


      <div className="block md:hidden space-y-4">


        <details open={!draft.date} className="bg-white rounded-xl border">
          <summary className="cursor-pointer px-4 py-3 font-medium">
            Fecha
            {draft.date && (
              <span className="ml-2 text-sm text-blue-600">
                {draft.date} · Editar
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
              Horario
              {draft.time && (
                <span className="ml-2 text-sm text-blue-600">
                  {draft.time} · Editar
                </span>
              )}
            </summary>

            <div className="p-4">
              <TimeSlotSelector
                date={draft.date}
                selectedTime={draft.time}
                onSelect={(time) => onChange({ time })}
              />
            </div>
          </details>
        )}
      </div>

      <div className="hidden md:grid md:grid-cols-2 gap-8">
        <CalendarSelector
          selectedDate={draft.date}
          onSelect={(date) => {
            onChange({ date, time: undefined })
          }}
        />

        {draft.date && (
          <TimeSlotSelector
            date={draft.date}
            selectedTime={draft.time}
            onSelect={(time) => onChange({ time })}
          />
        )}


      </div>
      <VeterinarianSelector
        vets={[
          {
            id: "any",
            name: "Dr. Roberto Sánchez",
            specialty: "Medicina General",
            avatarUrl:
              "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=100&q=80",
          },
        ]}
        selectedVetId={draft.vetId}
        onSelect={(vetId) => onChange({ vetId })}
      />

      <div className="pt-6 border-t border-slate-100 flex justify-between">
        <Button variant="ghost" onClick={onPrev}>
          Atrás
        </Button>

        <Button
          disabled={!canContinue}
          onClick={onNext}
        >
          Continuar
        </Button>
      </div>

    </section>
  )
}

export default StepSchedule
