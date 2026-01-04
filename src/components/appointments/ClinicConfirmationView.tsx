import Button from "@/components/ui/Button"
import { CheckCircle } from "lucide-react"

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
  return (
    <section className="max-w-3xl mx-auto">

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8 text-center space-y-6">
        <div className="mx-auto w-14 h-14 rounded-full bg-emerald-100 flex items-center justify-center">
          <CheckCircle className="w-7 h-7 text-emerald-600" />
        </div>

        <div>
          <h1 className="text-2xl font-semibold text-slate-900">
            ¡Cita confirmada!
          </h1>
          <p className="text-slate-500 mt-1">
            El pago se realizará directamente en la clínica.
          </p>
        </div>

        <div className="bg-slate-50 rounded-xl p-5 text-left space-y-3 text-sm">

          <div className="flex justify-between">
            <span className="text-slate-500">Mascota</span>
            <span className="font-medium text-slate-900">
              {draft.petId || "—"}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-slate-500">Servicio</span>
            <span className="font-medium text-slate-900">
              {draft.serviceType || "—"}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-slate-500">Sucursal</span>
            <span className="font-medium text-slate-900">
              {draft.branchId || "—"}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-slate-500">Fecha</span>
            <span className="font-medium text-blue-600">
              {draft.date || "—"}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-slate-500">Hora</span>
            <span className="font-medium text-blue-600">
              {draft.time || "—"}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-slate-500">Veterinario</span>
            <span className="font-medium text-slate-900">
              {draft.vetId || "Cualquiera disponible"}
            </span>
          </div>
        </div>

        <p className="text-sm text-slate-400">
          Te enviaremos un recordatorio antes de tu cita.
        </p>

 
        <div className="pt-4">
          <Button onClick={onFinish}>
            Ver mis citas
          </Button>
        </div>
      </div>
    </section>
  )
}

export default ClinicConfirmationView
