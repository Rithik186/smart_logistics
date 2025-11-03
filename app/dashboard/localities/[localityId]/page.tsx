"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import DashboardLayout from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"

interface Container {
  id: string
  name: string
  type: "standard" | "heavy-duty" | "temperature-controlled" | "fragile"
  totalBoxes: number
  availableBoxes: number
  inUseBoxes: number
  maintenanceBoxes: number
  status: "active" | "inactive" | "maintenance"
  lastInspection: string
  location: string
  alerts: number
}

interface Locality {
  id: string
  name: string
  region: string
  status: "online" | "offline" | "maintenance"
}

const generateRandomContainers = (localityId: string): Container[] => {
  const containerTypes: Container["type"][] = ["standard", "heavy-duty", "temperature-controlled", "fragile"]
  const statuses: Container["status"][] = ["active", "active", "active", "maintenance", "inactive"]
  const locations = ["Section A", "Section B", "Section C", "Section D", "Loading Bay", "Storage Area"]

  return Array.from({ length: Math.floor(Math.random() * 15) + 8 }, (_, i) => {
    const type = containerTypes[Math.floor(Math.random() * containerTypes.length)]
    const totalBoxes = Math.floor(Math.random() * 100) + 20
    const maintenanceBoxes = Math.floor(Math.random() * 5)
    const inUseBoxes = Math.floor((totalBoxes - maintenanceBoxes) * (Math.random() * 0.8 + 0.1))
    const availableBoxes = totalBoxes - inUseBoxes - maintenanceBoxes
    const status = statuses[Math.floor(Math.random() * statuses.length)]
    const alerts = Math.floor(Math.random() * 4)

    return {
      id: `CNT-${localityId.split("-")[1]}-${(i + 1).toString().padStart(3, "0")}`,
      name: `Container ${String.fromCharCode(65 + i)} - ${type
        .split("-")
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(" ")}`,
      type,
      totalBoxes,
      availableBoxes,
      inUseBoxes,
      maintenanceBoxes,
      status,
      lastInspection: new Date(Date.now() - Math.random() * 7 * 24 * 3600000).toLocaleDateString(),
      location: locations[Math.floor(Math.random() * locations.length)],
      alerts,
    }
  })
}

const generateLocalityInfo = (localityId: string): Locality => {
  const regions = ["North", "South", "East", "West", "Central"]
  const cities = ["Distribution Center", "Warehouse Hub", "Logistics Center"]
  const statuses: Locality["status"][] = ["online", "offline", "maintenance"]

  const region = regions[Math.floor(Math.random() * regions.length)]
  const city = cities[Math.floor(Math.random() * cities.length)]
  const status = statuses[Math.floor(Math.random() * statuses.length)]

  return {
    id: localityId,
    name: `${region} ${city} ${localityId.split("-")[1]}`,
    region,
    status,
  }
}

