'use client'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Play } from 'lucide-react'
import type { CreativeItem } from '@/lib/creativeLibrary'

export function MediaCard({
  item,
  onClick,
  index = 0,
}: {
  item: CreativeItem
  onClick: () => void
  index?: number
}) {
  return (
    <motion.button
      onClick={onClick}
      className="relative w-full overflow-hidden group text-left rounded-xl"
      style={{
        aspectRatio: item.type === 'video' ? '9 / 16' : '1 / 1',
        border: '1px solid var(--card-border)',
        background: 'var(--card-bg)',
      }}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      whileHover={{ scale: 0.97, borderColor: 'var(--primary)' }}
      transition={{ duration: 0.35, delay: Math.min(index, 12) * 0.04, ease: 'easeOut' }}
    >
      {item.type === 'image' ? (
        <Image
          src={item.src}
          alt={item.caption}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          unoptimized
        />
      ) : (
        <>
          <video
            src={item.src}
            poster={item.poster}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            muted
            playsInline
            preload="metadata"
          />
          <div
            className="absolute inset-0 flex items-center justify-center transition-opacity group-hover:opacity-100 opacity-70"
            style={{ background: 'rgba(0,0,0,0.15)' }}
          >
            <div
              className="flex items-center justify-center rounded-full transition-transform group-hover:scale-110"
              style={{ width: 40, height: 40, background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(4px)' }}
            >
              <Play size={16} color="#fff" fill="#fff" />
            </div>
          </div>
        </>
      )}
      <div
        className="absolute inset-x-0 bottom-0 h-14 pointer-events-none"
        style={{ background: 'linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.55) 100%)' }}
      />
      <div
        className="absolute bottom-0 left-0 right-0 px-2.5 py-1.5 text-[9px] font-mono uppercase tracking-[1px] opacity-0 group-hover:opacity-100 transition-opacity"
        style={{ color: '#fff' }}
      >
        {item.model}
      </div>
    </motion.button>
  )
}
