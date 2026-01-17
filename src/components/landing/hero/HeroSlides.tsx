'use client'

import { motion, Variants } from 'framer-motion'

type HeroSlideProps = {
    backgroundImage: string
    badge: string
    title: React.ReactNode
    description: string
    primaryCta: string
    secondaryCta?: string
}

const container: Variants = {
    hidden: {},
    show: {
        transition: {
            staggerChildren: 0.12,
            delayChildren: 0.3,
        },
    },
}

const item: Variants = {
    hidden: { opacity: 0, y: 18 },
    show: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.9,
            ease: [0.16, 1, 0.3, 1],
        },
    },
}


const HeroSlide = ({
    backgroundImage,
    badge,
    title,
    description,
    primaryCta,
    secondaryCta,
}: HeroSlideProps) => {
    return (
        <section className="relative min-h-[100svh] md:h-screen w-full overflow-hidden">

            {/* Background parallax */}
            <motion.div
                className="absolute inset-0 bg-cover bg-center scale-110"
                style={{ backgroundImage: `url(${backgroundImage})` }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                    duration: 1.4,
                    ease: [0.16, 1, 0.3, 1],
                }}
            />


            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#283c47]/90 via-[#283c47]/80 to-transparent" />

            {/* Content */}
            <motion.div
                className="relative z-10 flex h-full items-center px-5 sm:px-8 md:px-20 lg:px-40"

                variants={container}
                initial="hidden"
                animate="show"
            >
                <div className="max-w-[1280px] w-full mx-auto">
                    <div className="max-w-2xl flex flex-col gap-6 text-white">
                        <motion.span
                            variants={item}
                            className="inline-flex w-fit items-center rounded-md bg-white/10 px-3 py-1 backdrop-blur-sm border border-white/20 text-xs font-bold uppercase tracking-widest"
                        >
                            {badge}
                        </motion.span>

                        <motion.h1
                            variants={item}
                            className="text-5xl md:text-7xl font-extrabold leading-[1.1] tracking-tight"
                        >
                            {title}
                        </motion.h1>

                        <motion.p
                            variants={item}
                            className="text-white/80 text-lg md:text-xl leading-relaxed max-w-lg"
                        >
                            {description}
                        </motion.p>

                        <motion.div
                            variants={item}
                            className="flex flex-wrap gap-4 mt-4"
                        >
                            <button className="min-w-[180px] h-14 px-8 rounded-lg bg-[#283c47] text-white text-base font-bold shadow-lg hover:scale-[1.02] active:scale-[0.98] transition">
                                {primaryCta}
                            </button>

                            {secondaryCta && (
                                <button className="min-w-[180px] h-14 px-8 rounded-lg border-2 border-white/30 bg-white/5 backdrop-blur-sm text-white text-base font-bold hover:bg-white/10 hover:border-white/50 transition">
                                    {secondaryCta}
                                </button>
                            )}
                        </motion.div>
                    </div>
                </div>
            </motion.div>
        </section>
    )
}

export default HeroSlide
