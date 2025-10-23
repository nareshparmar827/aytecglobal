"use client"

import { useEffect, useRef, useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

export default function TrustedClients() {
  const [isVisible, setIsVisible] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)
  const ref = useRef(null)

  const logos = [
    { id: 1, name: "apple", src: "apple-logo-icon.png" },
    { id: 2, name: "Samsung", src: "Samsung-Logo.jpg" },
    { id: 3, name: "fitbit", src: "fitbit-logo-black-and-white.png" },
    { id: 4, name: "JBL", src: "JBL-logo.png" },
    { id: 5, name: "Anker", src: "Anker_logo.svg_.png" },
    { id: 6, name: "Mophie", src: "Mophie-Logo-New.png" },
    { id: 7, name: "belkin", src: "belkin-logo.png" },
    { id: 8, name: "OtterBox", src: "OtterBox-Logo.png" },
    { id: 9, name: "griffin-technology", src: "png-clipart-logo-brand-griffin-technology-font-griffin-text-trademark.png" },
    { id: 10, name: "Huawei", src: "Huawei-Emblem.png" },
    { id: 11, name: "Sony", src: "Sony-Logo-scaled.jpg" }
  ]

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 },
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [])

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? logos.length - 6 : prev - 1))
  }

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === logos.length - 6 ? 0 : prev + 1))
  }

  return (
    <section ref={ref} className="py-16 sm:py-24 bg-card border-y border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`transition-all duration-1000 ${isVisible ? "slide-up" : "opacity-0 translate-y-10"}`}>
          <h2 className="text-3xl sm:text-4xl font-bold text-center text-foreground mb-4 text-balance">
            Trusted by Our Clients
          </h2>
          <p className="text-center text-foreground/70 mb-12">The best brands choose Aytec Global</p>

          {/* Carousel */}
          <div className="relative">
            <div className="flex gap-6 overflow-hidden">
              {logos.slice(currentIndex, currentIndex + 6).map((logo) => (
                <div
                  key={logo.id}
                  className="flex-1 bg-background rounded-lg border border-border p-8 flex items-center justify-center min-h-[150px] hover:shadow-lg transition-shadow"
                >
                  <img
                    src={`/brandImages/${logo.src}`}
                    alt={logo.name}
                    className="max-w-full max-h-20 object-contain"
                  />
                </div>
              ))}
            </div>

            {/* Navigation Buttons */}
            <button
              onClick={handlePrevious}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-16 p-2 bg-accent hover:bg-accent/90 text-accent-foreground rounded-full transition-all"
            >
              <ChevronLeft size={24} />
            </button>

            <button
              onClick={handleNext}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-16 p-2 bg-accent hover:bg-accent/90 text-accent-foreground rounded-full transition-all"
            >
              <ChevronRight size={24} />
            </button>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-8">
            {Array.from({ length: Math.max(1, logos.length - 2) }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentIndex ? "bg-accent w-8" : "bg-muted"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
