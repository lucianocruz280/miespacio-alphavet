import { useState } from "react"
import { useRouter } from "next/router"

import PetSelector from "./PetSelector"
import CalendarSelector from "./AppointmentCalendar"
import TimeSlotSelector from "./TimeSlotSelector"
import AppointmentSummary from "./AppointmentSummary"

import Card from "@/components/ui/Card"
import Field from "@/components/ui/Field"
import Input from "@/components/ui/Input"
import Select from "@/components/ui/Select"
import Textarea from "@/components/ui/Textarea"
import Button from "@/components/ui/Button"

import { Pet } from "@/types/Pets"
import api from "@/lib/axios"

const CreateAppointmentView = () => {
  const router = useRouter()

  // core state
  const [selectedPet, setSelectedPet] = useState<Pet | null>(null)
  const [selectedDate, setSelectedDate] = useState<string | null>(null)
  const [selectedTime, setSelectedTime] = useState<string | null>(null)

  // appointment details
  const [type, setType] = useState("CONSULTA")
  const [reason, setReason] = useState("")
  const [notes, setNotes] = useState("")

  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  /**
   * Construye el ISO final combinando fecha + hora
   * Ej: 2024-01-20 + 14:30 → 2024-01-20T14:30:00.000Z
   */
  const buildScheduledDate = () => {
    if (!selectedDate || !selectedTime) return null
    return new Date(`${selectedDate}T${selectedTime}:00`).toISOString()
  }

  const handleConfirm = async () => {
    if (!selectedPet || !selectedDate || !selectedTime) return

    setSaving(true)
    setError(null)

    try {
      await api.post("/appointments", {
        petId: selectedPet.id,
        scheduledDate: buildScheduledDate(),
        type,
        reason,
        notes,
      })

      router.push("/appointments")
    } catch (err: any) {
      setError(err.message || "Error al crear la cita")
    } finally {
      setSaving(false)
    }
  }

  return (
    <main className="max-w-6xl mx-auto p-4 md:p-8">
      <div className="grid lg:grid-cols-12 gap-8 items-start">

        {/* LEFT COLUMN */}
        <div className="lg:col-span-7 xl:col-span-8 space-y-8">

          {/* PET SELECTION */}
          {true && (
            <section className="animate-in fade-in slide-in-from-bottom-2 duration-300">
              <h2 className="text-lg font-medium text-slate-900 mb-4">
                ¿Para qué mascota deseas agendar la cita?
              </h2>

              <PetSelector
                selectedPetId={selectedPet?.id}
                onSelect={setSelectedPet}
              />
            </section>
          )}

          {/* CALENDAR */}
          {selectedPet && (
            <section className="animate-in fade-in slide-in-from-bottom-2 duration-300">
              <CalendarSelector
                selectedDate={selectedDate}
                onSelect={(date) => {
                  setSelectedDate(date)
                  setSelectedTime(null)
                }}
              />
            </section>
          )}

          {/* TIME SLOTS */}
          {selectedDate && (
            <section className="animate-in fade-in slide-in-from-bottom-2 duration-300">
              <TimeSlotSelector
                selectedTime={selectedTime}
                onSelect={setSelectedTime}
              />
            </section>
          )}

          {/* NOTES */}
          {selectedTime && (
            <Card className="animate-in fade-in slide-in-from-bottom-2 duration-300 p-6">
              <Field label="Notas adicionales (opcional)">
                <Textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="¿Tu mascota tiene alguna condición especial?"
                />
              </Field>
            </Card>
          )}
        </div>

   
        <div className="lg:col-span-5 xl:col-span-4 space-y-6">

    
          <Card className="p-6">
            <h2 className="font-medium text-slate-900 mb-5">
              Detalles de la cita
            </h2>

            <div className="space-y-4">
              <Field label="Tipo de cita">
                <Select
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  options={[
                    { value: "CONSULTA", label: "Consulta" },
                    { value: "VACUNACION", label: "Vacunación" },
                    { value: "REVISION", label: "Revisión General" },
                    { value: "EMERGENCIA", label: "Emergencia" },
                  ]}
                />
              </Field>

              <Field label="Motivo de la visita">
                <Input
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  placeholder="Ej. Revisión anual"
                />
              </Field>
            </div>
          </Card>

    
          <AppointmentSummary
            petName={selectedPet?.name}
            petSpecies={selectedPet?.species}
            date={selectedDate}
            time={selectedTime}
            type={type}
            reason={reason}
            onConfirm={handleConfirm}
            onCancel={() => router.back()}
          />

          {saving && (
            <p className="text-sm text-slate-500 text-center">
              Guardando cita…
            </p>
          )}

          {error && (
            <p className="text-sm text-red-600 text-center">
              {error}
            </p>
          )}
        </div>
      </div>
    </main>
  )
}

export default CreateAppointmentView
