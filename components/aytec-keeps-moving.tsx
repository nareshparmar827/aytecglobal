"use client"

import { useEffect, useRef, useState } from "react"
import { Zap, CheckCircle, Lightbulb } from "lucide-react"

const cards = [
  {
    icon: Lightbulb,
    title: "What We Offer",
    description:
      "At Aytec, we specialise in bulk and graded stock of mobile phone accessories—including cases, chargers, cables, and audio devices. Our deep industry connections allow us to source high-quality products at competitive prices, enabling you to stay ahead in a fast-moving market.",
  },
  {
    icon: CheckCircle,
    title: "Uncompromising QC",
    description:
      "Quality is our top priority. Every batch of stock undergoes rigorous testing and grading to ensure it meets our strict standards. By maintaining high quality across the board, we help you build trust with your customers and stay ahead of the competition.",
  },
  {
    icon: Zap,
    title: "Tailored Solutions",
    description:
      "We understand that every business is unique. Whether you need specific brands, custom packaging options, or flexible payment terms, our dedicated team is here to craft a solution that aligns perfectly with your requirements.",
  },
]

export default function AytecKeepsMoving() {
  const [isVisible, setIsVisible] = useState(false)
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

  return (
    <section ref={ref} className="py-16 sm:py-24 bg-primary/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl font-bold text-center text-foreground mb-16 text-balance">
          Aytec keeps it moving
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {cards.map((card, index) => {
            const Icon = card.icon
            return (
              <div
                key={index}
                className={`bg-card p-8 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105 ${
                  isVisible ? "slide-up" : "opacity-0 translate-y-10"
                }`}
                style={{
                  transitionDelay: isVisible ? `${index * 100}ms` : "0ms",
                }}
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 bg-accent/10 rounded-lg">
                    <Icon className="w-6 h-6 text-accent" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground">{card.title}</h3>
                </div>
                <p className="text-foreground/70 leading-relaxed">{card.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
