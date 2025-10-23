"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"

export default function RegisterTradeAccount() {
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
    <section ref={ref} id="register" className="py-16 sm:py-24 bg-gradient-to-r from-primary to-primary/80">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className={`transition-all duration-1000 ${isVisible ? "slide-up" : "opacity-0 translate-y-10"}`}>
          <h2 className="text-3xl sm:text-4xl font-bold text-primary-foreground mb-4 text-balance">
            Ready to partner?
          </h2>
          <p className="text-lg text-primary-foreground/90 mb-8 text-balance">
            Register your trade account and we'll help you get started with bulk mobile accessories supply.
          </p>
          <Link
            href="/register"
            className="inline-block bg-accent hover:bg-accent/90 text-accent-foreground px-8 py-3 rounded-lg font-semibold transition-all duration-200 transform hover:scale-105"
          >
            Register Now
          </Link>
        </div>
      </div>
    </section>
  )
}
