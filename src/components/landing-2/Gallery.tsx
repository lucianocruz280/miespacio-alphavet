const Gallery = () => {
  return (
    <section className="py-24 bg-white border-t border-slate-50">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl font-medium tracking-tight text-slate-900 mb-8">
          Nuestros pacientes
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 h-96">
          {/* Large item */}
          <div className="col-span-2 row-span-2 rounded-2xl overflow-hidden relative group">
            <img
              src="https://images.unsplash.com/photo-1599443015574-be5fe8a05783?auto=format&fit=crop&w=800&q=80"
              alt="Cat clinic"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>

          <div className="rounded-2xl overflow-hidden relative group">
            <img
              src="https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?auto=format&fit=crop&w=400&q=80"
              alt="Dog"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>

          <div className="rounded-2xl overflow-hidden relative group">
            <img
              src="https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=400&q=80"
              alt="Cat"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>

          <div className="col-span-2 rounded-2xl overflow-hidden relative group">
            <img
              src="https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/4734259a-bad7-422f-981e-ce01e79184f2_1600w.jpg"
              alt="Vet examining dog"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default Gallery
