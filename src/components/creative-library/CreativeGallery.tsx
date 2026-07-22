'use client'
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
  return (
    <div className="mb-12">
      <p
        className="text-[9px] font-mono uppercase tracking-[3px] mb-4"
        style={{ color: 'var(--text-muted)' }}
      >
        {label}
      </p>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
        {items.map((item) => (
          <MediaCard key={item.id} item={item} onClick={() => onSelect(item)} />
        ))}
      </div>
    </div>
  )
}
