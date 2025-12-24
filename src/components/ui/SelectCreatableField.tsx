import Field from "@/components/ui/Field"
import SelectCreatable from "@/components/ui/SelectCreatable"

type Props = {
  label: string
  value?: string
  options: { value: string; label: string }[]
  loading?: boolean
  disabled?: boolean
  onChange?: (v: string) => void
  onCreate?: (name: string) => Promise<void>
}

const SelectCreatableField = ({
  label,
  value,
  options,
  loading,
  disabled,
  onChange,
  onCreate,
}: Props) => {
  return (
    <Field label={label}>
      {loading ? (
        <div className="text-sm text-slate-400">Cargando…</div>
      ) : (
        <SelectCreatable
          value={value}
          options={options}
          onChange={onChange}
          onCreate={onCreate}
        />
      )}
    </Field>
  )
}

export default SelectCreatableField
