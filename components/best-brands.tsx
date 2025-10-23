"use client"

import { useEffect, useRef, useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

const brands = [
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

export default function BestBrands() {
  const [isVisible, setIsVisible] = useState(false)
  const [currentSlide, setCurrentSlide] = useState(0)
  const ref = useRef(null)

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

  const itemsPerSlide = 6
  const totalSlides = Math.ceil(brands.length / itemsPerSlide)

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides)
  }

  const visibleBrands = brands.slice(currentSlide * itemsPerSlide, (currentSlide + 1) * itemsPerSlide)

  return (
    <section ref={ref} className="py-16 sm:py-24 bg-primary/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl font-bold text-center text-foreground mb-16 text-balance">
          The best brands
        </h2>

        <div className="relative">
          {/* Carousel */}
          <div
            className={`grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 transition-all duration-1000 ${
              isVisible ? "fade-in" : "opacity-0"
            }`}
          >
            {visibleBrands.map((brand) => (
              <div
                key={brand.id}
                className="bg-card p-6 rounded-lg shadow-md flex items-center justify-center h-32 hover:shadow-lg transition-shadow"
              >
                <img
                  src={`/brandImages/${brand.src}`}
                  alt={brand.name}
                  className="w-20 h-20 object-contain"
                />
              </div>
            ))}
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12 bg-primary text-primary-foreground p-2 rounded-full hover:bg-primary/80 transition-colors"
            aria-label="Previous slide"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 bg-primary text-primary-foreground p-2 rounded-full hover:bg-primary/80 transition-colors"
            aria-label="Next slide"
          >
            <ChevronRight size={24} />
          </button>

          {/* Slide Indicators */}
          <div className="flex justify-center gap-2 mt-8">
            {Array.from({ length: totalSlides }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentSlide ? "bg-accent w-8" : "bg-muted"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
