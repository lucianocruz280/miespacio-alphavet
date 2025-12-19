import { CalendarPlus, Pencil, Dog, Cat } from "lucide-react"
import Card from "@/components/ui/Card"
import Button from "@/components/ui/Button"
import Badge from "@/components/ui/Badge"

type PetHeaderProps = {
  name: string
  species: "dog" | "cat"
  subtitle: string
  imageUrl: string
}

const PetHeader = ({ name, species, subtitle, imageUrl }: PetHeaderProps) => {
  const SpeciesIcon = species === "dog" ? Dog : Cat
  const speciesLabel = species === "dog" ? "Canino" : "Felino"

  return (
    <Card className="p-6 sm:p-8">
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
        {/* Avatar */}
        <div className="shrink-0 relative">
          <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full p-1 bg-white border border-slate-100 shadow-sm">
            <img
              src={imageUrl}
              alt={name}
              className="w-full h-full rounded-full object-cover"
            />
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

          <p className="text-lg text-slate-500">{subtitle}</p>

          <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
            <Button>
              <CalendarPlus className="w-4 h-4" />
              Agendar cita
            </Button>

            <Button variant="secondary">
              <Pencil className="w-4 h-4" />
              Editar perfil
            </Button>
          </div>
        </div>
      </div>
    </Card>
  )
}

export default PetHeader
