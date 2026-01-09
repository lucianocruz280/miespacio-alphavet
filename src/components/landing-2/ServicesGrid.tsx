import { Icon } from '@iconify/react'

const ServicesGrid = () => {
  return (
    <section id="servicios" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div className="max-w-xl">
            <h2 className="text-3xl font-medium tracking-tight text-slate-900 mb-4">
              Nuestros Servicios
            </h2>
            <p className="text-slate-500">
              Cubrimos todas las necesidades médicas y estéticas para perros y gatos.
            </p>
          </div>

          <a
            href="#"
            className="text-blue-600 font-medium hover:text-blue-700 inline-flex items-center gap-1"
          >
            Ver todos los servicios
            <Icon icon="lucide:arrow-right" width={16} />
          </a>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Service 1 */}
          <div className="group p-6 rounded-2xl border border-slate-100 hover:border-blue-100 hover:shadow-lg hover:shadow-blue-50 transition-all duration-300">
            <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Icon icon="lucide:microscope" width={20} />
            </div>
            <h3 className="text-lg font-medium text-slate-900 mb-2">
              Laboratorio Clínico
            </h3>
            <p className="text-sm text-slate-500">
              Análisis de sangre, orina y coprológicos con resultados el mismo día.
            </p>
          </div>

          {/* Service 2 */}
          <div className="group p-6 rounded-2xl border border-slate-100 hover:border-blue-100 hover:shadow-lg hover:shadow-blue-50 transition-all duration-300">
            <div className="w-10 h-10 rounded-lg bg-teal-50 text-teal-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Icon icon="lucide:heart-pulse" width={20} />
            </div>
            <h3 className="text-lg font-medium text-slate-900 mb-2">
              Cardiología
            </h3>
            <p className="text-sm text-slate-500">
              Ecocardiogramas y control de presión arterial para mascotas mayores.
            </p>
          </div>

          {/* Service 3 */}
          <div className="group p-6 rounded-2xl border border-slate-100 hover:border-blue-100 hover:shadow-lg hover:shadow-blue-50 transition-all duration-300">
            <div className="w-10 h-10 rounded-lg bg-orange-50 text-orange-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Icon icon="lucide:bone" width={20} />
            </div>
            <h3 className="text-lg font-medium text-slate-900 mb-2">
              Rayos X y Ultrasonido
            </h3>
            <p className="text-sm text-slate-500">
              Diagnóstico por imagen digital de alta resolución.
            </p>
          </div>

          {/* Service 4 */}
          <div className="group p-6 rounded-2xl border border-slate-100 hover:border-blue-100 hover:shadow-lg hover:shadow-blue-50 transition-all duration-300">
            <div className="w-10 h-10 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Icon icon="lucide:syringe" width={20} />
            </div>
            <h3 className="text-lg font-medium text-slate-900 mb-2">
              Vacunación
            </h3>
            <p className="text-sm text-slate-500">
              Esquemas completos para cachorros y refuerzos anuales.
            </p>
          </div>

          {/* Service 5 */}
          <div className="group p-6 rounded-2xl border border-slate-100 hover:border-blue-100 hover:shadow-lg hover:shadow-blue-50 transition-all duration-300">
            <div className="w-10 h-10 rounded-lg bg-pink-50 text-pink-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Icon icon="lucide:scissors" width={20} />
            </div>
            <h3 className="text-lg font-medium text-slate-900 mb-2">
              Estética Spa
            </h3>
            <p className="text-sm text-slate-500">
              Baños relajantes, corte de uñas y limpieza de oídos.
            </p>
          </div>

          {/* Service 6 */}
          <div className="group p-6 rounded-2xl border border-slate-100 hover:border-blue-100 hover:shadow-lg hover:shadow-blue-50 transition-all duration-300">
            <div className="w-10 h-10 rounded-lg bg-yellow-50 text-yellow-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Icon icon="lucide:award" width={20} />
            </div>
            <h3 className="text-lg font-medium text-slate-900 mb-2">
              Cirugía General
            </h3>
            <p className="text-sm text-slate-500">
              Esterilizaciones y tejidos blandos en quirófano equipado.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ServicesGrid
