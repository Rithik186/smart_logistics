"use client"

import { useState, useEffect } from "react"
import DashboardLayout from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"

interface Locality {
  id: string
  name: string
  region: string
  totalContainers: number
  activeBoxes: number
  inTransit: number
  alerts: number
  status: "online" | "offline" | "maintenance"
  lastUpdate: string
  coordinates: { lat: number; lng: number }
}

const generateRandomLocalities = (): Locality[] => {
  const regions = ["North", "South", "East", "West", "Central"]
  const cities = [
    "Distribution Center",
    "Warehouse Hub",
    "Logistics Center",
    "Storage Facility",
    "Processing Plant",
    "Manufacturing Unit",
    "Assembly Center",
    "Dispatch Hub",
  ]
  const statuses: ("online" | "offline" | "maintenance")[] = ["online", "online", "online", "maintenance", "offline"]

  return Array.from({ length: 24 }, (_, i) => {
    const region = regions[Math.floor(Math.random() * regions.length)]
    const city = cities[Math.floor(Math.random() * cities.length)]
    const totalContainers = Math.floor(Math.random() * 50) + 10
    const activeBoxes = Math.floor(Math.random() * totalContainers * 20) + 50
    const inTransit = Math.floor(activeBoxes * (Math.random() * 0.6 + 0.2))
    const alerts = Math.floor(Math.random() * 8)
    const status = statuses[Math.floor(Math.random() * statuses.length)]

    return {
      id: `LOC-${(i + 1).toString().padStart(3, "0")}`,
      name: `${region} ${city} ${String.fromCharCode(65 + (i % 26))}`,
      region,
      totalContainers,
      activeBoxes,
      inTransit,
      alerts,
      status,
      lastUpdate: new Date(Date.now() - Math.random() * 3600000).toLocaleTimeString(),
      coordinates: {
        lat: 40.7128 + (Math.random() - 0.5) * 10,
        lng: -74.006 + (Math.random() - 0.5) * 10,
      },
    }
  })
}

export default function LocalitiesPage() {
  const [localities, setLocalities] = useState<Locality[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedRegion, setSelectedRegion] = useState<string>("all")

  useEffect(() => {
    setLocalities(generateRandomLocalities())
  }, [])

  const filteredLocalities = localities.filter((locality) => {
    const matchesSearch = locality.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesRegion = selectedRegion === "all" || locality.region === selectedRegion
    return matchesSearch && matchesRegion
  })

  const regions = ["all", ...Array.from(new Set(localities.map((l) => l.region)))]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "online":
        return "bg-green-100 text-green-800"
      case "offline":
        return "bg-red-100 text-red-800"
      case "maintenance":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "online":
        return <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
      case "offline":
        return <div className="w-2 h-2 bg-red-500 rounded-full"></div>
      case "maintenance":
        return <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></div>
      default:
        return <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
    }
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-serif font-bold text-foreground mb-2">Localities</h1>
            <p className="text-muted-foreground">
              Monitor box distribution across {localities.length} active localities
            </p>
          </div>
          <Button onClick={() => setLocalities(generateRandomLocalities())} variant="outline">
            Refresh Data
          </Button>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <Input
              placeholder="Search localities..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-sm"
            />
          </div>
          <div className="flex gap-2">
            {regions.map((region) => (
              <Button
                key={region}
                variant={selectedRegion === region ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedRegion(region)}
                className="capitalize"
              >
                {region}
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
                  <p className="text-sm font-medium text-muted-foreground">Total Localities</p>
                  <p className="text-2xl font-serif font-bold text-card-foreground">{localities.length}</p>
                </div>
                <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                  <div className="w-4 h-4 grid grid-cols-2 gap-0.5">
                    <div className="bg-primary rounded-sm"></div>
                    <div className="bg-primary rounded-sm"></div>
                    <div className="bg-primary rounded-sm"></div>
                    <div className="bg-primary rounded-sm"></div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Online</p>
                  <p className="text-2xl font-serif font-bold text-card-foreground">
                    {localities.filter((l) => l.status === "online").length}
                  </p>
                </div>
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Containers</p>
                  <p className="text-2xl font-serif font-bold text-card-foreground">
                    {localities.reduce((sum, l) => sum + l.totalContainers, 0)}
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
                  <p className="text-sm font-medium text-muted-foreground">Active Alerts</p>
                  <p className="text-2xl font-serif font-bold text-card-foreground">
                    {localities.reduce((sum, l) => sum + l.alerts, 0)}
                  </p>
                </div>
                <div className="w-8 h-8 bg-destructive/10 rounded-lg flex items-center justify-center">
                  <div className="w-4 h-4 bg-destructive rounded-sm"></div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Localities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredLocalities.map((locality) => (
            <Card key={locality.id} className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg text-card-foreground">{locality.name}</CardTitle>
                    <CardDescription className="flex items-center gap-2 mt-1">
                      <span>{locality.id}</span>
                      <span>•</span>
                      <span>{locality.region} Region</span>
                    </CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    {getStatusIcon(locality.status)}
                    <Badge className={getStatusColor(locality.status)} variant="secondary">
                      {locality.status}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Metrics */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Containers</p>
                    <p className="text-xl font-serif font-bold text-card-foreground">{locality.totalContainers}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Active Boxes</p>
                    <p className="text-xl font-serif font-bold text-card-foreground">{locality.activeBoxes}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">In Transit</p>
                    <p className="text-lg font-medium text-accent">{locality.inTransit}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Alerts</p>
                    <p
                      className={`text-lg font-medium ${locality.alerts > 0 ? "text-destructive" : "text-muted-foreground"}`}
                    >
                      {locality.alerts}
                    </p>
                  </div>
                </div>

                {/* Last Update */}
                <div className="pt-2 border-t border-border">
                  <p className="text-xs text-muted-foreground">Last update: {locality.lastUpdate}</p>
                </div>

                {/* Action Button */}
                <Link href={`/dashboard/localities/${locality.id}`}>
                  <Button className="w-full bg-primary hover:bg-primary/90" size="sm">
                    View Containers
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredLocalities.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-muted/50 rounded-lg flex items-center justify-center mx-auto mb-4">
              <div className="w-8 h-8 grid grid-cols-2 gap-1">
                <div className="bg-muted-foreground/30 rounded-sm"></div>
                <div className="bg-muted-foreground/30 rounded-sm"></div>
                <div className="bg-muted-foreground/30 rounded-sm"></div>
                <div className="bg-muted-foreground/30 rounded-sm"></div>
              </div>
            </div>
            <h3 className="text-lg font-medium text-foreground mb-2">No localities found</h3>
            <p className="text-muted-foreground">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}
