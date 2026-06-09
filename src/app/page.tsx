'use client'
import { Hero } from '@/components/home/Hero'
import { StatsBar } from '@/components/home/StatsBar'
import { SkillDimensions } from '@/components/home/SkillDimensions'
import { CareerTimeline } from '@/components/home/CareerTimeline'
import Link from 'next/link'
import { useLang } from '@/contexts/LanguageContext'
import { useTranslations } from '@/lib/translations'

export default function AboutPage() {
  const { lang } = useLang()
  const tr = useTranslations(lang)

  return (
    <>
      <Hero />
      <StatsBar />
      <SkillDimensions />
      <CareerTimeline />
      <section className="py-16 text-center" style={{ borderTop: '1px solid var(--card-border)' }}>
        <div className="flex items-center justify-center gap-4 flex-wrap">
          <Link href="/portfolio" className="px-8 py-3 text-xs font-mono tracking-[2px] uppercase transition-all"
            style={{ background: 'var(--primary)', color: '#fff' }}>
            {tr.cta.viewPortfolio}
          </Link>
          <Link href="/solo-flows" className="px-8 py-3 text-xs font-mono tracking-[2px] uppercase transition-all"
            style={{ border: '1px solid var(--accent)', color: 'var(--accent)' }}>
            {tr.cta.exploreSF}
          </Link>
        </div>
      </section>
    </>
  )
}
