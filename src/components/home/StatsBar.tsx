'use client'
import { motion } from 'framer-motion'
import { AnimatedCounter } from '@/components/ui/AnimatedCounter'
import { STATS } from '@/lib/data'
import { useLang } from '@/contexts/LanguageContext'
import { useTranslations } from '@/lib/translations'
import type { Translations } from '@/lib/translations'

export function StatsBar() {
  const { lang } = useLang()
  const tr = useTranslations(lang)

  return (
    <section className="py-16" style={{ borderTop: '1px solid var(--card-border)', borderBottom: '1px solid var(--card-border)', background: 'var(--card-bg)' }}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.labelKey}
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <div className="text-3xl font-black tabular-nums" style={{ color: 'var(--text)' }}>
                <AnimatedCounter value={stat.value} suffix={stat.suffix} />
              </div>
              <div className="text-[10px] tracking-[3px] font-mono uppercase mt-1" style={{ color: 'var(--text-muted)' }}>
                {tr.stats[stat.labelKey as keyof Translations['stats']]}
              </div>
              {'detail' in stat && stat.detail && (
                <div className="text-[9px] mt-1 leading-snug" style={{ color: 'var(--text-muted)', opacity: 0.7 }}>
                  {lang === 'vi' ? stat.detailVi : stat.detail}
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
