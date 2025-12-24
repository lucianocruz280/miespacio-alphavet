import { Plus, Check, X } from "lucide-react"
import { useState } from "react"
import Button from "./Button"

type Option = {
  value: string
  label: string
}

type SelectCreatableProps = {
  value?: string
  options: Option[]
  placeholder?: string
  onChange?: (value: string) => void
  onCreate?: (name: string) => Promise<void> | void
}

const SelectCreatable = ({
  value,
  options,
  placeholder = "Selecciona...",
  onChange,
  onCreate,
}: SelectCreatableProps) => {
  const [isCreating, setIsCreating] = useState(false)
  const [newValue, setNewValue] = useState("")

  if (isCreating) {
    return (
      <div className="flex gap-2">
        <input
          value={newValue}
          onChange={(e) => setNewValue(e.target.value)}
          placeholder="Escribe el nombre"
          className="flex-1 rounded-xl border border-slate-200 px-3 py-2 text-sm focus:ring-2 focus:ring-primary-500"
        />

        <Button
          variant="primary"
          onClick={async () => {
            if (!newValue.trim()) return
            await onCreate?.(newValue)
            setNewValue("")
            setIsCreating(false)
          }}
        >
          <Check className="w-4 h-4" />
        </Button>

        <Button
          variant="ghost"
          onClick={() => {
            setNewValue("")
            setIsCreating(false)
          }}
        >
          <X className="w-4 h-4" />
        </Button>
      </div>
    )
  }

  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => {
          if (e.target.value === "__create__") {
            setIsCreating(true)
            return
          }
          onChange?.(e.target.value)
        }}
        className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm focus:ring-2 focus:ring-primary-500"
      >
        <option value="">{placeholder}</option>

        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}

        <option value="__create__">➕ Agregar nuevo</option>
      </select>
    </div>
  )
}

export default SelectCreatable
