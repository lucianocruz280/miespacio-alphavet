import MainLayout from "@/components/layout/Layout"
import AppointmentsList from "@/components/appointments/AppointmentsList"

const MyAppointmentsPage = () => {
  return (
    <MainLayout>
      <div className="max-w-5xl">
        <h1 className="text-2xl font-semibold tracking-tight text-slate-900">
          Mis Citas
        </h1>

        <p className="mt-1 text-sm text-slate-500 mb-8">
          Aquí puedes ver todas tus citas programadas y el historial de tus próximas visitas.
        </p>

        <AppointmentsList />
      </div>
    </MainLayout>
  )
}

export default MyAppointmentsPage
