import useAxios from "@/hooks/useAxios"
import { Calendar, User, Stethoscope, Scissors, Pill, ChevronLeft, MapPin, Loader2 } from "lucide-react"
import Card from "@/components/ui/Card"
import Link from "next/link"
import { useTranslation } from "react-i18next"

type MyServiceDetailProps = {
  serviceId: string
  category: string
}

export default function MyServiceDetail({ serviceId, category }: MyServiceDetailProps) {
  const { data, loading } = useAxios({
    method: "get",
    url: `myspace/services/${category}/${serviceId}`,
  }, [category, serviceId])

  const { t } = useTranslation('common')
  const service = (data as { data: any })?.data

  if (loading || !service) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
      </div>
    )
  }

  const isGrooming = category === "grooming"
  const Icon = isGrooming ? Scissors : Stethoscope
  const title = isGrooming ? t("services.detail.types.grooming") : t("services.detail.types.medical")
  const date = new Date(service.createdAt)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-slate-900 flex items-center gap-3">
          <Link href="/my-services" className="p-2 hover:bg-slate-100 rounded-full transition-colors mr-1">
            <ChevronLeft className="w-5 h-5 text-slate-500" />
          </Link>
          {t("services.detail.title")}
        </h1>
        <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-sm font-medium">
          {t("services.detail.completed")}
        </span>
      </div>

      <Card className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className={`p-3 rounded-full ${isGrooming ? "bg-purple-100 text-purple-600" : "bg-emerald-100 text-emerald-600"}`}>
                <Icon className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-slate-900">{title}</h2>
                <p className="text-slate-500">{t("services.detail.pet")}: {service.pet?.name}</p>
              </div>
            </div>

            <div className="space-y-4 pt-4 border-t border-slate-100">
              <div className="flex items-center gap-3 text-slate-700">
                <MapPin className="w-5 h-5 text-blue-500" />
                <span>{service.branch?.name || t("services.detail.mainBranch")}</span>
              </div>
              <div className="flex items-center gap-3 text-slate-700">
                <Calendar className="w-5 h-5 text-indigo-500" />
                <span>{date.toLocaleDateString("es-ES", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}</span>
              </div>
              <div className="flex items-center gap-3 text-slate-700">
                <User className="w-5 h-5 text-slate-400" />
                <span>{t("services.detail.attendedBy")}: {isGrooming ? service.groomer?.name : service.veterinarian?.name}</span>
              </div>
            </div>
          </div>
          
          <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100 h-full">
            <h3 className="font-semibold text-slate-900 mb-2">
              {isGrooming ? t("services.detail.notes.groomingTitle") : t("services.detail.notes.medicalTitle")}
            </h3>
            <p className="text-slate-700 italic border-l-4 border-slate-300 pl-3 py-1">
              &quot;{isGrooming ? (service.notes || t("services.detail.notes.empty")) : service.reason}&quot;
            </p>

            {!isGrooming && service.diagnosis && (
              <div className="mt-6">
                <h3 className="font-semibold text-slate-900 mb-2">{t("services.detail.diagnosis")}</h3>
                <p className="text-slate-700">{service.diagnosis}</p>
              </div>
            )}
          </div>
        </div>

        {!isGrooming && service.treatment && (
          <div className="mb-8 p-6 bg-blue-50/50 rounded-2xl border border-blue-100">
            <h3 className="font-semibold text-blue-900 mb-2 flex items-center gap-2">
              <Pill className="w-5 h-5 text-blue-500" />
              {t("services.detail.treatment")}
            </h3>
            <p className="text-blue-800">{service.treatment}</p>
          </div>
        )}

        {!isGrooming && service.hasFollowUp && service.followUp && (
          <div className="mb-8 p-6 bg-amber-50/50 rounded-2xl border border-amber-100">
            <h3 className="font-semibold text-amber-900 mb-2 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-amber-500" />
              {t("services.detail.followUp")}
            </h3>
            <p className="text-amber-800">{service.followUp}</p>
          </div>
        )}

        {!isGrooming && service.prescriptions && service.prescriptions.length > 0 && (
          <div className="mb-8 border-t border-slate-100 pt-6">
            <h3 className="font-semibold text-slate-900 mb-4 flex items-center gap-2">
              <Pill className="w-5 h-5 text-indigo-500" />
              {t("services.detail.prescriptions.title")}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {service.prescriptions.map((prescription: Record<string, any>) => (
                <div key={prescription.id} className="p-4 bg-white border border-slate-200 rounded-xl hover:border-indigo-300 transition-colors">
                  <h4 className="font-medium text-slate-900">{prescription.productName || prescription.product?.name}</h4>
                  <div className="mt-2 text-sm text-slate-600 space-y-1">
                    <p><span className="font-medium">{t("services.detail.prescriptions.dose")}:</span> {prescription.dose} {prescription.unit}</p>
                    <p><span className="font-medium">{t("services.detail.prescriptions.frequency")}:</span> {t("services.detail.prescriptions.everyXHours", { hours: prescription.frequencyHours })}</p>
                    {prescription.durationDays && <p><span className="font-medium">{t("services.detail.prescriptions.duration")}:</span> {t("services.detail.prescriptions.xDias", { days: prescription.durationDays })}</p>}
                    {prescription.notes && <p className="mt-2 text-slate-500 italic">&quot;{prescription.notes}&quot;</p>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {(service.items?.length > 0) && (
          <div className="border-t border-slate-100 pt-6">
            <h3 className="font-semibold text-slate-900 mb-4">{t("services.detail.items.title")}</h3>
            <div className="bg-slate-50 rounded-xl overflow-hidden border border-slate-200">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-100 text-slate-600">
                  <tr>
                    <th className="py-3 px-4 font-medium">{t("services.detail.items.concept")}</th>
                    <th className="py-3 px-4 font-medium text-right">{t("services.detail.items.quantity")}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  {service.items.map((item: Record<string, any>) => (
                    <tr key={item.id}>
                      <td className="py-3 px-4">{item.service?.name || item.product?.name || t("services.detail.items.defaultService")}</td>
                      <td className="py-3 px-4 text-right">x{item.quantity}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </Card>
    </div>
  )
}
