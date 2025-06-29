'use client'

import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Plus } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import WaitingListItem from './waiting-list-item'
import useAcceuilDialogs from '@/hooks/acceuil/useAcceuilDialogs'
import { WaitingPatient } from '@/lib/acceuil/types'
import waitingListApi from '@/lib/acceuil/waitingListApi'

export default function SideWaitingListView() {
  const { addWaitingPatientDialog } = useAcceuilDialogs()

  const [waitingPatients, setWaitingPatients] = useState<WaitingPatient[]>([])

  const loadWaitingList = async () => {
    await waitingListApi.getAll().then(setWaitingPatients)
  }

  useEffect(() => {
    loadWaitingList()
  }, [addWaitingPatientDialog.isOpen, addWaitingPatientDialog.closeDialog])


  return (
    <div className='h-full w-full px-4 flex bg-gray-50 flex-col space-y-1 border-l border-gray-400/40'>
      {/* header section for waiting list */}
      <div className='h-15 border-b border-gray-300/20 flex flex-row justify-between items-center'>
        <h3 className='text-3xl font-medium'>Salle d'attente</h3>
        <Button className='text-white hover:bg-[#4b62bd]' onClick={addWaitingPatientDialog.openDialog}  >
          <Plus />
          <span>Ajouter</span>
        </Button>
      </div>


      {/* pending task list section */}
      <ScrollArea>
      <div className='relative h-[85vh] w-full pr-3 '>
        {/* meta data  */}
        <div className='sticky z-10 top-0 py-2 left-0 w-full flex flex-row justify-center border-b border-gray-300/40 pb-2  bg-gray-50/90'>
          <h4 className='text-xl text-black/70 '>Liste des patients dans la salle d'attente</h4>
        </div>

        {/* task list container */}
        <div className='h-full flex flex-col items-start justify-start w-full space-y-4 pt-2'>
          {waitingPatients.map((waitingPatient) => (
            <WaitingListItem key={waitingPatient.id} waitingPatient={waitingPatient} />
          ))}

        </div>
      </div>
      </ScrollArea>

    </div>
  )
}
