import Button from "../ui/Button";

const SidebarPackages = () => {
  return (
    <div className="bg-emerald-50/50 rounded-xl border border-emerald-200/60 p-5">
      <h3 className="text-emerald-900 font-medium mb-4">
        Paquetes recomendados
      </h3>

      <div className="space-y-2 text-sm">
        <Package name="Check-up anual" price="$1,200" />
        <Package name="Grooming mensual" price="$850" />
      </div>

      <Button
        variant="success"
        fullWidth
        className="mt-4"
      >
        Ver paquetes
      </Button>
    </div>
  )
}

const Package = ({ name, price }: { name: string; price: string }) => (
  <div className="flex justify-between">
    <span className="text-emerald-900">{name}</span>
    <span className="font-medium text-emerald-700">{price}</span>
  </div>
)

export default SidebarPackages
