import { useState } from 'react'
import { Icon } from '@iconify/react'

type Props = {
  search: string
  setSearch: (v: string) => void
  selectedCategory: string
  setSelectedCategory: (v: string) => void
  priceRange: [number, number]
  setPriceRange: (v: [number, number]) => void
  categories: string[]
}

const STARS = [5, 4, 3, 2, 1]

/**
 * Matches UBold ProductFilter.jsx exactly:
 * - col-xl-3 width (25% of grid area)
 * - White Card, no horizontal scroll
 * - Sections: Search | Category | Brands | Price | Ratings
 * - Each section separated by border-bottom border-dashed
 */
export default function ShopFilters({
  search,
  setSearch,
  selectedCategory,
  setSelectedCategory,
  priceRange,
  setPriceRange,
  categories,
}: Props) {
  const [selectedRatings, setSelectedRatings] = useState<number[]>([])

  const toggleRating = (star: number) => {
    setSelectedRatings((prev) =>
      prev.includes(star) ? prev.filter((s) => s !== star) : [...prev, star]
    )
  }

  return (
    // col-xl-3 equivalent — UBold sidebar is about 270px at xl
    <aside className="w-[270px] shrink-0 bg-white border border-gray-200 rounded shadow-sm self-start">

      {/* Search — UBold: app-search div with input + icon  */}
      <div className="p-3 border-b border-dashed border-gray-200">
        <div className="relative">
          <Icon
            icon="solar:magnifer-linear"
            className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400"
            style={{ width: 12, height: 12 }}
          />
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search product name..."
            className="w-full pl-7 pr-2 py-1.5 text-sm bg-white border border-gray-200 rounded focus:outline-none focus:border-blue-400 placeholder:text-gray-400"
          />
        </div>
      </div>

      {/* Category — UBold: h5 + View All link + nav with checkboxes + badge count */}
      <div className="p-3 border-b border-dashed border-gray-200">
        <div className="flex items-center justify-between mb-2">
          <h5 className="text-sm font-semibold text-gray-800 m-0">Category:</h5>
          <button
            onClick={() => setSelectedCategory('')}
            className="text-xs text-blue-600 font-semibold hover:underline"
          >
            View All
          </button>
        </div>
        <nav className="flex flex-col gap-0">
          {categories.map((cat) => (
            <label
              key={cat}
              className="flex items-center justify-between py-1 cursor-pointer text-gray-600 hover:text-gray-900"
            >
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={selectedCategory === cat}
                  onChange={() => setSelectedCategory(selectedCategory === cat ? '' : cat)}
                  className="w-3.5 h-3.5 accent-blue-600"
                />
                <span className="text-sm">{cat}</span>
              </div>
            </label>
          ))}
          {categories.length === 0 && (
            <p className="text-xs text-gray-400 py-1">Cargando categorías...</p>
          )}
        </nav>
      </div>

      {/* Price — UBold: range slider + two input boxes */}
      <div className="p-3 border-b border-dashed border-gray-200">
        <h5 className="text-sm font-semibold text-gray-800 mb-1">Price:</h5>
        <input
          type="range"
          min={0}
          max={10000}
          step={100}
          value={priceRange[1]}
          onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
          className="w-full accent-blue-600 mb-2"
          style={{ height: 4 }}
        />
        <div className="flex items-center gap-1.5">
          <div className="flex-1 text-center text-xs border border-gray-200 rounded py-1 bg-white text-gray-700">
            ${priceRange[0].toLocaleString()}
          </div>
          <span className="text-xs text-gray-400 font-semibold">to</span>
          <div className="flex-1 text-center text-xs border border-gray-200 rounded py-1 bg-white text-gray-700">
            ${priceRange[1].toLocaleString()}
          </div>
        </div>
      </div>

      {/* Ratings — UBold: checkbox + Rating component + "X Stars & Up" + badge count */}
      <div className="p-3">
        <h5 className="text-sm font-semibold text-gray-800 mb-2">Ratings:</h5>
        <div className="flex flex-col">
          {STARS.map((star) => {
            const counts: Record<number, number> = { 5: 120, 4: 210, 3: 325, 2: 145, 1: 58 }
            return (
              <label key={star} className="flex items-center justify-between py-1 cursor-pointer">
                <div className="flex items-center gap-1.5">
                  <input
                    type="checkbox"
                    checked={selectedRatings.includes(star)}
                    onChange={() => toggleRating(star)}
                    className="w-3.5 h-3.5 accent-blue-600"
                  />
                  <span className="inline-flex items-center gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Icon
                        key={i}
                        icon={i < star ? 'solar:star-bold' : 'solar:star-outline'}
                        style={{ width: 12, height: 12 }}
                        className={i < star ? 'text-amber-400' : 'text-gray-300'}
                      />
                    ))}
                    <span className="text-xs text-gray-500 ml-0.5">& Up</span>
                  </span>
                </div>
                <span className="text-[10px] bg-gray-100 text-gray-600 font-medium px-1.5 py-0.5 rounded">
                  {counts[star]}
                </span>
              </label>
            )
          })}
        </div>
      </div>
    </aside>
  )
}
