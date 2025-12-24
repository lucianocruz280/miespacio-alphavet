
import Contact from '@/components/landing/ContactForm'
import FinalCTA from '@/components/landing/FinalCTA'
import Footer from '@/components/landing/Footer'
import Gallery from '@/components/landing/Gallery'
import Header from '@/components/landing/Header'
import HeroSlider from '@/components/landing/HeroSlider'
import Pricing from '@/components/landing/Pricing'
import ServicesGrid from '@/components/landing/ServicesGrid'
import Testimonials from '@/components/landing/Testimonials'
import WhyUs from '@/components/landing/WhyUs'


const Page = () => {
    return (
        <main className="bg-white text-slate-600 antialiased">
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

export default Page