"use client"

import { createContext, useContext, useState } from "react"
import type React from "react"

export type Lang = "en" | "zh"

interface LangContextType {
  lang: Lang
  toggle: () => void
}

const LangContext = createContext<LangContextType>({ lang: "zh", toggle: () => {} })

export function LangProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Lang>("zh")
  const toggle = () => setLang((l) => (l === "en" ? "zh" : "en"))
  return <LangContext.Provider value={{ lang, toggle }}>{children}</LangContext.Provider>
}

export const useLang = () => useContext(LangContext)
