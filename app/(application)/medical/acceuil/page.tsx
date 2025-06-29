'use client'

import useAcceuilDialogs from '@/hooks/acceuil/useAcceuilDialogs'
import AcceuilScreenView from '@/components/medical/acceuil/acceuil-screen-view'
import { Button } from '@/components/ui/button'
import { Bell, ChevronDown, LogOut, NotebookText, Search, Settings, User } from 'lucide-react'
import React from 'react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { SidebarTrigger } from '@/components/ui/sidebar'

export default function page() {
  return (
    <div className='relative flex flex-col w-full h-full'>
      <TopStatusBar />
      <AcceuilScreenView />
    </div>
  )
}

function TopStatusBar() {
  const { memoDialog } = useAcceuilDialogs()

  return (
    <div className="z-50 sticky w-full px-6 h-[6vh] border-b border-gray-500/20 flex flex-row items-center justify-between bg-white">
      <div className='z-200 absolute left-0 top-1/2 -translate-y-1/2 mr-5'>
        <SidebarTrigger />
      </div>


      {/* Left section - Memo button */}
      <div className="flex items-center">
        <Button variant="ghost" className="cursor-pointer" onClick={memoDialog.openDialog}>
          <NotebookText className="w-4 h-4 mr-2" />
          <span className="text-md">Memo</span>
        </Button>
      </div>

      {/* Center section - Search bar */}
      <div className="flex-1 max-w-md mx-8">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input type="text" placeholder="Rechercher un patient" className="pl-10 w-full" />
        </div>
      </div>

      {/* Right section - Language, Profile, Notifications */}
      <div className="flex items-center space-x-2">
        {/* Language Selector */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex items-center space-x-2">
              <span>Français</span>
              <ChevronDown className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>
              Français
            </DropdownMenuItem>
            <DropdownMenuItem>
              English
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Profile Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex items-center space-x-2">
              <Avatar className="w-8 h-8">
                <AvatarImage src="/placeholder.svg?height=32&width=32" />
                <AvatarFallback className="bg-primary text-white">J</AvatarFallback>
              </Avatar>
              <span>Joe Dubois</span>
              <ChevronDown className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>Mon compte</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <User className="mr-2 h-4 w-4" />
              <span>Profil</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Settings className="mr-2 h-4 w-4" />
              <span>Paramètres</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-red-600">
              <LogOut className="mr-2 h-4 w-4" />
              <span>Déconnexion</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Notification Button */}
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="w-4 h-4" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-green-500 rounded-full"></span>
        </Button>
      </div>
    </div>
  )
}
