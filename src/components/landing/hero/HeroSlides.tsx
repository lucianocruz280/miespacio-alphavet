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

            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/40 to-transparent md:bg-gradient-to-r md:from-[#283c47]/90 md:via-[#283c47]/80 md:to-transparent" />

            <motion.div
                className="
                    md:relative absolute z-10 flex h-full
                    items-end md:items-center
                    px-4 sm:px-6 md:px-20 lg:px-40
                    pb-32 md:pb-0
                    "
                variants={container}
                initial="hidden"
                animate="show"
            >
                <div className="max-w-[1280px] w-full mx-auto">
                    <div className="max-w-xl mx-auto md:mx-0 flex flex-col gap-5 text-white text-center md:text-left">
                        <motion.span
                            variants={item}
                            className="
                inline-flex mx-auto md:mx-0 w-fit items-center
                rounded-md bg-white/10 px-3 py-1
                backdrop-blur-sm border border-white/20
                text-[11px] sm:text-xs font-bold uppercase tracking-widest
              "
                        >
                            {badge}
                        </motion.span>

                        <motion.h1
                            variants={item}
                            className="
                font-extrabold tracking-tight leading-tight
                text-4xl sm:text-5xl md:text-7xl
              "
                        >
                            {title}
                        </motion.h1>

                        <motion.p
                            variants={item}
                            className="
                text-white/90 leading-relaxed
                text-base sm:text-lg md:text-xl
                max-w-md mx-auto md:mx-0
              "
                        >
                            {description}
                        </motion.p>

                        <motion.div
                            variants={item}
                            className="
                flex flex-col sm:flex-row gap-3 sm:gap-4
                mt-2
                w-full sm:justify-center md:justify-start
              "
                        >
                            <button
                                className="
                  w-full sm:min-w-[180px] h-12 sm:h-14 px-6 sm:px-8
                  rounded-lg bg-[#283c47]
                  text-white text-sm sm:text-base font-bold
                  shadow-lg transition
                  hover:scale-[1.02] active:scale-[0.98]
                "
                            >
                                {primaryCta}
                            </button>

                            {secondaryCta && (
                                <button
                                    className="
                    w-full sm:min-w-[180px] h-12 sm:h-14 px-6 sm:px-8
                    rounded-lg border-2 border-white/30
                    bg-white/5 backdrop-blur-sm
                    text-white text-sm sm:text-base font-bold
                    hover:bg-white/10 hover:border-white/50
                    transition
                  "
                                >
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
