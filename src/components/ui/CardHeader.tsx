import clsx from "clsx"

type CardHeaderProps = {
  title: string
  right?: React.ReactNode
  className?: string
}

const CardHeader = ({ title, right, className }: CardHeaderProps) => {
  return (
    <div
      className={clsx(
        "px-6 py-5 border-b border-slate-100 flex items-center justify-between",
        className
      )}
    >
      <h2 className="text-base font-semibold tracking-tight text-slate-900">
        {title}
      </h2>
      {right}
    </div>
  )
}

export default CardHeader
