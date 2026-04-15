import ShopLayout from '@/components/layout/ShopLayout'
import { useCartStore } from '@/store/useCartStore'
import { Icon } from '@iconify/react'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import api from '@/lib/axios'
import useAxios from '@/hooks/useAxios'
import { toast } from 'sonner'
import Link from 'next/link'

const DEFAULT_IMAGE =
  'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?q=80&w=200&auto=format&fit=crop'

type PaymentMethod = 'CARD' | 'WALLET' | 'CASH'

interface Address {
  name: string
  phone: string
  street: string
  colonia: string
  city: string
  state: string
  zip: string
  references: string
}

const EMPTY_ADDRESS: Address = {
  name: '', phone: '', street: '', colonia: '', city: '', state: '', zip: '', references: '',
}

const MX_STATES = [
  'Aguascalientes','Baja California','Baja California Sur','Campeche','Chiapas','Chihuahua',
  'Coahuila','Colima','Ciudad de México','Durango','Guanajuato','Guerrero','Hidalgo',
  'Jalisco','México','Michoacán','Morelos','Nayarit','Nuevo León','Oaxaca','Puebla',
  'Querétaro','Quintana Roo','San Luis Potosí','Sinaloa','Sonora','Tabasco','Tamaulipas',
  'Tlaxcala','Veracruz','Yucatán','Zacatecas',
]

