'use client'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { GlowPanel } from '@/components/ui/GlowPanel'
import { SOCIALS } from '@/lib/data'

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

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start start', 'end start'] })
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.4])
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0])

  return (
    <div ref={containerRef} className="relative h-screen flex items-center justify-center overflow-hidden grid-bg">
      {/* Background radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(31,127,254,0.1) 0%, transparent 70%)',
        }}
      />

      {/* Side panels */}
      <GlowPanel side="left" />
      <GlowPanel side="right" />

      {/* Floating agent nodes — 10 nodes = 10 agents */}
      {AGENT_NODES.map((node, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full pointer-events-none"
          style={{
            width: 6,
            height: 6,
            top: node.top,
            left: 'left' in node ? (node as { left: string; top: string; accent: boolean }).left : undefined,
            right: 'right' in node ? (node as { right: string; top: string; accent: boolean }).right : undefined,
            background: node.accent ? '#CFFF04' : '#1F7FFE',
            boxShadow: node.accent ? '0 0 12px #CFFF04' : '0 0 12px #1F7FFE',
          }}
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 2 + i * 0.3, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}

      {/* Main title */}
      <motion.div className="relative z-10 text-center px-6" style={{ scale, opacity }}>
        <motion.p
          className="text-xs tracking-[6px] text-primary font-mono mb-6 uppercase"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          // AI · Agent · Automation · Executive
        </motion.p>

        <motion.h1
          className="font-black uppercase leading-none chroma select-none"
          style={{ fontSize: 'clamp(72px, 12vw, 140px)', letterSpacing: '-4px' }}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          <span className="block text-white">NGUYỄN</span>
          <span className="block" style={{ color: '#1F7FFE' }}>
            HOÀI <span style={{ color: '#CFFF04' }}>NAM</span>
          </span>
        </motion.h1>

        <motion.p
          className="text-xs tracking-[4px] text-white/40 font-mono mt-6 uppercase"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          Founder · Solo Flows · 10 Agents · 6 Platforms
        </motion.p>

        {/* Hero CTAs */}
        <motion.div
          className="flex items-center justify-center gap-4 mt-10 flex-wrap"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0 }}
        >
          <a
            href="/cv/CV-Nguyen-Hoai-Nam-2026.pdf"
            download
            className="px-6 py-2.5 text-xs font-mono tracking-[2px] uppercase border border-accent text-accent hover:bg-accent hover:text-black transition-all"
          >
            Download CV
          </a>
          <a
            href={SOCIALS.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-2.5 text-xs font-mono tracking-[2px] uppercase border border-white/20 text-white/60 hover:border-primary hover:text-white transition-all"
          >
            LinkedIn
          </a>
          <a
            href={SOCIALS.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-2.5 text-xs font-mono tracking-[2px] uppercase border border-white/20 text-white/60 hover:border-primary hover:text-white transition-all"
          >
            Instagram
          </a>
          <a
            href={`mailto:${SOCIALS.email}`}
            className="px-6 py-2.5 text-xs font-mono tracking-[2px] uppercase border border-white/20 text-white/60 hover:border-primary hover:text-white transition-all"
          >
            Email
          </a>
        </motion.div>
      </motion.div>

      {/* Scroll CTA */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[10px] tracking-[4px] text-white/30 font-mono uppercase"
        animate={{ opacity: [0.3, 1, 0.3] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        ↓ Scroll to explore
      </motion.div>
    </div>
  )
}
