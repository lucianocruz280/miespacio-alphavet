import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import Head from "next/head"
import Link from "next/link"
import {
  ArrowLeft,
  Printer,
  Syringe,
  Calendar,
  Stethoscope,
  Weight,
  Thermometer,
  Heart,
  FileText,
  Image as ImageIcon,
  Download,
  Loader2,
  FolderOpen,
  PawPrint,
} from "lucide-react"

import MainLayout from "@/components/layout/Layout"
import Card from "@/components/ui/Card"
import Button from "@/components/ui/Button"
import Badge from "@/components/ui/Badge"
import api from "@/lib/axios"
import dayjs from "dayjs"
import "dayjs/locale/es"

dayjs.locale("es")

const PetExpedientePage = () => {
  const router = useRouter()
  const { id } = router.query

  const [loading, setLoading] = useState(true)
  const [printing, setPrinting] = useState(false)
  const [recordData, setRecordData] = useState<any | null>(null)

  const fetchRecord = async () => {
    if (!id) return
    setLoading(true)
    try {
      const res = await api.get(`/pets/${id}/medical-record`)
      setRecordData(res.data)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (id) fetchRecord()
  }, [id])

  const handlePrint = async () => {
    if (!id) return
    try {
      setPrinting(true)
      const response = await api.get(`/pets/${id}/medical-record/pdf`, {
        responseType: "blob",
      })
      const file = new Blob([response.data], { type: "application/pdf" })
      window.open(URL.createObjectURL(file))
    } catch (err) {
      console.error(err)
    } finally {
      setPrinting(false)
    }
  }

  const handleDownloadAttachment = async (att: any) => {
    try {
      const response = await fetch(att.url)
      if (!response.ok) throw new Error("Network response was not ok")
      const blob = await response.blob()
      const blobUrl = window.URL.createObjectURL(blob)
      const link = document.createElement("a")
      link.href = blobUrl
      let ext = ""
      if (
        att.type === "application/pdf" &&
        !att.name.toLowerCase().endsWith(".pdf")
      ) {
        ext = ".pdf"
      }
      link.download = `${att.name}${ext}`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      window.URL.revokeObjectURL(blobUrl)
    } catch (error) {
      console.error("Download failed, opening in new tab", error)
      window.open(att.url, "_blank")
    }
  }

  const isImage = (type: string) => type?.startsWith("image/")

  if (!id) return null

  if (loading) {
    return (
      <MainLayout>
        <div className="flex flex-col items-center justify-center min-h-[50vh] text-slate-400">
          <Loader2 className="w-8 h-8 animate-spin mb-3 text-primary-500" />
          <p className="text-base font-medium">
            Cargando expediente clínico...
          </p>
        </div>
      </MainLayout>
    )
  }

  if (!recordData || !recordData.pet) {
    return (
      <MainLayout>
        <div className="text-center py-16">
          <FolderOpen className="w-16 h-16 text-slate-300 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-slate-700 mb-2">
            Expediente no encontrado
          </h3>
          <p className="text-slate-500 mb-6">
            No pudimos encontrar el expediente clínico de esta mascota.
          </p>
          <Button onClick={() => router.back()}>Volver atrás</Button>
        </div>
      </MainLayout>
    )
  }

  const { pet, consultations = [] } = recordData
  const primaryOwner =
    pet.owners?.find((o: any) => o.isPrimary) || pet.owners?.[0]

  return (
    <MainLayout>
      <Head>
        <title>Expediente de {pet.name} | Mi Espacio AlphaVet</title>
      </Head>

      <div className="max-w-5xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => router.back()}
              className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center hover:bg-slate-50 transition-colors shadow-sm cursor-pointer"
            >
              <ArrowLeft className="w-5 h-5 text-slate-600" />
            </button>
            <div>
              <p className="text-sm text-slate-400">
                Mis Mascotas / Expediente Clínico
              </p>
              <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                {pet.name}
                {pet.medicalRecordNumber && (
                  <Badge variant="success">#{pet.medicalRecordNumber}</Badge>
                )}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="secondary"
              onClick={handlePrint}
              disabled={printing}
            >
              {printing ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Printer className="w-4 h-4" />
              )}
              Imprimir Expediente
            </Button>
            <Button
              onClick={() => router.push(`/pets/${pet.id}`)}
            >
              <PawPrint className="w-4 h-4" />
              Ver Perfil
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column: Pet Info */}
          <div className="space-y-6">
            {/* Pet Details */}
            <Card className="p-5">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-14 h-14 bg-primary-50 text-primary-600 rounded-full flex items-center justify-center">
                  <PawPrint className="w-7 h-7" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-lg">
                    {pet.name}
                  </h3>
                  <p className="text-slate-500 text-sm">
                    {pet.species} · {pet.breed || "Mestizo"}
                  </p>
                </div>
              </div>

              <div className="border-t border-slate-100 pt-4 space-y-3">
                {[
                  { label: "Sexo", value: pet.gender || "—" },
                  {
                    label: "Esterilizado",
                    value: pet.isSterilized ? "Sí" : "No",
                  },
                  {
                    label: "Peso",
                    value: pet.weight ? `${pet.weight} kg` : "—",
                  },
                  { label: "Color", value: pet.color || "—" },
                  { label: "Microchip", value: pet.microchip || "—" },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="flex justify-between items-center text-sm"
                  >
                    <span className="text-slate-400">{item.label}</span>
                    <span className="font-medium text-slate-700">
                      {item.value}
                    </span>
                  </div>
                ))}
              </div>
            </Card>

            {/* Owner Info */}
            {primaryOwner?.user && (
              <Card className="p-5">
                <h4 className="font-bold text-slate-900 text-sm mb-3 flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-primary-50 flex items-center justify-center">
                    <span className="text-[10px] font-bold text-primary-600">
                      {primaryOwner.user.name?.charAt(0)?.toUpperCase()}
                    </span>
                  </div>
                  Propietario
                </h4>
                <div className="space-y-2 text-sm">
                  <p className="font-semibold text-slate-800">
                    {primaryOwner.user.name}
                  </p>
                  {primaryOwner.user.phone && (
                    <p className="text-slate-500">
                      📞 {primaryOwner.user.phone}
                    </p>
                  )}
                  {primaryOwner.user.email && (
                    <p className="text-slate-500">
                      ✉️ {primaryOwner.user.email}
                    </p>
                  )}
                </div>
              </Card>
            )}
          </div>

          {/* Right Column: Consultations Timeline */}
          <div className="lg:col-span-2">
            <Card className="overflow-hidden">
              <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
                <h3 className="font-bold text-slate-900 flex items-center gap-2">
                  <Stethoscope className="w-5 h-5 text-red-500" />
                  Historial de Consultas
                </h3>
                <span className="text-xs font-medium text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
                  {consultations.length}{" "}
                  {consultations.length === 1 ? "Consulta" : "Consultas"}
                </span>
              </div>

              {consultations.length === 0 ? (
                <div className="text-center py-12 px-6 text-slate-400">
                  <FolderOpen className="w-14 h-14 mx-auto mb-4 text-slate-300" />
                  <h4 className="font-semibold text-slate-600 mb-1">
                    Sin consultas registradas
                  </h4>
                  <p className="text-sm">
                    Esta mascota no tiene consultas clínicas todavía.
                  </p>
                </div>
              ) : (
                <div className="divide-y divide-slate-100">
                  {consultations.map((c: any) => (
                    <div
                      key={c.id}
                      className="p-5 hover:bg-slate-50/50 transition-colors"
                    >
                      {/* Consultation Header */}
                      <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span
                            className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                              c.type === "EMERGENCIA"
                                ? "bg-red-50 text-red-600"
                                : "bg-primary-50 text-primary-600"
                            }`}
                          >
                            {c.type}
                          </span>
                          <span className="text-sm font-semibold text-slate-800 flex items-center gap-1.5">
                            <Calendar className="w-4 h-4 text-slate-400" />
                            {dayjs(c.createdAt).format(
                              "DD [de] MMMM, YYYY · hh:mm A"
                            )}
                          </span>
                        </div>
                        <span className="text-xs text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full flex items-center gap-1">
                          <Stethoscope className="w-3 h-3" />
                          Dr. {c.veterinarianName}
                        </span>
                      </div>

                      {/* Vitals */}
                      <div className="flex gap-4 mb-3 text-xs text-slate-500 bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                        {c.weight && (
                          <div className="flex items-center gap-1">
                            <Weight className="w-3.5 h-3.5" /> {c.weight} kg
                          </div>
                        )}
                        {c.temperature && (
                          <div className="flex items-center gap-1">
                            <Thermometer className="w-3.5 h-3.5" />{" "}
                            {c.temperature} °C
                          </div>
                        )}
                        {c.heartRate && (
                          <div className="flex items-center gap-1">
                            <Heart className="w-3.5 h-3.5" /> {c.heartRate} bpm
                          </div>
                        )}
                      </div>

                      {/* Clinical Notes */}
                      {c.catamnesis && (
                        <div className="mb-3">
                          <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider mb-1">
                            Seguimiento Clínico
                          </p>
                          <p className="text-sm text-slate-700 bg-white p-3 rounded-lg border border-slate-100 whitespace-pre-wrap">
                            {c.catamnesis}
                          </p>
                        </div>
                      )}

                      {c.diagnosis && (
                        <div className="mb-3">
                          <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider mb-1">
                            Diagnóstico
                          </p>
                          <p className="text-sm text-slate-800 font-medium bg-white p-3 rounded-lg border border-slate-100 whitespace-pre-wrap">
                            {c.diagnosis}
                          </p>
                        </div>
                      )}

                      {c.treatment && (
                        <div className="mb-3">
                          <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider mb-1">
                            Tratamiento
                          </p>
                          <p className="text-sm text-slate-700 bg-white p-3 rounded-lg border border-slate-100 whitespace-pre-wrap">
                            {c.treatment}
                          </p>
                        </div>
                      )}

                      {/* Attachments */}
                      {c.attachments && c.attachments.length > 0 && (
                        <div className="mt-4 pt-3 border-t border-slate-100">
                          <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider mb-2">
                            Archivos y Análisis ({c.attachments.length})
                          </p>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {c.attachments.map((att: any) => (
                              <button
                                key={att.id}
                                onClick={() => handleDownloadAttachment(att)}
                                className="flex items-center gap-3 p-3 bg-white rounded-lg border border-slate-100 hover:border-primary-200 hover:bg-primary-50/30 transition-all group cursor-pointer text-left"
                              >
                                <div className="w-10 h-10 rounded-lg bg-slate-100 group-hover:bg-primary-100 flex items-center justify-center shrink-0 transition-colors">
                                  {isImage(att.type) ? (
                                    <ImageIcon className="w-5 h-5 text-primary-500" />
                                  ) : (
                                    <FileText className="w-5 h-5 text-slate-400 group-hover:text-primary-500 transition-colors" />
                                  )}
                                </div>
                                <div className="flex-1 min-w-0">
                                  <p className="text-sm font-medium text-slate-700 truncate">
                                    {att.name}
                                  </p>
                                  <p className="text-xs text-slate-400">
                                    {dayjs(att.createdAt).format("DD MMM YYYY")}
                                  </p>
                                </div>
                                <Download className="w-4 h-4 text-slate-300 group-hover:text-primary-500 transition-colors shrink-0" />
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </Card>
          </div>
        </div>
      </div>
    </MainLayout>
  )
}

export default PetExpedientePage
