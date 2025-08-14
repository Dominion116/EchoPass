"use client"

import { useQuery } from "@tanstack/react-query"
import { useAccount } from "wagmi"
import { mockContractFunctions } from "@/lib/mockContracts"
import { CONTRACT_ADDRESSES } from "@/lib/contracts"
import type { Event, Ticket } from "@/lib/types"

// Hook to fetch all events
export function useEvents() {
  return useQuery({
    queryKey: ["events"],
    queryFn: async (): Promise<Event[]> => {
      // Use mock data if contracts are not deployed
      if (!CONTRACT_ADDRESSES.EVENT_FACTORY) {
        return mockContractFunctions.getEvents()
      }

      // TODO: Replace with actual contract calls when deployed
      return mockContractFunctions.getEvents()
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
}

// Hook to fetch a specific event
export function useEvent(eventId: string) {
  return useQuery({
    queryKey: ["event", eventId],
    queryFn: async (): Promise<Event | null> => {
      if (!CONTRACT_ADDRESSES.EVENT_FACTORY) {
        return mockContractFunctions.getEvent(eventId)
      }

      // TODO: Replace with actual contract calls when deployed
      return mockContractFunctions.getEvent(eventId)
    },
    enabled: !!eventId,
    staleTime: 5 * 60 * 1000,
  })
}

// Hook to fetch user's tickets
export function useUserTickets() {
  const { address } = useAccount()

  return useQuery({
    queryKey: ["tickets", address],
    queryFn: async (): Promise<Ticket[]> => {
      if (!address) return []

      if (!CONTRACT_ADDRESSES.EVENT_FACTORY) {
        return mockContractFunctions.getUserTickets(address)
      }

      // TODO: Replace with actual contract calls when deployed
      return mockContractFunctions.getUserTickets(address)
    },
    enabled: !!address,
    staleTime: 2 * 60 * 1000, // 2 minutes
  })
}
