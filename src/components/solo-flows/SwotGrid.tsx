'use client'
import { motion } from 'framer-motion'
import { SWOT } from '@/lib/data'

const QUADRANTS = [
  { key: 'strengths' as const, label: 'Strengths', color: '#1F7FFE', bg: 'rgba(31,127,254,0.06)' },
  { key: 'weaknesses' as const, label: 'Weaknesses', color: '#CFFF04', bg: 'rgba(207,255,4,0.04)' },
  { key: 'opportunities' as const, label: 'Opportunities', color: '#1F7FFE', bg: 'rgba(31,127,254,0.04)' },
  { key: 'threats' as const, label: 'Threats', color: 'rgba(255,255,255,0.4)', bg: 'rgba(255,255,255,0.02)' },
]

export function SwotGrid() {
  return (
    <section className="py-20 max-w-5xl mx-auto px-6">
      <p className="text-[10px] tracking-[4px] text-primary font-mono uppercase mb-12">
        05 · SWOT Analysis
      </p>
      <div className="grid grid-cols-2 gap-px" style={{ background: 'rgba(31,127,254,0.1)' }}>
        {QUADRANTS.map((q, i) => (
          <motion.div
            key={q.key}
            className="p-8"
            style={{ background: q.bg }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
          >
            <h3 className="text-xs font-mono uppercase tracking-[3px] mb-4" style={{ color: q.color }}>
              {q.label}
            </h3>
            <ul className="space-y-2">
              {SWOT[q.key].map((item) => (
                <li key={item} className="text-xs text-white/60 flex items-start gap-2">
                  <span style={{ color: q.color }} className="mt-0.5 shrink-0">›</span>
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
