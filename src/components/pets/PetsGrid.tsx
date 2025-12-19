import PetCard from "./PetCard"
import AddPetCard from "./AddPetCard"

const PetsGrid = () => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <PetCard
                name="Lupo"
                meta="Husky Siberiano • 18.5kg • 3 años"
                lastVisit="24 Oct"
                imageUrl="/images/lupo.jpeg"
                statusColor="emerald"
            />

            <PetCard
                name="Totopo"
                meta="Husky Siberiano • 18.5kg • 3 años"
                lastVisit="12 Sep"
                imageUrl="/images/lupo.jpeg"
            />

            <PetCard
                name="Kira"
                meta="Husky Siberiano • 18.5kg • 3 años"
                lastVisit="01 Dic"
                imageUrl="/images/lupo.jpeg"
                statusColor="amber"
            />

            <AddPetCard />
        </div>
    )
}

export default PetsGrid
