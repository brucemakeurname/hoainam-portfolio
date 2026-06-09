'use client'
import { motion } from 'framer-motion'
import { REVENUE_STREAMS } from '@/lib/data'

export function RevenueModel() {
  return (
    <section className="py-20 max-w-5xl mx-auto px-6 border-t border-primary/10">
      <p className="text-[10px] tracking-[4px] text-primary font-mono uppercase mb-12">
        06 · Revenue Model
      </p>
      <div className="flex flex-wrap gap-4 justify-center">
        {REVENUE_STREAMS.map((stream, i) => (
          <motion.div
            key={stream.label}
            className="flex-1 min-w-[160px] p-6 text-center transition-all"
            style={{ border: '1px solid rgba(31,127,254,0.2)' }}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            whileHover={{ borderColor: 'rgba(207,255,4,0.4)' }}
          >
            <div className="text-2xl mb-3">{stream.icon}</div>
            <h3 className="text-xs font-bold text-white mb-1">{stream.label}</h3>
            <p className="text-[10px] text-white/40 font-mono">{stream.detail}</p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
