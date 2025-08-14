"use client"

import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar, Clock, ImageIcon } from "lucide-react"
import type { CreateEventData } from "@/lib/types"
import { EVENT_CATEGORIES } from "@/lib/constants"

interface EventDetailsStepProps {
  data: Partial<CreateEventData>
  onUpdate: (data: Partial<CreateEventData>) => void
}

export function EventDetailsStep({ data, onUpdate }: EventDetailsStepProps) {
  const handleInputChange = (field: keyof CreateEventData, value: any) => {
    onUpdate({ [field]: value })
  }

  const formatDateTimeLocal = (date?: Date) => {
    if (!date) return ""
    const offset = date.getTimezoneOffset()
    const localDate = new Date(date.getTime() - offset * 60 * 1000)
    return localDate.toISOString().slice(0, 16)
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-white mb-2">Event Details</h2>
        <p className="text-gray-400">Provide basic information about your event</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="md:col-span-2">
          <Label htmlFor="name" className="text-white">
            Event Name *
          </Label>
          <Input
            id="name"
            placeholder="Enter event name"
            value={data.name || ""}
            onChange={(e) => handleInputChange("name", e.target.value)}
            className="mt-2 bg-white/5 border-white/10 text-white placeholder:text-gray-400"
          />
        </div>

        <div className="md:col-span-2">
          <Label htmlFor="description" className="text-white">
            Description *
          </Label>
          <Textarea
            id="description"
            placeholder="Describe your event..."
            value={data.description || ""}
            onChange={(e) => handleInputChange("description", e.target.value)}
            rows={4}
            className="mt-2 bg-white/5 border-white/10 text-white placeholder:text-gray-400"
          />
        </div>

        <div>
          <Label htmlFor="category" className="text-white">
            Category *
          </Label>
          <Select value={data.category || ""} onValueChange={(value) => handleInputChange("category", value)}>
            <SelectTrigger className="mt-2 bg-white/5 border-white/10 text-white">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              {EVENT_CATEGORIES.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="image" className="text-white">
            Event Image URL
          </Label>
          <div className="relative mt-2">
            <ImageIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              id="image"
              placeholder="https://example.com/image.jpg"
              value={data.image || ""}
              onChange={(e) => handleInputChange("image", e.target.value)}
              className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-gray-400"
            />
          </div>
        </div>

        <div>
          <Label htmlFor="startTime" className="text-white">
            Start Date & Time *
          </Label>
          <div className="relative mt-2">
            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              id="startTime"
              type="datetime-local"
              value={formatDateTimeLocal(data.startTime)}
              onChange={(e) => handleInputChange("startTime", new Date(e.target.value))}
              className="pl-10 bg-white/5 border-white/10 text-white"
            />
          </div>
        </div>

        <div>
          <Label htmlFor="endTime" className="text-white">
            End Date & Time *
          </Label>
          <div className="relative mt-2">
            <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              id="endTime"
              type="datetime-local"
              value={formatDateTimeLocal(data.endTime)}
              onChange={(e) => handleInputChange("endTime", new Date(e.target.value))}
              className="pl-10 bg-white/5 border-white/10 text-white"
            />
          </div>
        </div>
      </div>

      <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
        <h4 className="text-blue-300 font-medium mb-2">Tips for a great event listing:</h4>
        <ul className="text-blue-200 text-sm space-y-1">
          <li>• Use a clear, descriptive event name</li>
          <li>• Include key details like speakers, agenda, or special features</li>
          <li>• Choose an eye-catching image that represents your event</li>
          <li>• Set realistic start and end times</li>
        </ul>
      </div>
    </div>
  )
}
