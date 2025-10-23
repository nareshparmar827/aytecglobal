"use client"

import { useEffect, useState } from "react"
import Link from "next/link"

export default function Hero() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <section id="home" className="relative w-full h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url(/placeholder.svg?height=1080&width=1920&query=tech-trade-mobile-accessories-warehouse)",
          backgroundAttachment: "fixed",
        }}
      >
        <div className="absolute inset-0 bg-primary/70"></div>
      </div>

      {/* Content */}
      <div
        className={`relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto transition-all duration-1000 ${
          isVisible ? "fade-in" : "opacity-0"
        }`}
      >
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-primary-foreground mb-4 text-balance">
          Powering Your Business with Quality Mobile Accessories at Scale
        </h1>
        <p className="text-lg sm:text-xl text-primary-foreground/90 mb-8 text-balance">
          Bulk Supply • Graded Stock • Global Delivery
        </p>
        <Link
          href="#register"
          className="inline-block bg-accent hover:bg-accent/90 text-accent-foreground px-8 py-3 rounded-lg font-semibold transition-all duration-200 transform hover:scale-105"
        >
          Register Your Trade Account
        </Link>
      </div>
    </section>
  )
}
