@AGENTS.md

# Nguyễn Hoài Nam — Portfolio Website (hoainam.com.vn)

Tài liệu này tổng hợp toàn bộ trạng thái hiện tại của dự án, dùng cho các phiên phát triển tiếp theo.

---

## Tổng quan

**Mục đích:** Website portfolio cá nhân cho Nguyễn Hoài Nam, định vị là AI Automation Executive, Founder của Solo Flows.

**Live URL:** `https://hoainam-portfolio-h4cxb7pmx-brucemakeurhome-gmailcoms-projects.vercel.app`
**Domain đang connect:** `hoainam.com.vn` (đang cấu hình DNS trỏ về Vercel)
**GitHub repo:** `https://github.com/brucemakeurname/hoainam-portfolio`
**Vercel project ID:** `prj_50dJNeaWERLlBD4oV1aEqMNvIKlb`

**Deploy workflow:** Push lên `main` → Vercel tự động redeploy (GitHub integration).

---

## Tech Stack

| Layer | Công nghệ | Ghi chú |
|-------|-----------|---------|
| Framework | Next.js 16 (App Router) | Installed as "latest" — đọc docs trong `node_modules/next/dist/docs/` |
| Language | TypeScript | Strict mode |
| Styling | Tailwind CSS v4 | Dùng `@import "tailwindcss"` + `@theme {}` — KHÔNG dùng `@tailwind base/components/utilities` |
| Animation | Framer Motion | `whileInView`, `AnimatePresence`, `useScroll`/`useTransform` |
| Theme | next-themes | `attribute="class"`, `defaultTheme="dark"` — áp dụng class `.light` lên `<html>` |
| Icons | lucide-react | Một số brand icons (Facebook, Instagram v.v.) phải dùng inline SVG vì lucide không có |
| i18n | Custom context | Không dùng thư viện ngoài — xem `LanguageContext` + `translations.ts` |
| Fonts | @fontsource/space-grotesk | Weight 400/500/700 (max weight là 700, KHÔNG có 800) |

---

## Cấu trúc thư mục

```
src/
├── app/
│   ├── layout.tsx              # Root layout — ThemeProvider + LanguageProvider
│   ├── page.tsx                # Trang About (Hero + Stats + Skills + Timeline + CTA)
│   ├── globals.css             # CSS vars :root (dark) + .light (light mode) + utilities
│   ├── portfolio/
│   │   └── page.tsx            # Trang Portfolio
│   └── solo-flows/
│       └── page.tsx            # Trang Solo Flows (pitch deck)
├── components/
│   ├── layout/
│   │   └── Navigation.tsx      # Navbar: VIE/ENG toggle + Sun/Moon toggle + nav links
│   ├── home/
│   │   ├── Hero.tsx            # Hero section: avatar, tên, title, social buttons, email+phone
│   │   ├── StatsBar.tsx        # 6 animated counters
│   │   ├── SkillDimensions.tsx # 6 skill cards với Lucide icons, expandable
│   │   └── CareerTimeline.tsx  # Timeline 2020→2025→ (data đã sort newest-first trong data.ts)
│   ├── portfolio/
│   │   ├── SoloFlowsEcosystem.tsx # Featured: 3 pillar cards, mỗi card có image slideshow (maxHeight 300px)
│   │   ├── ProjectExplorer.tsx    # 3-col explorer: sidetab(180px) / image-flex-1 / info(260px)
│   │   ├── ProjectCard.tsx        # (legacy — không còn dùng trong portfolio/page.tsx)
│   │   └── GECEShowcase.tsx       # (legacy — đã gộp vào ProjectExplorer)
│   ├── solo-flows/
│   │   ├── PitchHero.tsx       # Full-screen hero Solo Flows
│   │   ├── PillarSection.tsx   # Section cho từng pillar (Platform/Agents/CS)
│   │   ├── SwotGrid.tsx        # SWOT analysis 2x2 grid
│   │   └── RevenueModel.tsx    # 5 revenue stream cards
│   └── ui/
│       ├── GrainOverlay.tsx    # Film grain overlay (z-index 9999)
│       ├── GlowPanel.tsx       # Blue glow side panels
│       └── AnimatedCounter.tsx # Counter với scroll trigger
├── contexts/
│   └── LanguageContext.tsx     # useLang() hook — lang: 'vi' | 'en', localStorage persist
└── lib/
    ├── data.ts                 # Tất cả data content (bilingual)
    └── translations.ts         # UI strings vi/en — useTranslations(lang)
```

