"use client"

import { useState, useCallback } from "react"
import type { AgendaProps, AgendaView } from "@/lib/agenda/types"
import { AgendaHeader } from "./agenda-header"
import { WeekView } from "./week-view"
import { DayView } from "./day-view"
import { MonthView } from "./month-view"

/**
 * Main Agenda Component
 * Orchestrates all agenda views and manages global state
 * Provides a complete agenda interface with view switching and navigation
 * Features proper height management, scrolling behavior, and date persistence
 */
export const Agenda = ({
  events,
  initialView = "week",
  initialDate = new Date(),
  onEventClick,
  onViewChange,
  onDateChange,
}: AgendaProps) => {
  // State management for current view and date
  const [currentView, setCurrentView] = useState<AgendaView>(initialView)
  const [currentDate, setCurrentDate] = useState<Date>(initialDate)

  /**
   * Handle view change with optional callback
   */
  const handleViewChange = useCallback(
    (view: AgendaView) => {
      setCurrentView(view)
      onViewChange?.(view)
    },
    [onViewChange],
  )

  /**
   * Handle date change with optional callback
   */
  const handleDateChange = useCallback(
    (date: Date) => {
      setCurrentDate(date)
      onDateChange?.(date)
    },
    [onDateChange],
  )

  /**
   * Handle day click from month view - navigate to week view
   */
  const handleDayClickFromMonth = useCallback(
    (date: Date) => {
      setCurrentDate(date)
      setCurrentView("week")
      onDateChange?.(date)
      onViewChange?.(currentView)
    },
    [onDateChange, onViewChange, currentView],
  )

  /**
   * Handle day click from week view - navigate to day view
   */
  const handleDayClickFromWeek = useCallback(
    (date: Date) => {
      setCurrentDate(date)
      setCurrentView("day")
      onDateChange?.(date)
      onViewChange?.(currentView)
    },
    [onDateChange, onViewChange, currentView],
  )

  /**
   * Render the appropriate view component based on current view
   */
  const renderView = () => {
    const commonProps = {
      currentDate,
      events,
      onEventClick,
    }

    switch (currentView) {
      case "day":
        return <DayView {...commonProps} />
      case "week":
        return <WeekView {...commonProps} onDayClick={handleDayClickFromWeek} />
      case "month":
        return <MonthView {...commonProps} onDayClick={handleDayClickFromMonth} />
      default:
        return <WeekView {...commonProps} onDayClick={handleDayClickFromWeek} />
    }
  }

  return (
    <div className="h-full flex flex-col bg-background overflow-hidden">
      {/* Agenda header - always sticky at top */}
      <div className="flex-shrink-0">
        <AgendaHeader
          currentDate={currentDate}
          currentView={currentView}
          onDateChange={handleDateChange}
          onViewChange={handleViewChange}
        />
      </div>

      {/* Main agenda view - takes remaining height and handles internal scrolling */}
      <div className="flex-1 overflow-hidden">{renderView()}</div>
    </div>
  )
}

// Export all components and types for external use
export * from "@/lib/agenda/types"
export * from "@/lib/agenda/utils"
export { AgendaHeader } from "./agenda-header"
export { WeekView } from "./week-view"
export { DayView } from "./day-view"
export { MonthView } from "./month-view"
export { EventCard } from "./event-card"
export { TimeGrid, HourLines } from "./time-grid"
export { Timeline } from "./timeline"
