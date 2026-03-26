import MainLayout from "@/components/layout/Layout"
import ServicesList from "@/components/services/ServicesList"

const MyServicesPage = () => {
  return (
    <MainLayout>
      <div className="max-w-5xl">
        <h1 className="text-2xl font-semibold tracking-tight text-slate-900">
          Mis Servicios
        </h1>

        <p className="mt-1 text-sm text-slate-500 mb-8">
          Historial de consultas médicas y estética de tus mascotas.
        </p>

        <ServicesList />
      </div>
    </MainLayout>
  )
}

export default MyServicesPage
