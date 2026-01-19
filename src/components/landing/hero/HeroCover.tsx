
import { useEffect, useState } from 'react'
import HeroSlide from './HeroSlides'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'


const slides = [
  {
    backgroundImage: '/images/landing/spa.webp',
    badge: 'Spa & Bienestar',
    title: <>Cuidado y Confort<br />para tu Mascota</>,
    description:
      'Eleva el bienestar de tu mascota con grooming profesional, hidroterapia y tratamientos de relajación.',
    primaryCta: 'Agendar cita',
    secondaryCta: 'Ver servicios',
  },
  {
    backgroundImage: '/images/landing/medical.webp',
    badge: 'Clínica Veterinaria',
    title: <>Atención Médica<br />Profesional</>,
    description:
      'Consultas, diagnósticos y seguimiento clínico con médicos veterinarios certificados.',
    primaryCta: 'Agendar consulta',
    secondaryCta: 'Conocer clínica',
  },
  {
    backgroundImage: '/images/landing/hospitalizacion.webp',
    badge: 'Hospital 24/7',
    title: <>Cuidado Crítico<br />Todo el Día</>,
    description:
      'Hospitalización, monitoreo continuo y atención de urgencias las 24 horas.',
    primaryCta: 'Emergencias',
    secondaryCta: 'Ver instalaciones',
  },
  {
    backgroundImage: '/images/landing/farmacia1.webp',
    badge: 'Farmacia Veterinaria',
    title: <>Medicamentos<br />Especializados</>,
    description:
      'Farmacia con medicamentos, recetas y productos especializados para la salud de tu mascota.',
    primaryCta: 'Ver farmacia',
  },
  {
    backgroundImage: '/images/landing/surgery.webp',
    badge: 'Cirugías',
    title: <>Procedimientos<br />Seguros</>,
    description:
      'Quirófanos equipados y personal especializado para cirugías veterinarias.',
    primaryCta: 'Agendar valoración',
  },
  {
    backgroundImage: '/images/landing/crematorio.webp',
    badge: 'Crematorio',
    title: <>Despedidas<br />Dignas</>,
    description:
      'Acompañamiento respetuoso y profesional en los momentos más difíciles.',
    primaryCta: 'Conocer servicio',
  },
  {
    backgroundImage: '/images/landing/ecommerce.webp',
    badge: 'Tienda en Línea',
    title: <>Todo para tu Mascota<br />En un Solo Lugar</>,
    description:
      'Compra alimentos, accesorios y productos recomendados por veterinarios.',
    primaryCta: 'Ir a la tienda',
  },
]

const HeroSlider = () => {
  const [current, setCurrent] = useState(0)

  const prev = () =>
    setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1))

  const next = () =>
    setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1))

  useEffect(() => {
    const interval = setInterval(() => {
      next()
    }, 4000)

    return () => clearInterval(interval)
  }, [])

  return (
    <section
      id="hero"
      className="relative overflow-hidden"
    >
      <div
        className="
          relative
          h-[100svh] md:h-screen
          bg-[#283c47]
        "
      >
        <AnimatePresence>
          <motion.div
            key={current}
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1, ease: "easeInOut" }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent md:hidden z-10" />

            <HeroSlide {...slides[current]} />
          </motion.div>
        </AnimatePresence>
      </div>

      <button
        onClick={prev}
        className=" hidden md:flex items-center justify-center absolute left-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/10 text-white backdrop-blur hover:bg-white/20 transition "
      >
        <ArrowLeft />
      </button>

      <button
        onClick={next}
        className=" hidden md:flex items-center justify-center absolute right-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/10 text-white backdrop-blur hover:bg-white/20 transition "
      >
        <ArrowRight />
      </button>

      <div
        className="
          absolute
          bottom-24 md:bottom-10
          left-1/2 -translate-x-1/2
          flex gap-3 z-20
        "
      >
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`
              rounded-full transition-all
              h-2 md:h-2
              ${current === i
                ? "w-8 bg-white"
                : "w-3 bg-white/40 hover:bg-white/70"}
            `}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  )
}

export default HeroSlider
