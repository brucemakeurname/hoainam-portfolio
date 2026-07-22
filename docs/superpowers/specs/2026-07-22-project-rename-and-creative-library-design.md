# Design: Rename Portfolio → Project + New Creative Library Page

Date: 2026-07-22

## Summary

Two changes to the portfolio site:
1. Rename the "Portfolio" page/nav entry to "Project" (route `/portfolio` → `/project`).
2. Add a new "Creative Library" page (`/creative-library`) — a bilingual gallery of Nam's creative output (static images + videos), with an Instagram-style single-item modal view.

## 1. Rename Portfolio → Project

- Move `src/app/portfolio/page.tsx` → `src/app/project/page.tsx` (component logic unchanged).
- `next.config.js`: add a permanent redirect `/portfolio` → `/project` so old links keep working.
- `Navigation.tsx`: nav link href updates to `/project`.
- `translations.ts`: English nav label `Portfolio` → `Project` (Vietnamese `Dự Án` stays as-is — already correct). Page `<h1>` text `PORTFOLIO` → `PROJECT`. Existing `tr.portfolio.*` translation keys are kept as-is internally (renaming the key namespace is not required for this change — only the displayed strings need to change).

## 2. New page: Creative Library

Route: `/creative-library`. Nav order: **About → Project → Creative Library → Solo Flows**.

### 2.1 Content taxonomy

```
STATIC CREATIVE
 ├─ Hand-made Creative   → GECE_IMAGES (5 images, already in /public/images/gece/)
 └─ AI Generative        → 2 images, model: gpt-image-2
      - F&B promotion poster
      - Cellphones promotion ads

VIDEO
 ├─ Commercial           → 2 videos, model: Gemini Omni
 │    - Be - TVC
 │    - Coca-Cola TVC
 └─ UGC                  → remaining 8 videos, model: Veo 3.1 (default)
      - Ads-Gentadox-nanoshield          → Veo 3.1
      - Colgate-UGC                      → Veo 3.1
      - Feb_04__1428_15s (untitled)      → Veo 3.1
      - The_mans_sweating (untitled)     → Veo 3.1
      - construction_timelapse           → Veo 3.1
      - gucci_dress_ugc                  → Veo 3.1
      - UGC-new-gym-experience           → Omni (exception)
      - kling_20260211_Motion_Control    → Kling (exception)
```

Each library entry has this shape (in `src/lib/creativeLibrary.ts`):

```ts
{
  id: string
  type: 'image' | 'video'
  src: string          // local /public path for images, Vercel Blob URL for videos
  caption: string
  captionVi: string
  model: string         // e.g. 'GPT-Image-2', 'Veo 3.1', 'Gemini Omni', 'Kling'
}
```

Grouped into four arrays: `handmadeCreative`, `aiGenerative`, `commercialVideos`, `ugcVideos`.

### 2.2 Asset hosting

- **Images** (all <1MB): copied into `public/images/creative/` as normal committed assets, renamed to clean slugs:
  - `F&B promotion poster.jpg` → `public/images/creative/fnb-promotion-poster.jpg`
  - `Cellphones-promotion-ads.jpg` → `public/images/creative/cellphones-promotion-ads.jpg`
- **Videos** (~250MB total, one file 102MB): too large to commit to git / serve from `public/`. Uploaded to **Vercel Blob** instead:
  - Add `@vercel/blob` dependency.
  - One-off script `scripts/upload-creative-videos.mjs` reads each video from `libary/`, uploads via `put()` with a clean slug key (e.g. `creative/be-tvc.mp4`), and prints the resulting public Blob URL.
  - Requires `BLOB_READ_WRITE_TOKEN` — a Blob store will be created/linked for the Vercel project as part of implementation, and the token pulled into local env for running the script (not committed).
  - Resulting URLs are pasted into `creativeLibrary.ts` as the `src` for each video entry.
  - This is a manual one-time step, not a build-time pipeline — if new videos are added later, re-run the script and update the data file.

### 2.3 Page UI

- Two stacked sections in page order: **STATIC CREATIVE**, then **VIDEO** — each with sub-headed sub-grids for their two parts.
- Grid: masonry-style CSS grid/columns, mixed aspect ratios, optimized for visual scanning (per user request: "layout dạng Gallery để quan sát sản phẩm rõ ràng nhất").
- Video thumbnails in the grid use `<video preload="metadata" muted>` so the browser shows the first frame — no separate thumbnail generation needed.
- Clicking any card opens a **modal overlay** (`SingleView`), not a route change:
  - Left/main area: media fills the space. Images shown static; videos autoplay, muted by default, loop, with a tap-to-unmute affordance (Instagram convention).
  - Right column: caption (bilingual via `useLang`), AI model badge, and **decorative, non-functional** like/comment/share icons (visual only — no state, no counts, matches Instagram aesthetic without needing a backend).
  - Close (X button or click-outside) returns to the gallery with no page reload.
- Fully bilingual: `useLang()` / `useTranslations()`, new `tr.creativeLibrary.*` translation block (section labels, part labels, "model used" label, close button, etc.).

### 2.4 New files

```
src/app/creative-library/page.tsx
src/components/creative-library/CreativeGallery.tsx   # renders one labeled grid section
src/components/creative-library/MediaCard.tsx          # grid thumbnail (image or video)
src/components/creative-library/SingleView.tsx         # modal, Instagram-style layout
src/lib/creativeLibrary.ts                              # data + captions (VI/EN)
scripts/upload-creative-videos.mjs                      # one-off Blob upload helper
```

### 2.5 Out of scope

- No real like/comment/share functionality (no backend, no persistence).
- No per-item shareable URL (modal is overlay-only, per approved decision).
- No automated video transcoding/compression pipeline — files are uploaded as-is to Blob.

## Open items resolved during brainstorming

| Question | Decision |
|---|---|
| Video hosting | Vercel Blob Storage |
| `/portfolio` route | Renamed to `/project`, with redirect |
| Creative Library route/nav position | `/creative-library`, after Project |
| Like/comment in single view | Decorative UI only, non-functional |
| Gallery layout | Two separate stacked sections (Static Creative, Video), not a filter/tab UI |
| Single view mode | Modal overlay, no dedicated route |
| Caption authorship | Nam (Claude) drafts captions from filename + project context; user can edit later |
