import { useCartStore } from '@/store/useCartStore'
import { Icon } from '@iconify/react'
import { AnimatePresence, motion } from 'framer-motion'
import Link from 'next/link'

type Props = {
  isOpen: boolean
  onClose: () => void
}

const DEFAULT_IMAGE =
  'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?q=80&w=200&auto=format&fit=crop'

export default function CartDrawer({ isOpen, onClose }: Props) {
  const { items, removeItem, updateQuantity, getTotal } = useCartStore()

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/30 backdrop-blur-sm z-[60]"
          />

          {/* Drawer panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 26, stiffness: 220 }}
            className="fixed right-0 top-0 h-full w-full max-w-sm bg-white shadow-2xl z-[70] flex flex-col border-l border-slate-200"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-slate-200">
              <div className="flex items-center gap-2">
                <Icon icon="solar:cart-large-2-linear" className="text-blue-600 w-5 h-5" />
                <h2 className="font-bold text-slate-900 text-base">Mi Carrito</h2>
                {items.length > 0 && (
                  <span className="bg-blue-100 text-blue-700 text-xs font-bold px-2 py-0.5 rounded-full">
                    {items.length}
                  </span>
                )}
              </div>
              <button
                onClick={onClose}
                className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors"
              >
                <Icon icon="solar:close-square-linear" width={20} />
              </button>
            </div>

            {/* Items list */}
            <div className="flex-1 overflow-y-auto">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center gap-3 p-8 text-center">
                  <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center">
                    <Icon icon="solar:cart-large-outline" className="w-8 h-8 text-slate-300" />
                  </div>
                  <p className="font-semibold text-slate-700 text-sm">Tu carrito está vacío</p>
                  <p className="text-xs text-slate-400">Agrega productos de la tienda para comenzar</p>
                  <button
                    onClick={onClose}
                    className="mt-2 text-sm text-blue-600 font-semibold hover:underline"
                  >
                    Explorar Tienda →
                  </button>
                </div>
              ) : (
                <div className="divide-y divide-slate-100">
                  {items.map((item) => (
                    <div key={item.id} className="flex items-start gap-3 px-5 py-4">
                      {/* Image */}
                      <div className="w-14 h-14 bg-slate-50 border border-slate-200 rounded-xl p-1.5 shrink-0 flex items-center justify-center">
                        <img
                          src={item.image || DEFAULT_IMAGE}
                          alt={item.name}
                          className="w-full h-full object-contain mix-blend-multiply"
                        />
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between gap-1 mb-1">
                          <p className="text-sm font-semibold text-slate-900 leading-tight line-clamp-2">
                            {item.name}
                          </p>
                          <button
                            onClick={() => removeItem(item.id)}
                            className="text-slate-300 hover:text-red-500 transition-colors shrink-0 p-0.5"
                          >
                            <Icon icon="solar:trash-bin-minimalistic-linear" width={14} />
                          </button>
                        </div>

                        <p className="text-[10px] text-slate-400 font-semibold uppercase mb-2">
                          {item.type}
                        </p>

                        <div className="flex items-center justify-between">
                          {/* Qty */}
                          <div className="flex items-center border border-slate-200 rounded-lg overflow-hidden">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="px-2 py-1 hover:bg-slate-50 text-slate-600 text-sm font-bold"
                            >
                              −
                            </button>
                            <span className="px-2.5 py-1 text-xs font-bold text-slate-900 border-x border-slate-200 min-w-[28px] text-center">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="px-2 py-1 hover:bg-slate-50 text-slate-600 text-sm font-bold"
                            >
                              +
                            </button>
                          </div>

                          <span className="text-sm font-bold text-slate-900">
                            ${(item.price * item.quantity).toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="border-t border-slate-200 p-5">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm text-slate-500 font-medium">Subtotal</span>
                  <span className="text-xl font-bold text-slate-900">
                    ${getTotal().toLocaleString()}
                  </span>
                </div>

                <Link
                  href="/checkout"
                  onClick={onClose}
                  className="w-full flex items-center justify-center gap-2 h-11 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-xl transition-colors shadow-sm shadow-blue-200 mb-2"
                >
                  Ir al Checkout
                  <Icon icon="solar:alt-arrow-right-bold" className="w-4 h-4" />
                </Link>

                <button
                  onClick={onClose}
                  className="w-full text-sm text-center text-slate-400 hover:text-slate-600 font-medium py-1"
                >
                  Seguir comprando
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
