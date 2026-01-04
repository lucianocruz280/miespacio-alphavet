import AddPetCard from "@/components/pets/AddPetCard"
import PetCard from "@/components/pets/PetCard"
import { buildMeta } from "@/components/pets/PetsGrid"
import useAxios from "@/hooks/useAxios"
import { Pet, PetResponse } from "@/types/Pets"
import { useState } from "react"

type Props = {
    selectedPetId?: string
    onSelect: (pet: Pet) => void
}

const PetSelector = ({ selectedPetId, onSelect }: Props) => {
    const { data, loading } = useAxios({ method: "get", url: "pets" })
    const pets = (data as PetResponse)?.data ?? []
    const [selectedPetId2, setSelectedPetId] = useState<string | null>(null)
    if (loading) {
        return (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {Array.from({ length: 3 }).map((_, i) => (
                    <div key={i} className="h-48 rounded-xl bg-slate-100 animate-pulse" />
                ))}
                <AddPetCard classNames="" />
            </div>
        )
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {pets.map((pet) => (
                <button
                    key={pet.id}
                    type="button"
                    onClick={() => onSelect(pet)}
                    className={`text-left rounded-xl transition ring-offset-2 ${selectedPetId === pet.id
                        ? "ring-2 ring-blue-600"
                        : "hover:ring-2 hover:ring-slate-200"
                        }`}
                >
                    <PetCard
                        name={pet.name}
                        meta={buildMeta(pet)}
                        lastVisit="—"
                        imageUrl={pet.photo}
                        statusColor={pet.isPrimaryOwner ? "emerald" : "amber"}
                        selectable
                        selected={selectedPetId === pet.id}
                        onSelect={() => setSelectedPetId(pet.id)}
                    />
                </button>
            ))}

            <AddPetCard classNames=""/>
        </div>
    )
}

export default PetSelector