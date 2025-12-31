import PetCard from "./PetCard"
import AddPetCard from "./AddPetCard"
import useAxios from "@/hooks/useAxios"
import { Pet } from "@/types/Pets"

const getAgeYears = (birthDate?: string) => {
    if (!birthDate) return null
    const birth = new Date(birthDate)
    const today = new Date()
    let age = today.getFullYear() - birth.getFullYear()
    const m = today.getMonth() - birth.getMonth()
    if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
        age--
    }
    return age
}

const buildMeta = (pet: any) => {
    const age = getAgeYears(pet.birthDate)
    return [
        pet.breed,
        pet.weight ? `${pet.weight}kg` : null,
        age ? `${age} años` : null,
    ]
        .filter(Boolean)
        .join(" • ")
}
type PetResponse = {
    success: boolean,
    data: Pet[]
}
const PetsGrid = () => {
    const { data, loading } = useAxios({
        method: "get",
        url: "pets",
    })

    const pets = (data as PetResponse)?.data ?? []

    if (loading) {
        return (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {Array.from({ length: 3 }).map((_, i) => (
                    <div
                        key={i}
                        className="h-48 rounded-xl bg-slate-100 animate-pulse"
                    />
                ))}
                <AddPetCard />
            </div>
        )
    }


    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {pets.map((pet: any) => (
                <PetCard
                    key={pet.id}
                    name={pet.name}
                    meta={buildMeta(pet)}
                    lastVisit="—"
                    imageUrl={pet.photo}
                    statusColor={pet.isPrimaryOwner ? "emerald" : "amber"}
                />
            ))}

            <AddPetCard />
        </div>
    )
}

export default PetsGrid
