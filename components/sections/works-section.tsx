"use client"

import { useLang } from "@/components/lang-context"
import { useReveal } from "@/hooks/use-reveal"
import { ExternalLink } from "lucide-react"

const content = {
  en: { title: "Featured Works", subtitle: "/ What I've been building" },
  zh: { title: "精选作品", subtitle: "/ 我正在构建的事" },
}

interface Project {
  name: { en: string; zh: string }
  desc: { en: string; zh: string }
  tags: string[]
  image: string
  link: string
}

const projects: Project[] = [
  {
    name: { en: "每日精读 App", zh: "每日精读 App" },
    desc: {
      en: "Train article summarization skills and build confident speaking ability through daily reading practice.",
      zh: "锻炼文章总结能力，通过每日阅读训练输出演讲能力。",
    },
    tags: ["Figma", "Claude", "Vibe Coding"],
    image: "/projects/reading-app.png",
    link: "https://github.com/zhaoqihui830/reading-camp",
  },
]

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const { lang } = useLang()
  const { ref, isVisible } = useReveal()

  return (
    <div
      ref={ref}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md transition-all duration-500 hover:border-white/20 hover:bg-white/10"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(40px)",
        transition: `opacity 0.6s ease ${index * 150}ms, transform 0.6s ease ${index * 150}ms`,
      }}
    >
      <div className="relative overflow-hidden" style={{ aspectRatio: "16/10" }}>
        <img
          src={project.image}
          alt={project.name[lang]}
          className="h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
      </div>

      <div className="flex flex-1 flex-col p-6">
        <div className="mb-3 flex items-start justify-between gap-2">
          <h3 className="text-xl font-semibold text-foreground">{project.name[lang]}</h3>
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 rounded-full p-1.5 text-foreground/50 transition-colors hover:text-accent"
          >
            <ExternalLink className="h-4 w-4" />
          </a>
        </div>

        <p className="mb-4 flex-1 text-sm leading-relaxed text-foreground/70">{project.desc[lang]}</p>

        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs text-foreground/70"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

export function WorksSection() {
  const { lang } = useLang()
  const { ref, isVisible } = useReveal()
  const t = content[lang]

  return (
    <section className="flex min-h-screen w-screen shrink-0 flex-col justify-center px-6 py-16 md:px-12 md:py-24">
      <div
        ref={ref}
        className="mb-12"
        style={{
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? "translateY(0)" : "translateY(30px)",
          transition: "opacity 0.6s ease, transform 0.6s ease",
        }}
      >
        <p className="mb-2 font-mono text-xs tracking-widest text-foreground/50 uppercase">{t.subtitle}</p>
        <h2 className="font-sans text-5xl font-bold text-foreground md:text-6xl lg:text-7xl">{t.title}</h2>
        <div className="mt-4 h-px w-24" style={{ backgroundColor: "#A4E2C6" }} />
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 max-w-5xl">
        {projects.map((project, i) => (
          <ProjectCard key={project.name.en} project={project} index={i} />
        ))}

        {/* Placeholder for future projects */}
        <div className="flex items-center justify-center rounded-2xl border border-dashed border-white/15 bg-white/3 p-8 text-center min-h-[280px]">
          <div>
            <div className="mb-3 text-3xl">＋</div>
            <p className="text-sm text-foreground/40">{lang === "zh" ? "更多作品即将到来" : "More coming soon"}</p>
          </div>
        </div>
      </div>

      <div className="mt-8 flex items-center gap-2">
        <p className="font-mono text-xs text-foreground/50">{lang === "zh" ? "继续探索" : "Scroll to explore"}</p>
        <div className="h-px w-8" style={{ backgroundColor: "#A4E2C6", opacity: 0.5 }} />
      </div>
    </section>
  )
}
