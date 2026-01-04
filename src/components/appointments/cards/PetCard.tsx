type PetCardProps = {
  name: string
  breed?: string
  imageUrl?: string
  selected?: boolean
  onSelect: () => void
}

const PetCard = ({
  name,
  breed,
  imageUrl,
  selected,
  onSelect,
}: PetCardProps) => {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={`
        relative flex items-center gap-3 p-4 rounded-xl border transition-all cursor-pointer
        ${selected
          ? "border-blue-600 bg-blue-50 shadow-sm"
          : "border-slate-200 bg-white hover:border-slate-400"}
      `}
    >
      <div className="w-10 h-10 rounded-full bg-slate-200 overflow-hidden shrink-0">
        {imageUrl ? (
          <img src={imageUrl} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-slate-400">
            🐾
          </div>
        )}
      </div>

      <div className="text-left">
        <div className="font-medium text-slate-900">{name}</div>
        {breed && (
          <div className="text-xs text-slate-500">{breed}</div>
        )}
      </div>

      {selected && (
        <span className="absolute top-4 right-4 text-blue-600">
          ✔
        </span>
      )}
    </button>
  )
}

export default PetCard
