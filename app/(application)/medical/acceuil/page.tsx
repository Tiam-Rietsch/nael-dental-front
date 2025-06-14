'use client'

import useAcceuilDialogs from '@/hooks/acceuil/useAcceuilDialogs'
import AcceuilScreenView from '@/components/medical/acceuil/acceuil-screen-view'
import MedicalAgendaView from '@/components/medical/medical-agenda-view'
import { Button } from '@/components/ui/button'
import { NotebookText } from 'lucide-react'
import React from 'react'

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
    <div className='z-50 sticky w-full px-6 h-15 border-b border-gray-500/20 flex flex-row items-center justify-start'>
      <Button variant={"ghost"} className='cursor-pointer' onClick={memoDialog.openDialog}>
        <NotebookText />
        <span className='text-md'>Memo</span>
      </Button>
    </div>
  )
}
