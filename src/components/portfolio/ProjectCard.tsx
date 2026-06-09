'use client'
import { motion } from 'framer-motion'

interface Project {
  id: string
  category: string
  title: string
  description: string
  tags: string[]
  note?: string
  links?: { label: string; url: string }[]
}

export function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <motion.div
      className="p-6 transition-colors"
      style={{ border: '1px solid rgba(255,255,255,0.08)', background: 'rgba(255,255,255,0.02)' }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ borderColor: 'rgba(31,127,254,0.4)' }}
    >
      <p className="text-[9px] tracking-[3px] text-primary font-mono uppercase mb-2">{project.category}</p>
      <h3 className="text-base font-bold text-white mb-3">{project.title}</h3>
      <p className="text-xs text-white/50 leading-relaxed mb-4">{project.description}</p>

      <div className="flex flex-wrap gap-1.5 mb-3">
        {project.tags.map((tag) => (
          <span key={tag} className="text-[9px] px-2 py-0.5 font-mono text-white/40" style={{ border: '1px solid rgba(255,255,255,0.1)' }}>
            {tag}
          </span>
        ))}
      </div>

      {project.note && (
        <p className="text-[9px] text-white/25 font-mono italic">{project.note}</p>
      )}
      {project.links && (
        <div className="flex gap-3 mt-2">
          {project.links.map((link) => (
            <a
              key={link.url}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[10px] text-primary font-mono hover:text-accent transition-colors"
            >
              {link.label} ↗
            </a>
          ))}
        </div>
      )}
    </motion.div>
  )
}
