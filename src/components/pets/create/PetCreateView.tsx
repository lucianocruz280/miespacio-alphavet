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
import { useTranslation } from "react-i18next"

import { useSpecies } from "@/hooks/useSpecies"
import { useBreeds } from "@/hooks/useBreeds"
import api from "@/lib/axios"



const PetCreateView = () => {
  const router = useRouter()
  const { t } = useTranslation('common')

  const genderOptions = [
    { value: "", label: t("pets.createView.genderOptions.select") },
    { value: "male", label: t("pets.createView.genderOptions.male") },
    { value: "female", label: t("pets.createView.genderOptions.female") },
  ]

  const [speciesId, setSpeciesId] = useState("")
  const [speciesName, setSpeciesName] = useState("")
  const [breedId, setBreedId] = useState("")
  const [breedName, setBreedName] = useState("")
  const { species } = useSpecies()
  const { breeds, loading: breedsLoading } = useBreeds(speciesId)
  const [genderId, setGenderId] = useState("")
  const [gender, setGender] = useState("")
  const [form, setForm] = useState({
    name: "",
    age: "",
    color: "",
    weight: "",
    microchip: "",
    notes: "",
  })

  const [photoUrl, setPhotoUrl] = useState<string | null>(null)
  const [photoPreview, setPhotoPreview] = useState<string | null>(null)

  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<Record<string, string>>({})
  const [uploading, setUploading] = useState(false)
  const { return: returnUrl } = router.query
  const update = (key: string, value: string) =>
    setForm((prev) => ({ ...prev, [key]: value }))


  const uploadPetPhoto = async (file: File): Promise<string> => {

    const formData = new FormData()
    formData.append("file", file)

    const res = await api.post("/pets/photo/upload", formData)

    return res.data.url
  }


  const handlePhotoChange = async (file: File) => {

    setUploading(true)

    // preview inmediato
    setPhotoPreview(URL.createObjectURL(file))

    try {

      const url = await uploadPetPhoto(file)

      setPhotoUrl(url)

    } catch (error) {

      console.error("Error subiendo imagen", error)

    } finally {

      setUploading(false)

    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setError({})

    try {
      const errors: Record<string, string> = {}

      if (!form.name) errors.name = t("pets.createView.errors.nameRequired")
      if (!speciesId) errors.species = t("pets.createView.errors.speciesRequired")
      if (!breedId) errors.breed = t("pets.createView.errors.breedRequired")
      if (!gender) errors.gender = t("pets.createView.errors.genderRequired")

      if (Object.keys(errors).length > 0) {
        setError(errors)
        setSaving(false)
        return
      }
      console.log("errors", error)

      await api.post("/pets", {
        name: form.name,
        species: speciesName,
        breed: breedName,
        gender: gender,
        age: form.age || null,
        color: form.color || null,
        weight: form.weight ? Number(form.weight) : null,
        microchip: form.microchip || null,
        notes: form.notes || null,
        photo: photoUrl,
      })

      if (returnUrl) {
        router.push(returnUrl as string)
      } else {
        router.push("/pets")
      }

    } catch (err: unknown) {
      if (err instanceof Error) {
        setError({ submit: err.message || t("pets.createView.errors.saveError") })
      } else {
        setError({ submit: t("pets.createView.errors.saveError") })
      }
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
                {t("pets.createView.title")}
              </h1>
              <p className="mt-1 text-slate-500">
                {t("pets.createView.subtitle")}
              </p>
            </div>

            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium bg-primary-50 text-primary-700 border border-primary-100">
              <PawPrint className="w-4 h-4" />
              {t("pets.createView.clientPortal")}
            </div>
          </div>
        </div>

        <Card className="p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
            <div className="relative shrink-0">
              <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center overflow-hidden">

                {photoPreview ? (
                  <img
                    src={photoPreview}
                    alt="Foto mascota"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <Camera className="w-6 h-6 text-slate-400" />
                )}

                {uploading && (
                  <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/70 backdrop-blur-sm">
                    <span className="text-xs text-slate-600">{t("pets.createView.photoSection.uploading")}</span>
                  </div>
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
                {t("pets.createView.photoSection.title")}
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                {t("pets.createView.photoSection.subtitle")}
              </p>
            </div>
          </div>
        </Card>

        <Card>
          <CardHeader title={t("pets.createView.basicInfo.title")} />
          <div className="p-6 sm:p-8 grid grid-cols-1 sm:grid-cols-2 gap-5">
            <Field label={t("pets.createView.basicInfo.nameLabel")} required error={error?.name}>
              <Input
                placeholder={t("pets.createView.basicInfo.namePlaceholder")}
                value={form.name}
                onChange={(e) => update("name", e.target.value)}
              />
            </Field>

            <Field label={t("pets.createView.basicInfo.speciesLabel")} required error={error?.species}>
              <Select
                value={speciesId}
                options={species}
                onChange={(e) => {
                  const value = e.target.value
                  const selected = species.find((s) => s.value === value)
                  console.log("speciesId", speciesId)
                  setSpeciesId(value)
                  setSpeciesName(selected?.label || "")
                  setBreedId("")
                }}
              />
            </Field>

            <Field label={t("pets.createView.basicInfo.breedLabel")} required error={error?.breed}>
              <Select
                value={breedId}
                options={breeds}
                disabled={!speciesId || breedsLoading}
                onChange={(e) => {
                  const value = e.target.value
                  const selected = breeds.find((b) => b.value === value)

                  setBreedId(value)
                  setBreedName(selected?.label || "")
                }}
              />
            </Field>

            <Field label={t("pets.createView.basicInfo.genderLabel")} error={error?.gender}>
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

            <Field label={t("pets.createView.basicInfo.ageLabel")}>
              <Input
                type="number"
                min="0"
                max="40"
                placeholder={t("pets.createView.basicInfo.agePlaceholder")}
                value={form.age}
                onChange={(e) => update("age", e.target.value)}
              />
            </Field>

            <Field label={t("pets.createView.basicInfo.weightLabel")}>
              <Input
                type="number"
                step="0.1"
                placeholder={t("pets.createView.basicInfo.weightPlaceholder")}
                value={form.weight}
                onChange={(e) => update("weight", e.target.value)}
              />
            </Field>
          </div>
        </Card>

        <Card>
          <CardHeader title={t("pets.createView.additionalDetails.title")} />
          <div className="p-6 sm:p-8 grid grid-cols-1 sm:grid-cols-2 gap-5">
            <Field label={t("pets.createView.additionalDetails.colorLabel")}>
              <Input
                value={form.color}
                onChange={(e) => update("color", e.target.value)}
              />
            </Field>

            <Field label={t("pets.createView.additionalDetails.microchipLabel")}>
              <Input
                placeholder={t("pets.createView.additionalDetails.microchipPlaceholder")}
                value={form.microchip}
                onChange={(e) => update("microchip", e.target.value)}
              />
            </Field>

            <div className="sm:col-span-2">
              <Field label={t("pets.createView.additionalDetails.notesLabel")}>
                <Textarea
                  value={form.notes}
                  onChange={(e) => update("notes", e.target.value)}
                />
              </Field>
            </div>
          </div>
        </Card>

        {/* {error && <p className="text-sm text-red-600">{error}</p>} */}

        <div className="sticky bottom-4">
          <Card className="p-4 sm:p-5">
            <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
              <p className="text-sm text-slate-500">
                {t("pets.createView.actions.editLaterMsg")}
              </p>

              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  type="button"
                  variant="secondary"
                  className="w-full sm:w-auto"
                  onClick={() => router.back()}
                >
                  <X className="w-4 h-4 text-slate-500" />
                  {t("pets.createView.actions.cancelBtn")}
                </Button>

                <Button type="submit" disabled={saving}>
                  <Save className="w-4 h-4" />
                  {saving ? t("pets.createView.actions.savingBtn") : t("pets.createView.actions.saveBtn")}
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
