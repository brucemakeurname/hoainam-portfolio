'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react'
import Image from 'next/image'
import { useLang } from '@/contexts/LanguageContext'
import { useTranslations } from '@/lib/translations'
import { PROJECTS } from '@/lib/data'

type Project = typeof PROJECTS[number]

export function ProjectExplorer() {
  const { lang } = useLang()
  const tr = useTranslations(lang)
  const [activeId, setActiveId] = useState(PROJECTS[0].id)
  const [imgIdx, setImgIdx] = useState(0)

  const project = PROJECTS.find(p => p.id === activeId) ?? PROJECTS[0]
  const images = (project as Project & { images?: string[] }).images ?? []
  const total = images.length

  function selectProject(id: string) {
    setActiveId(id)
    setImgIdx(0)
  }

  function prev() { setImgIdx(i => (i - 1 + total) % total) }
  function next() { setImgIdx(i => (i + 1) % total) }

  return (
    <div className="flex flex-col md:flex-row gap-0 md:min-h-[600px]" style={{ border: '1px solid var(--card-border)' }}>

      {/* ── Sidetab: horizontal scroll on mobile, vertical on desktop ── */}
      <div
        className="flex flex-row overflow-x-auto md:flex-col md:w-[180px] md:shrink-0 md:overflow-x-hidden md:overflow-y-auto"
        style={{ borderBottom: '1px solid var(--card-border)', background: 'var(--card-bg)' }}
      >
        {PROJECTS.map((p) => {
          const isActive = p.id === activeId
          return (
            <button
              key={p.id}
              onClick={() => selectProject(p.id)}
              className="shrink-0 md:w-full text-left px-4 py-3 md:py-4 transition-all"
              style={{
                borderRight: '1px solid var(--card-border)',
                background: isActive ? 'var(--surface)' : 'transparent',
                borderBottom: isActive ? '2px solid var(--primary)' : '2px solid transparent',
              }}
            >
              <p className="hidden md:block text-[9px] font-mono uppercase tracking-[2px] mb-0.5" style={{ color: isActive ? 'var(--primary)' : 'var(--text-muted)' }}>
                {lang === 'vi' ? ((p as any).categoryVi ?? p.category) : p.category}
              </p>
              <p className="text-xs font-bold leading-snug whitespace-nowrap md:whitespace-normal" style={{ color: isActive ? 'var(--text)' : 'var(--text-muted)' }}>
                {lang === 'vi' ? ((p as any).titleVi ?? p.title) : p.title}
              </p>
            </button>
          )
        })}
      </div>

      {/* ── Center: image viewer (dominant) ── */}
      <div className="flex-1 min-w-0 flex flex-col" style={{ background: 'rgba(0,0,0,0.25)', borderRight: '1px solid var(--card-border)' }}>
        {total === 0 ? (
          <div className="flex-1 flex items-center justify-center" style={{ minHeight: 400 }}>
            <p className="text-[10px] font-mono" style={{ color: 'var(--text-muted)', opacity: 0.4 }}>
              {tr.portfolio.noImages}
            </p>
          </div>
        ) : (
          <>
            <div className="flex-1 flex items-center justify-center p-6" style={{ minHeight: 480 }}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={`${project.id}-${imgIdx}`}
                  className="w-full flex items-center justify-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                >
                  <Image
                    src={images[imgIdx]}
                    alt={`${project.title} image ${imgIdx + 1}`}
                    width={1400}
                    height={900}
                    className="w-full h-auto"
                    style={{ objectFit: 'contain', maxHeight: '520px' }}
                    unoptimized
                  />
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Nav bar */}
            {total > 1 && (
              <div className="flex items-center justify-between px-5 py-3 shrink-0" style={{ borderTop: '1px solid var(--card-border)' }}>
                <button onClick={prev}
                  className="p-1.5 transition-all"
                  style={{ border: '1px solid var(--card-border)', color: 'var(--text-muted)' }}>
                  <ChevronLeft size={14} />
                </button>
                <span className="text-[10px] font-mono" style={{ color: 'var(--text-muted)' }}>
                  {imgIdx + 1} / {total}
                </span>
                <button onClick={next}
                  className="p-1.5 transition-all"
                  style={{ border: '1px solid var(--card-border)', color: 'var(--text-muted)' }}>
                  <ChevronRight size={14} />
                </button>
              </div>
            )}
          </>
        )}
      </div>

      {/* ── Right: compact project info ── */}
      <div className="w-full md:w-[260px] md:shrink-0 p-6 overflow-y-auto" style={{ background: 'var(--card-bg)' }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="flex flex-col gap-5"
          >
            {/* Category + Title */}
            <div>
              <p className="text-[9px] font-mono uppercase tracking-[3px] mb-2" style={{ color: 'var(--primary)' }}>
                {lang === 'vi' ? ((project as any).categoryVi ?? project.category) : project.category}
              </p>
              <h2 className="text-base font-black leading-snug" style={{ color: 'var(--text)' }}>
                {lang === 'vi' ? ((project as any).titleVi ?? project.title) : project.title}
              </h2>
            </div>

            {/* Description */}
            <p className="text-xs leading-relaxed" style={{ color: 'var(--text-muted)' }}>
              {lang === 'vi' ? ((project as any).descriptionVi ?? project.description) : project.description}
            </p>

            {/* Tags */}
            {project.tags && project.tags.length > 0 && (
              <div>
                <p className="text-[9px] font-mono uppercase tracking-[3px] mb-2" style={{ color: 'var(--text-muted)' }}>
                  {tr.portfolio.toolsLabel}
                </p>
                <div className="flex flex-wrap gap-1">
                  {project.tags.map(tag => (
                    <span key={tag} className="text-[9px] px-1.5 py-0.5 font-mono"
                      style={{ color: 'var(--text-muted)', border: '1px solid var(--card-border)' }}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Note */}
            {(project as any).note && (
              <p className="text-[9px] font-mono italic" style={{ color: 'var(--text-muted)', opacity: 0.5 }}>
                {lang === 'vi' ? ((project as any).noteVi ?? (project as any).note) : (project as any).note}
              </p>
            )}

            {/* Links */}
            {(project as any).links && (project as any).links.length > 0 && (
              <div className="flex flex-col gap-2">
                {(project as any).links.map((link: { label: string; url: string }) => (
                  <a key={link.url} href={link.url} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-[10px] font-mono transition-opacity hover:opacity-70"
                    style={{ color: 'var(--primary)' }}>
                    <ExternalLink size={10} />
                    {link.label}
                  </a>
                ))}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

    </div>
  )
}
