
import { motion, Variants } from 'framer-motion'

const priceVariant: Variants = {
    hidden: { scale: 0.9, opacity: 0 },
    show: {
        scale: 1,
        opacity: 1,
        transition: {
            delay: 0.2,
            duration: 0.6,
            ease: [0.16, 1, 0.3, 1],
        },
    },
}

const Pricing = () => {
    const tiers = [
        {
            name: 'Consulta General',
            category: 'Básico',
            description: 'Revisión física completa, diagnóstico y receta médica.',
            price: '350',
            color: 'text-primary bg-primary-50',
            buttonColor: 'bg-primary-50 text-primary-700 border-primary-100',
        },
        {
            name: 'Baño y Corte',
            category: 'Estética',
            description:
                'Incluye corte de uñas, limpieza de oídos y drenaje de glándulas.',
            price: '280',
            color: 'text-pink-600 bg-pink-50',
            buttonColor: 'bg-pink-50 text-pink-700 border-pink-100',
        },
        {
            name: 'Hospitalización',
            category: 'Cuidados',
            description:
                'Monitoreo 24 horas con personal capacitado e instalaciones climatizadas.',
            price: '800',
            color: 'text-accent-600 bg-accent-50',
            buttonColor: 'bg-accent-50 text-accent-700 border-accent-100',
        },
        {
            name: 'Cirugía Menor',
            category: 'Procedimientos',
            description:
                'Esterilizaciones y suturas bajo anestesia con tecnología segura.',
            price: '1,500',
            color: 'text-purple-600 bg-purple-50',
            buttonColor: 'bg-purple-50 text-purple-700 border-purple-100',
        },
    ]

    return (
        <section id="precios" className="py-20 md:py-24 bg-white">
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center max-w-2xl mx-auto mb-14 md:mb-16">
                    <span className="text-primary font-bold tracking-wider uppercase text-sm">
                        Tarifas Transparentes
                    </span>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 mt-3">
                        Inversión en su <br />
                        <span className="gradient-text">salud y felicidad</span>
                    </h2>
                </div>

                <motion.div
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: '-80px' }}
                    className="
            flex gap-4 overflow-x-auto pb-4
            snap-x snap-mandatory touch-pan-x
            md:grid md:grid-cols-2 md:gap-6
            lg:grid-cols-4 lg:gap-8
            md:overflow-visible
          "
                >
                    {tiers.map((tier, index) => (
                        <div
                            key={index}
                            className="
                snap-start shrink-0
                w-[85%] sm:w-[70%]
                md:w-auto md:shrink
                group flex flex-col p-6 md:p-8
                rounded-[2.5rem]
                bg-slate-50 border border-slate-100
                transition-all
                hover:bg-white hover:shadow-2xl hover:shadow-slate-200/50 hover:-translate-y-1
              "
                        >
                            <div className="mb-5">
                                <span
                                    className={`text-xs font-bold tracking-widest uppercase px-3 py-1.5 rounded-full ${tier.color}`}
                                >
                                    {tier.category}
                                </span>
                            </div>

                            <h3 className="text-lg md:text-2xl font-bold text-slate-900 mb-2">
                                {tier.name}
                            </h3>

                            <p className="text-slate-500 text-sm leading-relaxed mb-6 flex-grow">
                                {tier.description}
                            </p>

                            <div className="mb-7 pt-5 border-t border-slate-100">
                                <motion.div
                                    initial={{ scale: 0.9, opacity: 0, filter: 'blur(4px)' }}
                                    whileInView={{ scale: 1, opacity: 1, filter: 'blur(0px)' }}
                                    viewport={{ once: true, margin: '-40px' }}
                                    transition={{
                                        delay: 0.22,
                                        duration: 0.6,
                                        ease: [0.16, 1, 0.3, 1],
                                    }}
                                    className="flex items-baseline gap-1"
                                >

                                    <span className="text-slate-400 text-sm">Desde</span>
                                    <span className="text-4xl font-extrabold text-slate-900 tracking-tight">
                                        ${tier.price}
                                    </span>
                                    <span className="text-slate-400 text-sm font-medium">MXN</span>
                                </motion.div>
                            </div>

                            <button
                                className={`w-full py-4 rounded-2xl font-bold text-sm border transition-all hover:shadow-lg active:scale-95 ${tier.buttonColor}`}
                            >
                                Agendar Servicio
                            </button>
                        </div>
                    ))}
                </motion.div>

                <p className="text-center text-slate-400 text-xs sm:text-sm mt-10">
                    * Los precios pueden variar según el tamaño, peso y condición específica
                    de la mascota.
                </p>
            </div>
        </section>
    )
}

export default Pricing
