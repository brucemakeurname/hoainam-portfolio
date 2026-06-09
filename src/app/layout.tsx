import type { Metadata } from 'next'
import { Navigation } from '@/components/layout/Navigation'
import { GrainOverlay } from '@/components/ui/GrainOverlay'
import '@fontsource/space-grotesk/400.css'
import '@fontsource/space-grotesk/500.css'
import '@fontsource/space-grotesk/700.css'
import './globals.css'

export const metadata: Metadata = {
  title: 'Nguyễn Hoài Nam — AI Automation Executive',
  description: 'Founder of Solo Flows. Building AI agent systems that run marketing & operations for SMEs. 10 agents, 6 platforms, solo.',
  icons: { icon: '/images/avatar.jpg' },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <GrainOverlay />
        <Navigation />
        <main>{children}</main>
      </body>
    </html>
  )
}
