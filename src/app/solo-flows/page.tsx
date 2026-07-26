'use client'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Music, MessageCircle, ExternalLink } from 'lucide-react'

function FacebookIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
    </svg>
  )
}
function InstagramIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
      <circle cx="12" cy="12" r="4"/>
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
    </svg>
  )
}
function LinkedinIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
      <rect x="2" y="9" width="4" height="12"/>
      <circle cx="4" cy="4" r="2"/>
    </svg>
  )
}
function YoutubeIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.97C18.88 4 12 4 12 4s-6.88 0-8.59.45A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.97C5.12 20 12 20 12 20s6.88 0 8.59-.45a2.78 2.78 0 0 0 1.95-1.97A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/>
      <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="white"/>
    </svg>
  )
}
function TwitterIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
    </svg>
  )
}
function TikTokIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.79a8.18 8.18 0 004.78 1.52V6.84a4.85 4.85 0 01-1.01-.15z"/>
    </svg>
  )
}
import { useEffect, useState } from 'react'
import { useTheme } from 'next-themes'
import { PitchHero } from '@/components/solo-flows/PitchHero'
import { PillarSection } from '@/components/solo-flows/PillarSection'
import { SwotGrid } from '@/components/solo-flows/SwotGrid'
import { SOLOFLOWS_PILLARS, SOCIALS, SOLOFLOWS_COMPANY_SOCIALS, INFLUENCERS } from '@/lib/data'
import { useLang } from '@/contexts/LanguageContext'
import { useTranslations } from '@/lib/translations'

const SOCIAL_ICONS: Record<string, React.ReactNode> = {
  Facebook: <FacebookIcon size={16} />,
  Instagram: <InstagramIcon size={16} />,
  Linkedin: <LinkedinIcon size={16} />,
  Youtube: <YoutubeIcon size={16} />,
  Twitter: <TwitterIcon size={16} />,
  TikTok: <TikTokIcon size={16} />,
  Music: <Music size={16} />,
  MessageCircle: <MessageCircle size={16} />,
}

// Solo Flows brand palette (crawled from soloflows.com) — scoped to this page only,
// independent of the portfolio's own dark blue/lime theme. Follows the site's own
// light/dark toggle with a light (cream/navy) and dark (navy/cream) variant.
const SOLOFLOWS_LIGHT = {
  '--bg': '#FFFAF5',
  '--text': '#00003D',
  '--text-muted': '#5C5C70',
  '--primary': '#FFBF00',
  '--accent': '#2576F8',
  '--surface': 'rgba(0, 0, 61, 0.05)',
  '--card-bg': 'rgba(255, 255, 255, 0.7)',
  '--card-border': '#CECED9',
} as React.CSSProperties

const SOLOFLOWS_DARK = {
  '--bg': '#0A0A24',
  '--text': '#FFFAF5',
  '--text-muted': 'rgba(255, 250, 245, 0.55)',
  '--primary': '#FFBF00',
  '--accent': '#4F93FF',
  '--surface': 'rgba(255, 191, 0, 0.06)',
  '--card-bg': 'rgba(255, 255, 255, 0.04)',
  '--card-border': 'rgba(255, 255, 255, 0.12)',
} as React.CSSProperties

