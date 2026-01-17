
import { useEffect, useState } from 'react'
import HeroSlide from './HeroSlides'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'


const slides = [
  {
    backgroundImage: '/images/landing/spa.png',
    badge: 'Spa & Bienestar',
    title: <>Cuidado y Confort<br />para tu Mascota</>,
    description:
      'Eleva el bienestar de tu mascota con grooming profesional, hidroterapia y tratamientos de relajación.',
    primaryCta: 'Agendar cita',
    secondaryCta: 'Ver servicios',
  },
  {
    backgroundImage: '/images/landing/medical.jpg',
    badge: 'Clínica Veterinaria',
    title: <>Atención Médica<br />Profesional</>,
    description:
      'Consultas, diagnósticos y seguimiento clínico con médicos veterinarios certificados.',
    primaryCta: 'Agendar consulta',
    secondaryCta: 'Conocer clínica',
  },
  {
    backgroundImage: '/images/landing/hospitalizacion.avif',
    badge: 'Hospital 24/7',
    title: <>Cuidado Crítico<br />Todo el Día</>,
    description:
      'Hospitalización, monitoreo continuo y atención de urgencias las 24 horas.',
    primaryCta: 'Emergencias',
    secondaryCta: 'Ver instalaciones',
  },
  {
    backgroundImage: '/images/landing/farmacia1.jpg',
    badge: 'Farmacia Veterinaria',
    title: <>Medicamentos<br />Especializados</>,
    description:
      'Farmacia con medicamentos, recetas y productos especializados para la salud de tu mascota.',
    primaryCta: 'Ver farmacia',
  },
  {
    backgroundImage: '/images/landing/surgery.avif',
    badge: 'Cirugías',
    title: <>Procedimientos<br />Seguros</>,
    description:
      'Quirófanos equipados y personal especializado para cirugías veterinarias.',
    primaryCta: 'Agendar valoración',
  },
  {
    backgroundImage: '/images/landing/crematorio.avif',
    badge: 'Crematorio',
    title: <>Despedidas<br />Dignas</>,
    description:
      'Acompañamiento respetuoso y profesional en los momentos más difíciles.',
    primaryCta: 'Conocer servicio',
  },
  {
    backgroundImage: '/images/landing/ecommerce.png',
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
    <div className="relative">
      <div className="relative h-screen overflow-hidden bg-[#283c47]">
        <AnimatePresence>
          <motion.div
            key={current}
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1, ease: 'easeInOut' }}
          >
            <HeroSlide {...slides[current]} />
          </motion.div>
        </AnimatePresence>
      </div>



      {/* Arrows */}
      <button
        onClick={prev}
        className="absolute left-6 top-1/2 -translate-y-1/2 flex justify-center items-center z-20 w-12 h-12 rounded-full bg-white/10 text-white backdrop-blur hover:bg-white/20 transition cursor-pointer"
      >
        <ArrowLeft />
      </button>

      <button
        onClick={next}
        className="absolute right-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 flex justify-center items-center rounded-full bg-gray-400 text-white backdrop-blur hover:bg-white/20 transition cursor-pointer"
      >
        <ArrowRight />
      </button>

      {/* Dots */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-3 z-20">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`h-2 rounded-full transition-all ${current === i ? 'w-8 bg-white' : 'w-2 bg-white/40'
              }`}
          />
        ))}
      </div>
    </div>
  )
}

export default HeroSlider
