'use client'
import { motion } from 'framer-motion'
import { useEffect, useRef } from 'react'
import { MediaCard } from './MediaCard'
import type { CreativeItem } from '@/lib/creativeLibrary'

export function CreativeGallery({
  label,
  items,
  onSelect,
}: {
  label: string
  items: CreativeItem[]
  onSelect: (item: CreativeItem) => void
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
    </div>
  )
}
