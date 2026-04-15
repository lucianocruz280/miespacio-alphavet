import { useCartStore } from '@/store/useCartStore'
import { Icon } from '@iconify/react'
import { signOut, useSession } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'
import CartDrawer from '../shop/CartDrawer'

export default function ShopLayout({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession()
  const [cartOpen, setCartOpen] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const cartItems = useCartStore((s) => s.items)
  const router = useRouter()

  const navLinks = [
    { label: 'Mi Espacio', href: '/dashboard' },
    { label: 'Mis Mascotas', href: '/pets' },
    { label: 'Tienda', href: '/shop' },
  ]

  const isActive = (href: string) =>
    router.pathname === href || router.pathname.startsWith(href + '/')

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#f3f3f9' }}>
      {/* ── Top Navbar ────────────────────────── */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
        <div className="w-full px-5 h-[60px] flex items-center justify-between gap-4">
          {/* Logo */}
          <Link href="/shop" className="shrink-0 flex items-center gap-2">
            <img src="/images/logo.png" alt="AlphaVet" className="h-7 w-auto" />
            <span className="hidden sm:inline-block text-xs font-semibold text-blue-600 bg-blue-50 border border-blue-100 px-2 py-0.5 rounded">
              Tienda
            </span>
          </Link>

          {/* Nav links */}
          <nav className="hidden md:flex items-center gap-0.5">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3 py-1.5 rounded text-sm font-medium transition-colors ${
                  isActive(link.href)
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCartOpen(true)}
              className="relative flex items-center gap-1.5 px-3 py-1.5 rounded border border-gray-200 bg-white hover:bg-gray-50 text-gray-600 text-sm font-medium transition-colors"
            >
              <Icon icon="solar:cart-large-2-linear" className="w-4 h-4" />
              <span className="hidden sm:inline">Carrito</span>
              {cartItems.length > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-blue-600 text-white text-[9px] font-bold rounded-full border border-white flex items-center justify-center">
                  {cartItems.length}
                </span>
              )}
            </button>

            {status === 'authenticated' && (
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded border border-gray-200 hover:bg-gray-50 transition-colors"
                >
                  <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold">
                    {session.user?.name?.charAt(0)}
                  </div>
                  <span className="hidden sm:inline text-sm font-medium text-gray-700 max-w-[120px] truncate">
                    {session.user?.name}
                  </span>
                  <Icon icon="solar:alt-arrow-down-linear" className="w-3 h-3 text-gray-400" />
                </button>

                {userMenuOpen && (
                  <div className="absolute right-0 top-full mt-1 w-44 bg-white border border-gray-200 rounded shadow-lg overflow-hidden z-50">
                    <Link
                      href="/dashboard"
                      onClick={() => setUserMenuOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50"
                    >
                      <Icon icon="solar:home-2-linear" className="w-4 h-4 text-gray-400" />
                      Mi Espacio
                    </Link>
                    <Link
                      href="/profile"
                      onClick={() => setUserMenuOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50"
                    >
                      <Icon icon="solar:user-circle-linear" className="w-4 h-4 text-gray-400" />
                      Mi Perfil
                    </Link>
                    <hr className="border-gray-100 mx-2" />
                    <button
                      onClick={() => signOut({ callbackUrl: '/auth/signin' })}
                      className="flex items-center gap-2.5 w-full px-4 py-2.5 text-sm text-red-600 hover:bg-red-50"
                    >
                      <Icon icon="solar:logout-2-linear" className="w-4 h-4" />
                      Cerrar sesión
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </header>

      {/* ── Page content: full width, no horizontal padding ── */}
      <main className="w-full p-4">
        {children}
      </main>

      <CartDrawer isOpen={cartOpen} onClose={() => setCartOpen(false)} />
    </div>
  )
}
