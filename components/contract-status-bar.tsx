"use client"

import { useAccount, useBalance, useChainId } from "wagmi"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Wallet, Zap, Network } from "lucide-react"
import { formatEther } from "viem"

export function ContractStatusBar() {
  const { address, isConnected } = useAccount()
  const chainId = useChainId()
  const { data: balance } = useBalance({ address })

  if (!isConnected) {
    return null
  }

  const getChainName = (id: number) => {
    switch (id) {
      case 8453:
        return "Base"
      case 31337:
        return "Localhost"
      default:
        return `Chain ${id}`
    }
  }

  const getChainColor = (id: number) => {
    switch (id) {
      case 8453:
        return "bg-blue-500/10 text-blue-500 border-blue-500/20"
      case 31337:
        return "bg-yellow-500/10 text-yellow-500 border-yellow-500/20"
      default:
        return "bg-gray-500/10 text-gray-500 border-gray-500/20"
    }
  }

  return (
    <Card className="p-3 bg-background/50 backdrop-blur-sm border-white/10">
      <div className="flex items-center gap-4 text-sm">
        <div className="flex items-center gap-2">
          <Network className="h-4 w-4 text-muted-foreground" />
          <Badge variant="outline" className={getChainColor(chainId)}>
            {getChainName(chainId)}
          </Badge>
        </div>

        <Separator orientation="vertical" className="h-4" />

        <div className="flex items-center gap-2">
          <Wallet className="h-4 w-4 text-muted-foreground" />
          <span className="text-muted-foreground">
            {address?.slice(0, 6)}...{address?.slice(-4)}
          </span>
        </div>

        <Separator orientation="vertical" className="h-4" />

        <div className="flex items-center gap-2">
          <Zap className="h-4 w-4 text-muted-foreground" />
          <span className="text-muted-foreground">
            {balance ? `${Number.parseFloat(formatEther(balance.value)).toFixed(4)} ETH` : "0.0000 ETH"}
          </span>
        </div>
      </div>
    </Card>
  )
}
