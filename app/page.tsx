"use client"

import { useState } from "react"
import { EchoPassHeader } from "@/components/echopass-header"
import { ContractStatusBar } from "@/components/contract-status-bar"
import { EventCard } from "@/components/event-card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Search, Filter, Calendar } from "lucide-react"
import { useEvents } from "@/hooks/useContract"
import { EVENT_CATEGORIES } from "@/lib/constants"
import type { Event } from "@/lib/types"

export default function EventsPage() {
  const { data: events, isLoading, error } = useEvents()
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [selectedStatus, setSelectedStatus] = useState<string>("all")
  const [priceRange, setPriceRange] = useState<string>("all")

  const filteredEvents =
    events?.filter((event: Event) => {
      const matchesSearch =
        event.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.description.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesCategory = selectedCategory === "all" || event.category === selectedCategory
      const matchesStatus = selectedStatus === "all" || event.status === selectedStatus

      let matchesPrice = true
      if (priceRange !== "all") {
        const lowestPrice = Math.min(...event.tiers.map((tier) => Number.parseFloat(tier.price)))
        switch (priceRange) {
          case "free":
            matchesPrice = lowestPrice === 0
            break
          case "under-0.1":
            matchesPrice = lowestPrice < 0.1
            break
          case "0.1-0.5":
            matchesPrice = lowestPrice >= 0.1 && lowestPrice <= 0.5
            break
          case "over-0.5":
            matchesPrice = lowestPrice > 0.5
            break
        }
      }

      return matchesSearch && matchesCategory && matchesStatus && matchesPrice
    }) || []

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900">
      <EchoPassHeader />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <ContractStatusBar />
        </div>

        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-4">
            Discover Amazing Events
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Secure, transparent event ticketing powered by blockchain technology
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search events..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-gray-400"
            />
          </div>

          <div className="flex flex-wrap gap-4">
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-48 bg-white/5 border-white/10 text-white">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {EVENT_CATEGORIES.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger className="w-48 bg-white/5 border-white/10 text-white">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="upcoming">Upcoming</SelectItem>
                <SelectItem value="live">Live</SelectItem>
                <SelectItem value="ended">Ended</SelectItem>
              </SelectContent>
            </Select>

            <Select value={priceRange} onValueChange={setPriceRange}>
              <SelectTrigger className="w-48 bg-white/5 border-white/10 text-white">
                <SelectValue placeholder="Price Range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Prices</SelectItem>
                <SelectItem value="free">Free</SelectItem>
                <SelectItem value="under-0.1">Under 0.1 ETH</SelectItem>
                <SelectItem value="0.1-0.5">0.1 - 0.5 ETH</SelectItem>
                <SelectItem value="over-0.5">Over 0.5 ETH</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center gap-2 text-sm text-gray-400">
            <Filter className="h-4 w-4" />
            <span>Showing {filteredEvents.length} events</span>
            {searchQuery && (
              <Badge variant="secondary" className="bg-purple-500/20 text-purple-300">
                "{searchQuery}"
              </Badge>
            )}
          </div>
        </div>

        {/* Events Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-white/5 rounded-lg h-80"></div>
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">Failed to load events</h3>
            <p className="text-gray-400">Please try again later</p>
          </div>
        ) : filteredEvents.length === 0 ? (
          <div className="text-center py-12">
            <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">No events found</h3>
            <p className="text-gray-400">Try adjusting your search or filters</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
