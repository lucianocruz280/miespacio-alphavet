import { Icon } from "@iconify/react"
import { useTranslation } from "react-i18next"
import Image from "next/image"

type Veterinarian = {
  id: string
  name: string
  specialty?: string
  avatarUrl?: string
}

type VeterinarianSelectorProps = {
  vets: Veterinarian[]
  selectedVetId?: string
  onSelect: (vetId?: string) => void
}

const VeterinarianSelector = ({
  vets,
  selectedVetId,
  onSelect,
}: VeterinarianSelectorProps) => {
  const { t } = useTranslation('common')
  const isAnySelected = selectedVetId === undefined

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-medium text-slate-900">
        {t('appointments.schedule.vet.title')}
      </h3>

      <div className="grid md:grid-cols-2 gap-4">

        <button
          type="button"
          onClick={() => onSelect(undefined)}
          className={[
            "relative p-4 rounded-xl border flex items-center gap-3 text-left transition-all",
            isAnySelected
              ? "border-blue-600 bg-blue-50"
              : "border-slate-200 bg-white hover:border-slate-400",
          ].join(" ")}
        >
          <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">
            <Icon icon="lucide:users" width={20} />
          </div>

          <div>
            <div className="font-medium text-slate-900">
              {t('appointments.schedule.vet.any')}
            </div>
            <div className="text-xs text-slate-500">
              {t('appointments.schedule.vet.anyDescription')}
            </div>
          </div>

          <div className="ml-auto">
            <Icon
              icon="lucide:check-circle-2"
              width={20}
              className={
                isAnySelected
                  ? "text-blue-600"
                  : "text-transparent"
              }
            />
          </div>
        </button>

        {vets.map((vet) => {
          const selected = selectedVetId === vet.id

          return (
            <button
              key={vet.id}
              type="button"
              onClick={() => onSelect(vet.id)}
              className={[
                "relative p-4 rounded-xl border flex items-center gap-3 text-left transition-all",
                selected
                  ? "border-blue-600 bg-blue-50"
                  : "border-slate-200 bg-white hover:border-slate-400",
              ].join(" ")}
            >
              {vet.avatarUrl ? (
                <div className="w-12 h-12 rounded-full overflow-hidden bg-slate-100 flex-shrink-0">
                  <Image
                    src={vet.avatarUrl}
                    alt={vet.name}
                    width={48}
                    height={48}
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : (
                <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
                  <Icon icon="lucide:user" width={18} />
                </div>
              )}

              <div>
                <div className="font-medium text-slate-900">
                  {vet.name}
                </div>
                {vet.specialty && (
                  <div className="text-xs text-slate-500">
                    {vet.specialty}
                  </div>
                )}
              </div>

              <div className="ml-auto">
                <Icon
                  icon="lucide:check-circle-2"
                  width={20}
                  className={
                    selected
                      ? "text-blue-600"
                      : "text-transparent"
                  }
                />
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default VeterinarianSelector
