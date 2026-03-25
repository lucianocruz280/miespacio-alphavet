import {
  CalendarPlus,
  Pencil,
  Dog,
  Cat,
  Rabbit,
  Fish,
  Bird,
  Bug,
  PawPrint
} from "lucide-react"

import Card from "@/components/ui/Card"
import Button from "@/components/ui/Button"
import Badge from "@/components/ui/Badge"
import { useTranslation } from "react-i18next"

type PetHeaderProps = {
  name: string
  species: string
  subtitle: string
  imageUrl?: string
  onEditClick?: () => void
  onScheduleClick?: () => void
}

import { TFunction } from "i18next"

const getSpeciesConfig = (t: TFunction): Record<string, { label: string; icon: React.ElementType }> => ({
  Perro: { label: t("pets.detail.header.species.dog"), icon: Dog },
  Gato: { label: t("pets.detail.header.species.cat"), icon: Cat },
  Ave: { label: t("pets.detail.header.species.bird"), icon: Bird },
  Conejo: { label: t("pets.detail.header.species.rabbit"), icon: Rabbit },
  Hámster: { label: t("pets.detail.header.species.rodent"), icon: PawPrint },
  Pez: { label: t("pets.detail.header.species.fish"), icon: Fish },
  Reptil: { label: t("pets.detail.header.species.reptile"), icon: Bug },
  Otro: { label: t("pets.detail.header.species.other"), icon: PawPrint },
})

const PetHeader = ({
  name,
  species,
  subtitle,
  imageUrl,
  onEditClick,
  onScheduleClick,
}: PetHeaderProps) => {
  const { t } = useTranslation('common')
  const speciesConfig = getSpeciesConfig(t)
  const config = speciesConfig[species] || speciesConfig["Otro"]

  const SpeciesIcon = config.icon
  const speciesLabel = config.label

  return (
    <Card className="p-6 sm:p-8">
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">

        {/* Avatar */}
        <div className="shrink-0 relative">
          <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full p-1 bg-white border border-slate-100 shadow-sm">

            {imageUrl ? (
              <img
                src={imageUrl}
                alt={name}
                className="w-full h-full rounded-full object-cover"
              />
            ) : (
              <div className="w-full h-full rounded-full bg-slate-100 flex items-center justify-center">
                <SpeciesIcon className="w-10 h-10 text-slate-400" />
              </div>
            )}

          </div>

          <div className="absolute bottom-1 right-1 bg-white rounded-full p-1.5 shadow-sm border border-slate-100">
            <SpeciesIcon className="w-5 h-5 text-slate-400" />
          </div>
        </div>

        {/* Info */}
        <div className="flex-1 text-center sm:text-left space-y-3 pt-1">

          <div className="flex flex-col sm:flex-row items-center gap-3">
            <h1 className="text-3xl font-semibold tracking-tight text-slate-900">
              {name}
            </h1>

            <Badge>{speciesLabel}</Badge>
          </div>

          <p className="text-lg text-slate-500">
            {subtitle}
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">

            <Button onClick={onScheduleClick}>
              <CalendarPlus className="w-4 h-4" />
              {t("pets.detail.header.scheduleBtn")}
            </Button>

            <Button variant="secondary" onClick={onEditClick}>
              <Pencil className="w-4 h-4" />
              {t("pets.detail.header.editBtn")}
            </Button>

          </div>

        </div>

      </div>
    </Card>
  )
}

export default PetHeader