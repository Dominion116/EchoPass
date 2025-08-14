import { describe, it, expect, vi } from "vitest"
import { render, screen, fireEvent } from "@testing-library/react"
import { TicketCard } from "@/components/ticket-card"
import type { Ticket } from "@/lib/types"

const mockTicket: Ticket = {
  id: "ticket-1",
  eventId: "event-1",
  eventName: "Test Event",
  tierId: 1,
  tierName: "General Admission",
  tokenId: 123,
  owner: "0x1234567890123456789012345678901234567890",
  checkedIn: false,
}

// Mock QRModal component
vi.mock("@/components/qr-modal", () => ({
  QRModal: ({ isOpen, ticket }: any) => (
    <div data-testid="qr-modal" style={{ display: isOpen ? "block" : "none" }}>
      QR Modal for {ticket?.id}
    </div>
  ),
}))

describe("TicketCard", () => {
  it("renders ticket information correctly", () => {
    render(<TicketCard ticket={mockTicket} />)

    expect(screen.getByText("Test Event")).toBeInTheDocument()
    expect(screen.getByText("General Admission")).toBeInTheDocument()
    expect(screen.getByText("Token ID: #123")).toBeInTheDocument()
    expect(screen.getByText("Ticket ID: ticket-1")).toBeInTheDocument()
  })

  it("shows pending status for unchecked tickets", () => {
    render(<TicketCard ticket={mockTicket} />)

    expect(screen.getByText("Pending")).toBeInTheDocument()
    expect(screen.getByText("Show QR Code")).toBeInTheDocument()
  })

  it("shows checked in status for checked tickets", () => {
    const checkedTicket = { ...mockTicket, checkedIn: true }
    render(<TicketCard ticket={checkedTicket} />)

    expect(screen.getByText("Checked In")).toBeInTheDocument()
    expect(screen.getByText("Already Checked In")).toBeInTheDocument()
  })

  it("opens QR modal when button clicked", () => {
    render(<TicketCard ticket={mockTicket} />)

    const qrButton = screen.getByText("Show QR Code")
    fireEvent.click(qrButton)

    expect(screen.getByTestId("qr-modal")).toBeVisible()
  })
})
