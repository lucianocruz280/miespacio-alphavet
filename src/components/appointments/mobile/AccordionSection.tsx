type AccordionSectionProps = {
  title: string
  isOpen: boolean
  summary?: string
  onEdit?: () => void
  children: React.ReactNode
}

const AccordionSection = ({
  title,
  isOpen,
  summary,
  onEdit,
  children,
}: AccordionSectionProps) => {
  return (
    <div className="border border-slate-200 rounded-xl overflow-hidden">

      <div className="flex items-center justify-between p-4 bg-slate-50">
        <div>
          <h3 className="text-sm font-medium text-slate-900">
            {title}
          </h3>
          {summary && !isOpen && (
            <p className="text-xs text-slate-500 mt-1">
              {summary}
            </p>
          )}
        </div>

        {!isOpen && onEdit && (
          <button
            type="button"
            onClick={onEdit}
            className="text-xs font-medium text-blue-600"
          >
            Editar
          </button>
        )}
      </div>

      {isOpen && (
        <div className="p-4 bg-white">
          {children}
        </div>
      )}
    </div>
  )
}

export default AccordionSection
