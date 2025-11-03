"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts"

interface HealthChartProps {
  title: string
  description: string
  data: Array<{ name: string; value: number }>
  type?: "area" | "bar"
  theme?: "light" | "dark"
}

export function EnhancedHealthChart({ title, description, data, type = "area", theme = "light" }: HealthChartProps) {
  const isDark = typeof window !== "undefined" && document.documentElement.classList.contains("dark")

  const gridColor = isDark ? "#374151" : "#e5e7eb"
  const textColor = isDark ? "#e5e7eb" : "#374151"

  // Get color based on health value
  const getBarColor = (value: number) => {
    if (value >= 80) return "#10b981" // green
    if (value >= 60) return "#f59e0b" // amber
    return "#ef4444" // red
  }

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-background border border-border rounded-lg shadow-lg p-3">
          <p className="text-sm font-semibold text-foreground">{payload[0].payload.name}</p>
          <p className="text-sm text-primary font-bold">{payload[0].value}%</p>
        </div>
      )
    }
    return null
  }

  return (
    <Card className="transition-all duration-300 hover:shadow-lg dark:bg-slate-900 dark:border-slate-700">
      <CardHeader>
        <CardTitle className="text-lg">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          {type === "area" ? (
            <AreaChart data={data}>
              <defs>
                <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
              <XAxis dataKey="name" stroke={textColor} />
              <YAxis stroke={textColor} domain={[0, 100]} />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="monotone"
                dataKey="value"
                stroke="#10b981"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorGradient)"
              />
            </AreaChart>
          ) : (
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
              <XAxis dataKey="name" stroke={textColor} />
              <YAxis stroke={textColor} domain={[0, 100]} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="value" radius={[8, 8, 0, 0]}>
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={getBarColor(entry.value)} />
                ))}
              </Bar>
            </BarChart>
          )}
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
