'use client'
import { motion } from 'framer-motion'

interface Pillar {
  icon: string
  title: string
  subtitle: string
  what: string
  how: string
  metrics: string[]
  tech: string
}

export function PillarSection({ pillar, index }: { pillar: Pillar; index: number }) {
  return (
    <motion.section
      className="py-20 border-t border-primary/10"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ delay: 0.1 }}
    >
      <div className="max-w-5xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-start">
        {/* Left: header + what */}
        <div>
          <p className="text-[10px] tracking-[4px] text-primary font-mono uppercase mb-4">
            0{index + 1} · {pillar.subtitle}
          </p>
          <h2 className="text-4xl font-black text-white mb-6 flex items-center gap-4">
            <span>{pillar.icon}</span> {pillar.title}
          </h2>
          <p className="text-xs text-white/30 font-mono uppercase tracking-wider mb-2">What it does</p>
          <p className="text-sm text-white/70 leading-relaxed">{pillar.what}</p>
        </div>

        {/* Right: how + metrics + tech */}
        <div className="space-y-6">
          <div>
            <p className="text-[10px] tracking-[3px] font-mono uppercase mb-2" style={{ color: '#CFFF04' }}>
              Skills that built it
            </p>
            <p className="text-sm text-white/60 leading-relaxed">{pillar.how}</p>
          </div>

          <div className="p-5" style={{ border: '1px solid rgba(31,127,254,0.15)' }}>
            <p className="text-[9px] text-white/30 font-mono uppercase tracking-wider mb-3">Metrics</p>
            <ul className="space-y-1.5">
              {pillar.metrics.map((m) => (
                <li key={m} className="text-xs text-white/60 flex items-center gap-2">
                  <span className="text-primary text-xs">›</span> {m}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-[9px] text-white/20 font-mono uppercase tracking-wider mb-1">Tech Stack</p>
            <p className="text-[10px] text-white/30 font-mono">{pillar.tech}</p>
          </div>
        </div>
      </div>
    </motion.section>
  )
}
