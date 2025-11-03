"use client"

import DashboardLayout from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { getTranslation } from "@/lib/i18n"
import { useLanguage } from "@/lib/language-context"
import { useTheme } from "next-themes"
import { Progress } from "@/components/ui/progress"
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

export default function DashboardPage() {
  const { language } = useLanguage()
  const { theme } = useTheme()
  const t = (key: string) => getTranslation(language, key)

  const metrics = [
    {
      title: t('metrics.totalBoxes'),
      value: '0',
      description: t('dashboard.upcomingFeature'),
      icon: '📦',
    },
    {
      title: t('metrics.activeLocalities'),
      value: '0',
      description: t('dashboard.upcomingFeature'),
      icon: '📍',
    },
    {
      title: t('metrics.inTransit'),
      value: '0',
      description: t('dashboard.upcomingFeature'),
      icon: '🚚',
    },
    {
      title: t('metrics.alerts'),
      value: '0',
      description: t('dashboard.upcomingFeature'),
      icon: '⚠️',
    },
  ]

  // Mock health data for visualization
  const healthData = [
    { name: 'Box 001', health: 85 },
    { name: 'Box 002', health: 72 },
    { name: 'Box 003', health: 60 },
    { name: 'Box 004', health: 45 },
    { name: 'Box 005', health: 90 },
  ]

  const utilizationData = [
    { month: 'Jan', usage: 40 },
    { month: 'Feb', usage: 35 },
    { month: 'Mar', usage: 55 },
    { month: 'Apr', usage: 48 },
    { month: 'May', usage: 62 },
  ]

  return (
    <DashboardLayout>
      <div className="space-y-6 md:space-y-8">
        {/* Welcome Section */}
        <div className="animate-fade-in">
          <h1 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-2">
            {t('dashboard.welcome')}
          </h1>
          <p className="text-base text-muted-foreground">
            {t('dashboard.subtitle')}
          </p>
        </div>

        {/* Metrics Grid - More compact, no white space */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
          {metrics.map((metric, i) => (
            <Card 
              key={i}
              className="group relative overflow-hidden transition-all duration-300 hover:shadow-lg hover:scale-105 hover:border-primary/50 cursor-pointer bg-gradient-to-br from-background to-background/50 dark:from-slate-900 dark:to-slate-800"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-primary/0 to-primary/0 group-hover:from-primary/5 group-hover:to-primary/10 transition-all duration-300"></div>
              
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3 relative z-10">
                <CardTitle className="text-sm font-medium text-muted-foreground">{metric.title}</CardTitle>
                <span className="text-2xl">{metric.icon}</span>
              </CardHeader>
              <CardContent className="relative z-10">
                <div className="text-3xl md:text-4xl font-serif font-bold text-foreground">{metric.value}</div>
                <p className="text-xs text-primary font-semibold mt-1">{metric.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Charts Section - Two column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Box Health Status */}
          <Card className="transition-all duration-300 hover:shadow-md dark:bg-slate-900 dark:border-slate-700">
            <CardHeader>
              <CardTitle className="text-lg">{t('metrics.systemHealth')}</CardTitle>
              <CardDescription>{t('dashboard.comingSoon')}</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={healthData}>
                  <CartesianGrid strokeDasharray="3 3" stroke={theme === 'dark' ? '#374151' : '#e5e7eb'} />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: theme === 'dark' ? '#1f2937' : '#fff',
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px'
                    }}
                  />
                  <Bar dataKey="health" fill="#10b981" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Box Utilization Trend */}
          <Card className="transition-all duration-300 hover:shadow-md dark:bg-slate-900 dark:border-slate-700">
            <CardHeader>
              <CardTitle className="text-lg">{t('metrics.boxUtilization')}</CardTitle>
              <CardDescription>{t('dashboard.comingSoon')}</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={utilizationData}>
                  <CartesianGrid strokeDasharray="3 3" stroke={theme === 'dark' ? '#374151' : '#e5e7eb'} />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: theme === 'dark' ? '#1f2937' : '#fff',
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px'
                    }}
                  />
                  <Line type="monotone" dataKey="usage" stroke="#3b82f6" strokeWidth={2} dot={{ fill: '#3b82f6', r: 5 }} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Activity & Status Section */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Recent Activity */}
          <Card className="transition-all duration-300 hover:shadow-md dark:bg-slate-900 dark:border-slate-700">
            <CardHeader>
              <CardTitle>{t('recentActivity.title')}</CardTitle>
              <CardDescription>{t('dashboard.comingSoon')}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-center py-8 text-center">
                <div>
                  <p className="text-muted-foreground text-sm">{t('dashboard.comingSoon')}</p>
                  <p className="text-xs text-muted-foreground/60 mt-1">Activity tracking will be available soon</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* System Status */}
          <Card className="transition-all duration-300 hover:shadow-md dark:bg-slate-900 dark:border-slate-700">
            <CardHeader>
              <CardTitle>{t('systemStatus.title')}</CardTitle>
              <CardDescription>{t('dashboard.comingSoon')}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-center py-8 text-center">
                <div>
                  <p className="text-muted-foreground text-sm">{t('dashboard.comingSoon')}</p>
                  <p className="text-xs text-muted-foreground/60 mt-1">System monitoring will be available soon</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  )
}
