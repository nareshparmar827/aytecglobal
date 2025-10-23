"use client"

import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import RegisterForm from "@/components/register-form"
import TrustedClients from "@/components/trusted-clients"
import RegisterContactUs from "@/components/register-contact-us"
import { useState, useEffect } from "react"

export default function RegisterPage() {
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
      <RegisterForm />
      <TrustedClients />
      <RegisterContactUs />
      <Footer />
    </main>
  )
}
