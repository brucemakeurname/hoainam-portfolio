'use client'
import { motion } from 'framer-motion'
import { GlowPanel } from '@/components/ui/GlowPanel'

export function PitchHero() {
  return (
    <div className="relative h-screen flex items-center justify-center overflow-hidden grid-bg">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(207,255,4,0.06) 0%, transparent 70%)' }}
      />
      <GlowPanel side="left" />
      <GlowPanel side="right" />

      <div className="relative z-10 text-center px-6">
        <motion.p
          className="text-[10px] tracking-[6px] text-accent font-mono mb-6 uppercase"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          // Company Overview · 2025–Present
        </motion.p>

        <motion.h1
          className="font-black uppercase leading-none select-none"
          style={{
            fontSize: 'clamp(80px, 14vw, 160px)',
            letterSpacing: '-6px',
            textShadow: '-3px 0 0 rgba(31,127,254,0.35), 3px 0 0 rgba(207,255,4,0.35)',
          }}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          <span className="block" style={{ color: '#CFFF04' }}>SOLO</span>
          <span className="block text-white">FLOWS</span>
        </motion.h1>

        <motion.p
          className="text-sm text-white/50 font-mono mt-8 tracking-[3px]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
        >
          One founder. Three systems. Zero staff.
        </motion.p>
      </div>

      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[10px] tracking-[4px] text-white/30 font-mono uppercase"
        animate={{ opacity: [0.3, 1, 0.3] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        ↓ The pitch
      </motion.div>
    </div>
  )
}
