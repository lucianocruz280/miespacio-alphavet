import ShopLayout from '@/components/layout/ShopLayout'
import ShopFilters from '@/components/shop/ShopFilters'
import ProductCard from '@/components/shop/ProductCard'
import api from '@/lib/axios'
import { useEffect, useMemo, useRef, useState } from 'react'
import { Icon } from '@iconify/react'

type SortOption = 'default' | 'price_asc' | 'price_desc' | 'name_asc'

export default function ShopPage() {
  const [catalog, setCatalog] = useState<any[]>([])
  const [featured, setFeatured] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  const [search, setSearch] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 10000])
  const [sort, setSort] = useState<SortOption>('default')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')

  const scrollRef = useRef<HTMLDivElement>(null)
  const [canLeft, setCanLeft] = useState(false)
  const [canRight, setCanRight] = useState(true)

  const checkScroll = () => {
    if (!scrollRef.current) return
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current
    setCanLeft(scrollLeft > 4)
    setCanRight(scrollLeft < scrollWidth - clientWidth - 4)
  }

  const scroll = (dir: 'left' | 'right') => {
    scrollRef.current?.scrollBy({ left: dir === 'left' ? -260 : 260, behavior: 'smooth' })
  }

  useEffect(() => {
    api.get('myspace/shop')
      .then(({ data }) => {
        setCatalog(data.data.catalog)
        setFeatured(data.data.featured)
      })
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  useEffect(() => {
    checkScroll()
    window.addEventListener('resize', checkScroll)
    return () => window.removeEventListener('resize', checkScroll)
  }, [featured])

  const categories = useMemo(() => {
    const cats = catalog.map((p) => p.category).filter(Boolean)
    return [...new Set(cats)] as string[]
  }, [catalog])

  const filtered = useMemo(() => {
    let result = [...catalog]
    if (search) result = result.filter((p) => p.name.toLowerCase().includes(search.toLowerCase()))
    if (selectedCategory) result = result.filter((p) => p.category === selectedCategory)
    result = result.filter((p) => p.price >= priceRange[0] && p.price <= priceRange[1])
    if (sort === 'price_asc') result.sort((a, b) => a.price - b.price)
    else if (sort === 'price_desc') result.sort((a, b) => b.price - a.price)
    else if (sort === 'name_asc') result.sort((a, b) => a.name.localeCompare(b.name))
    return result
  }, [catalog, search, selectedCategory, priceRange, sort])

  if (loading) {
    return (
      <ShopLayout>
        <div className="flex items-center justify-center h-96">
          <Icon icon="svg-spinners:90-ring-with-bg" className="w-8 h-8 text-blue-500" />
        </div>
      </ShopLayout>
    )
  }

  return (
    <ShopLayout>
      {/* ── Toolbar ── same as UBold: white card, product count + view toggle ── */}
      <div className="bg-white border border-gray-200 rounded p-3 mb-3 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h3 className="text-base font-semibold text-gray-800 m-0">
            {filtered.length} Productos
          </h3>

          <div className="flex items-center gap-2">
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as SortOption)}
              className="text-sm border border-gray-200 rounded px-2 py-1.5 bg-white text-gray-700 focus:outline-none focus:border-blue-400"
            >
              <option value="default">Relevantes</option>
              <option value="price_asc">Precio: menor a mayor</option>
              <option value="price_desc">Precio: mayor a menor</option>
              <option value="name_asc">Nombre A-Z</option>
            </select>

            {/* Grid / List — UBold style: two icon buttons */}
            <div className="flex items-center border border-gray-200 rounded overflow-hidden">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-1.5 ${viewMode === 'grid' ? 'bg-blue-600 text-white' : 'bg-white text-gray-500 hover:bg-gray-50'}`}
              >
                <Icon icon="solar:widget-4-outline" width={16} />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-1.5 border-l border-gray-200 ${viewMode === 'list' ? 'bg-blue-600 text-white' : 'bg-white text-gray-500 hover:bg-gray-50'}`}
              >
                <Icon icon="solar:list-outline" width={16} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ── Main: Filter sidebar (col-xl-3) + Products area (col-xl-9) ── */}
      <div className="flex gap-3 items-start">
        {/* Sidebar — ProductFilter */}
        <ShopFilters
          search={search}
          setSearch={setSearch}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          priceRange={priceRange}
          setPriceRange={setPriceRange}
          categories={categories}
        />

        {/* Products area */}
        <div className="flex-1 min-w-0">
          {filtered.length === 0 ? (
            <div className="bg-white border border-gray-200 rounded flex flex-col items-center justify-center h-48 gap-3">
              <Icon icon="solar:shop-2-linear" className="w-10 h-10 text-gray-200" />
              <p className="text-sm text-gray-500">Sin resultados</p>
              <button
                onClick={() => { setSearch(''); setSelectedCategory('') }}
                className="text-sm text-blue-600 hover:underline"
              >
                Limpiar filtros
              </button>
            </div>
          ) : (
            <>
              {/* ── "Lo más buscado" as a subtle first section INSIDE the grid area ── */}
              {featured.length > 0 && !search && !selectedCategory && (
                <div className="mb-4">
                  {/* Section label — barely noticeable, just a small separator */}
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest text-gray-400">
                        <Icon icon="solar:fire-bold" className="text-orange-400" width={13} />
                        Lo más buscado
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => scroll('left')}
                        disabled={!canLeft}
                        className="w-6 h-6 rounded border border-gray-200 bg-white flex items-center justify-center text-gray-400 hover:border-blue-400 hover:text-blue-600 disabled:opacity-30 disabled:pointer-events-none transition-all"
                      >
                        <Icon icon="solar:alt-arrow-left-linear" width={12} />
                      </button>
                      <button
                        onClick={() => scroll('right')}
                        disabled={!canRight}
                        className="w-6 h-6 rounded border border-gray-200 bg-white flex items-center justify-center text-gray-400 hover:border-blue-400 hover:text-blue-600 disabled:opacity-30 disabled:pointer-events-none transition-all"
                      >
                        <Icon icon="solar:alt-arrow-right-linear" width={12} />
                      </button>
                    </div>
                  </div>

                  {/* Horizontal scroll row — same card style as the main grid */}
                  <div
                    ref={scrollRef}
                    onScroll={checkScroll}
                    className="flex gap-2 overflow-x-auto pb-2 snap-x"
                    style={{ scrollbarWidth: 'none' }}
                  >
                    {featured.map((p) => (
                      <div key={p.id} className="snap-start shrink-0 w-[195px]">
                        <ProductCard product={p} />
                      </div>
                    ))}
                  </div>

                  {/* Thin separator before main grid */}
                  <div className="mt-3 mb-1 border-b border-dashed border-gray-200" />
                  <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mt-2 mb-2">
                    Todos los productos
                  </p>
                </div>
              )}

              {/* ── Main product grid ── */}
              <div className={
                viewMode === 'grid'
                  ? 'grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-2'
                  : 'flex flex-col gap-2'
              }>
                {filtered.map((item) => (
                  <ProductCard key={item.id} product={item} />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </ShopLayout>
  )
}
