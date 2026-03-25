import useAxios from "@/hooks/useAxios"
import Card from "@/components/ui/Card"
import { Calendar, Stethoscope, Scissors, CheckCircle } from "lucide-react"
import Link from "next/link"
import { useTranslation } from "react-i18next"

const ServicesList = () => {
  const { t } = useTranslation('common')
  const { data, loading } = useAxios({
    method: "get",
    url: "myspace/services",
  })

  // The endpoint returns { success: true, data: [...] }
  const services = (data as { data: any[] })?.data ?? []

  if (loading) {
    return (
      <div className="grid gap-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="h-32 rounded-xl bg-slate-100 animate-pulse" />
        ))}
      </div>
    )
  }

  if (services.length === 0) {
    return (
      <div className="text-center py-12 px-4 rounded-xl border border-dashed border-slate-300">
        <CheckCircle className="w-12 h-12 text-slate-300 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-slate-900">{t("services.list.empty.title")}</h3>
        <p className="text-slate-500 mt-1">
          {t("services.list.empty.description")}
        </p>
      </div>
    )
  }

  return (
    <div className="grid gap-4">
      {services.map((svc: Record<string, any>) => {
        const date = new Date(svc.historicalDate)
        const isGrooming = svc.serviceCategory === 'GROOMING'
        
        return (
          <Link href={`/my-services/${svc.id}?category=${svc.serviceCategory.toLowerCase()}`} key={svc.id} className="block group">
            <Card className="p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 transition-all hover:border-emerald-300 hover:shadow-md">
              <div>
                <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${isGrooming ? 'bg-purple-50 text-purple-600' : 'bg-emerald-50 text-emerald-600'}`}>
                  {isGrooming ? <Scissors className="w-5 h-5" /> : <Stethoscope className="w-5 h-5" />}
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900">
                    {isGrooming ? t("services.list.types.spaDay") : t("services.list.types.medical")} {t("services.list.for")} {svc.pet?.name}
                  </h3>
                  <p className="text-sm text-slate-500 capitalize">
                    {isGrooming ? t("services.list.categories.grooming") : (svc.type ? svc.type.toLowerCase() : t("services.list.categories.general"))}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 text-sm text-slate-600">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-slate-400 shrink-0" />
                <span>
                  {date.toLocaleDateString('es-ES', { day: 'numeric', month: 'short', year: 'numeric' })}
                </span>
              </div>
              
              <div className="flex items-center gap-2 bg-slate-100 px-3 py-1 rounded-full text-slate-700 text-xs font-medium">
                {t("services.list.completed")}
              </div>
            </div>
          </Card>
        </Link>
        )
      })}
    </div>
  )
}

export default ServicesList
