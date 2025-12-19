type InfoItem = {
  label: string
  value: string
}

type PetInfoCardProps = {
  items: InfoItem[]
}

const PetInfoCard = ({ items }: PetInfoCardProps) => {
  return (
    <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
      <div className="px-6 py-5 border-b border-slate-100">
        <h2 className="text-base font-semibold text-slate-900">
          Información de la mascota
        </h2>
      </div>

      <div className="p-6">
        <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-6">
          {items.map((item) => (
            <div key={item.label} className="space-y-1">
              <dt className="text-xs font-medium text-slate-400 uppercase tracking-wide">
                {item.label}
              </dt>
              <dd className="text-sm font-medium text-slate-900">
                {item.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  )
}

export default PetInfoCard
