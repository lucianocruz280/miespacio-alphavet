import { Microscope, HeartPulse, Bone, Syringe, Scissors, Pill, ArrowRight } from 'lucide-react'

const ServicesGrid = () => {
  const services = [
    {
      icon: <Microscope className="w-6 h-6" />,
      title: "Laboratorio Clínico",
      description: "Análisis de sangre, orina y coprológicos con resultados el mismo día para diagnósticos precisos.",
      color: "bg-blue-50 text-blue-600",
      border: "hover:border-blue-200 hover:shadow-blue-50"
    },
    {
      icon: <HeartPulse className="w-6 h-6" />,
      title: "Cardiología",
      description: "Ecocardiogramas y control de presión arterial para mascotas mayores con tecnología Doppler.",
      color: "bg-teal-50 text-teal-600",
      border: "hover:border-teal-200 hover:shadow-teal-50"
    },
    {
      icon: <Bone className="w-6 h-6" />,
      title: "Rayos X y Ultrasonido",
      description: "Diagnóstico por imagen digital de alta resolución para detectar cualquier anomalía interna.",
      color: "bg-orange-50 text-orange-600",
      border: "hover:border-orange-200 hover:shadow-orange-50"
    },
    {
      icon: <Syringe className="w-6 h-6" />,
      title: "Vacunación",
      description: "Esquemas completos para cachorros y refuerzos anuales adaptados al estilo de vida de tu mascota.",
      color: "bg-purple-50 text-purple-600",
      border: "hover:border-purple-200 hover:shadow-purple-50"
    },
    {
      icon: <Scissors className="w-6 h-6" />,
      title: "Estética Spa",
      description: "Baños relajantes, corte de pelo profesional y cuidado dermatológico para que luzcan increíbles.",
      color: "bg-pink-50 text-pink-600",
      border: "hover:border-pink-200 hover:shadow-pink-50"
    },
    {
      icon: <Pill className="w-6 h-6" />,
      title: "Farmacia",
      description: "Amplio stock de medicamentos veterinarios y alimentos especializados siempre disponibles.",
      color: "bg-yellow-50 text-yellow-600",
      border: "hover:border-yellow-200 hover:shadow-yellow-50"
    }
  ]

  return (
    <section id="servicios" className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-xl">
            <span className="text-accent font-bold tracking-wider uppercase text-sm">Servicios Integrales</span>
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 mt-3">
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

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div 
              key={index} 
              className={`group p-8 rounded-[2.5rem] bg-white border border-slate-100 transition-all duration-300 hover:shadow-2xl ${service.border}`}
            >
              <div className={`w-12 h-12 ${service.color} rounded-2xl flex items-center justify-center mb-6 transform transition-transform group-hover:scale-110 group-hover:rotate-6`}>
                {service.icon}
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4 tracking-tight">
                {service.title}
              </h3>
              <p className="text-slate-500 leading-relaxed text-base mb-6">
                {service.description}
              </p>
              <div className="pt-4 border-t border-slate-50">
                <button className="text-primary font-bold text-sm inline-flex items-center gap-1 hover:gap-2 transition-all">
                  Saber más <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ServicesGrid

