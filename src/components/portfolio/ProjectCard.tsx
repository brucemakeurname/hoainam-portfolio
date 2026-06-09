'use client'
import { motion } from 'framer-motion'
import { useLang } from '@/contexts/LanguageContext'

interface Project {
  id: string
  category: string
  categoryVi?: string
  title: string
  titleVi?: string
  description: string
  descriptionVi?: string
  tags: string[]
  note?: string
  noteVi?: string
  links?: { label: string; url: string }[]
}

export function ProjectCard({ project, index }: { project: Project; index: number }) {
  const { lang } = useLang()
  return (
    <motion.div className="p-6 transition-all"
      style={{ border: '1px solid var(--card-border)', background: 'var(--card-bg)' }}
      initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }}
      whileHover={{ borderColor: 'var(--primary)' }}>
      <p className="text-[9px] tracking-[3px] font-mono uppercase mb-2" style={{ color: 'var(--primary)' }}>
        {lang === 'vi' ? (project.categoryVi ?? project.category) : project.category}
      </p>
      <h3 className="text-base font-bold mb-3" style={{ color: 'var(--text)' }}>
        {lang === 'vi' ? (project.titleVi ?? project.title) : project.title}
      </h3>
      <p className="text-xs leading-relaxed mb-4" style={{ color: 'var(--text-muted)' }}>
        {lang === 'vi' ? (project.descriptionVi ?? project.description) : project.description}
      </p>
      <div className="flex flex-wrap gap-1.5 mb-3">
        {project.tags.map((tag) => (
          <span key={tag} className="text-[9px] px-2 py-0.5 font-mono" style={{ color: 'var(--text-muted)', border: '1px solid var(--card-border)' }}>{tag}</span>
        ))}
      </div>
      {project.note && (
        <p className="text-[9px] font-mono italic" style={{ color: 'var(--text-muted)', opacity: 0.5 }}>
          {lang === 'vi' ? (project.noteVi ?? project.note) : project.note}
        </p>
      )}
      {project.links && (
        <div className="flex gap-3 mt-2">
          {project.links.map((link) => (
            <a key={link.url} href={link.url} target="_blank" rel="noopener noreferrer"
              className="text-[10px] font-mono transition-colors" style={{ color: 'var(--primary)' }}>
              {link.label} ↗
            </a>
          ))}
        </div>
      )}
    </motion.div>
  )
}
