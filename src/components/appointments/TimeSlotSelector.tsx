import useAxios from "@/hooks/useAxios"

type TimeSlotSelectorProps = {
  date: string
  selectedTime?: string
  onSelect: (time: string) => void
}

type Schedule = {
  success: boolean;
  data: string[]
}

const TimeSlotSelector = ({
  date,
  selectedTime,
  onSelect,
}: TimeSlotSelectorProps) => {
  const { data, loading } = useAxios<Schedule>({
    method: "get",
    url: "/appointments/available-slots",
    params: { date },
    skip: !date,
  }, [date])

  const times: string[] = data?.data ?? []
  console.log(data, date)
  if (loading) {
    return <p className="text-sm text-slate-500">Cargando horarios…</p>
  }

  if (!times.length) {
    return (
      <p className="text-sm text-slate-500">
        No hay horarios disponibles para este día
      </p>
    )
  }

  return (
    <div>
      <h3 className="text-sm font-medium text-slate-900 mb-4">
        Horarios disponibles
      </h3>

      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
        {times.map((time) => {
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
