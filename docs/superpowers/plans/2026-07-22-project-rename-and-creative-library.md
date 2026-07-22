# Project Rename + Creative Library Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rename the "Portfolio" page to "Project" (`/portfolio` → `/project` with redirect), and add a new bilingual "Creative Library" gallery page (`/creative-library`) showcasing static creative and video work with an Instagram-style single-item modal view.

**Architecture:** Next.js 16 App Router, client components (`'use client'`) using existing `useLang`/`useTranslations` i18n pattern and CSS-variable theming. Videos are hosted on Vercel Blob (too large for git); a one-off Node script uploads them and writes their public URLs to a JSON file that the data layer imports. Images are small enough to commit directly to `public/`.

**Tech Stack:** Next.js 16, TypeScript, Tailwind v4, Framer Motion, lucide-react, `@vercel/blob` (new dependency, upload script only — not used at runtime).

## Global Constraints

- Follow existing i18n pattern exactly: `useLang()` + `useTranslations(lang)`, bilingual data fields use `*Vi` suffix or paired `caption`/`captionVi` keys (per spec).
- Follow existing CSS-variable theming (`var(--bg)`, `var(--text)`, `var(--card-border)`, etc.) — no hardcoded colors.
- No test framework exists in this repo (verified: no jest/vitest in `package.json`). Verification uses `npx tsc --noEmit`, `npm run build`, and manual dev-server checks instead of automated tests.
- No real like/comment/share functionality — decorative UI only, per spec.
- No per-item shareable URL — modal overlay only, no route change on item click, per spec.
- `/portfolio` must redirect (not 404) to `/project` after the rename, per spec.
- Video model attributions (exact, per spec):
  - Commercial: `Be -TVC.mp4`, `coca-cola-tvc.mp4` → **Gemini Omni**
  - UGC default: **Veo 3.1** — applies to `Ads-Gentadox-nanoshield.mp4`, `Colgate-UGC.mp4`, `Feb_04__1428_15s_202602041733_laf5f.mp4`, `The_mans_sweating_202602041453_adw0j.mp4`, `construction_timelapse.mp4`, `gucci_dress_ugc.mp4`
  - UGC exceptions: `UGC-new-gym-experience.mp4` → **Omni**, `kling_20260211_Motion_Control__5673_0.mp4` → **Kling**
  - AI Generative images: `F&B promotion poster.jpg`, `Cellphones-promotion-ads.jpg` → **GPT-Image-2**

---

### Task 1: Add `@vercel/blob` dependency and write the video upload script

**Files:**
- Modify: `package.json` (add dependency)
- Create: `scripts/upload-creative-videos.mjs`

**Interfaces:**
- Produces: `scripts/creative-video-urls.json` (written when the script is run) — a flat object `{ [slug: string]: string }` mapping each video slug to its public Blob URL. Task 4 (data file) imports this JSON.

- [ ] **Step 1: Install the dependency**

Run: `npm install @vercel/blob`
Expected: `package.json` and `package-lock.json` updated, install succeeds with no errors.

- [ ] **Step 2: Write the upload script**

Create `scripts/upload-creative-videos.mjs`:

```js
import { put } from '@vercel/blob'
import { readFile, writeFile } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import path from 'node:path'

const VIDEOS = [
  { slug: 'be-tvc', file: 'Be -TVC.mp4' },
  { slug: 'coca-cola-tvc', file: 'coca-cola-tvc.mp4' },
  { slug: 'ads-gentadox-nanoshield', file: 'Ads-Gentadox-nanoshield.mp4' },
  { slug: 'colgate-ugc', file: 'Colgate-UGC.mp4' },
  { slug: 'feb-04-1428-15s', file: 'Feb_04__1428_15s_202602041733_laf5f.mp4' },
  { slug: 'the-mans-sweating', file: 'The_mans_sweating_202602041453_adw0j.mp4' },
  { slug: 'construction-timelapse', file: 'construction_timelapse.mp4' },
  { slug: 'gucci-dress-ugc', file: 'gucci_dress_ugc.mp4' },
  { slug: 'ugc-new-gym-experience', file: 'UGC-new-gym-experience.mp4' },
  { slug: 'kling-motion-control', file: 'kling_20260211_Motion_Control__5673_0.mp4' },
]

const LIBRARY_DIR = path.join(process.cwd(), 'libary')
const OUTPUT_FILE = path.join(process.cwd(), 'scripts', 'creative-video-urls.json')

async function main() {
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    console.error('Missing BLOB_READ_WRITE_TOKEN in environment. Run `vercel env pull .env.local` after creating a Blob store, then re-run with that token loaded.')
    process.exit(1)
  }

  const urls = {}

  for (const { slug, file } of VIDEOS) {
    const filePath = path.join(LIBRARY_DIR, file)
    if (!existsSync(filePath)) {
      console.error(`Missing source file: ${filePath}`)
      process.exit(1)
    }
    const buffer = await readFile(filePath)
    console.log(`Uploading ${file} -> creative/${slug}.mp4 ...`)
    const blob = await put(`creative/${slug}.mp4`, buffer, {
      access: 'public',
      addRandomSuffix: false,
      token: process.env.BLOB_READ_WRITE_TOKEN,
    })
    urls[slug] = blob.url
    console.log(`  -> ${blob.url}`)
  }

  await writeFile(OUTPUT_FILE, JSON.stringify(urls, null, 2))
  console.log(`\nWrote ${Object.keys(urls).length} URLs to ${OUTPUT_FILE}`)
}

main()
```

