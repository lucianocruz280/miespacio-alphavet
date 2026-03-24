import MainLayout from "@/components/layout/Layout"
import MyAppointmentDetail from "@/components/appointments/MyAppointmentDetail"
import { useRouter } from "next/router"

const MyAppointmentDetailPage = () => {
  const router = useRouter()
  const { id } = router.query

  if (!id) return null

  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto">
        <MyAppointmentDetail appointmentId={id as string} />
      </div>
    </MainLayout>
  )
}

export default MyAppointmentDetailPage
