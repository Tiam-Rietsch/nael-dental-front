"use client"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import MedicalSidebarTrigger  from "./medical-sidebar-trigger"
import { Bandage, BookUser, Calendar, CalendarPlus, Camera, Clock, FileUser, Home, Layers, Lock, MessageSquareText, PhoneCall, RotateCcw, Settings, ShieldCheck, TestTube, User, Wallet } from "lucide-react"
import { usePathname } from "next/navigation"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip"
import { Button } from "../ui/button"
import { Label } from "../ui/label"
const items = [
  {
    title: "Page d'acceuil",
    url: '/medical/acceuil',
    icon: Home
  },
  {
    title: "Dossier patient",
    url: '/medical/patient',
    icon: BookUser,
  }, 
  {
    title: "Agenda",
    url: '/medical/agenda',
    icon: Calendar
  }, 
  {
    title: "Ordonances",
    url: '/medical/ordonances',
    icon: FileUser
  }, 
  {
    title: "Documents Medicaux",
    url: '/medical/document_medicaux',
    icon: Layers
  }, 
  {
    title: "Laboratoire",
    url: '/medical/laboratoire',
    icon: TestTube
  }, 
  {
    title: "Connexion aux Assurances",
    url: '/medical/connexion_assurances',
    icon: ShieldCheck
  },
  {
    title: "Facturation/ Suivis de paiement",
    url: '/medical/facturation',
    icon: Wallet
  },
  {
    title: "Schema Dentaire",
    url: '/medical/schema_dentaire',
    icon: Bandage
  }, 
  {
    title: "Privacy",
    url: '/medical/privacy',
    icon: Lock
  },
  {
    title: "Gestion des consulations",
    url: '/medical/consultation',
    icon: MessageSquareText
  }, 
  {
    title: "Parametres",
    url: '/medical/parametres',
    icon: Settings
  }
]


const footerCards = [
  {
    icon: User,
    title: "Ajouter une nouveau patient",
    subtitle: "User Settings",
  },
  {
    icon: CalendarPlus,
    title: "Ajouter une rendez vous",
    subtitle: "Take Photo",
  },
  {
    icon: PhoneCall,
    title: "Fiche d'appel",
    subtitle: "Synchronize",
  },
  {
    icon: Clock,
    title: "Recherche des crenaux",
    subtitle: "Appointments",
  },
]

export default function MedicalSidebar() {
  const pathName = usePathname()
  const { state } = useSidebar()
  return (
    <Sidebar collapsible="icon" className="relative h-full overflow-visible">
      <TooltipProvider>
        <SidebarContent className="py-4">
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                {items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <SidebarMenuButton asChild size={"medical"} isActive={pathName.startsWith(item.url)}>
                          <a href={item.url}>
                            <item.icon />
                            <span>{item.title}</span>
                          </a>
                        </SidebarMenuButton>
                      </TooltipTrigger>
                      <TooltipContent side="right" className="ml-2">
                        <p className="text-md">{item.title}</p>
                      </TooltipContent>
                    </Tooltip>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </TooltipProvider>


       <SidebarFooter className="bg-transparent p-2 pb-10">
        {state === "collapsed" ? (
          footerCards.map((card, index) => (
            <Button
              key={index}
              className="bg-white/90 hover:bg-white transition-colors cursor-pointer p-3 flex items-center"
            >
              <div className="p-2 rounded-lg">
                <card.icon className="w-15 h-15 text-teal-700" />
              </div>
            </Button>
          ))
        ): (
          footerCards.map((card, index) => (
            <Button
              key={index}
              className="bg-white/90 hover:bg-white transition-colors cursor-pointer p-3 flex items-center justify-center space-x-1"
            >
              <div className="p-0">
                <card.icon className="w-5 h-5 text-teal-700" />
              </div>
              <div className="min-w-0">
                <p className="text-sm  text-teal-900 truncate">{card.title}</p>
              </div>
            </Button>
          ))
        )}

      </SidebarFooter>
    </Sidebar>
  )
}

