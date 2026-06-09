'use client'
import { motion } from 'framer-motion'
import { Globe, Bot, MessageCircle } from 'lucide-react'
import { SOLOFLOWS_PILLARS } from '@/lib/data'
import { useLang } from '@/contexts/LanguageContext'
import { useTranslations } from '@/lib/translations'

const PILLAR_ICONS: Record<string, React.ReactNode> = {
  platform: <Globe size={22} />,
  agents: <Bot size={22} />,
  cs: <MessageCircle size={22} />,
}

export function SoloFlowsEcosystem() {
  const { lang } = useLang()
  const tr = useTranslations(lang)

  return (
    <section className="py-16 max-w-6xl mx-auto rounded-sm mb-16 px-8" style={{ border: '1px solid var(--primary)', background: 'var(--card-bg)', opacity: 0.9 }}>
      <div className="flex items-center gap-4 mb-2">
        <span className="text-[10px] tracking-[4px] font-mono uppercase" style={{ color: 'var(--primary)' }}>{tr.portfolio.featured}</span>
        <div className="h-px flex-1" style={{ background: 'var(--surface)' }} />
      </div>
      <h2 className="text-3xl font-black mb-2" style={{ color: 'var(--text)' }}>{tr.portfolio.sfTitle}</h2>
      <p className="text-xs font-mono mb-10" style={{ color: 'var(--text-muted)' }}>{tr.portfolio.sfSubtitle}</p>
      <div className="grid md:grid-cols-3 gap-6">
        {SOLOFLOWS_PILLARS.map((pillar, i) => (
          <motion.div key={pillar.id} className="p-6"
            style={{ border: '1px solid var(--card-border)', background: 'var(--card-bg)' }}
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.15 }}>
            <div className="mb-3" style={{ color: 'var(--primary)' }}>{PILLAR_ICONS[pillar.id]}</div>
            <h3 className="text-sm font-bold mb-0.5" style={{ color: 'var(--text)' }}>
              {lang === 'vi' ? pillar.titleVi : pillar.title}
            </h3>
            <p className="text-[10px] font-mono mb-4" style={{ color: 'var(--primary)' }}>
              {lang === 'vi' ? (pillar.subtitleVi ?? pillar.subtitle) : pillar.subtitle}
            </p>
            <p className="text-xs leading-relaxed mb-3" style={{ color: 'var(--text-muted)' }}>
              <span className="font-mono text-[9px] uppercase tracking-wider block mb-1" style={{ color: 'var(--text-muted)' }}>{tr.portfolio.whatItDoes}</span>
              {lang === 'vi' ? pillar.whatVi : pillar.what}
            </p>
            <p className="text-xs leading-relaxed mb-3" style={{ color: 'var(--text-muted)' }}>
              <span className="font-mono text-[9px] uppercase tracking-wider block mb-1" style={{ color: 'var(--accent)' }}>{tr.portfolio.howBuilt}</span>
              {lang === 'vi' ? pillar.howVi : pillar.how}
            </p>
            <div className="pt-3 mt-3" style={{ borderTop: '1px solid var(--card-border)' }}>
              <div className="flex flex-col gap-1 mb-3">
                {(lang === 'vi' ? pillar.metricsVi : pillar.metrics).map((m) => (
                  <span key={m} className="text-[10px] flex items-center gap-2" style={{ color: 'var(--text-muted)' }}>
                    <span style={{ color: 'var(--primary)' }}>›</span> {m}
                  </span>
                ))}
              </div>
              <p className="text-[9px] font-mono" style={{ color: 'var(--text-muted)', opacity: 0.6 }}>{pillar.tech}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
