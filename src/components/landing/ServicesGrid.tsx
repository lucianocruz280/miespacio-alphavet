
import {
  Microscope,
  Syringe,
  Scissors,
  Pill,
  ArrowRight,
  Stethoscope,
  BedDouble,
} from 'lucide-react'
import { motion, Variants } from 'framer-motion'

const container: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.15,
    },
  },
}

const card: Variants = {
  hidden: { opacity: 0, y: 22 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.65,
      ease: [0.16, 1, 0.3, 1],
    },
  },
}

const ServicesGrid = () => {
  const services = [
    {
      icon: <Stethoscope className="w-6 h-6" />,
      title: 'Consulta Médica Veterinaria',
      description:
        'Evaluación clínica completa, diagnóstico responsable y orientación clara para los tutores.',
      color: 'bg-sky-50 text-sky-600',
      border: 'hover:border-sky-200 hover:shadow-sky-50',
    },
    {
      icon: <Scissors className="w-6 h-6" />,
      title: 'Cirugías Veterinarias',
      description:
        'Procedimientos realizados bajo protocolos de seguridad, anestesia controlada y atención postoperatoria.',
      color: 'bg-red-50 text-red-600',
      border: 'hover:border-red-200 hover:shadow-red-50',
    },
    {
      icon: <BedDouble className="w-6 h-6" />,
      title: 'Hospitalización y Seguimiento',
      description:
        'Supervisión clínica y cuidado continuo en instalaciones adecuadas para la recuperación de las mascotas.',
      color: 'bg-emerald-50 text-emerald-600',
      border: 'hover:border-emerald-200 hover:shadow-emerald-50',
    },
    {
      icon: <Microscope className="w-6 h-6" />,
      title: 'Laboratorio Clínico',
      description:
        'Estudios de apoyo diagnóstico para decisiones médicas oportunas y precisas.',
      color: 'bg-blue-50 text-blue-600',
      border: 'hover:border-blue-200 hover:shadow-blue-50',
    },
    {
      icon: <Syringe className="w-6 h-6" />,
      title: 'Medicina Preventiva',
      description:
        'Programas de vacunación, desparasitación y control sanitario para la salud a largo plazo de las mascotas.',
      color: 'bg-purple-50 text-purple-600',
      border: 'hover:border-purple-200 hover:shadow-purple-50',
    },
    {
      icon: <Scissors className="w-6 h-6" />,
      title: 'Estética',
      description:
        'Baños relajantes, corte de pelo profesional y cuidado dermatológico para que luzcan increíbles.',
      color: 'bg-pink-50 text-pink-600',
      border: 'hover:border-pink-200 hover:shadow-pink-50',
    },
    {
      icon: <Pill className="w-6 h-6" />,
      title: 'Farmacia',
      description:
        'Amplio stock de medicamentos veterinarios y alimentos especializados siempre disponibles.',
      color: 'bg-yellow-50 text-yellow-600',
      border: 'hover:border-yellow-200 hover:shadow-yellow-50',
    },
  ]

  return (
    <section id="servicios" className="py-20 md:py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 md:mb-16 gap-6">
          <div className="max-w-xl">
            <span className="text-accent font-bold tracking-wider uppercase text-sm">
              Servicios Integrales
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 mt-3">
              Cuidado experto para cada <br />
              <span className="gradient-text">etapa de su vida</span>
            </h2>
          </div>

          <a
            href="#"
            className="group inline-flex items-center gap-2 bg-white px-6 py-3 rounded-xl shadow-sm border border-slate-200 text-slate-700 font-semibold hover:bg-primary hover:text-white hover:border-primary transition-all active:scale-95"
          >
            Ver catálogo completo
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
          className="
            flex gap-4 overflow-x-auto pb-4
            snap-x snap-mandatory touch-pan-x
            md:grid md:grid-cols-2 md:gap-6
            lg:grid-cols-3 lg:gap-8
            md:overflow-visible
          "
        >

          {services.map((service, index) => (
            <motion.div
              variants={card}
              className={`
                snap-start shrink-0
                w-[85%] sm:w-[70%]
                md:w-auto md:shrink
                group p-6 md:p-8
                rounded-[2rem] md:rounded-[2.5rem]
                bg-white border border-slate-100
                transition-all duration-300
                hover:shadow-2xl ${service.border}
              `}
            >

              <div
                className={`w-12 h-12 ${service.color} rounded-2xl flex items-center justify-center mb-5 transform transition-transform group-hover:scale-110 group-hover:rotate-6`}
              >
                {service.icon}
              </div>

              <h3 className="text-base sm:text-lg md:text-2xl font-bold text-slate-900 mb-3 tracking-tight">
                {service.title}
              </h3>

              <p className="text-slate-500 leading-relaxed text-xs sm:text-sm md:text-base mb-5">
                {service.description}
              </p>

              <div className="pt-4 border-t border-slate-50">
                <button className="text-primary font-bold text-xs sm:text-sm inline-flex items-center gap-1 hover:gap-2 transition-all">
                  Saber más <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default ServicesGrid
