import { SoloFlowsEcosystem } from '@/components/portfolio/SoloFlowsEcosystem'
import { ProjectCard } from '@/components/portfolio/ProjectCard'
import { GECEShowcase } from '@/components/portfolio/GECEShowcase'
import { PROJECTS } from '@/lib/data'

export const metadata = {
  title: 'Portfolio — Nguyễn Hoài Nam',
  description: 'Projects: Solo Flows ecosystem, AI film, AI influencer system, social automation, and more.',
}

export default function PortfolioPage() {
  return (
    <div className="pt-24 pb-16">
      {/* Header */}
      <div className="max-w-6xl mx-auto px-6 mb-16">
        <p className="text-[10px] tracking-[4px] text-primary font-mono uppercase mb-4">01 · Projects</p>
        <h1 className="text-5xl font-black text-white chroma">PORTFOLIO</h1>
        <p className="text-sm text-white/40 mt-4 max-w-xl">
          Built with Prompt Engineering, Harness Engineering, Vibecoding, and AI Fluency — across 4 years.
        </p>
      </div>

      {/* Solo Flows Ecosystem — featured */}
      <div className="max-w-6xl mx-auto px-6">
        <SoloFlowsEcosystem />
      </div>

      {/* Other projects */}
      <div className="max-w-6xl mx-auto px-6">
        <p className="text-[10px] tracking-[4px] text-white/30 font-mono uppercase mb-8">02 · Other Projects</p>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-20">
          {PROJECTS.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>
      </div>

      {/* GECE Design Showcase */}
      <GECEShowcase />
    </div>
  )
}
