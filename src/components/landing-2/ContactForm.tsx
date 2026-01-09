import { Icon } from '@iconify/react'

const Contact = () => {
  return (
    <section id="contacto" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Info */}
          <div>
            <h2 className="text-3xl font-medium tracking-tight text-slate-900 mb-6">
              Contáctanos
            </h2>

            <p className="text-slate-500 mb-10">
              Estamos aquí para resolver tus dudas. Llena el formulario o visítanos directamente.
            </p>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-600 flex-shrink-0">
                  <Icon icon="lucide:map-pin" width={20} />
                </div>
                <div>
                  <h4 className="font-medium text-slate-900">Ubicación</h4>
                  <p className="text-sm text-slate-500">
                    Av. de las Mascotas 123, Col. Centro
                    <br />
                    Ciudad de México, CP 06000
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-600 flex-shrink-0">
                  <Icon icon="lucide:phone" width={20} />
                </div>
                <div>
                  <h4 className="font-medium text-slate-900">Teléfono</h4>
                  <p className="text-sm text-slate-500">
                    +52 (55) 1234 5678
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-600 flex-shrink-0">
                  <Icon icon="lucide:mail" width={20} />
                </div>
                <div>
                  <h4 className="font-medium text-slate-900">Email</h4>
                  <p className="text-sm text-slate-500">
                    contacto@vetcare.com
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-xl shadow-slate-100/50">
            <form className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Nombre Completo
                </label>
                <input
                  type="text"
                  placeholder="Ej. Juan Pérez"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm placeholder:text-slate-400"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="tu@email.com"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm placeholder:text-slate-400"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Mensaje
                </label>
                <textarea
                  rows={4}
                  placeholder="Hola, quisiera agendar una cita para..."
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm placeholder:text-slate-400 resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-slate-900 text-white font-medium py-3.5 rounded-xl hover:bg-slate-800 transition-all shadow-md"
              >
                Enviar Mensaje
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact
