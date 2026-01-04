import { useMemo, useState } from "react"
import Button from "@/components/ui/Button"
import { CardPaymentFormProps } from "@/types/appointments"

const isAmex = (value: string) =>
  /^3[47]/.test(value.replace(/\s/g, ""))

const formatCardNumber = (value: string) => {
  const digits = value.replace(/\D/g, "")
  return digits.replace(/(.{4})/g, "$1 ").trim()
}

const CardPaymentForm = ({ onValidSubmit }: CardPaymentFormProps) => {
  const [cardNumber, setCardNumber] = useState("")
  const [name, setName] = useState("")
  const [expiry, setExpiry] = useState("")
  const [cvv, setCvv] = useState("")

  const amex = useMemo(() => isAmex(cardNumber), [cardNumber])
  const cvvLength = amex ? 4 : 3

  const isValid =
    cardNumber.replace(/\s/g, "").length === (amex ? 15 : 16) &&
    cvv.length === cvvLength &&
    expiry.length === 5 &&
    name.length > 3

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-6">

      <div>
        <h2 className="text-lg font-semibold text-slate-900">
          Pago con tarjeta
        </h2>
        <p className="text-sm text-slate-500">
          Tus datos están protegidos
        </p>
      </div>

      {/* Card Number */}
      <div>
        <label className="text-sm font-medium text-slate-900">
          Número de tarjeta
        </label>
        <input
          value={cardNumber}
          onChange={(e) =>
            setCardNumber(formatCardNumber(e.target.value))
          }
          maxLength={amex ? 17 : 19}
          placeholder="0000 0000 0000 0000"
          className="mt-1 w-full rounded-lg border border-slate-200 px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500/20"
        />
      </div>

      {/* Name */}
      <div>
        <label className="text-sm font-medium text-slate-900">
          Nombre del titular
        </label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Como aparece en la tarjeta"
          className="mt-1 w-full rounded-lg border border-slate-200 px-4 py-2 text-sm"
        />
      </div>

      {/* Expiry + CVV */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium text-slate-900">
            Expiración
          </label>
          <input
            value={expiry}
            onChange={(e) => setExpiry(e.target.value)}
            placeholder="MM/YY"
            maxLength={5}
            className="mt-1 w-full rounded-lg border border-slate-200 px-4 py-2 text-sm"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-slate-900">
            CVV
          </label>
          <input
            value={cvv}
            onChange={(e) => setCvv(e.target.value.replace(/\D/g, ""))}
            maxLength={cvvLength}
            placeholder={amex ? "4 dígitos" : "3 dígitos"}
            className="mt-1 w-full rounded-lg border border-slate-200 px-4 py-2 text-sm"
          />
        </div>
      </div>

      {/* Submit */}
      <div className="pt-4">
        <Button
          fullWidth
          disabled={!isValid}
          onClick={onValidSubmit}
        >
          Pagar y confirmar
        </Button>
      </div>
    </div>
  )
}

export default CardPaymentForm