export default function SoloFlowsPage() {
  const { lang } = useLang()
  const tr = useTranslations(lang)
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)
  useEffect(() => { setMounted(true) }, [])
  const soloFlowsTheme = mounted && theme === 'light' ? SOLOFLOWS_LIGHT : SOLOFLOWS_DARK

  return (
    <div style={{ ...soloFlowsTheme, background: 'var(--bg)' }}>
      <PitchHero />

      {/* 01 Overview */}
      <section className="py-20 max-w-5xl mx-auto px-6" style={{ borderTop: '1px solid var(--card-border)' }}>
        <p className="text-[10px] tracking-[4px] font-mono uppercase mb-8" style={{ color: 'var(--primary)' }}>{tr.soloFlows.overviewLabel}</p>
        <h2 className="text-3xl font-black mb-6" style={{ color: 'var(--text)' }}>{tr.soloFlows.overviewTitle}</h2>
        <p className="text-sm leading-relaxed max-w-2xl mb-8" style={{ color: 'var(--text-muted)' }}>{tr.soloFlows.overviewBody}</p>
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 py-8">
          {tr.soloFlows.pillars.map((pillar, i) => (
            <div key={pillar} className="flex items-center gap-4">
              <div className="px-6 py-3 text-sm font-mono text-center" style={{ border: '1px solid var(--surface)', color: 'var(--primary)' }}>
                {pillar}
              </div>
              {i < 2 && <span className="font-mono hidden md:block" style={{ color: 'var(--surface)' }}>←→</span>}
            </div>
          ))}
        </div>
      </section>

      {/* 02–04 Pillars */}
      {SOLOFLOWS_PILLARS.map((pillar, i) => (
        <PillarSection key={pillar.id} pillar={pillar} index={i} />
      ))}

      {/* Nam's Role */}
      <section className="py-20 max-w-5xl mx-auto px-6" style={{ borderTop: '1px solid var(--card-border)' }}>
        <p className="text-[10px] tracking-[4px] font-mono uppercase mb-8" style={{ color: 'var(--primary)' }}>{tr.soloFlows.namRoleLabel}</p>
        <h2 className="text-3xl font-black mb-6" style={{ color: 'var(--text)' }}>{tr.soloFlows.namRoleTitle}</h2>
        <p className="text-sm leading-relaxed max-w-2xl mb-8" style={{ color: 'var(--text-muted)' }}>{tr.soloFlows.namRoleBody}</p>
        <div className="flex flex-wrap gap-2">
          {['Prompt Engineering', 'Context Engineering', 'Harness Engineering', 'Vibecoding', 'AI Fluency', 'Business Strategy', 'UI/UX Design', 'Content Direction'].map((skill) => (
            <span key={skill} className="text-xs px-4 py-2 font-mono" style={{ border: '1px solid var(--surface)', color: 'var(--primary)' }}>
              {skill}
            </span>
          ))}
        </div>
      </section>

      <SwotGrid />

      {/* 06 Solo Flows Company Channels */}
      <section className="py-20 max-w-5xl mx-auto px-6" style={{ borderTop: '1px solid var(--card-border)' }}>
        <p className="text-[10px] tracking-[4px] font-mono uppercase mb-8" style={{ color: 'var(--primary)' }}>{tr.soloFlows.companyLabel}</p>
        <div className="flex flex-wrap gap-3">
          {SOLOFLOWS_COMPANY_SOCIALS.map((social) => (
            <a key={social.url} href={social.url} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-3 text-xs font-mono tracking-[1px] uppercase transition-all"
              style={{ border: '1px solid var(--card-border)', color: 'var(--text-muted)' }}>
              {SOCIAL_ICONS[social.icon] ?? <ExternalLink size={16} />}
              {social.label}
            </a>
          ))}
        </div>
      </section>

      {/* 07 AI Influencer Team */}
      <section className="py-20 max-w-6xl mx-auto px-6" style={{ borderTop: '1px solid var(--card-border)' }}>
        <p className="text-[10px] tracking-[4px] font-mono uppercase mb-4" style={{ color: 'var(--primary)' }}>{tr.soloFlows.influencersLabel}</p>
        <p className="text-sm mb-12" style={{ color: 'var(--text-muted)' }}>{tr.soloFlows.influencersSubtitle}</p>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {INFLUENCERS.map((inf, i) => (
            <motion.div key={inf.id} className="p-6 flex flex-col"
              style={{ border: '1px solid var(--card-border)', background: 'var(--card-bg)' }}
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
              {/* Avatar */}
              <div className="mx-auto mb-4 rounded-full overflow-hidden flex items-center justify-center"
                style={{ width: 80, height: 80, border: '1px solid var(--surface)', background: 'var(--surface)' }}>
                {inf.avatar ? (
                  <Image src={inf.avatar} alt={inf.name} width={80} height={80} className="w-full h-full object-cover" />
                ) : (
                  <span className="text-2xl font-black" style={{ color: 'var(--primary)' }}>{inf.name.charAt(0)}</span>
                )}
              </div>
              <h3 className="text-sm font-black text-center mb-0.5" style={{ color: 'var(--text)' }}>{inf.name}</h3>
              <p className="text-[10px] font-mono text-center mb-3" style={{ color: 'var(--primary)' }}>
                {lang === 'vi' ? inf.roleVi : inf.role}
              </p>
              <p className="text-xs leading-relaxed mb-4 flex-1" style={{ color: 'var(--text-muted)' }}>
                {lang === 'vi' ? inf.bioVi : inf.bio}
              </p>
              <div className="flex flex-wrap gap-2 justify-center">
                {inf.socials.map((s) => (
                  <a key={s.url} href={s.url} target="_blank" rel="noopener noreferrer"
                    className="p-2 transition-all" aria-label={s.label}
                    style={{ border: '1px solid var(--card-border)', color: 'var(--text-muted)' }}>
                    {SOCIAL_ICONS[s.icon] ?? <ExternalLink size={14} />}
                  </a>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 08 Vision + CTA */}
      <section className="py-20 max-w-5xl mx-auto px-6 text-center" style={{ borderTop: '1px solid var(--card-border)' }}>
        <p className="text-[10px] tracking-[4px] font-mono uppercase mb-6" style={{ color: 'var(--accent)' }}>{tr.soloFlows.visionLabel}</p>
        <h2 className="text-2xl font-black mb-4" style={{ color: 'var(--text)' }}>{tr.soloFlows.visionTitle}</h2>
        <p className="text-sm max-w-xl mx-auto mb-10" style={{ color: 'var(--text-muted)' }}>{tr.soloFlows.visionBody}</p>
        <div className="flex items-center justify-center gap-4 flex-wrap">
          <a href={SOCIALS.soloflows} target="_blank" rel="noopener noreferrer"
            className="px-8 py-3 text-xs font-mono tracking-[2px] uppercase text-black transition-all"
            style={{ background: 'var(--accent)' }}>
            {tr.soloFlows.visitSite}
          </a>
          <a href={`mailto:${SOCIALS.email}`}
            className="px-8 py-3 text-xs font-mono tracking-[2px] uppercase transition-all"
            style={{ border: '1px solid var(--primary)', color: 'var(--primary)' }}>
            {tr.soloFlows.getInTouch}
          </a>
        </div>
      </section>
    </div>
  )
}
