'use client'

import React from 'react'
import SideTaskView from './side-task-view'
import MedicalAgendaView from '../medical-agenda-view'
import SideWaitingListView from './side-waiting-list-view'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'

const LEFT_WIDTH = 19.3
const RIGHT_WIDTH = 23.44

export default function AcceuilScreenView() {
  return (
    <div 
      className="w-full h-full bg-orange-50 grid"
      style={{ 
        gridTemplateColumns: `${LEFT_WIDTH}vw 1fr ${RIGHT_WIDTH}vw`,
        gridTemplateRows: '1fr'
      }}
    >
      {/* Left Sidebar */}
      <div className="h-full z-10 overflow-hidden">
        <SideTaskView />
      </div>

      {/* Center Scrollable Calendar */}
      <div className="h-full relative z-0 overflow-hidden">
        <ScrollArea className="h-full w-full overflow-x-auto overflow-y-hidden">
          <div className="h-full" style={{ width: '1600px' }}>
            <MedicalAgendaView />
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>

      {/* Right Sidebar */}
      <div className="h-full z-10 overflow-hidden">
        <SideWaitingListView />
      </div>
    </div>
  )
}