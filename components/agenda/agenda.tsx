"use client"

import { useState, useCallback } from "react"
import type { AgendaProps, AgendaView } from "@/lib/agenda/types"
import { AgendaHeader } from "./agenda-header"
import { WeekView } from "./week-view"
import { DayView } from "./day-view"
import { MonthView } from "./month-view"
import { DualDayView } from "./dual-day-view"

/**
 * Main Agenda Component
 * Orchestrates all agenda views and manages global state
 * Provides a complete agenda interface with view switching and navigation
 * Features proper height management, scrolling behavior, and date persistence
 */
export const Agenda = ({
  events,
  halls = [],
  initialView = "week",
  initialDate = new Date(),
  initialDualView = false,
  onEventClick,
  onViewChange,
  onDateChange,
  onDualViewChange,
}: AgendaProps) => {
  // State management for current view and date
  const [currentView, setCurrentView] = useState<AgendaView>(initialView)
  const [currentDate, setCurrentDate] = useState<Date>(initialDate)
  const [isDualView, setIsDualView] = useState<boolean>(initialDualView)

  /**
   * Handle view change with optional callback
   */
  const handleViewChange = useCallback(
    (view: AgendaView) => {
      setCurrentView(view)
      // Reset dual view when switching away from day view
      if (view !== "day" && isDualView) {
        setIsDualView(false)
        onDualViewChange?.(false)
      }
      onViewChange?.(view)
    },
    [onViewChange, isDualView, onDualViewChange],
  )


    /**
   * Handle dual view change with optional callback
   */
    const handleDualViewChange = useCallback(
      (dualView: boolean) => {
        setIsDualView(dualView)
        onDualViewChange?.(dualView)
      },
      [onDualViewChange],
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
  /**
   * Check if dual view toggle should be shown
   */
  const showDualViewToggle = halls.length > 0

  /**
   * Render the appropriate view component based on current view and dual view state
   */
  const renderView = () => {
    const commonProps = {
      currentDate,
      events,
      onEventClick,
    }

    switch (currentView) {
      case "day":
        if (isDualView && halls.length > 0) {
          return <DualDayView {...commonProps} halls={halls} />
        }
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
    <div className="relative h-full flex flex-col bg-background overflow-hidden">
      {/* Agenda header - always sticky at top */}
      <div className="sticky top-0 flex-shrink-0 z-40 left-0 w-full">
        <AgendaHeader
            currentDate={currentDate}
            currentView={currentView}
            isDualView={isDualView}
            showDualViewToggle={showDualViewToggle}
            onDateChange={handleDateChange}
            onViewChange={handleViewChange}
            onDualViewChange={handleDualViewChange}
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
