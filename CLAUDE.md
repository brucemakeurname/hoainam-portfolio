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
│   ├── project/
│   │   └── page.tsx            # Trang Project (đổi tên từ "Portfolio" — route cũ /portfolio redirect permanent sang /project, xem next.config.ts)
│   ├── creative-library/
│   │   └── page.tsx            # Trang Creative Library — gallery Static Creative + Video, xem chi tiết ở section riêng bên dưới
│   └── solo-flows/
│       └── page.tsx            # Trang Solo Flows (pitch deck)
├── components/
│   ├── layout/
│   │   └── Navigation.tsx      # Navbar: avatar tròn làm logo, VIE/ENG toggle, Sun/Moon toggle, nav links, hamburger menu mobile (md:hidden)
│   ├── home/
│   │   ├── Hero.tsx            # Hero section: avatar, tên, title, social buttons, email+phone
│   │   ├── StatsBar.tsx        # 6 animated counters
│   │   ├── SkillDimensions.tsx # 6 skill cards với Lucide icons, expandable
│   │   └── CareerTimeline.tsx  # Timeline 2020→2025→ (data đã sort newest-first trong data.ts)
│   ├── portfolio/
│   │   ├── SoloFlowsEcosystem.tsx # Featured: 3 pillar cards, mỗi card có image slideshow (maxHeight 300px)
│   │   ├── ProjectExplorer.tsx    # 3-col explorer: sidetab(180px) / image-flex-1 / info(260px)
│   │   ├── ProjectCard.tsx        # (legacy — không còn dùng trong project/page.tsx)
│   │   └── GECEShowcase.tsx       # (legacy — đã gộp vào ProjectExplorer)
│   ├── creative-library/
│   │   ├── CreativeGallery.tsx    # 1 labeled section (vd "UGC"): grid ở md+, carousel 1-hàng auto-slide ở mobile
│   │   ├── MediaCard.tsx          # Thumbnail card (ảnh 1:1 / video 9:16), badges: rating (top-left), duration (top-right), brand + model + language (bottom), title dưới card, slide-in 4 hướng xoay vòng
│   │   └── SingleView.tsx         # Modal xem chi tiết kiểu Instagram — media + caption panel, floating close button
│   ├── solo-flows/
│   │   ├── PitchHero.tsx       # Full-screen hero Solo Flows
│   │   ├── PillarSection.tsx   # Section cho từng pillar (Platform/Agents/CS), ảnh pillar.images[0] nếu có, metrics box ẩn nếu rỗng
│   │   └── SwotGrid.tsx        # SWOT analysis 2x2 grid
│   └── ui/
│       ├── GrainOverlay.tsx    # Film grain overlay (z-index 9999)
│       ├── GlowPanel.tsx       # Blue glow side panels
│       └── AnimatedCounter.tsx # Counter với scroll trigger
├── contexts/
│   └── LanguageContext.tsx     # useLang() hook — lang: 'vi' | 'en', localStorage persist
└── lib/
    ├── data.ts                 # Tất cả data content (bilingual) — About/Portfolio/Solo Flows
    ├── creativeLibrary.ts      # Data cho Creative Library (HANDMADE_CREATIVE, AI_GENERATIVE, COMMERCIAL_VIDEOS, UGC_VIDEOS) — xem section riêng
    └── translations.ts         # UI strings vi/en — useTranslations(lang)

