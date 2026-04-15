import ShopLayout from '@/components/layout/ShopLayout'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import api from '@/lib/axios'
import { Icon } from '@iconify/react'
import { useCartStore } from '@/store/useCartStore'
import { toast } from 'sonner'
import Link from 'next/link'

const DEFAULT_IMAGE =
  'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?q=80&w=800&auto=format&fit=crop'

function StarRating({ rating, size = 14 }: { rating: number; size?: number }) {
  return (
    <span className="inline-flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Icon
          key={i}
          icon={
            i + 1 <= Math.floor(rating)
              ? 'solar:star-bold'
              : i < rating
              ? 'solar:star-half-bold'
              : 'solar:star-outline'
          }
          style={{ width: size, height: size }}
          className={i < rating ? 'text-amber-400' : 'text-gray-300'}
        />
      ))}
    </span>
  )
}

const SAMPLE_REVIEWS = [
  { id: 1, name: 'Sophia Lee', email: 'sophia.lee@digitalshop.com', rating: 5, title: 'Excelente, lo volvería a comprar!', comment: 'El producto es increíble, la calidad supera mis expectativas. Totalmente recomendado!', date: '22 Abr, 2025', time: '04:10 PM', status: 'Publicado' },
  { id: 2, name: 'David Smith', email: 'david.smith@healthstore.com', rating: 4, title: 'Bueno, pero algo caro', comment: 'Funciona bien, aunque siento que el precio es un poco elevado para lo que ofrece.', date: '23 Abr, 2025', time: '02:20 PM', status: 'Pendiente' },
  { id: 3, name: 'Alice Johnson', email: 'alice.johnson@homesupplies.com', rating: 5, title: '¡Calidad increíble!', comment: 'La calidad es impresionante. Totalmente vale la inversión.', date: '24 Abr, 2025', time: '09:15 AM', status: 'Publicado' },
]

const RATINGS_DATA = [
  { stars: 5, progress: 85, count: 128 },
  { stars: 4, progress: 10, count: 37 },
  { stars: 3, progress: 3, count: 15 },
  { stars: 2, progress: 1, count: 7 },
  { stars: 1, progress: 1, count: 2 },
]

