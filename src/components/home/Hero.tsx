'use client'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import Image from 'next/image'
import { Download, Mail, Phone, Music } from 'lucide-react'

function FacebookIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
    </svg>
  )
}

function InstagramIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
      <circle cx="12" cy="12" r="4"/>
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
    </svg>
  )
}

function LinkedinIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
      <rect x="2" y="9" width="4" height="12"/>
      <circle cx="4" cy="4" r="2"/>
    </svg>
  )
}
import { GlowPanel } from '@/components/ui/GlowPanel'
import { SOCIALS } from '@/lib/data'
import { useLang } from '@/contexts/LanguageContext'
import { useTranslations } from '@/lib/translations'

const AGENT_NODES = [
  { top: '20%', left: '14%', accent: false },
  { top: '35%', left: '22%', accent: true },
  { top: '62%', left: '17%', accent: false },
  { top: '75%', left: '30%', accent: false },
  { top: '22%', right: '18%', accent: false },
  { top: '48%', right: '14%', accent: true },
  { top: '65%', right: '22%', accent: false },
  { top: '80%', right: '35%', accent: false },
  { top: '15%', left: '48%', accent: true },
  { top: '85%', left: '55%', accent: false },
]

// TikTok SVG icon (Lucide doesn't have it)
function TikTokIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.79a8.18 8.18 0 004.78 1.52V6.84a4.85 4.85 0 01-1.01-.15z"/>
    </svg>
  )
}

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start start', 'end start'] })
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.4])
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0])
  const { lang } = useLang()
  const tr = useTranslations(lang)

  return (
    <div ref={containerRef} className="relative min-h-screen flex items-center justify-center overflow-hidden grid-bg" style={{ background: 'var(--bg)' }}>
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(31,127,254,0.1) 0%, transparent 70%)' }} />
      <GlowPanel side="left" />
      <GlowPanel side="right" />

      {AGENT_NODES.map((node, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full pointer-events-none"
          style={{
            width: 6, height: 6,
            top: node.top,
            left: 'left' in node ? (node as { left: string; top: string; accent: boolean }).left : undefined,
            right: 'right' in node ? (node as { right: string; top: string; accent: boolean }).right : undefined,
            background: node.accent ? 'var(--accent)' : 'var(--primary)',
            boxShadow: node.accent ? '0 0 12px var(--accent)' : '0 0 12px var(--primary)',
          }}
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 2 + i * 0.3, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}

      <motion.div className="relative z-10 text-center px-6 pt-20 pb-10" style={{ scale, opacity }}>
        {/* Avatar */}
        <motion.div
          className="mx-auto mb-6 rounded-full overflow-hidden"
          style={{ width: 96, height: 96, border: '2px solid var(--primary)', boxShadow: '0 0 24px rgba(31,127,254,0.3)' }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1, duration: 0.6 }}
        >
          <Image src="/images/avatar.jpg" alt="Nguyễn Hoài Nam" width={96} height={96} className="w-full h-full object-cover" />
        </motion.div>

        <motion.p
          className="text-xs tracking-[6px] font-mono mb-4 uppercase"
          style={{ color: 'var(--primary)' }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {tr.hero.role}
        </motion.p>

        <motion.h1
          className="font-black uppercase leading-none chroma select-none"
          style={{ fontSize: 'clamp(60px, 10vw, 120px)', letterSpacing: '-3px', color: 'var(--text)' }}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          <span className="block">NGUYỄN</span>
          <span className="block" style={{ color: 'var(--primary)' }}>
            HOÀI <span style={{ color: 'var(--accent)' }}>NAM</span>
          </span>
        </motion.h1>

        {/* Title — bold, spaced, larger */}
        <motion.p
          className="font-bold uppercase mt-6 mb-2"
          style={{ fontSize: 'clamp(13px, 2vw, 18px)', color: 'var(--text)', letterSpacing: '0.5em' }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.65 }}
        >
          AI AUTOMATION EXECUTIVE
        </motion.p>

        <motion.p
          className="text-xs tracking-[4px] font-mono uppercase"
          style={{ color: 'var(--text-muted)' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          {tr.hero.tagline}
        </motion.p>

        {/* Contact info — always visible */}
        <motion.div
          className="flex items-center justify-center gap-6 mt-5 flex-wrap"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
        >
          <span className="flex items-center gap-2 text-xs font-mono" style={{ color: 'var(--text-muted)' }}>
            <Mail size={12} style={{ color: 'var(--primary)' }} />
            {tr.hero.email}
          </span>
          <span className="flex items-center gap-2 text-xs font-mono" style={{ color: 'var(--text-muted)' }}>
            <Phone size={12} style={{ color: 'var(--primary)' }} />
            {tr.hero.phone}
          </span>
        </motion.div>

        {/* Social + CV buttons */}
        <motion.div
          className="flex items-center justify-center gap-3 mt-8 flex-wrap"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0 }}
        >
          <a
            href="/cv/CV-Nguyen-Hoai-Nam-2026.pdf"
            download
            className="flex items-center gap-2 px-5 py-2.5 text-xs font-mono tracking-[2px] uppercase transition-all"
            style={{ border: '1px solid var(--accent)', color: 'var(--accent)' }}
          >
            <Download size={12} />
            {tr.hero.downloadCv}
          </a>
          <a href={SOCIALS.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"
            className="p-2.5 transition-all" style={{ border: '1px solid var(--card-border)', color: 'var(--text-muted)' }}>
            <LinkedinIcon size={16} />
          </a>
          <a href={SOCIALS.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook"
            className="p-2.5 transition-all" style={{ border: '1px solid var(--card-border)', color: 'var(--text-muted)' }}>
            <FacebookIcon size={16} />
          </a>
          <a href={SOCIALS.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram"
            className="p-2.5 transition-all" style={{ border: '1px solid var(--card-border)', color: 'var(--text-muted)' }}>
            <InstagramIcon size={16} />
          </a>
          <a href={SOCIALS.tiktok} target="_blank" rel="noopener noreferrer" aria-label="TikTok"
            className="p-2.5 transition-all" style={{ border: '1px solid var(--card-border)', color: 'var(--text-muted)' }}>
            <TikTokIcon size={16} />
          </a>
        </motion.div>
      </motion.div>

      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[10px] tracking-[4px] font-mono uppercase"
        style={{ color: 'var(--text-muted)' }}
        animate={{ opacity: [0.3, 1, 0.3] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        {tr.hero.scrollHint}
      </motion.div>
    </div>
  )
}
