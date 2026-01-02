type Props = {
  selectedTime: string | null
  onSelect: (time: string) => void
}

const slots = [
  { time: "09:00", available: true },
  { time: "09:30", available: true },
  { time: "10:00", available: false },
  { time: "10:30", available: true },
  { time: "11:00", available: true },
]

const TimeSlotSelector = ({ selectedTime, onSelect }: Props) => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
      <h2 className="font-medium text-slate-900 mb-4">
        Horarios disponibles
      </h2>

      <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
        {slots.map((slot) => {
          const isSelected = selectedTime === slot.time

          return (
            <button
              key={slot.time}
              type="button"
              disabled={!slot.available}
              onClick={() => onSelect(slot.time)}
              className={`
                py-2 rounded-lg text-sm font-medium border transition
                ${
                  !slot.available
                    ? "bg-slate-100 text-slate-400 cursor-not-allowed"
                    : isSelected
                    ? "bg-blue-600 text-white border-blue-600"
                    : "hover:border-blue-400"
                }
              `}
            >
              {slot.time}
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default TimeSlotSelector
