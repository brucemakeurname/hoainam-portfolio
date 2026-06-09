'use client'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { GECE_IMAGES } from '@/lib/data'

export function GECEShowcase() {
  return (
    <section className="py-16 max-w-6xl mx-auto px-6">
      <p className="text-[10px] tracking-[4px] text-white/30 font-mono uppercase mb-8">
        GECE Group · Graphic Design Showcase
      </p>
      <div className="columns-1 md:columns-2 lg:columns-3 gap-4 space-y-4">
        {GECE_IMAGES.map((src, i) => (
          <motion.div
            key={src}
            className="break-inside-avoid overflow-hidden transition-all"
            style={{ border: '1px solid rgba(255,255,255,0.1)' }}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            whileHover={{ borderColor: 'rgba(31,127,254,0.4)' }}
          >
            <Image
              src={src}
              alt={`GECE design ${i + 1}`}
              width={400}
              height={300}
              className="w-full h-auto"
              unoptimized
            />
          </motion.div>
        ))}
      </div>
    </section>
  )
}
