import { useEffect, useMemo, useState } from "react"
import { formatISO, todayISO } from "@/lib/dates"

type CalendarSelectorProps = {
  selectedDate?: string
  onSelect: (date: string) => void
}

const DAYS = ["LU", "MA", "MI", "JU", "VI", "SA", "DO"]

const CalendarSelector = ({ selectedDate, onSelect }: CalendarSelectorProps) => {
  const today = todayISO()

  const [currentMonth, setCurrentMonth] = useState(() => {
    const d = new Date()
    d.setDate(1)
    return d
  })

  useEffect(() => {
    if (!selectedDate) {
      onSelect(today)
    }
  }, [selectedDate, today, onSelect])

  const daysInMonth = useMemo(() => {
    const year = currentMonth.getFullYear()
    const month = currentMonth.getMonth()

    const lastDay = new Date(year, month + 1, 0)
    const days = []

    for (let i = 1; i <= lastDay.getDate(); i++) {
      const date = new Date(year, month, i)
      const iso = formatISO(date)

      days.push({
        iso,
        label: i,
        disabled: iso < today,
      })
    }

    return days
  }, [currentMonth, today])

  const monthLabel = currentMonth.toLocaleDateString("es-MX", {
    month: "long",
    year: "numeric",
  })

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-medium text-slate-900 capitalize">
          {monthLabel}
        </h3>

        <div className="flex gap-2">
          <button
            onClick={() =>
              setCurrentMonth(
                new Date(
                  currentMonth.getFullYear(),
                  currentMonth.getMonth() - 1,
                  1
                )
              )
            }
            className="p-1 text-slate-400 hover:bg-slate-50 rounded-lg"
          >
            ‹
          </button>

          <button
            onClick={() =>
              setCurrentMonth(
                new Date(
                  currentMonth.getFullYear(),
                  currentMonth.getMonth() + 1,
                  1
                )
              )
            }
            className="p-1 text-slate-400 hover:bg-slate-50 rounded-lg"
          >
            ›
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-1 text-center text-sm mb-2">
        {DAYS.map((d) => (
          <span key={d} className="text-xs text-slate-400 font-medium py-2">
            {d}
          </span>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-2">
        {daysInMonth.map((d) => {
          const isSelected = selectedDate === d.iso

          return (
            <button
              key={d.iso}
              disabled={d.disabled}
              onClick={() => !d.disabled && onSelect(d.iso)}
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
