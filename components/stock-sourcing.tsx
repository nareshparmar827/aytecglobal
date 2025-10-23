"use client"

import { useEffect, useRef, useState } from "react"

export default function StockSourcing() {
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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className={`transition-all duration-1000 ${isVisible ? "slide-up" : "opacity-0 translate-y-10"}`}>
            <div className="inline-block bg-accent/10 text-accent px-4 py-2 rounded-full mb-4 font-semibold text-sm">
              Stock Sourcing and Supply
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6 text-balance">
              Powering Your Business with Quality Mobile Accessories at Scale
            </h2>
            <p className="text-foreground/80 leading-relaxed mb-6">
              Welcome to Aytec—your trusted partner for bulk trading and B2B solutions in mobile phone accessories. From
              graded stock to brand-new items, we bridge the gap between suppliers and businesses with transparent
              pricing, consistent quality, and swift global deliveries. Count on our expertise to keep your inventory
              stocked with in-demand products that help your business grow.
            </p>
          </div>

          {/* Right Images */}
          <div
            className={`grid grid-cols-2 gap-4 transition-all duration-1000 delay-200 ${
              isVisible ? "slide-up" : "opacity-0 translate-y-10"
            }`}
          >
            <div className="col-span-2">
              <img
                src="/images/belkin-samsung-ecosystem-campaign-2025-dotcom-assets-homepage-mobile-768x500-r1-v1-us-REV.jpg"
                alt="Mobile accessories bulk stock"
                className="w-full h-64 object-cover rounded-lg shadow-lg"
              />
            </div>
            <div>
              <img
                src="/images/8_About_Business_Consulting_Company-Hero-Img_2.jpg"
                alt="Graded mobile phones"
                className="w-full h-56 object-cover rounded-lg shadow-lg"
              />
            </div>
            <div>
              <img
                src="/images/best-samsung-phone-hero-1.png"
                alt="Phone accessories and chargers"
                className="w-full h-56 object-cover rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