---

## Hệ thống i18n

### Pattern sử dụng

```tsx
'use client'
import { useLang } from '@/contexts/LanguageContext'
import { useTranslations } from '@/lib/translations'

export function MyComponent() {
  const { lang } = useLang()
  const tr = useTranslations(lang)
  // UI strings:
  return <h1>{tr.hero.role}</h1>
  // Data content:
  return <p>{lang === 'vi' ? item.titleVi : item.title}</p>
}
```

### Cấu trúc translations

```
tr.nav.{about, portfolio, soloFlows, contact}
tr.hero.{role, tagline, downloadCv, email, phone, scrollHint}
tr.stats.{yearsAI, agentsBuilt, platforms, designProjects, growth, tests}
tr.skills.{sectionLabel, categories.{ai-agents, prompt-eng, platform, content, design, business}}
tr.timeline.{sectionLabel}
tr.cta.{viewPortfolio, exploreSF}
tr.portfolio.{sectionLabel, title, subtitle, featured, sfTitle, sfSubtitle, whatItDoes, howBuilt, otherProjects, geceLabel, processLabel, toolsLabel, noImages}
tr.soloFlows.{heroTag, heroTagline, overviewLabel, overviewTitle, overviewBody, pillars[], whatItDoes, skillsLabel, metricsLabel, techLabel, namRoleLabel, namRoleTitle, namRoleBody, swotLabel, swotQuadrants.{strengths, weaknesses, opportunities, threats}, revenueLabel, companyLabel, influencersLabel, influencersSubtitle, visionLabel, visionTitle, visionBody, visitSite, getInTouch}
```

### Bilingual data fields (trong data.ts)

Các array trong `data.ts` có thêm field `*Vi` suffix:
- `titleVi`, `descriptionVi`, `categoryVi`, `noteVi`
- `subtitleVi`, `whatVi`, `howVi`, `metricsVi[]`
- `roleVi`, `bioVi`
- `labelVi`, `detailVi` (REVENUE_STREAMS)
- `strengthsVi[]`, `weaknessesVi[]`, `opportunitiesVi[]`, `threatsVi[]` (SWOT)

---

## Light/Dark Mode

**Strategy:** `next-themes` với `attribute="class"` → thêm class `.light` vào `<html>`.

**CSS vars (trong `globals.css`):**

```css
/* :root = dark mode (default) */
:root {
  --bg: #06060e;
  --primary: #1F7FFE;
  --accent: #CFFF04;
  --surface: rgba(31, 127, 254, 0.06);
  --text: #ffffff;
  --text-muted: rgba(255, 255, 255, 0.4);
  --card-bg: rgba(255, 255, 255, 0.02);
  --card-border: rgba(255, 255, 255, 0.08);
  --nav-bg: rgba(6, 6, 14, 0.9);
}
/* .light = light mode */
.light {
  --bg: #f4f6fb;
  --primary: #1260d4;
  --accent: #7a9200;
  --text: #0d0d1a;
  --text-muted: rgba(13, 13, 26, 0.5);
  --card-bg: rgba(255, 255, 255, 0.7);
  --card-border: rgba(18, 96, 212, 0.12);
  --nav-bg: rgba(244, 246, 251, 0.9);
}
```

**Quan trọng:** Theme toggle trong Navigation dùng `mounted` state để tránh hydration mismatch:
```tsx
const [mounted, setMounted] = useState(false)
useEffect(() => { setMounted(true) }, [])
{mounted && <button onClick={...}>{theme === 'dark' ? <Sun /> : <Moon />}</button>}
```

---

## Brand Icons (Social Media)

`lucide-react` phiên bản hiện tại **không có** `Facebook`, `Instagram`, `Linkedin`, `Youtube`, `Twitter`. Dùng inline SVG components đã được định nghĩa trong `Hero.tsx` và `solo-flows/page.tsx`:

```tsx
// TikTok (lucide không có)
function TikTokIcon({ size = 16 }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67..." />
  </svg>
}
// Facebook, Instagram, LinkedIn, YouTube, Twitter: xem Hero.tsx và solo-flows/page.tsx
// SOCIAL_ICONS map trong solo-flows/page.tsx nhận key string từ data.ts
```

---

## Data quan trọng