scripts/
└── upload-creative-videos.mjs  # One-off script upload video lên Vercel Blob (xem section Creative Library)
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
tr.nav.{about, portfolio, creativeLibrary, soloFlows, contact}   # portfolio label = "Project"/"Dự Án" (route đã đổi, key giữ nguyên tên cũ)
tr.hero.{role, tagline, downloadCv, email, phone, scrollHint}
tr.stats.{yearsAI, agentsBuilt, platforms, designProjects, growth, tests}
tr.skills.{sectionLabel, categories.{ai-agents, prompt-eng, platform, content, design, business}}
tr.timeline.{sectionLabel}
tr.cta.{viewPortfolio, exploreSF}
tr.portfolio.{sectionLabel, title, subtitle, featured, sfTitle, sfSubtitle, whatItDoes, howBuilt, otherProjects, geceLabel, processLabel, toolsLabel, noImages}   # title = "PROJECT" (đổi từ "PORTFOLIO")
tr.creativeLibrary.{sectionLabel, title, subtitle, staticCreativeLabel, videoLabel, handmadeLabel, aiGenerativeLabel, commercialLabel, ugcLabel, modelLabel, durationLabel, languageLabel, languageVi, languageEn, languageFil, languageNone, close}
tr.soloFlows.{heroTag, heroTagline, overviewLabel, overviewTitle, overviewBody, pillars[], whatItDoes, skillsLabel, metricsLabel, techLabel, namRoleLabel, namRoleTitle, namRoleBody, swotLabel, swotQuadrants.{strengths, weaknesses, opportunities, threats}, companyLabel, influencersLabel, influencersSubtitle, visionLabel, visionTitle, visionBody, visitSite, getInTouch}   # Revenue Model section đã bỏ (trang public, không lộ mô hình doanh thu) — không còn revenueLabel
```

### Bilingual data fields (trong data.ts)

Các array trong `data.ts` có thêm field `*Vi` suffix:
- `titleVi`, `descriptionVi`, `categoryVi`, `noteVi`
- `subtitleVi`, `whatVi`, `howVi`, `metricsVi[]`
- `roleVi`, `bioVi`
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
│   ├── avatar.jpg              # Ảnh đại diện Nam — Hero circle + favicon (metadata.icons trong layout.tsx) + logo tròn trong Navigation
│   ├── bruce.png               # Influencer Bruce (cần thêm nếu chưa có)
│   ├── mylara.jpg              # Influencer Mylara (cần thêm nếu chưa có)
│   ├── gece/
│   │   ├── 1.png
│   │   ├── tot nghiep ko so that nghiep.png
│   │   ├── PA1.png
│   │   ├── 1.2.png
│   │   └── 1_1.png
│   ├── projects/               # Ảnh minh họa từng project (copy từ D:\8. OVERALL PORTFOLIO\project img)
│   │   ├── asl-the-scent.png       → project: ai-movie
│   │   ├── sf-influencer.png       → project: ai-influencers
│   │   ├── sf-multichannel.jpg     → project: social-automation
│   │   ├── make-workflow.png       → project: asl-automation
│   │   ├── gece-crm.jpg            → project: gece-crm
│   │   ├── sf-platform-hero.png    → pillar: platform (SoloFlowsEcosystem)
│   │   ├── sf-booking.png          → pillar: platform
│   │   ├── sf-newfeed.png          → pillar: platform
│   │   ├── sf-explore.png          → pillar: platform
│   │   ├── sf-agents-log.jpg       → pillar: agents
│   │   ├── sf-agents-discord.jpg   → pillar: agents
│   │   └── sf-chatbot.png          → pillar: cs
│   └── creative/                # Ảnh cho Creative Library — xem section riêng bên dưới
│       ├── fnb-promotion-poster.jpg        # AI Generative image
│       ├── cellphones-promotion-ads.jpg    # AI Generative image
│       ├── feature-hero.png                # Banner hero — tạo bằng Codex CLI image_gen, chỉ hiện md+ (ẩn trên mobile)
│       └── *-poster.jpg                    # Poster frame cho từng video (10 file, xem section Creative Library)
└── cv/
    └── CV-Nguyen-Hoai-Nam-2026.pdf   # CHƯA có — cần export và commit
```

