import { useEffect, useState } from "react"
import { X, Loader } from "lucide-react"

import Button from "@/components/ui/Button"
import Field from "@/components/ui/Field"
import Input from "@/components/ui/Input"
import api from "@/lib/axios"

type EditPetModalProps = {
  isOpen: boolean
  onClose: () => void
  pet: any
  onSuccess: () => void
}

const SPECIES_OPTIONS = [
  "Perro",
  "Gato",
  "Ave",
  "Conejo",
  "Hámster",
  "Pez",
  "Reptil",
  "Otro",
]

const EditPetModal = ({ isOpen, onClose, pet, onSuccess }: EditPetModalProps) => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [formData, setFormData] = useState({
    name: "",
    species: "Perro",
    breed: "",
    age: "",
    color: "",
    weight: "",
    gender: "Macho",
    microchip: "",
    isSterilized: false,
  })

  useEffect(() => {
    if (pet && isOpen) {
      setFormData({
        name: pet.name || "",
        species: pet.species || "Perro",
        breed: pet.breed || "",
        age: pet.age?.toString() || "",
        color: pet.color || "",
        weight: pet.weight?.toString() || "",
        gender: pet.gender || "Macho",
        microchip: pet.microchip || "",
        isSterilized: pet.isSterilized || false,
      })
      setError(null)
    }
  }, [pet, isOpen])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const payload: any = {
        name: formData.name,
        species: formData.species,
        breed: formData.breed,
        gender: formData.gender,
        isSterilized: formData.isSterilized,
      }

      if (formData.age) payload.age = formData.age
      if (formData.color) payload.color = formData.color
      if (formData.weight) payload.weight = parseFloat(formData.weight)
      if (formData.microchip) payload.microchip = formData.microchip

      await api.patch(`/pets/${pet.id}`, payload)
      onSuccess()
      onClose()
    } catch (err: any) {
      setError(err?.response?.data?.message || "Ocurrió un error al actualizar la mascota")
    } finally {
      setLoading(false)
    }
  }

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div 
        className="fixed inset-0 bg-slate-900/30 backdrop-blur-sm" 
        onClick={onClose}
      />

      <div className="relative w-full max-w-lg transform overflow-hidden rounded-2xl bg-white p-6 md:p-8 shadow-xl transition-all">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold leading-6 text-slate-900">
            Editar perfil de mascota
          </h3>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-500 rounded-lg hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
                    <Field label="Nombre" required>
                      <Input
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Ej. Max"
                      />
                    </Field>

                    <Field label="Especie" required>
                      <select
                        value={formData.species}
                        onChange={(e) => setFormData({ ...formData, species: e.target.value })}
                        className="w-full h-11 px-4 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors"
                      >
                        {SPECIES_OPTIONS.map((s) => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                    </Field>

                    <Field label="Raza">
                      <Input
                        value={formData.breed}
                        onChange={(e) => setFormData({ ...formData, breed: e.target.value })}
                        placeholder="Ej. Golden Retriever"
                      />
                    </Field>

                    <Field label="Edad (Ej: 2 años)">
                      <Input
                        value={formData.age}
                        onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                        placeholder="Ej. 2 años"
                      />
                    </Field>

                    <Field label="Color">
                      <Input
                        value={formData.color}
                        onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                        placeholder="Ej. Dorado"
                      />
                    </Field>

                    <Field label="Peso (kg)">
                      <Input
                        type="number"
                        step="0.1"
                        value={formData.weight}
                        onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                        placeholder="Ej. 12.5"
                      />
                    </Field>

                    <Field label="Sexo" required>
                      <select
                        value={formData.gender}
                        onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                        className="w-full h-11 px-4 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors"
                      >
                         <option value="Macho">Macho</option>
                         <option value="Hembra">Hembra</option>
                      </select>
                    </Field>

                     <Field label="Microchip">
                      <Input
                        value={formData.microchip}
                        onChange={(e) => setFormData({ ...formData, microchip: e.target.value })}
                        placeholder="Opcional"
                      />
                    </Field>

                    <div className="md:col-span-2 pt-2 pb-1">
                      <label className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formData.isSterilized}
                          onChange={(e) => setFormData({ ...formData, isSterilized: e.target.checked })}
                          className="w-5 h-5 rounded border-slate-300 text-blue-600 focus:ring-blue-500/20"
                        />
                        <span className="text-sm font-medium text-slate-700">
                          Mascota esterilizada
                        </span>
                      </label>
                    </div>

                  </div>

                  {error && (
                    <div className="text-sm text-red-600 bg-red-50 border border-red-100 p-3 rounded-xl">
                      {error}
                    </div>
                  )}

                  <div className="flex gap-3 justify-end pt-2 border-t border-slate-100">
                    <Button type="button" variant="secondary" onClick={onClose}>
                      Cancelar
                    </Button>
                    <Button type="submit" disabled={loading}>
                      {loading ? <Loader className="w-5 h-5 animate-spin" /> : "Guardar cambios"}
                    </Button>
                  </div>

                </form>
        </div>
    </div>
  )
}

export default EditPetModal
