'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { SKILL_DIMENSIONS } from '@/lib/data'

export function SkillDimensions() {
  const [active, setActive] = useState<string | null>(null)

  return (
    <section className="py-24 max-w-6xl mx-auto px-6">
      <p className="text-[10px] tracking-[4px] text-primary font-mono uppercase mb-12">
        02 · Skill Dimensions
      </p>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {SKILL_DIMENSIONS.map((dim, i) => (
          <motion.div
            key={dim.id}
            className="p-6 border cursor-pointer transition-all"
            style={{
              borderColor: active === dim.id ? '#1F7FFE' : 'rgba(255,255,255,0.08)',
              background: active === dim.id ? 'rgba(31,127,254,0.08)' : 'rgba(255,255,255,0.02)',
            }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            onClick={() => setActive(active === dim.id ? null : dim.id)}
          >
            <div className="text-2xl mb-3">{dim.icon}</div>
            <div className="text-sm font-bold text-white mb-2">{dim.label}</div>
            <AnimatePresence>
              {active === dim.id && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="overflow-hidden"
                >
                  <div className="flex flex-wrap gap-1.5 mt-3 pt-3 border-t border-white/10">
                    {dim.tools.map((tool) => (
                      <span
                        key={tool}
                        className="text-[10px] px-2 py-0.5 font-mono"
                        style={{ background: 'rgba(207,255,4,0.08)', color: '#CFFF04', border: '1px solid rgba(207,255,4,0.2)' }}
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            {active !== dim.id && (
              <div className="text-[10px] text-white/30 font-mono mt-1">
                {dim.tools.slice(0, 2).join(' · ')}...
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </section>
  )
}