### Nguồn ảnh gốc
Ảnh project gốc (chưa rename) nằm tại: `D:\8. OVERALL PORTFOLIO\project img\`
Video gốc cho Creative Library (chưa rename, chưa upload) nằm tại: `libary/` (root project, **không** commit vào git — xem section Creative Library)

---

## Những việc còn lại (TODO)

### Ưu tiên cao
- [ ] **CV PDF:** Export file DOCX → PDF, đặt vào `public/cv/CV-Nguyen-Hoai-Nam-2026.pdf`, commit & push
- [ ] **Avatar influencers:** Thêm ảnh `public/images/bruce.png` và `public/images/mylara.jpg` nếu chưa có
- [ ] **Domain:** Verify `hoainam.com.vn` đã trỏ đúng về Vercel

### Ưu tiên trung bình
- [x] **Avatar Chú Sáu & Khánh Huyền:** ~~Hiện đang hiển thị initial letter~~ — đã crawl ảnh thật từ soloflows.com vào `public/images/soloflows/`
- [x] **Mobile nav:** ~~Navigation chưa có mobile menu~~ — đã thêm hamburger toggle (`Navigation.tsx`), xem git history
- [ ] **SEO metadata:** `project/page.tsx`, `creative-library/page.tsx` và `solo-flows/page.tsx` đã bỏ `metadata` export (vì `'use client'`) — cần tách metadata ra file riêng nếu cần SEO
- [ ] **OG image:** Thêm open graph image để share đẹp trên social

### Tương lai
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

---

## Portfolio — Layout & Cấu trúc dữ liệu PROJECTS

### project/page.tsx — Container width
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

`SOLOFLOWS_PILLARS` cũng có `images[]` — dùng trong `SoloFlowsEcosystem.tsx` (PillarImageSlider, trang /project) và `PillarSection.tsx` (ảnh `images[0]`, trang /solo-flows).

### Solo Flows brand palette (`/solo-flows` page only)

Trang `/solo-flows` dùng bảng màu thương hiệu thật của Solo Flows (crawl từ soloflows.com), khác với theme dark blue/lime của phần còn lại của portfolio. Áp dụng qua object `SOLOFLOWS_THEME` (inline CSS custom properties) trên div gốc của `src/app/solo-flows/page.tsx` — override `--bg/--text/--text-muted/--primary/--accent/--surface/--card-bg/--card-border` chỉ trong phạm vi page này (Navigation ở ngoài div nên không bị ảnh hưởng, vẫn theo theme sáng/tối của site chính):
```
--bg: #FFFAF5 (cream)  --text: #00003D (navy)  --primary: #FFBF00 (gold)  --accent: #2576F8 (blue)
```
Ảnh thật (avatar 4 influencer, ảnh nền tảng Desk, hero banner) đã crawl về `public/images/soloflows/`.

Trang này **không** hiển thị mô hình doanh thu (đã bỏ `RevenueModel.tsx` + `REVENUE_STREAMS`) vì là trang giới thiệu công khai.

---

## Creative Library (`/creative-library`)

Trang gallery bilingual giới thiệu toàn bộ sản phẩm creative của Nam — chia 2 khu vực chính, layout **2 cột** ở desktop (`lg:grid-cols-[1fr_1.3fr]`, cột Video rộng hơn Static): **STATIC CREATIVE** (Hand-made Creative + AI Generative) và **VIDEO** (UGC + Commercial).

### Data — `src/lib/creativeLibrary.ts`

```ts
type CreativeItem = {
  id: string
  type: 'image' | 'video'
  src: string                 // local /public path (ảnh) hoặc Vercel Blob URL (video)
  poster?: string              // poster frame cho video — BẮT BUỘC, browser tự render frame đầu không ổn định trên mobile
  caption: string; captionVi: string
  model: string                 // vd 'Veo 3.1', 'Gemini Omni', 'GPT-Image-2', 'Kling', 'Omni'
  duration?: string             // 'M:SS', chỉ video
  language?: 'vi' | 'en' | 'fil' | 'none'   // ngôn ngữ thoại trong video
  rating?: number                // 1-5, hiện thành sao vàng góc trên-trái card
  brand?: string                 // tên brand/sản phẩm, hiện badge xanh trên card
  title?: string; titleVi?: string   // tiêu đề ngắn hiện dưới card (không cần click vẫn hiểu nội dung)
}

export const HANDMADE_CREATIVE   // 5 ảnh GECE (dùng lại GECE_IMAGES path), brand: 'GECE Group'
export const AI_GENERATIVE       // 2 ảnh AI-generated, model: 'GPT-Image-2'
export const COMMERCIAL_VIDEOS   // 4 video — sắp xếp theo rating giảm dần
export const UGC_VIDEOS          // 6 video — sắp xếp theo rating giảm dần
```

**Khi thêm/sửa item:** luôn set `poster` (không dựa vào browser tự render frame đầu — lỗi phổ biến trên mobile), và nhớ cập nhật cả `title`/`titleVi` để card có context mà không cần click.

### Video hosting — Vercel Blob

Video quá nặng (tổng ~250MB, 1 file 102MB) để commit vào git/serve từ `public/`. Đã tạo Blob store `creative-library` (id `store_kWRNSsd2wLPGMI3q`) gắn với project, token `BLOB_READ_WRITE_TOKEN` đã set trong `.env.local` (gitignored) và trong Vercel project env vars.

**Quy trình thêm video mới:**
1. Copy file gốc vào `libary/` (thư mục gốc project, gitignored, KHÔNG commit)
2. Thêm entry vào `scripts/upload-creative-videos.mjs` (mảng `VIDEOS`: `{ slug, file }`)
3. Chạy `node --env-file=.env.local scripts/upload-creative-videos.mjs` → in ra URL Blob, ghi vào `scripts/creative-video-urls.json` (gitignored, chỉ dùng tạm để copy URL)
4. Paste URL thật vào `src/lib/creativeLibrary.ts` (field `src`)
5. Tạo poster: `ffmpeg -y -ss <giây> -i "libary/<file>" -frames:v 1 -q:v 3 "public/images/creative/<slug>-poster.jpg"`, set field `poster`

### MediaCard — badge layout

```
┌─────────────────────┐
│ ★★★★★         0:32  │  ← rating (top-left) / duration (top-right)
│                      │
│     [ảnh/video]      │
│                      │
│  [BRAND]             │  ← brand badge (nếu có), nền var(--primary)
│  MODEL   LANGUAGE     │  ← model + language pill
└─────────────────────┘
  Title ngắn dưới card     ← title/titleVi, luôn hiện không cần click
