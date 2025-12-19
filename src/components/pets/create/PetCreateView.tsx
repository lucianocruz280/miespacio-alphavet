import { Camera, PawPrint, Save, X } from "lucide-react"
import Card from "@/components/ui/Card"
import CardHeader from "@/components/ui/CardHeader"
import Button from "@/components/ui/Button"

const PetCreateView = () => {
  return (
    <main className="flex-1 min-w-0">
      <div className="max-w-4xl">
        {/* Header */}
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

        <div className="space-y-6">
          {/* Photo Card */}
          <Card className="p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
              <div className="relative shrink-0">
                <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center overflow-hidden">
                  {/* Aquí luego va la imagen real */}
                  <Camera className="w-6 h-6 text-slate-400" />
                </div>

                <button
                  type="button"
                  className="absolute -bottom-1 -right-1 rounded-full bg-white border border-slate-200 shadow-sm p-2 hover:bg-slate-50 transition"
                  aria-label="Subir foto"
                >
                  <Camera className="w-4 h-4 text-slate-600" />
                </button>
              </div>

              <div className="flex-1 text-center sm:text-left">
                <h2 className="text-lg font-semibold text-slate-900 tracking-tight">
                  Foto de tu mascota
                </h2>
                <p className="mt-1 text-sm text-slate-500 leading-relaxed">
                  Súbela para reconocerla rápido en tus citas e historial.
                  Formatos sugeridos: JPG/PNG. (Luego lo conectamos a almacenamiento.)
                </p>

                <div className="mt-4 flex flex-col sm:flex-row gap-3">
                  <Button variant="secondary" className="w-full sm:w-auto">
                    <Camera className="w-4 h-4 text-slate-500" />
                    Subir foto
                  </Button>

                  <button
                    type="button"
                    className="w-full sm:w-auto inline-flex items-center justify-center text-sm font-medium text-slate-500 hover:text-slate-700"
                  >
                    Usar después
                  </button>
                </div>
              </div>
            </div>
          </Card>

          {/* Basic Info */}
          <Card>
            <CardHeader
              title="Información básica"
              right={<span className="text-xs text-slate-400">Campos principales</span>}
            />

            <div className="p-6 sm:p-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <Field label="Nombre" required>
                  <Input placeholder="Ej. Bruno" />
                </Field>

                <Field label="Especie" required>
                  <Select
                    defaultValue=""
                    options={[
                      { value: "", label: "Selecciona..." },
                      { value: "dog", label: "Perro" },
                      { value: "cat", label: "Gato" },
                    ]}
                  />
                </Field>

                <Field label="Raza">
                  <Input placeholder="Ej. Golden Retriever / Mestizo" />
                </Field>

                <Field label="Sexo">
                  <Select
                    defaultValue=""
                    options={[
                      { value: "", label: "Selecciona..." },
                      { value: "male", label: "Macho" },
                      { value: "female", label: "Hembra" },
                    ]}
                  />
                </Field>

                <Field label="Fecha de nacimiento">
                  <Input type="date" />
                </Field>

                <Field label="Peso (kg)" hint="Aprox. sirve para dosis y recomendaciones.">
                  <Input type="number" step="0.1" placeholder="Ej. 12.5" />
                </Field>
              </div>

              <div className="mt-5 rounded-xl bg-blue-50 border border-blue-100 p-4 flex gap-3">
                <div className="shrink-0 mt-0.5 w-9 h-9 rounded-lg bg-white border border-blue-200 flex items-center justify-center">
                  <PawPrint className="w-4 h-4 text-primary-700" />
                </div>
                <div>
                  <p className="text-sm font-medium text-blue-900">
                    Tip rápido
                  </p>
                  <p className="text-sm text-blue-700 mt-0.5">
                    Si no sabes la raza exacta, pon “Mestizo” y lo afinamos después.
                  </p>
                </div>
              </div>
            </div>
          </Card>

          {/* Additional Details */}
          <Card>
            <CardHeader
              title="Detalles adicionales"
              right={<span className="text-xs text-slate-400">Opcional</span>}
            />

            <div className="p-6 sm:p-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <Field label="Color / señas particulares">
                  <Input placeholder="Ej. Dorado, mancha blanca en pecho" />
                </Field>

                <Field label="ID de microchip" hint="Si tiene microchip, aquí lo registras.">
                  <Input placeholder="Ej. 981020001234567" />
                </Field>

                <div className="sm:col-span-2">
                  <Field label="Notas">
                    <Textarea placeholder="Ej. Se pone nervioso en corte de uñas. Responde bien a premios." />
                  </Field>
                </div>
              </div>
            </div>
          </Card>

          {/* Actions */}
          <div className="sticky bottom-4">
            <Card className="p-4 sm:p-5">
              <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
                <p className="text-sm text-slate-500">
                  Puedes editar estos datos después desde el perfil de la mascota.
                </p>

                <div className="flex flex-col sm:flex-row gap-3">
                  <Button variant="secondary" className="w-full sm:w-auto">
                    <X className="w-4 h-4 text-slate-500" />
                    Cancelar
                  </Button>

                  <Button className="w-full sm:w-auto">
                    <Save className="w-4 h-4" />
                    Guardar mascota
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </main>
  )
}

export default PetCreateView

// ---------- UI bits (puedes moverlos luego a /ui) ----------

type FieldProps = {
  label: string
  required?: boolean
  hint?: string
  children: React.ReactNode
}

const Field = ({ label, required = false, hint, children }: FieldProps) => {
  return (
    <label className="block">
      <div className="flex items-center justify-between gap-3 mb-2">
        <span className="text-sm font-medium text-slate-700">
          {label}{" "}
          {required && (
            <span className="text-xs text-slate-400">(requerido)</span>
          )}
        </span>
        {hint ? <span className="text-xs text-slate-400">{hint}</span> : null}
      </div>
      {children}
    </label>
  )
}

type InputProps = React.InputHTMLAttributes<HTMLInputElement>

const Input = ({ className, ...props }: InputProps) => {
  return (
    <input
      {...props}
      className={[
        "w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900",
        "placeholder:text-slate-400",
        "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 focus:border-primary-500",
        "transition",
        className ?? "",
      ].join(" ")}
    />
  )
}

type SelectOption = { value: string; label: string }

type SelectProps = React.SelectHTMLAttributes<HTMLSelectElement> & {
  options: SelectOption[]
}

const Select = ({ className, options, ...props }: SelectProps) => {
  return (
    <select
      {...props}
      className={[
        "w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900",
        "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 focus:border-primary-500",
        "transition",
        className ?? "",
      ].join(" ")}
    >
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  )
}

type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>

const Textarea = ({ className, ...props }: TextareaProps) => {
  return (
    <textarea
      {...props}
      rows={4}
      className={[
        "w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900",
        "placeholder:text-slate-400",
        "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 focus:border-primary-500",
        "transition",
        className ?? "",
      ].join(" ")}
    />
  )
}
