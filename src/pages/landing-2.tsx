import Contact from '@/components/landing-2/ContactForm'
import FinalCTA from '@/components/landing-2/FinalCTA'
import Footer from '@/components/landing-2/Footer'
import Gallery from '@/components/landing-2/Gallery'
import Header from '@/components/landing-2/Header'

import Pricing from '@/components/landing-2/Pricing'
import ServicesGrid from '@/components/landing-2/ServicesGrid'
import Testimonials from '@/components/landing-2/Testimonials'
import WhyUs from '@/components/landing-2/WhyUs'
import HeroSlider from '@/components/landing/hero/HeroCover'


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