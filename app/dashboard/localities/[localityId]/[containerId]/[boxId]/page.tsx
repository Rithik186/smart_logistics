"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import DashboardLayout from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from "recharts"

interface BoxAnalytics {
  id: string
  qrCode: string
  rfidTag: string
  status: "available" | "in-transit" | "delivered" | "maintenance" | "end-of-life"
  healthScore: number
  usageCycles: number
  maxCycles: number
  currentLocation: string
  weight: number
  dimensions: { length: number; width: number; height: number }
  material: "plastic" | "metal" | "composite"
  manufacturingDate: string
  lastInspection: string
  nextInspection: string
  alerts: {
    id: string
    type: "warning" | "critical" | "info"
    message: string
    timestamp: string
  }[]
  healthHistory: {
    date: string
    score: number
    temperature: number
    humidity: number
    vibration: number
  }[]
  usageHistory: {
    date: string
    cycles: number
    location: string
    duration: number
  }[]
  locationHistory: {
    timestamp: string
    location: string
    action: string
    coordinates?: { lat: number; lng: number }
  }[]
  maintenanceRecords: {
    date: string
    type: "inspection" | "repair" | "replacement"
    description: string
    technician: string
    cost: number
  }[]
  predictiveInsights: {
    estimatedRemainingLife: number
    recommendedActions: string[]
    riskFactors: string[]
    nextMaintenanceDate: string
  }
}

