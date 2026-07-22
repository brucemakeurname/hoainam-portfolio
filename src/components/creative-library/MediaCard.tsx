'use client'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Play } from 'lucide-react'
import type { CreativeItem } from '@/lib/creativeLibrary'

export function MediaCard({ item, onClick }: { item: CreativeItem; onClick: () => void }) {
  return (
    <motion.button
      onClick={onClick}
      className="relative w-full overflow-hidden group text-left"
      style={{ aspectRatio: '4 / 5', border: '1px solid var(--card-border)', background: 'var(--card-bg)' }}
      whileHover={{ scale: 0.98 }}
      transition={{ duration: 0.2 }}
    >
      {item.type === 'image' ? (
        <Image
          src={item.src}
          alt={item.caption}
          fill
          className="object-cover"
          unoptimized
        />
      ) : (
        <>
          <video
            src={item.src}
            className="w-full h-full object-cover"
            muted
            playsInline
            preload="metadata"
          />
          <div
            className="absolute inset-0 flex items-center justify-center transition-opacity group-hover:opacity-100 opacity-70"
            style={{ background: 'rgba(0,0,0,0.15)' }}
          >
            <Play size={28} color="#fff" fill="#fff" />
          </div>
        </>
      )}
      <div
        className="absolute bottom-0 left-0 right-0 px-2.5 py-1.5 text-[9px] font-mono uppercase tracking-[1px] opacity-0 group-hover:opacity-100 transition-opacity"
        style={{ background: 'rgba(0,0,0,0.65)', color: '#fff' }}
      >
        {item.model}
      </div>
    </motion.button>
  )
}
