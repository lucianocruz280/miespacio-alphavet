import { ArrowRight, Sparkles } from 'lucide-react'

const FinalCTA = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-slate-900" />
      <div className="absolute inset-0 bg-gradient-to-tr from-primary/40 to-accent/40 opacity-60" />
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary-500 rounded-full blur-[120px] opacity-20" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-accent-500 rounded-full blur-[120px] opacity-20" />
      
      <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white/90 text-sm font-medium mb-8">
            <Sparkles className="w-4 h-4 text-accent" />
            <span>Únete a la familia AlphaVet</span>
        </div>
        
        <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white mb-8 leading-tight">
          ¿Listo para darle lo <br />
          <span className="text-accent">mejor</span> a tu mejor amigo?
        </h2>

        <p className="text-xl text-slate-300 mb-12 max-w-2xl mx-auto leading-relaxed">
          Agenda tu cita hoy mismo y descubre por qué miles de dueños confían en nosotros para el bienestar de sus seres más queridos.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <button className="w-full sm:w-auto px-10 py-5 bg-white text-slate-900 rounded-2xl font-extrabold text-lg shadow-2xl hover:bg-slate-50 transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-3 group">
                Agenda una cita hoy
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="w-full sm:w-auto px-10 py-5 bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-2xl font-bold text-lg hover:bg-white/20 transition-all active:scale-95">
                Ver casos de éxito
            </button>
        </div>
      </div>
    </section>
  )
}

export default FinalCTA

