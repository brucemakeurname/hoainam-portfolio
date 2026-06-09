'use client'
import { motion } from 'framer-motion'
import { GlowPanel } from '@/components/ui/GlowPanel'
import { useLang } from '@/contexts/LanguageContext'
import { useTranslations } from '@/lib/translations'

export function PitchHero() {
  const { lang } = useLang()
  const tr = useTranslations(lang)
  return (
    <div className="relative h-screen flex items-center justify-center overflow-hidden grid-bg" style={{ background: 'var(--bg)' }}>
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(207,255,4,0.06) 0%, transparent 70%)' }} />
      <GlowPanel side="left" />
      <GlowPanel side="right" />
      <div className="relative z-10 text-center px-6">
        <motion.p className="text-[10px] tracking-[6px] font-mono mb-6 uppercase" style={{ color: 'var(--accent)' }}
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          {tr.soloFlows.heroTag}
        </motion.p>
        <motion.h1 className="font-black uppercase leading-none select-none"
          style={{ fontSize: 'clamp(80px, 14vw, 160px)', letterSpacing: '-6px', textShadow: '-3px 0 0 rgba(31,127,254,0.35), 3px 0 0 rgba(207,255,4,0.35)' }}
          initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.4, duration: 0.8 }}>
          <span className="block" style={{ color: 'var(--accent)' }}>SOLO</span>
          <span className="block" style={{ color: 'var(--text)' }}>FLOWS</span>
        </motion.h1>
        <motion.p className="text-sm font-mono mt-8 tracking-[3px]" style={{ color: 'var(--text-muted)' }}
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 }}>
          {tr.soloFlows.heroTagline}
        </motion.p>
      </div>
      <motion.div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[10px] tracking-[4px] font-mono uppercase" style={{ color: 'var(--text-muted)' }}
        animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 2, repeat: Infinity }}>
        ↓ {lang === 'vi' ? 'Pitch deck' : 'The pitch'}
      </motion.div>
    </div>
  )
}
