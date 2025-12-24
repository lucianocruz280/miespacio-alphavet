type FieldProps = {
  label: string
  required?: boolean
  hint?: string
  children: React.ReactNode
}

const Field = ({ label, required, hint, children }: FieldProps) => {
  return (
    <label className="block space-y-2">
      <div className="flex items-center justify-between gap-2">
        <span className="text-sm font-medium text-slate-700">
          {label}
          {required && (
            <span className="ml-1 text-xs text-slate-400">(requerido)</span>
          )}
        </span>

        {hint && (
          <span className="text-xs text-slate-400 text-right">
            {hint}
          </span>
        )}
      </div>

      {children}
    </label>
  )
}

export default Field
