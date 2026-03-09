import clsx from "clsx"

type SelectOption = {
  value: string
  label: string
}

type SelectProps = React.SelectHTMLAttributes<HTMLSelectElement> & {
  options: SelectOption[]
}

const Select = ({
  options,
  className,
  disabled,
  value,
  onChange,
  ...props
}: SelectProps) => {

  const isPlaceholder = !value || value === ""

  return (
    <select
      value={value}
      onChange={onChange}
      disabled={disabled}
      className={clsx(
        "w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm",
        isPlaceholder ? "text-slate-400" : "text-slate-900",
        "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 focus:border-primary-500",
        "transition",
        disabled && "bg-slate-100 cursor-not-allowed opacity-60",
        className
      )}
      {...props}
    >
      <option value="" disabled hidden>
        Selecciona...
      </option>

      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  )
}

export default Select