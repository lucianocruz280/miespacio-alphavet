import Button from "@/components/ui/Button"
import { AppointmentDraft } from "@/types/appointments"
import { Icon } from "@iconify/react"
import ClinicConfirmationView from "../ClinicConfirmationView"
import { useState } from "react"
import CardPaymentForm from "../cards/CardPaymentForm"


type StepPaymentProps = {
    draft: AppointmentDraft
    onChange: (patch: Partial<AppointmentDraft>) => void
    onPrev: () => void
    onConfirm: () => void
}

const StepPayment = ({
    draft,
    onChange,
    onPrev,
    onConfirm,
}: StepPaymentProps) => {
    const [view, setView] = useState<"FORM" | "CONFIRMED">("FORM")
    const [loading, setLoading] = useState(false)

    const handleConfirm = async () => {
        setLoading(true)

        await onConfirm()

        setLoading(false)
        setView("CONFIRMED")
    }

    if (view === "CONFIRMED" && draft.paymentMethod === "CLINIC") {
        return (
            <ClinicConfirmationView
                draft={draft}
                onFinish={() => {
                    console.log("go to appointments")
                }}
            />
        )
    }


    if (view === "CONFIRMED" && draft.paymentMethod === "CARD") {

        return (
            <CardPaymentForm
                onValidSubmit={handleConfirm}
            />
        )
    }


    return (
        <section className="space-y-8">

            <div>
                <h1 className="text-2xl font-semibold text-slate-900 tracking-tight mb-2">
                    Pago y Confirmación
                </h1>
                <p className="text-slate-500">
                    Selecciona cómo deseas pagar tu cita.
                </p>
            </div>

            <div className="space-y-4">
                <label className="block text-sm font-medium text-slate-900">
                    Método de pago
                </label>

                <div className="space-y-3">

                    <button
                        type="button"
                        onClick={() => onChange({ paymentMethod: "CLINIC" })}
                        className={[
                            "w-full p-4 rounded-xl border flex items-center justify-between transition-all",
                            draft.paymentMethod === "CLINIC"
                                ? "border-blue-600 bg-blue-50"
                                : "border-slate-200 bg-white hover:border-slate-400",
                        ].join(" ")}
                    >
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-white border border-slate-100 flex items-center justify-center">
                                <Icon icon="lucide:store" width={20} />
                            </div>

                            <div className="text-left">
                                <div className="font-medium text-slate-900">
                                    Pagar en clínica
                                </div>
                                <div className="text-xs text-slate-500">
                                    Efectivo o tarjeta al llegar
                                </div>
                            </div>
                        </div>

                        <Icon
                            icon={
                                draft.paymentMethod === "CLINIC"
                                    ? "lucide:circle-dot"
                                    : "lucide:circle"
                            }
                            width={20}
                            className={
                                draft.paymentMethod === "CLINIC"
                                    ? "text-blue-600"
                                    : "text-slate-300"
                            }
                        />
                    </button>
                    <button
                        type="button"
                        onClick={() => onChange({ paymentMethod: "CARD" })}
                        className={[
                            "w-full p-4 rounded-xl border flex items-center justify-between transition-all",
                            draft.paymentMethod === "CARD"
                                ? "border-blue-600 bg-blue-50"
                                : "border-slate-200 bg-white hover:border-slate-400",
                        ].join(" ")}
                    >
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-center">
                                <Icon icon="lucide:credit-card" width={20} />
                            </div>

                            <div className="text-left">
                                <div className="font-medium text-slate-900">
                                    Tarjeta de crédito / débito
                                </div>
                                <div className="text-xs text-slate-500">
                                    Pago seguro en línea
                                </div>
                            </div>
                        </div>

                        <Icon
                            icon={
                                draft.paymentMethod === "CARD"
                                    ? "lucide:circle-dot"
                                    : "lucide:circle"
                            }
                            width={20}
                            className={
                                draft.paymentMethod === "CARD"
                                    ? "text-blue-600"
                                    : "text-slate-300"
                            }
                        />
                    </button>

                </div>
            </div>

            <div className="pt-6 border-t border-slate-100 flex justify-between items-center">
                <button
                    type="button"
                    onClick={onPrev}
                    className="text-slate-500 hover:text-slate-900 font-medium px-4 py-2 rounded-lg
            hover:bg-slate-100 transition-all"
                >
                    Atrás
                </button>

                <Button
                    disabled={!draft.paymentMethod || loading}
                    onClick={handleConfirm}
                >
                    {loading ? "Confirmando..." : "Confirmar cita"}
                </Button>
            </div>

        </section>
    )
}

export default StepPayment
