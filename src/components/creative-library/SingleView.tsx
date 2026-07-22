'use client'
import Image from 'next/image'
import { AnimatePresence, motion } from 'framer-motion'
import { X, Heart, MessageCircle, Send, Star } from 'lucide-react'
import { useLang } from '@/contexts/LanguageContext'
import { useTranslations } from '@/lib/translations'
import type { CreativeItem } from '@/lib/creativeLibrary'

function languageLabel(language: CreativeItem['language'], tr: ReturnType<typeof useTranslations>) {
  if (language === 'vi') return tr.creativeLibrary.languageVi
  if (language === 'en') return tr.creativeLibrary.languageEn
  if (language === 'fil') return tr.creativeLibrary.languageFil
  if (language === 'none') return tr.creativeLibrary.languageNone
  return null
}

export function SingleView({ item, onClose }: { item: CreativeItem | null; onClose: () => void }) {
  const { lang } = useLang()
  const tr = useTranslations(lang)
  const language = item ? languageLabel(item.language, tr) : null

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
            className="flex flex-col md:flex-row w-full max-w-4xl max-h-full overflow-hidden rounded-2xl"
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
                  poster={item.poster}
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

              {item.rating && (
                <div className="flex items-center gap-0.5">
                  {Array.from({ length: item.rating }).map((_, i) => (
                    <Star key={i} size={12} color="#FBBF24" fill="#FBBF24" />
                  ))}
                </div>
              )}

              {(item.duration || language) && (
                <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs" style={{ color: 'var(--text-muted)' }}>
                  {item.duration && (
                    <span>
                      <span className="font-mono uppercase tracking-[1px]" style={{ fontSize: 9, color: 'var(--primary)' }}>{tr.creativeLibrary.durationLabel}</span>{' '}
                      {item.duration}
                    </span>
                  )}
                  {language && (
                    <span>
                      <span className="font-mono uppercase tracking-[1px]" style={{ fontSize: 9, color: 'var(--primary)' }}>{tr.creativeLibrary.languageLabel}</span>{' '}
                      {language}
                    </span>
                  )}
                </div>
              )}

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
