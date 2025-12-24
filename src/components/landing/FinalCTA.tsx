import { Icon } from '@iconify/react'

const FinalCTA = () => {
  return (
    <section className="py-24 bg-blue-50">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h2 className="text-4xl font-medium tracking-tight text-slate-900 mb-6">
          ¿Listo para cuidar a tu mejor amigo?
        </h2>

        <p className="text-lg text-slate-500 mb-10">
          Agenda tu cita hoy mismo y forma parte de nuestra comunidad. Tu mascota te lo agradecerá.
        </p>

        <a
          href="#contacto"
          className="inline-flex items-center justify-center gap-2 bg-blue-600 text-white px-8 py-4 rounded-xl font-medium text-lg hover:bg-blue-700 transition-all shadow-lg shadow-blue-200"
        >
          Agenda una cita hoy
          <Icon icon="lucide:arrow-right" width={20} />
        </a>
      </div>
    </section>
  )
}

export default FinalCTA
