"use client"

import Link from "next/link"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Users, Zap } from "lucide-react"
import type { Event } from "@/lib/types"
import { EVENT_STATUS_COLORS } from "@/lib/constants"

interface EventCardProps {
  event: Event
}

export function EventCard({ event }: EventCardProps) {
  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
  }

  const formatTime = (timestamp: number) => {
    return new Date(timestamp).toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
    })
  }

  const lowestPrice = Math.min(...event.tiers.map((tier) => Number.parseFloat(tier.price)))

  return (
    <Card className="group overflow-hidden bg-gradient-to-br from-white/5 to-white/10 border-white/10 hover:border-purple-500/30 transition-all duration-300 hover:scale-[1.02]">
      <div className="relative aspect-video overflow-hidden">
        <Image
          src={event.image || "/placeholder.svg?height=200&width=400&query=event"}
          alt={event.name}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
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

      <CardContent className="p-6">
        <div className="space-y-4">
          <div>
            <h3 className="text-xl font-semibold text-white group-hover:text-purple-300 transition-colors">
              {event.name}
            </h3>
            <p className="text-gray-400 text-sm mt-1 line-clamp-2">{event.description}</p>
          </div>

          <div className="flex items-center gap-4 text-sm text-gray-400">
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              <span>{formatDate(event.startTime)}</span>
            </div>
            <div className="flex items-center gap-1">
              <Users className="h-4 w-4" />
              <span>{event.tiers.reduce((acc, tier) => acc + tier.currentSupply, 0)} attending</span>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1 text-lg font-semibold text-purple-300">
              <Zap className="h-4 w-4" />
              <span>From {lowestPrice} ETH</span>
            </div>
            <Button
              asChild
              size="sm"
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
            >
              <Link href={`/events/${event.id}`}>View Event</Link>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
