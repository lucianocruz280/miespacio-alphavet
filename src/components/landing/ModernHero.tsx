'use client'

import { LucideHeart, LucideShieldCheck, LucideSparkles } from 'lucide-react'

const ModernHero = () => {
    return (
        <section className="relative min-h-[90vh] flex items-center pt-24 pb-16 overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-0 right-0 -z-10 w-1/2 h-full bg-primary-50/50 rounded-l-[100px] hidden lg:block" />
            <div className="absolute top-1/4 -left-20 -z-10 w-64 h-64 bg-accent-100 rounded-full blur-3xl opacity-50" />
            
            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className="animate-fade-in space-y-8">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-slate-100 shadow-sm text-sm font-medium text-slate-600">
                        <LucideHeart className="w-4 h-4 text-rose-500 fill-rose-500" />
                        <span>Más que una veterinaria, somos familia</span>
                    </div>
                    
                    <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.1]">
                        Cuidado <span className="gradient-text">Excepcional</span> <br />
                        para tu Mejor Amigo
                    </h1>
                    
                    <p className="text-xl text-slate-600 leading-relaxed max-w-lg">
                        En Alphavet combinamos tecnología de vanguardia con un amor profundo por los animales para ofrecerte la tranquilidad que mereces.
                    </p>
                    
                    <div className="flex flex-col sm:flex-row gap-4 pt-4">
                        <button className="px-8 py-4 rounded-2xl bg-primary text-white font-semibold transition-all hover:bg-primary-700 hover:shadow-xl hover:shadow-primary-200 active:scale-95">
                            Agendar Cita Ahora
                        </button>
                        <button className="px-8 py-4 rounded-2xl bg-white border border-slate-200 text-slate-700 font-semibold transition-all hover:bg-slate-50 hover:border-slate-300 active:scale-95">
                            Ver Servicios
                        </button>
                    </div>
                    
                    <div className="flex items-center gap-8 pt-6 border-t border-slate-100 w-fit">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-accent-50 flex items-center justify-center text-accent-600">
                                <LucideShieldCheck className="w-5 h-5" />
                            </div>
                            <div className="text-left">
                                <p className="text-sm font-bold text-slate-900">+5,000</p>
                                <p className="text-xs text-slate-500">Pacientes Felices</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-primary-50 flex items-center justify-center text-primary-600">
                                <LucideSparkles className="w-5 h-5" />
                            </div>
                            <div className="text-left">
                                <p className="text-sm font-bold text-slate-900">24/7</p>
                                <p className="text-xs text-slate-500">Atención Continua</p>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div className="relative group lg:ml-10">
                    <div className="absolute -inset-4 bg-gradient-to-tr from-primary-200 to-accent-200 rounded-[2.5rem] blur-2xl opacity-30 group-hover:opacity-50 transition-opacity" />
                    <div className="relative rounded-[2rem] overflow-hidden shadow-2xl animate-float">
                        <img 
                            src="/images/hero.jpg" 
                            alt="Alphavet Veterinary Care" 
                            className="w-full h-auto object-cover transform transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute bottom-6 left-6 right-6 p-6 glass rounded-2xl flex items-center justify-between">
                            <div>
                                <p className="text-sm font-bold text-slate-900">Dr. Elena Rodríguez</p>
                                <p className="text-xs text-slate-600">Especialista Veterinaria</p>
                            </div>
                            <div className="flex -space-x-3">
                                {[1,2,3].map(i => (
                                    <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-slate-200 overflow-hidden">
                                        <img src={`https://i.pravatar.cc/150?u=${i+10}`} alt="avatar" />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default ModernHero