export default function LocalityContainersPage() {
  const params = useParams()
  const router = useRouter()
  const localityId = params.localityId as string

  const [locality, setLocality] = useState<Locality | null>(null)
  const [containers, setContainers] = useState<Container[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedType, setSelectedType] = useState<string>("all")

  useEffect(() => {
    if (localityId) {
      setLocality(generateLocalityInfo(localityId))
      setContainers(generateRandomContainers(localityId))
    }
  }, [localityId])

  const filteredContainers = containers.filter((container) => {
    const matchesSearch = container.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = selectedType === "all" || container.type === selectedType
    return matchesSearch && matchesType
  })

  const containerTypes = ["all", ...Array.from(new Set(containers.map((c) => c.type)))]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800"
      case "inactive":
        return "bg-red-100 text-red-800"
      case "maintenance":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "standard":
        return "bg-blue-100 text-blue-800"
      case "heavy-duty":
        return "bg-purple-100 text-purple-800"
      case "temperature-controlled":
        return "bg-cyan-100 text-cyan-800"
      case "fragile":
        return "bg-orange-100 text-orange-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  if (!locality) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-96">
          <div className="text-center">
            <div className="w-8 h-8 bg-primary rounded animate-pulse mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading locality data...</p>
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
                ← Back
              </Button>
              <Badge className={getStatusColor(locality.status)} variant="secondary">
                {locality.status}
              </Badge>
            </div>
            <h1 className="text-2xl font-serif font-bold text-foreground mb-1">{locality.name}</h1>
            <p className="text-muted-foreground">
              Managing {containers.length} containers with {containers.reduce((sum, c) => sum + c.totalBoxes, 0)} total
              boxes
            </p>
          </div>
          <Button onClick={() => setContainers(generateRandomContainers(localityId))} variant="outline">
            Refresh Data
          </Button>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <Input
              placeholder="Search containers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-sm"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            {containerTypes.map((type) => (
              <Button
                key={type}
                variant={selectedType === type ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedType(type)}
                className="capitalize"
              >
                {type.replace("-", " ")}
              </Button>
            ))}
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="pt-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Containers</p>
                  <p className="text-2xl font-serif font-bold text-card-foreground">{containers.length}</p>
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
                  <p className="text-sm font-medium text-muted-foreground">Total Boxes</p>
                  <p className="text-2xl font-serif font-bold text-card-foreground">
                    {containers.reduce((sum, c) => sum + c.totalBoxes, 0)}
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
                  <p className="text-sm font-medium text-muted-foreground">In Use</p>
                  <p className="text-2xl font-serif font-bold text-card-foreground">
                    {containers.reduce((sum, c) => sum + c.inUseBoxes, 0)}
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
                  <p className="text-sm font-medium text-muted-foreground">Available</p>
                  <p className="text-2xl font-serif font-bold text-card-foreground">
                    {containers.reduce((sum, c) => sum + c.availableBoxes, 0)}
                  </p>
                </div>
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Containers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredContainers.map((container) => (
            <Card key={container.id} className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg text-card-foreground">{container.name}</CardTitle>
                    <CardDescription className="flex items-center gap-2 mt-1">
                      <span>{container.id}</span>
                      <span>•</span>
                      <span>{container.location}</span>
                    </CardDescription>
                  </div>
                  <div className="flex flex-col gap-1">
                    <Badge className={getStatusColor(container.status)} variant="secondary">
                      {container.status}
                    </Badge>
                    <Badge className={getTypeColor(container.type)} variant="secondary">
                      {container.type.replace("-", " ")}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Box Distribution */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Box Distribution</span>
                    <span className="font-medium">{container.totalBoxes} total</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div className="flex h-2 rounded-full overflow-hidden">
                      <div
                        className="bg-blue-500"
                        style={{
                          width: `${(container.inUseBoxes / container.totalBoxes) * 100}%`,
                        }}
                      ></div>
                      <div
                        className="bg-green-500"
                        style={{
                          width: `${(container.availableBoxes / container.totalBoxes) * 100}%`,
                        }}
                      ></div>
                      <div
                        className="bg-yellow-500"
                        style={{
                          width: `${(container.maintenanceBoxes / container.totalBoxes) * 100}%`,
                        }}
                      ></div>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-xs">
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span>In Use: {container.inUseBoxes}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span>Available: {container.availableBoxes}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                      <span>Maintenance: {container.maintenanceBoxes}</span>
                    </div>
                  </div>
                </div>

                {/* Alerts */}
                {container.alerts > 0 && (
                  <div className="flex items-center gap-2 p-2 bg-destructive/10 rounded-lg">
                    <div className="w-2 h-2 bg-destructive rounded-full"></div>
                    <span className="text-sm text-destructive font-medium">{container.alerts} active alerts</span>
                  </div>
                )}

                {/* Last Inspection */}
                <div className="pt-2 border-t border-border">
                  <p className="text-xs text-muted-foreground">Last inspection: {container.lastInspection}</p>
                </div>

                {/* Action Button */}
                <Link href={`/dashboard/localities/${localityId}/${container.id}`}>
                  <Button className="w-full bg-primary hover:bg-primary/90" size="sm">
                    View Boxes ({container.totalBoxes})
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredContainers.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-muted/50 rounded-lg flex items-center justify-center mx-auto mb-4">
              <div className="w-8 h-8 bg-muted-foreground/30 rounded-sm"></div>
            </div>
            <h3 className="text-lg font-medium text-foreground mb-2">No containers found</h3>
            <p className="text-muted-foreground">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}
