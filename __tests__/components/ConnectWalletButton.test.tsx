import { describe, it, expect, vi } from "vitest"
import { render, screen, fireEvent } from "@testing-library/react"
import { ConnectWalletButton } from "@/components/connect-wallet-button"

// Mock wagmi hooks
vi.mock("wagmi", () => ({
  useAccount: vi.fn(() => ({
    address: undefined,
    isConnected: false,
  })),
  useConnect: vi.fn(() => ({
    connect: vi.fn(),
    connectors: [
      { uid: "metamask", name: "MetaMask" },
      { uid: "walletconnect", name: "WalletConnect" },
    ],
    isPending: false,
  })),
  useDisconnect: vi.fn(() => ({
    disconnect: vi.fn(),
  })),
}))

// Mock sonner
vi.mock("sonner", () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
  },
}))

describe("ConnectWalletButton", () => {
  it("renders connect button when not connected", () => {
    render(<ConnectWalletButton />)
    expect(screen.getByText("Connect Wallet")).toBeInTheDocument()
  })

  it("shows connector options when clicked", async () => {
    render(<ConnectWalletButton />)

    const connectButton = screen.getByText("Connect Wallet")
    fireEvent.click(connectButton)

    expect(screen.getByText("MetaMask")).toBeInTheDocument()
    expect(screen.getByText("WalletConnect")).toBeInTheDocument()
  })

  it("displays connected address when connected", () => {
    const { useAccount } = require("wagmi")
    useAccount.mockReturnValue({
      address: "0x1234567890123456789012345678901234567890",
      isConnected: true,
    })

    render(<ConnectWalletButton />)
    expect(screen.getByText("0x1234...7890")).toBeInTheDocument()
  })
})
