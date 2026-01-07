import { MapPin, Phone, Mail, Send } from 'lucide-react'

const Contact = () => {
  return (
    <section id="contacto" className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <div>
            <span className="text-primary font-bold tracking-wider uppercase text-sm">Hablemos</span>
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 mt-3 mb-6">
              ¿Tienes alguna <br />
              <span className="gradient-text">duda o emergencia?</span>
            </h2>

            <p className="text-lg text-slate-500 mb-12 leading-relaxed">
              Nuestro equipo está disponible para asesorarte. No dudes en contactarnos a través de cualquier vía.
            </p>

            <div className="space-y-8">
              <div className="flex items-center gap-6 group">
                <div className="w-14 h-14 rounded-2xl bg-primary-50 flex items-center justify-center text-primary transition-all group-hover:bg-primary group-hover:text-white group-hover:rotate-6 shadow-sm">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-lg">Visítanos</h4>
                  <p className="text-slate-500">
                    Av. de las Mascotas 123, Col. Centro, CDMX
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-6 group">
                <div className="w-14 h-14 rounded-2xl bg-accent-50 flex items-center justify-center text-accent transition-all group-hover:bg-accent group-hover:text-white group-hover:-rotate-6 shadow-sm">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-lg">Llámanos</h4>
                  <p className="text-slate-500">
                    +52 (55) 1234 5678 (Disponible 24/7)
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-6 group">
                <div className="w-14 h-14 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600 transition-all group-hover:bg-indigo-600 group-hover:text-white group-hover:scale-110 shadow-sm">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-lg">Escríbenos</h4>
                  <p className="text-slate-500">
                    hola@alphavet.com
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-tr from-primary-100 to-accent-100 rounded-[3rem] blur-2xl opacity-30" />
            <div className="relative bg-white p-10 md:p-12 rounded-[2.5rem] border border-slate-100 shadow-2xl shadow-slate-200/50">
              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">
                      Nombre
                    </label>
                    <input
                      type="text"
                      className="w-full px-5 py-4 rounded-xl bg-slate-50 border border-slate-100 focus:outline-none focus:ring-4 focus:ring-primary-50 focus:border-primary-200 transition-all text-sm font-medium"
                      placeholder="Juan Pérez"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">
                      Teléfono
                    </label>
                    <input
                      type="tel"
                      className="w-full px-5 py-4 rounded-xl bg-slate-50 border border-slate-100 focus:outline-none focus:ring-4 focus:ring-primary-50 focus:border-primary-200 transition-all text-sm font-medium"
                      placeholder="55 1234 5678"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">
                    Correo Electrónico
                  </label>
                  <input
                    type="email"
                    className="w-full px-5 py-4 rounded-xl bg-slate-50 border border-slate-100 focus:outline-none focus:ring-4 focus:ring-primary-50 focus:border-primary-200 transition-all text-sm font-medium"
                    placeholder="juan@ejemplo.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">
                    Tu Mensaje
                  </label>
                  <textarea
                    rows={4}
                    className="w-full px-5 py-4 rounded-xl bg-slate-50 border border-slate-100 focus:outline-none focus:ring-4 focus:ring-primary-50 focus:border-primary-200 transition-all text-sm font-medium resize-none"
                    placeholder="¿En qué podemos ayudarte?"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-primary text-white font-bold py-5 rounded-2xl hover:bg-primary-700 transition-all shadow-xl shadow-primary-100 flex items-center justify-center gap-3 active:scale-[0.98]"
                >
                  <Send className="w-5 h-5" />
                  Enviar Mensaje Ahora
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact

