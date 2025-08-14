import { getContract } from "viem"
import { usePublicClient, useWalletClient } from "wagmi"
import EventContractABI from "./abis/EventContract.abi.json"
import CheckInModuleABI from "./abis/CheckInModule.abi.json"
import EventFactoryABI from "./abis/EventFactory.abi.json"

// Contract addresses from environment variables
export const CONTRACT_ADDRESSES = {
  EVENT_FACTORY: process.env.NEXT_PUBLIC_EVENT_FACTORY_ADDRESS as `0x${string}`,
  CHECKIN_MODULE: process.env.NEXT_PUBLIC_CHECKIN_MODULE_ADDRESS as `0x${string}`,
  EAS: process.env.NEXT_PUBLIC_EAS_ADDRESS as `0x${string}`,
} as const

// Hook to get Event Factory contract instance
export function useEventFactoryContract() {
  const publicClient = usePublicClient()
  const { data: walletClient } = useWalletClient()

  if (!CONTRACT_ADDRESSES.EVENT_FACTORY || !publicClient) {
    return null
  }

  return getContract({
    address: CONTRACT_ADDRESSES.EVENT_FACTORY,
    abi: EventFactoryABI,
    client: { public: publicClient, wallet: walletClient },
  })
}

// Hook to get Event contract instance for a specific event
export function useEventContract(eventAddress: `0x${string}`) {
  const publicClient = usePublicClient()
  const { data: walletClient } = useWalletClient()

  if (!eventAddress || !publicClient) {
    return null
  }

  return getContract({
    address: eventAddress,
    abi: EventContractABI,
    client: { public: publicClient, wallet: walletClient },
  })
}

// Hook to get CheckIn Module contract instance
export function useCheckInModuleContract() {
  const publicClient = usePublicClient()
  const { data: walletClient } = useWalletClient()

  if (!CONTRACT_ADDRESSES.CHECKIN_MODULE || !publicClient) {
    return null
  }

  return getContract({
    address: CONTRACT_ADDRESSES.CHECKIN_MODULE,
    abi: CheckInModuleABI,
    client: { public: publicClient, wallet: walletClient },
  })
}

// Gas estimation utilities
export const GAS_LIMITS = {
  MINT_TICKET: 150000n,
  CREATE_EVENT: 500000n,
  CHECK_IN: 100000n,
} as const

// Helper function to estimate gas with buffer
export function addGasBuffer(gasEstimate: bigint, bufferPercent = 20): bigint {
  return gasEstimate + (gasEstimate * BigInt(bufferPercent)) / 100n
}
