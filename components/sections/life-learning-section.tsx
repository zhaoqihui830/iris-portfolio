"use client"

import { useState, useEffect } from "react"
import { useLang } from "@/components/lang-context"
import { useReveal } from "@/hooks/use-reveal"
import { CheckCircle2, Circle, X, ChevronLeft, ChevronRight } from "lucide-react"

const lifeContent = {
  en: { title: "LIFE MOMENTS", subtitle: "/ Daily snippets" },
  zh: { title: "生活瞬间", subtitle: "/ 日常片段" },
}

const learningContent = {
  en: { title: "LEARNING JOURNEY", subtitle: "/ Skill timeline" },
  zh: { title: "学习历程", subtitle: "/ 技能时间线" },
}

const photos = [2,3,4,5,6,7,8,9,10,11,12,13,14,15].map(
  (n) => `/projects/life/20260527-172915.607-${n}.jpg`
)

interface TimelineItem {
  en: string
  zh: string
  year: string
  completed: boolean
  icon: string
}

const timeline: TimelineItem[] = [
  { en: "Animation Design", zh: "动画设计", year: "2019", completed: true, icon: "🎬" },
  { en: "Organization & Storage", zh: "收纳整理", year: "2022", completed: true, icon: "🗂️" },
  { en: "Vibe Coding", zh: "Vibe Coding", year: "2026", completed: false, icon: "💻" },
]

function Lightbox({ index, onClose, onPrev, onNext }: {
  index: number
  onClose: () => void
  onPrev: () => void
  onNext: () => void
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
      if (e.key === "ArrowLeft") onPrev()
      if (e.key === "ArrowRight") onNext()
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [onClose, onPrev, onNext])

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center bg-black/90 backdrop-blur-md"
      onClick={onClose}
    >
      {/* Close */}
      <button
        className="absolute right-5 top-5 flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
        onClick={onClose}
      >
        <X className="h-4 w-4" />
      </button>

      {/* Prev */}
      <button
        className="absolute left-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
        onClick={(e) => { e.stopPropagation(); onPrev() }}
      >
        <ChevronLeft className="h-5 w-5" />
      </button>

      {/* Photo */}
      <img
        src={photos[index]}
        alt=""
        className="max-h-[90vh] max-w-[90vw] rounded-2xl object-contain shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      />

      {/* Next */}
      <button
        className="absolute right-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
        onClick={(e) => { e.stopPropagation(); onNext() }}
      >
        <ChevronRight className="h-5 w-5" />
      </button>

      {/* Counter */}
      <p className="absolute bottom-5 font-mono text-xs text-white/50">
        {index + 1} / {photos.length}
      </p>
    </div>
  )
}

function LifeGrid() {
  const { lang } = useLang()
  const { ref, isVisible } = useReveal()
  const t = lifeContent[lang]
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  const row1 = photos.slice(0, 7)
  const row2 = photos.slice(7)

  const openAt = (i: number) => setLightboxIndex(i)
  const close = () => setLightboxIndex(null)
  const prev = () => setLightboxIndex((i) => (i === null ? 0 : (i - 1 + photos.length) % photos.length))
  const next = () => setLightboxIndex((i) => (i === null ? 0 : (i + 1) % photos.length))

  return (
    <div className="flex h-full flex-col px-6 pb-6 pt-20 md:px-8 md:pt-24">
      <div
        ref={ref}
        className="mb-5 shrink-0"
        style={{
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? "translateY(0)" : "translateY(20px)",
          transition: "opacity 0.6s ease, transform 0.6s ease",
        }}
      >
        <p className="mb-1 font-mono text-xs tracking-widest text-foreground/50">{t.subtitle}</p>
        <h2 className="font-sans text-3xl font-bold text-foreground md:text-4xl lg:text-5xl">{t.title}</h2>
        <div className="mt-3 h-px w-16" style={{ backgroundColor: "#A4E2C6" }} />
      </div>

      {/* 两行横向照片条 */}
      <div className="flex min-h-0 flex-1 flex-col gap-2">
        {[row1, row2].map((row, ri) => (
          <div
            key={ri}
            data-photo-strip="true"
            className="flex flex-1 gap-2 overflow-x-auto"
            style={{ scrollbarColor: "#A4E2C6 transparent", scrollbarWidth: "thin" }}
          >
            {row.map((src, i) => {
              const globalIndex = ri * 7 + i
              return (
                <div
                  key={i}
                  className="group relative shrink-0 cursor-zoom-in overflow-hidden rounded-xl"
                  style={{ height: "100%", aspectRatio: "3 / 4" }}
                  onClick={() => openAt(globalIndex)}
                >
                  <img
                    src={src}
                    alt=""
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/20" />
                </div>
              )
            })}
          </div>
        ))}
      </div>

      <p className="mt-2 shrink-0 text-center font-mono text-xs text-foreground/30">
        {lang === "zh" ? "← 滚轮/拖动浏览 · 点击放大 →" : "← Scroll or drag · Click to enlarge →"}
      </p>

      {lightboxIndex !== null && (
        <Lightbox index={lightboxIndex} onClose={close} onPrev={prev} onNext={next} />
      )}
    </div>
  )
}

