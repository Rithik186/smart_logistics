"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import DashboardLayout from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import Link from "next/link"

interface DeliveryBox {
  id: string
  qrCode: string
  rfidTag: string
  status: "available" | "in-transit" | "delivered" | "maintenance" | "end-of-life"
  healthScore: number
  usageCycles: number
  maxCycles: number
  lastLocation: string
  currentLocation: string
  lastUsed: string
  nextInspection: string
  weight: number
  dimensions: { length: number; width: number; height: number }
  material: "plastic" | "metal" | "composite"
  alerts: string[]
  history: {
    date: string
    action: string
    location: string
  }[]
}

interface Container {
  id: string
  name: string
  type: string
  location: string
}

interface Locality {
  id: string
  name: string
}

const generateRandomBoxes = (containerId: string, count: number): DeliveryBox[] => {
  const statuses: DeliveryBox["status"][] = [
    "available",
    "available",
    "available",
    "in-transit",
    "in-transit",
    "delivered",
    "maintenance",
    "end-of-life",
  ]
  const materials: DeliveryBox["material"][] = ["plastic", "metal", "composite"]
  const locations = [
    "Warehouse A",
    "Distribution Center B",
    "Loading Bay C",
    "Transit Hub D",
    "Customer Site E",
    "Maintenance Facility",
  ]

  const alertTypes = [
    "High usage detected",
    "Inspection overdue",
    "Damage reported",
    "Temperature exposure",
    "Weight limit exceeded",
    "Location discrepancy",
  ]

  return Array.from({ length: count }, (_, i) => {
    const status = statuses[Math.floor(Math.random() * statuses.length)]
    const material = materials[Math.floor(Math.random() * materials.length)]
    const usageCycles = Math.floor(Math.random() * 500) + 50
    const maxCycles = Math.floor(Math.random() * 200) + 800
    const healthScore = Math.max(10, 100 - (usageCycles / maxCycles) * 100 + Math.random() * 20 - 10)
    const alertCount = Math.floor(Math.random() * 3)
    const alerts = Array.from({ length: alertCount }, () => alertTypes[Math.floor(Math.random() * alertTypes.length)])

    const history = Array.from({ length: Math.floor(Math.random() * 8) + 3 }, (_, j) => ({
      date: new Date(Date.now() - j * 24 * 3600000 * Math.random() * 30).toLocaleDateString(),
      action: ["Dispatched", "Delivered", "Returned", "Inspected", "Repaired"][Math.floor(Math.random() * 5)],
      location: locations[Math.floor(Math.random() * locations.length)],
    }))

    return {
      id: `BX-${containerId.split("-")[2]}-${(i + 1).toString().padStart(4, "0")}`,
      qrCode: `QR${Math.random().toString(36).substr(2, 8).toUpperCase()}`,
      rfidTag: `RF${Math.random().toString(36).substr(2, 6).toUpperCase()}`,
      status,
      healthScore: Math.round(healthScore),
      usageCycles,
      maxCycles,
      lastLocation: locations[Math.floor(Math.random() * locations.length)],
      currentLocation: locations[Math.floor(Math.random() * locations.length)],
      lastUsed: new Date(Date.now() - Math.random() * 7 * 24 * 3600000).toLocaleDateString(),
      nextInspection: new Date(Date.now() + Math.random() * 30 * 24 * 3600000).toLocaleDateString(),
      weight: Math.round((Math.random() * 15 + 5) * 100) / 100,
      dimensions: {
        length: Math.round((Math.random() * 20 + 30) * 10) / 10,
        width: Math.round((Math.random() * 15 + 20) * 10) / 10,
        height: Math.round((Math.random() * 10 + 15) * 10) / 10,
      },
      material,
      alerts,
      history: history.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()),
    }
  })
}

