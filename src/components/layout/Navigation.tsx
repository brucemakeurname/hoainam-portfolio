'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'

const NAV_LINKS = [
  { href: '/', label: 'About' },
  { href: '/portfolio', label: 'Portfolio' },
  { href: '/solo-flows', label: 'Solo Flows' },
]

export function Navigation() {
  const pathname = usePathname()

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      style={{
        background: 'linear-gradient(180deg, rgba(6,6,14,0.9) 0%, transparent 100%)',
        backdropFilter: 'blur(8px)',
      }}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="text-sm font-bold tracking-[4px] text-white">
          HN<span className="text-accent">.</span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-xs tracking-[3px] uppercase font-mono transition-colors ${
                pathname === link.href
                  ? 'text-white'
                  : 'text-white/40 hover:text-white/80'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <a
          href="mailto:c.nguyenhoainam11122000@gmail.com"
          className="text-xs tracking-[2px] uppercase font-mono px-4 py-2 border border-primary/40 text-primary hover:bg-primary hover:text-white transition-all"
        >
          Contact
        </a>
      </div>
    </motion.header>
  )
}
