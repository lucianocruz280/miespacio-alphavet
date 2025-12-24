import clsx from "clsx"

type ButtonVariant =
  | "primary"
  | "secondary"
  | "ghost"
  | "success"
  | "warning"

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant
  fullWidth?: boolean
}

const Button = ({
  children,
  variant = "primary",
  className,
  type = "button",
  disabled = false,
  fullWidth = false,
}: ButtonProps) => {
  const variants: Record<ButtonVariant, string> = {
    primary:
      "bg-primary-600 hover:bg-primary-700 text-white focus:ring-primary-500",

    secondary:
      "bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 focus:ring-slate-300",

    ghost:
      "bg-transparent text-slate-700 hover:bg-slate-100 focus:ring-slate-300",

    success:
      "bg-white border border-emerald-200 text-emerald-700 hover:bg-emerald-50 focus:ring-emerald-300",

    warning:
      "bg-white border border-amber-200 text-amber-700 hover:bg-amber-50 focus:ring-amber-300",
  }

  return (
    <button
      type={type}
      disabled={disabled}
      className={clsx(
        "inline-flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium rounded-lg shadow-sm transition-all cursor-pointer",
        "focus:outline-none focus:ring-2 focus:ring-offset-2",
        disabled && "opacity-50 cursor-not-allowed",
        fullWidth && "w-full",
        variants[variant],
        className
      )}
    >
      {children}
    </button>
  )
}

export default Button
