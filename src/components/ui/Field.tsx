type FieldProps = {
  label: string
  required?: boolean
  hint?: string
  error?: string
  children: React.ReactNode
}

const Field = ({ label, required, hint, error, children }: FieldProps) => {
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

      {/* Wrapper con borde */}
      <div
        className={[
          "rounded-lg transition",
          error
            ? "ring-1 ring-red-500"
            : "ring-1 ring-transparent focus-within:ring-primary-500"
        ].join(" ")}
      >
        {children}
      </div>

      {/* Texto de error */}
      {error && (
        <p className="text-sm text-red-600">{error}</p>
      )}
    </label>
  )
}

export default Field

