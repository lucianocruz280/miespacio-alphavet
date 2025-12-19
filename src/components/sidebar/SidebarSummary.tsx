import { useServiceStore } from "@/store/useServiceStore"

const SidebarSummary = () => {
    const { selectedService } = useServiceStore()

    return (
        <div className="bg-white rounded-xl border border-slate-200 shadow-[0_2px_8px_-2px_rgba(0,0,0,0.05)] p-5">
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-slate-900 font-medium tracking-tight">Resumen</h3>
                <span className="px-2 py-1 rounded text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-100">
                    Seguro y confiable
                </span>
            </div>

            <div className="space-y-4 text-sm">
                <SummaryRow label="Servicio" value={selectedService?.title} />
                <SummaryRow label="Mascota" />
                <SummaryRow label="Fecha y hora" />
                <SummaryRow label="Profesional" />
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100">
                <p className="text-xs text-slate-400">Total estimado</p>
                <p className="text-slate-900 font-semibold text-lg">$0 MXN</p>
                <p className="mt-2 text-xs text-slate-400">
                    El precio puede variar según servicio y sucursal seleccionada.
                </p>
            </div>
        </div>
    )
}

const SummaryRow = ({ label, value }: { label: string; value?: string }) => {
    return (
        <div className="flex justify-between items-center">
            <span className="text-slate-500">{label}</span>
            <div className="flex-1 mx-3 border-b border-dashed border-slate-200" />
            <span className={value ? "text-slate-900" : "text-slate-300"}>
                {value ?? "—"}
            </span>
        </div>
    )
}

export default SidebarSummary
