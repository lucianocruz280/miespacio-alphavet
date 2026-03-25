
import Contact from '@/components/landing/ContactForm'
import FinalCTA from '@/components/landing/FinalCTA'
import Footer from '@/components/landing/Footer'
import Gallery from '@/components/landing/Gallery'
import Header from '@/components/landing/Header'
import HeroSlider from '@/components/landing/hero/HeroCover'
import Pricing from '@/components/landing/Pricing'
import ServicesGrid from '@/components/landing/ServicesGrid'
import Testimonials from '@/components/landing/Testimonials'
import WhyUs from '@/components/landing/WhyUs'


import { serverSideTranslations } from 'next-i18next/pages/serverSideTranslations'

const Page = () => {
    return (
        <main className="bg-white text-slate-600 antialiased selection:bg-primary-100 selection:text-primary-700">
            <Header />
            <HeroSlider />
            <WhyUs />
            <ServicesGrid />
            <Pricing />
            <Testimonials />
            <Gallery />
            <FinalCTA />
            <Contact />
            <Footer />
        </main>
    )
}

export const getStaticProps = async ({ locale }: { locale: string }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common'])),
  },
})

export default Page
