import { describe, it, expect, vi } from "vitest"
import { render, screen, fireEvent } from "@testing-library/react"
import { QRScanner } from "@/components/qr-scanner"

// Mock navigator.mediaDevices
Object.defineProperty(navigator, "mediaDevices", {
  writable: true,
  value: {
    getUserMedia: vi.fn(() =>
      Promise.resolve({
        getTracks: () => [{ stop: vi.fn() }],
      }),
    ),
  },
})

// Mock sonner
vi.mock("sonner", () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
  },
}))

describe("QRScanner", () => {
  const mockOnScan = vi.fn()

  beforeEach(() => {
    mockOnScan.mockClear()
  })

  it("renders scanner interface", () => {
    render(<QRScanner onScan={mockOnScan} />)

    expect(screen.getByText("QR Code Scanner")).toBeInTheDocument()
    expect(screen.getByText("Start Scanning")).toBeInTheDocument()
    expect(screen.getByText("Manual Input")).toBeInTheDocument()
  })

  it("shows salt rotation button", () => {
    render(<QRScanner onScan={mockOnScan} />)

    expect(screen.getByText(/Salt:/)).toBeInTheDocument()
  })

  it("handles manual input", () => {
    // Mock window.prompt
    window.prompt = vi.fn(() => "test-qr-data")

    render(<QRScanner onScan={mockOnScan} />)

    const manualButton = screen.getByText("Manual Input")
    fireEvent.click(manualButton)

    expect(mockOnScan).toHaveBeenCalledWith("test-qr-data")
  })

  it("displays scan results", async () => {
    mockOnScan.mockResolvedValue(true)
    window.prompt = vi.fn(() => "test-qr-data")

    render(<QRScanner onScan={mockOnScan} />)

    const manualButton = screen.getByText("Manual Input")
    fireEvent.click(manualButton)

    // Wait for async operation
    await new Promise((resolve) => setTimeout(resolve, 0))

    expect(screen.getByText("Check-in Successful")).toBeInTheDocument()
  })
})
