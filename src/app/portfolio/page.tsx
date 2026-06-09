'use client'
import { SoloFlowsEcosystem } from '@/components/portfolio/SoloFlowsEcosystem'
import { ProjectExplorer } from '@/components/portfolio/ProjectExplorer'
import { useLang } from '@/contexts/LanguageContext'
import { useTranslations } from '@/lib/translations'

export default function PortfolioPage() {
  const { lang } = useLang()
  const tr = useTranslations(lang)

  return (
    <div className="pt-24 pb-16" style={{ background: 'var(--bg)' }}>
      <div className="max-w-6xl mx-auto px-6 mb-16">
        <p className="text-[10px] tracking-[4px] font-mono uppercase mb-4" style={{ color: 'var(--primary)' }}>{tr.portfolio.sectionLabel}</p>
        <h1 className="text-5xl font-black chroma" style={{ color: 'var(--text)' }}>{tr.portfolio.title}</h1>
        <p className="text-sm mt-4 max-w-xl" style={{ color: 'var(--text-muted)' }}>{tr.portfolio.subtitle}</p>
      </div>

      <div className="max-w-6xl mx-auto px-6 mb-6">
        <SoloFlowsEcosystem />
      </div>

      <div className="max-w-6xl mx-auto px-6 pb-20">
        <p className="text-[10px] tracking-[4px] font-mono uppercase mb-8" style={{ color: 'var(--text-muted)' }}>{tr.portfolio.otherProjects}</p>
        <ProjectExplorer />
      </div>
    </div>
  )
}
