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
    <div className="pt-20 pb-16" style={{ background: 'var(--bg)' }}>
      <motion.div
        className="px-14 mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <p className="text-[10px] tracking-[4px] font-mono uppercase mb-2" style={{ color: 'var(--primary)' }}>
          {tr.creativeLibrary.sectionLabel}
        </p>
        <h1 className="text-3xl font-black chroma" style={{ color: 'var(--text)' }}>
          {tr.creativeLibrary.title}
        </h1>
        <p className="text-sm mt-2 max-w-xl" style={{ color: 'var(--text-muted)' }}>
          {tr.creativeLibrary.subtitle}
        </p>
      </motion.div>

      <div className="px-14 grid grid-cols-1 lg:grid-cols-2 gap-x-10 gap-y-12 items-start" style={{ borderTop: '1px solid var(--card-border)', paddingTop: '2.5rem' }}>
        <div className="lg:pr-5" style={{ borderRight: '1px solid var(--card-border)' }}>
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
