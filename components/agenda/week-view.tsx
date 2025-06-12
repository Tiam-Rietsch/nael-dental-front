"use client"

import { useMemo, useRef, useEffect } from "react"
import type { AgendaEvent, ProcessedEvent } from "@/lib/agenda/types"
import {
  getWeekDates,
  getEventsForDate,
  processEvent,
  handleEventOverlaps,
  isToday,
  isSameDay,
} from "@/lib/agenda/utils"
import { HourLines } from "./time-grid"
import { Timeline } from "./timeline"
import { EventCard } from "./event-card"

/**
 * Week View Props Interface
 */
interface WeekViewProps {
  /** Current date to display week for */
  currentDate: Date
  /** Array of events to display */
  events: AgendaEvent[]
  /** Optional event click handler */
  onEventClick?: (event: AgendaEvent) => void
  /** Optional day click handler for navigation */
  onDayClick?: (date: Date) => void
}

/**
 * Week View Component
 * Displays a weekly agenda view with 7 days and time slots
 * Shows events positioned according to their time and duration
 * Features synchronized scrolling and day navigation
 */
export const WeekView = ({ currentDate, events, onEventClick, onDayClick }: WeekViewProps) => {
  // Refs for synchronized scrolling
  const timeScrollRef = useRef<HTMLDivElement>(null)
  const eventsScrollRef = useRef<HTMLDivElement>(null)

  // Get the dates for the current week
  const weekDates = useMemo(() => getWeekDates(currentDate), [currentDate])

  // Process events for the week with positioning
  const processedEvents = useMemo(() => {
    const weekEvents: ProcessedEvent[] = []

    // Process events for each day of the week
    weekDates.forEach((date, dayIndex) => {
      const dayEvents = getEventsForDate(events, date)
      const processedDayEvents = dayEvents.map((event) => processEvent(event, dayIndex))
      weekEvents.push(...processedDayEvents)
    })

    // Handle overlapping events
    return handleEventOverlaps(weekEvents)
  }, [events, weekDates])

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

  // Handle day header click
  const handleDayHeaderClick = (date: Date) => {
    onDayClick?.(date)
  }

  // Day names for headers
  const dayNames = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]

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

      {/* Days grid container */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Day headers - sticky and clickable */}
        <div className="grid grid-cols-7 border-b border-border bg-muted/30 h-12 flex-shrink-0 z-10">
          {weekDates.map((date, index) => (
            <div
              key={date.toISOString()}
              className={`
                border-r border-border last:border-r-0 flex flex-col items-center justify-center
                cursor-pointer hover:bg-muted/50 transition-colors
                ${isToday(date) ? "bg-primary/10" : ""}
                ${isSameDay(date, currentDate) ? "ring-2 ring-primary/30 ring-inset" : ""}
              `}
              onClick={() => handleDayHeaderClick(date)}
            >
              <div className="text-xs text-muted-foreground font-medium">{dayNames[index]}</div>
              <div
                className={`
                text-sm font-semibold
                ${isToday(date) ? "text-primary" : "text-foreground"}
                ${isSameDay(date, currentDate) ? "text-primary" : ""}
              `}
              >
                {date.getDate()}
              </div>
            </div>
          ))}
        </div>

        {/* Scrollable events grid */}
        <div ref={eventsScrollRef} className="flex-1 overflow-y-auto overflow-x-hidden no-scrollbar">
          <div className="relative" style={{ height: "1440px" }}>
            {/* Hour lines */}
            <HourLines />

            {/* Day columns */}
            <div className="grid grid-cols-7 h-full">
              {weekDates.map((date, dayIndex) => (
                <div
                  key={date.toISOString()}
                  className={`
                    border-r border-border last:border-r-0 relative
                    ${isToday(date) ? "bg-primary/5" : ""}
                    ${isSameDay(date, currentDate) ? "bg-primary/10" : ""}
                  `}
                >
                  {/* Events for this day */}
                  {processedEvents
                    .filter((event) => event.columnIndex === dayIndex)
                    .map((event) => (
                      <EventCard key={event.id} event={event} view="week" onClick={() => onEventClick?.(event)} />
                    ))}
                </div>
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
