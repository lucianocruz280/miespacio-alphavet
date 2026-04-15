import { useRef, useState, useEffect } from 'react'
import { Icon } from '@iconify/react'
import ProductCard from './ProductCard'

type Props = {
  title: string
  products: any[]
}

export default function ProductSlider({ title, products }: Props) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [canLeft, setCanLeft] = useState(false)
  const [canRight, setCanRight] = useState(true)

  const checkScroll = () => {
    if (!scrollRef.current) return
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current
    setCanLeft(scrollLeft > 4)
    setCanRight(scrollLeft < scrollWidth - clientWidth - 4)
  }

  useEffect(() => {
    checkScroll()
    window.addEventListener('resize', checkScroll)
    return () => window.removeEventListener('resize', checkScroll)
  }, [products])

  const scroll = (dir: 'left' | 'right') => {
    scrollRef.current?.scrollBy({ left: dir === 'left' ? -260 : 260, behavior: 'smooth' })
  }

  if (!products.length) return null

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-base font-semibold text-gray-800">{title}</h2>
        <div className="flex items-center gap-1">
          <button
            onClick={() => scroll('left')}
            disabled={!canLeft}
            className="w-7 h-7 rounded border border-gray-200 bg-white flex items-center justify-center text-gray-500 hover:border-blue-400 hover:text-blue-600 disabled:opacity-30 disabled:pointer-events-none transition-all"
          >
            <Icon icon="solar:alt-arrow-left-linear" width={14} />
          </button>
          <button
            onClick={() => scroll('right')}
            disabled={!canRight}
            className="w-7 h-7 rounded border border-gray-200 bg-white flex items-center justify-center text-gray-500 hover:border-blue-400 hover:text-blue-600 disabled:opacity-30 disabled:pointer-events-none transition-all"
          >
            <Icon icon="solar:alt-arrow-right-linear" width={14} />
          </button>
        </div>
      </div>

      <div
        ref={scrollRef}
        onScroll={checkScroll}
        className="flex gap-3 overflow-x-auto pb-1 snap-x"
        style={{ scrollbarWidth: 'none' }}
      >
        {products.map((p) => (
          <div key={p.id} className="snap-start shrink-0 w-[200px]">
            <ProductCard product={p} />
          </div>
        ))}
      </div>
    </div>
  )
}