### SOCIALS (links cá nhân)
```ts
linkedin: 'https://www.linkedin.com/in/nam-nguyen-b0a463183/'
instagram: 'https://www.instagram.com/namhoai.1112/'
facebook: 'https://www.facebook.com/hoai.nam.626'
tiktok: 'https://www.tiktok.com/@rick_and_ai'
email: 'c.nguyenhoainam11122000@gmail.com'
phone: '0964 461 206'
soloflows: 'https://soloflows.com'
```

### INFLUENCERS (4 AI personas của Solo Flows)
| Name | Role | Avatar |
|------|------|--------|
| Bruce | AI Co-Founder & Tech Creator | `/images/bruce.png` |
| Mylara Vey | Digital Musician & Artist | `/images/mylara.jpg` |
| Chú Sáu | Fitness & Lifestyle Expert | `null` (hiển thị initial) |
| Khánh Huyền | Fashion & Lifestyle Icon | `null` (hiển thị initial) |

### STATS
```ts
{ value: 4, suffix: '+', labelKey: 'yearsAI' }
{ value: 10, suffix: '', labelKey: 'agentsBuilt' }
{ value: 6, suffix: '', labelKey: 'platforms' }
{ value: 44, suffix: '', labelKey: 'designProjects' }
{ value: 603, suffix: '%', labelKey: 'growth' }
{ value: 711, suffix: '', labelKey: 'tests' }
```

---

## Assets

```
public/
├── images/
│   ├── avatar.jpg              # Ảnh đại diện Nam — Hero circle + favicon
│   ├── bruce.png               # Influencer Bruce (cần thêm nếu chưa có)
│   ├── mylara.jpg              # Influencer Mylara (cần thêm nếu chưa có)
│   ├── gece/
│   │   ├── 1.png
│   │   ├── tot nghiep ko so that nghiep.png
│   │   ├── PA1.png
│   │   ├── 1.2.png
│   │   └── 1_1.png
│   └── projects/               # Ảnh minh họa từng project (copy từ D:\8. OVERALL PORTFOLIO\project img)
│       ├── asl-the-scent.png       → project: ai-movie
│       ├── sf-influencer.png       → project: ai-influencers
│       ├── sf-multichannel.jpg     → project: social-automation
│       ├── make-workflow.png       → project: asl-automation
│       ├── gece-crm.jpg            → project: gece-crm
│       ├── sf-platform-hero.png    → pillar: platform (SoloFlowsEcosystem)
│       ├── sf-booking.png          → pillar: platform
│       ├── sf-newfeed.png          → pillar: platform
│       ├── sf-explore.png          → pillar: platform
│       ├── sf-agents-log.jpg       → pillar: agents
│       ├── sf-agents-discord.jpg   → pillar: agents
│       └── sf-chatbot.png          → pillar: cs
└── cv/
    └── CV-Nguyen-Hoai-Nam-2026.pdf   # CHƯA có — cần export và commit
```

### Nguồn ảnh gốc
Ảnh project gốc (chưa rename) nằm tại: `D:\8. OVERALL PORTFOLIO\project img\`

---

## Những việc còn lại (TODO)

### Ưu tiên cao
- [ ] **CV PDF:** Export file DOCX → PDF, đặt vào `public/cv/CV-Nguyen-Hoai-Nam-2026.pdf`, commit & push
- [ ] **Avatar influencers:** Thêm ảnh `public/images/bruce.png` và `public/images/mylara.jpg` nếu chưa có
- [ ] **Domain:** Verify `hoainam.com.vn` đã trỏ đúng về Vercel

### Ưu tiên trung bình
- [ ] **Avatar Chú Sáu & Khánh Huyền:** Hiện đang hiển thị initial letter — thêm ảnh thật vào data.ts + public/images/
- [ ] **Mobile nav:** Navigation chưa có mobile menu (hamburger) — chỉ hiện trên md+
- [ ] **SEO metadata:** `portfolio/page.tsx` và `solo-flows/page.tsx` đã bỏ `metadata` export (vì `'use client'`) — cần tách metadata ra file riêng nếu cần SEO
- [ ] **OG image:** Thêm open graph image để share đẹp trên social

### Tương lai
- [ ] **SoloAcademy section:** Khi ra mắt khoá học, cập nhật REVENUE_STREAMS và thêm section mới
- [ ] **Blog/Articles:** Thêm trang viết bài nếu cần
- [ ] **Contact form:** Hiện chỉ có email link — có thể thêm form gửi trực tiếp

---

## Security

**KHÔNG commit các file sau lên GitHub:**
- `.env.local` — chứa Supabase keys, Cloudflare R2, Sepay/PayPal, Apify, Google OAuth, Upstash Redis (của dự án Solo Flows Platform khác)
- `D:\8. OVERALL PORTFOLIO\DOCS\deploy.env` — chứa GitHub PAT và Vercel token

**Deploy tokens** được lưu tại: `D:\8. OVERALL PORTFOLIO\DOCS\deploy.env` (ngoài git repo).

---

## Lưu ý kỹ thuật

### Tailwind v4
- Dùng `@import "tailwindcss"` thay vì `@tailwind base/components/utilities`
- Brand colors định nghĩa trong `@theme {}` block: `--color-primary: #1F7FFE` → tạo ra utility `text-primary`, `bg-primary`, `border-primary`
- Không có file `tailwind.config.js` — cấu hình hoàn toàn trong CSS

