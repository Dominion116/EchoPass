"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { QRScanner } from "@/components/qr-scanner"
import { CheckInFeed } from "@/components/check-in-feed"
import { Monitor, Lock, Unlock, Settings } from "lucide-react"
import { toast } from "sonner"

export default function KioskPage() {
  const [isKioskMode, setIsKioskMode] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [passphrase, setPassphrase] = useState("")
  const [showAuth, setShowAuth] = useState(false)

  const KIOSK_PASSPHRASE = process.env.NEXT_PUBLIC_KIOSK_PASSPHRASE || "change-me"

  useEffect(() => {
    // Check if already authenticated
    const auth = localStorage.getItem("kiosk-auth")
    if (auth === "true") {
      setIsAuthenticated(true)
    }
  }, [])

  const handleAuth = () => {
    if (passphrase === KIOSK_PASSPHRASE) {
      setIsAuthenticated(true)
      localStorage.setItem("kiosk-auth", "true")
      setShowAuth(false)
      setPassphrase("")
      toast.success("Kiosk access granted")
    } else {
      toast.error("Invalid passphrase")
      setPassphrase("")
    }
  }

  const toggleKioskMode = () => {
    setIsKioskMode(!isKioskMode)
    if (!isKioskMode) {
      // Enter fullscreen
      document.documentElement.requestFullscreen?.()
    } else {
      // Exit fullscreen
      document.exitFullscreen?.()
    }
  }

  const handleScan = async (qrData: string): Promise<boolean> => {
    try {
      // Parse QR data
      const ticketData = JSON.parse(qrData)

      // Validate ticket data structure
      if (!ticketData.ticketId || !ticketData.eventId || !ticketData.owner) {
        throw new Error("Invalid ticket data")
      }

      // Call check-in API
      const response = await fetch("/api/checkin/qr", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ticketData,
          timestamp: Date.now(),
        }),
      })

      const result = await response.json()
      return result.success
    } catch (error) {
      console.error("Check-in error:", error)
      return false
    }
  }

  const logout = () => {
    setIsAuthenticated(false)
    localStorage.removeItem("kiosk-auth")
    setIsKioskMode(false)
    if (document.fullscreenElement) {
      document.exitFullscreen?.()
    }
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900 flex items-center justify-center">
        <Card className="w-full max-w-md bg-gradient-to-br from-white/5 to-white/10 border-white/10">
          <CardContent className="p-8">
            <div className="text-center mb-6">
              <Lock className="h-12 w-12 text-purple-400 mx-auto mb-4" />
              <h1 className="text-2xl font-bold text-white mb-2">Kiosk Access</h1>
              <p className="text-gray-400">Enter the admin passphrase to access kiosk mode</p>
            </div>

            <div className="space-y-4">
              <Input
                type="password"
                placeholder="Enter passphrase"
                value={passphrase}
                onChange={(e) => setPassphrase(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleAuth()}
                className="bg-white/5 border-white/10 text-white placeholder:text-gray-400"
              />

              <Button
                onClick={handleAuth}
                disabled={!passphrase}
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
              >
                <Unlock className="h-4 w-4 mr-2" />
                Access Kiosk
              </Button>
            </div>

            <div className="mt-6 p-3 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
              <p className="text-yellow-300 text-sm">
                <strong>Demo:</strong> Use passphrase "change-me" or check your .env file
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (isKioskMode) {
    return (
      <div className="h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900 p-4">
        {/* Kiosk Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4">
            <Badge className="bg-green-500/20 text-green-300 border-green-500/30 px-3 py-1">
              <Monitor className="h-4 w-4 mr-2" />
              KIOSK MODE ACTIVE
            </Badge>
            <h1 className="text-2xl font-bold text-white">EchoPass Check-in</h1>
          </div>

          <div className="flex gap-2">
            <Button onClick={toggleKioskMode} variant="outline" size="sm" className="bg-transparent">
              Exit Kiosk Mode
            </Button>
            <Button onClick={logout} variant="outline" size="sm" className="bg-transparent">
              <Lock className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Kiosk Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 h-[calc(100vh-120px)]">
          <QRScanner onScan={handleScan} isKioskMode={true} />
          <CheckInFeed isKioskMode={true} />
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Check-in Console</h1>
            <p className="text-gray-400">Scan QR codes to check in event attendees</p>
          </div>

          <div className="flex gap-2">
            <Button onClick={toggleKioskMode} className="bg-gradient-to-r from-purple-500 to-pink-500">
              <Monitor className="h-4 w-4 mr-2" />
              Enter Kiosk Mode
            </Button>
            <Button onClick={logout} variant="outline" className="bg-transparent">
              <Lock className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>

        {/* Console Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <QRScanner onScan={handleScan} />
          <CheckInFeed />
        </div>

        {/* Instructions */}
        <Card className="mt-8 bg-blue-500/10 border-blue-500/30">
          <CardContent className="p-6">
            <div className="flex items-start gap-3">
              <Settings className="h-5 w-5 text-blue-400 mt-0.5" />
              <div>
                <h3 className="text-blue-300 font-medium mb-2">Kiosk Mode Instructions</h3>
                <ul className="text-blue-200 text-sm space-y-1">
                  <li>• Click "Enter Kiosk Mode" for fullscreen check-in interface</li>
                  <li>• QR codes are validated in real-time with security salts</li>
                  <li>• Each ticket can only be checked in once</li>
                  <li>• Use manual input for damaged or unreadable QR codes</li>
                  <li>• Rotate security salt regularly for enhanced security</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
