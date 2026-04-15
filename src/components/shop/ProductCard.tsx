import { useCartStore } from '@/store/useCartStore'
import { Icon } from '@iconify/react'
import Link from 'next/link'
import { toast } from 'sonner'

type Props = {
  product: any
}

const DEFAULT_IMAGE =
  'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?q=80&w=600&auto=format&fit=crop'

function StarRating({ rating }: { rating: number }) {
  return (
    <span className="inline-flex items-center gap-0.5 text-amber-400">
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
          style={{ width: 12, height: 12 }}
          className={i < rating ? 'text-amber-400' : 'text-gray-300'}
        />
      ))}
    </span>
  )
}

export default function ProductCard({ product }: Props) {
  const addItem = useCartStore((state) => state.addItem)

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    addItem({
      id: product.id,
      type: product.type,
      name: product.name,
      price: product.price,
      image: product.images?.[0],
    })
    toast.success(`${product.name} agregado al carrito`, {
      icon: <Icon icon="solar:cart-check-bold" className="text-green-500" />,
      position: 'bottom-right',
    })
  }

  const hasDiscount = product.originalPrice && product.originalPrice > product.price
  const discountAmt = hasDiscount
    ? Math.round(product.originalPrice - product.price)
    : null
  const discountPct = hasDiscount
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : null

  const rating = product.rating || 4
  const reviews = product.reviews || 45

  return (
    <Link href={`/shop/${product.id}`} className="group block h-full">
      {/* UBold Card: white, 1px border, no radius or tiny */}
      <div className="bg-white border border-gray-200 rounded h-full flex flex-col hover:shadow-md transition-shadow duration-200">

        {/* CardBody — image + title + rating (pb-0 in UBold) */}
        <div className="p-0 flex-1 flex flex-col">
          {/* Image container — square aspect (UBold uses p-3 around 333×333 img) */}
          <div className="relative">
            {/* Badge — UBold: position-absolute top-0 start-0 m-3 */}
            {discountAmt && (
              <span
                className={`absolute top-3 left-3 z-10 text-white text-[11px] font-semibold px-1.5 py-0.5 rounded ${
                  discountPct && discountPct > 15 ? 'bg-green-500' : 'bg-red-500'
                }`}
              >
                ${discountAmt} OFF
              </span>
            )}
            {product.type === 'SERVICE' && !discountAmt && (
              <span className="absolute top-3 left-3 z-10 bg-purple-600 text-white text-[10px] font-semibold px-1.5 py-0.5 rounded">
                Servicio
              </span>
            )}

            {/* p-3 wrapping square image — UBold exact: <div className="p-3"><Image.../></div> */}
            <div className="p-3">
              <div className="aspect-square w-full overflow-hidden">
                <img
                  src={product.images?.[0] || DEFAULT_IMAGE}
                  alt={product.name}
                  className="w-full h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-200"
                />
              </div>
            </div>
          </div>

          {/* CardTitle — UBold: fs-sm lh-base mb-2 */}
          <div className="px-3 pb-1 flex-1">
            <h5 className="text-sm leading-snug mb-1.5 font-normal text-gray-800 line-clamp-2 group-hover:text-blue-600 transition-colors">
              {product.name}
            </h5>

            {/* Rating + review count */}
            <div className="flex items-center gap-1">
              <StarRating rating={rating} />
              <span className="text-xs text-gray-500 font-medium">({reviews})</span>
            </div>
          </div>
        </div>

        {/* CardFooter — UBold: bg-transparent d-flex justify-content-between */}
        <div className="flex items-center justify-between px-3 py-2 border-t border-gray-100">
          {/* Price — UBold: h5.text-success with strikethrough span inside */}
          <div className="flex items-center gap-1.5">
            {hasDiscount && (
              <span className="text-xs text-gray-400 line-through">
                ${product.originalPrice.toLocaleString()}
              </span>
            )}
            <span className="text-sm font-semibold text-green-600">
              ${product.price.toLocaleString()}
            </span>
          </div>

          {/* Basket button — UBold: btn-icon btn-primary btn-sm */}
          <button
            onClick={handleAddToCart}
            aria-label="Agregar al carrito"
            className="w-8 h-8 bg-blue-600 hover:bg-blue-700 text-white rounded flex items-center justify-center transition-colors shadow-sm"
          >
            <Icon icon="solar:cart-large-2-linear" width={15} />
          </button>
        </div>
      </div>
    </Link>
  )
}
