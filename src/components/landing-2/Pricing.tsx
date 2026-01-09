const Pricing = () => {
  return (
    <section id="precios" className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl font-medium tracking-tight text-slate-900 mb-4">
            Precios Transparentes
          </h2>
          <p className="text-slate-500">
            Sin sorpresas. Conoce nuestros costos base antes de agendar.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Price 1 */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex flex-col">
            <div className="mb-4">
              <span className="text-xs font-semibold tracking-wide uppercase text-blue-600 bg-blue-50 px-2 py-1 rounded">
                Básico
              </span>
            </div>
            <h3 className="text-lg font-medium text-slate-900">
              Consulta General
            </h3>
            <p className="text-sm text-slate-400 mt-2 mb-6">
              Revisión física completa y diagnóstico.
            </p>
            <div className="mt-auto">
              <p className="text-xs text-slate-400 mb-1">Desde</p>
              <p className="text-3xl font-medium tracking-tight text-slate-900">
                $350 <span className="text-sm font-normal text-slate-400">MXN</span>
              </p>
            </div>
          </div>

          {/* Price 2 */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex flex-col relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-yellow-400 w-16 h-16 translate-x-8 -translate-y-8 rotate-45"></div>
            <div className="mb-4">
              <span className="text-xs font-semibold tracking-wide uppercase text-pink-600 bg-pink-50 px-2 py-1 rounded">
                Estética
              </span>
            </div>
            <h3 className="text-lg font-medium text-slate-900">
              Baño y Corte
            </h3>
            <p className="text-sm text-slate-400 mt-2 mb-6">
              Incluye corte de uñas y limpieza.
            </p>
            <div className="mt-auto">
              <p className="text-xs text-slate-400 mb-1">Desde</p>
              <p className="text-3xl font-medium tracking-tight text-slate-900">
                $280 <span className="text-sm font-normal text-slate-400">MXN</span>
              </p>
            </div>
          </div>

          {/* Price 3 */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex flex-col">
            <div className="mb-4">
              <span className="text-xs font-semibold tracking-wide uppercase text-teal-600 bg-teal-50 px-2 py-1 rounded">
                Cuidados
              </span>
            </div>
            <h3 className="text-lg font-medium text-slate-900">
              Hospitalización
            </h3>
            <p className="text-sm text-slate-400 mt-2 mb-6">
              Por día. Incluye monitoreo básico.
            </p>
            <div className="mt-auto">
              <p className="text-xs text-slate-400 mb-1">Desde</p>
              <p className="text-3xl font-medium tracking-tight text-slate-900">
                $800 <span className="text-sm font-normal text-slate-400">MXN</span>
              </p>
            </div>
          </div>

          {/* Price 4 */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex flex-col">
            <div className="mb-4">
              <span className="text-xs font-semibold tracking-wide uppercase text-purple-600 bg-purple-50 px-2 py-1 rounded">
                Procedimientos
              </span>
            </div>
            <h3 className="text-lg font-medium text-slate-900">
              Cirugía Menor
            </h3>
            <p className="text-sm text-slate-400 mt-2 mb-6">
              Esterilizaciones y suturas.
            </p>
            <div className="mt-auto">
              <p className="text-xs text-slate-400 mb-1">Desde</p>
              <p className="text-3xl font-medium tracking-tight text-slate-900">
                $1,500{' '}
                <span className="text-sm font-normal text-slate-400">MXN</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Pricing
