'use client'
import { motion } from 'framer-motion'
import { CreditCard, Package, Star, GraduationCap, Handshake } from 'lucide-react'
import { REVENUE_STREAMS } from '@/lib/data'
import { useLang } from '@/contexts/LanguageContext'
import { useTranslations } from '@/lib/translations'

const ICONS: Record<string, React.ReactNode> = {
  CreditCard: <CreditCard size={22} />,
  Package: <Package size={22} />,
  Star: <Star size={22} />,
  GraduationCap: <GraduationCap size={22} />,
  Handshake: <Handshake size={22} />,
}

export function RevenueModel() {
  const { lang } = useLang()
  const tr = useTranslations(lang)
  return (
    <section className="py-20 max-w-5xl mx-auto px-6" style={{ borderTop: '1px solid var(--card-border)' }}>
      <p className="text-[10px] tracking-[4px] font-mono uppercase mb-12" style={{ color: 'var(--primary)' }}>
        {tr.soloFlows.revenueLabel}
      </p>
      <div className="flex flex-wrap gap-4 justify-center">
        {REVENUE_STREAMS.map((stream, i) => (
          <motion.div key={stream.labelEn} className="flex-1 min-w-[160px] p-6 text-center transition-all"
            style={{ border: '1px solid var(--surface)' }}
            initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
            whileHover={{ borderColor: 'var(--accent)' }}>
            <div className="flex justify-center mb-3" style={{ color: 'var(--primary)' }}>{ICONS[stream.icon] ?? <Star size={22} />}</div>
            <h3 className="text-xs font-bold mb-1" style={{ color: 'var(--text)' }}>
              {lang === 'vi' ? stream.labelVi : stream.labelEn}
            </h3>
            <p className="text-[10px] font-mono" style={{ color: 'var(--text-muted)' }}>
              {lang === 'vi' ? stream.detailVi : stream.detail}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
