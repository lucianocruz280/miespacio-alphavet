import { useState, useEffect } from "react"
import api from "@/lib/axios"
import useAxios from "@/hooks/useAxios"
import { Calendar, Clock, MapPin, Loader2, FileEdit, XCircle, ChevronLeft } from "lucide-react"
import Card from "@/components/ui/Card"
import Link from "next/link"
import CalendarSelector from "./CalendarSelector"
import TimeSlotSelector from "./TimeSlotSelector"
import { useRouter } from "next/router"
import { toast } from "sonner"

type MyAppointmentDetailProps = {
  appointmentId: string
}

export default function MyAppointmentDetail({ appointmentId }: MyAppointmentDetailProps) {
  const router = useRouter()
  const [isEditing, setIsEditing] = useState(false)
  const [selectedPet, setSelectedPet] = useState<string>("")
  const [selectedDate, setSelectedDate] = useState<string>("")
  const [selectedTime, setSelectedTime] = useState<string>("")
  const [saving, setSaving] = useState(false)
  const [cancelling, setCancelling] = useState(false)

  const { data, loading, refetch } = useAxios({
    method: "get",
    url: `myspace/appointments/${appointmentId}`,
  }, [appointmentId])

  const { data: petsData } = useAxios({ method: "get", url: "pets" })
  const pets = (petsData as any)?.data ?? []

  const appointment = (data as any)?.data

  useEffect(() => {
    if (appointment && !isEditing) {
      setSelectedPet(appointment.petId)
      // Extract date string YYYY-MM-DD
      const dateObj = new Date(appointment.scheduledDate)
      setSelectedDate(dateObj.toISOString().split('T')[0])
      setSelectedTime(
        `${String(dateObj.getUTCHours()).padStart(2, "0")}:${String(dateObj.getUTCMinutes()).padStart(2, "0")}`
      )
    }
  }, [appointment, isEditing])

  if (loading || !appointment) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
      </div>
    )
  }

  const handleSave = async () => {
    if (!selectedPet || !selectedDate || !selectedTime) return
    const [hours, minutes] = selectedTime.split(":").map(Number)
    const newDate = new Date(selectedDate)
    newDate.setUTCHours(hours, minutes, 0, 0)

    try {
      setSaving(true)
      await api.patch(`myspace/appointments/${appointmentId}`, {
        petId: selectedPet,
        scheduledDate: newDate.toISOString()
      })
      toast.success("Cita actualizada exitosamente")
      setIsEditing(false)
      refetch()
    } catch (e) {
      toast.error("Error al actualizar la cita")
    } finally {
      setSaving(false)
    }
  }

  const handleCancel = async () => {
    if (!confirm("¿Estás seguro que deseas cancelar esta cita?")) return
    try {
      setCancelling(true)
      await api.post(`myspace/appointments/${appointmentId}/cancel`)
      toast.success("Cita cancelada")
      router.push("/my-appointments")
    } catch (e) {
      toast.error("Error al cancelar la cita")
    } finally {
      setCancelling(false)
    }
  }

  const aptDate = new Date(appointment.scheduledDate)
  const isPast = aptDate < new Date()
  const isCancellable = appointment.status !== 'CANCELLED' && appointment.status !== 'COMPLETED' && !isPast

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-slate-900 flex items-center gap-3">
          <Link href="/my-appointments" className="p-2 hover:bg-slate-100 rounded-full transition-colors mr-1">
            <ChevronLeft className="w-5 h-5 text-slate-500" />
          </Link>
          Detalle de la Cita
        </h1>
        {isCancellable && !isEditing && (
          <div className="flex gap-2">
            <button
              onClick={() => setIsEditing(true)}
              className="flex items-center gap-2 px-4 py-2 border border-slate-200 text-slate-700 bg-white rounded-xl hover:bg-slate-50"
            >
              <FileEdit className="w-4 h-4" />
              Modificar
            </button>
            <button
              onClick={handleCancel}
              disabled={cancelling}
              className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 rounded-xl hover:bg-red-100"
            >
              <XCircle className="w-4 h-4" />
              Cancelar Cita
            </button>
          </div>
        )}
      </div>

      <Card className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-slate-500 uppercase tracking-wider mb-1">Mascota</h3>
              {isEditing ? (
                <select
                  value={selectedPet}
                  onChange={(e) => setSelectedPet(e.target.value)}
                  className="w-full border-slate-200 rounded-xl"
                >
                  {pets.map((p: any) => (
                    <option key={p.id} value={p.id}>{p.name}</option>
                  ))}
                </select>
              ) : (
                <p className="font-semibold text-slate-900 text-lg">{appointment.pet?.name}</p>
              )}
            </div>

            <div>
              <h3 className="text-sm font-medium text-slate-500 uppercase tracking-wider mb-1">Tipo de Cita</h3>
              <p className="font-medium text-slate-900 capitalize">{appointment.type.toLowerCase()}</p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3 text-slate-700">
                <MapPin className="w-5 h-5 text-blue-500" />
                <span>{appointment.branch?.name || "Sucursal Principal"}</span>
              </div>
              <div className="flex items-center gap-3 text-slate-700">
                <Calendar className="w-5 h-5 text-emerald-500" />
                <span>{aptDate.toLocaleDateString("es-ES", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}</span>
              </div>
              <div className="flex items-center gap-3 text-slate-700">
                <Clock className="w-5 h-5 text-purple-500" />
                <span>{aptDate.toLocaleTimeString("es-ES", { hour: "2-digit", minute: "2-digit" })}</span>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100">
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${appointment.status === 'COMPLETED' ? 'bg-emerald-100 text-emerald-700' :
                  appointment.status === 'CANCELLED' ? 'bg-red-100 text-red-700' :
                    isPast ? 'bg-slate-100 text-slate-700' : 'bg-blue-100 text-blue-700'
                }`}>
                Estado: {appointment.status}
              </span>
            </div>
          </div>

          {isEditing && (
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
              <h3 className="font-semibold text-slate-900 mb-4">Reagendar Cita</h3>
              <div className="space-y-6">
                <CalendarSelector selectedDate={selectedDate} onSelect={setSelectedDate} />
                {selectedDate && (
                  <TimeSlotSelector
                    branchId={appointment.branchId}
                    date={selectedDate}
                    selectedTime={selectedTime}
                    onSelect={setSelectedTime}
                    veterinarianId={appointment.veterinarianId}
                  />
                )}

                <div className="flex justify-end gap-3 pt-4 border-t border-slate-200">
                  <button
                    onClick={() => setIsEditing(false)}
                    className="px-4 py-2 text-slate-600 hover:text-slate-800"
                  >
                    Descartar
                  </button>
                  <button
                    onClick={handleSave}
                    disabled={saving || !selectedTime}
                    className="px-6 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 disabled:opacity-50 flex items-center gap-2"
                  >
                    {saving && <Loader2 className="w-4 h-4 animate-spin" />}
                    Guardar Cambios
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </Card>
    </div>
  )
}
