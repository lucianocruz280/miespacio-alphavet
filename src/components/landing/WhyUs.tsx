import { Stethoscope, History, Smartphone, ShieldCheck } from "lucide-react"
import { motion, Variants } from "framer-motion"

const container: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.15,
    },
  },
}

const card: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.16, 1, 0.3, 1],
    },
  },
}

const WhyUs = () => {
  const features = [
    {
      icon: <Stethoscope className="w-7 h-7" />,
      title: "Atención Profesional",
      description:
        "Veterinarios certificados y en constante actualización con los últimos avances en medicina animal.",
      color: "bg-primary-50 text-primary-600",
    },
    {
      icon: <History className="w-7 h-7" />,
      title: "Historial Digital",
      description:
        "Accede al expediente médico completo de tu mascota desde cualquier dispositivo, en cualquier momento.",
      color: "bg-accent-50 text-accent-600",
    },
    {
      icon: <Smartphone className="w-7 h-7" />,
      title: "Reservas Fáciles",
      description:
        "Agenda, reprograma o cancela tus citas en segundos a través de nuestra plataforma intuitiva.",
      color: "bg-indigo-50 text-indigo-600",
    },
    {
      icon: <ShieldCheck className="w-7 h-7" />,
      title: "Seguridad Total",
      description:
        "Instalaciones de primer nivel con protocolos estrictos de higiene y seguridad biológica.",
      color: "bg-rose-50 text-rose-600",
    },
  ]

  return (
    <section className="py-20 md:py-24 bg-white relative overflow-hidden" id="nosotros">
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary-50/30 rounded-full blur-3xl -mr-32 -mt-32" />

      <div className="max-w-7xl mx-auto px-6 relative">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 md:mb-16 gap-6">
          <div className="max-w-2xl">
            <span className="text-primary font-bold tracking-wider uppercase text-sm">
              ¿Por qué AlphaVet?
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 mt-3">
              La excelencia en el <br />
              <span className="gradient-text">cuidado veterinario</span>
            </h2>
          </div>

          <p className="text-base sm:text-lg text-slate-500 max-w-sm">
            Combinamos pasión por los animales con tecnología de punta para ofrecer la mejor experiencia.
          </p>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="
            grid grid-cols-2 gap-4
            md:grid-cols-2 md:gap-6
            lg:grid-cols-4 lg:gap-8
          "
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={card}
              className="
                group p-5 sm:p-6 md:p-8
                rounded-[1.75rem]
                bg-slate-50 border border-slate-100
                transition-all
                hover:bg-white hover:shadow-xl hover:shadow-slate-200/50 hover:-translate-y-1
              "
            >
              <div
                className={`w-14 h-14 ${feature.color} rounded-2xl flex items-center justify-center mb-5 transform transition-transform group-hover:scale-110 group-hover:rotate-3`}
              >
                {feature.icon}
              </div>

              <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-2">
                {feature.title}
              </h3>

              <p className="text-slate-500 leading-relaxed text-xs sm:text-sm">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default WhyUs
