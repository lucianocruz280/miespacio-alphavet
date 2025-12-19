import MainLayout from "@/components/layout/Layout"
import PetHeader from "@/components/pets/detail/PetHeader"
import PetInfoCard from "@/components/pets/detail/PetInfoCard"
import PetMedicalSummary from "@/components/pets/detail/PetMedicalSummary"
import PetHistoryPreview from "@/components/pets/detail/PetHistoryPreview"

const Page = () => {
    return (
        <MainLayout>
        
            <div className="max-w-4xl mx-auto space-y-6">
                <PetHeader
                    name="Lupo"
                    species="dog"
                    subtitle="Husky Siberiano · 3 años"
                    imageUrl="/images/lupo.jpeg"
                />

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <PetInfoCard
                        items={[
                            { label: "Raza", value: "Husky Siberiano" },
                            { label: "Fecha de nacimiento", value: "12 Mar 2021" },
                            { label: "Sexo", value: "Macho" },
                            { label: "Peso", value: "32.5 kg" },
                            { label: "Color", value: "Dorado, pecho blanco" },
                            { label: "Microchip", value: "981020001234567" },
                        ]}
                    />

                    <PetMedicalSummary />
                </div>

                <PetHistoryPreview
                    items={[
                        {
                            dateLabel: "Oct",
                            dateNumber: "24",
                            title: "Consulta anual",
                            subtitle: "Dra. Sarah Jenkins · Revisión general",
                        },
                        {
                            dateLabel: "Jun",
                            dateNumber: "15",
                            title: "Refuerzo de vacunas",
                            subtitle: "Rabia, DHPP",
                        },
                        {
                            dateLabel: "Ene",
                            dateNumber: "08",
                            title: "Estética & Spa",
                            subtitle: "Baño, corte, uñas",
                        },
                    ]}
                />
            </div>
        </MainLayout>
    )
}

export default Page
