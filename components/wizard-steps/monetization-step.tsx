"use client"

import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, Shield, DollarSign } from "lucide-react"
import type { CreateEventData } from "@/lib/types"

interface MonetizationStepProps {
  data: Partial<CreateEventData>
  onUpdate: (data: Partial<CreateEventData>) => void
}

export function MonetizationStep({ data, onUpdate }: MonetizationStepProps) {
  const handleResalePolicyChange = (value: "allowed" | "restricted" | "disabled") => {
    onUpdate({ resalePolicy: value })
  }

  const handleCheckInWindowChange = (field: "start" | "end", value: string) => {
    const checkInWindow = data.checkInWindow || { start: new Date(), end: new Date() }
    onUpdate({
      checkInWindow: {
        ...checkInWindow,
        [field]: new Date(value),
      },
    })
  }

  const formatDateTimeLocal = (date?: Date) => {
    if (!date) return ""
    const offset = date.getTimezoneOffset()
    const localDate = new Date(date.getTime() - offset * 60 * 1000)
    return localDate.toISOString().slice(0, 16)
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-white mb-2">Monetization & Check-in</h2>
        <p className="text-gray-400">Configure resale policy and check-in window</p>
      </div>

      {/* Resale Policy */}
      <Card className="bg-gradient-to-br from-white/5 to-white/10 border-white/10">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <DollarSign className="h-5 w-5" />
            Resale Policy
          </CardTitle>
        </CardHeader>
        <CardContent>
          <RadioGroup
            value={data.resalePolicy || "allowed"}
            onValueChange={handleResalePolicyChange}
            className="space-y-4"
          >
            <div className="flex items-start space-x-3 p-4 rounded-lg border border-white/10 hover:border-purple-500/30 transition-colors">
              <RadioGroupItem value="allowed" id="allowed" className="mt-1" />
              <div className="flex-1">
                <Label htmlFor="allowed" className="text-white font-medium cursor-pointer">
                  Allow Resale
                </Label>
                <p className="text-gray-400 text-sm mt-1">
                  Ticket holders can freely resell their tickets to others at any price.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3 p-4 rounded-lg border border-white/10 hover:border-purple-500/30 transition-colors">
              <RadioGroupItem value="restricted" id="restricted" className="mt-1" />
              <div className="flex-1">
                <Label htmlFor="restricted" className="text-white font-medium cursor-pointer">
                  Restricted Resale
                </Label>
                <p className="text-gray-400 text-sm mt-1">
                  Tickets can be resold but with price caps and organizer approval.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3 p-4 rounded-lg border border-white/10 hover:border-purple-500/30 transition-colors">
              <RadioGroupItem value="disabled" id="disabled" className="mt-1" />
              <div className="flex-1">
                <Label htmlFor="disabled" className="text-white font-medium cursor-pointer">
                  No Resale
                </Label>
                <p className="text-gray-400 text-sm mt-1">Tickets are non-transferable and cannot be resold.</p>
              </div>
            </div>
          </RadioGroup>
        </CardContent>
      </Card>

      {/* Check-in Window */}
      <Card className="bg-gradient-to-br from-white/5 to-white/10 border-white/10">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Check-in Window
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="text-gray-400 text-sm">
            Define when attendees can check in to your event. This helps manage entry flow and security.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="checkinStart" className="text-white">
                Check-in Opens *
              </Label>
              <Input
                id="checkinStart"
                type="datetime-local"
                value={formatDateTimeLocal(data.checkInWindow?.start)}
                onChange={(e) => handleCheckInWindowChange("start", e.target.value)}
                className="mt-2 bg-white/5 border-white/10 text-white"
              />
            </div>

            <div>
              <Label htmlFor="checkinEnd" className="text-white">
                Check-in Closes *
              </Label>
              <Input
                id="checkinEnd"
                type="datetime-local"
                value={formatDateTimeLocal(data.checkInWindow?.end)}
                onChange={(e) => handleCheckInWindowChange("end", e.target.value)}
                className="mt-2 bg-white/5 border-white/10 text-white"
              />
            </div>
          </div>

          <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <Shield className="h-5 w-5 text-blue-400 mt-0.5" />
              <div>
                <h4 className="text-blue-300 font-medium mb-2">Security Features</h4>
                <ul className="text-blue-200 text-sm space-y-1">
                  <li>• QR codes are time-sensitive and rotate automatically</li>
                  <li>• Check-in window prevents early or late entries</li>
                  <li>• Each ticket can only be used once for check-in</li>
                  <li>• Real-time validation prevents duplicate entries</li>
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
