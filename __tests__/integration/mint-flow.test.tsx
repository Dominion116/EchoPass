import type React from "react"
import { describe, it, expect, vi, beforeEach } from "vitest"
import { render, screen, fireEvent, waitFor } from "@testing-library/react"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { WagmiProvider } from "wagmi"
import { config } from "@/lib/wagmi"
import EventDetailPage from "@/app/events/[eventId]/page"

// Mock Next.js router
vi.mock("next/navigation", () => ({
  useParams: () => ({ eventId: "1" }),
  useRouter: () => ({
    push: vi.fn(),
    back: vi.fn(),
  }),
}))

// Mock wagmi hooks
vi.mock("wagmi", () => ({
  ...vi.importActual("wagmi"),
  useAccount: vi.fn(() => ({
    address: "0x1234567890123456789012345678901234567890",
    isConnected: true,
  })),
  usePublicClient: vi.fn(() => ({
    readContract: vi.fn(),
  })),
  useWalletClient: vi.fn(() => ({
    data: {
      writeContract: vi.fn(() => Promise.resolve("0xmocktxhash")),
    },
  })),
}))

// Mock contract hooks
vi.mock("@/hooks/useContract", () => ({
  useEvent: vi.fn(() => ({
    data: {
      id: "1",
      name: "Test Event",
      description: "Test Description",
      startTime: Date.now() + 86400000,
      endTime: Date.now() + 86400000 * 2,
      organizer: "0xorganizer",
      category: "Conference",
      status: "upcoming",
      address: "0xeventaddress",
      tiers: [
        {
          id: 1,
          name: "General",
          price: "0.1",
          maxSupply: 100,
          currentSupply: 50,
          description: "General admission",
          benefits: ["Access to sessions"],
        },
      ],
    },
    isLoading: false,
  })),
}))

// Mock sonner
vi.mock("sonner", () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
  },
}))

// Mock contract functions
vi.mock("@/lib/mockContracts", () => ({
  mockContractFunctions: {
    mintTicket: vi.fn(() => Promise.resolve("0xmocktxhash")),
  },
}))

const TestWrapper = ({ children }: { children: React.ReactNode }) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
    },
  })

  return (
    <QueryClientProvider client={queryClient}>
      <WagmiProvider config={config}>{children}</WagmiProvider>
    </QueryClientProvider>
  )
}

describe("Mint Flow Integration", () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it("completes full mint flow successfully", async () => {
    const { mockContractFunctions } = await import("@/lib/mockContracts")

    render(
      <TestWrapper>
        <EventDetailPage />
      </TestWrapper>,
    )

    // Wait for event to load
    await waitFor(() => {
      expect(screen.getByText("Test Event")).toBeInTheDocument()
    })

    // Find and click mint button
    const mintButton = screen.getByText("Mint 1 Ticket")
    expect(mintButton).toBeInTheDocument()

    fireEvent.click(mintButton)

    // Wait for mint function to be called
    await waitFor(() => {
      expect(mockContractFunctions.mintTicket).toHaveBeenCalledWith("0xeventaddress", 1, 1)
    })

    // Check success toast was called
    const { toast } = await import("sonner")
    expect(toast.success).toHaveBeenCalledWith(
      "Tickets minted successfully!",
      expect.objectContaining({
        description: "Transaction: 0xmocktxha...",
      }),
    )
  })

  it("handles mint failure gracefully", async () => {
    const { mockContractFunctions } = await import("@/lib/mockContracts")
    mockContractFunctions.mintTicket.mockRejectedValue(new Error("Insufficient funds"))

    render(
      <TestWrapper>
        <EventDetailPage />
      </TestWrapper>,
    )

    await waitFor(() => {
      expect(screen.getByText("Test Event")).toBeInTheDocument()
    })

    const mintButton = screen.getByText("Mint 1 Ticket")
    fireEvent.click(mintButton)

    await waitFor(() => {
      expect(mockContractFunctions.mintTicket).toHaveBeenCalled()
    })

    // Check error toast was called
    const { toast } = await import("sonner")
    expect(toast.error).toHaveBeenCalledWith(
      "Failed to mint tickets",
      expect.objectContaining({
        description: "Insufficient funds",
      }),
    )
  })

  it("prevents minting when wallet not connected", async () => {
    const { useAccount } = await import("wagmi")
    useAccount.mockReturnValue({
      address: undefined,
      isConnected: false,
    })

    render(
      <TestWrapper>
        <EventDetailPage />
      </TestWrapper>,
    )

    await waitFor(() => {
      expect(screen.getByText("Test Event")).toBeInTheDocument()
    })

    const mintButton = screen.getByText("Mint 1 Ticket")
    fireEvent.click(mintButton)

    // Check error toast for wallet connection
    const { toast } = await import("sonner")
    expect(toast.error).toHaveBeenCalledWith("Please connect your wallet first")
  })
})
