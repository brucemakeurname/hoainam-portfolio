'use client'
import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { MediaCard } from './MediaCard'
import type { CreativeItem } from '@/lib/creativeLibrary'

const pageVariants = {
  enter: (dir: number) => ({ opacity: 0, x: dir > 0 ? 40 : -40 }),
  center: { opacity: 1, x: 0 },
  exit: (dir: number) => ({ opacity: 0, x: dir > 0 ? -40 : 40 }),
}

export function CreativeGallery({
  label,
  items,
  onSelect,
  paginate = false,
  perPage = 5,
  autoSlideMs = 10000,
}: {
  label: string
  items: CreativeItem[]
  onSelect: (item: CreativeItem) => void
  paginate?: boolean
  perPage?: number
  autoSlideMs?: number
}) {
  const isVideo = items[0]?.type === 'video'
  const scrollRef = useRef<HTMLDivElement>(null)

  // Auto-slide the row on mobile only (below the md breakpoint, where the
  // grid becomes a single horizontally-scrollable row).
  useEffect(() => {
    const el = scrollRef.current
    if (!el) return
    const mobileQuery = window.matchMedia('(max-width: 767px)')

    const interval = setInterval(() => {
      if (!mobileQuery.matches) return
      const maxScroll = el.scrollWidth - el.clientWidth
      if (maxScroll <= 0) return
      const next = el.scrollLeft + el.clientWidth * 0.82
      el.scrollTo({ left: next >= maxScroll - 4 ? 0 : next, behavior: 'smooth' })
    }, 3200)

    return () => clearInterval(interval)
  }, [])

  const totalPages = Math.ceil(items.length / perPage)
  const [page, setPage] = useState(0)
  const [direction, setDirection] = useState(1)

  // Auto-advance the desktop paginated row.
  useEffect(() => {
    if (!paginate || totalPages <= 1) return
    const id = setInterval(() => {
      setDirection(1)
      setPage((p) => (p + 1) % totalPages)
    }, autoSlideMs)
    return () => clearInterval(id)
  }, [paginate, totalPages, autoSlideMs, page])

  function goTo(next: number) {
    setDirection(next > page ? 1 : -1)
    setPage(((next % totalPages) + totalPages) % totalPages)
  }

  const pageItems = paginate ? items.slice(page * perPage, page * perPage + perPage) : items

  return (
    <div className="mb-10 md:mb-12">
      <motion.div
        className="mb-4 px-4 md:px-0"
        initial={{ opacity: 0, x: -8 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
      >
        <span
          className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1"
          style={{ border: '1px solid var(--card-border)', background: 'var(--surface)' }}
        >
          <span className="rounded-full" style={{ width: 4, height: 4, background: 'var(--primary)' }} />
          <span
            className="text-[9px] font-mono uppercase tracking-[3px]"
            style={{ color: 'var(--text-muted)' }}
          >
            {label}
          </span>
        </span>
      </motion.div>

      {paginate ? (
        <>
          {/* Mobile: unchanged auto-scrolling single row of all items */}
          <div
            ref={scrollRef}
            className="md:hidden flex overflow-x-auto snap-x snap-mandatory gap-2.5 px-4 -mx-4 pb-1 scrollbar-hide"
          >
            {items.map((item, index) => (
              <div key={item.id} className="shrink-0 snap-start w-[40%]">
                <MediaCard item={item} index={index} onClick={() => onSelect(item)} />
              </div>
            ))}
          </div>

          {/* Desktop: single row, paginated 5-at-a-time, with nav + dots below */}
          <div className="hidden md:block">
            <div className="overflow-hidden">
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={page}
                  custom={direction}
                  variants={pageVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
                  className="grid gap-3"
                  style={{ gridTemplateColumns: `repeat(${perPage}, minmax(0, 1fr))` }}
                >
                  {pageItems.map((item, index) => (
                    <MediaCard key={item.id} item={item} index={index} onClick={() => onSelect(item)} />
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>

            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-4 mt-4">
                <button
                  onClick={() => goTo(page - 1)}
                  className="p-1.5 transition-all"
                  style={{ border: '1px solid var(--card-border)', color: 'var(--text-muted)' }}
                  aria-label="Previous"
                >
                  <ChevronLeft size={14} />
                </button>
                <div className="flex items-center gap-2">
                  {Array.from({ length: totalPages }).map((_, i) => (
                    <button
                      key={i}
                      onClick={() => goTo(i)}
                      className="rounded-full transition-all"
                      style={{
                        width: i === page ? 16 : 6,
                        height: 6,
                        background: i === page ? 'var(--primary)' : 'var(--card-border)',
                      }}
                      aria-label={`Go to page ${i + 1}`}
                    />
                  ))}
                </div>
                <button
                  onClick={() => goTo(page + 1)}
                  className="p-1.5 transition-all"
                  style={{ border: '1px solid var(--card-border)', color: 'var(--text-muted)' }}
                  aria-label="Next"
                >
                  <ChevronRight size={14} />
                </button>
              </div>
            )}
          </div>
        </>
      ) : (
        <div
          ref={scrollRef}
          className={
            'flex overflow-x-auto snap-x snap-mandatory gap-2.5 px-4 -mx-4 pb-1 scrollbar-hide ' +
            'md:mx-0 md:px-0 md:pb-0 md:overflow-visible md:snap-none md:grid md:gap-3 ' +
            (isVideo
              ? 'md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6'
              : 'md:grid-cols-3')
          }
        >
          {items.map((item, index) => (
            <div
              key={item.id}
              className={
                'shrink-0 snap-start md:shrink md:w-auto ' + (isVideo ? 'w-[40%]' : 'w-[46%]')
              }
            >
              <MediaCard item={item} index={index} onClick={() => onSelect(item)} />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
