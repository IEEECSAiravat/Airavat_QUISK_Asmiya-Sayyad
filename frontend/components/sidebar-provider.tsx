// "use client"

// import * as React from "react"
// import { usePathname } from "next/navigation"
// import { Slot } from "@radix-ui/react-slot"
// import { cva } from "class-variance-authority"
// import { PanelLeft } from "lucide-react"
// import { useIsMobile } from "@/hooks/use-mobile"
// import { cn } from "@/lib/utils"
// import { Button } from "@/components/ui/button"
// import { Sheet, SheetContent } from "@/components/ui/sheet"
// import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

// const SIDEBAR_WIDTH = "16rem"
// const SIDEBAR_WIDTH_MOBILE = "18rem"
// const SIDEBAR_WIDTH_ICON = "3rem"

// type SidebarContext = {
//   state: "expanded" | "collapsed"
//   open: boolean
//   setOpen: (open: boolean) => void
//   openMobile: boolean
//   setOpenMobile: (open: boolean) => void
//   isMobile: boolean
//   toggleSidebar: () => void
// }

// const SidebarContext = React.createContext<SidebarContext | null>(null)

// export function useSidebar() {
//   const context = React.useContext(SidebarContext)
//   if (!context) {
//     throw new Error("useSidebar must be used within a SidebarProvider.")
//   }
//   return context
// }

// export function SidebarProvider({
//   children,
// }: {
//   children: React.ReactNode
// }) {
//   const isMobile = useIsMobile()
//   const [openMobile, setOpenMobile] = React.useState(false)
//   const [open, setOpen] = React.useState(true)
//   const pathname = usePathname()

//   // Close mobile sidebar on route change
//   React.useEffect(() => {
//     setOpenMobile(false)
//   }, [pathname])

//   const toggleSidebar = React.useCallback(() => {
//     return isMobile ? setOpenMobile((open) => !open) : setOpen((open) => !open)
//   }, [isMobile])

//   const state = open ? "expanded" : "collapsed"

//   const contextValue = React.useMemo<SidebarContext>(
//     () => ({
//       state,
//       open,
//       setOpen,
//       isMobile,
//       openMobile,
//       setOpenMobile,
//       toggleSidebar,
//     }),
//     [state, open, setOpen, isMobile, openMobile, setOpenMobile, toggleSidebar],
//   )

//   return (
//     <SidebarContext.Provider value={contextValue}>
//       <TooltipProvider delayDuration={0}>
//         <div
//           style={
//             {
//               "--sidebar-width": SIDEBAR_WIDTH,
//               "--sidebar-width-icon": SIDEBAR_WIDTH_ICON,
//             } as React.CSSProperties
//           }
//           className="group/sidebar-wrapper flex min-h-svh w-full"
//           data-state={state}
//         >
//           {children}
//         </div>
//       </TooltipProvider>
//     </SidebarContext.Provider>
//   )
// }

// export const Sidebar = React.forwardRef<HTMLDivElement, React.ComponentProps<"div">>(
//   ({ className, children, ...props }, ref) => {
//     const { isMobile, state, openMobile, setOpenMobile } = useSidebar()

//     if (isMobile) {
//       return (
//         <Sheet open={openMobile} onOpenChange={setOpenMobile} {...props}>
//           <SheetContent
//             data-sidebar="sidebar"
//             data-mobile="true"
//             className="w-[--sidebar-width] bg-white p-0 text-sidebar-foreground [&>button]:hidden"
//             style={
//               {
//                 "--sidebar-width": SIDEBAR_WIDTH_MOBILE,
//               } as React.CSSProperties
//             }
//             side="left"
//           >
//             <div className="flex h-full w-full flex-col">{children}</div>
//           </SheetContent>
//         </Sheet>
//       )
//     }

