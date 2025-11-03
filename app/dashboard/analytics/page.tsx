import DashboardLayout from "@/components/dashboard-layout"

export default function AnalyticsPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-serif font-bold text-foreground mb-2">Analytics</h1>
          <p className="text-muted-foreground">Detailed insights and performance metrics</p>
        </div>

        <div className="text-center py-12">
          <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
            <div className="w-8 h-8 flex items-end gap-1">
              <div className="w-1.5 h-3 bg-primary rounded-sm"></div>
              <div className="w-1.5 h-5 bg-primary rounded-sm"></div>
              <div className="w-1.5 h-4 bg-primary rounded-sm"></div>
              <div className="w-1.5 h-6 bg-primary rounded-sm"></div>
            </div>
          </div>
          <h3 className="text-lg font-medium text-foreground mb-2">Analytics Dashboard Coming Soon</h3>
          <p className="text-muted-foreground">Comprehensive analytics and reporting tools</p>
        </div>
      </div>
    </DashboardLayout>
  )
}
