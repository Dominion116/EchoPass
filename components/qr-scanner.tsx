"use client"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Scan, CheckCircle, XCircle, RotateCcw } from "lucide-react"
import { toast } from "sonner"

interface QRScannerProps {
  onScan: (data: string) => Promise<boolean>
  isKioskMode?: boolean
}

export function QRScanner({ onScan, isKioskMode = false }: QRScannerProps) {
  const [isScanning, setIsScanning] = useState(false)
  const [lastScan, setLastScan] = useState<{ data: string; success: boolean; timestamp: number } | null>(null)
  const [salt, setSalt] = useState(Date.now())
  const videoRef = useRef<HTMLVideoElement>(null)
  const streamRef = useRef<MediaStream | null>(null)

  const startScanning = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" },
      })

      if (videoRef.current) {
        videoRef.current.srcObject = stream
        streamRef.current = stream
        setIsScanning(true)
      }
    } catch (error) {
      toast.error("Failed to access camera")
      console.error("Camera access error:", error)
    }
  }

  const stopScanning = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop())
      streamRef.current = null
    }
    setIsScanning(false)
  }

  const rotateSalt = () => {
    setSalt(Date.now())
    toast.success("Security salt rotated")
  }

  const handleManualInput = () => {
    const input = prompt("Enter QR code data manually:")
    if (input) {
      handleScan(input)
    }
  }

  const handleScan = async (data: string) => {
    try {
      const success = await onScan(data)
      setLastScan({ data, success, timestamp: Date.now() })

      if (success) {
        toast.success("Check-in successful!")
      } else {
        toast.error("Check-in failed - invalid or already used ticket")
      }
    } catch (error) {
      toast.error("Check-in error")
      setLastScan({ data, success: false, timestamp: Date.now() })
    }
  }

  useEffect(() => {
    return () => {
      stopScanning()
    }
  }, [])

  return (
    <Card className={`bg-gradient-to-br from-white/5 to-white/10 border-white/10 ${isKioskMode ? "h-full" : ""}`}>
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Scan className="h-5 w-5" />
          QR Code Scanner
        </CardTitle>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="bg-blue-500/20 text-blue-300 border-blue-500/30">
            Salt: {salt.toString().slice(-6)}
          </Badge>
          <Button size="sm" variant="ghost" onClick={rotateSalt}>
            <RotateCcw className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Camera View */}
        <div className="relative aspect-video bg-black rounded-lg overflow-hidden">
          {isScanning ? (
            <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover" />
          ) : (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <Scan className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-400">Camera not active</p>
              </div>
            </div>
          )}

          {/* Scanning Overlay */}
          {isScanning && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-48 h-48 border-2 border-purple-500 rounded-lg animate-pulse">
                <div className="absolute top-0 left-0 w-6 h-6 border-t-4 border-l-4 border-purple-500"></div>
                <div className="absolute top-0 right-0 w-6 h-6 border-t-4 border-r-4 border-purple-500"></div>
                <div className="absolute bottom-0 left-0 w-6 h-6 border-b-4 border-l-4 border-purple-500"></div>
                <div className="absolute bottom-0 right-0 w-6 h-6 border-b-4 border-r-4 border-purple-500"></div>
              </div>
            </div>
          )}
        </div>

        {/* Controls */}
        <div className="flex gap-2">
          {!isScanning ? (
            <Button onClick={startScanning} className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500">
              <Scan className="h-4 w-4 mr-2" />
              Start Scanning
            </Button>
          ) : (
            <Button onClick={stopScanning} variant="outline" className="flex-1 bg-transparent">
              Stop Scanning
            </Button>
          )}

          <Button onClick={handleManualInput} variant="outline" className="bg-transparent">
            Manual Input
          </Button>
        </div>

        {/* Last Scan Result */}
        {lastScan && (
          <div
            className={`p-3 rounded-lg border ${
              lastScan.success ? "bg-green-500/10 border-green-500/30" : "bg-red-500/10 border-red-500/30"
            }`}
          >
            <div className="flex items-center gap-2 mb-2">
              {lastScan.success ? (
                <CheckCircle className="h-4 w-4 text-green-400" />
              ) : (
                <XCircle className="h-4 w-4 text-red-400" />
              )}
              <span className={`font-medium ${lastScan.success ? "text-green-300" : "text-red-300"}`}>
                {lastScan.success ? "Check-in Successful" : "Check-in Failed"}
              </span>
            </div>
            <p className="text-xs text-gray-400 font-mono">{new Date(lastScan.timestamp).toLocaleTimeString()}</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
