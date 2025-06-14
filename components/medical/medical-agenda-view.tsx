"use client";

import { Agenda } from "@/components/agenda/agenda";
import { type Hall, type AgendaEvent } from "@/lib/agenda/types";

/**
 * Example Agenda Usage
 * Demonstrates how to use the Agenda component with sample events
 */
export default function MedicalAgendaView() {
  // Sample halls data
  const sampleHalls: Hall[] = [
    {
      id: "hall1",
      name: "Conference Room A",
      color: "#3b82f6", // Blue
    },
    {
      id: "hall2",
      name: "Meeting Room B",
      color: "#ef4444", // Red
    },
    {
      id: "hall3",
      name: "Training Room C",
      color: "#10b981", // Green
    },
    {
      id: "hall4",
      name: "Boardroom D",
      color: "#f59e0b", // Orange
    },
  ];

  // Sample events data with halls assigned
  const sampleEvents: AgendaEvent[] = [
    {
      id: "1",
      title: "Team Meeting",
      description:
        "Weekly team sync to discuss project progress and upcoming deadlines.",
      startDateTime: new Date(2025, 5, 12, 9, 0), // Today at 9:00 AM
      duration: 60, // 1 hour
      color: "#2563eb", // Blue
      salle: "hall1", // Conference Room A
    },
    {
      id: "2",
      title: "Client Presentation",
      description:
        "Present the new design concepts to the client and gather feedback.",
      startDateTime: new Date(2025, 5, 12, 14, 30), // Today at 2:30 PM
      duration: 90, // 1.5 hours
      color: "#dc2626", // Red
      salle: "hall2", // Meeting Room B
    },
    {
      id: "3",
      title: "Code Review",
      description:
        "Review pull requests and discuss code quality improvements.",
      startDateTime: new Date(2025, 5, 13, 10, 0), // Tomorrow at 10:00 AM
      duration: 45, // 45 minutes
      color: "#059669", // Green
      salle: "hall3", // Training Room C
    },
    {
      id: "4",
      title: "Lunch Break",
      description: "Team lunch at the new restaurant downtown.",
      startDateTime: new Date(2025, 5, 13, 12, 0), // Tomorrow at 12:00 PM
      duration: 60, // 1 hour
      color: "#d97706", // Orange
      salle: "hall4", // Boardroom D
    },
    {
      id: "5",
      title: "Design Workshop",
      description:
        "Collaborative design session for the upcoming product features.",
      startDateTime: new Date(2025, 5, 14, 15, 0), // Day after tomorrow at 3:00 PM
      duration: 120, // 2 hours
      color: "#7c3aed", // Purple
      salle: "hall1", // Conference Room A
    },
    {
      id: "6",
      title: "Overlapping Meeting",
      description:
        "This meeting overlaps with the team meeting to test overlap handling.",
      startDateTime: new Date(2025, 5, 12, 9, 30), // Today at 9:30 AM (overlaps with Team Meeting)
      duration: 30, // 30 minutes
      color: "#be185d", // Pink
      salle: "hall2", // Conference Room A (same hall as Team Meeting)
    },
    {
      id: "7",
      title: "Quick Standup",
      description: "Daily standup meeting with the development team.",
      startDateTime: new Date(2025, 5, 12, 8, 30), // Today at 8:30 AM
      duration: 15, // 15 minutes
      color: "#0891b2", // Cyan
      salle: "hall2", // Meeting Room B
    },
    {
      id: "8",
      title: "Project Planning",
      description: "Planning session for the next quarter's roadmap.",
      startDateTime: new Date(2025, 5, 13, 16, 0), // Tomorrow at 4:00 PM
      duration: 90, // 1.5 hours
      color: "#65a30d", // Lime
      salle: "hall3", // Training Room C
    },
    {
      id: "9",
      title: "Hall 4 Event",
      description: "Event specifically for testing hall 4.",
      startDateTime: new Date(2025, 5, 12, 11, 0), // Today at 11:00 AM
      duration: 60, // 1 hour
      color: "#f59e0b", // Orange
      salle: "hall4", // Boardroom D
    },
  ];

  /**
   * Handle event click
   */
  const handleEventClick = (event: AgendaEvent) => {
    console.log("Event clicked:", event);
    // You can implement custom logic here, such as opening an edit modal
  };

  /**
   * Handle view change
   */
  const handleViewChange = (view: string) => {
    console.log("View changed to:", view);
  };

  /**
   * Handle date change
   */
  const handleDateChange = (date: Date) => {
    console.log("Date changed to:", date);
  };

  /**
   * Handle dual view change
   */
  const handleDualViewChange = (isDualView: boolean) => {
    console.log("Dual view changed to:", isDualView);
  };

  return (
    <div className="h-[93vh] w-full">
      <Agenda
        events={sampleEvents}
        halls={sampleHalls}
        initialView="week"
        initialDate={new Date()}
        initialDualView={false}
        onEventClick={handleEventClick}
        onViewChange={handleViewChange}
        onDateChange={handleDateChange}
        onDualViewChange={handleDualViewChange}
      />
    </div>
  );
}
