"use client"

import { EchoPassHeader } from "@/components/echopass-header"
import { ContractStatusBar } from "@/components/contract-status-bar"
import { TicketCard } from "@/components/ticket-card"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Ticket, Wallet, Plus } from "lucide-react"
import { useUserTickets } from "@/hooks/useContract"
import { useAccount } from "wagmi"
import Link from "next/link"

export default function TicketsPage() {
  const { isConnected, address } = useAccount()
  const { data: tickets, isLoading, error } = useUserTickets()

  if (!isConnected) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900">
        <EchoPassHeader />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center py-12">
            <Wallet className="h-16 w-16 text-gray-400 mx-auto mb-6" />
            <h1 className="text-3xl font-bold text-white mb-4">Connect Your Wallet</h1>
            <p className="text-gray-400 mb-8 max-w-md mx-auto">
              Connect your wallet to view your tickets and manage your event attendance
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900">
      <EchoPassHeader />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <ContractStatusBar />
        </div>

        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">My Tickets</h1>
          <p className="text-gray-300">Manage your event tickets and generate QR codes for check-in</p>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-white/5 rounded-lg h-48"></div>
              </div>
            ))}
          </div>
        ) : error ? (
          <Card className="bg-red-500/10 border-red-500/30">
            <CardContent className="p-8 text-center">
              <Ticket className="h-12 w-12 text-red-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">Failed to load tickets</h3>
              <p className="text-red-300">Please try again later</p>
            </CardContent>
          </Card>
        ) : !tickets || tickets.length === 0 ? (
          <div className="text-center py-12">
            <Ticket className="h-16 w-16 text-gray-400 mx-auto mb-6" />
            <h3 className="text-2xl font-semibold text-white mb-4">No tickets yet</h3>
            <p className="text-gray-400 mb-8 max-w-md mx-auto">
              You haven't purchased any tickets yet. Browse events and get your first ticket!
            </p>
            <Button
              asChild
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
            >
              <Link href="/">
                <Plus className="h-4 w-4 mr-2" />
                Browse Events
              </Link>
            </Button>
          </div>
        ) : (
          <>
            <div className="mb-6 flex items-center justify-between">
              <p className="text-gray-400">
                Showing {tickets.length} ticket{tickets.length !== 1 ? "s" : ""} for {address?.slice(0, 6)}...
                {address?.slice(-4)}
              </p>
              <Button asChild variant="outline">
                <Link href="/">
                  <Plus className="h-4 w-4 mr-2" />
                  Get More Tickets
                </Link>
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {tickets.map((ticket) => (
                <TicketCard key={ticket.id} ticket={ticket} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}
