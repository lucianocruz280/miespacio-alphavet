import HomeComponent from "@/components/home/Home";
import MainLayout from "@/components/layout/Layout";
import { serverSideTranslations } from 'next-i18next/pages/serverSideTranslations'

export default function Home() {
  return (
    <MainLayout>
      <HomeComponent />
    </MainLayout>
  );
}

export const getStaticProps = async ({ locale }: { locale: string }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? 'es', ['common'])),
  },
})
