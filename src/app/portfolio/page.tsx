'use client'
import { SoloFlowsEcosystem } from '@/components/portfolio/SoloFlowsEcosystem'
import { ProjectCard } from '@/components/portfolio/ProjectCard'
import { GECEShowcase } from '@/components/portfolio/GECEShowcase'
import { PROJECTS } from '@/lib/data'
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
      <div className="max-w-6xl mx-auto px-6">
        <SoloFlowsEcosystem />
      </div>
      <div className="max-w-6xl mx-auto px-6">
        <p className="text-[10px] tracking-[4px] font-mono uppercase mb-8" style={{ color: 'var(--text-muted)' }}>{tr.portfolio.otherProjects}</p>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-20">
          {PROJECTS.map((project, i) => <ProjectCard key={project.id} project={project} index={i} />)}
        </div>
      </div>
      <GECEShowcase />
    </div>
  )
}
