'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import { Sun, Moon } from 'lucide-react'
import { useTheme } from 'next-themes'
import { useLang } from '@/contexts/LanguageContext'
import { useTranslations } from '@/lib/translations'
import { useEffect, useState } from 'react'

export function Navigation() {
  const pathname = usePathname()
  const { theme, setTheme } = useTheme()
  const { lang, setLang } = useLang()
  const tr = useTranslations(lang)
  const [mounted, setMounted] = useState(false)

  useEffect(() => { setMounted(true) }, [])

  const NAV_LINKS = [
    { href: '/', label: tr.nav.about },
    { href: '/portfolio', label: tr.nav.portfolio },
    { href: '/solo-flows', label: tr.nav.soloFlows },
  ]

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      style={{ background: 'var(--nav-bg)', backdropFilter: 'blur(8px)' }}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="text-sm font-bold tracking-[4px]" style={{ color: 'var(--text)' }}>
          HN<span style={{ color: 'var(--accent)' }}>.</span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-xs tracking-[3px] uppercase font-mono transition-colors"
              style={{ color: pathname === link.href ? 'var(--text)' : 'var(--text-muted)' }}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          {/* VIE / ENG toggle */}
          <button
            onClick={() => setLang(lang === 'vi' ? 'en' : 'vi')}
            className="flex items-center gap-1.5 text-[10px] font-mono tracking-[2px] px-3 py-1.5 rounded-full transition-all"
            style={{ border: '1px solid var(--card-border)', color: 'var(--text-muted)' }}
            aria-label="Toggle language"
          >
            <span style={{ color: lang === 'vi' ? 'var(--primary)' : 'var(--text-muted)', fontWeight: lang === 'vi' ? 700 : 400 }}>VIE</span>
            <span style={{ color: 'var(--card-border)' }}>|</span>
            <span style={{ color: lang === 'en' ? 'var(--primary)' : 'var(--text-muted)', fontWeight: lang === 'en' ? 700 : 400 }}>ENG</span>
          </button>

          {/* Light / Dark toggle */}
          {mounted && (
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="p-2 rounded-full transition-all"
              style={{ border: '1px solid var(--card-border)', color: 'var(--text-muted)' }}
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun size={14} /> : <Moon size={14} />}
            </button>
          )}

          <a
            href="mailto:c.nguyenhoainam11122000@gmail.com"
            className="text-xs tracking-[2px] uppercase font-mono px-4 py-2 transition-all hidden md:block"
            style={{ border: '1px solid var(--primary)', color: 'var(--primary)' }}
          >
            {tr.nav.contact}
          </a>
        </div>
      </div>
    </motion.header>
  )
}