const generateContainerInfo = (containerId: string): Container => {
  const types = ["Standard Container", "Heavy-Duty Container", "Temperature-Controlled", "Fragile Items"]
  const locations = ["Section A", "Section B", "Section C", "Loading Bay", "Storage Area"]

  return {
    id: containerId,
    name: `Container ${containerId.split("-")[2]} - ${types[Math.floor(Math.random() * types.length)]}`,
    type: types[Math.floor(Math.random() * types.length)],
    location: locations[Math.floor(Math.random() * locations.length)],
  }
}

const generateLocalityInfo = (localityId: string): Locality => {
  const regions = ["North", "South", "East", "West", "Central"]
  const cities = ["Distribution Center", "Warehouse Hub", "Logistics Center"]

  return {
    id: localityId,
    name: `${regions[Math.floor(Math.random() * regions.length)]} ${
      cities[Math.floor(Math.random() * cities.length)]
    } ${localityId.split("-")[1]}`,
  }
}

export default function ContainerBoxesPage() {
  const params = useParams()
  const router = useRouter()
  const localityId = params.localityId as string
  const containerId = params.containerId as string

  const [locality, setLocality] = useState<Locality | null>(null)
  const [container, setContainer] = useState<Container | null>(null)
  const [boxes, setBoxes] = useState<DeliveryBox[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedStatus, setSelectedStatus] = useState<string>("all")
  const [selectedHealth, setSelectedHealth] = useState<string>("all")

  useEffect(() => {
    if (localityId && containerId) {
      setLocality(generateLocalityInfo(localityId))
      setContainer(generateContainerInfo(containerId))
      setBoxes(generateRandomBoxes(containerId, Math.floor(Math.random() * 50) + 20))
    }
  }, [localityId, containerId])

  const filteredBoxes = boxes.filter((box) => {
    const matchesSearch =
      box.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      box.qrCode.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = selectedStatus === "all" || box.status === selectedStatus
    const matchesHealth =
      selectedHealth === "all" ||
      (selectedHealth === "good" && box.healthScore >= 80) ||
      (selectedHealth === "fair" && box.healthScore >= 50 && box.healthScore < 80) ||
      (selectedHealth === "poor" && box.healthScore < 50)
    return matchesSearch && matchesStatus && matchesHealth
  })

  const statuses = ["all", ...Array.from(new Set(boxes.map((b) => b.status)))]
  const healthCategories = ["all", "good", "fair", "poor"]

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

  const getHealthColor = (score: number) => {
    if (score >= 80) return "text-green-600"
    if (score >= 50) return "text-yellow-600"
    return "text-red-600"
  }

  const getHealthBgColor = (score: number) => {
    if (score >= 80) return "bg-green-500"
    if (score >= 50) return "bg-yellow-500"
    return "bg-red-500"
  }

  if (!locality || !container) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-96">
          <div className="text-center">
            <div className="w-8 h-8 bg-primary rounded animate-pulse mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading container data...</p>
          </div>
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Button variant="ghost" size="sm" onClick={() => router.back()}>
                ← Back to Containers
              </Button>
            </div>
            <h1 className="text-2xl font-serif font-bold text-foreground mb-1">{container.name}</h1>
            <p className="text-muted-foreground">
              {locality.name} • {container.location} • {boxes.length} delivery boxes
            </p>
          </div>
          <Button onClick={() => setBoxes(generateRandomBoxes(containerId, boxes.length))} variant="outline">
            Refresh Data
          </Button>
        </div>

        {/* Filters */}
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1">
            <Input
              placeholder="Search by Box ID or QR Code..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-sm"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            <div className="flex gap-1">
              {statuses.map((status) => (
                <Button
                  key={status}
                  variant={selectedStatus === status ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedStatus(status)}
                  className="capitalize"
                >
                  {status.replace("-", " ")}
                </Button>
              ))}
            </div>
            <div className="flex gap-1">
              {healthCategories.map((health) => (
                <Button
                  key={health}
                  variant={selectedHealth === health ? "secondary" : "outline"}
                  size="sm"
                  onClick={() => setSelectedHealth(health)}
                  className="capitalize"
                >
                  {health} Health
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <Card>
            <CardContent className="pt-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Boxes</p>
                  <p className="text-2xl font-serif font-bold text-card-foreground">{boxes.length}</p>
                </div>
                <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                  <div className="w-4 h-4 bg-primary rounded-sm"></div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Available</p>
                  <p className="text-2xl font-serif font-bold text-card-foreground">
                    {boxes.filter((b) => b.status === "available").length}
                  </p>
                </div>
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">In Transit</p>
                  <p className="text-2xl font-serif font-bold text-card-foreground">
                    {boxes.filter((b) => b.status === "in-transit").length}
                  </p>
                </div>
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Maintenance</p>
                  <p className="text-2xl font-serif font-bold text-card-foreground">
                    {boxes.filter((b) => b.status === "maintenance").length}
                  </p>
                </div>
                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Avg Health</p>
                  <p className="text-2xl font-serif font-bold text-card-foreground">
                    {Math.round(boxes.reduce((sum, b) => sum + b.healthScore, 0) / boxes.length)}%
                  </p>
                </div>
                <div className="w-2 h-2 bg-accent rounded-full"></div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Boxes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredBoxes.map((box) => (
            <Card key={box.id} className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-base text-card-foreground">{box.id}</CardTitle>
                    <CardDescription className="text-xs mt-1">
                      QR: {box.qrCode} • RFID: {box.rfidTag}
                    </CardDescription>
                  </div>
                  <Badge className={getStatusColor(box.status)} variant="secondary">
                    {box.status.replace("-", " ")}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                {/* Health Score */}
                <div className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Health Score</span>
                    <span className={`font-medium ${getHealthColor(box.healthScore)}`}>{box.healthScore}%</span>
                  </div>
                  <Progress value={box.healthScore} className="h-2" />
                </div>

                {/* Usage Cycles */}
                <div className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Usage Cycles</span>
                    <span className="font-medium">
                      {box.usageCycles}/{box.maxCycles}
                    </span>
                  </div>
                  <Progress value={(box.usageCycles / box.maxCycles) * 100} className="h-2" />
                </div>

                {/* Location */}
                <div className="text-sm">
                  <p className="text-muted-foreground">Current Location</p>
                  <p className="font-medium text-card-foreground">{box.currentLocation}</p>
                </div>

                {/* Alerts */}
                {box.alerts.length > 0 && (
                  <div className="space-y-1">
                    <p className="text-xs text-muted-foreground">Active Alerts</p>
                    {box.alerts.slice(0, 2).map((alert, index) => (
                      <div key={index} className="flex items-center gap-2 text-xs">
                        <div className="w-1.5 h-1.5 bg-destructive rounded-full"></div>
                        <span className="text-destructive">{alert}</span>
                      </div>
                    ))}
                    {box.alerts.length > 2 && (
                      <p className="text-xs text-muted-foreground">+{box.alerts.length - 2} more alerts</p>
                    )}
                  </div>
                )}

                {/* Specifications */}
                <div className="pt-2 border-t border-border space-y-1">
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <span className="text-muted-foreground">Weight:</span>
                      <span className="ml-1 font-medium">{box.weight}kg</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Material:</span>
                      <span className="ml-1 font-medium capitalize">{box.material}</span>
                    </div>
                  </div>
                  <div className="text-xs">
                    <span className="text-muted-foreground">Dimensions:</span>
                    <span className="ml-1 font-medium">
                      {box.dimensions.length}×{box.dimensions.width}×{box.dimensions.height}cm
                    </span>
                  </div>
                </div>

                {/* Action Button */}
                <Link href={`/dashboard/localities/${localityId}/${containerId}/${box.id}`}>
                  <Button className="w-full bg-primary hover:bg-primary/90" size="sm">
                    View Analytics
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredBoxes.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-muted/50 rounded-lg flex items-center justify-center mx-auto mb-4">
              <div className="w-8 h-8 bg-muted-foreground/30 rounded-sm"></div>
            </div>
            <h3 className="text-lg font-medium text-foreground mb-2">No boxes found</h3>
            <p className="text-muted-foreground">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}
