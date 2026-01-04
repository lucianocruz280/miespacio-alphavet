type BranchStatus = "open" | "closing" | "closed"

type BranchCardProps = {
  id: string
  name: string
  address: string
  status: BranchStatus
  selected?: boolean
  onSelect: () => void
}

const statusConfig: Record<
  BranchStatus,
  { label: string; color: string }
> = {
  open: {
    label: "Abierto ahora",
    color: "text-green-600 bg-green-50",
  },
  closing: {
    label: "Cierra pronto",
    color: "text-yellow-600 bg-yellow-50",
  },
  closed: {
    label: "Cerrado",
    color: "text-slate-500 bg-slate-100",
  },
}

const BranchCard = ({
  name,
  address,
  status,
  selected,
  onSelect,
}: BranchCardProps) => {
  const statusStyle = statusConfig[status]

  return (
    <button
      type="button"
      onClick={onSelect}
      className={`
        relative w-full cursor-pointer text-left p-4 rounded-xl border transition-all
        ${selected
          ? "border-blue-600 bg-blue-50 shadow-sm"
          : "border-slate-200 bg-white hover:border-slate-400"}
      `}
    >
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-medium text-slate-900">
            {name}
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            {address}
          </p>
        </div>

        {selected && (
          <span className="text-blue-600 text-sm">
            ✔
          </span>
        )}
      </div>

      <div
        className={`
          inline-flex items-center gap-2 text-xs font-medium
          px-2 py-1 rounded-full mt-3
          ${statusStyle.color}
        `}
      >
        <span className="w-1.5 h-1.5 rounded-full bg-current" />
        {statusStyle.label}
      </div>
    </button>
  )
}

export default BranchCard
