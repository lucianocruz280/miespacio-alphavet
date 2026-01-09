'use client'

import { useEffect } from 'react'

const HeroSlider = () => {
  useEffect(() => {
    const slides = document.querySelectorAll<HTMLElement>('.slide')
    const indicators = document.querySelectorAll<HTMLElement>('.indicator')

    let currentSlide = 0
    let slideInterval: any

    const showSlide = (index: number) => {
      slides.forEach(slide => slide.classList.remove('active'))
      indicators.forEach(ind => {
        ind.classList.remove('bg-white', 'w-6')
        ind.classList.add('bg-white/50')
      })

      slides[index].classList.add('active')
      indicators[index]?.classList.remove('bg-white/50')
      indicators[index]?.classList.add('bg-white', 'w-6')

      currentSlide = index
    }

    const nextSlide = () => {
      const next = (currentSlide + 1) % slides.length
      showSlide(next)
    }

    const resetTimer = () => {
      clearInterval(slideInterval)
      slideInterval = setInterval(nextSlide, 5000)
    }

    // expose function like original inline JS
    ;(window as any).goToSlide = (index: number) => {
      showSlide(index)
      resetTimer()
    }

    showSlide(0)
    resetTimer()

    return () => clearInterval(slideInterval)
  }, [])

  return (
    <section className="relative w-full h-[70vh] md:h-[90vh] overflow-hidden bg-slate-900">

      {/* SLIDE 1 */}
      <div className="slide active absolute inset-0 w-full h-full">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=2000')] bg-cover bg-center" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent" />

        <div className="relative z-10 h-full max-w-7xl mx-auto px-6 flex items-center">
          <div className="slide-content max-w-lg bg-white/90 backdrop-blur-md p-8 md:p-10 rounded-3xl shadow-2xl border border-white/50">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 mb-5 w-fit">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500" />
              </span>
              <span className="text-xs font-semibold text-blue-700 tracking-wide uppercase">
                Diagnóstico Preciso
              </span>
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight text-slate-900 mb-4">
              Consulta Clínica
            </h1>

            <p className="text-lg text-slate-600 mb-8 font-normal leading-relaxed">
              Atención veterinaria profesional con diagnóstico y tratamiento especializado para la salud de tu mascota.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <button className="inline-flex items-center justify-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-blue-700 transition-all shadow-lg shadow-blue-200">
                Agendar consulta
              </button>
              <button className="inline-flex items-center justify-center gap-2 bg-white text-slate-700 border border-slate-200 px-6 py-3 rounded-xl font-medium hover:bg-slate-50 transition-all">
                Crear cuenta
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* SLIDE 2 */}
      <div className="slide absolute inset-0 w-full h-full">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?auto=format&fit=crop&q=80&w=2000')] bg-cover bg-center" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-transparent" />

        <div className="relative z-10 h-full max-w-7xl mx-auto px-6 flex items-center">
          <div className="slide-content max-w-lg bg-white/90 backdrop-blur-md p-8 md:p-10 rounded-3xl shadow-2xl border border-white/50">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-50 border border-pink-100 mb-5 w-fit">
              <span className="text-xs font-semibold text-pink-700 tracking-wide uppercase">
                Grooming & Spa
              </span>
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight text-slate-900 mb-4">
              Estética y Spa
            </h1>

            <p className="text-lg text-slate-600 mb-8 font-normal leading-relaxed">
              Baño, corte y cuidado estético profesional para que tu mascota luzca y se sienta increíble.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <button className="inline-flex items-center justify-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-blue-700 transition-all shadow-lg shadow-blue-200">
                Ver servicios
              </button>
              <button className="inline-flex items-center justify-center gap-2 bg-white text-slate-700 border border-slate-200 px-6 py-3 rounded-xl font-medium hover:bg-slate-50 transition-all">
                Agendar ahora
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* SLIDE 3 */}
      <div className="slide absolute inset-0 w-full h-full">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1576201836106-db1758fd1c97?auto=format&fit=crop&q=80&w=2000')] bg-cover bg-center" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-transparent" />

        <div className="relative z-10 h-full max-w-7xl mx-auto px-6 flex items-center">
          <div className="slide-content max-w-lg bg-white/90 backdrop-blur-md p-8 md:p-10 rounded-3xl shadow-2xl border border-white/50">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 border border-teal-100 mb-5 w-fit">
              <span className="text-xs font-semibold text-teal-700 tracking-wide uppercase">
                Cuidado 24/7
              </span>
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight text-slate-900 mb-4">
              Hospitalización
            </h1>

            <p className="text-lg text-slate-600 mb-8 font-normal leading-relaxed">
              Monitoreo 24/7 con instalaciones seguras, ambiente controlado y personal capacitado.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <button className="inline-flex items-center justify-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-blue-700 transition-all shadow-lg shadow-blue-200">
                Conocer más
              </button>
              <button className="inline-flex items-center justify-center gap-2 bg-white text-slate-700 border border-slate-200 px-6 py-3 rounded-xl font-medium hover:bg-slate-50 transition-all">
                Contactar
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* SLIDE 4 */}
      <div className="slide absolute inset-0 w-full h-full">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1584017911766-d451b3d0e843?auto=format&fit=crop&q=80&w=2000')] bg-cover bg-center" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent" />

        <div className="relative z-10 h-full max-w-7xl mx-auto px-6 flex items-center">
          <div className="slide-content max-w-lg bg-white/90 backdrop-blur-md p-8 md:p-10 rounded-3xl shadow-2xl border border-white/50">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 mb-5 w-fit">
              <span className="text-xs font-semibold text-indigo-700 tracking-wide uppercase">
                Quirófano Equipado
              </span>
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight text-slate-900 mb-4">
              Cirugías
            </h1>

            <p className="text-lg text-slate-600 mb-8 font-normal leading-relaxed">
              Procedimientos seguros en quirófanos equipados con tecnología moderna y monitorización avanzada.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <button className="inline-flex items-center justify-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-blue-700 transition-all shadow-lg shadow-blue-200">
                Agendar valoración
              </button>
              <button className="inline-flex items-center justify-center gap-2 bg-white text-slate-700 border border-slate-200 px-6 py-3 rounded-xl font-medium hover:bg-slate-50 transition-all">
                Hablar con especialista
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* SLIDE 5 */}
      <div className="slide absolute inset-0 w-full h-full">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&q=80&w=2000')] bg-cover bg-center" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-transparent" />

        <div className="relative z-10 h-full max-w-7xl mx-auto px-6 flex items-center">
          <div className="slide-content max-w-lg bg-white/90 backdrop-blur-md p-8 md:p-10 rounded-3xl shadow-2xl border border-white/50">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-50 border border-rose-100 mb-5 w-fit">
              <span className="text-xs font-semibold text-rose-700 tracking-wide uppercase">
                Medicamentos al día
              </span>
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight text-slate-900 mb-4">
              Farmacia Veterinaria
            </h1>

            <p className="text-lg text-slate-600 mb-8 font-normal leading-relaxed">
              Medicamentos y productos especializados disponibles al instante para la recuperación de tu amigo.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <button className="inline-flex items-center justify-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-blue-700 transition-all shadow-lg shadow-blue-200">
                Ver farmacia
              </button>
              <button className="inline-flex items-center justify-center gap-2 bg-white text-slate-700 border border-slate-200 px-6 py-3 rounded-xl font-medium hover:bg-slate-50 transition-all">
                Crear cuenta
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* INDICATORS */}
      <div className="absolute bottom-8 left-0 right-0 z-20 flex justify-center gap-3">
        {[0,1,2,3,4].map(i => (
          <button
            key={i}
            onClick={() => (window as any).goToSlide(i)}
            className="indicator w-2.5 h-2.5 rounded-full bg-white/50 hover:bg-white transition-all"
          />
        ))}
      </div>
    </section>
  )
}

export default HeroSlider
