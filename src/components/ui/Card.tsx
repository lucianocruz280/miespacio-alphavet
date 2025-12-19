import clsx from "clsx"

type CardProps = {
  children: React.ReactNode
  className?: string
}

const Card = ({ children, className }: CardProps) => {
  return (
    <div
      className={clsx(
        "bg-white rounded-2xl border border-slate-200 shadow-sm",
        className
      )}
    >
      {children}
    </div>
  )
}

export default Card