### Next.js App Router
- Pages dùng hooks (useLang, useTranslations) phải có `'use client'`
- `metadata` export không thể dùng trong `'use client'` component — chỉ export từ `layout.tsx`
- `suppressHydrationWarning` trên `<html>` là bắt buộc khi dùng next-themes

### Skill dimension icons (SkillDimensions.tsx)
```ts
const SKILL_ICONS = {
  'ai-agents': <Bot />,
  'prompt-eng': <Zap />,
  platform: <Wrench />,
  content: <Film />,
  design: <Sparkles />,
  business: <BarChart3 />,
}
```

### Revenue stream icons (RevenueModel.tsx)
```ts
{ icon: 'CreditCard' } → <CreditCard />
{ icon: 'Package' }    → <Package />
{ icon: 'Star' }       → <Star />
{ icon: 'GraduationCap' } → <GraduationCap />
{ icon: 'Handshake' }  → <Handshake />  // nếu không có thì dùng <Users />
```

---

## Portfolio — Layout & Cấu trúc dữ liệu PROJECTS

### portfolio/page.tsx — Container width
Không dùng `max-w-*`. Dùng `px-14` (56px mỗi bên) để page rộng gần sát lề màn hình.

### SoloFlowsEcosystem.tsx — Featured section
- Section là `w-full` (không có max-w constraint)
- PillarImageSlider: `maxHeight: '300px'`

### ProjectExplorer.tsx — Layout 3 cột
```
sidetab (180px) | image viewer (flex-1, dominant) | info panel (260px)
```
- **Desktop:** 3 cột cứng — image chiếm phần lớn chiều rộng, `maxHeight: '520px'`
- **Mobile:** Stack dọc — sidetab horizontal scroll → image → info
- Nav prev/next chỉ hiện khi project có > 1 ảnh
- Info panel compact: category, title, description, tags (size 9px), note, links

### PROJECTS data shape
```ts
{
  id: string
  category: string;  categoryVi?: string
  title: string;     titleVi?: string
  description: string; descriptionVi?: string
  tags: string[]
  images?: string[]         // đường dẫn từ /public, dùng trong ProjectExplorer
  note?: string;     noteVi?: string
  links?: { label: string; url: string }[]
}
```

Danh sách 6 projects hiện tại (thứ tự = thứ tự sidetab):
1. `ai-movie` — The Scent (1 ảnh)
2. `ai-influencers` — AI Influencer Team (1 ảnh)
3. `social-automation` — Social Publishing Automation (1 ảnh)
4. `asl-automation` — ASL LAW Automation Suite (1 ảnh)
5. `gece-crm` — GECE AI CRM (1 ảnh)
6. `gece-design` — GECE Group Design Portfolio (5 ảnh từ /images/gece/)

`SOLOFLOWS_PILLARS` cũng có `images[]` — dùng trong `SoloFlowsEcosystem.tsx` (PillarImageSlider).

---

## Git History

```
4d53a7e  feat: ProjectExplorer — image dominant layout, compact info panel
102627e  feat: widen portfolio layout, larger pillar images, mobile-responsive explorer
3d6daef  docs: update CLAUDE.md — ProjectExplorer, assets map, git history
3637b10  feat: add image slideshow to Solo Flows pillar cards
8277fc7  feat: 3-column ProjectExplorer, project images, GECE design merged into projects
9248155  docs: add CLAUDE.md — project context for future dev sessions
a5d7bef  feat: add i18n (vi/en), light/dark mode, Lucide icons, social links, influencer section
aca2b4b  feat: initial portfolio — Sazabi dark aesthetic, 3 pages (About/Portfolio/Solo Flows)
```