export default function ProductDetailPage() {
  const router = useRouter()
  const { id } = router.query
  const [item, setItem] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [activeImage, setActiveImage] = useState(0)
  const [qty, setQty] = useState(1)
  const addItem = useCartStore((s) => s.addItem)

  useEffect(() => {
    if (!id) return
    api.get(`myspace/shop/${id}`)
      .then(({ data }) => setItem(data.data))
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [id])

  const handleAddToCart = () => {
    if (!item) return
    for (let i = 0; i < qty; i++) {
      addItem({ id: item.id, type: item.type, name: item.name, price: item.price, image: item.images?.[0] })
    }
    toast.success(`"${item.name}" agregado al carrito`, {
      icon: <Icon icon="solar:cart-check-bold" className="text-green-500" />,
    })
  }

  if (loading) {
    return (
      <ShopLayout>
        <div className="flex items-center justify-center h-96">
          <Icon icon="svg-spinners:90-ring-with-bg" className="w-8 h-8 text-blue-500" />
        </div>
      </ShopLayout>
    )
  }

  if (!item) {
    return (
      <ShopLayout>
        <div className="flex flex-col items-center justify-center h-96 gap-3">
          <p className="text-gray-600">Producto no encontrado</p>
          <Link href="/shop" className="text-sm text-blue-600 hover:underline">← Volver</Link>
        </div>
      </ShopLayout>
    )
  }

  const images: string[] = item.images?.length ? item.images : [DEFAULT_IMAGE]
  const hasDiscount = item.originalPrice && item.originalPrice > item.price
  const discountPct = hasDiscount
    ? Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100)
    : null
  const rating = item.rating || 4.9
  const reviews = item.reviews || 245

  // Spec fields — UBold grid style
  const specFields = [
    { label: 'Categoría', value: item.category },
    { label: 'Tipo', value: item.type === 'SERVICE' ? 'Servicio' : 'Producto' },
    item.brand && { label: 'Marca', value: item.brand },
    item.suitableFor?.length && { label: 'Apto Para', value: item.suitableFor.join(', ') },
  ].filter(Boolean) as { label: string; value: string }[]

  return (
    <ShopLayout>
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1 text-xs text-gray-500 mb-3">
        <Link href="/shop" className="hover:text-blue-600">Tienda</Link>
        <span className="mx-1 text-gray-400">›</span>
        {item.category && <><span>{item.category}</span><span className="mx-1 text-gray-400">›</span></>}
        <span className="text-gray-700 font-medium">{item.name}</span>
      </nav>

      {/* ── Single white card ── exact UBold layout ─── */}
      <div className="bg-white border border-gray-200 rounded shadow-sm">
        <div className="flex flex-col lg:flex-row">

          {/* ── LEFT col: ProductDisplay (col-4 in UBold) ── */}
          <div className="lg:w-[33%] shrink-0 border-b lg:border-b-0 lg:border-r border-dashed border-gray-200">
            {/* Sticky wrapper inside left col */}
            <div className="lg:sticky lg:top-[68px] p-0">
              {/* Main image — light bg, dashed bottom */}
              <div
                className="relative bg-gray-50 border-b border-dashed border-gray-200"
                style={{ paddingBottom: '80%' }}
              >
                <div className="absolute inset-0 flex items-center justify-center p-8">
                  <img
                    src={images[activeImage]}
                    alt={item.name}
                    className="max-w-full max-h-full object-contain mix-blend-multiply"
                  />
                </div>
              </div>

              {/* Thumbnails row */}
              <div className="flex gap-2 p-3 border-b border-dashed border-gray-200">
                {images.map((img: string, i: number) => (
                  <button
                    key={i}
                    onClick={() => setActiveImage(i)}
                    className={`w-16 h-16 border rounded p-1 bg-white shrink-0 transition-all ${
                      activeImage === i
                        ? 'border-blue-500'
                        : 'border-gray-200 opacity-60 hover:opacity-90'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-contain mix-blend-multiply" />
                  </button>
                ))}
              </div>

              {/* Edit / "Delisting" buttons — UBold style */}
              <div className="flex items-center justify-center gap-2 p-4">
                <button
                  onClick={handleAddToCart}
                  className="flex items-center gap-1.5 px-4 py-1.5 border border-gray-300 rounded text-sm text-gray-600 hover:bg-gray-50 transition-colors"
                >
                  <Icon icon="solar:cart-large-2-linear" width={14} />
                  {item.type === 'SERVICE' ? 'Agendar' : 'Al Carrito'}
                </button>
                <button className="flex items-center gap-1.5 px-4 py-1.5 bg-red-500 hover:bg-red-600 rounded text-sm text-white transition-colors">
                  <Icon icon="solar:heart-linear" width={14} />
                  Favorito
                </button>
              </div>
            </div>
          </div>

          {/* ── RIGHT col: ProductDetails + ProductReviews ── */}
          <div className="flex-1 min-w-0 p-6">

            {/* ── ProductDetails ─────────────────────── */}
            <div className="mb-6">
              {/* In Stock badge + star rating row */}
              <div className="flex items-center justify-between flex-wrap gap-2 mb-3">
                <span className={`inline-flex items-center text-xs font-semibold px-2.5 py-1 rounded-full ${
                  item.type === 'SERVICE'
                    ? 'bg-purple-100 text-purple-700'
                    : 'bg-green-100 text-green-700'
                }`}>
                  {item.type === 'SERVICE' ? 'Servicio' : 'En Stock'}
                </span>
                <div className="flex items-center gap-1.5">
                  <StarRating rating={rating} size={16} />
                  <Link href="#reviews" className="text-sm text-gray-600 hover:text-gray-900">
                    ({reviews} Reseñas)
                  </Link>
                </div>
              </div>

              {/* Title — UBold uses h4.fs-xl */}
              <h4 className="text-lg font-semibold text-gray-900 mb-4">{item.name}</h4>

              {/* Spec grid — UBold: row with md={4} xl={3} cols */}
              {specFields.length > 0 && (
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-4 gap-y-3 mb-4">
                  {specFields.map((f) => (
                    <div key={f.label}>
                      <h6 className="text-[10px] uppercase font-semibold text-gray-400 tracking-wider mb-0.5">{f.label}:</h6>
                      <p className="text-sm font-medium text-gray-700 m-0">{f.value}</p>
                    </div>
                  ))}
                </div>
              )}

              {/* Price row — UBold: h3 with strikethrough + danger + small(%) */}
              <div className="flex items-baseline gap-2.5 mb-4">
                {hasDiscount && (
                  <span className="text-lg text-gray-400 line-through font-normal">
                    ${item.originalPrice.toLocaleString()}
                  </span>
                )}
                <span className="text-2xl font-bold text-red-500">
                  ${item.price.toLocaleString()}
                </span>
                {discountPct && (
                  <small className="text-gray-500 text-sm">({discountPct}%)</small>
                )}
              </div>

              {/* Qty (products only) */}
              {item.type !== 'SERVICE' && (
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-sm text-gray-600">Cantidad:</span>
                  <div className="flex items-center border border-gray-200 rounded overflow-hidden">
                    <button onClick={() => setQty(Math.max(1, qty - 1))} className="px-3 py-1 text-gray-600 hover:bg-gray-50 border-r border-gray-200 text-sm">-</button>
                    <span className="px-4 py-1 text-sm text-gray-900 min-w-[36px] text-center">{qty}</span>
                    <button onClick={() => setQty(qty + 1)} className="px-3 py-1 text-gray-600 hover:bg-gray-50 border-l border-gray-200 text-sm">+</button>
                  </div>
                </div>
              )}

              {/* PRODUCT INFO: — UBold: h5.text-uppercase.text-muted.fs-xs then <p> */}
              {item.description && (
                <>
                  <h5 className="text-[10px] uppercase font-semibold text-gray-400 tracking-wider mb-1.5 mt-2">
                    Product Info:
                  </h5>
                  <p className="text-sm text-gray-700 leading-relaxed mb-2">{item.description}</p>
                </>
              )}

              {/* Details: bullet list */}
              {item.characteristics?.length > 0 && (
                <>
                  <h6 className="text-sm font-semibold text-gray-800 mt-3 mb-1.5">Details:</h6>
                  <ul className="flex flex-col gap-1 pl-5 list-disc mb-3">
                    {item.characteristics.map((c: string, i: number) => (
                      <li key={i} className="text-sm text-gray-700">{c}</li>
                    ))}
                  </ul>
                </>
              )}

              {/* Read More link */}
              <button className="text-sm text-blue-600 font-semibold hover:underline p-0 mt-1">
                Read More...
              </button>

              {/* Warnings */}
              {item.warnings && (
                <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded text-sm text-amber-800">
                  <strong>⚠ Advertencia:</strong> {item.warnings}
                </div>
              )}
            </div>

            <hr className="border-dashed border-gray-200 my-6" />

            {/* ── ProductReviews ─────────────────────── */}
            <div id="reviews" className="border border-dashed border-gray-200 rounded">
              <div className="px-4 py-3 border-b border-gray-200">
                <h5 className="font-semibold text-gray-800 text-sm m-0">Manage Reviews</h5>
              </div>

              {/* Rating overview: image-like section (UBold col-7 + col-5) */}
              <div className="flex flex-col sm:flex-row gap-0">
                <div className="flex-1 flex items-center gap-4 p-4 border-b sm:border-b-0 sm:border-r border-dashed border-gray-200">
                  {/* Ratings image placeholder */}
                  <div className="shrink-0 w-20 h-16 flex items-end justify-center">
                    <div className="flex items-end gap-0.5">
                      {[40, 65, 50, 85, 100].map((h, i) => (
                        <div key={i} className="w-2.5 rounded-sm bg-yellow-400" style={{ height: `${h * 0.6}px` }} />
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-blue-600 flex items-center gap-1.5 mb-1">
                      4.92 <Icon icon="solar:star-bold" className="text-amber-400 w-5 h-5" />
                    </h3>
                    <p className="text-sm text-gray-700 mb-1">Basado en {reviews} reseñas verificadas</p>
                    <p className="text-xs text-gray-500 mb-2 leading-normal">Opiniones reales de clientes que compraron este producto</p>
                    <span className="inline-flex text-[10px] font-semibold bg-green-500 text-white px-2 py-0.5 rounded">
                      +12 esta semana
                    </span>
                  </div>
                </div>

                <div className="sm:w-64 p-4">
                  {RATINGS_DATA.map((r) => (
                    <div key={r.stars} className="flex items-center gap-2 mb-2">
                      <span className="text-xs text-gray-500 w-12 shrink-0">{r.stars} Star</span>
                      <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full bg-blue-500 rounded-full" style={{ width: `${r.progress}%` }} />
                      </div>
                      <span className="text-xs bg-gray-100 text-gray-600 font-medium px-1.5 py-0.5 rounded shrink-0 w-8 text-center">
                        {r.count}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Reviews table */}
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50 text-[10px] uppercase text-gray-400 tracking-wider font-semibold border-t border-gray-200">
                    <tr>
                      <th className="text-left px-4 py-2.5">Reviewer</th>
                      <th className="text-left px-4 py-2.5">Review</th>
                      <th className="px-4 py-2.5 text-center">Date</th>
                      <th className="px-4 py-2.5 text-center">Status</th>
                      <th className="px-4 py-2.5 text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {SAMPLE_REVIEWS.map((r) => (
                      <tr key={r.id} className="hover:bg-gray-50">
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2.5">
                            <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-bold shrink-0">
                              {r.name.charAt(0)}
                            </div>
                            <div>
                              <p className="text-xs font-semibold text-gray-800 whitespace-nowrap">{r.name}</p>
                              <p className="text-[10px] text-gray-400">{r.email}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3 max-w-xs">
                          <StarRating rating={r.rating} size={13} />
                          <p className="text-xs font-semibold text-gray-800 mt-0.5">{r.title}</p>
                          <p className="text-[11px] text-gray-500 italic">"{r.comment}"</p>
                        </td>
                        <td className="px-4 py-3 text-center">
                          <p className="text-xs text-gray-700">{r.date}</p>
                          <small className="text-gray-400 text-[10px]">{r.time}</small>
                        </td>
                        <td className="px-4 py-3 text-center">
                          <span className={`inline-flex text-[10px] font-semibold px-2 py-0.5 rounded ${
                            r.status === 'Publicado'
                              ? 'bg-green-100 text-green-700'
                              : 'bg-amber-100 text-amber-700'
                          }`}>
                            {r.status}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-center">
                          <div className="flex items-center justify-center gap-1">
                            <button className="w-7 h-7 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-500 transition-colors">
                              <Icon icon="solar:eye-linear" width={13} />
                            </button>
                            <button className="w-7 h-7 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-500 transition-colors">
                              <Icon icon="solar:pen-linear" width={13} />
                            </button>
                            <button className="w-7 h-7 rounded-full bg-gray-100 hover:bg-red-100 flex items-center justify-center text-gray-500 hover:text-red-500 transition-colors">
                              <Icon icon="solar:trash-bin-minimalistic-linear" width={13} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            {/* end ProductReviews */}

          </div>
          {/* end RIGHT col */}
        </div>
      </div>
    </ShopLayout>
  )
}
