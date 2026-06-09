import type { Metadata } from 'next'
import { ThemeProvider } from 'next-themes'
import { Navigation } from '@/components/layout/Navigation'
import { GrainOverlay } from '@/components/ui/GrainOverlay'
import { LanguageProvider } from '@/contexts/LanguageContext'
import '@fontsource/space-grotesk/400.css'
import '@fontsource/space-grotesk/700.css'
import '@fontsource/space-grotesk/500.css'
import './globals.css'

export const metadata: Metadata = {
  title: 'Nguyễn Hoài Nam — AI Automation Executive',
  description: 'Founder of Solo Flows. Building AI agent systems that run marketing & operations for SMEs.',
  icons: { icon: '/images/avatar.jpg' },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi" suppressHydrationWarning>
      <body style={{ background: 'var(--bg)', color: 'var(--text)', transition: 'background 0.3s, color 0.3s' }}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          <LanguageProvider>
            <GrainOverlay />
            <Navigation />
            <main>{children}</main>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
