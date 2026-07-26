'use client'
import { motion } from 'framer-motion'
import { SWOT } from '@/lib/data'
import { useLang } from '@/contexts/LanguageContext'
import { useTranslations } from '@/lib/translations'

export function SwotGrid() {
  const { lang } = useLang()
  const tr = useTranslations(lang)

  const QUADRANTS = [
    { key: 'strengths' as const, keyVi: 'strengthsVi' as const, labelKey: 'strengths' as const, color: 'var(--primary)', bg: 'var(--surface)' },
    { key: 'weaknesses' as const, keyVi: 'weaknessesVi' as const, labelKey: 'weaknesses' as const, color: 'var(--accent)', bg: 'rgba(37,118,248,0.04)' },
    { key: 'opportunities' as const, keyVi: 'opportunitiesVi' as const, labelKey: 'opportunities' as const, color: 'var(--primary)', bg: 'var(--surface)' },
    { key: 'threats' as const, keyVi: 'threatsVi' as const, labelKey: 'threats' as const, color: 'var(--text-muted)', bg: 'var(--card-bg)' },
  ]

  return (
    <section className="py-20 max-w-5xl mx-auto px-6">
      <p className="text-[10px] tracking-[4px] font-mono uppercase mb-12" style={{ color: 'var(--primary)' }}>
        {tr.soloFlows.swotLabel}
      </p>
      <div className="grid grid-cols-2 gap-px" style={{ background: 'var(--surface)' }}>
        {QUADRANTS.map((q, i) => (
          <motion.div key={q.key} className="p-8" style={{ background: q.bg }}
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
            <h3 className="text-xs font-mono uppercase tracking-[3px] mb-4" style={{ color: q.color }}>
              {tr.soloFlows.swotQuadrants[q.labelKey]}
            </h3>
            <ul className="space-y-2">
              {(lang === 'vi' ? SWOT[q.keyVi] : SWOT[q.key]).map((item) => (
                <li key={item} className="text-xs flex items-start gap-2" style={{ color: 'var(--text-muted)' }}>
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