export default function CheckoutPage() {
  const router = useRouter()
  const { items, getTotal, clearCart, updateQuantity, removeItem } = useCartStore()
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('CARD')
  const [isProcessing, setIsProcessing] = useState(false)
  const [itemPets, setItemPets] = useState<Record<string, string>>({})
  const [address, setAddress] = useState<Address>(EMPTY_ADDRESS)
  const [saveAddress, setSaveAddress] = useState(false)
  const [coupon, setCoupon] = useState('')
  const [couponApplied, setCouponApplied] = useState(false)
  const [notes, setNotes] = useState('')
  const [step, setStep] = useState<1 | 2 | 3>(1) // 1=Cart, 2=Address, 3=Payment

  const { data: walletData } = useAxios<any>({ url: 'wallet/my-balance' })
  const { data: petsData } = useAxios<any>({ url: 'pets' })

  const walletBalance = walletData?.data?.balance ?? 0
  const pets = petsData?.data ?? []
  const subtotal = getTotal()
  const discount = couponApplied ? subtotal * 0.1 : 0
  const subtotalAfterDiscount = subtotal - discount
  const tax = subtotalAfterDiscount * 0.16
  const total = subtotalAfterDiscount + tax

  useEffect(() => {
    if (items.length === 0 && !isProcessing) router.push('/shop')
  }, [items, isProcessing])

  const handleApplyCoupon = () => {
    if (!coupon.trim()) return
    if (coupon.toUpperCase() === 'ALPHAVET10') {
      setCouponApplied(true)
      toast.success('Cupón aplicado: 10% de descuento')
    } else {
      toast.error('Cupón inválido o expirado')
    }
  }

  const handleConfirmOrder = async () => {
    // Step 1: validate cart has items with pets assigned
    const missingPets = items.filter((it) => it.type === 'SERVICE' && !itemPets[it.id])
    if (missingPets.length > 0) {
      toast.error(`Selecciona una mascota para: ${missingPets[0].name}`)
      setStep(1)
      return
    }
    // Step 2: validate address
    if (!address.street || !address.city || !address.state || !address.zip || !address.phone) {
      toast.error('Completa los datos de entrega')
      setStep(2)
      return
    }
    if (paymentMethod === 'WALLET' && walletBalance < total) {
      toast.error('Saldo insuficiente en tu monedero')
      return
    }

    try {
      setIsProcessing(true)
      const { data } = await api.post('myspace/orders', {
        items: items.map((it) => ({
          id: it.id, type: it.type, quantity: it.quantity,
          unitPrice: it.price, name: it.name, petId: itemPets[it.id] || null,
        })),
        paymentMethod,
        address: saveAddress ? address : undefined,
        notes,
      })
      toast.success('¡Orden creada con éxito!')
      clearCart()
      router.push(`/orders/${data.data.id}`)
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'No se pudo procesar tu orden')
    } finally {
      setIsProcessing(false)
    }
  }

  const STEPS = [
    { n: 1, label: 'Carrito', icon: 'solar:cart-large-2-linear' },
    { n: 2, label: 'Entrega', icon: 'solar:map-point-wave-linear' },
    { n: 3, label: 'Pago', icon: 'solar:card-2-linear' },
  ]

  return (
    <ShopLayout>
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1 text-xs text-gray-500 mb-4">
        <Link href="/shop" className="hover:text-blue-600">Tienda</Link>
        <span className="mx-1 text-gray-400">›</span>
        <span className="text-gray-700 font-medium">Finalizar Compra</span>
      </nav>

      {/* Step indicator — full-width: absolute bg line + justify-between buttons */}
      <div className="bg-white border border-gray-200 rounded shadow-sm px-6 py-4 mb-4">
        <div className="relative flex items-center justify-between w-full">
          {/* Full-width background line */}
          <div className="absolute left-0 right-0 top-4 h-px bg-gray-200 z-0" />
          {/* Progress line (completed) */}
          <div
            className="absolute left-0 top-4 h-px bg-green-400 z-0 transition-all duration-500"
            style={{ width: step === 1 ? '0%' : step === 2 ? '50%' : '100%' }}
          />

          {STEPS.map((s) => (
            <button
              key={s.n}
              onClick={() => setStep(s.n as 1 | 2 | 3)}
              className="relative z-10 flex flex-col items-center gap-1.5 group"
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                step === s.n
                  ? 'bg-blue-600 border-blue-600 text-white shadow-md shadow-blue-200'
                  : step > s.n
                  ? 'bg-green-500 border-green-500 text-white'
                  : 'bg-white border-gray-300 text-gray-400'
              }`}>
                {step > s.n
                  ? <Icon icon="solar:check-circle-bold" className="w-4 h-4" />
                  : <Icon icon={s.icon} className="w-4 h-4" />
                }
              </div>
              <span className={`text-xs font-semibold whitespace-nowrap ${
                step === s.n ? 'text-blue-600' : step > s.n ? 'text-green-600' : 'text-gray-400'
              }`}>
                {s.label}
              </span>
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-col xl:flex-row gap-4 items-start">
        {/* ── Left: Steps content ────────────────── */}
        <div className="flex-1 min-w-0 space-y-4">

          {/* ══ STEP 1: Cart items ══ */}
          {step === 1 && (
            <div className="bg-white border border-gray-200 rounded shadow-sm overflow-hidden">
              <div className="flex items-center justify-between px-5 py-3 border-b border-dashed border-gray-200">
                <h3 className="font-semibold text-gray-800 text-sm">
                  Mi Carrito <span className="text-gray-400 font-normal">({items.length} {items.length === 1 ? 'producto' : 'productos'})</span>
                </h3>
                <Link href="/shop" className="text-xs text-blue-600 hover:underline flex items-center gap-1">
                  <Icon icon="solar:alt-arrow-left-linear" width={12} />
                  Seguir comprando
                </Link>
              </div>

              {/* Items table */}
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-gray-50 text-[10px] uppercase font-semibold text-gray-400 tracking-wider border-b border-gray-200">
                      <th className="text-left px-5 py-2.5" colSpan={2}>Producto</th>
                      <th className="px-4 py-2.5 text-center">Precio</th>
                      <th className="px-4 py-2.5 text-center">Cantidad</th>
                      <th className="px-5 py-2.5 text-right">Total</th>
                      <th className="px-3 py-2.5" />
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {items.map((it) => (
                      <>
                        <tr key={it.id} className="hover:bg-gray-50 transition-colors">
                          {/* Image */}
                          <td className="px-5 py-3" style={{ width: 56 }}>
                            <div className="w-12 h-12 border border-gray-200 rounded p-1 bg-white flex items-center justify-center">
                              <img
                                src={it.image || DEFAULT_IMAGE}
                                alt={it.name}
                                className="w-full h-full object-contain mix-blend-multiply"
                              />
                            </div>
                          </td>
                          {/* Name */}
                          <td className="px-2 py-3">
                            <p className="text-sm font-medium text-gray-800 leading-tight">{it.name}</p>
                            <p className="text-[10px] text-gray-400 uppercase font-semibold mt-0.5">
                              {it.type === 'SERVICE' ? 'Servicio' : 'Producto'}
                            </p>
                          </td>
                          {/* Unit price */}
                          <td className="px-4 py-3 text-center text-sm text-gray-600">
                            ${it.price.toLocaleString()}
                          </td>
                          {/* Qty stepper */}
                          <td className="px-4 py-3 text-center">
                            <div className="inline-flex items-center border border-gray-200 rounded overflow-hidden">
                              <button
                                onClick={() => it.quantity > 1 ? updateQuantity(it.id, it.quantity - 1) : removeItem(it.id)}
                                className="px-2 py-1 hover:bg-gray-100 text-gray-600 font-medium text-sm border-r border-gray-200"
                              >
                                –
                              </button>
                              <span className="px-3 py-1 text-sm font-semibold text-gray-900 min-w-[32px] text-center">
                                {it.quantity}
                              </span>
                              <button
                                onClick={() => updateQuantity(it.id, it.quantity + 1)}
                                className="px-2 py-1 hover:bg-gray-100 text-gray-600 font-medium text-sm border-l border-gray-200"
                              >
                                +
                              </button>
                            </div>
                          </td>
                          {/* Line total */}
                          <td className="px-5 py-3 text-right text-sm font-semibold text-gray-900">
                            ${(it.price * it.quantity).toLocaleString()}
                          </td>
                          {/* Remove */}
                          <td className="px-3 py-3 text-center">
                            <button
                              onClick={() => removeItem(it.id)}
                              className="w-7 h-7 rounded-full hover:bg-red-50 flex items-center justify-center text-gray-300 hover:text-red-500 transition-colors"
                            >
                              <Icon icon="solar:trash-bin-minimalistic-linear" width={14} />
                            </button>
                          </td>
                        </tr>

                        {/* Pet selector row for services */}
                        {it.type === 'SERVICE' && (
                          <tr key={`${it.id}-pet`} className="bg-blue-50/40">
                            <td colSpan={6} className="px-5 py-2">
                              <div className="flex items-center gap-3 flex-wrap">
                                <span className="text-[10px] font-semibold text-blue-600 uppercase flex items-center gap-1">
                                  <Icon icon="solar:dog-linear" width={12} />
                                  ¿Para qué mascota?
                                </span>
                                <div className="flex gap-2 flex-wrap">
                                  {pets.length === 0
                                    ? <span className="text-xs text-gray-400">Sin mascotas registradas</span>
                                    : pets.map((pet: any) => (
                                      <button
                                        key={pet.id}
                                        onClick={() => setItemPets((prev) => ({ ...prev, [it.id]: pet.id }))}
                                        className={`text-xs font-medium px-2.5 py-1 rounded border transition-all ${
                                          itemPets[it.id] === pet.id
                                            ? 'bg-blue-600 text-white border-blue-600'
                                            : 'bg-white text-gray-600 border-gray-200 hover:border-blue-300'
                                        }`}
                                      >
                                        {pet.name}
                                      </button>
                                    ))
                                  }
                                </div>
                              </div>
                            </td>
                          </tr>
                        )}
                      </>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Coupon + Notes */}
              <div className="p-5 border-t border-dashed border-gray-200 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Coupon code */}
                <div>
                  <label className="text-[10px] font-semibold uppercase text-gray-400 tracking-wider mb-1.5 block">
                    Código de Descuento
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={coupon}
                      onChange={(e) => setCoupon(e.target.value.toUpperCase())}
                      placeholder="Ej. ALPHAVET10"
                      disabled={couponApplied}
                      className="flex-1 text-sm border border-gray-200 rounded px-3 py-1.5 focus:outline-none focus:border-blue-400 disabled:bg-gray-50 disabled:text-gray-400 uppercase"
                    />
                    <button
                      onClick={handleApplyCoupon}
                      disabled={couponApplied || !coupon}
                      className="px-3 py-1.5 text-sm bg-gray-800 hover:bg-gray-900 text-white rounded disabled:opacity-40 transition-colors font-medium"
                    >
                      {couponApplied ? <Icon icon="solar:check-circle-bold" className="text-green-400 w-4 h-4" /> : 'Aplicar'}
                    </button>
                  </div>
                  {couponApplied && (
                    <p className="text-xs text-green-600 font-medium mt-1 flex items-center gap-1">
                      <Icon icon="solar:check-circle-bold" width={12} /> 10% de descuento aplicado
                    </p>
                  )}
                </div>
                {/* Order notes */}
                <div>
                  <label className="text-[10px] font-semibold uppercase text-gray-400 tracking-wider mb-1.5 block">
                    Notas del Pedido <span className="font-normal normal-case">(Opcional)</span>
                  </label>
                  <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Instrucciones especiales, hora de entrega, etc."
                    rows={2}
                    className="w-full text-sm border border-gray-200 rounded px-3 py-1.5 focus:outline-none focus:border-blue-400 resize-none placeholder:text-gray-400"
                  />
                </div>
              </div>

              <div className="px-5 pb-4 flex justify-end">
                <button
                  onClick={() => setStep(2)}
                  className="flex items-center gap-2 px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded transition-colors"
                >
                  Continuar a Entrega
                  <Icon icon="solar:alt-arrow-right-linear" width={16} />
                </button>
              </div>
            </div>
          )}

          {/* ══ STEP 2: Delivery address ══ */}
          {step === 2 && (
            <div className="bg-white border border-gray-200 rounded shadow-sm overflow-hidden">
              <div className="flex items-center justify-between px-5 py-3 border-b border-dashed border-gray-200">
                <h3 className="font-semibold text-gray-800 text-sm flex items-center gap-2">
                  <Icon icon="solar:map-point-wave-linear" className="text-blue-500" width={16} />
                  Datos de Entrega
                </h3>
                <button onClick={() => setStep(1)} className="text-xs text-gray-400 hover:text-blue-600 flex items-center gap-1">
                  <Icon icon="solar:alt-arrow-left-linear" width={12} />
                  Regresar
                </button>
              </div>

              <div className="p-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Full name */}
                <div className="sm:col-span-2">
                  <label className="text-[10px] font-semibold uppercase text-gray-400 tracking-wider mb-1 block">
                    Nombre Completo *
                  </label>
                  <input
                    value={address.name}
                    onChange={(e) => setAddress({ ...address, name: e.target.value })}
                    placeholder="Nombre del destinatario"
                    className="w-full text-sm border border-gray-200 rounded px-3 py-1.5 focus:outline-none focus:border-blue-400"
                  />
                </div>
                {/* Phone */}
                <div>
                  <label className="text-[10px] font-semibold uppercase text-gray-400 tracking-wider mb-1 block">
                    Teléfono *
                  </label>
                  <input
                    type="tel"
                    value={address.phone}
                    onChange={(e) => setAddress({ ...address, phone: e.target.value })}
                    placeholder="10 dígitos"
                    className="w-full text-sm border border-gray-200 rounded px-3 py-1.5 focus:outline-none focus:border-blue-400"
                  />
                </div>
                {/* ZIP */}
                <div>
                  <label className="text-[10px] font-semibold uppercase text-gray-400 tracking-wider mb-1 block">
                    Código Postal *
                  </label>
                  <input
                    value={address.zip}
                    onChange={(e) => setAddress({ ...address, zip: e.target.value })}
                    placeholder="00000"
                    maxLength={5}
                    className="w-full text-sm border border-gray-200 rounded px-3 py-1.5 focus:outline-none focus:border-blue-400"
                  />
                </div>
                {/* Street */}
                <div className="sm:col-span-2">
                  <label className="text-[10px] font-semibold uppercase text-gray-400 tracking-wider mb-1 block">
                    Calle y Número *
                  </label>
                  <input
                    value={address.street}
                    onChange={(e) => setAddress({ ...address, street: e.target.value })}
                    placeholder="Av. Ejemplo #123 Int. 4"
                    className="w-full text-sm border border-gray-200 rounded px-3 py-1.5 focus:outline-none focus:border-blue-400"
                  />
                </div>
                {/* Colonia */}
                <div>
                  <label className="text-[10px] font-semibold uppercase text-gray-400 tracking-wider mb-1 block">
                    Colonia
                  </label>
                  <input
                    value={address.colonia}
                    onChange={(e) => setAddress({ ...address, colonia: e.target.value })}
                    placeholder="Nombre de la colonia"
                    className="w-full text-sm border border-gray-200 rounded px-3 py-1.5 focus:outline-none focus:border-blue-400"
                  />
                </div>
                {/* City */}
                <div>
                  <label className="text-[10px] font-semibold uppercase text-gray-400 tracking-wider mb-1 block">
                    Ciudad / Municipio *
                  </label>
                  <input
                    value={address.city}
                    onChange={(e) => setAddress({ ...address, city: e.target.value })}
                    placeholder="Jalapa"
                    className="w-full text-sm border border-gray-200 rounded px-3 py-1.5 focus:outline-none focus:border-blue-400"
                  />
                </div>
                {/* State */}
                <div>
                  <label className="text-[10px] font-semibold uppercase text-gray-400 tracking-wider mb-1 block">
                    Estado *
                  </label>
                  <select
                    value={address.state}
                    onChange={(e) => setAddress({ ...address, state: e.target.value })}
                    className="w-full text-sm border border-gray-200 rounded px-3 py-1.5 focus:outline-none focus:border-blue-400 bg-white text-gray-700"
                  >
                    <option value="">Seleccionar...</option>
                    {MX_STATES.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
                {/* References */}
                <div>
                  <label className="text-[10px] font-semibold uppercase text-gray-400 tracking-wider mb-1 block">
                    Referencias
                  </label>
                  <input
                    value={address.references}
                    onChange={(e) => setAddress({ ...address, references: e.target.value })}
                    placeholder="Entre calles, color de casa..."
                    className="w-full text-sm border border-gray-200 rounded px-3 py-1.5 focus:outline-none focus:border-blue-400"
                  />
                </div>

                {/* Save address checkbox */}
                <div className="sm:col-span-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={saveAddress}
                      onChange={(e) => setSaveAddress(e.target.checked)}
                      className="w-4 h-4 accent-blue-600"
                    />
                    <span className="text-sm text-gray-600">
                      Guardar esta dirección para futuros pedidos
                    </span>
                  </label>
                </div>
              </div>

              <div className="px-5 pb-4 flex justify-between">
                <button onClick={() => setStep(1)} className="text-sm text-gray-500 hover:text-gray-700 flex items-center gap-1">
                  <Icon icon="solar:alt-arrow-left-linear" width={14} /> Volver al carrito
                </button>
                <button
                  onClick={() => setStep(3)}
                  disabled={!address.street || !address.city || !address.state || !address.zip || !address.phone}
                  className="flex items-center gap-2 px-5 py-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-40 text-white text-sm font-medium rounded transition-colors"
                >
                  Continuar al Pago
                  <Icon icon="solar:alt-arrow-right-linear" width={16} />
                </button>
              </div>
            </div>
          )}

          {/* ══ STEP 3: Payment ══ */}
          {step === 3 && (
            <div className="bg-white border border-gray-200 rounded shadow-sm overflow-hidden">
              <div className="flex items-center justify-between px-5 py-3 border-b border-dashed border-gray-200">
                <h3 className="font-semibold text-gray-800 text-sm flex items-center gap-2">
                  <Icon icon="solar:card-2-linear" className="text-blue-500" width={16} />
                  Método de Pago
                </h3>
                <button onClick={() => setStep(2)} className="text-xs text-gray-400 hover:text-blue-600 flex items-center gap-1">
                  <Icon icon="solar:alt-arrow-left-linear" width={12} />
                  Regresar
                </button>
              </div>

              <div className="p-5 grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Wallet */}
                <label className={`cursor-pointer border-2 rounded p-4 flex items-start gap-3 transition-all ${
                  paymentMethod === 'WALLET' ? 'border-blue-500 bg-blue-50/30' : 'border-gray-200 hover:border-gray-300'
                }`}>
                  <input type="radio" name="payment" checked={paymentMethod === 'WALLET'} onChange={() => setPaymentMethod('WALLET')} className="mt-0.5 accent-blue-600" />
                  <div className="flex-1">
                    <p className="font-semibold text-sm text-gray-800">Monedero AlphaVet</p>
                    <p className={`text-xs mt-0.5 font-semibold ${walletBalance < total ? 'text-red-500' : 'text-green-600'}`}>
                      Saldo: ${walletBalance.toLocaleString()} MXN
                      {walletBalance < total && ' — Insuficiente'}
                    </p>
                  </div>
                  <Icon icon="solar:wallet-money-linear" className="text-blue-500 w-5 h-5 shrink-0" />
                </label>

                {/* Card / OpenPay */}
                <label className={`cursor-pointer border-2 rounded p-4 flex items-start gap-3 transition-all ${
                  paymentMethod === 'CARD' ? 'border-blue-500 bg-blue-50/30' : 'border-gray-200 hover:border-gray-300'
                }`}>
                  <input type="radio" name="payment" checked={paymentMethod === 'CARD'} onChange={() => setPaymentMethod('CARD')} className="mt-0.5 accent-blue-600" />
                  <div className="flex-1">
                    <p className="font-semibold text-sm text-gray-800">Tarjeta Crédito / Débito</p>
                    <p className="text-xs text-gray-400 mt-0.5">Procesado por OpenPay</p>
                    <div className="flex gap-1.5 mt-2">
                      {['VISA','MC','AMEX'].map(b => (
                        <span key={b} className="text-[9px] font-bold border border-gray-200 px-1.5 py-0.5 rounded text-gray-500">{b}</span>
                      ))}
                    </div>
                  </div>
                  <Icon icon="solar:card-search-linear" className="text-gray-400 w-5 h-5 shrink-0" />
                </label>

                {/* OXXO / Efectivo */}
                <label className={`cursor-pointer border-2 rounded p-4 flex items-start gap-3 transition-all ${
                  paymentMethod === 'CASH' ? 'border-blue-500 bg-blue-50/30' : 'border-gray-200 hover:border-gray-300'
                }`}>
                  <input type="radio" name="payment" checked={paymentMethod === 'CASH'} onChange={() => setPaymentMethod('CASH')} className="mt-0.5 accent-blue-600" />
                  <div className="flex-1">
                    <p className="font-semibold text-sm text-gray-800">Pago en Efectivo</p>
                    <p className="text-xs text-gray-400 mt-0.5">En sucursal o OXXO Pay</p>
                  </div>
                  <Icon icon="solar:banknote-linear" className="text-gray-400 w-5 h-5 shrink-0" />
                </label>
              </div>

              {/* Delivery summary */}
              <div className="mx-5 mb-5 p-3 bg-gray-50 border border-dashed border-gray-200 rounded text-sm">
                <p className="text-[10px] font-semibold uppercase text-gray-400 mb-1.5">Entregar en:</p>
                <p className="text-gray-700 font-medium">{address.name || 'Sin nombre'}</p>
                <p className="text-gray-500 text-xs">{address.street}, {address.colonia}</p>
                <p className="text-gray-500 text-xs">{address.city}, {address.state} CP {address.zip}</p>
                <p className="text-gray-500 text-xs">{address.phone}</p>
                <button onClick={() => setStep(2)} className="text-xs text-blue-600 hover:underline mt-1">Modificar</button>
              </div>
            </div>
          )}
        </div>

        {/* ── Right: Order summary (sticky) ────── */}
        <div className="xl:w-[320px] shrink-0 xl:sticky xl:top-[68px]">
          <div className="bg-white border border-gray-200 rounded shadow-sm overflow-hidden">
            <div className="px-4 py-3 border-b border-dashed border-gray-200">
              <h4 className="font-semibold text-gray-800 text-sm">Resumen del Pedido</h4>
            </div>

            {/* Mini list */}
            <div className="divide-y divide-gray-50 max-h-52 overflow-y-auto">
              {items.map((it) => (
                <div key={it.id} className="flex items-center gap-3 px-4 py-2.5">
                  <div className="w-9 h-9 border border-gray-200 rounded p-1 shrink-0 bg-white">
                    <img src={it.image || DEFAULT_IMAGE} alt={it.name} className="w-full h-full object-contain mix-blend-multiply" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-gray-800 truncate">{it.name}</p>
                    <p className="text-[10px] text-gray-400">×{it.quantity}</p>
                  </div>
                  <span className="text-xs font-semibold text-gray-800 shrink-0">
                    ${(it.price * it.quantity).toLocaleString()}
                  </span>
                </div>
              ))}
            </div>

            {/* Totals */}
            <div className="p-4 border-t border-dashed border-gray-200 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Subtotal</span>
                <span className="font-medium text-gray-800">${subtotal.toLocaleString(undefined, { maximumFractionDigits: 2 })}</span>
              </div>
              {couponApplied && (
                <div className="flex justify-between text-sm">
                  <span className="text-green-600 flex items-center gap-1">
                    <Icon icon="solar:tag-linear" width={13} /> Descuento (10%)
                  </span>
                  <span className="font-medium text-green-600">-${discount.toLocaleString(undefined, { maximumFractionDigits: 2 })}</span>
                </div>
              )}
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">IVA (16%)</span>
                <span className="font-medium text-gray-800">${tax.toLocaleString(undefined, { maximumFractionDigits: 2 })}</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-gray-200">
                <span className="font-semibold text-gray-900">Total</span>
                <span className="font-bold text-blue-600 text-lg">${total.toLocaleString(undefined, { maximumFractionDigits: 2 })}</span>
              </div>
            </div>

            {/* CTA */}
            <div className="px-4 pb-4">
              {step < 3 ? (
                <button
                  onClick={() => setStep((step + 1) as 1 | 2 | 3)}
                  className="w-full h-10 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded flex items-center justify-center gap-2 transition-colors"
                >
                  {step === 1 ? 'Continuar a Entrega' : 'Continuar al Pago'}
                  <Icon icon="solar:alt-arrow-right-linear" width={16} />
                </button>
              ) : (
                <button
                  onClick={handleConfirmOrder}
                  disabled={isProcessing}
                  className="w-full h-10 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white text-sm font-medium rounded flex items-center justify-center gap-2 transition-colors"
                >
                  {isProcessing
                    ? <Icon icon="svg-spinners:ring-resize" className="w-4 h-4" />
                    : <><Icon icon="solar:shield-check-linear" width={16} /> Confirmar y Pagar</>
                  }
                </button>
              )}

              <div className="flex items-center justify-center gap-2 mt-3 pt-3 border-t border-gray-100">
                <Icon icon="solar:lock-password-linear" className="text-gray-300 w-3.5 h-3.5" />
                <span className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider">Pago 100% Seguro</span>
                <Icon icon="solar:shield-check-linear" className="text-gray-300 w-3.5 h-3.5" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </ShopLayout>
  )
}
