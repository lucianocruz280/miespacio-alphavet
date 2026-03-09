import { useRouter } from "next/router"
import { useEffect, useState } from "react"

import MainLayout from "@/components/layout/Layout"
import PetHeader from "@/components/pets/detail/PetHeader"
import PetInfoCard from "@/components/pets/detail/PetInfoCard"
import PetMedicalSummary from "@/components/pets/detail/PetMedicalSummary"
import PetHistoryPreview from "@/components/pets/detail/PetHistoryPreview"

import api from "@/lib/axios"

const Page = () => {

    const router = useRouter()
    const { id } = router.query

    const [pet, setPet] = useState<any>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {

        if (!id) return

        const fetchPet = async () => {
            try {

                const res = await api.get(`/pets/${id}`)

                setPet(res.data.data)

            } catch (error) {

                console.error("Error cargando mascota", error)

            } finally {

                setLoading(false)

            }
        }

        fetchPet()

    }, [id])

    if (loading) {
        return (
            <MainLayout>
                <div className="max-w-4xl mx-auto py-10 text-center text-slate-500">
                    Cargando mascota...
                </div>
            </MainLayout>
        )
    }

    if (!pet) {
        return (
            <MainLayout>
                <div className="max-w-4xl mx-auto py-10 text-center text-red-500">
                    Mascota no encontrada
                </div>
            </MainLayout>
        )
    }

    const birthDate = pet.birthDate
        ? new Date(pet.birthDate).toLocaleDateString("es-MX", {
            day: "2-digit",
            month: "short",
            year: "numeric",
        })
        : "No registrada"

    return (
        <MainLayout>

            <div className="max-w-4xl mx-auto space-y-6">

                <PetHeader
                    name={pet.name}
                    species={pet.species === "Perro" ? "dog" : "cat"}
                    subtitle={`${pet.breed || "Sin raza"} · ${pet.age || "-"} años`}
                    imageUrl={pet.photo || "/images/pet-placeholder.png"}
                />

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                    <PetInfoCard
                        items={[
                            { label: "Raza", value: pet.breed || "-" },
                            { label: "Edad", value: `${pet.age} años` || "-" },
                            { label: "Fecha de nacimiento", value: birthDate },
                            { label: "Sexo", value: pet.gender || "-" },
                            { label: "Peso", value: pet.weight ? `${pet.weight} kg` : "-" },
                            { label: "Color", value: pet.color || "-" },
                            { label: "Microchip", value: pet.microchip || "-" },
                        ]}
                    />

                    <PetMedicalSummary />

                </div>

                <PetHistoryPreview items={[]} />

            </div>

        </MainLayout>
    )
}

export default Page