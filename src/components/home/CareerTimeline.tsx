'use client'
import { motion } from 'framer-motion'
import { TIMELINE } from '@/lib/data'
import { useLang } from '@/contexts/LanguageContext'
import { useTranslations } from '@/lib/translations'

export function CareerTimeline() {
  const { lang } = useLang()
  const tr = useTranslations(lang)

  return (
    <section className="py-24 max-w-4xl mx-auto px-6">
      <p className="text-[10px] tracking-[4px] font-mono uppercase mb-16" style={{ color: 'var(--primary)' }}>
        {tr.timeline.sectionLabel}
      </p>
      <div className="relative">
        <div className="absolute left-[72px] top-0 bottom-0 w-px" style={{ background: 'var(--surface)' }} />
        {TIMELINE.map((item, i) => (
          <motion.div
            key={item.year}
            className="flex gap-8 mb-12 relative"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
          >
            <div className="w-[72px] shrink-0 text-right">
              <span className="text-xs font-mono font-bold" style={{ color: item.isCurrent ? 'var(--accent)' : 'var(--primary)' }}>
                {item.year}
              </span>
            </div>
            <div
              className="absolute left-[68px] top-1 w-2 h-2 rounded-full border-2"
              style={{
                borderColor: item.isCurrent ? 'var(--accent)' : 'var(--primary)',
                background: item.isCurrent ? 'var(--accent)' : 'transparent',
                boxShadow: item.isCurrent ? '0 0 12px var(--accent)' : '0 0 8px var(--primary)',
              }}
            />
            <div className="flex-1 pl-8">
              <h3 className="text-sm font-bold mb-1" style={{ color: 'var(--text)' }}>
                {lang === 'vi' ? item.titleVi : item.title}
              </h3>
              <p className="text-xs leading-relaxed mb-3" style={{ color: 'var(--text-muted)' }}>
                {lang === 'vi' ? item.descriptionVi : item.description}
              </p>
              <div className="flex flex-wrap gap-1.5">
                {item.tech.map((t) => (
                  <span key={t} className="text-[10px] px-2 py-0.5 font-mono" style={{ color: 'var(--text-muted)', border: '1px solid var(--card-border)' }}>
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
