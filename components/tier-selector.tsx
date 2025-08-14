"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Minus, Plus, Zap, Users, CheckCircle } from "lucide-react"
import type { EventTier } from "@/lib/types"
import { useState } from "react"

interface TierSelectorProps {
  tier: EventTier
  onMint: (tierId: number, amount: number) => void
  isLoading?: boolean
}

export function TierSelector({ tier, onMint, isLoading = false }: TierSelectorProps) {
  const [quantity, setQuantity] = useState(1)

  const isAvailable = tier.currentSupply < tier.maxSupply
  const remaining = tier.maxSupply - tier.currentSupply
  const totalPrice = (Number.parseFloat(tier.price) * quantity).toFixed(4)

  const handleQuantityChange = (delta: number) => {
    const newQuantity = Math.max(1, Math.min(remaining, quantity + delta))
    setQuantity(newQuantity)
  }

  return (
    <Card className="bg-gradient-to-br from-white/5 to-white/10 border-white/10 hover:border-purple-500/30 transition-all duration-300">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-white">{tier.name}</CardTitle>
            <p className="text-gray-400 text-sm mt-1">{tier.description}</p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-purple-300 flex items-center gap-1">
              <Zap className="h-5 w-5" />
              {tier.price} ETH
            </div>
            <div className="text-sm text-gray-400 flex items-center gap-1 mt-1">
              <Users className="h-3 w-3" />
              {remaining} left
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="space-y-2">
          <h4 className="text-sm font-medium text-gray-300">Benefits:</h4>
          <ul className="space-y-1">
            {tier.benefits.map((benefit, index) => (
              <li key={index} className="text-sm text-gray-400 flex items-center gap-2">
                <CheckCircle className="h-3 w-3 text-green-400 flex-shrink-0" />
                {benefit}
              </li>
            ))}
          </ul>
        </div>

        {isAvailable ? (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-300">Quantity:</span>
              <div className="flex items-center gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleQuantityChange(-1)}
                  disabled={quantity <= 1}
                  className="h-8 w-8 p-0"
                >
                  <Minus className="h-3 w-3" />
                </Button>
                <span className="w-8 text-center text-white">{quantity}</span>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleQuantityChange(1)}
                  disabled={quantity >= remaining}
                  className="h-8 w-8 p-0"
                >
                  <Plus className="h-3 w-3" />
                </Button>
              </div>
            </div>

            <div className="flex items-center justify-between text-lg font-semibold">
              <span className="text-gray-300">Total:</span>
              <span className="text-purple-300">{totalPrice} ETH</span>
            </div>

            <Button
              onClick={() => onMint(tier.id, quantity)}
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
            >
              {isLoading ? "Minting..." : `Mint ${quantity} Ticket${quantity > 1 ? "s" : ""}`}
            </Button>
          </div>
        ) : (
          <Badge
            variant="secondary"
            className="w-full justify-center py-2 bg-red-500/20 text-red-400 border-red-500/30"
          >
            Sold Out
          </Badge>
        )}
      </CardContent>
    </Card>
  )
}
