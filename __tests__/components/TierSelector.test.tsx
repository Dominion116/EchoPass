import { describe, it, expect, vi } from "vitest"
import { render, screen, fireEvent } from "@testing-library/react"
import { TierSelector } from "@/components/tier-selector"
import type { EventTier } from "@/lib/types"

const mockTier: EventTier = {
  id: 1,
  name: "General Admission",
  price: "0.1",
  maxSupply: 100,
  currentSupply: 25,
  description: "Access to all sessions",
  benefits: ["All sessions", "Networking lunch"],
}

describe("TierSelector", () => {
  const mockOnMint = vi.fn()

  beforeEach(() => {
    mockOnMint.mockClear()
  })

  it("renders tier information correctly", () => {
    render(<TierSelector tier={mockTier} onMint={mockOnMint} />)

    expect(screen.getByText("General Admission")).toBeInTheDocument()
    expect(screen.getByText("Access to all sessions")).toBeInTheDocument()
    expect(screen.getByText("0.1 ETH")).toBeInTheDocument()
    expect(screen.getByText("75 left")).toBeInTheDocument()
  })

  it("displays benefits correctly", () => {
    render(<TierSelector tier={mockTier} onMint={mockOnMint} />)

    expect(screen.getByText("All sessions")).toBeInTheDocument()
    expect(screen.getByText("Networking lunch")).toBeInTheDocument()
  })

  it("allows quantity adjustment", () => {
    render(<TierSelector tier={mockTier} onMint={mockOnMint} />)

    const plusButton = screen.getByRole("button", { name: /plus/i })
    fireEvent.click(plusButton)

    expect(screen.getByText("2")).toBeInTheDocument()
    expect(screen.getByText("0.2000 ETH")).toBeInTheDocument()
  })

  it("calls onMint with correct parameters", () => {
    render(<TierSelector tier={mockTier} onMint={mockOnMint} />)

    const mintButton = screen.getByText("Mint 1 Ticket")
    fireEvent.click(mintButton)

    expect(mockOnMint).toHaveBeenCalledWith(1, 1)
  })

  it("shows sold out when no supply remaining", () => {
    const soldOutTier = { ...mockTier, currentSupply: 100 }
    render(<TierSelector tier={soldOutTier} onMint={mockOnMint} />)

    expect(screen.getByText("Sold Out")).toBeInTheDocument()
  })
})
