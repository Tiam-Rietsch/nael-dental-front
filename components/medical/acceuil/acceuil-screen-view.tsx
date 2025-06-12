import React from 'react'
import SideTaskView from './side-task-view'
import MedicalAgendaView from '../medical-agenda-view'
import SideWaitingListView from './side-waiting-list-view'

export default function AcceuilScreenView() {
  return (
    <div className='flex flex-row items-start justify-start w-full h-full'>
      <div className='w-18/100 h-full'>
        <SideTaskView />
      </div>

      <div className='w-55/100 h-full'>
        <MedicalAgendaView />
      </div>

      <div className='w-27/100 h-full'>
        <SideWaitingListView />
      </div>
    </div>
  )
}
