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

export default function AcceuilScreenView() {

  return (
    <div className='relative flex flex-row items-start justify-start w-full h-full'>
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
