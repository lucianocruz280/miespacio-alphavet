import { ChevronRight } from "lucide-react"

type HistoryItem = {
  dateLabel: string
  dateNumber: string
  title: string
  subtitle: string
}

const PetHistoryPreview = ({ items }: { items: HistoryItem[] }) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
      <div className="px-6 py-5 border-b border-slate-100 flex justify-between">
        <h2 className="text-base font-semibold text-slate-900">
          Historial reciente
        </h2>
        <button className="text-sm font-medium text-blue-600 hover:text-blue-700">
          Ver historial completo
        </button>
      </div>

      <div className="divide-y divide-slate-100">
        {items.map((item, index) => (
          <div
            key={index}
            className="p-4 sm:p-6 flex items-center gap-4 hover:bg-slate-50 transition group cursor-pointer"
          >
            <div className="w-12 h-12 rounded-xl bg-slate-100 flex flex-col items-center justify-center border border-slate-200">
              <span className="text-[10px] uppercase font-bold text-slate-400">
                {item.dateLabel}
              </span>
              <span className="text-sm font-semibold text-slate-900">
                {item.dateNumber}
              </span>
            </div>

            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-medium text-slate-900 truncate">
                {item.title}
              </h3>
              <p className="text-sm text-slate-500 truncate">
                {item.subtitle}
              </p>
            </div>

            <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-slate-400" />
          </div>
        ))}
      </div>
    </div>
  )
}

export default PetHistoryPreview
