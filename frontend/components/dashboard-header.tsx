"use client"

import { useState } from "react"
import Link from "next/link"
import { Bell, ChevronDown, Globe, MessageSquare, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { SidebarTrigger } from "@/components/sidebar-provider"
import { UserProfileDialog } from "@/components/user-profile-dialog"
import GoogleTranslate from "@/components/google-translate"
export function DashboardHeader() {
  const [showUserProfile, setShowUserProfile] = useState(false)

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-white px-6 w-full">
      <SidebarTrigger className="md:hidden" />

      <div className="flex flex-1 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/dashboard" className="flex items-center">
            <div className="h-8 w-8 rounded-full bg-teal-600 flex items-center justify-center mr-2">
              <span className="text-white font-semibold text-sm">SK</span>
            </div>
            <span className="hidden font-bold sm:inline-block">SkillSakhi</span>
          </Link>
        </div>

        <div className="flex items-center gap-4">
          {/* Language Selector */}
          <GoogleTranslate />
        

          {/* ISL Chatbot Button */}
          <Button variant="outline" size="sm" className="gap-1">
            <MessageSquare className="h-4 w-4" />
            <span className="hidden sm:inline-block">ISL Chatbot</span>
          </Button>

          <div className="hidden md:flex relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input type="search" placeholder="Search..." className="w-64 pl-8 rounded-lg bg-background" />
          </div>

          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-red-600"></span>
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-9 w-9 rounded-full">
                <Avatar className="h-9 w-9">
                  <AvatarImage src="/thoughtful-woman-profile.png" alt="User" />
                  <AvatarFallback>AK</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setShowUserProfile(true)}>Profile</DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Help</DropdownMenuItem>
              <DropdownMenuItem>
                <Link href="/login">Logout</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <UserProfileDialog open={showUserProfile} onOpenChange={setShowUserProfile} />
    </header>
  )
}
