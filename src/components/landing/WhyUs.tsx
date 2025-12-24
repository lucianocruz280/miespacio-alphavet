import { Icon } from "@iconify/react"

const WhyUs = () => {
    return (
        <section className="py-20 bg-slate-50">
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <h2 className="text-3xl font-medium tracking-tight text-slate-900 mb-4">
                        ¿Por qué elegirnos?
                    </h2>
                    <p className="text-slate-500">
                        Más que una clínica, somos una familia dedicada al bienestar de tus mascotas con estándares internacionales.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    <div className="flex flex-col items-center text-center">
                        <div className="w-14 h-14 bg-white rounded-2xl shadow-sm border border-slate-100 flex items-center justify-center text-blue-600 mb-4">
                            <Icon icon="lucide:stethoscope" width={28} />
                        </div>
                        <h3 className="text-lg font-medium text-slate-900 mb-2">
                            Atención Profesional
                        </h3>
                        <p className="text-sm text-slate-500">
                            Veterinarios certificados y en constante actualización.
                        </p>
                    </div>

                    <div className="flex flex-col items-center text-center">
                        <div className="w-14 h-14 bg-white rounded-2xl shadow-sm border border-slate-100 flex items-center justify-center text-blue-600 mb-4">

                            <Icon icon="lucide:file-heart" width={28} />
                        </div>
                        <h3 className="text-lg font-medium text-slate-900 mb-2">
                            Historial Digital
                        </h3>
                        <p className="text-sm text-slate-500">
                            Accede al expediente médico de tu mascota desde tu celular.
                        </p>
                    </div>

                    <div className="flex flex-col items-center text-center">
                        <div className="w-14 h-14 bg-white rounded-2xl shadow-sm border border-slate-100 flex items-center justify-center text-blue-600 mb-4">

                            <Icon icon="lucide:smartphone" width={28} />
                        </div>
                        <h3 className="text-lg font-medium text-slate-900 mb-2">
                            Reservas Fáciles
                        </h3>
                        <p className="text-sm text-slate-500">
                            Agenda, reprograma o cancela en segundos online.
                        </p>
                    </div>

                    <div className="flex flex-col items-center text-center">
                        <div className="w-14 h-14 bg-white rounded-2xl shadow-sm border border-slate-100 flex items-center justify-center text-blue-600 mb-4">
                          
                            <Icon icon="lucide:shield-check" width={28} />
                        </div>
                        <h3 className="text-lg font-medium text-slate-900 mb-2">
                            Seguridad Total
                        </h3>
                        <p className="text-sm text-slate-500">
                            Instalaciones sanitizadas y protocolos estrictos de higiene.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default WhyUs
