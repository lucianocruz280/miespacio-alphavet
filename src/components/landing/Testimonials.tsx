import { Star, Quote } from 'lucide-react'

const Testimonials = () => {
    const reviews = [
        {
            name: "Ana Gutiérrez",
            pet: "Max (Golden Retriever)",
            text: "El trato que le dieron a Max fue increíble. Llegamos muy asustados por una emergencia y nos atendieron de inmediato con mucha calma y profesionalismo.",
            avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=100&h=100&q=80",
            rating: 5
        },
        {
            name: "Carlos Méndez",
            pet: "Luna (Gato Siamés)",
            text: "Me encanta que puedo ver el historial de vacunas en línea. El lugar siempre está impecable y el personal es sumamente atento con los detalles.",
            avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&h=100&q=80",
            rating: 5
        },
        {
            name: "Elena Rojas",
            pet: "Coco (Pug)",
            text: "Excelentes instalaciones y precios justos. La cirugía de esterilización de mi perrita salió perfecta gracias a la tecnología que utilizan.",
            avatar: "https://HoIrqRkdGBmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/917d6f93-fb36-439a-8c48-884b67b35381_1600w.jpg",
            rating: 5
        }
    ]

    return (
        <section id="testimonios" className="py-24 bg-white overflow-hidden">
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <span className="text-primary font-bold tracking-wider uppercase text-sm">Testimonios</span>
                    <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 mt-3">
                        Lo que dicen los <br />
                        <span className="gradient-text">dueños de mascotas</span>
                    </h2>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {reviews.map((review, index) => (
                        <div key={index} className="relative p-8 rounded-[2rem] bg-slate-50 border border-slate-100 transition-all hover:bg-white hover:shadow-2xl hover:shadow-primary-100/20 group">
                            <Quote className="absolute top-6 right-8 w-12 h-12 text-primary-100 group-hover:text-primary-200 transition-colors" />
                            
                            <div className="flex items-center gap-1 text-amber-400 mb-6">
                                {[...Array(review.rating)].map((_, i) => (
                                    <Star key={i} className="w-5 h-5 fill-current" />
                                ))}
                            </div>

                            <p className="text-slate-600 mb-8 italic leading-relaxed relative z-10">
                                &quot;{review.text}&quot;
                            </p>

                            <div className="flex items-center gap-4 border-t border-slate-200 pt-6">
                                <div className="w-12 h-12 rounded-full border-2 border-white ring-2 ring-slate-100 overflow-hidden shadow-sm">
                                    <img
                                        src={review.avatar}
                                        alt={review.name}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div>
                                    <p className="text-base font-bold text-slate-900">
                                        {review.name}
                                    </p>
                                    <p className="text-sm text-slate-500 font-medium">
                                        {review.pet}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Testimonials

