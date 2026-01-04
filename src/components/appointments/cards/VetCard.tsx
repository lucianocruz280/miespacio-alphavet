type VetCardProps = {
  name: string
  specialty?: string
  selected?: boolean
  onSelect: () => void
}

const VetCard = ({
  name,
  specialty,
  selected,
  onSelect,
}: VetCardProps) => {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={`
        flex items-center gap-3 p-4 rounded-xl border transition-all text-left
        ${selected
          ? "border-blue-600 bg-blue-50"
          : "border-slate-200 bg-white hover:border-slate-400"}
      `}
    >
      <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center">
        👩‍⚕️
      </div>

      <div className="flex-1">
        <div className="font-medium text-slate-900">
          {name}
        </div>
        {specialty && (
          <div className="text-xs text-slate-500">
            {specialty}
          </div>
        )}
      </div>

      {selected && (
        <span className="text-blue-600 text-sm">✔</span>
      )}
    </button>
  )
}

export default VetCard