function LearningTimeline() {
  const { lang } = useLang()
  const { ref, isVisible } = useReveal()
  const t = learningContent[lang]

  return (
    <div className="flex h-full flex-col px-6 pb-12 pt-20 md:px-10 md:pt-24">
      <div
        ref={ref}
        className="mb-8"
        style={{
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? "translateY(0)" : "translateY(20px)",
          transition: "opacity 0.6s ease, transform 0.6s ease",
        }}
      >
        <p className="mb-1 font-mono text-xs tracking-widest text-foreground/50">{t.subtitle}</p>
        <h2 className="font-sans text-3xl font-bold text-foreground md:text-4xl lg:text-5xl">{t.title}</h2>
        <div className="mt-3 h-px w-16" style={{ backgroundColor: "#A4E2C6" }} />
      </div>

      <div className="relative flex-1">
        {/* vertical line */}
        <div className="absolute left-5 top-2 bottom-2 w-px bg-white/10" />

        <div className="space-y-8">
          {timeline.map((item, i) => (
            <div
              key={i}
              className="relative flex gap-5 pl-14"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? "translateX(0)" : "translateX(-20px)",
                transition: `opacity 0.5s ease ${i * 150 + 300}ms, transform 0.5s ease ${i * 150 + 300}ms`,
              }}
            >
              {/* icon on the line */}
              <div className="absolute left-2.5 -translate-x-1/2 flex h-5 w-5 items-center justify-center">
                {item.completed ? (
                  <CheckCircle2 className="h-5 w-5" style={{ color: "#A4E2C6" }} />
                ) : (
                  <Circle className="h-5 w-5 animate-pulse text-white/40" />
                )}
              </div>

              <div className="flex flex-1 flex-col rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
                <div className="mb-1.5 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{item.icon}</span>
                    <span className="font-semibold text-foreground">{item[lang]}</span>
                  </div>
                  <span
                    className="rounded-full px-2.5 py-0.5 text-xs font-medium"
                    style={
                      item.completed
                        ? { backgroundColor: "#A4E2C620", color: "#A4E2C6" }
                        : { backgroundColor: "#012696aa", color: "#A4E2C6", animation: "pulse 2s infinite" }
                    }
                  >
                    {item.completed
                      ? lang === "zh" ? "已完成" : "Completed"
                      : lang === "zh" ? "进行中" : "In progress"}
                  </span>
                </div>
                <p className="font-mono text-xs text-foreground/50">{item.year}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export function LifeLearningSection() {
  return (
    <section className="flex h-screen w-screen shrink-0 overflow-hidden">
      {/* Left: Life Moments — horizontal scroll rows */}
      <div className="flex h-full w-1/2 flex-col border-r border-white/10 overflow-hidden">
        <LifeGrid />
      </div>

      {/* Right: Learning Journey — scrollable */}
      <div className="flex h-full w-1/2 flex-col overflow-y-auto">
        <LearningTimeline />
      </div>
    </section>
  )
}