//     return (
//       <div
//         ref={ref}
//         className="group peer fixed z-10 hidden md:block text-sidebar-foreground"
//         data-state={state}
//         data-side="left"
//       >
//         <div
//           className={cn(
//             "duration-200 h-svh w-[--sidebar-width] bg-white transition-[width] ease-linear border-r border-[#e5e7eb]",
//             "group-data-[state=collapsed]:w-[--sidebar-width-icon]",
//             className,
//           )}
//           {...props}
//         >
//           <div className="flex h-full w-full flex-col">{children}</div>
//         </div>
//       </div>
//     )
//   },
// )
// Sidebar.displayName = "Sidebar"

// export const SidebarTrigger = React.forwardRef<React.ElementRef<typeof Button>, React.ComponentProps<typeof Button>>(
//   ({ className, onClick, ...props }, ref) => {
//     const { toggleSidebar } = useSidebar()

//     return (
//       <Button
//         ref={ref}
//         data-sidebar="trigger"
//         variant="ghost"
//         size="icon"
//         className={cn("h-9 w-9", className)}
//         onClick={(event) => {
//           onClick?.(event)
//           toggleSidebar()
//         }}
//         {...props}
//       >
//         <PanelLeft className="h-5 w-5" />
//         <span className="sr-only">Toggle Sidebar</span>
//       </Button>
//     )
//   },
// )
// SidebarTrigger.displayName = "SidebarTrigger"

// export const SidebarContent = React.forwardRef<HTMLDivElement, React.ComponentProps<"div">>(
//   ({ className, ...props }, ref) => {
//     return (
//       <div
//         ref={ref}
//         data-sidebar="content"
//         className={cn(
//           "flex min-h-0 flex-1 flex-col gap-2 overflow-auto group-data-[state=collapsed]:overflow-hidden",
//           className,
//         )}
//         {...props}
//       />
//     )
//   },
// )
// SidebarContent.displayName = "SidebarContent"

// const sidebarMenuButtonVariants = cva(
//   "peer/menu-button flex w-full items-center gap-3 overflow-hidden rounded-md p-2 text-left text-sm outline-none ring-sidebar-ring transition-[width,height,padding] hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 active:bg-sidebar-accent active:text-sidebar-accent-foreground disabled:pointer-events-none disabled:opacity-50 group-has-[[data-sidebar=menu-action]]/menu-item:pr-8 aria-disabled:pointer-events-none aria-disabled:opacity-50 data-[active=true]:bg-sidebar-accent data-[active=true]:font-medium data-[active=true]:text-sidebar-accent-foreground data-[state=open]:hover:bg-sidebar-accent data-[state=open]:hover:text-sidebar-accent-foreground group-data-[state=collapsed]:!size-8 group-data-[state=collapsed]:!p-2 [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0",
//   {
//     variants: {
//       variant: {
//         default: "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
//         outline:
//           "bg-background shadow-[0_0_0_1px_hsl(var(--sidebar-border))] hover:bg-sidebar-accent hover:text-sidebar-accent-foreground hover:shadow-[0_0_0_1px_hsl(var(--sidebar-accent))]",
//       },
//       size: {
//         default: "h-10 text-sm",
//         sm: "h-8 text-xs",
//         lg: "h-12 text-sm group-data-[state=collapsed]:!p-0",
//       },
//     },
//     defaultVariants: {
//       variant: "default",
//       size: "default",
//     },
//   },
// )

// export const SidebarMenuButton = React.forwardRef<
//   HTMLButtonElement,
//   React.ComponentProps<"button"> & {
//     asChild?: boolean
//     isActive?: boolean
//     tooltip?: string | React.ComponentProps<typeof TooltipContent>
//     variant?: "default" | "outline"
//     size?: "default" | "sm" | "lg"
//   }
// >(({ asChild = false, isActive = false, variant = "default", size = "default", tooltip, className, ...props }, ref) => {
//   const Comp = asChild ? Slot : "button"
//   const { isMobile, state } = useSidebar()

//   const button = (
//     <Comp
//       ref={ref}
//       data-sidebar="menu-button"
//       data-size={size}
//       data-active={isActive}
//       className={cn(sidebarMenuButtonVariants({ variant, size }), className)}
//       {...props}
//     />
//   )

