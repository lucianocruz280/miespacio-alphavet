
import CreateAppointmentView from "@/components/appointments/CreateAppointmentView"
import MainLayout from "@/components/layout/Layout"

const Page = () => {
    return (
        <MainLayout>
            <CreateAppointmentView />
        </MainLayout>
    )
}
import { serverSideTranslations } from 'next-i18next/pages/serverSideTranslations'

export default Page
export async function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  }
}