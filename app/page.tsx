"use client"

import { Shader, ChromaFlow, Swirl } from "shaders/react"
import { CustomCursor } from "@/components/custom-cursor"
import { GrainOverlay } from "@/components/grain-overlay"
import { MagneticButton } from "@/components/magnetic-button"
import { LangProvider, useLang } from "@/components/lang-context"
import { HeroSection } from "@/components/sections/hero-section"
import { WorksSection } from "@/components/sections/works-section"
import { LifeLearningSection } from "@/components/sections/life-learning-section"
import { AboutSection } from "@/components/sections/about-section"
import { ContactSection } from "@/components/sections/contact-section"
import { useRef, useEffect, useState } from "react"

const navItems = {
  en: ["Home", "Works", "Life", "About", "Contact"],
  zh: ["主页", "作品", "生活", "关于", "联系"],
}

function SiteContent() {
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [currentSection, setCurrentSection] = useState(0)
  const [isLoaded, setIsLoaded] = useState(false)
  const touchStartY = useRef(0)
  const touchStartX = useRef(0)
  const shaderContainerRef = useRef<HTMLDivElement>(null)
  const scrollThrottleRef = useRef<number>()
  const { lang, toggle } = useLang()
  const TOTAL_SECTIONS = 5

  useEffect(() => {
    const checkShaderReady = () => {
      if (shaderContainerRef.current) {
        const canvas = shaderContainerRef.current.querySelector("canvas")
        if (canvas && canvas.width > 0 && canvas.height > 0) {
          setIsLoaded(true)
          return true
        }
      }
      return false
    }
    if (checkShaderReady()) return
    const intervalId = setInterval(() => { if (checkShaderReady()) clearInterval(intervalId) }, 100)
    const fallbackTimer = setTimeout(() => setIsLoaded(true), 1500)
    return () => { clearInterval(intervalId); clearTimeout(fallbackTimer) }
  }, [])

  const scrollToSection = (index: number) => {
    if (scrollContainerRef.current) {
      const sectionWidth = scrollContainerRef.current.offsetWidth
      scrollContainerRef.current.scrollTo({ left: sectionWidth * index, behavior: "smooth" })
      setCurrentSection(index)
    }
  }

  useEffect(() => {
    const handleTouchStart = (e: TouchEvent) => {
      touchStartY.current = e.touches[0].clientY
      touchStartX.current = e.touches[0].clientX
    }
    const handleTouchMove = (e: TouchEvent) => {
      if (Math.abs(e.touches[0].clientY - touchStartY.current) > 10) e.preventDefault()
    }
    const handleTouchEnd = (e: TouchEvent) => {
      const deltaY = touchStartY.current - e.changedTouches[0].clientY
      const deltaX = touchStartX.current - e.changedTouches[0].clientX
      if (Math.abs(deltaY) > Math.abs(deltaX) && Math.abs(deltaY) > 50) {
        if (deltaY > 0 && currentSection < TOTAL_SECTIONS - 1) scrollToSection(currentSection + 1)
        else if (deltaY < 0 && currentSection > 0) scrollToSection(currentSection - 1)
      }
    }
    const container = scrollContainerRef.current
    if (container) {
      container.addEventListener("touchstart", handleTouchStart, { passive: true })
      container.addEventListener("touchmove", handleTouchMove, { passive: false })
      container.addEventListener("touchend", handleTouchEnd, { passive: true })
    }
    return () => {
      if (container) {
        container.removeEventListener("touchstart", handleTouchStart)
        container.removeEventListener("touchmove", handleTouchMove)
        container.removeEventListener("touchend", handleTouchEnd)
      }
    }
  }, [currentSection])

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        e.preventDefault()
        if (!scrollContainerRef.current) return
        scrollContainerRef.current.scrollBy({ left: e.deltaY, behavior: "instant" })
        const sectionWidth = scrollContainerRef.current.offsetWidth
        const newSection = Math.round(scrollContainerRef.current.scrollLeft / sectionWidth)
        if (newSection !== currentSection) setCurrentSection(newSection)
      }
    }
    const container = scrollContainerRef.current
    if (container) container.addEventListener("wheel", handleWheel, { passive: false })
    return () => { if (container) container.removeEventListener("wheel", handleWheel) }
  }, [currentSection])

  useEffect(() => {
    const handleScroll = () => {
      if (scrollThrottleRef.current) return
      scrollThrottleRef.current = requestAnimationFrame(() => {
        if (!scrollContainerRef.current) { scrollThrottleRef.current = undefined; return }
        const sectionWidth = scrollContainerRef.current.offsetWidth
        const newSection = Math.round(scrollContainerRef.current.scrollLeft / sectionWidth)
        if (newSection !== currentSection && newSection >= 0 && newSection < TOTAL_SECTIONS) {
          setCurrentSection(newSection)
        }
        scrollThrottleRef.current = undefined
      })
    }
    const container = scrollContainerRef.current
    if (container) container.addEventListener("scroll", handleScroll, { passive: true })
    return () => {
      if (container) container.removeEventListener("scroll", handleScroll)
      if (scrollThrottleRef.current) cancelAnimationFrame(scrollThrottleRef.current)
    }
  }, [currentSection])

  const items = navItems[lang]

  return (
    <main className="relative h-screen w-full overflow-hidden bg-background">
      <CustomCursor />
      <GrainOverlay />

      {/* WebGL Shader Background */}
      <div
        ref={shaderContainerRef}
        className={`fixed inset-0 z-0 transition-opacity duration-700 ${isLoaded ? "opacity-100" : "opacity-0"}`}
        style={{ contain: "strict" }}
      >
        <Shader className="h-full w-full">
          <Swirl
            colorA="#012696"
            colorB="#A4E2C6"
            speed={0.6}
            detail={0.8}
            blend={55}
            coarseX={35}
            coarseY={35}
            mediumX={35}
            mediumY={35}
            fineX={35}
            fineY={35}
          />
          <ChromaFlow
            baseColor="#012696"
            upColor="#A4E2C6"
            downColor="#012696"
            leftColor="#1a4fbd"
            rightColor="#7ecfb2"
            intensity={0.85}
            radius={1.8}
            momentum={20}
            maskType="alpha"
            opacity={0.95}
          />
        </Shader>
        <div className="absolute inset-0 bg-black/30" />
      </div>

      {/* Navigation */}
      <nav
        className={`fixed left-0 right-0 top-0 z-50 flex items-center justify-between px-6 py-5 transition-opacity duration-700 md:px-12 ${
          isLoaded ? "opacity-100" : "opacity-0"
        }`}
      >
        <button
          onClick={() => scrollToSection(0)}
          className="flex items-center gap-2 transition-transform hover:scale-105"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-foreground/10 backdrop-blur-md transition-all duration-300 hover:bg-foreground/20 border border-white/10">
            <span className="font-sans text-base font-bold text-foreground">启</span>
          </div>
          <span className="font-sans text-base font-semibold tracking-tight text-foreground">helloxiaoqizi</span>
        </button>

        <div className="hidden items-center gap-8 md:flex">
          {items.map((item, index) => (
            <button
              key={item}
              onClick={() => scrollToSection(index)}
              className={`group relative font-sans text-sm font-medium transition-colors ${
                currentSection === index ? "text-foreground" : "text-foreground/70 hover:text-foreground"
              }`}
            >
              {item}
              <span
                className={`absolute -bottom-1 left-0 h-px transition-all duration-300`}
                style={{
                  backgroundColor: "#A4E2C6",
                  width: currentSection === index ? "100%" : "0%",
                }}
              />
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3">
          {/* Language toggle */}
          <button
            onClick={toggle}
            className="rounded-full border border-white/15 bg-white/8 px-3 py-1.5 font-mono text-xs text-foreground/80 backdrop-blur-md transition-all hover:bg-white/15 hover:text-foreground"
          >
            {lang === "zh" ? "EN" : "中"}
          </button>
          <MagneticButton variant="secondary" onClick={() => scrollToSection(4)}>
            {lang === "zh" ? "联系我" : "Contact"}
          </MagneticButton>
        </div>
      </nav>

      {/* Section dots indicator */}
      <div
        className={`fixed right-6 top-1/2 z-50 flex -translate-y-1/2 flex-col gap-2 transition-opacity duration-700 ${
          isLoaded ? "opacity-100" : "opacity-0"
        }`}
      >
        {Array.from({ length: TOTAL_SECTIONS }).map((_, i) => (
          <button
            key={i}
            onClick={() => scrollToSection(i)}
            className="group flex h-6 w-6 items-center justify-center"
            aria-label={`Section ${i + 1}`}
          >
            <div
              className="rounded-full transition-all duration-300"
              style={{
                width: currentSection === i ? "8px" : "5px",
                height: currentSection === i ? "8px" : "5px",
                backgroundColor: currentSection === i ? "#A4E2C6" : "rgba(255,255,255,0.3)",
              }}
            />
          </button>
        ))}
      </div>

      {/* Horizontal scroll container */}
      <div
        ref={scrollContainerRef}
        data-scroll-container
        className={`relative z-10 flex h-screen overflow-x-auto overflow-y-hidden transition-opacity duration-700 ${
          isLoaded ? "opacity-100" : "opacity-0"
        }`}
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        <HeroSection scrollToSection={scrollToSection} />
        <WorksSection />
        <LifeLearningSection />
        <AboutSection scrollToSection={scrollToSection} />
        <ContactSection />
      </div>

      <style jsx global>{`
        div::-webkit-scrollbar { display: none; }
        [data-photo-strip]::-webkit-scrollbar { display: block; height: 4px; }
        [data-photo-strip]::-webkit-scrollbar-thumb { background-color: #A4E2C6; border-radius: 9999px; }
        [data-photo-strip]::-webkit-scrollbar-track { background: transparent; }
      `}</style>
    </main>
  )
}

export default function Home() {
  return (
    <LangProvider>
      <SiteContent />
    </LangProvider>
  )
}
