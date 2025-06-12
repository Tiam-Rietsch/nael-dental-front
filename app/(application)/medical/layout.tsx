import MedicalSidebar from '@/components/medical/medical-sidebar';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { cookies } from 'next/headers';
import React from 'react'



interface SidebarLayoutProps {
  children: React.ReactNode;
}

export default async function SidebarLayout({ children }: SidebarLayoutProps) {

  const cookieStore = await cookies()
  const  defaultOpen = cookieStore.get("sidebar_state")?.value === "true"

  return (
    <SidebarProvider defaultOpen={defaultOpen}>
      <MedicalSidebar />
      <main className='w-full'>
          {children}
      </main>
    </SidebarProvider>
  )
}
