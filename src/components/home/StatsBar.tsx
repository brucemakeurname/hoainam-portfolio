'use client'
import { motion } from 'framer-motion'
import { AnimatedCounter } from '@/components/ui/AnimatedCounter'
import { STATS } from '@/lib/data'

export function StatsBar() {
  return (
    <section className="py-16 border-y border-primary/10 bg-black/20">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <div className="text-3xl font-black text-white tabular-nums">
                <AnimatedCounter value={stat.value} suffix={stat.suffix} />
              </div>
              <div className="text-[10px] tracking-[3px] text-white/40 font-mono uppercase mt-1">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
