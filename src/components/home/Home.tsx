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
            title="Consulta veterinaria"
            description="Revisión general, diagnóstico y tratamiento."
            duration="30–45 min"
            price="$350 MXN"
            icon={Stethoscope}
          />
          <ServiceCard
            title="Peluquería y estética"
            description="Baño, corte, uñas y spa."
            duration="60–90 min"
            price="$450 MXN"
            icon={Scissors}
          />
          <ServiceCard
            title="Hospitalización"
            description="Ingreso y monitoreo."
            duration="por día"
            price="$900 MXN"
            icon={BriefcaseMedical}
          />
          <ServiceCard
            title="Hotel y guardería"
            description="Hospedaje seguro."
            duration="por noche"
            price="$600 MXN"
            icon={Hotel}
          />
          <ServiceCard
            title="Transporte"
            description="Pet taxi o ambulancia."
            duration="30–60 min"
            price="$250 MXN"
            icon={Car}
          />
          <ServiceCard
            title="Funeraria y crematorio"
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