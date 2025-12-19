import Button from "../ui/Button";

const SidebarPromotions = () => {
    return (
        <div className="bg-amber-50/50 rounded-xl border border-amber-200/60 p-5" >
            <h3 className="text-amber-900 font-medium mb-4" >
                Promociones activas
            </h3>

            < Promo
                title="Baño + Corte"
                subtitle="10% de descuento"
            />
            <Divider />
            < Promo
                title="Vacuna + Revisión"
                subtitle="$50 MXN menos"
            />
        </div>
    )
}

const Promo = ({ title, subtitle }: { title: string; subtitle: string }) => (
    <div className="flex items-center justify-between" >
        <div>
            <p className="text-sm font-medium text-amber-950" > {title} </p>
            < p className="text-xs text-amber-700" > {subtitle} </p>
        </div>
        <Button variant="warning" className="px-3 py-1.5 text-xs">
            Aplicar
        </Button>
    </div>
)

const Divider = () => (
    <div className="my-3 h-px bg-amber-200/50" />
)

export default SidebarPromotions
