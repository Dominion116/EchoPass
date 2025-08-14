"use client"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { QrCode, CheckCircle, Clock } from "lucide-react"
import type { Ticket } from "@/lib/types"
import { useState } from "react"
import { QRModal } from "./qr-modal"

interface TicketCardProps {
  ticket: Ticket
}

export function TicketCard({ ticket }: TicketCardProps) {
  const [showQR, setShowQR] = useState(false)

  return (
    <>
      <Card className="bg-gradient-to-br from-white/5 to-white/10 border-white/10 hover:border-purple-500/30 transition-all duration-300">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="font-semibold text-white">{ticket.eventName}</h3>
              <p className="text-sm text-gray-400">{ticket.tierName}</p>
            </div>
            <Badge
              variant={ticket.checkedIn ? "default" : "secondary"}
              className={
                ticket.checkedIn
                  ? "bg-green-500/20 text-green-400 border-green-500/30"
                  : "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
              }
            >
              {ticket.checkedIn ? (
                <>
                  <CheckCircle className="h-3 w-3 mr-1" />
                  Checked In
                </>
              ) : (
                <>
                  <Clock className="h-3 w-3 mr-1" />
                  Pending
                </>
              )}
            </Badge>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="text-sm text-gray-400">
            <p>Token ID: #{ticket.tokenId}</p>
            <p>Ticket ID: {ticket.id}</p>
          </div>

          <Button
            onClick={() => setShowQR(true)}
            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
            disabled={ticket.checkedIn}
          >
            <QrCode className="h-4 w-4 mr-2" />
            {ticket.checkedIn ? "Already Checked In" : "Show QR Code"}
          </Button>
        </CardContent>
      </Card>

      <QRModal isOpen={showQR} onClose={() => setShowQR(false)} ticket={ticket} />
    </>
  )
}
