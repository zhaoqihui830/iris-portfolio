"use client"

import { MagneticButton } from "@/components/magnetic-button"
import { useLang } from "@/components/lang-context"
import { Github, Mail, MessageCircle, BookMarked } from "lucide-react"

interface HeroSectionProps {
  scrollToSection: (index: number) => void
}

const content = {
  en: {
    badge: "WebGL Powered · Personal Space",
    title1: "Independent Developer",
    title2: "& Designer",
    tagline: "Record every project, cherish every moment, pursue knowledge forever.",
    viewWorks: "View My Works",
    scrollHint: "Scroll to explore",
  },
  zh: {
    badge: "WebGL 驱动 · 个人空间",
    title1: "独立开发者",
    title2: "& 设计师",
    tagline: "记录项目点滴，珍藏生活瞬间，奔赴学识山海。",
    viewWorks: "查看作品",
    scrollHint: "滚动探索",
  },
}

const socials = [
  {
    label: "GitHub",
    href: "https://github.com/zhaoqihui830",
    icon: Github,
    isSvg: false,
  },
  {
    label: "WeChat",
    href: "#",
    icon: null,
    isSvg: true,
    svg: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M8.5 4C4.36 4 1 7.13 1 11c0 2 .93 3.81 2.41 5.1L2.5 19l3.1-1.55A8.26 8.26 0 0 0 8.5 18c.28 0 .55-.02.82-.05A5.92 5.92 0 0 1 9 16c0-3.31 2.91-6 6.5-6 .27 0 .54.01.8.04C15.72 7.08 12.42 4 8.5 4zM6.5 9.5a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm4 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2zM15.5 11c-2.76 0-5 1.97-5 4.5s2.24 4.5 5 4.5c.73 0 1.42-.14 2.04-.39L20 21l-.92-2.77A4.37 4.37 0 0 0 20.5 15.5C20.5 12.97 18.26 11 15.5 11zm-1.5 3.25a.75.75 0 1 1 0 1.5.75.75 0 0 1 0-1.5zm3 0a.75.75 0 1 1 0 1.5.75.75 0 0 1 0-1.5z"/>
      </svg>
    ),
  },
  {
    label: "小红书",
    href: "https://www.xiaohongshu.com/user/profile/pangzishouzi",
    icon: null,
    isSvg: true,
    svg: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 13H9V9h2v6zm4-6h-2v1.5h2V11h-2v1.5h2V14h-2v1h-1V9h3v4z"/>
      </svg>
    ),
  },
  {
    label: "Email",
    href: "mailto:zhaoqihui830@gmail.com",
    icon: Mail,
    isSvg: false,
  },
]

export function HeroSection({ scrollToSection }: HeroSectionProps) {
  const { lang } = useLang()
  const t = content[lang]

  return (
    <section className="flex min-h-screen w-screen shrink-0 flex-col justify-center px-6 pb-16 pt-20 md:px-12 md:pt-24 md:pb-24">
      <div className="max-w-3xl">
        <div className="mb-4 inline-block animate-in fade-in slide-in-from-bottom-4 rounded-full border border-foreground/20 bg-foreground/10 px-4 py-1.5 backdrop-blur-md duration-700">
          <p className="font-mono text-xs text-foreground/90">{t.badge}</p>
        </div>

        <h1 className="mb-6 animate-in fade-in slide-in-from-bottom-8 font-sans text-6xl font-light leading-[1.1] tracking-tight text-foreground duration-1000 md:text-7xl lg:text-8xl">
          <span className="text-balance block">{t.title1}</span>
          <span className="text-balance block" style={{ color: "#A4E2C6" }}>{t.title2}</span>
        </h1>

        <p className="mb-8 max-w-xl animate-in fade-in slide-in-from-bottom-4 text-lg leading-relaxed text-foreground/80 duration-1000 delay-200 md:text-xl">
          {t.tagline}
        </p>

        <div className="mb-8 flex animate-in fade-in items-center gap-5 duration-1000 delay-300">
          {socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target={s.href.startsWith("http") ? "_blank" : undefined}
              rel="noopener noreferrer"
              aria-label={s.label}
              className="text-foreground/70 transition-all duration-200 hover:text-accent hover:scale-110"
            >
              {s.isSvg ? s.svg : s.icon && <s.icon className="w-5 h-5" />}
            </a>
          ))}
        </div>

        <div className="flex animate-in fade-in slide-in-from-bottom-4 flex-col gap-4 duration-1000 delay-400 sm:flex-row sm:items-center">
          <MagneticButton size="lg" variant="primary" onClick={() => scrollToSection(1)}>
            {t.viewWorks}
          </MagneticButton>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-in fade-in duration-1000 delay-600">
        <div className="flex items-center gap-2">
          <p className="font-mono text-xs text-foreground/70">{t.scrollHint}</p>
          <div className="flex h-6 w-12 items-center justify-center rounded-full border border-foreground/20 bg-foreground/10 backdrop-blur-md">
            <div className="h-2 w-2 animate-pulse rounded-full" style={{ backgroundColor: "#A4E2C6" }} />
          </div>
        </div>
      </div>
    </section>
  )
}
