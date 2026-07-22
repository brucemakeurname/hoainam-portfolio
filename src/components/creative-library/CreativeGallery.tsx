'use client'
import { motion } from 'framer-motion'
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

  return (
    <div className="mb-12">
      <motion.div
        className="mb-4"
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
        className={
          isVideo
            ? 'grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-2.5'
            : 'grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-3'
        }
      >
        {items.map((item, index) => (
          <MediaCard key={item.id} item={item} index={index} onClick={() => onSelect(item)} />
        ))}
      </div>
    </div>
  )
}
