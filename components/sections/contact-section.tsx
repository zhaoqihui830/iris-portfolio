"use client"

import { useState } from "react"
import { useLang } from "@/components/lang-context"
import { useReveal } from "@/hooks/use-reveal"
import { Mail, MapPin, Github, Copy, Check } from "lucide-react"

const content = {
  en: {
    subtitle: "/ Say hello",
    title: "Let's Talk",
    desc: "Have a project idea, a collaboration in mind, or just want to say hi? Feel free to reach out.",
    email: "zhaoqihui830@gmail.com",
    location: "Shenzhen, China",
    wechat: "pangzishouzi",
    xiaohongshu: "pangzishouzi",
    copyLabel: "Copy",
    copiedLabel: "Copied!",
    handles: "Social Handles",
  },
  zh: {
    subtitle: "/ 打个招呼",
    title: "联系我",
    desc: "有项目想法、合作意向，或者只是想聊聊？欢迎随时联系。",
    email: "zhaoqihui830@gmail.com",
    location: "深圳，中国",
    wechat: "pangzishouzi",
    xiaohongshu: "pangzishouzi",
    copyLabel: "复制",
    copiedLabel: "已复制",
    handles: "社交账号",
  },
}

function CopyButton({ text, label, copiedLabel }: { text: string; label: string; copiedLabel: string }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(text).catch(() => {})
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <button
      onClick={handleCopy}
      className="ml-2 inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-xs transition-all hover:bg-white/10"
      style={{ color: copied ? "#A4E2C6" : "rgba(255,255,255,0.4)" }}
    >
      {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
      {copied ? copiedLabel : label}
    </button>
  )
}

export function ContactSection() {
  const { lang } = useLang()
  const { ref, isVisible } = useReveal()
  const t = content[lang]

  const links = [
    {
      icon: <Mail className="h-4 w-4" />,
      label: "Email",
      value: t.email,
      href: `mailto:${t.email}`,
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
          <path d="M8.5 4C4.36 4 1 7.13 1 11c0 2 .93 3.81 2.41 5.1L2.5 19l3.1-1.55A8.26 8.26 0 0 0 8.5 18c.28 0 .55-.02.82-.05A5.92 5.92 0 0 1 9 16c0-3.31 2.91-6 6.5-6 .27 0 .54.01.8.04C15.72 7.08 12.42 4 8.5 4zM6.5 9.5a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm4 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2zM15.5 11c-2.76 0-5 1.97-5 4.5s2.24 4.5 5 4.5c.73 0 1.42-.14 2.04-.39L20 21l-.92-2.77A4.37 4.37 0 0 0 20.5 15.5C20.5 12.97 18.26 11 15.5 11zm-1.5 3.25a.75.75 0 1 1 0 1.5.75.75 0 0 1 0-1.5zm3 0a.75.75 0 1 1 0 1.5.75.75 0 0 1 0-1.5z"/>
        </svg>
      ),
      label: "WeChat",
      value: t.wechat,
      href: "#",
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 13H9V9h2v6zm4-6h-2v1.5h2V11h-2v1.5h2V14h-2v1h-1V9h3v4z"/>
        </svg>
      ),
      label: "小红书",
      value: t.xiaohongshu,
      href: "https://www.xiaohongshu.com/user/profile/pangzishouzi",
    },
    {
      icon: <Github className="h-4 w-4" />,
      label: "GitHub",
      value: "zhaoqihui830",
      href: "https://github.com/zhaoqihui830",
    },
  ]

  return (
    <section className="flex min-h-screen w-screen shrink-0 flex-col justify-center px-6 py-16 md:px-12 md:py-24">
      <div className="max-w-2xl" ref={ref}>
        <div
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(30px)",
            transition: "opacity 0.6s ease, transform 0.6s ease",
          }}
        >
          <p className="mb-2 font-mono text-xs tracking-widest text-foreground/50 uppercase">{t.subtitle}</p>
          <h2 className="mb-4 font-sans text-5xl font-bold text-foreground md:text-6xl lg:text-7xl">{t.title}</h2>
          <div className="mb-6 h-px w-16" style={{ backgroundColor: "#A4E2C6" }} />
          <p className="mb-10 text-base leading-relaxed text-foreground/70 md:text-lg">{t.desc}</p>
        </div>

        <div
          className="space-y-3"
          style={{
            opacity: isVisible ? 1 : 0,
            transition: "opacity 0.6s ease 200ms",
          }}
        >
          {links.map((link, i) => (
            <div
              key={link.label}
              className="group flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-5 py-4 backdrop-blur-sm transition-all duration-300 hover:border-white/20 hover:bg-white/10"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? "translateX(0)" : "translateX(-20px)",
                transition: `opacity 0.5s ease ${i * 80 + 300}ms, transform 0.5s ease ${i * 80 + 300}ms`,
              }}
            >
              <div className="flex items-center gap-3">
                <span className="text-foreground/60 group-hover:text-accent transition-colors" style={{ color: undefined }}>
                  {link.icon}
                </span>
                <div>
                  <p className="text-xs text-foreground/50 mb-0.5">{link.label}</p>
                  <p className="text-sm font-medium text-foreground">{link.value}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <CopyButton text={link.value} label={t.copyLabel} copiedLabel={t.copiedLabel} />
                {link.href !== "#" && (
                  <a
                    href={link.href}
                    target={link.href.startsWith("http") ? "_blank" : undefined}
                    rel="noopener noreferrer"
                    className="rounded-md px-3 py-1 text-xs text-foreground/50 transition-colors hover:text-foreground hover:bg-white/10"
                  >
                    →
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>

        <div
          className="mt-8 flex items-center gap-2 text-foreground/40"
          style={{
            opacity: isVisible ? 1 : 0,
            transition: "opacity 0.6s ease 600ms",
          }}
        >
          <MapPin className="h-3 w-3" />
          <span className="text-xs">{t.location}</span>
        </div>
      </div>
    </section>
  )
}
