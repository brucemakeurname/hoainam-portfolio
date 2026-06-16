'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Globe, Bot, MessageCircle, ChevronLeft, ChevronRight } from 'lucide-react'
import Image from 'next/image'
import { SOLOFLOWS_PILLARS } from '@/lib/data'
import { useLang } from '@/contexts/LanguageContext'
import { useTranslations } from '@/lib/translations'

const PILLAR_ICONS: Record<string, React.ReactNode> = {
  platform: <Globe size={18} />,
  agents: <Bot size={18} />,
  cs: <MessageCircle size={18} />,
}

type Pillar = typeof SOLOFLOWS_PILLARS[number] & { images?: string[] }

function PillarImageSlider({ pillar }: { pillar: Pillar }) {
  const images = pillar.images ?? []
  const [idx, setIdx] = useState(0)
  if (images.length === 0) return null

  const prev = () => setIdx(i => (i - 1 + images.length) % images.length)
  const next = () => setIdx(i => (i + 1) % images.length)

  return (
    <div className="mb-4 relative" style={{ background: 'rgba(0,0,0,0.25)' }}>
      <AnimatePresence mode="wait">
        <motion.div key={idx}
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}>
          <Image
            src={images[idx]}
            alt={`${pillar.title} screenshot ${idx + 1}`}
            width={800} height={450}
            className="w-full h-auto"
            style={{ maxHeight: '300px', objectFit: 'contain', display: 'block' }}
            unoptimized
          />
        </motion.div>
      </AnimatePresence>

      {images.length > 1 && (
        <div className="flex items-center justify-between px-2 py-1.5 absolute bottom-0 left-0 right-0"
          style={{ background: 'rgba(0,0,0,0.5)' }}>
          <button onClick={prev} className="p-0.5 transition-opacity hover:opacity-100 opacity-60" style={{ color: '#fff' }}>
            <ChevronLeft size={12} />
          </button>
          <span className="text-[9px] font-mono" style={{ color: 'rgba(255,255,255,0.6)' }}>
            {idx + 1} / {images.length}
          </span>
          <button onClick={next} className="p-0.5 transition-opacity hover:opacity-100 opacity-60" style={{ color: '#fff' }}>
            <ChevronRight size={12} />
          </button>
        </div>
      )}
    </div>
  )
}

export function SoloFlowsEcosystem() {
  const { lang } = useLang()
  const tr = useTranslations(lang)

  return (
    <section className="py-16 w-full rounded-sm mb-16 px-8" style={{ border: '1px solid var(--primary)', background: 'var(--card-bg)', opacity: 0.9 }}>
      <div className="flex items-center gap-4 mb-2">
        <span className="text-[10px] tracking-[4px] font-mono uppercase" style={{ color: 'var(--primary)' }}>{tr.portfolio.featured}</span>
        <div className="h-px flex-1" style={{ background: 'var(--surface)' }} />
      </div>
      <h2 className="text-3xl font-black mb-2" style={{ color: 'var(--text)' }}>{tr.portfolio.sfTitle}</h2>
      <p className="text-xs font-mono mb-10" style={{ color: 'var(--text-muted)' }}>{tr.portfolio.sfSubtitle}</p>
      <div className="grid md:grid-cols-3 gap-6">
        {SOLOFLOWS_PILLARS.map((pillar, i) => (
          <motion.div key={pillar.id} className="overflow-hidden"
            style={{ border: '1px solid var(--card-border)', background: 'var(--card-bg)' }}
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.15 }}>
            <PillarImageSlider pillar={pillar as Pillar} />
            <div className="p-6 pt-4">
              <div className="flex items-center gap-2 mb-2">
                <span style={{ color: 'var(--primary)' }}>{PILLAR_ICONS[pillar.id]}</span>
                <h3 className="text-sm font-bold" style={{ color: 'var(--text)' }}>
                  {lang === 'vi' ? pillar.titleVi : pillar.title}
                </h3>
              </div>
              <p className="text-[10px] font-mono mb-4" style={{ color: 'var(--primary)' }}>
                {lang === 'vi' ? (pillar.subtitleVi ?? pillar.subtitle) : pillar.subtitle}
              </p>
              <p className="text-xs leading-relaxed mb-3" style={{ color: 'var(--text-muted)' }}>
                <span className="font-mono text-[9px] uppercase tracking-wider block mb-1" style={{ color: 'var(--text-muted)' }}>{tr.portfolio.whatItDoes}</span>
                {lang === 'vi' ? pillar.whatVi : pillar.what}
              </p>
              <p className="text-xs leading-relaxed mb-3" style={{ color: 'var(--text-muted)' }}>
                <span className="font-mono text-[9px] uppercase tracking-wider block mb-1" style={{ color: 'var(--accent)' }}>{tr.portfolio.howBuilt}</span>
                {lang === 'vi' ? pillar.howVi : pillar.how}
              </p>
              <div className="pt-3 mt-3" style={{ borderTop: '1px solid var(--card-border)' }}>
                <div className="flex flex-col gap-1 mb-3">
                  {(lang === 'vi' ? pillar.metricsVi : pillar.metrics).map((m) => (
                    <span key={m} className="text-[10px] flex items-center gap-2" style={{ color: 'var(--text-muted)' }}>
                      <span style={{ color: 'var(--primary)' }}>›</span> {m}
                    </span>
                  ))}
                </div>
                <p className="text-[9px] font-mono" style={{ color: 'var(--text-muted)', opacity: 0.6 }}>{pillar.tech}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
