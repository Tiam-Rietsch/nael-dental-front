"use client"

import { Dialog, DialogContent } from "@/components/ui/dialog"
import useAcceuilDialogs from "@/hooks/acceuil/useAcceuilDialogs"
import MedicalAgendaView from "../../medical-agenda-view"
import { DialogTitle } from "@radix-ui/react-dialog"

export function CalendarDialog() {
  const { calendarDialog } = useAcceuilDialogs()

  return (
    <Dialog open={calendarDialog.isOpen} onOpenChange={calendarDialog.setIsOpen}>
      <DialogContent className="w-90/100 min-w-[1280px]  h-[95vh] overflow-y-hidden">
        <DialogTitle>Agenda</DialogTitle>
        <MedicalAgendaView />
      </DialogContent>
    </Dialog>
  )
}
