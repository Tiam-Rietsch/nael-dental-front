import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { WaitingPatient } from '@/lib/acceuil/types';
import { formatDateFrench } from '@/lib/utils';
import { Calendar, EllipsisVertical, MessageCircleMore, Star, Trash } from 'lucide-react'
import React from 'react'


interface WaitingListItemProps {
  waitingPatient: WaitingPatient;
}

export default function WaitingListItem({ waitingPatient }: WaitingListItemProps) {
  return (
    <div className='bg-white w-full h-[280px] rounded-md flex flex-col border border-gray-300/60'>
      {/* first section image and details */}
      <div className='w-full h-45/100 border-b border-gray-200/60 p-2 flex flex-row'>
        <div className='w-30/100 pr-6'>
          <div className='w-full aspect-square rounded-md bg-gray-200'>

          </div>
        </div>
        <div className='w-60/100 flex flex-col items-start space-y-2 justify-start'>
          <span className='text-xl font-bold'>{waitingPatient.patient.nom} {waitingPatient.patient.prenom}</span>
          <span className='text-gray-400 text-[14px] flex flex-row items-center gap-3 text-nowrap'><Calendar size={14} />{formatDateFrench(waitingPatient.date_created.toString())}</span>
          <div className='flex flex-row items-start justify-start space-x-2'>
            <Button className='h-8 w-8 rounded-md bg-orange-200/80 hover:bg-orange-300 text-orange-600 flex items-center justify-center'><Star size={20} /></Button>
            <Button className='h-8 w-8 rounded-md bg-green-200/80 text-green-600 hover:bg-green-300 flex items-center justify-center'><MessageCircleMore /></Button>
            <Button className='h-8 w-8 rounded-md bg-red-200/80 text-red-600 hover:bg-red-300 flex items-center justify-center'><Trash /></Button>
          </div>
        </div>
        <div className='w-20/100 relative'>
          <Badge className='absolute top-0 right-0 bg-green-200 text-green-600'>En attente</Badge>

          <Button className='absolute right-0 bottom-0 p-2! w-fit rounded-full hover:bg-blue-600/10 cursor-pointer' variant={'ghost'}><EllipsisVertical /></Button>
        </div>
      </div>

      {/* second section for description text */}
      <div className='w-full h-30/100 border-b border-gray-200/60 p-2 text-[14px] overflow-hidden'>
        {waitingPatient.motif}
      </div>


      {/* 3rd section footer */}
      <div className='w-full h-20/100 grid grid-cols-2'>
        <div className='flex flex-col items-start justify-start p-2 space-y-1 border-r border-gray-300'>
          <span className='text-[14px] font-semibold'>Etat financier</span>
          <div className='flex space-x-2'>
            <Badge className='bg-green-200 text-green-600'>50 0000 XAF</Badge>
            <Badge className='bg-red-200 text-red-600'>120 000 XAF</Badge>
          </div>
        </div>
        <div className='flex flex-col items-start justify-start space-y-1 p-2'>
          <span className='text-[14px] font-semibold'>Etat du rendez-vous</span>
          <div className='flex space-x-2'>
            <Badge className='bg-green-200 text-green-600'>Confirme</Badge>
            <Badge className='bg-blue-200 text-blue-800'>Premiere visite</Badge>
          </div>
        </div>
      </div>
    </div>
  )
}
