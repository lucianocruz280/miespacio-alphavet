import SignupPage from "@/components/auth/SignUpPage"
import { serverSideTranslations } from 'next-i18next/pages/serverSideTranslations'

const Page = () => {
    return (
        <div>
            <SignupPage />
        </div>
    )
}

export const getStaticProps = async ({ locale }: { locale: string }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? 'es', ['common'])),
  },
})

export default Page