//   if (!tooltip) {
//     return button
//   }

//   if (typeof tooltip === "string") {
//     tooltip = {
//       children: tooltip,
//     }
//   }

//   return (
//     <Tooltip>
//       <TooltipTrigger asChild>{button}</TooltipTrigger>
//       <TooltipContent side="right" align="center" hidden={state !== "collapsed" || isMobile} {...tooltip} />
//     </Tooltip>
//   )
// })
// SidebarMenuButton.displayName = "SidebarMenuButton"

"use client"

import * as React from "react"
import { usePathname } from "next/navigation"
import { Slot } from "@radix-ui/react-slot"
import { cva } from "class-variance-authority"
import { PanelLeft } from "lucide-react"
import { useIsMobile } from "@/hooks/use-mobile"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent } from "@/components/ui/sheet"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

const SIDEBAR_WIDTH = "11rem"
const SIDEBAR_WIDTH_MOBILE = "18rem"
const SIDEBAR_WIDTH_ICON = "3rem"

type SidebarContext = {
  state: "expanded" | "collapsed"
  open: boolean
  setOpen: (open: boolean) => void
  openMobile: boolean
  setOpenMobile: (open: boolean) => void
  isMobile: boolean
  toggleSidebar: () => void
}

const SidebarContext = React.createContext<SidebarContext | null>(null)

export function useSidebar() {
  const context = React.useContext(SidebarContext)
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider.")
  }
  return context
}

export function SidebarProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const isMobile = useIsMobile()
  const [openMobile, setOpenMobile] = React.useState(false)
  const [open, setOpen] = React.useState(true)
  const pathname = usePathname()

  // Close mobile sidebar on route change
  React.useEffect(() => {
    setOpenMobile(false)
  }, [pathname])

  const toggleSidebar = React.useCallback(() => {
    return isMobile ? setOpenMobile((open) => !open) : setOpen((open) => !open)
  }, [isMobile])

  const state = open ? "expanded" : "collapsed"

  const contextValue = React.useMemo<SidebarContext>(
    () => ({
      state,
      open,
      setOpen,
      isMobile,
      openMobile,
      setOpenMobile,
      toggleSidebar,
    }),
    [state, open, setOpen, isMobile, openMobile, setOpenMobile, toggleSidebar],
  )

  return (
    <SidebarContext.Provider value={contextValue}>
      <TooltipProvider delayDuration={0}>
        <div
          style={
            {
              "--sidebar-width": SIDEBAR_WIDTH,
              "--sidebar-width-icon": SIDEBAR_WIDTH_ICON,
            } as React.CSSProperties
          }
          className="group/sidebar-wrapper flex min-h-svh w-full"
          data-state={state}
        >
          {children}
        </div>
      </TooltipProvider>
    </SidebarContext.Provider>
  )
}

export const Sidebar = React.forwardRef<HTMLDivElement, React.ComponentProps<"div">>(
  ({ className, children, ...props }, ref) => {
    const { isMobile, state, openMobile, setOpenMobile } = useSidebar()

    if (isMobile) {
      return (
        <Sheet open={openMobile} onOpenChange={setOpenMobile} {...props}>
          <SheetContent
            data-sidebar="sidebar"
            data-mobile="true"
            className="w-[--sidebar-width] bg-white p-0 text-sidebar-foreground [&>button]:hidden"
            style={
              {
                "--sidebar-width": SIDEBAR_WIDTH_MOBILE,
              } as React.CSSProperties
            }
            side="left"
          >
            <div className="flex h-full w-full flex-col">{children}</div>
          </SheetContent>
        </Sheet>
      )
    }

    return (
      <div
        ref={ref}
        className="group peer fixed z-10 hidden md:block text-sidebar-foreground"
        data-state={state}
        data-side="left"
      >
        <div
          className={cn(
            "duration-200 h-svh w-[--sidebar-width] bg-white transition-[width] ease-linear border-r border-[#e5e7eb]",
            "group-data-[state=collapsed]:w-[--sidebar-width-icon]",
            className,
          )}
          {...props}
        >
          <div className="flex h-full w-full flex-col">{children}</div>
        </div>
      </div>
    )
  },
)
Sidebar.displayName = "Sidebar"