const generateBoxAnalytics = (boxId: string): BoxAnalytics => {
  const statuses: BoxAnalytics["status"][] = ["available", "in-transit", "delivered", "maintenance", "end-of-life"]
  const materials: BoxAnalytics["material"][] = ["plastic", "metal", "composite"]
  const locations = [
    "Warehouse A",
    "Distribution Center B",
    "Loading Bay C",
    "Transit Hub D",
    "Customer Site E",
    "Maintenance Facility",
    "Storage Area F",
  ]

  const usageCycles = Math.floor(Math.random() * 500) + 50
  const maxCycles = Math.floor(Math.random() * 200) + 800
  const healthScore = Math.max(10, 100 - (usageCycles / maxCycles) * 100 + Math.random() * 20 - 10)

  // Generate health history (last 30 days)
  const healthHistory = Array.from({ length: 30 }, (_, i) => ({
    date: new Date(Date.now() - (29 - i) * 24 * 3600000).toLocaleDateString(),
    score: Math.max(0, Math.min(100, healthScore + (Math.random() - 0.5) * 20)),
    temperature: Math.round((Math.random() * 15 + 15) * 10) / 10,
    humidity: Math.round((Math.random() * 30 + 40) * 10) / 10,
    vibration: Math.round(Math.random() * 5 * 10) / 10,
  }))

  // Generate usage history
  const usageHistory = Array.from({ length: 20 }, (_, i) => ({
    date: new Date(Date.now() - i * 7 * 24 * 3600000).toLocaleDateString(),
    cycles: Math.floor(Math.random() * 15) + 5,
    location: locations[Math.floor(Math.random() * locations.length)],
    duration: Math.floor(Math.random() * 48) + 12, // hours
  }))

  // Generate location history
  const locationHistory = Array.from({ length: 15 }, (_, i) => ({
    timestamp: new Date(Date.now() - i * 2 * 24 * 3600000).toISOString(),
    location: locations[Math.floor(Math.random() * locations.length)],
    action: ["Dispatched", "Arrived", "Departed", "Delivered", "Returned"][Math.floor(Math.random() * 5)],
    coordinates: {
      lat: 40.7128 + (Math.random() - 0.5) * 0.1,
      lng: -74.006 + (Math.random() - 0.5) * 0.1,
    },
  }))

  // Generate maintenance records
  const maintenanceRecords = Array.from({ length: Math.floor(Math.random() * 8) + 3 }, (_, i) => ({
    date: new Date(Date.now() - i * 30 * 24 * 3600000).toLocaleDateString(),
    type: ["inspection", "repair", "replacement"][Math.floor(Math.random() * 3)] as
      | "inspection"
      | "repair"
      | "replacement",
    description: [
      "Routine inspection completed",
      "Minor wear repair",
      "Handle replacement",
      "Surface cleaning",
      "Structural assessment",
      "RFID tag replacement",
    ][Math.floor(Math.random() * 6)],
    technician: ["John Smith", "Sarah Johnson", "Mike Wilson", "Lisa Chen"][Math.floor(Math.random() * 4)],
    cost: Math.floor(Math.random() * 200) + 50,
  }))

  // Generate alerts
  const alertTypes = [
    {
      type: "critical" as const,
      messages: ["Structural damage detected", "End of life approaching", "Critical wear detected"],
    },
    { type: "warning" as const, messages: ["High usage detected", "Inspection overdue", "Temperature exposure"] },
    { type: "info" as const, messages: ["Scheduled maintenance due", "Location update", "Usage milestone reached"] },
  ]

  const alerts = Array.from({ length: Math.floor(Math.random() * 5) }, (_, i) => {
    const alertType = alertTypes[Math.floor(Math.random() * alertTypes.length)]
    return {
      id: `ALT-${i + 1}`,
      type: alertType.type,
      message: alertType.messages[Math.floor(Math.random() * alertType.messages.length)],
      timestamp: new Date(Date.now() - Math.random() * 7 * 24 * 3600000).toISOString(),
    }
  })

  return {
    id: boxId,
    qrCode: `QR${Math.random().toString(36).substr(2, 8).toUpperCase()}`,
    rfidTag: `RF${Math.random().toString(36).substr(2, 6).toUpperCase()}`,
    status: statuses[Math.floor(Math.random() * statuses.length)],
    healthScore: Math.round(healthScore),
    usageCycles,
    maxCycles,
    currentLocation: locations[Math.floor(Math.random() * locations.length)],
    weight: Math.round((Math.random() * 15 + 5) * 100) / 100,
    dimensions: {
      length: Math.round((Math.random() * 20 + 30) * 10) / 10,
      width: Math.round((Math.random() * 15 + 20) * 10) / 10,
      height: Math.round((Math.random() * 10 + 15) * 10) / 10,
    },
    material: materials[Math.floor(Math.random() * materials.length)],
    manufacturingDate: new Date(Date.now() - Math.random() * 365 * 5 * 24 * 3600000).toLocaleDateString(),
    lastInspection: new Date(Date.now() - Math.random() * 30 * 24 * 3600000).toLocaleDateString(),
    nextInspection: new Date(Date.now() + Math.random() * 60 * 24 * 3600000).toLocaleDateString(),
    alerts,
    healthHistory,
    usageHistory,
    locationHistory,
    maintenanceRecords,
    predictiveInsights: {
      estimatedRemainingLife: Math.floor(Math.random() * 500) + 100,
      recommendedActions: [
        "Schedule routine inspection",
        "Monitor temperature exposure",
        "Check structural integrity",
        "Update RFID firmware",
      ].slice(0, Math.floor(Math.random() * 3) + 1),
      riskFactors: [
        "High usage frequency",
        "Extended temperature exposure",
        "Overdue maintenance",
        "Structural wear",
      ].slice(0, Math.floor(Math.random() * 2) + 1),
      nextMaintenanceDate: new Date(Date.now() + Math.random() * 30 * 24 * 3600000).toLocaleDateString(),
    },
  }
}

