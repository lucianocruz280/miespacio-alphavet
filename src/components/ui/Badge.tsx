import clsx from "clsx"

type BadgeVariant = "neutral" | "success" | "warning"

type BadgeProps = {
  children: React.ReactNode
  variant?: BadgeVariant
}

const Badge = ({ children, variant = "neutral" }: BadgeProps) => {
  const variants = {
    neutral: "bg-slate-100 text-slate-600 border-slate-200",
    success: "bg-success-50 text-success-600 border-success-50",
    warning: "bg-warning-50 text-warning-600 border-warning-50",
  }

  return (
    <span
      className={clsx(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border",
        variants[variant]
      )}
    >
      {children}
    </span>
  )
}

export default Badge
