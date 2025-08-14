"use client"

import { useState } from "react"
import { useParams } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { EchoPassHeader } from "@/components/echopass-header"
import { ContractStatusBar } from "@/components/contract-status-bar"
import { TierSelector } from "@/components/tier-selector"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Calendar, Users, Clock, ExternalLink } from "lucide-react"
import { useEvent } from "@/hooks/useContract"
import { useAccount } from "wagmi"
import { toast } from "sonner"
import { EVENT_STATUS_COLORS } from "@/lib/constants"
import { mockContractFunctions } from "@/lib/mockContracts"

export default function EventDetailPage() {
  const params = useParams()
  const eventId = params.eventId as string
  const { data: event, isLoading } = useEvent(eventId)
  const { isConnected } = useAccount()
  const [mintingTier, setMintingTier] = useState<number | null>(null)

  const handleMint = async (tierId: number, amount: number) => {
    if (!isConnected) {
      toast.error("Please connect your wallet first")
      return
    }

    if (!event) return

    setMintingTier(tierId)

    try {
      // Mock mint function - replace with actual contract call
      const txHash = await mockContractFunctions.mintTicket(event.address, tierId, amount)

      toast.success("Tickets minted successfully!", {
        description: `Transaction: ${txHash.slice(0, 10)}...`,
        action: {
          label: "View",
          onClick: () => window.open(`https://basescan.org/tx/${txHash}`, "_blank"),
        },
      })
    } catch (error) {
      toast.error("Failed to mint tickets", {
        description: error instanceof Error ? error.message : "Unknown error occurred",
      })
    } finally {
      setMintingTier(null)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900">
        <EchoPassHeader />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="animate-pulse space-y-8">
            <div className="h-8 bg-white/10 rounded w-32"></div>
            <div className="h-64 bg-white/10 rounded"></div>
            <div className="space-y-4">
              <div className="h-8 bg-white/10 rounded w-3/4"></div>
              <div className="h-4 bg-white/10 rounded w-1/2"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!event) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900">
        <EchoPassHeader />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center py-12">
            <h1 className="text-2xl font-bold text-white mb-4">Event not found</h1>
            <Button asChild>
              <Link href="/">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Events
              </Link>
            </Button>
          </div>
        </div>
      </div>
    )
  }

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const formatTime = (timestamp: number) => {
    return new Date(timestamp).toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900">
      <EchoPassHeader />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <ContractStatusBar />
        </div>

        <div className="mb-6">
          <Button variant="ghost" asChild className="text-gray-300 hover:text-white">
            <Link href="/">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Events
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Event Details */}
          <div className="lg:col-span-2 space-y-6">
            <div className="relative aspect-video rounded-lg overflow-hidden">
              <Image
                src={event.image || "/placeholder.svg?height=400&width=800&query=event"}
                alt={event.name}
                fill
                className="object-cover"
              />
              <div className="absolute top-4 left-4">
                <Badge className={EVENT_STATUS_COLORS[event.status]}>{event.status}</Badge>
              </div>
              <div className="absolute top-4 right-4">
                <Badge variant="secondary" className="bg-black/50 text-white border-0">
                  {event.category}
                </Badge>
              </div>
            </div>

            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">{event.name}</h1>
              <p className="text-gray-300 text-lg leading-relaxed">{event.description}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card className="bg-white/5 border-white/10">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <Calendar className="h-5 w-5 text-purple-400" />
                    <div>
                      <p className="text-white font-medium">Start Date</p>
                      <p className="text-gray-400 text-sm">{formatDate(event.startTime)}</p>
                      <p className="text-gray-400 text-sm">{formatTime(event.startTime)}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/5 border-white/10">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <Clock className="h-5 w-5 text-purple-400" />
                    <div>
                      <p className="text-white font-medium">End Date</p>
                      <p className="text-gray-400 text-sm">{formatDate(event.endTime)}</p>
                      <p className="text-gray-400 text-sm">{formatTime(event.endTime)}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="bg-white/5 border-white/10">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Organizer Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Organized by</p>
                    <p className="text-white font-mono">{event.organizer}</p>
                  </div>
                  <Button variant="outline" size="sm">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    View Profile
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Ticket Tiers */}
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-white mb-4">Available Tickets</h2>
              <div className="space-y-4">
                {event.tiers.map((tier) => (
                  <TierSelector key={tier.id} tier={tier} onMint={handleMint} isLoading={mintingTier === tier.id} />
                ))}
              </div>
            </div>

            {!isConnected && (
              <Card className="bg-yellow-500/10 border-yellow-500/30">
                <CardContent className="p-4">
                  <p className="text-yellow-300 text-sm">Connect your wallet to purchase tickets</p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
