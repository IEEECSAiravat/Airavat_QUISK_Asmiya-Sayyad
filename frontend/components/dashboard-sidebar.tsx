// "use client"

// import Link from "next/link"
// import { usePathname } from "next/navigation"
// import { BookOpen, Briefcase, Calendar, Home, Layers, MessageSquare, Settings, Users } from "lucide-react"
// import { cn } from "@/lib/utils"
// import { Sidebar, SidebarContent } from "@/components/sidebar-provider"

// export function DashboardSidebar() {
//   const pathname = usePathname()

//   const routes = [
//     {
//       name: "Dashboard",
//       href: "/dashboard",
//       icon: Home,
//     },
//     {
//       name: "Roadmaps",
//       href: "/dashboard/roadmaps",
//       icon: Layers,
//     },
//     {
//       name: "Courses",
//       href: "/dashboard/courses",
//       icon: BookOpen,
//     },
//     {
//       name: "Community",
//       href: "/dashboard/community",
//       icon: Users,
//     },
//     {
//       name: "Job Matching",
//       href: "/dashboard/jobs",
//       icon: Briefcase,
//     },
//     {
//       name: "Events",
//       href: "/dashboard/events",
//       icon: Calendar,
//     },
//     {
//       name: "My Interviews",
//       href: "/dashboard/interviews",
//       icon: MessageSquare,
//     },
//   ]

//   return (
//     <Sidebar className="border-r">
//       <SidebarContent className="p-2">
//         {/* SkillSakhi Logo/Name at the top */}
//         <div className="flex items-center gap-2 px-3 py-4 mb-4">
//           <div className="h-8 w-8 rounded-full bg-teal-600 flex items-center justify-center">
//             <span className="text-white font-semibold text-sm">SK</span>
//           </div>
//           <span className="font-bold text-lg">SkillSakhi</span>
//         </div>

//         {/* Navigation Links */}
//         <div className="flex flex-col gap-2">
//           {routes.map((route) => (
//             <Link
//               key={route.href}
//               href={route.href}
//               className={cn(
//                 "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all hover:bg-accent",
//                 pathname === route.href ? "bg-accent text-accent-foreground" : "text-muted-foreground",
//               )}
//             >
//               <route.icon className="h-5 w-5" />
//               <span>{route.name}</span>
//             </Link>
//           ))}
//         </div>

//         <div className="mt-auto pt-4">
//           <Link
//             href="/dashboard/settings"
//             className={cn(
//               "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all hover:bg-accent",
//               pathname === "/dashboard/settings" ? "bg-accent text-accent-foreground" : "text-muted-foreground",
//             )}
//           >
//             <Settings className="h-5 w-5" />
//             <span>Settings</span>
//           </Link>
//         </div>
//       </SidebarContent>
//     </Sidebar>
//   )
// }


"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Briefcase, Calendar, Home, Layers, MessageSquare, Settings, Users, BookOpen } from "lucide-react"
import { cn } from "@/lib/utils"
import { Sidebar, SidebarContent } from "@/components/sidebar-provider"

export function DashboardSidebar() {
  const pathname = usePathname()

  const routes = [
    {
      name: "Dashboard",
      href: "/dashboard",
      icon: Home,
    },
    {
      name: "Courses",
      href: "/dashboard/courses",
      icon: BookOpen,
    },
    {
      name: "Roadmaps",
      href: "/dashboard/roadmaps",
      icon: Layers,
    },
    {
      name: "Community",
      href: "/dashboard/community",
      icon: Users,
    },
    {
      name: "Job Matching",
      href: "/dashboard/jobs",
      icon: Briefcase,
    },
    // {
    //   name: "Events",
    //   href: "/dashboard/events",
    //   icon: Calendar,
    // },
    {
      name: "My Interviews",
      href: "/dashboard/interviews",
      icon: MessageSquare,
    },
  ]

  return (
    <Sidebar className="border-r bg-white">
      <SidebarContent className="p-4">
        {/* SkillSakhi Logo with Text */}
        <div className="flex items-center gap-2 px-2 mb-6 mt-2">
          <div className="h-8 w-8 rounded-full bg-teal-600 flex items-center justify-center">
            <span className="text-white font-semibold text-sm">SK</span>
          </div>
          <span className="font-semibold text-gray-800">SkillSakhi</span>
        </div>

        {/* Navigation Links */}
        <div className="flex flex-col gap-1">
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-all",
                pathname === route.href
                  ? "bg-gray-100 text-gray-900"
                  : "text-gray-500 hover:bg-gray-50 hover:text-gray-900",
              )}
            >
              <route.icon className="h-5 w-5" />
              <span>{route.name}</span>
            </Link>
          ))}
        </div>

        <div className="mt-auto pt-4">
          <Link
            href="/dashboard/settings"
            className={cn(
              "flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-all",
              pathname === "/dashboard/settings"
                ? "bg-gray-100 text-gray-900"
                : "text-gray-500 hover:bg-gray-50 hover:text-gray-900",
            )}
          >
            <Settings className="h-5 w-5" />
            <span>Settings</span>
          </Link>
        </div>
      </SidebarContent>
    </Sidebar>
  )
}
