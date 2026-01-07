const Gallery = () => {
    return (
        <section className="py-24 bg-white overflow-hidden">
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
                    <div className="max-w-xl">
                        <span className="text-primary font-bold tracking-wider uppercase text-sm">Nuestros Pacientes</span>
                        <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 mt-3">
                            Momentos de <br />
                            <span className="gradient-text">felicidad y salud</span>
                        </h2>
                    </div>
                </div>

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 h-[600px]">
                    <div className="col-span-2 row-span-2 rounded-[2.5rem] overflow-hidden relative group shadow-xl">
                        <img
                            src="https://images.unsplash.com/photo-1599443015574-be5fe8a05783?auto=format&fit=crop&w=800&q=80"
                            alt="Cat clinic"
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-8">
                            <p className="text-white font-bold text-lg">Tecnología de punta</p>
                        </div>
                    </div>

                    <div className="rounded-[2rem] overflow-hidden relative group shadow-lg">
                        <img
                            src="https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?auto=format&fit=crop&w=400&q=80"
                            alt="Dog"
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                    </div>

                    <div className="rounded-[2rem] overflow-hidden relative group shadow-lg">
                        <img
                            src="https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=400&q=80"
                            alt="Cat"
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                    </div>

                    <div className="col-span-2 rounded-[2rem] overflow-hidden relative group shadow-lg">
                        <img
                            src="https://HoIrqRkdGBmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/4734259a-bad7-422f-981e-ce01e79184f2_1600w.jpg"
                            alt="Vet examining dog"
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Gallery

