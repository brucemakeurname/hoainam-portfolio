'use client'
import { motion } from 'framer-motion'
import { TIMELINE } from '@/lib/data'

export function CareerTimeline() {
  return (
    <section className="py-24 max-w-4xl mx-auto px-6">
      <p className="text-[10px] tracking-[4px] text-primary font-mono uppercase mb-16">
        03 · Career Timeline
      </p>
      <div className="relative">
        {/* Vertical line */}
        <div className="absolute left-[72px] top-0 bottom-0 w-px bg-primary/20" />

        {TIMELINE.map((item, i) => (
          <motion.div
            key={item.year}
            className="flex gap-8 mb-12 relative"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
          >
            {/* Year */}
            <div className="w-[72px] shrink-0 text-right">
              <span
                className="text-xs font-mono font-bold"
                style={{ color: item.isCurrent ? '#CFFF04' : '#1F7FFE' }}
              >
                {item.year}
              </span>
            </div>

            {/* Dot */}
            <div
              className="absolute left-[68px] top-1 w-2 h-2 rounded-full border-2"
              style={{
                borderColor: item.isCurrent ? '#CFFF04' : '#1F7FFE',
                background: item.isCurrent ? '#CFFF04' : 'transparent',
                boxShadow: item.isCurrent ? '0 0 12px #CFFF04' : '0 0 8px #1F7FFE',
              }}
            />

            {/* Content */}
            <div className="flex-1 pl-8">
              <h3 className="text-sm font-bold text-white mb-1">{item.title}</h3>
              <p className="text-xs text-white/50 leading-relaxed mb-3">{item.description}</p>
              <div className="flex flex-wrap gap-1.5">
                {item.tech.map((t) => (
                  <span key={t} className="text-[10px] px-2 py-0.5 font-mono text-white/40 border border-white/10">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
