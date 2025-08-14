import { describe, it, expect, vi } from "vitest"
import { render, screen, fireEvent } from "@testing-library/react"
import { CreateEventWizard } from "@/components/create-event-wizard"

// Mock sonner
vi.mock("sonner", () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
  },
}))

// Mock fetch
global.fetch = vi.fn()

describe("CreateEventWizard", () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it("renders initial step correctly", () => {
    render(<CreateEventWizard />)

    expect(screen.getByText("Create New Event")).toBeInTheDocument()
    expect(screen.getByText("Step 1 of 4")).toBeInTheDocument()
    expect(screen.getByText("Event Details")).toBeInTheDocument()
  })

  it("shows progress indicator", () => {
    render(<CreateEventWizard />)

    expect(screen.getByText("Event Details")).toBeInTheDocument()
    expect(screen.getByText("Ticket Tiers")).toBeInTheDocument()
    expect(screen.getByText("Monetization")).toBeInTheDocument()
    expect(screen.getByText("Deploy")).toBeInTheDocument()
  })

  it("prevents navigation without required fields", () => {
    render(<CreateEventWizard />)

    const nextButton = screen.getByText("Next")
    fireEvent.click(nextButton)

    // Should still be on step 1
    expect(screen.getByText("Step 1 of 4")).toBeInTheDocument()
  })

  it("allows navigation with valid data", () => {
    render(<CreateEventWizard />)

    // Fill required fields
    fireEvent.change(screen.getByPlaceholderText("Enter event name"), {
      target: { value: "Test Event" },
    })
    fireEvent.change(screen.getByPlaceholderText("Describe your event..."), {
      target: { value: "Test description" },
    })

    const nextButton = screen.getByText("Next")
    fireEvent.click(nextButton)

    // Should move to step 2
    expect(screen.getByText("Step 2 of 4")).toBeInTheDocument()
  })
})
