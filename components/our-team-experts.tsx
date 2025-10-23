"use client"

import { useEffect, useRef, useState } from "react"
import { Truck, Headphones } from "lucide-react"

export default function OurTeamExperts() {
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
    <section ref={ref} className="py-16 sm:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl font-bold text-center text-foreground mb-16 text-balance">
          Our team of experts
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Image Slider */}
          <div
            className={`lg:col-span-1 transition-all duration-1000 ${
              isVisible ? "slide-up" : "opacity-0 translate-y-10"
            }`}
          >
            <img
              src="/professional-team-meeting.jpg"
              alt="Our team of experts"
              className="w-full h-96 object-cover rounded-lg shadow-lg"
            />
          </div>

          {/* Content */}
          <div className="lg:col-span-2 space-y-8">
            <div
              className={`transition-all duration-1000 delay-200 ${
                isVisible ? "slide-up" : "opacity-0 translate-y-10"
              }`}
            >
              <p className="text-lg text-foreground/80 leading-relaxed font-semibold">
                With years of proven experience, our team is prepared to help you achieve your goals, and beyond.
              </p>
            </div>

            <div
              className={`bg-primary/5 p-8 rounded-lg transition-all duration-1000 delay-300 ${
                isVisible ? "slide-up" : "opacity-0 translate-y-10"
              }`}
            >
              <div className="flex items-start gap-4 mb-4">
                <Truck className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-bold text-foreground mb-2">Fast & Reliable Fulfillment</h3>
                  <p className="text-foreground/70">
                    We ship orders quickly and efficiently, keeping your customers satisfied and your inventory
                    well-managed.
                  </p>
                </div>
              </div>
            </div>

            <div
              className={`bg-accent/10 p-8 rounded-lg transition-all duration-1000 delay-400 ${
                isVisible ? "slide-up" : "opacity-0 translate-y-10"
              }`}
            >
              <div className="flex items-start gap-4">
                <Headphones className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-bold text-foreground mb-2">Expert Support & Guidance</h3>
                  <p className="text-foreground/70">
                    Our dedicated team offers tailored solutions and guidance from start to finish, ensuring your
                    success.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
