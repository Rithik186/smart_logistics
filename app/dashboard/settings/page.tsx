'use client';
export const dynamic = "force-dynamic";
import DashboardLayout from "@/components/dashboard-layout"
export default function SettingsPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-serif font-bold text-foreground mb-2">Settings</h1>
          <p className="text-muted-foreground">Configure your system preferences</p>
        </div>

        <div className="text-center py-12">
          <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
            <div className="w-8 h-8 border-2 border-primary rounded-full flex items-center justify-center">
              <div className="w-3 h-3 border border-primary rounded-full"></div>
            </div>
          </div>
          <h3 className="text-lg font-medium text-foreground mb-2">Settings Panel Coming Soon</h3>
          <p className="text-muted-foreground">System configuration and user preferences</p>
        </div>
      </div>
    </DashboardLayout>
  )
}