export default function BoxAnalyticsPage() {
  const params = useParams()
  const router = useRouter()
  const boxId = params.boxId as string

  const [boxData, setBoxData] = useState<BoxAnalytics | null>(null)
  const [activeTab, setActiveTab] = useState("overview")

  useEffect(() => {
    if (boxId) {
      setBoxData(generateBoxAnalytics(boxId))
    }
  }, [boxId])

  if (!boxData) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-96">
          <div className="text-center">
            <div className="w-8 h-8 bg-primary rounded animate-pulse mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading box analytics...</p>
          </div>
        </div>
      </DashboardLayout>
    )
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "available":
        return "bg-green-100 text-green-800"
      case "in-transit":
        return "bg-blue-100 text-blue-800"
      case "delivered":
        return "bg-purple-100 text-purple-800"
      case "maintenance":
        return "bg-yellow-100 text-yellow-800"
      case "end-of-life":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getAlertColor = (type: string) => {
    switch (type) {
      case "critical":
        return "bg-red-100 text-red-800 border-red-200"
      case "warning":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "info":
        return "bg-blue-100 text-blue-800 border-blue-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const healthColor =
    boxData.healthScore >= 80 ? "text-green-600" : boxData.healthScore >= 50 ? "text-yellow-600" : "text-red-600"

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"]

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Button variant="ghost" size="sm" onClick={() => router.back()}>
                ← Back to Container
              </Button>
              <Badge className={getStatusColor(boxData.status)} variant="secondary">
                {boxData.status.replace("-", " ")}
              </Badge>
            </div>
            <h1 className="text-2xl font-serif font-bold text-foreground mb-1">Box Analytics: {boxData.id}</h1>
            <p className="text-muted-foreground">
              QR: {boxData.qrCode} • RFID: {boxData.rfidTag} • {boxData.currentLocation}
            </p>
          </div>
          <Button onClick={() => setBoxData(generateBoxAnalytics(boxId))} variant="outline">
            Refresh Data
          </Button>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="pt-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Health Score</p>
                  <p className={`text-2xl font-serif font-bold ${healthColor}`}>{boxData.healthScore}%</p>
                </div>
                <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                  <div className="w-4 h-4 bg-primary rounded-full"></div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Usage Cycles</p>
                  <p className="text-2xl font-serif font-bold text-card-foreground">
                    {boxData.usageCycles}/{boxData.maxCycles}
                  </p>
                </div>
                <div className="w-8 h-8 bg-accent/10 rounded-lg flex items-center justify-center">
                  <div className="w-4 h-4 bg-accent rounded-sm"></div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Remaining Life</p>
                  <p className="text-2xl font-serif font-bold text-card-foreground">
                    {boxData.predictiveInsights.estimatedRemainingLife}
                  </p>
                  <p className="text-xs text-muted-foreground">cycles</p>
                </div>
                <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                  <div className="w-4 h-4 bg-green-500 rounded-sm"></div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Active Alerts</p>
                  <p className="text-2xl font-serif font-bold text-card-foreground">{boxData.alerts.length}</p>
                </div>
                <div className="w-8 h-8 bg-destructive/10 rounded-lg flex items-center justify-center">
                  <div className="w-4 h-4 bg-destructive rounded-sm"></div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="health">Health</TabsTrigger>
            <TabsTrigger value="usage">Usage</TabsTrigger>
            <TabsTrigger value="location">Location</TabsTrigger>
            <TabsTrigger value="maintenance">Maintenance</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Box Information */}
              <Card>
                <CardHeader>
                  <CardTitle>Box Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Material</p>
                      <p className="font-medium capitalize">{boxData.material}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Weight</p>
                      <p className="font-medium">{boxData.weight} kg</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Dimensions</p>
                      <p className="font-medium">
                        {boxData.dimensions.length}×{boxData.dimensions.width}×{boxData.dimensions.height} cm
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Manufacturing Date</p>
                      <p className="font-medium">{boxData.manufacturingDate}</p>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-border">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Usage Progress</span>
                        <span className="text-sm font-medium">
                          {Math.round((boxData.usageCycles / boxData.maxCycles) * 100)}%
                        </span>
                      </div>
                      <Progress value={(boxData.usageCycles / boxData.maxCycles) * 100} className="h-2" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Predictive Insights */}
              <Card>
                <CardHeader>
                  <CardTitle>Predictive Insights</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">Recommended Actions</p>
                    <div className="space-y-1">
                      {boxData.predictiveInsights.recommendedActions.map((action, index) => (
                        <div key={index} className="flex items-center gap-2 text-sm">
                          <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                          <span>{action}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="text-sm text-muted-foreground mb-2">Risk Factors</p>
                    <div className="space-y-1">
                      {boxData.predictiveInsights.riskFactors.map((risk, index) => (
                        <div key={index} className="flex items-center gap-2 text-sm">
                          <div className="w-1.5 h-1.5 bg-yellow-500 rounded-full"></div>
                          <span>{risk}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-border">
                    <p className="text-sm text-muted-foreground">Next Maintenance</p>
                    <p className="font-medium">{boxData.predictiveInsights.nextMaintenanceDate}</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Active Alerts */}
            {boxData.alerts.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Active Alerts</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {boxData.alerts.map((alert) => (
                      <div key={alert.id} className={`p-3 rounded-lg border ${getAlertColor(alert.type)}`}>
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <p className="font-medium">{alert.message}</p>
                            <p className="text-xs opacity-75 mt-1">{new Date(alert.timestamp).toLocaleString()}</p>
                          </div>
                          <Badge variant="outline" className="capitalize">
                            {alert.type}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="health" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Health Score Trend (Last 30 Days)</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={boxData.healthHistory}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="score" stroke="#8884d8" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <div className="grid md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Temperature History</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-40">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={boxData.healthHistory.slice(-7)}>
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip />
                        <Line type="monotone" dataKey="temperature" stroke="#ff7300" strokeWidth={2} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Humidity Levels</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-40">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={boxData.healthHistory.slice(-7)}>
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip />
                        <Line type="monotone" dataKey="humidity" stroke="#00C49F" strokeWidth={2} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Vibration Data</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-40">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={boxData.healthHistory.slice(-7)}>
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="vibration" fill="#FFBB28" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="usage" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Usage Cycles Over Time</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={boxData.usageHistory}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="cycles" fill="#8884d8" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Usage by Location</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-60">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={Object.entries(
                            boxData.usageHistory.reduce(
                              (acc, item) => {
                                acc[item.location] = (acc[item.location] || 0) + item.cycles
                                return acc
                              },
                              {} as Record<string, number>,
                            ),
                          ).map(([location, cycles]) => ({ location, cycles }))}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ location, percent }) => `${location} ${(percent * 100).toFixed(0)}%`}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="cycles"
                        >
                          {Object.entries(
                            boxData.usageHistory.reduce(
                              (acc, item) => {
                                acc[item.location] = (acc[item.location] || 0) + item.cycles
                                return acc
                              },
                              {} as Record<string, number>,
                            ),
                          ).map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Recent Usage History</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 max-h-60 overflow-y-auto">
                    {boxData.usageHistory.slice(0, 8).map((usage, index) => (
                      <div key={index} className="flex items-center justify-between p-2 bg-muted/50 rounded">
                        <div>
                          <p className="text-sm font-medium">{usage.location}</p>
                          <p className="text-xs text-muted-foreground">{usage.date}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium">{usage.cycles} cycles</p>
                          <p className="text-xs text-muted-foreground">{usage.duration}h duration</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="location" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Location History</CardTitle>
                <CardDescription>Recent movement and location updates</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 max-h-96 overflow-y-auto">
                  {boxData.locationHistory.map((location, index) => (
                    <div key={index} className="flex items-start gap-4 p-3 border border-border rounded-lg">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <p className="font-medium">{location.action}</p>
                          <p className="text-xs text-muted-foreground">
                            {new Date(location.timestamp).toLocaleString()}
                          </p>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">{location.location}</p>
                        {location.coordinates && (
                          <p className="text-xs text-muted-foreground mt-1">
                            Coordinates: {location.coordinates.lat.toFixed(4)}, {location.coordinates.lng.toFixed(4)}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="maintenance" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Maintenance Records</CardTitle>
                <CardDescription>Complete maintenance and inspection history</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {boxData.maintenanceRecords.map((record, index) => (
                    <div key={index} className="flex items-start gap-4 p-4 border border-border rounded-lg">
                      <div
                        className={`w-3 h-3 rounded-full mt-1 flex-shrink-0 ${
                          record.type === "inspection"
                            ? "bg-blue-500"
                            : record.type === "repair"
                              ? "bg-yellow-500"
                              : "bg-red-500"
                        }`}
                      ></div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <div>
                            <p className="font-medium capitalize">{record.type}</p>
                            <p className="text-sm text-muted-foreground">{record.date}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-medium">${record.cost}</p>
                            <p className="text-xs text-muted-foreground">{record.technician}</p>
                          </div>
                        </div>
                        <p className="text-sm">{record.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Maintenance Costs</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-60">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={boxData.maintenanceRecords.slice(-6)}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="cost" fill="#8884d8" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Maintenance Schedule</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Last Inspection</p>
                    <p className="font-medium">{boxData.lastInspection}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Next Inspection</p>
                    <p className="font-medium">{boxData.nextInspection}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Recommended Maintenance</p>
                    <p className="font-medium">{boxData.predictiveInsights.nextMaintenanceDate}</p>
                  </div>
                  <div className="pt-4 border-t border-border">
                    <p className="text-sm text-muted-foreground mb-2">Total Maintenance Cost</p>
                    <p className="text-2xl font-serif font-bold text-card-foreground">
                      ${boxData.maintenanceRecords.reduce((sum, record) => sum + record.cost, 0)}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}
