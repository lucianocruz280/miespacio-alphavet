import { Plus } from "lucide-react"
import { useRouter } from "next/router"
import { FC } from "react"
type Props = {
  classNames: string
}
const AddPetCard: FC<Props> = ({ classNames }) => {
  const router = useRouter()
  return (
    <button onClick={() => router.push('/pets/create')} className={`group flex cursor-pointer flex-col items-center justify-center p-5 min-h-[140px] rounded-xl border-2 border-dashed border-slate-200 hover:border-blue-400 hover:bg-blue-50/30 transition-all text-center ${classNames}`}>
      <div className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center shadow-sm group-hover:scale-110 group-hover:border-blue-200 transition-all duration-300 mb-3">
        <Plus className="w-5 h-5 text-slate-400 group-hover:text-blue-600 transition-colors" />
      </div>

      <span className="text-sm font-medium text-slate-900 group-hover:text-blue-700 transition-colors">
        Agregar nueva mascota
      </span>

      <span className="text-xs text-slate-400 mt-1">
        Registrar nuevo perfil
      </span>
    </button>
  )
}

export default AddPetCard
