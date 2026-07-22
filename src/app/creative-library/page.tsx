'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { useLang } from '@/contexts/LanguageContext'
import { useTranslations } from '@/lib/translations'
import { CreativeGallery } from '@/components/creative-library/CreativeGallery'
import { SingleView } from '@/components/creative-library/SingleView'
import {
  HANDMADE_CREATIVE,
  AI_GENERATIVE,
  COMMERCIAL_VIDEOS,
  UGC_VIDEOS,
  type CreativeItem,
} from '@/lib/creativeLibrary'

export default function CreativeLibraryPage() {
  const { lang } = useLang()
  const tr = useTranslations(lang)
  const [selected, setSelected] = useState<CreativeItem | null>(null)

  return (
    <div className="relative pt-20 pb-16 overflow-hidden" style={{ background: 'var(--bg)' }}>
      {/* Ambient glow field — Ethereal Glass background */}
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
        <div
          className="absolute rounded-full"
          style={{
            width: 640,
            height: 640,
            top: -220,
            left: -120,
            background: 'radial-gradient(circle, var(--primary) 0%, transparent 70%)',
            opacity: 0.24,
            filter: 'blur(90px)',
          }}
        />
        <div
          className="absolute rounded-full"
          style={{
            width: 520,
            height: 520,
            top: 260,
            right: -160,
            background: 'radial-gradient(circle, var(--accent) 0%, transparent 70%)',
            opacity: 0.12,
            filter: 'blur(100px)',
          }}
        />
      </div>

      <motion.div
        className="px-14 mb-10"
        initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        transition={{ duration: 0.7, ease: [0.32, 0.72, 0, 1] }}
      >
        <div
          className="rounded-[1.75rem] p-6 md:p-8"
          style={{
            background: 'var(--card-bg)',
            border: '1px solid var(--card-border)',
            backdropFilter: 'blur(20px)',
          }}
        >
          <span
            className="inline-flex items-center gap-2 rounded-full px-3 py-1 mb-4"
            style={{ border: '1px solid var(--card-border)', background: 'var(--surface)' }}
          >
            <span className="rounded-full" style={{ width: 5, height: 5, background: 'var(--accent)' }} />
            <span className="text-[9px] tracking-[3px] font-mono uppercase" style={{ color: 'var(--primary)' }}>
              {tr.creativeLibrary.sectionLabel}
            </span>
          </span>
          <h1 className="text-3xl md:text-4xl font-black chroma" style={{ color: 'var(--text)' }}>
            {tr.creativeLibrary.title}
          </h1>
          <p className="text-sm mt-3 leading-relaxed max-w-4xl" style={{ color: 'var(--text-muted)' }}>
            {tr.creativeLibrary.subtitle}
          </p>
        </div>
      </motion.div>

      <div
        className="px-14 grid grid-cols-1 lg:grid-cols-2 gap-x-10 gap-y-12 items-start"
        style={{ borderTop: '1px solid var(--card-border)', paddingTop: '2.5rem' }}
      >
        <div
          className="lg:pr-6"
          style={{ borderRight: '1px solid transparent', borderImage: 'linear-gradient(180deg, var(--card-border), transparent) 1' }}
        >
          <h2 className="text-xl font-black mb-6" style={{ color: 'var(--text)' }}>
            {tr.creativeLibrary.staticCreativeLabel}
          </h2>
          <CreativeGallery label={tr.creativeLibrary.handmadeLabel} items={HANDMADE_CREATIVE} onSelect={setSelected} />
          <CreativeGallery label={tr.creativeLibrary.aiGenerativeLabel} items={AI_GENERATIVE} onSelect={setSelected} />
        </div>

        <div>
          <h2 className="text-xl font-black mb-6" style={{ color: 'var(--text)' }}>
            {tr.creativeLibrary.videoLabel}
          </h2>
          <CreativeGallery label={tr.creativeLibrary.ugcLabel} items={UGC_VIDEOS} onSelect={setSelected} />
          <CreativeGallery label={tr.creativeLibrary.commercialLabel} items={COMMERCIAL_VIDEOS} onSelect={setSelected} />
        </div>
      </div>

      <SingleView item={selected} onClose={() => setSelected(null)} />
    </div>
  )
}
