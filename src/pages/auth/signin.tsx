import LoginPage from "@/components/auth/LoginPage"
import { serverSideTranslations } from 'next-i18next/pages/serverSideTranslations'

const Page = () => {
    return (
        <div>
            <LoginPage />
        </div>
    )
}

export const getStaticProps = async ({ locale }: { locale: string }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? 'es', ['common'])),
  },
})

export default Page