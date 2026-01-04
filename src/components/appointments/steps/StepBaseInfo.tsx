import PetCard from "../cards/PetCard"
import BranchCard from "../cards/BranchCard"
import ServiceTypeCard from "../cards/ServiceTypeCard"
import Button from "@/components/ui/Button"
import useAxios from "@/hooks/useAxios"
import { PetResponse } from "@/types/Pets"
import AddPetCard from "@/components/pets/AddPetCard"
import { useState } from "react"

type AppointmentDraft = {
  petId?: string
  branchId?: string
  serviceType?: string
}
type MobileStage = "PET" | "BRANCH" | "SERVICE"

type StepBaseInfoProps = {
  draft: AppointmentDraft
  onChange: (patch: Partial<AppointmentDraft>) => void
  onNext: () => void
}

const StepBaseInfo = ({ draft, onChange, onNext }: StepBaseInfoProps) => {
  const { data, loading } = useAxios({ method: "get", url: "/pets" })
  const pets = (data as PetResponse)?.data ?? []
  const [mobileStage, setMobileStage] = useState<"PET" | "BRANCH" | "SERVICE">("PET")

  const isMobile = true
  const canContinue =
    !!draft.petId &&
    !!draft.branchId &&
    !!draft.serviceType
  console.log("pets", pets)

  const handlePetSelect = (petId: string) => {
    onChange({ petId })
    setMobileStage("BRANCH")
  }

  const handleBranchSelect = (branchId: string) => {
    onChange({ branchId })
    setMobileStage("SERVICE")
  }

  const handleServiceSelect = (serviceType: string) => {
    onChange({ serviceType })
    onNext()
  }
  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="h-32 rounded-xl bg-slate-100 animate-pulse" />
        ))}
        <AddPetCard classNames="hidden lg:flex" />

        <button
          type="button"
          className="p-4 lg:hidden rounded-xl border border-dashed border-slate-300 bg-slate-50 hover:bg-white hover:border-slate-400 transition-all text-sm font-medium text-slate-500"
        >
          + Nueva mascota
        </button>
      </div>
    )
  }
  return (
    <section className="space-y-10">

      <div>
        <h1 className="text-2xl font-semibold text-slate-900">
          Comencemos
        </h1>
        <p className="text-slate-500 mt-1">
          Selecciona la mascota, la sucursal y el tipo de servicio.
        </p>
      </div>

      {/* MOBILE – PET */}
      <div className="lg:hidden">
        {mobileStage === "PET" && (
          <div className="space-y-4">
            <h2 className="text-sm font-medium text-slate-900">Mascota</h2>

            <div className="grid gap-4">
              {pets.map((pet) => (
                <PetCard
                  key={pet.id}
                  name={pet.name}
                  breed={pet.breed}
                  selected={draft.petId === pet.id}
                  onSelect={() => handlePetSelect(pet.id)}
                />
              ))}

              <AddPetCard />
            </div>
          </div>
        )}
      </div>


      <div className="hidden lg:block space-y-4">
        <h2 className="text-sm font-medium text-slate-900">
          Mascota
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {pets.map((pet, i) => (
            <PetCard
              key={i}
              name={pet.name}
              breed={pet.breed}
              selected={draft.petId === pet.id}
              onSelect={() => onChange({ petId: pet.id })}
            />
          ))}

          <AddPetCard classNames="hidden lg:flex" />

          <button
            type="button"
            className="p-4 lg:hidden rounded-xl border border-dashed border-slate-300 bg-slate-50 hover:bg-white hover:border-slate-400 transition-all text-sm font-medium text-slate-500"
          >
            + Nueva mascota
          </button>
        </div>
      </div>

      {/* MOBILE – BRANCH */}
      <div className="lg:hidden">
        {mobileStage === "BRANCH" && (
          <div className="space-y-4">


            <h2 className="text-sm font-medium text-slate-900">Sucursal</h2>

            <div className="grid gap-4">
              <BranchCard
                id="central"
                name="Clínica Central"
                address="Av. Principal 123"
                status="open"
                selected={draft.branchId === "central"}
                onSelect={() => handleBranchSelect("central")}
              />

              <BranchCard
                id="north"
                name="Sucursal Norte"
                address="Calle Los Pinos 45"
                status="closing"
                selected={draft.branchId === "north"}
                onSelect={() => handleBranchSelect("north")}
              />
            </div>
          </div>
        )}
      </div>


      <div className="hidden lg:block space-y-4">
        <h2 className="text-sm font-medium text-slate-900">
          Sucursal
        </h2>

        <div className="grid md:grid-cols-2 gap-4">
          <BranchCard
            id="central"
            name="Clínica Central"
            address="Av. Principal 123"
            status="open"
            selected={draft.branchId === "central"}
            onSelect={() => onChange({ branchId: "central" })}
          />

          <BranchCard
            id="north"
            name="Sucursal Norte"
            address="Calle Los Pinos 45"
            status="closing"
            selected={draft.branchId === "north"}
            onSelect={() => onChange({ branchId: "north" })}
          />
        </div>
      </div>

      {/* MOBILE – SERVICE */}
      <div className="lg:hidden">
        {mobileStage === "SERVICE" && (
          <div className="space-y-4">
            <h2 className="text-sm font-medium text-slate-900">
              Tipo de servicio
            </h2>

            <div className="grid grid-cols-2 gap-3">
              <ServiceTypeCard
                label="Consulta General"
                icon="stethoscope"
                selected={draft.serviceType === "CONSULTA"}
                onSelect={() => handleServiceSelect("CONSULTA")}
              />

              <ServiceTypeCard
                label="Vacunación"
                icon="syringe"
                selected={draft.serviceType === "VACUNACION"}
                onSelect={() => handleServiceSelect("VACUNACION")}
              />

              <ServiceTypeCard
                label="Desparasitación"
                icon="pill"
                selected={draft.serviceType === "DESPARASITACION"}
                onSelect={() => handleServiceSelect("DESPARASITACION")}
              />

              <ServiceTypeCard
                label="Revisión"
                icon="siren"
                selected={draft.serviceType === "REVISION"}
                onSelect={() => handleServiceSelect("REVISION")}
              />
            </div>
          </div>
        )}
      </div>


      <div className="hidden lg:block space-y-4">
        <h2 className="text-sm font-medium text-slate-900">
          Tipo de servicio
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <ServiceTypeCard
            label="Consulta General"
            icon="stethoscope"
            selected={draft.serviceType === "CONSULTA"}
            onSelect={() => onChange({ serviceType: "CONSULTA" })}
          />

          <ServiceTypeCard
            label="Vacunación"
            icon="syringe"
            selected={draft.serviceType === "VACUNACION"}
            onSelect={() => onChange({ serviceType: "VACUNACION" })}
          />

          <ServiceTypeCard
            label="Desparacitación"
            icon="pill"
            selected={draft.serviceType === "ESTETICA"}
            onSelect={() => onChange({ serviceType: "ESTETICA" })}
          />

          <ServiceTypeCard
            label="Revision"
            icon="siren"
            selected={draft.serviceType === "EMERGENCIA"}
            onSelect={() => onChange({ serviceType: "EMERGENCIA" })}
          />
        </div>
      </div>
      {mobileStage !== "PET" && (
        <Button
          onClick={() => {
            if (mobileStage === "BRANCH") setMobileStage("PET")
            if (mobileStage === "SERVICE") setMobileStage("BRANCH")
          }}
          className="text-sm text-slate-500 lg:hidden"
          variant="ghost"
        >
          Atrás
        </Button>
      )}
      <div className="pt-6 border-t border-slate-100 flex justify-end hidden lg:block">
        <Button
          disabled={!canContinue}
          onClick={onNext}
        >
          Continuar
        </Button>
      </div>

    </section>
  )
}

export default StepBaseInfo
