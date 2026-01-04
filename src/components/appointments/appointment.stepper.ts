import { defineStepper } from "@stepperize/react"

export const { useStepper } = defineStepper(
  { id: "base", title: "Información básica" },
  { id: "schedule", title: "Fecha y hora" },
  { id: "extras", title: "Extras" },
  { id: "payment", title: "Pago" }
)
