"use client"

import { useState, useEffect } from "react"
import Navbar from "@/components/navbar"
import Hero from "@/components/hero"
import StockSourcing from "@/components/stock-sourcing"
import AytecKeepsMoving from "@/components/aytec-keeps-moving"
import OurTeamExperts from "@/components/our-team-experts"
import TrustedClients from "@/components/trusted-clients.tsx"
import RegisterTradeAccount from "@/components/register-trade-account"
import ContactUs from "@/components/contact-us"
import Footer from "@/components/footer"

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <main className="min-h-screen bg-background">
      <Navbar isScrolled={isScrolled} />
      <Hero />
      <StockSourcing />
      <AytecKeepsMoving />
      <OurTeamExperts />
      <TrustedClients />
      <RegisterTradeAccount />
      <ContactUs />
      <Footer />
    </main>
  )
}
