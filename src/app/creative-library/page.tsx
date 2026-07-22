'use client'
import { useState } from 'react'
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
    <div className="pt-24 pb-16" style={{ background: 'var(--bg)' }}>
      <div className="px-14 mb-16">
        <p className="text-[10px] tracking-[4px] font-mono uppercase mb-4" style={{ color: 'var(--primary)' }}>
          {tr.creativeLibrary.sectionLabel}
        </p>
        <h1 className="text-5xl font-black chroma" style={{ color: 'var(--text)' }}>
          {tr.creativeLibrary.title}
        </h1>
        <p className="text-sm mt-4 max-w-xl" style={{ color: 'var(--text-muted)' }}>
          {tr.creativeLibrary.subtitle}
        </p>
      </div>

      <div className="px-14">
        <h2 className="text-xl font-black mb-6" style={{ color: 'var(--text)' }}>
          {tr.creativeLibrary.staticCreativeLabel}
        </h2>
        <CreativeGallery label={tr.creativeLibrary.handmadeLabel} items={HANDMADE_CREATIVE} onSelect={setSelected} />
        <CreativeGallery label={tr.creativeLibrary.aiGenerativeLabel} items={AI_GENERATIVE} onSelect={setSelected} />
      </div>

      <div className="px-14 mt-8">
        <h2 className="text-xl font-black mb-6" style={{ color: 'var(--text)' }}>
          {tr.creativeLibrary.videoLabel}
        </h2>
        <CreativeGallery label={tr.creativeLibrary.commercialLabel} items={COMMERCIAL_VIDEOS} onSelect={setSelected} />
        <CreativeGallery label={tr.creativeLibrary.ugcLabel} items={UGC_VIDEOS} onSelect={setSelected} />
      </div>

      <SingleView item={selected} onClose={() => setSelected(null)} />
    </div>
  )
}
