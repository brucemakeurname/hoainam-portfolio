'use client'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { GECE_IMAGES } from '@/lib/data'
import { useLang } from '@/contexts/LanguageContext'
import { useTranslations } from '@/lib/translations'

export function GECEShowcase() {
  const { lang } = useLang()
  const tr = useTranslations(lang)
  return (
    <section className="py-16 max-w-6xl mx-auto px-6">
      <p className="text-[10px] tracking-[4px] font-mono uppercase mb-8" style={{ color: 'var(--text-muted)' }}>
        {tr.portfolio.geceLabel}
      </p>
      <div className="columns-1 md:columns-2 lg:columns-3 gap-4 space-y-4">
        {GECE_IMAGES.map((src, i) => (
          <motion.div key={src} className="break-inside-avoid overflow-hidden transition-all"
            style={{ border: '1px solid var(--card-border)' }}
            initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
            whileHover={{ borderColor: 'var(--primary)' }}>
            <Image src={src} alt={`GECE design ${i + 1}`} width={400} height={300} className="w-full h-auto" unoptimized />
          </motion.div>
        ))}
      </div>
    </section>
  )
}
