'use client'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Play } from 'lucide-react'
import { useLang } from '@/contexts/LanguageContext'
import { useTranslations } from '@/lib/translations'
import type { CreativeItem } from '@/lib/creativeLibrary'

function languageBadge(language: CreativeItem['language'], tr: ReturnType<typeof useTranslations>) {
  if (language === 'vi') return tr.creativeLibrary.languageVi
  if (language === 'en') return tr.creativeLibrary.languageEn
  if (language === 'none') return tr.creativeLibrary.languageNone
  return null
}

export function MediaCard({
  item,
  onClick,
  index = 0,
}: {
  item: CreativeItem
  onClick: () => void
  index?: number
}) {
  const { lang } = useLang()
  const tr = useTranslations(lang)
  const language = languageBadge(item.language, tr)

  return (
    <motion.div
      className="rounded-2xl p-1"
      style={{ background: 'var(--surface)', border: '1px solid var(--card-border)' }}
      initial={{ opacity: 0, y: 16, filter: 'blur(6px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay: Math.min(index, 12) * 0.04, ease: [0.32, 0.72, 0, 1] }}
    >
    <motion.button
      onClick={onClick}
      className="relative w-full overflow-hidden group text-left rounded-xl block"
      style={{
        aspectRatio: item.type === 'video' ? '9 / 16' : '1 / 1',
        border: '1px solid var(--card-border)',
        background: 'var(--card-bg)',
      }}
      whileHover={{ scale: 0.97, borderColor: 'var(--primary)' }}
      transition={{ duration: 0.25, ease: [0.32, 0.72, 0, 1] }}
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

      {/* Duration — top-right corner */}
      {item.duration && (
        <div
          className="absolute top-1.5 right-1.5 px-1.5 py-0.5 rounded text-[8px] font-mono tracking-[0.5px]"
          style={{ background: 'rgba(0,0,0,0.6)', color: '#fff', backdropFilter: 'blur(2px)' }}
        >
          {item.duration}
        </div>
      )}

      <div
        className="absolute inset-x-0 bottom-0 h-16 pointer-events-none"
        style={{ background: 'linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.6) 100%)' }}
      />

      {/* Model + language — bottom, always visible */}
      <div className="absolute bottom-0 left-0 right-0 px-2 py-1.5 flex items-center gap-1 flex-wrap">
        <span
          className="px-1.5 py-0.5 rounded text-[8px] font-mono uppercase tracking-[0.5px]"
          style={{ background: 'rgba(255,255,255,0.12)', color: '#fff', backdropFilter: 'blur(2px)' }}
        >
          {item.model}
        </span>
        {language && (
          <span
            className="px-1.5 py-0.5 rounded text-[8px] font-mono uppercase tracking-[0.5px]"
            style={{ background: 'rgba(255,255,255,0.12)', color: '#fff', backdropFilter: 'blur(2px)' }}
          >
            {language}
          </span>
        )}
      </div>
    </motion.button>
    </motion.div>
  )
}
