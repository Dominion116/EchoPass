"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Activity, CheckCircle, XCircle, Users } from "lucide-react"

interface CheckInEvent {
  id: string
  ticketId: string
  eventName: string
  attendeeName?: string
  timestamp: number
  success: boolean
  reason?: string
}

interface CheckInFeedProps {
  isKioskMode?: boolean
}

export function CheckInFeed({ isKioskMode = false }: CheckInFeedProps) {
  const [checkIns, setCheckIns] = useState<CheckInEvent[]>([])
  const [stats, setStats] = useState({
    total: 0,
    successful: 0,
    failed: 0,
  })

  // Mock data for demonstration
  useEffect(() => {
    const mockCheckIns: CheckInEvent[] = [
      {
        id: "1",
        ticketId: "TKT-001",
        eventName: "Web3 Developer Conference 2024",
        attendeeName: "John Doe",
        timestamp: Date.now() - 300000,
        success: true,
      },
      {
        id: "2",
        ticketId: "TKT-002",
        eventName: "Web3 Developer Conference 2024",
        attendeeName: "Jane Smith",
        timestamp: Date.now() - 600000,
        success: true,
      },
      {
        id: "3",
        ticketId: "TKT-003",
        eventName: "Web3 Developer Conference 2024",
        timestamp: Date.now() - 900000,
        success: false,
        reason: "Already checked in",
      },
    ]

    setCheckIns(mockCheckIns)
    setStats({
      total: mockCheckIns.length,
      successful: mockCheckIns.filter((c) => c.success).length,
      failed: mockCheckIns.filter((c) => !c.success).length,
    })
  }, [])

  const addCheckIn = (checkIn: CheckInEvent) => {
    setCheckIns((prev) => [checkIn, ...prev.slice(0, 49)]) // Keep last 50
    setStats((prev) => ({
      total: prev.total + 1,
      successful: prev.successful + (checkIn.success ? 1 : 0),
      failed: prev.failed + (checkIn.success ? 0 : 1),
    }))
  }

  const formatTime = (timestamp: number) => {
    return new Date(timestamp).toLocaleTimeString()
  }

  const formatRelativeTime = (timestamp: number) => {
    const diff = Date.now() - timestamp
    const minutes = Math.floor(diff / 60000)
    if (minutes < 1) return "Just now"
    if (minutes < 60) return `${minutes}m ago`
    const hours = Math.floor(minutes / 60)
    return `${hours}h ago`
  }

  return (
    <Card className={`bg-gradient-to-br from-white/5 to-white/10 border-white/10 ${isKioskMode ? "h-full" : ""}`}>
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Activity className="h-5 w-5" />
          Live Check-in Feed
        </CardTitle>

        {/* Stats */}
        <div className="flex gap-4">
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-blue-400" />
            <span className="text-blue-300 font-medium">{stats.total}</span>
            <span className="text-gray-400 text-sm">Total</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="h-4 w-4 text-green-400" />
            <span className="text-green-300 font-medium">{stats.successful}</span>
            <span className="text-gray-400 text-sm">Success</span>
          </div>
          <div className="flex items-center gap-2">
            <XCircle className="h-4 w-4 text-red-400" />
            <span className="text-red-300 font-medium">{stats.failed}</span>
            <span className="text-gray-400 text-sm">Failed</span>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <ScrollArea className="h-96">
          <div className="space-y-3">
            {checkIns.length === 0 ? (
              <div className="text-center py-8">
                <Activity className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-400">No check-ins yet</p>
              </div>
            ) : (
              checkIns.map((checkIn) => (
                <div
                  key={checkIn.id}
                  className={`p-3 rounded-lg border transition-all ${
                    checkIn.success
                      ? "bg-green-500/5 border-green-500/20 hover:border-green-500/30"
                      : "bg-red-500/5 border-red-500/20 hover:border-red-500/30"
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        {checkIn.success ? (
                          <CheckCircle className="h-4 w-4 text-green-400" />
                        ) : (
                          <XCircle className="h-4 w-4 text-red-400" />
                        )}
                        <span className="text-white font-medium">{checkIn.attendeeName || checkIn.ticketId}</span>
                      </div>

                      <p className="text-gray-400 text-sm mb-2">{checkIn.eventName}</p>

                      {!checkIn.success && checkIn.reason && (
                        <Badge variant="outline" className="bg-red-500/20 text-red-300 border-red-500/30 text-xs">
                          {checkIn.reason}
                        </Badge>
                      )}
                    </div>

                    <div className="text-right text-xs text-gray-400">
                      <p>{formatTime(checkIn.timestamp)}</p>
                      <p>{formatRelativeTime(checkIn.timestamp)}</p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}
