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
