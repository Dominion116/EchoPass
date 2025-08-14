"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Plus, Trash2, Edit, Zap, Users } from "lucide-react"
import type { CreateEventData, EventTier } from "@/lib/types"

interface TierSetupStepProps {
  data: Partial<CreateEventData>
  onUpdate: (data: Partial<CreateEventData>) => void
}

export function TierSetupStep({ data, onUpdate }: TierSetupStepProps) {
  const [editingTier, setEditingTier] = useState<number | null>(null)
  const [tierForm, setTierForm] = useState<Omit<EventTier, "id" | "currentSupply">>({
    name: "",
    price: "",
    maxSupply: 100,
    description: "",
    benefits: [""],
  })

  const resetForm = () => {
    setTierForm({
      name: "",
      price: "",
      maxSupply: 100,
      description: "",
      benefits: [""],
    })
    setEditingTier(null)
  }

  const handleAddTier = () => {
    if (!tierForm.name || !tierForm.price) return

    const newTier: Omit<EventTier, "currentSupply"> = {
      id: Date.now(),
      ...tierForm,
      benefits: tierForm.benefits.filter((b) => b.trim() !== ""),
    }

    const updatedTiers = [...(data.tiers || []), newTier]
    onUpdate({ tiers: updatedTiers })
    resetForm()
  }

  const handleEditTier = (tier: Omit<EventTier, "currentSupply">) => {
    setTierForm(tier)
    setEditingTier(tier.id)
  }

  const handleUpdateTier = () => {
    if (!tierForm.name || !tierForm.price || editingTier === null) return

    const updatedTiers = (data.tiers || []).map((tier) =>
      tier.id === editingTier
        ? {
            ...tierForm,
            id: editingTier,
            benefits: tierForm.benefits.filter((b) => b.trim() !== ""),
          }
        : tier,
    )

    onUpdate({ tiers: updatedTiers })
    resetForm()
  }

  const handleDeleteTier = (tierId: number) => {
    const updatedTiers = (data.tiers || []).filter((tier) => tier.id !== tierId)
    onUpdate({ tiers: updatedTiers })
  }

  const handleBenefitChange = (index: number, value: string) => {
    const newBenefits = [...tierForm.benefits]
    newBenefits[index] = value
    setTierForm({ ...tierForm, benefits: newBenefits })
  }

  const addBenefit = () => {
    setTierForm({ ...tierForm, benefits: [...tierForm.benefits, ""] })
  }

  const removeBenefit = (index: number) => {
    const newBenefits = tierForm.benefits.filter((_, i) => i !== index)
    setTierForm({ ...tierForm, benefits: newBenefits })
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-white mb-2">Ticket Tiers</h2>
        <p className="text-gray-400">Configure different ticket types and pricing</p>
      </div>

      {/* Existing Tiers */}
      {data.tiers && data.tiers.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-white">Current Tiers</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {data.tiers.map((tier) => (
              <Card key={tier.id} className="bg-white/5 border-white/10">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-white text-lg">{tier.name}</CardTitle>
                      <div className="flex items-center gap-4 mt-2">
                        <Badge className="bg-purple-500/20 text-purple-300 border-purple-500/30">
                          <Zap className="h-3 w-3 mr-1" />
                          {tier.price} ETH
                        </Badge>
                        <Badge variant="outline" className="bg-blue-500/20 text-blue-300 border-blue-500/30">
                          <Users className="h-3 w-3 mr-1" />
                          {tier.maxSupply} max
                        </Badge>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="ghost" onClick={() => handleEditTier(tier)}>
                        <Edit className="h-3 w-3" />
                      </Button>
                      <Button size="sm" variant="ghost" onClick={() => handleDeleteTier(tier.id)}>
                        <Trash2 className="h-3 w-3 text-red-400" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-400 text-sm mb-3">{tier.description}</p>
                  <div className="space-y-1">
                    {tier.benefits.map((benefit, index) => (
                      <div key={index} className="text-sm text-gray-300 flex items-center gap-2">
                        <div className="w-1 h-1 bg-purple-400 rounded-full" />
                        {benefit}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Add/Edit Tier Form */}
      <Card className="bg-gradient-to-br from-white/5 to-white/10 border-white/10">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Plus className="h-5 w-5" />
            {editingTier ? "Edit Tier" : "Add New Tier"}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="tierName" className="text-white">
                Tier Name *
              </Label>
              <Input
                id="tierName"
                placeholder="e.g., General Admission"
                value={tierForm.name}
                onChange={(e) => setTierForm({ ...tierForm, name: e.target.value })}
                className="mt-2 bg-white/5 border-white/10 text-white placeholder:text-gray-400"
              />
            </div>

            <div>
              <Label htmlFor="tierPrice" className="text-white">
                Price (ETH) *
              </Label>
              <Input
                id="tierPrice"
                type="number"
                step="0.001"
                placeholder="0.1"
                value={tierForm.price}
                onChange={(e) => setTierForm({ ...tierForm, price: e.target.value })}
                className="mt-2 bg-white/5 border-white/10 text-white placeholder:text-gray-400"
              />
            </div>

            <div>
              <Label htmlFor="maxSupply" className="text-white">
                Max Supply *
              </Label>
              <Input
                id="maxSupply"
                type="number"
                placeholder="100"
                value={tierForm.maxSupply}
                onChange={(e) => setTierForm({ ...tierForm, maxSupply: Number.parseInt(e.target.value) })}
                className="mt-2 bg-white/5 border-white/10 text-white placeholder:text-gray-400"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="tierDescription" className="text-white">
              Description
            </Label>
            <Textarea
              id="tierDescription"
              placeholder="Describe what this tier includes..."
              value={tierForm.description}
              onChange={(e) => setTierForm({ ...tierForm, description: e.target.value })}
              rows={3}
              className="mt-2 bg-white/5 border-white/10 text-white placeholder:text-gray-400"
            />
          </div>

          <div>
            <Label className="text-white">Benefits</Label>
            <div className="space-y-2 mt-2">
              {tierForm.benefits.map((benefit, index) => (
                <div key={index} className="flex gap-2">
                  <Input
                    placeholder="e.g., Access to all sessions"
                    value={benefit}
                    onChange={(e) => handleBenefitChange(index, e.target.value)}
                    className="bg-white/5 border-white/10 text-white placeholder:text-gray-400"
                  />
                  {tierForm.benefits.length > 1 && (
                    <Button size="sm" variant="ghost" onClick={() => removeBenefit(index)}>
                      <Trash2 className="h-4 w-4 text-red-400" />
                    </Button>
                  )}
                </div>
              ))}
              <Button size="sm" variant="outline" onClick={addBenefit} className="bg-transparent">
                <Plus className="h-4 w-4 mr-2" />
                Add Benefit
              </Button>
            </div>
          </div>

          <div className="flex gap-4">
            <Button
              onClick={editingTier ? handleUpdateTier : handleAddTier}
              disabled={!tierForm.name || !tierForm.price}
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
            >
              {editingTier ? "Update Tier" : "Add Tier"}
            </Button>
            {editingTier && (
              <Button variant="outline" onClick={resetForm} className="bg-transparent">
                Cancel
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {(!data.tiers || data.tiers.length === 0) && (
        <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4">
          <h4 className="text-yellow-300 font-medium mb-2">Add at least one ticket tier</h4>
          <p className="text-yellow-200 text-sm">
            You need to create at least one ticket tier before proceeding to the next step.
          </p>
        </div>
      )}
    </div>
  )
}
