"use client"

import { Bandage, BookUser, Calendar, Files, FileUser, Home, icons, Layers, Lock, MessageSquareText, Settings, ShieldCheck, TestTube, Wallet } from 'lucide-react'

import React from 'react'
import { SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem, Sidebar } from '../ui/sidebar'
import { usePathname, useRouter } from 'next/navigation'
import MedicalSidebarTrigger from './medical-sidebar-trigger'

const items = [
  {
    title: "Page d'acceuil",
    url: '/medical/acceuil',
    icon: Home
  },
  {
    title: "Dossier patient",
    url: '/medical/patient',
    icon: BookUser
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

export default function MedicalSidebar() {
  const router = useRouter()
  const pathName = usePathname()

  return (
    <Sidebar collapsible='icon' className='relative h-full'>
      <div className='z-100 absolute left-full top-3 -translate-x-1/2'>
        <MedicalSidebarTrigger />
      </div>
      <SidebarContent className='py-4'>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild size={"medical"} isActive={pathName === item.url}>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
