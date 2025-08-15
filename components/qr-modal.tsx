"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Download, RefreshCw } from "lucide-react"
import type { Ticket } from "@/lib/types"
import { useEffect, useRef, useState } from "react"
import QRCode from "qrcode"

interface QRModalProps {
  isOpen: boolean
  onClose: () => void
  ticket: Ticket
}

export function QRModal({ isOpen, onClose, ticket }: QRModalProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [qrData, setQrData] = useState("")
  const [salt, setSalt] = useState(Date.now())

  // Generate QR data with salt for security
  useEffect(() => {
    const data = JSON.stringify({
      ticketId: ticket.id,
      tokenId: ticket.tokenId,
      eventId: ticket.eventId,
      owner: ticket.owner,
      salt: salt,
      timestamp: Date.now(),
    })
    setQrData(data)
  }, [ticket, salt])

  // Generate QR code
  useEffect(() => {
    if (qrData && canvasRef.current) {
      QRCode.toCanvas(canvasRef.current, qrData, {
        width: 300,
        margin: 2,
        color: {
          dark: "#ffffff",
          light: "#1a1a2e",
        },
      })
    }
  }, [qrData])

  const downloadQR = () => {
    if (canvasRef.current) {
      const link = document.createElement("a")
      link.download = `ticket-${ticket.id}-qr.png`
      link.href = canvasRef.current.toDataURL()
      link.click()
    }
  }

  const refreshQR = () => {
    setSalt(Date.now())
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-[95vw] max-w-md mx-auto bg-gradient-to-br from-gray-900 to-gray-800 border-white/10">
        <DialogHeader>
          <DialogTitle className="text-center text-white">Check-in QR Code</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <div className="flex justify-center">
            <div className="p-3 sm:p-4 bg-white rounded-lg">
              <canvas ref={canvasRef} className="max-w-full h-auto" />
            </div>
          </div>

          <div className="text-center space-y-2">
            <p className="text-sm text-gray-400">Present this QR code at the event entrance</p>
            <p className="text-xs text-gray-500">QR code refreshes automatically for security</p>
          </div>

          <div className="flex flex-col xs:flex-row gap-2">
            <Button onClick={refreshQR} variant="outline" className="flex-1 bg-transparent touch-manipulation">
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
            <Button
              onClick={downloadQR}
              className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 touch-manipulation"
            >
              <Download className="h-4 w-4 mr-2" />
              Download
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
