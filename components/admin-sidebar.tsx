"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

const navItems = [
  { href: "/admin", label: "Dashboard", icon: "📊" },
  { href: "/admin/contact1", label: "Contact 1", icon: "📧" },
//  { href: "/admin/projects", label: "Projects", icon: "📁" },
  { href: "/admin/contact", label: "Contact Submissions", icon: "📧" },
  { href: "/admin/contacts", label: "Contact", icon: "📧" },
]

export function AdminSidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-64 border-r bg-muted/50 min-h-screen">
      <nav className="space-y-2 p-4">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center gap-3 px-4 py-2 rounded-lg transition-colors",
              pathname === item.href ? "bg-primary text-primary-foreground" : "hover:bg-background text-foreground",
            )}
          >
            <span>{item.icon}</span>
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>
    </aside>
  )
}
