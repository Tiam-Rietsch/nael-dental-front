import React from 'react'
import { useSidebar } from '../ui/sidebar'
import { Button } from '../ui/button'
import { ChevronsLeft, ChevronsRight } from 'lucide-react'

export default function MedicalSidebarTrigger() {
  const { toggleSidebar, open } = useSidebar()

  return <Button onClick={toggleSidebar} className='z-10 h-20 w-20 flex items-center justify-center border border-bg-gray-400 rounded-full text-gray-500' variant={'outline'}>{open ? <ChevronsLeft /> : <ChevronsRight />}</Button>
}
