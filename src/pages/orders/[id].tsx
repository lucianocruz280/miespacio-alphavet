import ShopLayout from '@/components/layout/ShopLayout'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import api from '@/lib/axios'
import { Icon } from '@iconify/react'
import Link from 'next/link'

const DEFAULT_IMAGE =
  'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?q=80&w=200&auto=format&fit=crop'

const STATUS_MAP: Record<string, { label: string; color: string; dotColor: string }> = {
  PAID: { label: 'Pagado', color: 'bg-green-100 text-green-700', dotColor: 'bg-green-500' },
  OPEN: { label: 'Pendiente de Pago', color: 'bg-amber-100 text-amber-700', dotColor: 'bg-amber-500' },
  CANCELLED: { label: 'Cancelado', color: 'bg-red-100 text-red-700', dotColor: 'bg-red-500' },
}

export default function OrderDetailPage() {
  const router = useRouter()
  const { id } = router.query
  const [order, setOrder] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  const fetchOrder = async () => {
    if (!id) return
    try {
      const { data } = await api.get(`myspace/orders/${id}`)
      setOrder(data.data)
    } catch {
      console.error('Error fetching order')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchOrder() }, [id])

  if (loading) {
    return (
      <ShopLayout>
        <div className="h-96 flex items-center justify-center">
          <Icon icon="svg-spinners:90-ring-with-bg" className="w-10 h-10 text-blue-500" />
        </div>
      </ShopLayout>
    )
  }

  if (!order) {
    return (
      <ShopLayout>
        <div className="h-96 flex flex-col items-center justify-center gap-3">
          <p className="font-semibold text-slate-700">Orden no encontrada</p>
          <Link href="/shop" className="text-sm text-blue-600 underline">← Volver a la tienda</Link>
        </div>
      </ShopLayout>
    )
  }

  const status = STATUS_MAP[order.status] ?? STATUS_MAP['OPEN']
  const orderNum = order.id.slice(-8).toUpperCase()
  const orderDate = new Date(order.createdAt).toLocaleDateString('es-MX', {
    day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit',
  })

  return (
    <ShopLayout>
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-xs text-slate-400 mb-5">
        <Link href="/shop" className="hover:text-blue-600 font-medium">Tienda</Link>
        <Icon icon="solar:alt-arrow-right-linear" className="w-3 h-3" />
        <span className="text-slate-700 font-medium">Orden #{orderNum}</span>
      </nav>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-5">
        {/* ── Left: Order summary (wide) ─────────────── */}
        <div className="xl:col-span-8 space-y-5">

          {/* Order card */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            {/* Header */}
            <div className="flex flex-wrap items-start justify-between gap-4 p-6 border-b border-dashed border-slate-200">
              <div>
                <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <Icon icon="solar:document-text-linear" className="text-blue-500 w-5 h-5" />
                  Orden #{orderNum}
                </h2>
                <p className="text-sm text-slate-400 mt-1 flex items-center gap-1.5">
                  <Icon icon="solar:calendar-linear" className="w-3.5 h-3.5" />
                  {orderDate}
                </p>
                <div className="flex items-center gap-2 mt-2">
                  <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full ${status.color}`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${status.dotColor}`} />
                    {status.label}
                  </span>
                  {order.sourceType === 'SHOP' && (
                    <span className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full bg-blue-100 text-blue-700">
                      <Icon icon="solar:shop-2-linear" className="w-3 h-3" />
                      Tienda Online
                    </span>
                  )}
                </div>
              </div>

              <button className="flex items-center gap-1.5 text-sm border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-600 px-3 py-2 rounded-xl transition-colors font-medium">
                <Icon icon="solar:printer-linear" className="w-4 h-4" />
                Imprimir
              </button>
            </div>

            {/* Items table */}
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-slate-50/80 text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                    <th className="text-left px-6 py-3">Producto</th>
                    <th className="px-4 py-3 text-right">Precio</th>
                    <th className="px-4 py-3 text-center">Cant.</th>
                    <th className="px-6 py-3 text-right">Total</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {order.items.map((it: any) => {
                    const imgSrc =
                      it.product?.ecommerce?.images?.[0] || DEFAULT_IMAGE
                    return (
                      <tr key={it.id} className="hover:bg-slate-50/60 transition-colors">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-center p-1.5 shrink-0">
                              <img
                                src={imgSrc}
                                alt={it.description}
                                className="w-full h-full object-contain mix-blend-multiply"
                              />
                            </div>
                            <div>
                              <p className="font-semibold text-slate-900 leading-tight">{it.description}</p>
                              <p className="text-[10px] text-slate-400 font-semibold uppercase mt-0.5">
                                {it.serviceId ? 'Servicio' : 'Producto'}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-4 text-right text-slate-600 font-medium">
                          ${Number(it.unitPrice).toLocaleString()}
                        </td>
                        <td className="px-4 py-4 text-center text-slate-900 font-semibold">
                          {it.quantity}
                        </td>
                        <td className="px-6 py-4 text-right font-bold text-slate-900">
                          ${Number(it.total).toLocaleString()}
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
                {/* Totals */}
                <tfoot className="border-t border-slate-200 bg-slate-50/40">
                  <tr>
                    <td colSpan={3} className="px-6 py-3 text-right text-sm font-semibold text-slate-500">
                      Subtotal
                    </td>
                    <td className="px-6 py-3 text-right text-sm font-semibold text-slate-900">
                      ${Number(order.subtotal).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                    </td>
                  </tr>
                  <tr>
                    <td colSpan={3} className="px-6 py-3 text-right text-sm font-semibold text-slate-500">
                      IVA (16%)
                    </td>
                    <td className="px-6 py-3 text-right text-sm font-semibold text-slate-900">
                      ${Number(order.tax).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                    </td>
                  </tr>
                  <tr className="border-t border-slate-200">
                    <td colSpan={3} className="px-6 py-4 text-right font-bold text-slate-900 uppercase text-sm">
                      Total a Pagar
                    </td>
                    <td className="px-6 py-4 text-right font-bold text-blue-600 text-lg">
                      ${Number(order.total).toLocaleString()}
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        </div>

        {/* ── Right: Meta info panels ────────────────── */}
        <div className="xl:col-span-4 space-y-5">
          {/* Order info card */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="flex items-center justify-between px-5 py-4 border-b border-dashed border-slate-200">
              <h4 className="font-bold text-slate-900 text-sm">Información de la Orden</h4>
            </div>
            <div className="p-5 space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 bg-slate-100 rounded-xl flex items-center justify-center shrink-0">
                  <Icon icon="solar:shop-2-linear" className="text-slate-500 w-4 h-4" />
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase text-slate-400">Sucursal</p>
                  <p className="text-sm font-semibold text-slate-900 mt-0.5">
                    {order.branch?.name || 'Tienda Online AlphaVet'}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-9 h-9 bg-slate-100 rounded-xl flex items-center justify-center shrink-0">
                  <Icon icon="solar:card-2-linear" className="text-slate-500 w-4 h-4" />
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase text-slate-400">Método de Pago</p>
                  <p className="text-sm font-semibold text-slate-900 mt-0.5">
                    {order.paymentMethod === 'WALLET'
                      ? 'Monedero Electrónico'
                      : order.paymentMethod === 'CARD'
                      ? 'Tarjeta / OpenPay'
                      : 'Por definir'}
                  </p>
                </div>
              </div>

              {order.notes && (
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 bg-slate-100 rounded-xl flex items-center justify-center shrink-0">
                    <Icon icon="solar:notes-linear" className="text-slate-500 w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase text-slate-400">Notas</p>
                    <p className="text-sm text-slate-700 mt-0.5">{order.notes}</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* CTA card */}
          <div className="bg-blue-600 rounded-2xl p-5 text-white">
            <p className="font-bold text-sm mb-1">¿Necesitas ayuda?</p>
            <p className="text-sm text-blue-200 mb-4 leading-relaxed">
              Si tienes alguna pregunta sobre tu pedido, contáctanos y te ayudaremos.
            </p>
            <Link
              href="/support"
              className="inline-flex items-center gap-2 bg-white text-blue-600 text-sm font-bold px-4 py-2 rounded-xl hover:bg-blue-50 transition-colors"
            >
              Contactar Soporte
              <Icon icon="solar:alt-arrow-right-bold" className="w-4 h-4" />
            </Link>
          </div>

          {/* Back link */}
          <Link
            href="/shop"
            className="flex items-center gap-2 text-sm text-slate-500 hover:text-blue-600 transition-colors font-medium"
          >
            <Icon icon="solar:alt-arrow-left-linear" className="w-4 h-4" />
            Seguir comprando
          </Link>
        </div>
      </div>
    </ShopLayout>
  )
}
