
import { useMemo, useState } from "react"
import { useStepper } from "./appointment.stepper"

import StepBaseInfo from "./steps/StepBaseInfo"
import StepSchedule from "./steps/StepSchedule"
import StepExtras from "./steps/StepExtras"
import StepPayment from "./steps/StepPayment"
import { AppointmentDraft } from "@/types/appointments"



const CreateAppointmentView = () => {
    const stepper = useStepper()
    const [draft, setDraft] = useState<AppointmentDraft>({})

    const updateDraft = (patch: Partial<AppointmentDraft>) => {
        setDraft((prev) => ({ ...prev, ...patch }))
    }

    const currentStepNumber = useMemo(() => {
        const idx = stepper.all.findIndex(
            (s) => s.id === stepper.current.id
        )
        return idx >= 0 ? idx + 1 : 1
    }, [stepper.all, stepper.current.id])

    const totalSteps = stepper.all.length
    const progressPct = (currentStepNumber / totalSteps) * 100

    return (
        <main className="max-w-6xl mx-auto p-4 md:p-8 space-y-8">

            <div className="hidden md:flex items-center gap-3">
                <span className="text-sm font-medium text-slate-900">
                    Paso {currentStepNumber} de {totalSteps}
                </span>

                <div className="w-40 h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div
                        className="h-full bg-blue-600 transition-all"
                        style={{ width: `${progressPct}%` }}
                    />
                </div>

                <span className="text-sm text-slate-500">
                    {stepper.current.title}
                </span>
            </div>

            {stepper.when("base", () => (
                <StepBaseInfo
                    draft={draft}
                    onChange={updateDraft}
                    onNext={stepper.next}
                />
            ))}

            {stepper.when("schedule", () => (
                <StepSchedule
                    draft={draft}
                    onChange={updateDraft}
                    onNext={stepper.next}
                    onPrev={stepper.prev}
                />
            ))}

            {stepper.when("extras", () => (
                <StepExtras
                    draft={draft}
                    onChange={updateDraft}
                    onPrev={stepper.prev}
                    onNext={stepper.next}
                />
            ))}

            {stepper.when("payment", () => (
                <StepPayment
                    draft={draft}
                    onChange={updateDraft}
                    onPrev={stepper.prev}
                    onConfirm={() => {
                        console.log("FINAL DRAFT ", draft)

                    }}
                />
            ))}
        </main>
    )
}

export default CreateAppointmentView
