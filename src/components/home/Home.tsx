import { Stethoscope, Scissors, BriefcaseMedical, Hotel, Car, Flower2 } from "lucide-react"
import ServiceCard from "../services/ServiceCard"

const HomeComponent = () => {
    return (
         <main className="flex-1">
        <h1 className="text-2xl md:text-3xl font-medium text-slate-900 mb-2">
          Agenda servicios para tu mascota
        </h1>
        <p className="text-slate-500 mb-8">
          Cuidado integral: salud, estética, hospedaje y transporte.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5">

          <ServiceCard
            title="Hospital"
            description="Revisión general, diagnóstico y tratamiento."
            duration="30–45 min"
            price="$350 MXN"
            icon={Stethoscope}
          />
          <ServiceCard
            title="Estética"
            description="Baño, corte, uñas y spa."
            duration="60–90 min"
            price="$450 MXN"
            icon={Scissors}
          />
          <ServiceCard
            title="Farmacia"
            description="Medicamentos y prenscripciones"
            duration="por día"
            price="$900 MXN"
            icon={BriefcaseMedical}
          />
          <ServiceCard
            title="Tienda en línea"
            description="Croquetas, juguetes, jaulas."
            duration="por noche"
            price="$600 MXN"
            icon={Hotel}
          />
       
          <ServiceCard
            title="Crematorio"
            description="Acompañamiento digno."
            duration="60–120 min"
            price="$1,200 MXN"
            icon={Flower2}
          />
        </div>
      </main>
    )
}

export default HomeComponent