export type PaymentMethod = "CLINIC" | "CARD"

export type AppointmentDraft = {
  petId?: string
  branchId?: string
  serviceType?: string

  date?: string
  time?: string
  vetId?: string

  coupon?: string
  notes?: string

  paymentMethod?: PaymentMethod
}

export type CardPaymentFormProps = {
  onValidSubmit: () => void
}
