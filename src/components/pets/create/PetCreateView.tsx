import { Camera, PawPrint, Save, X } from "lucide-react"
import { useState } from "react"
import { useRouter } from "next/router"

import Card from "@/components/ui/Card"
import CardHeader from "@/components/ui/CardHeader"
import Button from "@/components/ui/Button"
import Field from "@/components/ui/Field"
import Input from "@/components/ui/Input"
import Select from "@/components/ui/Select"
import Textarea from "@/components/ui/Textarea"
import SelectCreatable from "@/components/ui/SelectCreatable"

import { useSpecies } from "@/hooks/useSpecies"
import { useBreeds } from "@/hooks/useBreeds"
import api from "@/lib/axios"

const genderOptions = [
  { value: "", label: "Selecciona..." },
  { value: "male", label: "Macho" },
  { value: "female", label: "Hembra" },
]

const PetCreateView = () => {
  const router = useRouter()

  const [speciesId, setSpeciesId] = useState("")
  const [speciesName, setSpeciesName] = useState("")
  const [breedId, setBreedId] = useState("")
  const [breedName, setBreedName] = useState("")
  const { species, loading: speciesLoading, create: createSpecies } = useSpecies()
  const { breeds, loading: breedsLoading, create: createBreed } = useBreeds(speciesId)
  const [genderId, setGenderId] = useState("")
  const [gender, setGender] = useState("")
  const [form, setForm] = useState({
    name: "",
    birthDate: "",
    color: "",
    weight: "",
    microchip: "",
    notes: "",
  })

  const [photoUrl, setPhotoUrl] = useState<string | null>(null)
  const [photoPreview, setPhotoPreview] = useState<string | null>(null)

  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const update = (key: string, value: any) =>
    setForm((prev) => ({ ...prev, [key]: value }))


  const uploadPetPhoto = async (_file: File): Promise<string> => {
    return "https://placehold.co/400x400?text=Pet+Photo"
  }

  const handlePhotoChange = async (file: File) => {
    setPhotoPreview(URL.createObjectURL(file))
    const url = await uploadPetPhoto(file)
    setPhotoUrl(url)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setError(null)

    try {
      if (!form.name || !speciesId || !breedId) {
        throw new Error("Completa los campos obligatorios")
      }

      await api.post("/pets", {
        name: form.name,
        species: speciesName,
        breed: breedName,
        gender: gender,
        birthDate: form.birthDate || null,
        color: form.color || null,
        weight: form.weight ? Number(form.weight) : null,
        microchip: form.microchip || null,
        notes: form.notes || null,
        photo: photoUrl,
      })

      router.push("/pets")
    } catch (err: any) {
      setError(err.message || "Error al guardar la mascota")
    } finally {
      setSaving(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex-1 min-w-0">
      <div className="max-w-5xl space-y-6">


        <div className="mb-6 sm:mb-8">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h1 className="text-3xl font-medium tracking-tight text-slate-900">
                Agregar mascota
              </h1>
              <p className="mt-1 text-slate-500">
                Registra a tu mascota para agendar citas, guardar historial y recibir recordatorios.
              </p>
            </div>

            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium bg-primary-50 text-primary-700 border border-primary-100">
              <PawPrint className="w-4 h-4" />
              Portal de clientes
            </div>
          </div>
        </div>

        <Card className="p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
            <div className="relative shrink-0">
              <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center overflow-hidden">
                {photoPreview ? (
                  <img
                    src={photoPreview}
                    alt="Foto mascota"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <Camera className="w-6 h-6 text-slate-400" />
                )}
              </div>

              <label className="absolute -bottom-1 -right-1 rounded-full bg-white border border-slate-200 shadow-sm p-2 hover:bg-slate-50 transition cursor-pointer">
                <Camera className="w-4 h-4 text-slate-600" />
                <input
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={(e) => {
                    if (e.target.files?.[0]) {
                      handlePhotoChange(e.target.files[0])
                    }
                  }}
                />
              </label>
            </div>

            <div className="flex-1 text-center sm:text-left">
              <h2 className="text-lg font-semibold text-slate-900 tracking-tight">
                Foto de tu mascota
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Opcional, puedes subirla después.
              </p>
            </div>
          </div>
        </Card>

        <Card>
          <CardHeader title="Información básica" />
          <div className="p-6 sm:p-8 grid grid-cols-1 sm:grid-cols-2 gap-5">
            <Field label="Nombre" required>
              <Input
                placeholder="Ej. Bruno"
                value={form.name}
                onChange={(e) => update("name", e.target.value)}
              />
            </Field>

            <Field label="Especie" required>
              <SelectCreatable
                value={speciesId}
                options={species}
                placeholder={speciesLoading ? "Cargando..." : "Selecciona una especie"}
                onChange={(value) => {
                  const selected = species.find((s) => s.value === value)
                  setSpeciesId(value)
                  setSpeciesName(selected?.label || "")
                  setBreedId("")
                }}
                onCreate={createSpecies}
              />
            </Field>

            <Field label="Raza" required>
              <SelectCreatable
                value={breedId}
                options={breeds}
                placeholder={
                  !speciesId
                    ? "Primero selecciona una especie"
                    : breedsLoading
                      ? "Cargando razas..."
                      : "Selecciona una raza"
                }
                onChange={(value) => {
                  const selected = breeds.find((s) => s.value == value)
                  setBreedId(value)
                  setBreedName(selected?.label || "")
                }}
                onCreate={createBreed}
              />
            </Field>

            <Field label="Sexo">
              <Select
                value={genderId}
                onChange={(e) => {
                  const selected = genderOptions.find((s) => s.value == e.target.value)
                  setGenderId(e.target.value)
                  setGender(selected?.label || "")
                }}
                options={genderOptions}
              />
            </Field>

            <Field label="Fecha de nacimiento">
              <Input
                type="date"
                value={form.birthDate}
                onChange={(e) => update("birthDate", e.target.value)}
              />
            </Field>

            <Field label="Peso (kg)">
              <Input
                type="number"
                step="0.1"
                placeholder="Ej. 12.5"
                value={form.weight}
                onChange={(e) => update("weight", e.target.value)}
              />
            </Field>
          </div>
        </Card>

        <Card>
          <CardHeader title="Detalles adicionales" />
          <div className="p-6 sm:p-8 grid grid-cols-1 sm:grid-cols-2 gap-5">
            <Field label="Color / señas particulares">
              <Input
                value={form.color}
                onChange={(e) => update("color", e.target.value)}
              />
            </Field>

            <Field label="ID de microchip">
              <Input
                value={form.microchip}
                onChange={(e) => update("microchip", e.target.value)}
              />
            </Field>

            <div className="sm:col-span-2">
              <Field label="Notas">
                <Textarea
                  value={form.notes}
                  onChange={(e) => update("notes", e.target.value)}
                />
              </Field>
            </div>
          </div>
        </Card>

        {error && <p className="text-sm text-red-600">{error}</p>}

        <div className="sticky bottom-4">
          <Card className="p-4 sm:p-5">
            <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
              <p className="text-sm text-slate-500">
                Puedes editar estos datos después desde el perfil de la mascota.
              </p>

              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  type="button"
                  variant="secondary"
                  className="w-full sm:w-auto"
                  onClick={() => router.back()}
                >
                  <X className="w-4 h-4 text-slate-500" />
                  Cancelar
                </Button>

                <Button type="submit" disabled={saving}>
                  <Save className="w-4 h-4" />
                  {saving ? "Guardando..." : "Guardar mascota"}
                </Button>
              </div>
            </div>
          </Card>
        </div>

      </div>
    </form>
  )
}

export default PetCreateView
