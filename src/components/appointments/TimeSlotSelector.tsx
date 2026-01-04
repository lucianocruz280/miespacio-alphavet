type TimeSlotSelectorProps = {
  date: string
  selectedTime?: string
  onSelect: (time: string) => void
}

const TIMES = [
  "09:00 AM",
  "09:30 AM",
  "10:00 AM",
  "10:30 AM",
  "11:00 AM",
]

const TimeSlotSelector = ({
  selectedTime,
  onSelect,
}: TimeSlotSelectorProps) => {
  return (
    <div>
      <h3 className="text-sm font-medium text-slate-900 mb-4">
        Horarios disponibles
      </h3>

      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
        {TIMES.map((time) => {
          const isSelected = selectedTime === time

          return (
            <button
              key={time}
              onClick={() => onSelect(time)}
              className={[
                "py-2 px-1 rounded-lg text-sm border transition-all",
                isSelected
                  ? "border-blue-600 bg-blue-50 text-blue-700 font-medium"
                  : "border-slate-200 bg-white text-slate-600 hover:border-slate-400",
              ].join(" ")}
            >
              {time}
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default TimeSlotSelector
