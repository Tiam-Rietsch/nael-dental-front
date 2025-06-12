"use client"

import { Agenda, type AgendaEvent } from "@/components/agenda/agenda"

/**
 * Example Agenda Usage
 * Demonstrates how to use the Agenda component with sample events
 */
export default function MedicalAgendaView() {
  // Sample events data with Notion Calendar-style colors
  const sampleEvents: AgendaEvent[] = [
    {
      id: "1",
      title: "Team Meeting",
      description: "Weekly team sync to discuss project progress and upcoming deadlines.",
      startDateTime: new Date(2024, 11, 16, 9, 0), // Today at 9:00 AM
      duration: 60, // 1 hour
      color: "#2563eb", // Blue
    },
    {
      id: "2",
      title: "Client Presentation",
      description: "Present the new design concepts to the client and gather feedback.",
      startDateTime: new Date(2024, 11, 16, 14, 30), // Today at 2:30 PM
      duration: 90, // 1.5 hours
      color: "#dc2626", // Red
    },
    {
      id: "3",
      title: "Code Review",
      description: "Review pull requests and discuss code quality improvements.",
      startDateTime: new Date(2024, 11, 17, 10, 0), // Tomorrow at 10:00 AM
      duration: 45, // 45 minutes
      color: "#059669", // Green
    },
    {
      id: "4",
      title: "Lunch Break",
      description: "Team lunch at the new restaurant downtown.",
      startDateTime: new Date(2024, 11, 17, 12, 0), // Tomorrow at 12:00 PM
      duration: 60, // 1 hour
      color: "#d97706", // Orange
    },
    {
      id: "5",
      title: "Design Workshop",
      description: "Collaborative design session for the upcoming product features.",
      startDateTime: new Date(2024, 11, 18, 15, 0), // Day after tomorrow at 3:00 PM
      duration: 120, // 2 hours
      color: "#7c3aed", // Purple
    },
    {
      id: "6",
      title: "Overlapping Meeting",
      description: "This meeting overlaps with the team meeting to test overlap handling.",
      startDateTime: new Date(2024, 11, 16, 9, 30), // Today at 9:30 AM (overlaps with Team Meeting)
      duration: 30, // 30 minutes
      color: "#be185d", // Pink
    },
    {
      id: "7",
      title: "Quick Standup",
      description: "Daily standup meeting with the development team.",
      startDateTime: new Date(2024, 12, 16, 8, 30), // Today at 8:30 AM
      duration: 15, // 15 minutes
      color: "#0891b2", // Cyan
    },
    {
      id: "8",
      title: "Project Planning",
      description: "Planning session for the next quarter's roadmap.",
      startDateTime: new Date(2024, 11, 17, 16, 0), // Tomorrow at 4:00 PM
      duration: 90, // 1.5 hours
      color: "#65a30d", // Lime
    },
  ]

  /**
   * Handle event click
   */
  const handleEventClick = (event: AgendaEvent) => {
    console.log("Event clicked:", event)
    // You can implement custom logic here, such as opening an edit modal
  }

  /**
   * Handle view change
   */
  const handleViewChange = (view: string) => {
    console.log("View changed to:", view)
  }

  /**
   * Handle date change
   */
  const handleDateChange = (date: Date) => {
    console.log("Date changed to:", date)
  }

  return (
    <div className="h-[93vh] w-full">
      <Agenda
        events={sampleEvents}
        initialView="week"
        initialDate={new Date()}
        onEventClick={handleEventClick}
        onViewChange={handleViewChange}
        onDateChange={handleDateChange}
      />
    </div>
  )
}
