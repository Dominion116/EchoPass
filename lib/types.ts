export interface Event {
  id: string
  address: string
  name: string
  description: string
  startTime: number
  endTime: number
  organizer: string
  category: string
  status: "upcoming" | "live" | "ended"
  image?: string
  tiers: EventTier[]
}

export interface EventTier {
  id: number
  name: string
  price: string
  maxSupply: number
  currentSupply: number
  description: string
  benefits: string[]
}

export interface Ticket {
  id: string
  eventId: string
  eventName: string
  tierId: number
  tierName: string
  tokenId: number
  owner: string
  checkedIn: boolean
  qrCode?: string
}

export interface CreateEventData {
  name: string
  description: string
  startTime: Date
  endTime: Date
  category: string
  image?: string
  tiers: Omit<EventTier, "id" | "currentSupply">[]
  resalePolicy: "allowed" | "restricted" | "disabled"
  checkInWindow: {
    start: Date
    end: Date
  }
}
