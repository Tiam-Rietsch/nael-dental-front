"use client"

import { useMemo, useRef, useEffect } from "react"
import type { AgendaEvent } from "@/lib/agenda/types"
import { getEventsForDate, processEvent, handleEventOverlaps, formatDate, isToday } from "@/lib/agenda/utils"
import { HourLines } from "./time-grid"
import { Timeline } from "./timeline"
import { EventCard } from "./event-card"

/**
 * Day View Props Interface
 */
interface DayViewProps {
  /** Current date to display */
  currentDate: Date
  /** Array of events to display */
  events: AgendaEvent[]
  /** Optional event click handler */
  onEventClick?: (event: AgendaEvent) => void
}

/**
 * Day View Component
 * Displays a single day agenda view with time slots
 * Shows events positioned according to their time and duration
 * Features synchronized scrolling between time grid and events grid
 */
export const DayView = ({ currentDate, events, onEventClick }: DayViewProps) => {
  // Refs for synchronized scrolling
  const timeScrollRef = useRef<HTMLDivElement>(null)
  const eventsScrollRef = useRef<HTMLDivElement>(null)

  // Process events for the current day
  const processedEvents = useMemo(() => {
    const dayEvents = getEventsForDate(events, currentDate)
    const processedDayEvents = dayEvents.map(
      (event) => processEvent(event, 0), // Single column for day view
    )

    // Handle overlapping events
    return handleEventOverlaps(processedDayEvents)
  }, [events, currentDate])

  // Synchronize scrolling between time grid and events grid
  useEffect(() => {
    const timeScroll = timeScrollRef.current
    const eventsScroll = eventsScrollRef.current

    if (!timeScroll || !eventsScroll) return

    const handleTimeScroll = () => {
      if (eventsScroll.scrollTop !== timeScroll.scrollTop) {
        eventsScroll.scrollTop = timeScroll.scrollTop
      }
    }

    const handleEventsScroll = () => {
      if (timeScroll.scrollTop !== eventsScroll.scrollTop) {
        timeScroll.scrollTop = eventsScroll.scrollTop
      }
    }

    timeScroll.addEventListener("scroll", handleTimeScroll)
    eventsScroll.addEventListener("scroll", handleEventsScroll)

    return () => {
      timeScroll.removeEventListener("scroll", handleTimeScroll)
      eventsScroll.removeEventListener("scroll", handleEventsScroll)
    }
  }, [])

  return (
    <div className="flex h-full bg-background overflow-hidden">
      {/* Time column - fixed width with synchronized scrolling */}
      <div className="flex flex-col w-16 flex-shrink-0">
        {/* Time header spacer - sticky */}
        <div className="h-12 border-r border-b border-border bg-muted/30 flex-shrink-0 z-20" />

        {/* Scrollable time grid */}
        <div ref={timeScrollRef} className="flex-1 overflow-y-auto overflow-x-hidden no-scrollbar">
          <div className="w-16 border-r border-border bg-muted/30">
            <div className="relative" style={{ height: "1440px" }}>
              {Array.from({ length: 24 }, (_, i) => i).map((hour) => (
                <div key={hour} className="relative">
                  {/* Hour slot */}
                  <div className="h-[60px] border-b-2 border-border flex items-start justify-end pr-2 pt-1">
                    <span className="text-xs text-muted-foreground font-medium">
                      {hour.toString().padStart(2, "0")}:00
                    </span>
                  </div>

                  {/* 30-minute line (except for the last hour) */}
                  {hour < 23 && <div className="absolute top-[30px] left-0 right-0 border-b border-border/30" />}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Day grid container */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Day header - sticky */}
        <div
          className={`
            h-12 border-b border-border bg-muted/30 flex flex-col items-center justify-center flex-shrink-0 z-10
            ${isToday(currentDate) ? "bg-primary/10" : ""}
          `}
        >
          <div className="text-xs text-muted-foreground font-medium">{formatDate(currentDate, "long")}</div>
          <div
            className={`
              text-sm font-semibold
              ${isToday(currentDate) ? "text-primary" : "text-foreground"}
            `}
          >
            {currentDate.getDate()}
          </div>
        </div>

        {/* Scrollable events grid */}
        <div ref={eventsScrollRef} className="flex-1 overflow-y-auto overflow-x-hidden no-scrollbar">
          <div className="relative" style={{ height: "1440px" }}>
            {/* Hour lines */}
            <HourLines />

            {/* Day column */}
            <div
              className={`
                h-full relative
                ${isToday(currentDate) ? "bg-primary/5" : ""}
              `}
            >
              {/* Events for this day */}
              {processedEvents.map((event) => (
                <EventCard key={event.id} event={event} view="day" onClick={() => onEventClick?.(event)} />
              ))}
            </div>

            {/* Current time indicator */}
            <Timeline />
          </div>
        </div>
      </div>
    </div>
  )
}
