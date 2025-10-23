"use client"

import Link from "next/link"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-primary text-primary-foreground py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Company Info */}
          <div>
            <h3 className="font-bold text-lg mb-4">Aytec Global</h3>
            <p className="text-primary-foreground/80 text-sm">
              Your trusted partner for bulk trading and B2B solutions in mobile phone accessories.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="#home" className="hover:text-accent transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="#our-team-experts" className="hover:text-accent transition-colors">
                  Our Team Experts
                </Link>
              </li>
              <li>
                <Link href="#register" className="hover:text-accent transition-colors">
                  Register Trade
                </Link>
              </li>
              <li>
                <Link href="#contact" className="hover:text-accent transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="#" className="hover:text-accent transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-accent transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-accent transition-colors">
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-primary-foreground/20 pt-8">
          <p className="text-center text-sm text-primary-foreground/80">
            © {currentYear} Aytec Global Ltd. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
