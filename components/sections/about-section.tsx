"use client"

import { useLang } from "@/components/lang-context"
import { useReveal } from "@/hooks/use-reveal"
import { MagneticButton } from "@/components/magnetic-button"

const content = {
  en: {
    subtitle: "/ Who I am",
    title: "About Me",
    bio1: "Hi, I'm Iris (小启子), an independent developer and designer based in Shenzhen, China. I build things with code and design with intention.",
    bio2: "I believe every project tells a story. From crafting mobile apps with AI to organizing spaces with purpose — I bring curiosity and care to everything I do.",
    stats: [
      { value: "1+", label: "Projects" },
      { value: "2019", label: "Since" },
      { value: "SZ", label: "Shenzhen" },
    ],
    contactBtn: "Get in Touch",
    worksBtn: "View Works",
  },
  zh: {
    subtitle: "/ 关于我",
    title: "小启子 / Iris",
    bio1: "你好，我是小启子（Iris），一个独立开发者和设计师，目前在深圳。我用代码构建产品，用设计表达想法。",
    bio2: "我相信每个项目都有它自己的故事。从用 AI 打造移动应用，到有条不紊地整理空间——我把好奇心和用心带入所做的每一件事。",
    stats: [
      { value: "1+", label: "个作品" },
      { value: "2019", label: "起始年份" },
      { value: "深圳", label: "所在城市" },
    ],
    contactBtn: "联系我",
    worksBtn: "查看作品",
  },
}

export function AboutSection({ scrollToSection }: { scrollToSection: (i: number) => void }) {
  const { lang } = useLang()
  const { ref, isVisible } = useReveal()
  const t = content[lang]

  return (
    <section className="flex min-h-screen w-screen shrink-0 flex-col justify-center px-6 py-16 md:px-12 md:py-24">
      <div className="grid max-w-5xl grid-cols-1 gap-12 md:grid-cols-2 md:gap-16 items-center">
        {/* Left: text */}
        <div ref={ref}>
          <div
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? "translateY(0)" : "translateY(30px)",
              transition: "opacity 0.6s ease, transform 0.6s ease",
            }}
          >
            <p className="mb-2 font-mono text-xs tracking-widest text-foreground/50 uppercase">{t.subtitle}</p>
            <h2 className="mb-6 font-sans text-5xl font-bold text-foreground md:text-6xl">{t.title}</h2>
            <div className="mb-4 h-px w-16" style={{ backgroundColor: "#A4E2C6" }} />
          </div>

          <div
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? "translateY(0)" : "translateY(20px)",
              transition: "opacity 0.6s ease 150ms, transform 0.6s ease 150ms",
            }}
          >
            <p className="mb-4 text-base leading-relaxed text-foreground/80">{t.bio1}</p>
            <p className="mb-8 text-base leading-relaxed text-foreground/80">{t.bio2}</p>
          </div>

          <div
            className="flex gap-4"
            style={{
              opacity: isVisible ? 1 : 0,
              transition: "opacity 0.6s ease 300ms",
            }}
          >
            <MagneticButton variant="primary" onClick={() => scrollToSection(4)}>
              {t.contactBtn}
            </MagneticButton>
            <MagneticButton variant="secondary" onClick={() => scrollToSection(1)}>
              {t.worksBtn}
            </MagneticButton>
          </div>
        </div>

        {/* Right: stats */}
        <div
          className="grid grid-cols-3 gap-4"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateX(0)" : "translateX(30px)",
            transition: "opacity 0.6s ease 200ms, transform 0.6s ease 200ms",
          }}
        >
          {t.stats.map((stat, i) => (
            <div
              key={i}
              className="flex flex-col items-center justify-center rounded-2xl border border-white/10 bg-white/5 p-6 text-center backdrop-blur-sm"
            >
              <span className="mb-1 text-3xl font-bold" style={{ color: "#A4E2C6" }}>{stat.value}</span>
              <span className="text-xs text-foreground/60">{stat.label}</span>
            </div>
          ))}

          {/* avatar placeholder */}
          <div className="col-span-3 mt-2 flex items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-blue-950 to-teal-800" style={{ height: "180px" }}>
            <div className="text-center">
              <div className="mx-auto mb-2 flex h-16 w-16 items-center justify-center rounded-full border-2 border-white/20 bg-white/10 text-3xl">
                🌿
              </div>
              <p className="text-sm font-medium text-foreground/80">小启子 / Iris</p>
              <p className="text-xs text-foreground/50">Shenzhen · 深圳</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
