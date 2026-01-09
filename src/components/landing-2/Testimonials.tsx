import { Icon } from '@iconify/react'

const Testimonials = () => {
  return (
    <section id="testimonios" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl font-medium tracking-tight text-slate-900 mb-12 text-center">
          Lo que dicen los dueños
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Testimonial 1 */}
          <div className="bg-slate-50 p-8 rounded-2xl">
            <div className="flex items-center gap-1 text-yellow-500 mb-4">
              <Icon icon="lucide:star" width={16} />
              <Icon icon="lucide:star" width={16} />
              <Icon icon="lucide:star" width={16} />
              <Icon icon="lucide:star" width={16} />
              <Icon icon="lucide:star" width={16} />
            </div>

            <p className="text-slate-600 mb-6 italic">
              &quot;El trato que le dieron a Max fue increíble. Llegamos muy asustados por una emergencia y nos atendieron de inmediato con mucha calma.&quot;
            </p>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-slate-200 overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=100&h=100&q=80"
                  alt="Ana Gutiérrez"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-900">
                  Ana Gutiérrez
                </p>
                <p className="text-xs text-slate-400">
                  Dueña de Max (Golden)
                </p>
              </div>
            </div>
          </div>

          {/* Testimonial 2 */}
          <div className="bg-slate-50 p-8 rounded-2xl">
            <div className="flex items-center gap-1 text-yellow-500 mb-4">
              <Icon icon="lucide:star" width={16} />
              <Icon icon="lucide:star" width={16} />
              <Icon icon="lucide:star" width={16} />
              <Icon icon="lucide:star" width={16} />
              <Icon icon="lucide:star" width={16} />
            </div>

            <p className="text-slate-600 mb-6 italic">
              &quot;Me encanta que puedo ver el historial de vacunas en línea. El lugar siempre está impecable y huele muy limpio.&quot;
            </p>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-slate-200 overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&h=100&q=80"
                  alt="Carlos Méndez"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-900">
                  Carlos Méndez
                </p>
                <p className="text-xs text-slate-400">
                  Dueño de Luna (Gato)
                </p>
              </div>
            </div>
          </div>

          {/* Testimonial 3 */}
          <div className="bg-slate-50 p-8 rounded-2xl">
            <div className="flex items-center gap-1 text-yellow-500 mb-4">
              <Icon icon="lucide:star" width={16} />
              <Icon icon="lucide:star" width={16} />
              <Icon icon="lucide:star" width={16} />
              <Icon icon="lucide:star" width={16} />
              <Icon icon="lucide:star-half" width={16} />
            </div>

            <p className="text-slate-600 mb-6 italic">
              &quot;Excelentes precios para la calidad del servicio. La cirugía de esterilización de mi perrita salió perfecta y la recuperación fue rápida.&quot;
            </p>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-slate-200 overflow-hidden">
                <img
                  src="https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/917d6f93-fb36-439a-8c48-884b67b35381_1600w.jpg"
                  alt="Elena Rojas"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-900">
                  Elena Rojas
                </p>
                <p className="text-xs text-slate-400">
                  Dueña de Coco (Pug)
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Testimonials
