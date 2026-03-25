import PetCard from "../cards/PetCard"
import BranchCard from "../cards/BranchCard"
import ServiceTypeCard from "../cards/ServiceTypeCard"
import Button from "@/components/ui/Button"
import useAxios from "@/hooks/useAxios"
import { PetResponse } from "@/types/Pets"
import { AppointmentDraft } from "@/types/appointments"
import { useTranslation } from "react-i18next"
import { useState } from "react"
import AddPetCard from "@/components/pets/AddPetCard"

type StepBaseInfoProps = {
  draft: AppointmentDraft
  onChange: (patch: Partial<AppointmentDraft>) => void
  onNext: () => void
  code?: string
}

const StepBaseInfo = ({ draft, onChange, onNext, code }: StepBaseInfoProps) => {
  const { t } = useTranslation('common')
  const { data, loading } = useAxios({ method: "get", url: "pets" })
  const pets = (data as PetResponse)?.data ?? []
  const [mobileStage, setMobileStage] = useState<"PET" | "BRANCH" | "SERVICE">("PET")

  const { data: modulesData } = useAxios({
    method: "get",
    url: "app-modules",
  })

  const hospitalModule = (modulesData as { code: string; branches: { id: string, name: string, street?: string, exteriorNumber?: string }[] }[])?.find(
    (app) => app.code === code
  )
  const hospitalBranches = hospitalModule?.branches ?? []

  const canContinue =
    !!draft.petId &&
    !!draft.branchId &&
    !!draft.serviceType

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

  if (loading || !modulesData) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="h-32 rounded-xl bg-slate-100 animate-pulse" />
        ))}
        <AddPetCard classNames="hidden lg:flex" hasReturn />

        <button
          type="button"
          className="p-4 lg:hidden rounded-xl border border-dashed border-slate-300 bg-slate-50 hover:bg-white hover:border-slate-400 transition-all text-sm font-medium text-slate-500"
        >
          {t('appointments.baseInfo.newPetBtn')}
        </button>
      </div>
    )
  }

  return (
    <section className="space-y-10">

      <div>
        <h1 className="text-2xl font-semibold text-slate-900">
          {t('appointments.baseInfo.title')}
        </h1>
        <p className="text-slate-500 mt-1">
          {t('appointments.baseInfo.subtitle')}
        </p>
      </div>

      {/* MOBILE – PET */}
      <div className="lg:hidden">
        {mobileStage === "PET" && (
          <div className="space-y-4">
            <h2 className="text-sm font-medium text-slate-900">{t('appointments.baseInfo.petLabel')}</h2>

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

              <AddPetCard classNames="hidden lg:flex" hasReturn />
            </div>
          </div>
        )}
      </div>


      {/* DESKTOP – PET */}
      <div className="hidden lg:block space-y-4">
        <h2 className="text-sm font-medium text-slate-900">
          {t('appointments.baseInfo.petLabel')}
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {pets.map((pet) => (
            <PetCard
              key={pet.id}
              name={pet.name}
              breed={pet.breed}
              selected={draft.petId === pet.id}
              onSelect={() => onChange({ petId: pet.id })}
            />
          ))}

          <AddPetCard classNames="hidden lg:flex" hasReturn />

          <button
            type="button"
            className="p-4 lg:hidden rounded-xl border border-dashed border-slate-300 bg-slate-50 hover:bg-white hover:border-slate-400 transition-all text-sm font-medium text-slate-500"
          >
            {t('appointments.baseInfo.newPetBtn')}
          </button>
        </div>
      </div>

      {/* MOBILE – BRANCH */}
      <div className="lg:hidden">
        {mobileStage === "BRANCH" && (
          <div className="space-y-4">


            <h2 className="text-sm font-medium text-slate-900">{t('appointments.baseInfo.branchLabel')}</h2>

            <div className="grid gap-4">
              <div className="grid md:grid-cols-2 gap-4">
                {hospitalBranches.map((branch: { id: string, name: string, street?: string, exteriorNumber?: string }) => (
                  <BranchCard
                    key={branch.id}
                    id={branch.id}
                    name={branch.name}
                    address={`${branch.street || ''} ${branch.exteriorNumber || ''}`.trim()}
                    status="open"
                    selected={draft.branchId === branch.id}
                    onSelect={() => handleBranchSelect(branch.id)}
                  />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>


      {/* DESKTOP – BRANCH */}
      <div className="hidden lg:block space-y-4">
        <h2 className="text-sm font-medium text-slate-900">
          {t('appointments.baseInfo.branchLabel')}
        </h2>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="grid md:grid-cols-2 gap-4">
            {hospitalBranches.map((branch: { id: string, name: string, street?: string, exteriorNumber?: string }) => (
              <BranchCard
                key={branch.id}
                id={branch.id}
                name={branch.name}
                address={`${branch.street || ''} ${branch.exteriorNumber || ''}`.trim()}
                status="open"
                selected={draft.branchId === branch.id}
                onSelect={() => onChange({ branchId: branch.id })}
              />
            ))}
          </div>
        </div>
      </div>

      {/* MOBILE – SERVICE */}
      <div className="lg:hidden">
        {mobileStage === "SERVICE" && (
          <div className="space-y-4">
            <h2 className="text-sm font-medium text-slate-900">
              {t('appointments.baseInfo.serviceLabel')}
            </h2>

            <div className="grid grid-cols-2 gap-3">
              <ServiceTypeCard
                label={t('appointments.baseInfo.services.CONSULTA')}
                icon="stethoscope"
                selected={draft.serviceType === "CONSULTA"}
                onSelect={() => handleServiceSelect("CONSULTA")}
              />

              <ServiceTypeCard
                label={t('appointments.baseInfo.services.VACUNA')}
                icon="syringe"
                selected={draft.serviceType === "VACUNA"}
                onSelect={() => handleServiceSelect("VACUNA")}
              />

              <ServiceTypeCard
                label={t('appointments.baseInfo.services.OTRO')}
                icon="pill"
                selected={draft.serviceType === "OTRO"}
                onSelect={() => handleServiceSelect("OTRO")}
              />

              <ServiceTypeCard
                label={t('appointments.baseInfo.services.REVISION')}
                icon="siren"
                selected={draft.serviceType === "REVISION"}
                onSelect={() => handleServiceSelect("REVISION")}
              />
            </div>
          </div>
        )}
      </div>


      {/* DESKTOP – SERVICE */}
      <div className="hidden lg:block space-y-4">
        <h2 className="text-sm font-medium text-slate-900">
          {t('appointments.baseInfo.serviceLabel')}
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <ServiceTypeCard
            label={t('appointments.baseInfo.services.CONSULTA')}
            icon="stethoscope"
            selected={draft.serviceType === "CONSULTA"}
            onSelect={() => onChange({ serviceType: "CONSULTA" })}
          />

          <ServiceTypeCard
            label={t('appointments.baseInfo.services.VACUNA')}
            icon="syringe"
            selected={draft.serviceType === "VACUNA"}
            onSelect={() => onChange({ serviceType: "VACUNA" })}
          />

          <ServiceTypeCard
            label={t('appointments.baseInfo.services.OTRO')}
            icon="pill"
            selected={draft.serviceType === "OTRO"}
            onSelect={() => onChange({ serviceType: "OTRO" })}
          />

          <ServiceTypeCard
            label={t('appointments.baseInfo.services.REVISION')}
            icon="siren"
            selected={draft.serviceType === "REVISION"}
            onSelect={() => onChange({ serviceType: "REVISION" })}
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
          {t('appointments.baseInfo.backBtn')}
        </Button>
      )}
      <div className="pt-6 border-t border-slate-100 flex justify-end hidden lg:block">
        <Button
          disabled={!canContinue}
          onClick={onNext}
        >
          {t('appointments.baseInfo.continueBtn')}
        </Button>
      </div>

    </section>
  )
}

export default StepBaseInfo
