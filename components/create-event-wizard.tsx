"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { ChevronLeft, ChevronRight, Check } from "lucide-react"
import { EventDetailsStep } from "./wizard-steps/event-details-step"
import { TierSetupStep } from "./wizard-steps/tier-setup-step"
import { MonetizationStep } from "./wizard-steps/monetization-step"
import { ConfirmDeployStep } from "./wizard-steps/confirm-deploy-step"
import type { CreateEventData } from "@/lib/types"
import { toast } from "sonner"

const STEPS = [
  { id: 1, name: "Event Details", description: "Basic information about your event" },
  { id: 2, name: "Ticket Tiers", description: "Configure pricing and availability" },
  { id: 3, name: "Monetization", description: "Set resale policy and check-in window" },
  { id: 4, name: "Deploy", description: "Review and deploy your event" },
]

export function CreateEventWizard() {
  const [currentStep, setCurrentStep] = useState(1)
  const [isDeploying, setIsDeploying] = useState(false)
  const [eventData, setEventData] = useState<Partial<CreateEventData>>({
    tiers: [],
    resalePolicy: "allowed",
  })

  const updateEventData = (data: Partial<CreateEventData>) => {
    setEventData((prev) => ({ ...prev, ...data }))
  }

  const validateStep = (step: number): boolean => {
    switch (step) {
      case 1:
        return !!(
          eventData.name &&
          eventData.description &&
          eventData.startTime &&
          eventData.endTime &&
          eventData.category
        )
      case 2:
        return eventData.tiers && eventData.tiers.length > 0
      case 3:
        return !!(eventData.resalePolicy && eventData.checkInWindow)
      default:
        return true
    }
  }

  const nextStep = () => {
    if (!validateStep(currentStep)) {
      toast.error("Please fill in all required fields")
      return
    }
    if (currentStep < STEPS.length) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleDeploy = async () => {
    if (!validateStep(currentStep)) {
      toast.error("Please review all information")
      return
    }

    setIsDeploying(true)
    try {
      // Call backend API to deploy event
      const response = await fetch("/api/events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(eventData),
      })

      if (!response.ok) {
        throw new Error("Failed to deploy event")
      }

      const result = await response.json()
      toast.success("Event deployed successfully!", {
        description: `Event address: ${result.eventAddress}`,
      })

      // Reset wizard or redirect
      setEventData({ tiers: [], resalePolicy: "allowed" })
      setCurrentStep(1)
    } catch (error) {
      toast.error("Failed to deploy event", {
        description: error instanceof Error ? error.message : "Unknown error occurred",
      })
    } finally {
      setIsDeploying(false)
    }
  }

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <EventDetailsStep data={eventData} onUpdate={updateEventData} />
      case 2:
        return <TierSetupStep data={eventData} onUpdate={updateEventData} />
      case 3:
        return <MonetizationStep data={eventData} onUpdate={updateEventData} />
      case 4:
        return (
          <ConfirmDeployStep data={eventData as CreateEventData} onDeploy={handleDeploy} isDeploying={isDeploying} />
        )
      default:
        return null
    }
  }

  const progress = (currentStep / STEPS.length) * 100

  return (
    <div className="max-w-4xl mx-auto">
      {/* Progress Header */}
      <Card className="mb-8 bg-gradient-to-r from-white/5 to-white/10 border-white/10">
        <CardHeader>
          <div className="flex items-center justify-between mb-4">
            <CardTitle className="text-white">Create New Event</CardTitle>
            <Badge variant="outline" className="bg-purple-500/20 text-purple-300 border-purple-500/30">
              Step {currentStep} of {STEPS.length}
            </Badge>
          </div>
          <Progress value={progress} className="mb-4" />
          <div className="grid grid-cols-4 gap-4">
            {STEPS.map((step) => (
              <div
                key={step.id}
                className={`text-center p-3 rounded-lg transition-all ${
                  step.id === currentStep
                    ? "bg-purple-500/20 border border-purple-500/30"
                    : step.id < currentStep
                      ? "bg-green-500/20 border border-green-500/30"
                      : "bg-white/5 border border-white/10"
                }`}
              >
                <div className="flex items-center justify-center mb-2">
                  {step.id < currentStep ? (
                    <Check className="h-5 w-5 text-green-400" />
                  ) : (
                    <span
                      className={`w-6 h-6 rounded-full flex items-center justify-center text-sm font-medium ${
                        step.id === currentStep ? "bg-purple-500 text-white" : "bg-gray-600 text-gray-300"
                      }`}
                    >
                      {step.id}
                    </span>
                  )}
                </div>
                <h3
                  className={`font-medium text-sm ${
                    step.id === currentStep
                      ? "text-purple-300"
                      : step.id < currentStep
                        ? "text-green-300"
                        : "text-gray-400"
                  }`}
                >
                  {step.name}
                </h3>
                <p className="text-xs text-gray-500 mt-1">{step.description}</p>
              </div>
            ))}
          </div>
        </CardHeader>
      </Card>

      {/* Step Content */}
      <Card className="mb-8 bg-gradient-to-br from-white/5 to-white/10 border-white/10">
        <CardContent className="p-8">{renderStep()}</CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex items-center justify-between">
        <Button
          variant="outline"
          onClick={prevStep}
          disabled={currentStep === 1}
          className="bg-transparent border-white/20 text-white hover:bg-white/10"
        >
          <ChevronLeft className="h-4 w-4 mr-2" />
          Previous
        </Button>

        <div className="text-sm text-gray-400">
          Step {currentStep} of {STEPS.length}
        </div>

        {currentStep === STEPS.length ? (
          <Button
            onClick={handleDeploy}
            disabled={isDeploying || !validateStep(currentStep)}
            className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
          >
            {isDeploying ? "Deploying..." : "Deploy Event"}
          </Button>
        ) : (
          <Button
            onClick={nextStep}
            disabled={!validateStep(currentStep)}
            className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
          >
            Next
            <ChevronRight className="h-4 w-4 ml-2" />
          </Button>
        )}
      </div>
    </div>
  )
}
