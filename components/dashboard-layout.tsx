"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { useRouter, usePathname } from "next/navigation"
import { ThemeLanguageToggle } from "@/components/theme-language-toggle"

interface DashboardLayoutProps {
  children: React.ReactNode
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const router = useRouter()
  const pathname = usePathname()

  const navigationItems = [
    {
      name: "Overview",
      href: "/dashboard",
      icon: (
        <div className="w-5 h-5 border-2 border-current rounded-sm flex items-center justify-center">
          <div className="w-2 h-2 bg-current rounded-full"></div>
        </div>
      ),
    },
    {
      name: "Localities",
      href: "/dashboard/localities",
      icon: (
        <div className="w-5 h-5 grid grid-cols-2 gap-0.5">
          <div className="bg-current rounded-sm"></div>
          <div className="bg-current rounded-sm"></div>
          <div className="bg-current rounded-sm"></div>
          <div className="bg-current rounded-sm"></div>
        </div>
      ),
    },
    {
      name: "Analytics",
      href: "/dashboard/analytics",
      icon: (
        <div className="w-5 h-5 flex items-end gap-0.5">
          <div className="w-1 h-2 bg-current rounded-sm"></div>
          <div className="w-1 h-3 bg-current rounded-sm"></div>
          <div className="w-1 h-4 bg-current rounded-sm"></div>
          <div className="w-1 h-3 bg-current rounded-sm"></div>
        </div>
      ),
    },
    {
      name: "Settings",
      href: "/dashboard/settings",
      icon: (
        <div className="w-5 h-5 border-2 border-current rounded-full flex items-center justify-center">
          <div className="w-2 h-2 border border-current rounded-full"></div>
        </div>
      ),
    },
  ]

  const handleLogout = () => {
    router.push("/login")
  }

  return (
    <div className="min-h-screen bg-background transition-colors duration-300">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-sidebar border-r border-sidebar-border transform transition-transform duration-200 ease-in-out lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:static lg:inset-0`}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center gap-3 px-6 py-4 border-b border-sidebar-border">
            <div className="w-8 h-8 bg-sidebar-primary rounded-lg flex items-center justify-center">
              <div className="w-4 h-4 bg-sidebar-primary-foreground rounded-sm"></div>
            </div>
            <div>
              <h1 className="text-lg font-serif font-bold text-sidebar-foreground">SmartLogistics</h1>
              <p className="text-xs text-sidebar-foreground/60">Monitoring System</p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6">
            <div className="space-y-2">
              {navigationItems.map((item) => {
                const isActive = pathname === item.href
                return (
                  <Link key={item.name} href={item.href}>
                    <div
                      className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                        isActive
                          ? "bg-sidebar-accent text-sidebar-accent-foreground shadow-md"
                          : "text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground hover:shadow-sm"
                      }`}
                    >
                      <div className={isActive ? "text-sidebar-accent-foreground" : "text-sidebar-foreground/60"}>
                        {item.icon}
                      </div>
                      {item.name}
                    </div>
                  </Link>
                )
              })}
            </div>
          </nav>

          {/* User info */}
          <div className="px-4 py-4 border-t border-sidebar-border">
            <div className="flex items-center gap-3 px-3 py-2">
              <Avatar className="w-8 h-8">
                <AvatarImage src="/generic-user-avatar.png" />
                <AvatarFallback className="bg-sidebar-primary text-sidebar-primary-foreground text-xs">
                  AD
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-sidebar-foreground truncate">Admin User</p>
                <p className="text-xs text-sidebar-foreground/60 truncate">admin@company.com</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:pl-64">
        {/* Header */}
        <header className="bg-card border-b border-border sticky top-0 z-30 transition-colors duration-300">
          <div className="flex items-center justify-between px-4 py-2 md:py-3">
            <div className="flex items-center gap-4">
              {/* Mobile menu button */}
              <Button variant="ghost" size="sm" className="lg:hidden" onClick={() => setSidebarOpen(true)}>
                <div className="w-5 h-5 flex flex-col gap-1">
                  <div className="w-full h-0.5 bg-current rounded"></div>
                  <div className="w-full h-0.5 bg-current rounded"></div>
                  <div className="w-full h-0.5 bg-current rounded"></div>
                </div>
              </Button>

              <div>
                <h1 className="text-xl font-serif font-bold text-card-foreground">Dashboard</h1>
                <p className="text-sm text-muted-foreground">Monitor your logistics operations</p>
              </div>
            </div>

            <div className="flex items-center gap-2 md:gap-4">
              {/* Status indicator */}
              <div className="hidden sm:flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm text-muted-foreground">System Online</span>
              </div>

              <ThemeLanguageToggle />

              {/* Notifications */}
              <Button variant="ghost" size="sm" className="relative transition-colors duration-200 hover:bg-secondary">
                <div className="w-5 h-5 border-2 border-current rounded-sm"></div>
                <Badge className="absolute -top-1 -right-1 w-5 h-5 p-0 bg-accent text-accent-foreground text-xs">
                  3
                </Badge>
              </Button>

              {/* User menu */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="/generic-user-avatar.png" />
                      <AvatarFallback className="bg-primary text-primary-foreground">AD</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">Admin User</p>
                      <p className="text-xs leading-none text-muted-foreground">admin@company.com</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Link href="/dashboard/settings" className="w-full">
                      Settings
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>Support</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout} className="text-destructive">
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="p-4 md:p-6 lg:p-8 transition-colors duration-300">{children}</main>
      </div>
    </div>
  )
}
