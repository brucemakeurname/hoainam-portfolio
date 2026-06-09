'use client'
import { motion } from 'framer-motion'
import { SOLOFLOWS_PILLARS } from '@/lib/data'

export function SoloFlowsEcosystem() {
  return (
    <section className="py-16 border border-primary/20 bg-black/30 max-w-6xl mx-auto rounded-sm mb-16 px-8">
      <div className="flex items-center gap-4 mb-2">
        <span className="text-[10px] tracking-[4px] text-primary font-mono uppercase">Featured Project</span>
        <div className="h-px flex-1 bg-primary/20" />
      </div>
      <h2 className="text-3xl font-black text-white mb-2">SOLO FLOWS ECOSYSTEM</h2>
      <p className="text-xs text-white/40 font-mono mb-10">One founder. Three systems. Zero staff.</p>

      <div className="grid md:grid-cols-3 gap-6">
        {SOLOFLOWS_PILLARS.map((pillar, i) => (
          <motion.div
            key={pillar.id}
            className="p-6"
            style={{ border: '1px solid rgba(255,255,255,0.08)', background: 'rgba(255,255,255,0.02)' }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.15 }}
          >
            <div className="text-2xl mb-3">{pillar.icon}</div>
            <h3 className="text-sm font-bold text-white mb-0.5">{pillar.title}</h3>
            <p className="text-[10px] text-primary font-mono mb-4">{pillar.subtitle}</p>

            <p className="text-xs text-white/60 leading-relaxed mb-3">
              <span className="text-white/40 font-mono text-[9px] uppercase tracking-wider block mb-1">What it does</span>
              {pillar.what}
            </p>

            <p className="text-xs text-white/60 leading-relaxed mb-3">
              <span className="font-mono text-[9px] uppercase tracking-wider block mb-1" style={{ color: '#CFFF04' }}>How it was built</span>
              {pillar.how}
            </p>

            <div className="pt-3 mt-3" style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}>
              <div className="flex flex-col gap-1 mb-3">
                {pillar.metrics.map((m) => (
                  <span key={m} className="text-[10px] text-white/50 flex items-center gap-2">
                    <span className="text-primary">›</span> {m}
                  </span>
                ))}
              </div>
              <p className="text-[9px] text-white/25 font-mono">{pillar.tech}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
