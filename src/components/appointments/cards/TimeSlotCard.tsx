type TimeSlotCardProps = {
  time: string
  selected?: boolean
  disabled?: boolean
  onSelect: () => void
}

const TimeSlotCard = ({
  time,
  selected,
  disabled,
  onSelect,
}: TimeSlotCardProps) => {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onSelect}
      className={`
        py-2 px-2 rounded-lg text-sm border transition-all
        ${disabled
          ? "bg-slate-100 text-slate-400 cursor-not-allowed line-through"
          : selected
            ? "border-blue-600 bg-blue-50 text-blue-700 font-medium"
            : "border-slate-200 bg-white hover:border-slate-400"}
      `}
    >
      {time}
    </button>
  )
}

export default TimeSlotCard
