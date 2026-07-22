'use client'
import { useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { useLang } from '@/contexts/LanguageContext'
import { useTranslations } from '@/lib/translations'
import { CreativeGallery } from '@/components/creative-library/CreativeGallery'
import { SingleView } from '@/components/creative-library/SingleView'
import { GlowPanel } from '@/components/ui/GlowPanel'
import {
  HANDMADE_CREATIVE,
  AI_GENERATIVE,
  COMMERCIAL_VIDEOS,
  UGC_VIDEOS,
  type CreativeItem,
} from '@/lib/creativeLibrary'

const CENTER_DOTS = [
  { top: '8%', offset: -18, accent: false },
  { top: '16%', offset: 14, accent: true },
  { top: '28%', offset: -10, accent: false },
  { top: '42%', offset: 20, accent: false },
  { top: '55%', offset: -16, accent: true },
  { top: '68%', offset: 10, accent: false },
  { top: '80%', offset: -12, accent: false },
  { top: '92%', offset: 16, accent: true },
]

export default function CreativeLibraryPage() {
  const { lang } = useLang()
  const tr = useTranslations(lang)
  const [selected, setSelected] = useState<CreativeItem | null>(null)

  return (
    <div className="relative pt-20 pb-16 overflow-hidden" style={{ background: 'var(--bg)' }}>
      {/* Grid pattern — hidden on mobile per request (background clutter) */}
      <div className="hidden md:block grid-bg absolute inset-0 pointer-events-none -z-30" aria-hidden="true" />

      {/* Feature banner — generated with Codex CLI image_gen. Hidden on mobile per request (background clutter). */}
      <div className="hidden md:block absolute top-0 left-0 right-0 h-[420px] pointer-events-none -z-20" aria-hidden="true">
        <Image
          src="/images/creative/feature-hero.png"
          alt=""
          fill
          className="object-cover"
          style={{ opacity: 0.55 }}
          unoptimized
          priority
        />
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(180deg, rgba(6,6,14,0.2) 0%, var(--bg) 100%)' }}
        />
      </div>

      {/* Hero-style ambient background — hidden on mobile per request (background clutter) */}
      <div
        className="hidden md:block absolute inset-0 pointer-events-none -z-10"
        style={{ background: 'radial-gradient(ellipse 70% 50% at 50% 0%, rgba(31,127,254,0.14) 0%, transparent 70%)' }}
        aria-hidden="true"
      />
      <div className="hidden md:block">
        <GlowPanel side="left" />
        <GlowPanel side="right" />
      </div>

      <motion.div
        className="px-4 md:px-14 mb-10"
        initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        transition={{ duration: 0.7, ease: [0.32, 0.72, 0, 1] }}
      >
        <div
          className="rounded-[1.75rem] p-5 md:p-8"
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

      <div className="relative">
        {/* Center divider glow + scattered dots — same accent language as the About hero */}
        <div className="hidden lg:block absolute inset-y-0 left-1/2 -translate-x-1/2 w-px pointer-events-none -z-10" aria-hidden="true">
          <div
            className="absolute rounded-full"
            style={{
              width: 360,
              height: 360,
              top: '30%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              background: 'radial-gradient(circle, var(--primary) 0%, transparent 70%)',
              opacity: 0.22,
              filter: 'blur(70px)',
            }}
          />
          {CENTER_DOTS.map((dot, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full"
              style={{
                width: 5,
                height: 5,
                top: dot.top,
                left: `calc(50% + ${dot.offset}px)`,
                background: dot.accent ? 'var(--accent)' : 'var(--primary)',
                boxShadow: dot.accent ? '0 0 10px var(--accent)' : '0 0 10px var(--primary)',
              }}
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 2.4 + i * 0.3, repeat: Infinity, ease: 'easeInOut' }}
            />
          ))}
        </div>

        <div
          className="px-4 md:px-14 grid grid-cols-1 lg:grid-cols-[1fr_1.3fr] gap-x-10 gap-y-10 md:gap-y-12 items-start"
          style={{ borderTop: '1px solid var(--card-border)', paddingTop: '2rem' }}
        >
          <div
            className="lg:pr-6"
            style={{ borderRight: '1px solid transparent', borderImage: 'linear-gradient(180deg, var(--card-border), transparent) 1' }}
          >
            <h2 className="text-xl font-black mb-6" style={{ color: 'var(--text)' }}>
              {tr.creativeLibrary.staticCreativeLabel}
            </h2>
            <CreativeGallery label={tr.creativeLibrary.aiGenerativeLabel} items={AI_GENERATIVE} onSelect={setSelected} />
            <CreativeGallery label={tr.creativeLibrary.handmadeLabel} items={HANDMADE_CREATIVE} onSelect={setSelected} />
          </div>

          <div>
            <h2 className="text-xl font-black mb-6" style={{ color: 'var(--text)' }}>
              {tr.creativeLibrary.videoLabel}
            </h2>
            <CreativeGallery label={tr.creativeLibrary.ugcLabel} items={UGC_VIDEOS} onSelect={setSelected} />
            <CreativeGallery label={tr.creativeLibrary.commercialLabel} items={COMMERCIAL_VIDEOS} onSelect={setSelected} />
          </div>
        </div>
      </div>

      <SingleView item={selected} onClose={() => setSelected(null)} />
    </div>
  )
}
