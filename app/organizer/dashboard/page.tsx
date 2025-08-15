"use client"

import { useState } from "react"
import { EchoPassHeader } from "@/components/echopass-header"
import { ContractStatusBar } from "@/components/contract-status-bar"
import { AnalyticsChart } from "@/components/analytics-chart"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { BarChart3, TrendingUp, Users, DollarSign, Download, Calendar, Ticket } from "lucide-react"
import { toast } from "sonner"

export default function OrganizerDashboard() {
  const [selectedEvent, setSelectedEvent] = useState("all")
  const [timeRange, setTimeRange] = useState("7d")

  // Mock data for demonstration
  const events = [
    { id: "1", name: "Web3 Developer Conference 2024", status: "upcoming" },
    { id: "2", name: "DeFi Summit Miami", status: "upcoming" },
  ]

  const salesData = [
    { name: "Mon", value: 12 },
    { name: "Tue", value: 19 },
    { name: "Wed", value: 8 },
    { name: "Thu", value: 25 },
    { name: "Fri", value: 32 },
    { name: "Sat", value: 18 },
    { name: "Sun", value: 15 },
  ]

  const revenueData = [
    { name: "Jan", value: 2.4 },
    { name: "Feb", value: 3.1 },
    { name: "Mar", value: 2.8 },
    { name: "Apr", value: 4.2 },
    { name: "May", value: 3.9 },
    { name: "Jun", value: 5.1 },
  ]

  const tierData = [
    { name: "General", value: 45 },
    { name: "VIP", value: 25 },
    { name: "Premium", value: 30 },
  ]

  const attendanceData = [
    { name: "Checked In", value: 156 },
    { name: "Not Checked In", value: 44 },
  ]

  const exportCSV = (type: "sales" | "attendance") => {
    // Mock CSV export
    const csvData =
      type === "sales"
        ? "Date,Tickets Sold,Revenue\n2024-01-01,12,1.2 ETH\n2024-01-02,19,1.9 ETH"
        : "Name,Email,Ticket Type,Check-in Status\nJohn Doe,john@example.com,General,Checked In"

    const blob = new Blob([csvData], { type: "text/csv" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `${type}-report-${Date.now()}.csv`
    a.click()
    window.URL.revokeObjectURL(url)

    toast.success(`${type} report exported successfully`)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900">
      <EchoPassHeader />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <ContractStatusBar />
        </div>

        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Organizer Dashboard</h1>
            <p className="text-gray-400">Track your event performance and analytics</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Select value={selectedEvent} onValueChange={setSelectedEvent}>
              <SelectTrigger className="w-full sm:w-64 bg-white/5 border-white/10 text-white">
                <SelectValue placeholder="Select Event" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Events</SelectItem>
                {events.map((event) => (
                  <SelectItem key={event.id} value={event.id}>
                    {event.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-full sm:w-32 bg-white/5 border-white/10 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7d">7 Days</SelectItem>
                <SelectItem value="30d">30 Days</SelectItem>
                <SelectItem value="90d">90 Days</SelectItem>
                <SelectItem value="1y">1 Year</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-purple-500/10 to-purple-600/10 border-purple-500/30">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-300 text-sm font-medium">Total Revenue</p>
                  <p className="text-2xl font-bold text-white">12.5 ETH</p>
                  <p className="text-green-400 text-sm flex items-center gap-1 mt-1">
                    <TrendingUp className="h-3 w-3" />
                    +15.3%
                  </p>
                </div>
                <DollarSign className="h-8 w-8 text-purple-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-500/10 to-blue-600/10 border-blue-500/30">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-300 text-sm font-medium">Tickets Sold</p>
                  <p className="text-2xl font-bold text-white">1,247</p>
                  <p className="text-green-400 text-sm flex items-center gap-1 mt-1">
                    <TrendingUp className="h-3 w-3" />
                    +8.2%
                  </p>
                </div>
                <Ticket className="h-8 w-8 text-blue-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-500/10 to-green-600/10 border-green-500/30">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-300 text-sm font-medium">Check-ins</p>
                  <p className="text-2xl font-bold text-white">892</p>
                  <p className="text-gray-400 text-sm mt-1">71.5% rate</p>
                </div>
                <Users className="h-8 w-8 text-green-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-500/10 to-orange-600/10 border-orange-500/30">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-orange-300 text-sm font-medium">Active Events</p>
                  <p className="text-2xl font-bold text-white">3</p>
                  <p className="text-gray-400 text-sm mt-1">2 upcoming</p>
                </div>
                <Calendar className="h-8 w-8 text-orange-400" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 lg:gap-8 mb-8">
          <AnalyticsChart title="Daily Ticket Sales" type="bar" data={salesData} dataKey="value" xAxisKey="name" />

          <AnalyticsChart
            title="Monthly Revenue (ETH)"
            type="line"
            data={revenueData}
            dataKey="value"
            xAxisKey="name"
          />

          <AnalyticsChart title="Sales by Tier" type="pie" data={tierData} dataKey="value" />

          <AnalyticsChart
            title="Attendance Status"
            type="pie"
            data={attendanceData}
            dataKey="value"
            colors={["#10b981", "#f59e0b"]}
          />
        </div>

        {/* Export Section */}
        <Card className="bg-gradient-to-br from-white/5 to-white/10 border-white/10">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Export Reports
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
              <div className="p-4 lg:p-6 rounded-lg border border-white/10">
                <h4 className="text-white font-medium mb-2">Sales Report</h4>
                <p className="text-gray-400 text-sm mb-4">
                  Export detailed sales data including ticket types, prices, and timestamps
                </p>
                <Button
                  onClick={() => exportCSV("sales")}
                  variant="outline"
                  className="bg-transparent w-full sm:w-auto touch-manipulation"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Export Sales CSV
                </Button>
              </div>

              <div className="p-4 lg:p-6 rounded-lg border border-white/10">
                <h4 className="text-white font-medium mb-2">Attendance Report</h4>
                <p className="text-gray-400 text-sm mb-4">
                  Export attendee list with check-in status and contact information
                </p>
                <Button
                  onClick={() => exportCSV("attendance")}
                  variant="outline"
                  className="bg-transparent w-full sm:w-auto touch-manipulation"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Export Attendance CSV
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
