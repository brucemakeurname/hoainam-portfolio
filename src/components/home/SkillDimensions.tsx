'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Bot, Zap, Wrench, Film, Sparkles, BarChart3 } from 'lucide-react'
import { SKILL_DIMENSIONS } from '@/lib/data'
import { useLang } from '@/contexts/LanguageContext'
import { useTranslations } from '@/lib/translations'
import type { Translations } from '@/lib/translations'

const SKILL_ICONS: Record<string, React.ReactNode> = {
  'ai-agents': <Bot size={22} />,
  'prompt-eng': <Zap size={22} />,
  platform: <Wrench size={22} />,
  content: <Film size={22} />,
  design: <Sparkles size={22} />,
  business: <BarChart3 size={22} />,
}

export function SkillDimensions() {
  const [active, setActive] = useState<string | null>(null)
  const { lang } = useLang()
  const tr = useTranslations(lang)

  return (
    <section className="py-24 max-w-6xl mx-auto px-6">
      <p className="text-[10px] tracking-[4px] font-mono uppercase mb-12" style={{ color: 'var(--primary)' }}>
        {tr.skills.sectionLabel}
      </p>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {SKILL_DIMENSIONS.map((dim, i) => (
          <motion.div
            key={dim.id}
            className="p-6 cursor-pointer transition-all"
            style={{
              border: `1px solid ${active === dim.id ? 'var(--primary)' : 'var(--card-border)'}`,
              background: active === dim.id ? 'var(--surface)' : 'var(--card-bg)',
            }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            onClick={() => setActive(active === dim.id ? null : dim.id)}
          >
            <div className="mb-3" style={{ color: 'var(--primary)' }}>{SKILL_ICONS[dim.id]}</div>
            <div className="text-sm font-bold mb-2" style={{ color: 'var(--text)' }}>
              {tr.skills.categories[dim.id as keyof Translations['skills']['categories']]}
            </div>
            <AnimatePresence>
              {active === dim.id && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="overflow-hidden"
                >
                  <div className="flex flex-wrap gap-1.5 mt-3 pt-3" style={{ borderTop: '1px solid var(--card-border)' }}>
                    {dim.tools.map((tool) => (
                      <span key={tool} className="text-[10px] px-2 py-0.5 font-mono" style={{ background: 'rgba(207,255,4,0.08)', color: 'var(--accent)', border: '1px solid rgba(207,255,4,0.2)' }}>
                        {tool}
                      </span>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            {active !== dim.id && (
              <div className="text-[10px] font-mono mt-1" style={{ color: 'var(--text-muted)' }}>
                {dim.tools.slice(0, 2).join(' · ')}...
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </section>
  )
}
