import MainLayout from "@/components/layout/Layout"
import PetsGrid from "@/components/pets/PetsGrid"
import { serverSideTranslations } from 'next-i18next/pages/serverSideTranslations'

const Page = () => {
  return (
    <MainLayout>
      <div className="max-w-5xl">
        <h1 className="text-2xl font-semibold tracking-tight text-slate-900">
          Mis Mascotas
        </h1>

        <p className="mt-1 text-sm text-slate-500 mb-8">
          Configura el perfil de tus mascotas, ve el historial médico, y programa nuevas citas.
        </p>

        <PetsGrid />
      </div>
    </MainLayout>
  )
}

export const getStaticProps = async ({ locale }: { locale: string }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? 'es', ['common'])),
  },
})

export default Page
