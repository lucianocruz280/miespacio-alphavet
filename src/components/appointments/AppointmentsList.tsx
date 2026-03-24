import useAxios from "@/hooks/useAxios"
import Card from "@/components/ui/Card"
import { Calendar, Clock, MapPin, CheckCircle, Clock3 } from "lucide-react"
import Link from "next/link"

const AppointmentsList = () => {
  const { data, loading } = useAxios({
    method: "get",
    url: "myspace/appointments",
  })

  // The endpoint returns { success: true, data: [...] }
  const appointments = (data as any)?.data ?? []

  if (loading) {
    return (
      <div className="grid gap-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="h-32 rounded-xl bg-slate-100 animate-pulse" />
        ))}
      </div>
    )
  }

  if (appointments.length === 0) {
    return (
      <div className="text-center py-12 px-4 rounded-xl border border-dashed border-slate-300">
        <Calendar className="w-12 h-12 text-slate-300 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-slate-900">No tienes citas programadas</h3>
        <p className="text-slate-500 mt-1">
          Cuando programes una nueva cita, aparecerá aquí.
        </p>
      </div>
    )
  }

  return (
    <div className="grid gap-4">
      {appointments.map((apt: any) => {
        const date = new Date(apt.scheduledDate)
        const isPast = date < new Date()
        
        return (
          <Link href={`/my-appointments/${apt.id}`} key={apt.id} className="block group">
            <Card className="p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 transition-all hover:border-blue-300 hover:shadow-md">
              <div>
                <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${isPast ? 'bg-slate-100 text-slate-600' : 'bg-blue-50 text-blue-600'}`}>
                  {isPast ? <CheckCircle className="w-5 h-5" /> : <Clock3 className="w-5 h-5" />}
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900">
                    Cita para {apt.pet?.name || "tu mascota"}
                  </h3>
                  <p className="text-sm text-slate-500 capitalize">
                    {apt.type.toLowerCase()}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 text-sm text-slate-600">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-slate-400 shrink-0" />
                <span>
                  {date.toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'long' })}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-slate-400 shrink-0" />
                <span>
                  {date.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
                <span>{apt.branch?.name || "Sucursal principal"}</span>
              </div>
            </div>
          </Card>
        </Link>
        )
      })}
    </div>
  )
}

export default AppointmentsList
