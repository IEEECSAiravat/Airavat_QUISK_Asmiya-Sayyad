import type React from "react"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { SidebarProvider } from "@/components/sidebar-provider"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-[#f9fafb]">
        <DashboardSidebar />
        <div className="flex flex-1 flex-col w-full md:pl-[var(--sidebar-width)] md:group-data-[state=collapsed]/sidebar-wrapper:pl-[var(--sidebar-width-icon)] transition-all duration-300">
          <DashboardHeader />
          <main className="flex-1 p-6 w-full">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  )
}
