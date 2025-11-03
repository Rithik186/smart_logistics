"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

interface HealthStatusCardProps {
  title: string
  boxId: string
  healthScore: number
  status: "healthy" | "warning" | "critical"
  lastUpdated?: string
}

const statusColors = {
  healthy: {
    bg: "bg-green-500/10 dark:bg-green-500/20",
    text: "text-green-600 dark:text-green-400",
    bar: "bg-green-500",
    border: "border-green-200 dark:border-green-800",
  },
  warning: {
    bg: "bg-yellow-500/10 dark:bg-yellow-500/20",
    text: "text-yellow-600 dark:text-yellow-400",
    bar: "bg-yellow-500",
    border: "border-yellow-200 dark:border-yellow-800",
  },
  critical: {
    bg: "bg-red-500/10 dark:bg-red-500/20",
    text: "text-red-600 dark:text-red-400",
    bar: "bg-red-500",
    border: "border-red-200 dark:border-red-800",
  },
}

export function HealthStatusCard({ title, boxId, healthScore, status, lastUpdated }: HealthStatusCardProps) {
  const colors = statusColors[status]

  return (
    <Card
      className={`group relative overflow-hidden transition-all duration-300 hover:shadow-lg border ${colors.border}`}
    >
      {/* Animated gradient background on hover */}
      <div className={`absolute inset-0 ${colors.bg} transition-all duration-300 group-hover:opacity-100`}></div>

      <CardHeader className="relative z-10">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-sm font-medium">{title}</CardTitle>
            <p className="text-xs text-muted-foreground mt-1">{boxId}</p>
          </div>
          <div className={`text-2xl font-bold ${colors.text}`}>{healthScore}%</div>
        </div>
      </CardHeader>

      <CardContent className="relative z-10 space-y-3">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-muted-foreground">Health Status</span>
            <span className={`text-xs font-semibold ${colors.text} capitalize`}>{status}</span>
          </div>
          <Progress value={healthScore} className="h-2" />
        </div>

        {lastUpdated && <p className="text-xs text-muted-foreground">Last updated: {lastUpdated}</p>}
      </CardContent>
    </Card>
  )
}
