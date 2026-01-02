type Props = {
  selectedDate: string | null
  onSelect: (date: string) => void
}

const days = Array.from({ length: 31 }, (_, i) => i + 1)

const CalendarSelector = ({ selectedDate, onSelect }: Props) => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
      <div className="p-6 border-b border-slate-100 flex items-center justify-between">
        <h2 className="font-medium text-slate-900">
          Selecciona una fecha
        </h2>
      </div>

      <div className="p-6">
        <div className="grid grid-cols-7 gap-2 text-sm">
          {days.map((day) => {
            const date = `2024-01-${String(day).padStart(2, "0")}`
            const isSelected = selectedDate === date

            return (
              <button
                key={day}
                type="button"
                onClick={() => onSelect(date)}
                className={`h-10 rounded-lg flex items-center justify-center transition
                  ${
                    isSelected
                      ? "bg-blue-600 text-white shadow"
                      : "hover:bg-slate-50"
                  }
                `}
              >
                {day}
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default CalendarSelector
