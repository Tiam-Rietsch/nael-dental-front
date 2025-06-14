"use client"

import React, { useState } from 'react'
import SideTaskView from './side-task-view'
import MedicalAgendaView from '../medical-agenda-view'
import SideWaitingListView from './side-waiting-list-view'
import AddTaskDialog from './dialogs/add-task-dialog'
import AddWaitingPatientDialog from './dialogs/add-waiting-patient-dialog'
import { AppointmentDetailsDialog } from './dialogs/appointment-details-dialog'
import { AppointmentListDialog } from './dialogs/appointment-list-dialog'
import { MemoDialog } from './dialogs/memo-dialog'
import { ProgramAppointmentDialog } from './dialogs/program-appointment-dialog'
import { TaskDetailsDialog } from './dialogs/task-details-dialog'
import { TaskListDialog } from './dialogs/task-list-dialog'
import { ScrollArea } from '@radix-ui/react-scroll-area'
import { ScrollBar } from '@/components/ui/scroll-area'

export default function AcceuilScreenView() {

  return (
    <div className='relative flex flex-row items-start justify-start w-full h-full'>
      <div className='absolute top-0 left-0 w-18/100 h-full z-10'>
        <SideTaskView />
      </div>

      <ScrollArea className='absolute z-5 top-0 left-18/100 w-55/100 h-99/100 overflow-x-scroll overflow-y-hidden'>
        
        <div className='w-7xl h-full'>
          <MedicalAgendaView />
        </div>
        <ScrollBar orientation={"horizontal"} />
      </ScrollArea>


      <div className='absolute z-10 top-0 right-0 w-27/100 h-full'>
        <SideWaitingListView />
      </div>

    </div>
  )
}
