import clsx from "clsx"

type InputProps = React.InputHTMLAttributes<HTMLInputElement>

const Input = ({ className, disabled, ...props }: InputProps) => {
  return (
    <input
      {...props}
      disabled={disabled}
      className={clsx(
        "w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900",
        "placeholder:text-slate-400",
        "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 focus:border-primary-500",
        "transition",
        disabled && "bg-slate-100 cursor-not-allowed opacity-60",
        className
      )}
    />
  )
}

export default Input
