import React from 'react'
import { useSidebar } from '../ui/sidebar'
import { Button } from '../ui/button'
import { ChevronsLeft, ChevronsRight } from 'lucide-react'

export default function MedicalSidebarTrigger() {
  const { toggleSidebar, open } = useSidebar()

  return <Button onClick={toggleSidebar} className='h-7 w-7 flex items-center justify-center border border-bg-gray-400 rounded-full text-gray-500' variant={'outline'}>{open ? <ChevronsLeft /> : <ChevronsRight />}</Button>
}
