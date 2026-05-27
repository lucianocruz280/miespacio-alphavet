import { useRouter } from "next/router"
import { useEffect, useState } from "react"

import MainLayout from "@/components/layout/Layout"
import PetHeader from "@/components/pets/detail/PetHeader"
import PetInfoCard from "@/components/pets/detail/PetInfoCard"
import PetMedicalSummary from "@/components/pets/detail/PetMedicalSummary"
import PetHistoryPreview from "@/components/pets/detail/PetHistoryPreview"
import EditPetModal from "@/components/pets/detail/EditPetModal"

import api from "@/lib/axios"

const Page = () => {

    const router = useRouter()
    const { id } = router.query

    const [pet, setPet] = useState<any>(null)
    const [historyInfo, setHistoryInfo] = useState<{ history: any[], lastVisit: string | null }>({ history: [], lastVisit: null })
    const [loading, setLoading] = useState(true)
    const [isEditOpen, setIsEditOpen] = useState(false)

    // Move fetch data instance so we can trigger refetches
    const fetchData = async () => {
        if (!id) return
        try {
            const [petRes, historyRes] = await Promise.all([
                api.get(`/pets/${id}`),
                api.get(`/myspace/pets/${id}/history`)
            ])

            setPet(petRes.data.data)
            setHistoryInfo(historyRes.data.data)

        } catch (error) {
            console.error("Error cargando mascota", error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchData()
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
                    onEditClick={() => setIsEditOpen(true)}
                    onScheduleClick={() => router.push(`/appointments?code=HOSPITAL`)}
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
                            { label: "Esterilizado", value: pet.isSterilized ? "Sí" : "No" },
                        ]}
                    />

                    <PetMedicalSummary lastVisit={historyInfo.lastVisit || undefined} />

                </div>

                {/* Expediente Clínico Link */}
                <div
                    onClick={() => router.push(`/pets/${id}/expediente`)}
                    className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 flex items-center justify-between hover:border-primary-300 hover:shadow-md transition-all cursor-pointer group"
                >
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-primary-50 rounded-xl flex items-center justify-center group-hover:bg-primary-100 transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                        </div>
                        <div>
                            <h3 className="font-bold text-slate-900 text-base">Expediente Clínico</h3>
                            <p className="text-sm text-slate-500">Historial completo de consultas, diagnósticos y análisis</p>
                        </div>
                    </div>
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-slate-300 group-hover:text-primary-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                </div>

                <PetHistoryPreview items={historyInfo.history.map(item => ({
                    ...item,
                    href: `/my-services/${item.id}?category=${item.category}`
                }))} />

            </div>

            <EditPetModal
                isOpen={isEditOpen}
                onClose={() => setIsEditOpen(false)}
                pet={pet}
                onSuccess={fetchData}
            />

        </MainLayout>
    )
}

export default Page