```

- Aspect ratio: ảnh `1:1`, video `9:16` — set động theo `item.type` trong `MediaCard.tsx`
- Double-bezel: outer shell (`rounded-2xl p-1`, `var(--surface)`) bọc inner card (`rounded-xl`)
- Entrance animation: slide-in xoay vòng 4 hướng (trái/lên/phải/xuống) theo `index % 4` — đảm bảo 4 card liên tiếp không trùng hướng, duration 1s

### Mobile-specific (khác biệt so với desktop)
- Mỗi `CreativeGallery` (Hand-made/AI Generative/UGC/Commercial) là **carousel 1 hàng** cuộn ngang + snap, auto-slide mỗi ~3.2s (`CreativeGallery.tsx`, dùng `window.matchMedia('(max-width: 767px)')` để chỉ chạy dưới `md`). Từ `md:` trở lên revert về grid tĩnh.
- Background trang trí (feature-hero.png, grid-bg pattern, ambient glow, GlowPanel 2 bên) **ẩn hoàn toàn dưới `md:`** — chỉ desktop mới thấy, tránh rối mắt trên màn nhỏ.
- Padding trang giảm `px-14 → px-4` dưới `md:`.

### SingleView (modal chi tiết kiểu Instagram)
- Layout: `flex-col md:flex-row` — media trên, caption panel dưới (mobile) / media trái, caption phải (desktop)
- **Floating close button** (`fixed top-4 right-4`, ngoài card) — bắt buộc phải có, vì trên mobile media 9:16 rất cao, nút X trong caption panel bị đẩy xuống rất xa nếu không có nút nổi riêng
- Caption panel hiện: brand badge → title → model → rating (sao) → duration/language → caption đầy đủ → icon like/comment/send (chỉ trang trí, KHÔNG có logic thật)
- Video autoplay + muted + loop + `controls`; poster attribute dùng chung field với MediaCard

### Feature hero image
`public/images/creative/feature-hero.png` — tạo bằng **Codex CLI** (`codex exec` với `image_gen` tool, feature `image_generation` phải bật — check bằng `codex features list`). File được Codex sinh ra nằm ở `~/.codex/generated_images/`, phải tự copy thủ công vào `public/` (Codex chạy sandbox read-only, không tự ghi được vào repo).

---

## Git History

```
5566306  fix: video thumbnails missing on mobile + unreachable modal close button
de25567  fix: make Creative Library mobile-friendly
8daf2d8  feat: add AI-generated feature hero image to Creative Library
703fb56  fix: add mobile hamburger menu to Navigation
e14e7fd  feat: add brand/product tag and title captions to Creative Library videos
da232c1  feat: add star-rating badge to Creative Library videos
7272c5b  feat: Creative Library polish — nav avatar logo, hero-style bg, layout fixes
1747ec0  style: elevate Creative Library to Ethereal Glass premium treatment
64a2490  feat: add duration + spoken-language badges to Creative Library videos
c001196  content: expand Creative Library subtitle to detail creative + AI model experience
e9628cb  fix: reclassify construction-timelapse video from UGC to Commercial
54d219b  style: redesign Creative Library gallery — 2-column layout, type-aware aspect ratios, entrance animations
cdad61e  feat: rename Portfolio route to Project, add /portfolio redirect
f1b9910  feat: add Creative Library page and wire up navigation
48acb4e  feat: add SingleView Instagram-style modal component
6958fb2  feat: add CreativeGallery labeled grid section component
9090f49  feat: add MediaCard gallery thumbnail component
b02bfb4  feat: add Creative Library data (handmade, AI generative, commercial, UGC)
040552f  feat: add Creative Library and Project rename translations
62e3ae8  feat: add AI-generative creative images to public assets
d4d2533  chore: add Vercel Blob upload script for creative library videos
4d53a7e  feat: ProjectExplorer — image dominant layout, compact info panel
102627e  feat: widen portfolio layout, larger pillar images, mobile-responsive explorer
3d6daef  docs: update CLAUDE.md — ProjectExplorer, assets map, git history
3637b10  feat: add image slideshow to Solo Flows pillar cards
8277fc7  feat: 3-column ProjectExplorer, project images, GECE design merged into projects
9248155  docs: add CLAUDE.md — project context for future dev sessions
a5d7bef  feat: add i18n (vi/en), light/dark mode, Lucide icons, social links, influencer section
aca2b4b  feat: initial portfolio — Sazabi dark aesthetic, 3 pages (About/Portfolio/Solo Flows)
```
