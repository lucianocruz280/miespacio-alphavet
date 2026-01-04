type CalendarSelectorProps = {
  selectedDate?: string
  onSelect: (date: string) => void
}

const DAYS = ["LU", "MA", "MI", "JU", "VI", "SA", "DO"]

const DAYS_IN_MONTH = [
  { day: "01 Oct", label: 1, disabled: false },
  { day: "02 Oct", label: 2, disabled: false },
  { day: "03 Oct", label: 3, disabled: false },
  { day: "04 Oct", label: 4, disabled: false },
  { day: "05 Oct", label: 5, disabled: false },
  { day: "06 Oct", label: 6, disabled: false },
  { day: "07 Oct", label: 7, disabled: false },
  { day: "08 Oct", label: 8, disabled: false },
  { day: "09 Oct", label: 9, disabled: false },
  { day: "10 Oct", label: 10, disabled: false },
  { day: "11 Oct", label: 11, disabled: true },
]

const CalendarSelector = ({ selectedDate, onSelect }: CalendarSelectorProps) => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">

      <div className="flex items-center justify-between mb-6">
        <h3 className="font-medium text-slate-900">
          Octubre 2023
        </h3>

        <div className="flex gap-2">
          <button className="p-1 text-slate-400 hover:bg-slate-50 rounded-lg">
            ‹
          </button>
          <button className="p-1 text-slate-400 hover:bg-slate-50 rounded-lg">
            ›
          </button>
        </div>
      </div>
      <div className="grid grid-cols-7 gap-1 text-center text-sm mb-2">
        {DAYS.map((d) => (
          <span
            key={d}
            className="text-xs text-slate-400 font-medium py-2"
          >
            {d}
          </span>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-2">
        {DAYS_IN_MONTH.map((d) => {
          const isSelected = selectedDate === d.day

          return (
            <button
              key={d.day}
              disabled={d.disabled}
              onClick={() => !d.disabled && onSelect(d.day)}
              className={[
                "h-10 rounded-lg text-sm transition-all",
                d.disabled
                  ? "text-slate-300 cursor-not-allowed"
                  : "hover:bg-slate-50 text-slate-700",
                isSelected &&
                  "bg-blue-600 text-white font-medium shadow-md shadow-blue-200",
              ].join(" ")}
            >
              {d.label}
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default CalendarSelector
