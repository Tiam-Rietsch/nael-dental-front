
import AddTaskDialog from "@/components/medical/acceuil/dialogs/add-task-dialog";
import AddWaitingPatientDialog from "@/components/medical/acceuil/dialogs/add-waiting-patient-dialog";
import { AppointmentDetailsDialog } from "@/components/medical/acceuil/dialogs/appointment-details-dialog";
import { AppointmentListDialog } from "@/components/medical/acceuil/dialogs/appointment-list-dialog";
import { CalendarDialog } from "@/components/medical/acceuil/dialogs/calendar-dialog";
import { MemoDialog } from "@/components/medical/acceuil/dialogs/memo-dialog";
import { ProgramAppointmentDialog } from "@/components/medical/acceuil/dialogs/program-appointment-dialog";
import { ReprogramAppointmentDialog } from "@/components/medical/acceuil/dialogs/reprogram-appointment-dialog";
import { TaskDetailsDialog } from "@/components/medical/acceuil/dialogs/task-details-dialog";
import { TaskListDialog } from "@/components/medical/acceuil/dialogs/task-list-dialog";


import MedicalSidebar from "@/components/medical/medical-sidebar";
import { SidebarProvider} from "@/components/ui/sidebar";
import { AuthProvider } from "@/hooks/auth/useAuthContext";
import { cookies } from "next/headers";
import React from "react";

interface SidebarLayoutProps {
  children: React.ReactNode;
}

export default async function SidebarLayout({ children }: SidebarLayoutProps) {
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get("sidebar_state")?.value === "true";

  return (
    <AuthProvider>
      <SidebarProvider defaultOpen={defaultOpen}>
        <MedicalSidebar />
        <main className="w-full">
          {children}

          {/* medical acceuil dialogs */}
          <CalendarDialog />
          <AddTaskDialog />
          <AddWaitingPatientDialog />
          <ProgramAppointmentDialog />
          <AppointmentDetailsDialog />
          <AppointmentListDialog />
          <MemoDialog />
          <ProgramAppointmentDialog />
          <TaskDetailsDialog />
          <TaskListDialog />
          <ReprogramAppointmentDialog />
        </main>
      </SidebarProvider>
    </AuthProvider>
  );
}
