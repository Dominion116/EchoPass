"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { ConnectWalletButton } from "@/components/connect-wallet-button"
import { Ticket, Calendar, BarChart3 } from "lucide-react"
import { cn } from "@/lib/utils"

export function EchoPassHeader() {
  const pathname = usePathname()

  const navigation = [
    { name: "Events", href: "/", icon: Calendar },
    { name: "My Tickets", href: "/tickets", icon: Ticket },
    { name: "Create Event", href: "/organizer/create", icon: BarChart3 },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-background/80 backdrop-blur-md">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-r from-purple-500 to-pink-500">
                <Ticket className="h-4 w-4 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                EchoPass
              </span>
            </Link>

            <nav className="hidden md:flex items-center gap-6">
              {navigation.map((item) => {
                const Icon = item.icon
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={cn(
                      "flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                      pathname === item.href
                        ? "bg-purple-500/20 text-purple-300"
                        : "text-gray-300 hover:text-white hover:bg-white/5",
                    )}
                  >
                    <Icon className="h-4 w-4" />
                    {item.name}
                  </Link>
                )
              })}
            </nav>
          </div>

          <ConnectWalletButton />
        </div>
      </div>
    </header>
  )
}