- [ ] **Step 3: Verify the script fails cleanly without a token**

Run: `node scripts/upload-creative-videos.mjs`
Expected: exits with the "Missing BLOB_READ_WRITE_TOKEN" message and exit code 1 (confirms the script loads and runs without syntax errors).

- [ ] **Step 4: Commit**

```bash
git add package.json package-lock.json scripts/upload-creative-videos.mjs
git commit -m "chore: add Vercel Blob upload script for creative library videos"
```

---

### Task 2: Set up the Vercel Blob store and run the upload (manual, requires user)

This task requires interactive login and cannot be automated by the agent — flag it to the user and wait.

**Files:** none (produces `scripts/creative-video-urls.json`, not committed — it's an intermediate artifact; its contents get copied into `src/lib/creativeLibrary.ts` in Task 4).

- [ ] **Step 1: Ask the user to authenticate and link the project**

Ask the user to run in their own terminal (suggest via `! vercel login` in chat if using Claude Code):

```bash
vercel login
vercel link
```

- [ ] **Step 2: Ask the user to create a Blob store**

Direct the user to the Vercel Dashboard → their project → Storage tab → Create Database → Blob → create a store and connect it to this project. (CLI blob subcommands were unreliable when checked during planning — use the dashboard.)

- [ ] **Step 3: Pull the token locally**

```bash
vercel env pull .env.local
```

Expected: `.env.local` now contains `BLOB_READ_WRITE_TOKEN=...`. Confirm `.env.local` is in `.gitignore` (it already is per CLAUDE.md's security notes — do not commit it).

- [ ] **Step 4: Run the upload script**

```bash
node --env-file=.env.local scripts/upload-creative-videos.mjs
```

Expected: 10 "Uploading ... -> ..." log lines, then "Wrote 10 URLs to scripts/creative-video-urls.json". This step uploads ~250MB total; it may take several minutes depending on connection speed.

- [ ] **Step 5: Confirm the output file**

Run: `cat scripts/creative-video-urls.json` (or `Read` the file)
Expected: JSON object with exactly these 10 keys: `be-tvc`, `coca-cola-tvc`, `ads-gentadox-nanoshield`, `colgate-ugc`, `feb-04-1428-15s`, `the-mans-sweating`, `construction-timelapse`, `gucci-dress-ugc`, `ugc-new-gym-experience`, `kling-motion-control` — each value a `https://*.public.blob.vercel-storage.com/...` URL.

No commit in this task (the JSON file is a local intermediate input for Task 4; add `scripts/creative-video-urls.json` to `.gitignore` in Task 4 since it contains environment-specific Blob URLs that should live in the data file, not be duplicated as a tracked artifact).

---

### Task 3: Add the AI Generative images to `public/`

**Files:**
- Create: `public/images/creative/fnb-promotion-poster.jpg` (copied from `libary/F&B promotion poster.jpg`)
- Create: `public/images/creative/cellphones-promotion-ads.jpg` (copied from `libary/Cellphones-promotion-ads.jpg`)

- [ ] **Step 1: Create the directory and copy the files**

```bash
mkdir -p public/images/creative
cp "libary/F&B promotion poster.jpg" "public/images/creative/fnb-promotion-poster.jpg"
cp "libary/Cellphones-promotion-ads.jpg" "public/images/creative/cellphones-promotion-ads.jpg"
```

- [ ] **Step 2: Verify**

Run: `ls -la public/images/creative/`
Expected: both files present, non-zero size (444126 and 515652 bytes respectively).

- [ ] **Step 3: Commit**

```bash
git add public/images/creative/
git commit -m "feat: add AI-generative creative images to public assets"
```

---

### Task 4: Add translations for nav + Creative Library page

**Files:**
- Modify: `src/lib/translations.ts`

**Interfaces:**
- Produces: `tr.nav.creativeLibrary: string`, `tr.creativeLibrary.{sectionLabel, title, subtitle, staticCreativeLabel, videoLabel, handmadeLabel, aiGenerativeLabel, commercialLabel, ugcLabel, modelLabel, close}: string` — consumed by Task 6 (page) and Task 8 (SingleView).
- Also updates `tr.nav.portfolio` (EN value) and `tr.portfolio.title` (both locales) for the Project rename (Task 9 consumes these).

- [ ] **Step 1: Update nav + portfolio title strings, and add `creativeLibrary` key to the `vi` block**

In `src/lib/translations.ts`, inside the `vi.nav` object (around line 6-10), add a `creativeLibrary` key after `portfolio`:

```ts
    nav: {
      about: 'Về Tôi',
      portfolio: 'Dự Án',
      creativeLibrary: 'Thư Viện Sáng Tạo',
      soloFlows: 'Solo Flows',
      contact: 'Liên Hệ',
    },
```

In the `vi.portfolio` block (around line 45-59), change `title` from `'PORTFOLIO'` to `'PROJECT'`:

```ts
    portfolio: {
      sectionLabel: '01 · Dự Án',
      title: 'PROJECT',
```

(leave the rest of that block unchanged)

- [ ] **Step 2: Add the `vi.creativeLibrary` block**

Immediately after the `vi.soloFlows` block closes (after line 93, before the closing `},` of the `vi` object around line 94), add:

```ts
    creativeLibrary: {
      sectionLabel: '// Thư Viện Sáng Tạo',
      title: 'CREATIVE LIBRARY',
      subtitle: 'Toàn bộ sản phẩm sáng tạo — từ thiết kế thủ công đến AI Generative, TVC đến UGC.',
      staticCreativeLabel: 'STATIC CREATIVE',
      videoLabel: 'VIDEO',
      handmadeLabel: 'Sản Phẩm Thủ Công',
      aiGenerativeLabel: 'AI Generative',
      commercialLabel: 'Quảng Cáo (Commercial)',
      ugcLabel: 'UGC',
      modelLabel: 'Model AI',
      close: 'Đóng',
    },
```

- [ ] **Step 3: Update the `en` block the same way**

In `en.nav` (around line 97-102), add `creativeLibrary`:

```ts
    nav: {
      about: 'About',
      portfolio: 'Project',
      creativeLibrary: 'Creative Library',
      soloFlows: 'Solo Flows',
      contact: 'Contact',
    },
```

In `en.portfolio` (around line 137-151), change `title` from `'PORTFOLIO'` to `'PROJECT'`:

```ts
    portfolio: {
      sectionLabel: '01 · Projects',
      title: 'PROJECT',
```

After the `en.soloFlows` block closes (after line 185, before the closing `},` of the `en` object around line 186), add:

```ts
    creativeLibrary: {
      sectionLabel: '// Creative Library',
      title: 'CREATIVE LIBRARY',
      subtitle: 'The full body of creative work — from hand-made design to AI Generative, TVC to UGC.',
      staticCreativeLabel: 'STATIC CREATIVE',
      videoLabel: 'VIDEO',
      handmadeLabel: 'Hand-made Creative',
      aiGenerativeLabel: 'AI Generative',
      commercialLabel: 'Commercial',
      ugcLabel: 'UGC',
      modelLabel: 'AI Model',
      close: 'Close',
    },
```

- [ ] **Step 4: Type-check**

Run: `npx tsc --noEmit`
Expected: no errors (the `Translations` type is inferred from the `en` object via `typeof t['en']`, so both locales must have matching shapes — a mismatch here would surface as a TS error wherever `tr.creativeLibrary` or `tr.nav.creativeLibrary` is used later; at this point in the plan nothing consumes them yet, so this check just confirms the file itself is syntactically valid).

- [ ] **Step 5: Commit**

```bash
git add src/lib/translations.ts
git commit -m "feat: add Creative Library and Project rename translations"
```

---

### Task 5: Create the Creative Library data file

**Files:**
- Create: `src/lib/creativeLibrary.ts`

**Interfaces:**
- Produces: `type CreativeItem = { id: string; type: 'image' | 'video'; src: string; caption: string; captionVi: string; model: string }` and four exported arrays: `HANDMADE_CREATIVE`, `AI_GENERATIVE`, `COMMERCIAL_VIDEOS`, `UGC_VIDEOS` (all `CreativeItem[]`) — consumed by Task 6 (page) and Task 7 (MediaCard/CreativeGallery).
- Consumes: the Blob URLs from `scripts/creative-video-urls.json` (produced in Task 2) — paste the literal URL strings in, don't import the JSON at runtime (keeps the shipped bundle independent of a build-time file that isn't committed).

- [ ] **Step 1: Read the Blob URLs**

Run: `cat scripts/creative-video-urls.json` (or `Read` the file) and keep the 10 URLs on hand for the next step.

- [ ] **Step 2: Write the data file**

Create `src/lib/creativeLibrary.ts` (replace `<BLOB_URL:slug>` placeholders below with the real URLs read in Step 1 — every entry must have a real URL, not the placeholder text):

```ts
export type CreativeItem = {
  id: string
  type: 'image' | 'video'
  src: string
  caption: string
  captionVi: string
  model: string
}

export const HANDMADE_CREATIVE: CreativeItem[] = [
  {
    id: 'gece-1',
    type: 'image',
    src: '/images/gece/1.png',
    caption: 'GECE Group brand identity design piece.',
    captionVi: 'Thiết kế nhận diện thương hiệu GECE Group.',
    model: 'Photoshop, Illustrator + AI',
  },
  {
    id: 'gece-tot-nghiep',
    type: 'image',
    src: '/images/gece/tot nghiep ko so that nghiep.png',
    caption: '"Tốt nghiệp không sợ thất nghiệp" campaign key visual.',
    captionVi: 'Key visual chiến dịch "Tốt nghiệp không sợ thất nghiệp".',
    model: 'Photoshop, Illustrator + AI',
  },
  {
    id: 'gece-pa1',
    type: 'image',
    src: '/images/gece/PA1.png',
    caption: 'GECE Group advertising key visual.',
    captionVi: 'Key visual quảng cáo GECE Group.',
    model: 'Photoshop, Illustrator + AI',
  },
  {
    id: 'gece-1-2',
    type: 'image',
    src: '/images/gece/1.2.png',
    caption: 'GECE Group editorial design piece.',
    captionVi: 'Thiết kế editorial GECE Group.',
    model: 'Photoshop, Illustrator + AI',
  },
  {
    id: 'gece-1-1',
    type: 'image',
    src: '/images/gece/1_1.png',
    caption: 'GECE Group event material design.',
    captionVi: 'Thiết kế tài liệu sự kiện GECE Group.',
    model: 'Photoshop, Illustrator + AI',
  },
]

export const AI_GENERATIVE: CreativeItem[] = [
  {
    id: 'ai-fnb-poster',
    type: 'image',
    src: '/images/creative/fnb-promotion-poster.jpg',
    caption: 'F&B promotion poster generated end-to-end by an AI agent pipeline.',
    captionVi: 'Poster quảng cáo F&B do hệ thống AI Agent tạo hoàn chỉnh.',
    model: 'GPT-Image-2',
  },
  {
    id: 'ai-cellphones-ads',
    type: 'image',
    src: '/images/creative/cellphones-promotion-ads.jpg',
    caption: 'Cellphone store promotional ad generated by AI agents.',
    captionVi: 'Ảnh quảng cáo cửa hàng điện thoại do AI Agent tạo.',
    model: 'GPT-Image-2',
  },
]

export const COMMERCIAL_VIDEOS: CreativeItem[] = [
  {
    id: 'commercial-be-tvc',
    type: 'video',
    src: '<BLOB_URL:be-tvc>',
    caption: "TVC-style commercial spot for 'Bé' produced with AI video generation.",
    captionVi: "TVC quảng cáo cho 'Bé' sản xuất bằng AI video.",
    model: 'Gemini Omni',
  },
  {
    id: 'commercial-coca-cola-tvc',
    type: 'video',
    src: '<BLOB_URL:coca-cola-tvc>',
    caption: 'Coca-Cola style commercial concept spot generated end-to-end with AI video.',
    captionVi: 'TVC concept phong cách Coca-Cola được tạo hoàn toàn bằng AI video.',
    model: 'Gemini Omni',
  },
]

export const UGC_VIDEOS: CreativeItem[] = [
  {
    id: 'ugc-ads-gentadox-nanoshield',
    type: 'video',
    src: '<BLOB_URL:ads-gentadox-nanoshield>',
    caption: 'Gentadox Nanoshield product ad — UGC-style AI-generated spot.',
    captionVi: 'Quảng cáo sản phẩm Gentadox Nanoshield — video UGC do AI tạo.',
    model: 'Veo 3.1',
  },
  {
    id: 'ugc-colgate',
    type: 'video',
    src: '<BLOB_URL:colgate-ugc>',
    caption: 'Colgate UGC-style ad concept generated with AI video.',
    captionVi: 'Concept quảng cáo UGC cho Colgate do AI tạo.',
    model: 'Veo 3.1',
  },
  {
    id: 'ugc-feb-04',
    type: 'video',
    src: '<BLOB_URL:feb-04-1428-15s>',
    caption: 'AI-generated UGC concept clip.',
    captionVi: 'Clip UGC concept do AI tạo.',
    model: 'Veo 3.1',
  },
  {
    id: 'ugc-mans-sweating',
    type: 'video',
    src: '<BLOB_URL:the-mans-sweating>',
    caption: 'AI-generated UGC lifestyle clip.',
    captionVi: 'Clip UGC lifestyle do AI tạo.',
    model: 'Veo 3.1',
  },
  {
    id: 'ugc-construction-timelapse',
    type: 'video',
    src: '<BLOB_URL:construction-timelapse>',
    caption: 'AI-generated construction timelapse concept.',
    captionVi: 'Clip timelapse công trình do AI tạo.',
    model: 'Veo 3.1',
  },
  {
    id: 'ugc-gucci-dress',
    type: 'video',
    src: '<BLOB_URL:gucci-dress-ugc>',
    caption: 'Gucci dress UGC-style fashion concept generated with AI video.',
    captionVi: 'Concept UGC thời trang váy Gucci do AI tạo.',
    model: 'Veo 3.1',
  },
  {
    id: 'ugc-new-gym-experience',
    type: 'video',
    src: '<BLOB_URL:ugc-new-gym-experience>',
    caption: 'New gym experience UGC concept clip.',
    captionVi: 'Clip UGC trải nghiệm phòng gym mới.',
    model: 'Omni',
  },
  {
    id: 'ugc-kling-motion-control',
    type: 'video',
    src: '<BLOB_URL:kling-motion-control>',
    caption: 'Motion-control UGC concept clip generated with Kling.',
    captionVi: 'Clip UGC motion-control tạo bằng Kling.',
    model: 'Kling',
  },
]
```

- [ ] **Step 3: Replace the placeholders**

Replace every `<BLOB_URL:slug>` with the matching real URL from `scripts/creative-video-urls.json` (e.g. `<BLOB_URL:be-tvc>` → the value of the `be-tvc` key). Use Edit, one `replace_all` per slug, to avoid missing any.

- [ ] **Step 4: Verify no placeholders remain**

Run: `grep -c "BLOB_URL" src/lib/creativeLibrary.ts`
Expected: `0` (grep returns exit code 1 and prints nothing/`0` when there are no matches — confirm the command reports zero matches).

- [ ] **Step 5: Type-check**

Run: `npx tsc --noEmit`
Expected: no errors.

- [ ] **Step 6: Add the intermediate JSON to `.gitignore` and commit**

Add this line to `.gitignore`:
```
scripts/creative-video-urls.json
```

```bash
git add src/lib/creativeLibrary.ts .gitignore
git commit -m "feat: add Creative Library data (handmade, AI generative, commercial, UGC)"
```

---

### Task 6: Build `MediaCard` (gallery thumbnail component)

**Files:**
- Create: `src/components/creative-library/MediaCard.tsx`

**Interfaces:**
- Consumes: `CreativeItem` from `@/lib/creativeLibrary` (Task 5).
- Produces: `MediaCard({ item, onClick }: { item: CreativeItem; onClick: () => void }): JSX.Element` — consumed by Task 7 (`CreativeGallery`).

- [ ] **Step 1: Write the component**

Create `src/components/creative-library/MediaCard.tsx`:

```tsx
'use client'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Play } from 'lucide-react'
import type { CreativeItem } from '@/lib/creativeLibrary'

export function MediaCard({ item, onClick }: { item: CreativeItem; onClick: () => void }) {
  return (
    <motion.button
      onClick={onClick}
      className="relative w-full overflow-hidden group text-left"
      style={{ aspectRatio: '4 / 5', border: '1px solid var(--card-border)', background: 'var(--card-bg)' }}
      whileHover={{ scale: 0.98 }}
      transition={{ duration: 0.2 }}
    >
      {item.type === 'image' ? (
        <Image
          src={item.src}
          alt={item.caption}
          fill
          className="object-cover"
          unoptimized
        />
      ) : (
        <>
          <video
            src={item.src}
            className="w-full h-full object-cover"
            muted
            playsInline
            preload="metadata"
          />
          <div
            className="absolute inset-0 flex items-center justify-center transition-opacity group-hover:opacity-100 opacity-70"
            style={{ background: 'rgba(0,0,0,0.15)' }}
          >
            <Play size={28} color="#fff" fill="#fff" />
          </div>
        </>
      )}
      <div
        className="absolute bottom-0 left-0 right-0 px-2.5 py-1.5 text-[9px] font-mono uppercase tracking-[1px] opacity-0 group-hover:opacity-100 transition-opacity"
        style={{ background: 'rgba(0,0,0,0.65)', color: '#fff' }}
      >
        {item.model}
      </div>
    </motion.button>
  )
}
```

- [ ] **Step 2: Type-check**

Run: `npx tsc --noEmit`
Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/creative-library/MediaCard.tsx
git commit -m "feat: add MediaCard gallery thumbnail component"
```

---

### Task 7: Build `CreativeGallery` (labeled grid section)

**Files:**
- Create: `src/components/creative-library/CreativeGallery.tsx`

**Interfaces:**
- Consumes: `CreativeItem` from `@/lib/creativeLibrary` (Task 5), `MediaCard` from `@/components/creative-library/MediaCard` (Task 6).
- Produces: `CreativeGallery({ label, items, onSelect }: { label: string; items: CreativeItem[]; onSelect: (item: CreativeItem) => void }): JSX.Element` — consumed by Task 9 (page).

- [ ] **Step 1: Write the component**

Create `src/components/creative-library/CreativeGallery.tsx`:

```tsx
'use client'
import { MediaCard } from './MediaCard'
import type { CreativeItem } from '@/lib/creativeLibrary'

export function CreativeGallery({
  label,
  items,
  onSelect,
}: {
  label: string
  items: CreativeItem[]
  onSelect: (item: CreativeItem) => void
}) {
  return (
    <div className="mb-12">
      <p
        className="text-[9px] font-mono uppercase tracking-[3px] mb-4"
        style={{ color: 'var(--text-muted)' }}
      >
        {label}
      </p>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
        {items.map((item) => (
          <MediaCard key={item.id} item={item} onClick={() => onSelect(item)} />
        ))}
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Type-check**

Run: `npx tsc --noEmit`
Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/creative-library/CreativeGallery.tsx
git commit -m "feat: add CreativeGallery labeled grid section component"
```

---

### Task 8: Build `SingleView` (Instagram-style modal)

**Files:**
- Create: `src/components/creative-library/SingleView.tsx`

**Interfaces:**
- Consumes: `CreativeItem` from `@/lib/creativeLibrary` (Task 5); `useLang` from `@/contexts/LanguageContext`; `useTranslations` from `@/lib/translations` (Task 4's `tr.creativeLibrary.modelLabel` / `tr.creativeLibrary.close`).
- Produces: `SingleView({ item, onClose }: { item: CreativeItem | null; onClose: () => void }): JSX.Element` — consumed by Task 9 (page).

- [ ] **Step 1: Write the component**

Create `src/components/creative-library/SingleView.tsx`:

```tsx
'use client'
import Image from 'next/image'
import { AnimatePresence, motion } from 'framer-motion'
import { X, Heart, MessageCircle, Send } from 'lucide-react'
import { useLang } from '@/contexts/LanguageContext'
import { useTranslations } from '@/lib/translations'
import type { CreativeItem } from '@/lib/creativeLibrary'

export function SingleView({ item, onClose }: { item: CreativeItem | null; onClose: () => void }) {
  const { lang } = useLang()
  const tr = useTranslations(lang)

  return (
    <AnimatePresence>
      {item && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10"
          style={{ background: 'rgba(0,0,0,0.85)' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="flex flex-col md:flex-row w-full max-w-4xl max-h-full overflow-hidden"
            style={{ background: 'var(--bg)', border: '1px solid var(--card-border)' }}
            initial={{ scale: 0.96, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.96, opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Media */}
            <div className="flex-1 min-w-0 flex items-center justify-center" style={{ background: '#000' }}>
              {item.type === 'image' ? (
                <Image
                  src={item.src}
                  alt={item.caption}
                  width={1200}
                  height={1500}
                  className="w-full h-auto max-h-[80vh]"
                  style={{ objectFit: 'contain' }}
                  unoptimized
                />
              ) : (
                <video
                  src={item.src}
                  className="w-full h-auto max-h-[80vh]"
                  autoPlay
                  muted
                  loop
                  playsInline
                  controls
                />
              )}
            </div>

            {/* Caption column */}
            <div className="w-full md:w-[280px] shrink-0 p-5 flex flex-col gap-5" style={{ borderLeft: '1px solid var(--card-border)' }}>
              <div className="flex items-center justify-between">
                <p className="text-[9px] font-mono uppercase tracking-[3px]" style={{ color: 'var(--primary)' }}>
                  {tr.creativeLibrary.modelLabel}
                </p>
                <button onClick={onClose} aria-label={tr.creativeLibrary.close} style={{ color: 'var(--text-muted)' }}>
                  <X size={16} />
                </button>
              </div>

              <p className="text-sm font-bold" style={{ color: 'var(--text)' }}>{item.model}</p>

              <p className="text-xs leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                {lang === 'vi' ? item.captionVi : item.caption}
              </p>

              {/* Decorative, non-functional — matches Instagram single-post aesthetic */}
              <div className="flex items-center gap-4 mt-auto pt-4" style={{ borderTop: '1px solid var(--card-border)' }}>
                <Heart size={16} style={{ color: 'var(--text-muted)' }} />
                <MessageCircle size={16} style={{ color: 'var(--text-muted)' }} />
                <Send size={16} style={{ color: 'var(--text-muted)' }} />
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
```

- [ ] **Step 2: Type-check**

Run: `npx tsc --noEmit`
Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/creative-library/SingleView.tsx
git commit -m "feat: add SingleView Instagram-style modal component"
```

---

### Task 9: Build the Creative Library page and wire up navigation

**Files:**
- Create: `src/app/creative-library/page.tsx`
- Modify: `src/components/layout/Navigation.tsx:20-24` (add nav link)

**Interfaces:**
- Consumes: `HANDMADE_CREATIVE`, `AI_GENERATIVE`, `COMMERCIAL_VIDEOS`, `UGC_VIDEOS`, `CreativeItem` from `@/lib/creativeLibrary` (Task 5); `CreativeGallery` (Task 7); `SingleView` (Task 8); `tr.creativeLibrary.*` (Task 4).

- [ ] **Step 1: Write the page**

Create `src/app/creative-library/page.tsx`:

```tsx
'use client'
import { useState } from 'react'
import { useLang } from '@/contexts/LanguageContext'
import { useTranslations } from '@/lib/translations'
import { CreativeGallery } from '@/components/creative-library/CreativeGallery'
import { SingleView } from '@/components/creative-library/SingleView'
import {
  HANDMADE_CREATIVE,
  AI_GENERATIVE,
  COMMERCIAL_VIDEOS,
  UGC_VIDEOS,
  type CreativeItem,
} from '@/lib/creativeLibrary'

export default function CreativeLibraryPage() {
  const { lang } = useLang()
  const tr = useTranslations(lang)
  const [selected, setSelected] = useState<CreativeItem | null>(null)

  return (
    <div className="pt-24 pb-16" style={{ background: 'var(--bg)' }}>
      <div className="px-14 mb-16">
        <p className="text-[10px] tracking-[4px] font-mono uppercase mb-4" style={{ color: 'var(--primary)' }}>
          {tr.creativeLibrary.sectionLabel}
        </p>
        <h1 className="text-5xl font-black chroma" style={{ color: 'var(--text)' }}>
          {tr.creativeLibrary.title}
        </h1>
        <p className="text-sm mt-4 max-w-xl" style={{ color: 'var(--text-muted)' }}>
          {tr.creativeLibrary.subtitle}
        </p>
      </div>

      <div className="px-14">
        <h2 className="text-xl font-black mb-6" style={{ color: 'var(--text)' }}>
          {tr.creativeLibrary.staticCreativeLabel}
        </h2>
        <CreativeGallery label={tr.creativeLibrary.handmadeLabel} items={HANDMADE_CREATIVE} onSelect={setSelected} />
        <CreativeGallery label={tr.creativeLibrary.aiGenerativeLabel} items={AI_GENERATIVE} onSelect={setSelected} />
      </div>

      <div className="px-14 mt-8">
        <h2 className="text-xl font-black mb-6" style={{ color: 'var(--text)' }}>
          {tr.creativeLibrary.videoLabel}
        </h2>
        <CreativeGallery label={tr.creativeLibrary.commercialLabel} items={COMMERCIAL_VIDEOS} onSelect={setSelected} />
        <CreativeGallery label={tr.creativeLibrary.ugcLabel} items={UGC_VIDEOS} onSelect={setSelected} />
      </div>

      <SingleView item={selected} onClose={() => setSelected(null)} />
    </div>
  )
}
```

- [ ] **Step 2: Add the nav link**

In `src/components/layout/Navigation.tsx`, update the `NAV_LINKS` array (currently lines 20-24):

```tsx
  const NAV_LINKS = [
    { href: '/', label: tr.nav.about },
    { href: '/project', label: tr.nav.portfolio },
    { href: '/creative-library', label: tr.nav.creativeLibrary },
    { href: '/solo-flows', label: tr.nav.soloFlows },
  ]
```

(the `/project` href here is part of the Task 10 rename — included now since this is the same array; Task 10 does not need to touch this file again)

- [ ] **Step 3: Type-check**

Run: `npx tsc --noEmit`
Expected: no errors.

- [ ] **Step 4: Commit**

```bash
git add src/app/creative-library/page.tsx src/components/layout/Navigation.tsx
git commit -m "feat: add Creative Library page and wire up navigation"
```

---

### Task 10: Rename Portfolio → Project (route move + redirect)

**Files:**
- Move: `src/app/portfolio/page.tsx` → `src/app/project/page.tsx`
- Modify: `next.config.ts` (add redirect)
- Modify: `src/app/page.tsx:22` (update CTA link)

**Interfaces:** none new — this task only changes routing, not component APIs.

- [ ] **Step 1: Move the page file**

```bash
git mv src/app/portfolio/page.tsx src/app/project/page.tsx
```

- [ ] **Step 2: Add the redirect**

Modify `src/app/../next.config.ts` (project root `next.config.ts`) to:

```ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/portfolio',
        destination: '/project',
        permanent: true,
      },
    ]
  },
};

export default nextConfig;
```

- [ ] **Step 3: Update the About-page CTA link**

In `src/app/page.tsx`, line 22, change:

```tsx
          <Link href="/portfolio" className="px-8 py-3 text-xs font-mono tracking-[2px] uppercase transition-all"
```
to:
```tsx
          <Link href="/project" className="px-8 py-3 text-xs font-mono tracking-[2px] uppercase transition-all"
```

- [ ] **Step 4: Type-check and build**

Run: `npx tsc --noEmit && npm run build`
Expected: both succeed with no errors. The build output should list `/project` as a route and show the `/portfolio` redirect in the routes manifest.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat: rename Portfolio route to Project, add /portfolio redirect"
```

---

### Task 11: Final verification (manual browser check)

**Files:** none — verification only.

- [ ] **Step 1: Start the dev server**

Run: `npm run dev` (background)
Expected: server starts on `http://localhost:3000` with no errors.

- [ ] **Step 2: Verify the Project rename**

Navigate to `http://localhost:3000/portfolio` — expect an automatic redirect to `http://localhost:3000/project`, page renders with title "PROJECT" and nav shows "Project"/"Dự Án" as the active link.

- [ ] **Step 3: Verify Creative Library — layout**

Navigate to `http://localhost:3000/creative-library`. Expect:
- Header with title "CREATIVE LIBRARY" and subtitle.
- "STATIC CREATIVE" heading, with "Hand-made Creative" grid (5 GECE images) then "AI Generative" grid (2 images).
- "VIDEO" heading, with "Commercial" grid (2 videos) then "UGC" grid (8 videos).
- All video thumbnails show a poster frame and a play icon on hover; no broken images/videos.

- [ ] **Step 4: Verify Creative Library — single view modal**

Click one image card and one video card. Expect:
- Modal opens over the gallery (no URL/route change).
- Image: shown static, correct caption in current language.
- Video: autoplays, muted, loops.
- Right column shows the AI model name (e.g. "Veo 3.1", "GPT-Image-2", "Gemini Omni", "Kling", "Omni" depending on the item) and the like/comment/send icons render but do nothing when clicked (expected — decorative only).
- Close button (X) and click-outside both close the modal back to the gallery.

- [ ] **Step 5: Verify bilingual + theme switching**

Toggle VIE/ENG in the nav — confirm all Creative Library labels and captions switch language. Toggle light/dark theme — confirm the gallery and modal use the correct CSS variables (no hardcoded colors breaking in light mode).

- [ ] **Step 6: Stop the dev server**

Stop the background `npm run dev` process once verification is complete.

---

## Self-Review Notes

- **Spec coverage:** Route rename + redirect (Task 10), Creative Library taxonomy/data (Task 5), Blob hosting for video (Tasks 1-2), local hosting for images (Task 3), i18n (Task 4), masonry-ish grid gallery (Task 7), Instagram-style modal with autoplay + caption + model + decorative like/comment (Task 8), nav wiring (Task 9) — all spec sections have a corresponding task.
- **Placeholder scan:** The only literal `<BLOB_URL:slug>` placeholders are in Task 5's initial code block, explicitly called out as required replacements in Step 3 of that task with a verification grep in Step 4 — not left as an unresolved plan gap.
- **Type consistency:** `CreativeItem` shape (`id, type, src, caption, captionVi, model`) is defined once in Task 5 and referenced identically in Tasks 6, 7, 8, 9. `CreativeGallery` prop names (`label, items, onSelect`) match between its Task 7 definition and Task 9's usage. `SingleView` prop names (`item, onClose`) match between Task 8's definition and Task 9's usage.
