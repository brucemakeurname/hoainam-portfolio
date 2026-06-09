'use client'
import { motion } from 'framer-motion'
import { useLang } from '@/contexts/LanguageContext'
import { useTranslations } from '@/lib/translations'

interface Pillar {
  icon?: string
  title: string; titleVi: string
  subtitle: string; subtitleVi?: string
  what: string; whatVi: string
  how: string; howVi: string
  metrics: string[]; metricsVi: string[]
  tech: string
}

export function PillarSection({ pillar, index }: { pillar: Pillar; index: number }) {
  const { lang } = useLang()
  const tr = useTranslations(lang)
  return (
    <motion.section className="py-20" style={{ borderTop: '1px solid var(--card-border)' }}
      initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
      <div className="max-w-5xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-start">
        <div>
          <p className="text-[10px] tracking-[4px] font-mono uppercase mb-4" style={{ color: 'var(--primary)' }}>
            0{index + 1} · {lang === 'vi' ? (pillar.subtitleVi ?? pillar.subtitle) : pillar.subtitle}
          </p>
          <h2 className="text-4xl font-black mb-6" style={{ color: 'var(--text)' }}>
            {lang === 'vi' ? pillar.titleVi : pillar.title}
          </h2>
          <p className="text-xs font-mono uppercase tracking-wider mb-2" style={{ color: 'var(--text-muted)' }}>{tr.soloFlows.whatItDoes}</p>
          <p className="text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>
            {lang === 'vi' ? pillar.whatVi : pillar.what}
          </p>
        </div>
        <div className="space-y-6">
          <div>
            <p className="text-[10px] tracking-[3px] font-mono uppercase mb-2" style={{ color: 'var(--accent)' }}>{tr.soloFlows.skillsLabel}</p>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>{lang === 'vi' ? pillar.howVi : pillar.how}</p>
          </div>
          <div className="p-5" style={{ border: '1px solid var(--surface)' }}>
            <p className="text-[9px] font-mono uppercase tracking-wider mb-3" style={{ color: 'var(--text-muted)' }}>{tr.soloFlows.metricsLabel}</p>
            <ul className="space-y-1.5">
              {(lang === 'vi' ? pillar.metricsVi : pillar.metrics).map((m) => (
                <li key={m} className="text-xs flex items-center gap-2" style={{ color: 'var(--text-muted)' }}>
                  <span style={{ color: 'var(--primary)' }}>›</span> {m}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-[9px] font-mono uppercase tracking-wider mb-1" style={{ color: 'var(--text-muted)', opacity: 0.5 }}>{tr.soloFlows.techLabel}</p>
            <p className="text-[10px] font-mono" style={{ color: 'var(--text-muted)', opacity: 0.5 }}>{pillar.tech}</p>
          </div>
        </div>
      </div>
    </motion.section>
  )
}
