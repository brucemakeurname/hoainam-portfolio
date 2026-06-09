import { PitchHero } from '@/components/solo-flows/PitchHero'
import { PillarSection } from '@/components/solo-flows/PillarSection'
import { SwotGrid } from '@/components/solo-flows/SwotGrid'
import { RevenueModel } from '@/components/solo-flows/RevenueModel'
import { SOLOFLOWS_PILLARS, SOCIALS } from '@/lib/data'

export const metadata = {
  title: 'Solo Flows — AI-Native Company Overview',
  description: 'Solo Flows: one founder, three AI systems, zero staff. Platform + AI Agents + AI Customer Service.',
}

export default function SoloFlowsPage() {
  return (
    <>
      <PitchHero />

      {/* What is Solo Flows */}
      <section className="py-20 max-w-5xl mx-auto px-6 border-t border-primary/10">
        <p className="text-[10px] tracking-[4px] text-primary font-mono uppercase mb-8">01 · Overview</p>
        <h2 className="text-3xl font-black text-white mb-6">What is Solo Flows?</h2>
        <p className="text-sm text-white/60 leading-relaxed max-w-2xl mb-8">
          Solo Flows is a zero-headcount AI-native company — one founder, no full-time staff.
          All operations run through three integrated AI systems: a live booking platform, an inhouse
          AI agent team, and an AI customer service layer. Together they deliver what would normally
          require a marketing agency, an engineering team, and a CS department.
        </p>
        {/* 3-pillar diagram */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 py-8">
          {['Platform', 'AI Agent System', 'AI Customer Service'].map((pillar, i) => (
            <div key={pillar} className="flex items-center gap-4">
              <div className="px-6 py-3 border border-primary/30 text-sm font-mono text-primary text-center">
                {pillar}
              </div>
              {i < 2 && <span className="text-primary/40 font-mono hidden md:block">←→</span>}
            </div>
          ))}
        </div>
      </section>

      {/* 3 Pillars */}
      {SOLOFLOWS_PILLARS.map((pillar, i) => (
        <PillarSection key={pillar.id} pillar={pillar} index={i} />
      ))}

      {/* Nam's Role */}
      <section className="py-20 max-w-5xl mx-auto px-6 border-t border-primary/10">
        <p className="text-[10px] tracking-[4px] text-primary font-mono uppercase mb-8">04 · Nam&apos;s Role</p>
        <h2 className="text-3xl font-black text-white mb-6">Sole Architect &amp; Operator</h2>
        <p className="text-sm text-white/60 leading-relaxed max-w-2xl mb-8">
          Nam designed, built, and operates all three pillars. The skills that made this possible — not the tech, but the thinking behind it:
        </p>
        <div className="flex flex-wrap gap-2">
          {['Prompt Engineering', 'Context Engineering', 'Harness Engineering', 'Vibecoding', 'AI Fluency', 'Business Strategy', 'UI/UX Design', 'Content Direction'].map((skill) => (
            <span key={skill} className="text-xs px-4 py-2 border border-primary/30 text-primary font-mono">
              {skill}
            </span>
          ))}
        </div>
      </section>

      <SwotGrid />
      <RevenueModel />

      {/* Vision + CTA */}
      <section className="py-20 max-w-5xl mx-auto px-6 border-t border-primary/10 text-center">
        <p className="text-[10px] tracking-[4px] text-accent font-mono uppercase mb-6">07 · Vision</p>
        <h2 className="text-2xl font-black text-white mb-4">
          Building the infrastructure for tomorrow&apos;s AI-native businesses.
        </h2>
        <p className="text-sm text-white/50 max-w-xl mx-auto mb-10">
          Solo Flows is proof of concept and live product. The same agent architecture that runs Solo Flows
          can be deployed for any SME — zero headcount, full capability.
        </p>
        <div className="flex items-center justify-center gap-4 flex-wrap">
          <a
            href={SOCIALS.soloflows}
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-3 text-xs font-mono tracking-[2px] uppercase text-black transition-all"
            style={{ background: '#CFFF04' }}
          >
            Visit soloflows.com ↗
          </a>
          <a
            href={`mailto:${SOCIALS.email}`}
            className="px-8 py-3 text-xs font-mono tracking-[2px] uppercase border border-primary text-primary hover:bg-primary hover:text-white transition-all"
          >
            Get in touch
          </a>
        </div>
      </section>
    </>
  )
}
