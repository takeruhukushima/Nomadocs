"use client"

import { useEffect, useState } from "react"
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from "@/components/ui/button"

export function MainContent({ children }: { children: React.ReactNode }) {
  const [sections, setSections] = useState<Element[]>([])
  const [currentSection, setCurrentSection] = useState(0)

  useEffect(() => {
    const h1Elements = document.querySelectorAll("h1")
    setSections(Array.from(h1Elements))
  }, [])

  const scrollToSection = (index: number) => {
    if (sections[index]) {
      sections[index].scrollIntoView({ behavior: "smooth" })
      setCurrentSection(index)
    }
  }

  return (
    <div className="relative">
      <div className="max-w-4xl mx-auto px-6 py-12">
        {children}
      </div>
      
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 flex gap-4">
        <Button
          variant="outline"
          onClick={() => scrollToSection(currentSection - 1)}
          disabled={currentSection === 0}
        >
          <ChevronLeft className="h-4 w-4" />
          Previous
        </Button>
        <Button
          variant="outline"
          onClick={() => scrollToSection(currentSection + 1)}
          disabled={currentSection === sections.length - 1}
        >
          Next
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}

