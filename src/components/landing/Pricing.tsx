const Pricing = () => {
    const tiers = [
        {
            name: "Consulta General",
            category: "Básico",
            description: "Revisión física completa, diagnóstico y receta médica.",
            price: "350",
            color: "text-primary bg-primary-50",
            buttonColor: "bg-primary-50 text-primary-700 border-primary-100"
        },
        {
            name: "Baño y Corte",
            category: "Estética",
            description: "Incluye corte de uñas, limpieza de oídos y drenaje de glándulas.",
            price: "280",
            color: "text-pink-600 bg-pink-50",
            buttonColor: "bg-pink-50 text-pink-700 border-pink-100"
        },
        {
            name: "Hospitalización",
            category: "Cuidados",
            description: "Monitoreo 24 horas con personal capacitado e instalaciones climatizadas.",
            price: "800",
            color: "text-accent-600 bg-accent-50",
            buttonColor: "bg-accent-50 text-accent-700 border-accent-100"
        },
        {
            name: "Cirugía Menor",
            category: "Procedimientos",
            description: "Esterilizaciones y suturas bajo anestesia con tecnología segura.",
            price: "1,500",
            color: "text-purple-600 bg-purple-50",
            buttonColor: "bg-purple-50 text-purple-700 border-purple-100"
        }
    ]

    return (
        <section id="precios" className="py-24 bg-white">
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <span className="text-primary font-bold tracking-wider uppercase text-sm">Tarifas Transparentes</span>
                    <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 mt-3">
                        Inversión en su <br />
                        <span className="gradient-text">salud y felicidad</span>
                    </h2>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {tiers.map((tier, index) => (
                        <div key={index} className="group flex flex-col p-8 rounded-[2.5rem] bg-slate-50 border border-slate-100 transition-all hover:bg-white hover:shadow-2xl hover:shadow-slate-200/50 hover:-translate-y-1">
                            <div className="mb-6">
                                <span className={`text-xs font-bold tracking-widest uppercase px-3 py-1.5 rounded-full ${tier.color}`}>
                                    {tier.category}
                                </span>
                            </div>
                            
                            <h3 className="text-2xl font-bold text-slate-900 mb-2">
                                {tier.name}
                            </h3>
                            <p className="text-slate-500 text-sm leading-relaxed mb-8 flex-grow">
                                {tier.description}
                            </p>
                            
                            <div className="mb-8 pt-6 border-t border-slate-100">
                                <div className="flex items-baseline gap-1">
                                    <span className="text-slate-400 text-sm">Desde</span>
                                    <span className="text-4xl font-extrabold text-slate-900 tracking-tight">${tier.price}</span>
                                    <span className="text-slate-400 text-sm font-medium">MXN</span>
                                </div>
                            </div>

                            <button className={`w-full py-4 rounded-2xl font-bold text-sm border transition-all hover:shadow-lg active:scale-95 ${tier.buttonColor}`}>
                                Agendar Servicio
                            </button>
                        </div>
                    ))}
                </div>
                
                <p className="text-center text-slate-400 text-sm mt-12">
                    * Los precios pueden variar según el tamaño, peso y condición específica de la mascota.
                </p>
            </div>
        </section>
    )
}

export default Pricing