export const SidebarTrigger = React.forwardRef<React.ElementRef<typeof Button>, React.ComponentProps<typeof Button>>(
  ({ className, onClick, ...props }, ref) => {
    const { toggleSidebar } = useSidebar()

    return (
      <Button
        ref={ref}
        data-sidebar="trigger"
        variant="ghost"
        size="icon"
        className={cn("h-9 w-9", className)}
        onClick={(event) => {
          onClick?.(event)
          toggleSidebar()
        }}
        {...props}
      >
        <PanelLeft className="h-5 w-5" />
        <span className="sr-only">Toggle Sidebar</span>
      </Button>
    )
  },
)
SidebarTrigger.displayName = "SidebarTrigger"

export const SidebarContent = React.forwardRef<HTMLDivElement, React.ComponentProps<"div">>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        data-sidebar="content"
        className={cn(
          "flex min-h-0 flex-1 flex-col gap-2 overflow-auto group-data-[state=collapsed]:overflow-hidden",
          className,
        )}
        {...props}
      />
    )
  },
)
SidebarContent.displayName = "SidebarContent"

const sidebarMenuButtonVariants = cva(
  "peer/menu-button flex w-full items-center gap-3 overflow-hidden rounded-md p-2 text-left text-sm outline-none ring-sidebar-ring transition-[width,height,padding] hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 active:bg-sidebar-accent active:text-sidebar-accent-foreground disabled:pointer-events-none disabled:opacity-50 group-has-[[data-sidebar=menu-action]]/menu-item:pr-8 aria-disabled:pointer-events-none aria-disabled:opacity-50 data-[active=true]:bg-sidebar-accent data-[active=true]:font-medium data-[active=true]:text-sidebar-accent-foreground data-[state=open]:hover:bg-sidebar-accent data-[state=open]:hover:text-sidebar-accent-foreground group-data-[state=collapsed]:!size-8 group-data-[state=collapsed]:!p-2 [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
        outline:
          "bg-background shadow-[0_0_0_1px_hsl(var(--sidebar-border))] hover:bg-sidebar-accent hover:text-sidebar-accent-foreground hover:shadow-[0_0_0_1px_hsl(var(--sidebar-accent))]",
      },
      size: {
        default: "h-10 text-sm",
        sm: "h-8 text-xs",
        lg: "h-12 text-sm group-data-[state=collapsed]:!p-0",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
)

export const SidebarMenuButton = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<"button"> & {
    asChild?: boolean
    isActive?: boolean
    tooltip?: string | React.ComponentProps<typeof TooltipContent>
    variant?: "default" | "outline"
    size?: "default" | "sm" | "lg"
  }
>(({ asChild = false, isActive = false, variant = "default", size = "default", tooltip, className, ...props }, ref) => {
  const Comp = asChild ? Slot : "button"
  const { isMobile, state } = useSidebar()

  const button = (
    <Comp
      ref={ref}
      data-sidebar="menu-button"
      data-size={size}
      data-active={isActive}
      className={cn(sidebarMenuButtonVariants({ variant, size }), className)}
      {...props}
    />
  )

  if (!tooltip) {
    return button
  }

  if (typeof tooltip === "string") {
    tooltip = {
      children: tooltip,
    }
  }

  return (
    <Tooltip>
      <TooltipTrigger asChild>{button}</TooltipTrigger>
      <TooltipContent side="right" align="center" hidden={state !== "collapsed" || isMobile} {...tooltip} />
    </Tooltip>
  )
})
SidebarMenuButton.displayName = "SidebarMenuButton"
