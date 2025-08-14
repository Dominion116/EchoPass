"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Calendar, Users, Zap, Shield, DollarSign, Rocket } from "lucide-react"
import type { CreateEventData } from "@/lib/types"

interface ConfirmDeployStepProps {
  data: CreateEventData
  onDeploy: () => void
  isDeploying: boolean
}

export function ConfirmDeployStep({ data, onDeploy, isDeploying }: ConfirmDeployStepProps) {
  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
    })
  }

  const totalSupply = data.tiers.reduce((acc, tier) => acc + tier.maxSupply, 0)
  const lowestPrice = Math.min(...data.tiers.map((tier) => Number.parseFloat(tier.price)))

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-white mb-2">Review & Deploy</h2>
        <p className="text-gray-400">Review your event details before deploying to the blockchain</p>
      </div>

      {/* Event Overview */}
      <Card className="bg-gradient-to-br from-white/5 to-white/10 border-white/10">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Event Overview
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="text-xl font-semibold text-white">{data.name}</h3>
            <p className="text-gray-400 mt-1">{data.description}</p>
          </div>

          <div className="flex flex-wrap gap-2">
            <Badge variant="outline" className="bg-purple-500/20 text-purple-300 border-purple-500/30">
              {data.category}
            </Badge>
            <Badge variant="outline" className="bg-blue-500/20 text-blue-300 border-blue-500/30">
              <Users className="h-3 w-3 mr-1" />
              {totalSupply} max attendees
            </Badge>
            <Badge variant="outline" className="bg-green-500/20 text-green-300 border-green-500/30">
              <Zap className="h-3 w-3 mr-1" />
              From {lowestPrice} ETH
            </Badge>
          </div>

          <Separator className="bg-white/10" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-gray-400">Start Date</p>
              <p className="text-white">{formatDate(data.startTime)}</p>
            </div>
            <div>
              <p className="text-gray-400">End Date</p>
              <p className="text-white">{formatDate(data.endTime)}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Ticket Tiers */}
      <Card className="bg-gradient-to-br from-white/5 to-white/10 border-white/10">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Zap className="h-5 w-5" />
            Ticket Tiers ({data.tiers.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {data.tiers.map((tier, index) => (
              <div key={tier.id} className="p-4 rounded-lg border border-white/10">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h4 className="text-white font-medium">{tier.name}</h4>
                    <p className="text-gray-400 text-sm">{tier.description}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-purple-300 font-semibold">{tier.price} ETH</p>
                    <p className="text-gray-400 text-sm">{tier.maxSupply} available</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-1">
                  {tier.benefits.map((benefit, benefitIndex) => (
                    <Badge key={benefitIndex} variant="secondary" className="text-xs bg-white/10 text-gray-300">
                      {benefit}
                    </Badge>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Policies */}
      <Card className="bg-gradient-to-br from-white/5 to-white/10 border-white/10">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Policies & Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <DollarSign className="h-4 w-4 text-gray-400" />
              <span className="text-white">Resale Policy</span>
            </div>
            <Badge
              variant="outline"
              className={
                data.resalePolicy === "allowed"
                  ? "bg-green-500/20 text-green-300 border-green-500/30"
                  : data.resalePolicy === "restricted"
                    ? "bg-yellow-500/20 text-yellow-300 border-yellow-500/30"
                    : "bg-red-500/20 text-red-300 border-red-500/30"
              }
            >
              {data.resalePolicy === "allowed"
                ? "Allowed"
                : data.resalePolicy === "restricted"
                  ? "Restricted"
                  : "Disabled"}
            </Badge>
          </div>

          <Separator className="bg-white/10" />

          <div>
            <div className="flex items-center gap-2 mb-2">
              <Calendar className="h-4 w-4 text-gray-400" />
              <span className="text-white">Check-in Window</span>
            </div>
            <div className="text-sm text-gray-400 space-y-1">
              <p>Opens: {formatDate(data.checkInWindow.start)}</p>
              <p>Closes: {formatDate(data.checkInWindow.end)}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Deploy Section */}
      <Card className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border-purple-500/30">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <Rocket className="h-8 w-8 text-purple-400 mt-1" />
            <div className="flex-1">
              <h3 className="text-xl font-semibold text-white mb-2">Ready to Deploy</h3>
              <p className="text-gray-300 mb-4">
                Your event will be deployed to the blockchain. This action cannot be undone. Make sure all details are
                correct.
              </p>
              <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-3 mb-4">
                <p className="text-yellow-300 text-sm">
                  <strong>Gas fees apply:</strong> Deploying an event requires a blockchain transaction. Estimated cost:
                  ~0.01 ETH
                </p>
              </div>
              <Button
                onClick={onDeploy}
                disabled={isDeploying}
                size="lg"
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
              >
                <Rocket className="h-4 w-4 mr-2" />
                {isDeploying ? "Deploying Event..." : "Deploy Event"}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
