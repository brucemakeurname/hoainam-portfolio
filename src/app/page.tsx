import { Hero } from '@/components/home/Hero'
import { StatsBar } from '@/components/home/StatsBar'
import { SkillDimensions } from '@/components/home/SkillDimensions'
import { CareerTimeline } from '@/components/home/CareerTimeline'
import Link from 'next/link'

export default function AboutPage() {
  return (
    <>
      <Hero />
      <StatsBar />
      <SkillDimensions />
      <CareerTimeline />

      {/* CTA Row */}
      <section className="py-16 text-center border-t border-primary/10">
        <div className="flex items-center justify-center gap-4 flex-wrap">
          <Link
            href="/portfolio"
            className="px-8 py-3 text-xs font-mono tracking-[2px] uppercase bg-primary text-white hover:bg-primary/80 transition-all"
          >
            View Portfolio →
          </Link>
          <Link
            href="/solo-flows"
            className="px-8 py-3 text-xs font-mono tracking-[2px] uppercase border border-accent text-accent hover:bg-accent hover:text-black transition-all"
          >
            Explore Solo Flows →
          </Link>
        </div>
      </section>
    </>
  )
}
