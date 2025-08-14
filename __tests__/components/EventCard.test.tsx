import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { EventCard } from "@/components/event-card"
import type { Event } from "@/lib/types"

const mockEvent: Event = {
  id: "1",
  address: "0x1234567890123456789012345678901234567890",
  name: "Test Event",
  description: "A test event description",
  startTime: Date.now() + 86400000,
  endTime: Date.now() + 86400000 * 2,
  organizer: "0xabcd",
  category: "Conference",
  status: "upcoming",
  tiers: [
    {
      id: 1,
      name: "General",
      price: "0.1",
      maxSupply: 100,
      currentSupply: 50,
      description: "General admission",
      benefits: ["Access to all sessions"],
    },
  ],
}

describe("EventCard", () => {
  it("renders event information correctly", () => {
    render(<EventCard event={mockEvent} />)

    expect(screen.getByText("Test Event")).toBeInTheDocument()
    expect(screen.getByText("A test event description")).toBeInTheDocument()
    expect(screen.getByText("Conference")).toBeInTheDocument()
    expect(screen.getByText("upcoming")).toBeInTheDocument()
  })

  it("displays correct pricing", () => {
    render(<EventCard event={mockEvent} />)
    expect(screen.getByText("From 0.1 ETH")).toBeInTheDocument()
  })

  it("shows attendance count", () => {
    render(<EventCard event={mockEvent} />)
    expect(screen.getByText("50 attending")).toBeInTheDocument()
  })

  it("has view event link", () => {
    render(<EventCard event={mockEvent} />)
    const link = screen.getByText("View Event").closest("a")
    expect(link).toHaveAttribute("href", "/events/1")
  })
})
