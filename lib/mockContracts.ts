import type { Event, Ticket } from "./types"

// Mock data for development when contracts are not deployed
export const MOCK_EVENTS: Event[] = [
  {
    id: "1",
    address: "0x1234567890123456789012345678901234567890",
    name: "Web3 Developer Conference 2024",
    description: "Join the biggest Web3 developer conference of the year featuring talks from industry leaders.",
    startTime: Date.now() + 86400000 * 30, // 30 days from now
    endTime: Date.now() + 86400000 * 32, // 32 days from now
    organizer: "0xabcdefabcdefabcdefabcdefabcdefabcdefabcd",
    category: "Conference",
    status: "upcoming",
    image: "/web3-conference.png",
    tiers: [
      {
        id: 1,
        name: "General Admission",
        price: "0.1",
        maxSupply: 500,
        currentSupply: 150,
        description: "Access to all conference sessions",
        benefits: ["All sessions", "Networking lunch", "Conference swag"],
      },
      {
        id: 2,
        name: "VIP Pass",
        price: "0.25",
        maxSupply: 100,
        currentSupply: 25,
        description: "Premium access with exclusive perks",
        benefits: ["All sessions", "VIP lounge access", "Meet & greet", "Premium swag"],
      },
    ],
  },
  {
    id: "2",
    address: "0x2345678901234567890123456789012345678901",
    name: "DeFi Summit Miami",
    description: "Explore the future of decentralized finance with top DeFi protocols and builders.",
    startTime: Date.now() + 86400000 * 60, // 60 days from now
    endTime: Date.now() + 86400000 * 61, // 61 days from now
    organizer: "0xbcdefabcdefabcdefabcdefabcdefabcdefabcde",
    category: "Conference",
    status: "upcoming",
    image: "/placeholder-xwco4.png",
    tiers: [
      {
        id: 1,
        name: "Standard",
        price: "0.15",
        maxSupply: 300,
        currentSupply: 89,
        description: "Full conference access",
        benefits: ["All talks", "Networking events", "Conference materials"],
      },
    ],
  },
]

export const MOCK_TICKETS: Ticket[] = [
  {
    id: "1",
    eventId: "1",
    eventName: "Web3 Developer Conference 2024",
    tierId: 1,
    tierName: "General Admission",
    tokenId: 123,
    owner: "0x742d35Cc6634C0532925a3b8D4C9db96590b5c8e",
    checkedIn: false,
  },
  {
    id: "2",
    eventId: "2",
    eventName: "DeFi Summit Miami",
    tierId: 1,
    tierName: "Standard",
    tokenId: 456,
    owner: "0x742d35Cc6634C0532925a3b8D4C9db96590b5c8e",
    checkedIn: true,
  },
]

// Mock contract functions
export const mockContractFunctions = {
  async getEvents(): Promise<Event[]> {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 500))
    return MOCK_EVENTS
  },

  async getEvent(eventId: string): Promise<Event | null> {
    await new Promise((resolve) => setTimeout(resolve, 300))
    return MOCK_EVENTS.find((event) => event.id === eventId) || null
  },

  async getUserTickets(address: string): Promise<Ticket[]> {
    await new Promise((resolve) => setTimeout(resolve, 400))
    return MOCK_TICKETS.filter((ticket) => ticket.owner.toLowerCase() === address.toLowerCase())
  },

  async mintTicket(eventAddress: string, tierId: number, amount: number): Promise<string> {
    await new Promise((resolve) => setTimeout(resolve, 2000))
    // Return mock transaction hash
    return "0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef"
  },

  async createEvent(eventData: any): Promise<string> {
    await new Promise((resolve) => setTimeout(resolve, 3000))
    // Return mock event address
    return "0xabcdefabcdefabcdefabcdefabcdefabcdefabcd"
  },
}
