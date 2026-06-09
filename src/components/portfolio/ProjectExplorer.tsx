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
    <div className="flex gap-0 min-h-[520px]" style={{ border: '1px solid var(--card-border)' }}>

      {/* ── Left: sidetab ── */}
      <div className="w-[200px] shrink-0 overflow-y-auto" style={{ borderRight: '1px solid var(--card-border)', background: 'var(--card-bg)' }}>
        {PROJECTS.map((p) => {
          const isActive = p.id === activeId
          return (
            <button
              key={p.id}
              onClick={() => selectProject(p.id)}
              className="w-full text-left px-4 py-4 transition-all"
              style={{
                borderBottom: '1px solid var(--card-border)',
                background: isActive ? 'var(--surface)' : 'transparent',
                borderLeft: isActive ? '2px solid var(--primary)' : '2px solid transparent',
              }}
            >
              <p className="text-[9px] font-mono uppercase tracking-[2px] mb-0.5" style={{ color: isActive ? 'var(--primary)' : 'var(--text-muted)' }}>
                {lang === 'vi' ? ((p as any).categoryVi ?? p.category) : p.category}
              </p>
              <p className="text-xs font-bold leading-snug" style={{ color: isActive ? 'var(--text)' : 'var(--text-muted)' }}>
                {lang === 'vi' ? ((p as any).titleVi ?? p.title) : p.title}
              </p>
            </button>
          )
        })}
      </div>

      {/* ── Middle: project info ── */}
      <div className="flex-1 min-w-0 p-8 overflow-y-auto" style={{ borderRight: '1px solid var(--card-border)' }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.2 }}
          >
            <p className="text-[9px] font-mono uppercase tracking-[3px] mb-3" style={{ color: 'var(--primary)' }}>
              {lang === 'vi' ? ((project as any).categoryVi ?? project.category) : project.category}
            </p>
            <h2 className="text-xl font-black mb-4 leading-tight" style={{ color: 'var(--text)' }}>
              {lang === 'vi' ? ((project as any).titleVi ?? project.title) : project.title}
            </h2>
            <p className="text-sm leading-relaxed mb-6" style={{ color: 'var(--text-muted)' }}>
              {lang === 'vi' ? ((project as any).descriptionVi ?? project.description) : project.description}
            </p>

            {/* Tools */}
            {project.tags && project.tags.length > 0 && (
              <div className="mb-6">
                <p className="text-[9px] font-mono uppercase tracking-[3px] mb-2" style={{ color: 'var(--text-muted)' }}>
                  {tr.portfolio.toolsLabel}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {project.tags.map(tag => (
                    <span key={tag} className="text-[10px] px-2 py-0.5 font-mono"
                      style={{ color: 'var(--text-muted)', border: '1px solid var(--card-border)' }}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Note */}
            {(project as any).note && (
              <p className="text-[10px] font-mono italic mb-4" style={{ color: 'var(--text-muted)', opacity: 0.5 }}>
                {lang === 'vi' ? ((project as any).noteVi ?? (project as any).note) : (project as any).note}
              </p>
            )}

            {/* Links */}
            {(project as any).links && (project as any).links.length > 0 && (
              <div className="flex flex-wrap gap-3 mt-2">
                {(project as any).links.map((link: { label: string; url: string }) => (
                  <a key={link.url} href={link.url} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-[10px] font-mono transition-colors"
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

      {/* ── Right: image viewer ── */}
      <div className="w-[460px] shrink-0 flex flex-col" style={{ background: 'var(--card-bg)' }}>
        {total === 0 ? (
          <div className="flex-1 flex items-center justify-center">
            <p className="text-[10px] font-mono" style={{ color: 'var(--text-muted)', opacity: 0.4 }}>
              {tr.portfolio.noImages}
            </p>
          </div>
        ) : (
          <>
            {/* Image display — landscape optimized, full image, no crop */}
            <div className="flex-1 relative flex items-center justify-center p-4" style={{ background: 'rgba(0,0,0,0.2)', minHeight: 280 }}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={`${project.id}-${imgIdx}`}
                  className="w-full h-full flex items-center justify-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Image
                    src={images[imgIdx]}
                    alt={`${project.title} image ${imgIdx + 1}`}
                    width={1200}
                    height={800}
                    className="w-full h-auto"
                    style={{ objectFit: 'contain', maxHeight: '360px' }}
                    unoptimized
                  />
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Nav bar */}
            <div className="flex items-center justify-between px-4 py-3" style={{ borderTop: '1px solid var(--card-border)' }}>
              <button onClick={prev} disabled={total <= 1}
                className="p-1.5 transition-all disabled:opacity-20"
                style={{ border: '1px solid var(--card-border)', color: 'var(--text-muted)' }}>
                <ChevronLeft size={14} />
              </button>

              <span className="text-[10px] font-mono" style={{ color: 'var(--text-muted)' }}>
                {imgIdx + 1} / {total}
              </span>

              <button onClick={next} disabled={total <= 1}
                className="p-1.5 transition-all disabled:opacity-20"
                style={{ border: '1px solid var(--card-border)', color: 'var(--text-muted)' }}>
                <ChevronRight size={14} />
              </button>
            </div>
          </>
        )}
      </div>

    </div>
  )
}
