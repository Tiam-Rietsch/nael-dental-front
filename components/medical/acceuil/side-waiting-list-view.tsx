import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Plus } from 'lucide-react'
import React from 'react'
import WaitingListItem from './waiting-list-item'

export default function SideWaitingListView() {
  return (
    <div className='h-full w-full px-4 flex bg-gray-50 flex-col space-y-1 border-l border-gray-400/40'>
      {/* header section for waiting list */}
      <div className='h-15 border-b border-gray-300/20 flex flex-row justify-between items-center'>
        <h3 className='text-xl font-bold'>Salle d'attente</h3>
        <Button className='text-white hover:bg-[#4b62bd]'>
          <Plus />
          <span>Ajouter</span>
        </Button>
      </div>


      {/* pending task list section */}
      <ScrollArea>
      <div className='relative h-[85vh] w-full pr-3 '>
        {/* meta data  */}
        <div className='sticky z-100 top-0 py-2 left-0 w-full flex flex-row justify-center border-b border-gray-300/40 pb-2  bg-gray-50/90'>
          <h4 className='text-[18px] font-semibold text-black/70 '>Liste des patients dans la salle d'attente</h4>
        </div>

        {/* task list container */}
        <div className='h-full flex flex-col items-start justify-start w-full space-y-4 pt-2'>
          <WaitingListItem />
          <WaitingListItem />
          <WaitingListItem />
          <WaitingListItem />
        </div>
      </div>
      </ScrollArea>

    </div>
  )
}
