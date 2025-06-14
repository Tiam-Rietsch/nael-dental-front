"use client"

import { useMemo, useRef, useEffect } from "react"
import type { AgendaEvent, Hall, ProcessedEvent } from "@/lib/agenda/types"
import { getEventsForDate, processEvent, handleEventOverlaps, formatDate, isToday } from "@/lib/agenda/utils"
import { HourLines } from "./time-grid"
import { Timeline } from "./timeline"
import { EventCard } from "./event-card"

/**
 * Dual Day View Props Interface
 */
interface DualDayViewProps {
  /** Current date to display */
  currentDate: Date
  /** Array of events to display */
  events: AgendaEvent[]
  /** Array of halls to display */
  halls: Hall[]
  /** Optional event click handler */
  onEventClick?: (event: AgendaEvent) => void
}

/**
 * Dual Day View Component
 * Displays a day view split by halls instead of time
 * Shows events positioned according to their hall and time
 * Features synchronized scrolling between time grid and events grid
 */
export const DualDayView = ({ currentDate, events, halls, onEventClick }: DualDayViewProps) => {
  // Refs for synchronized scrolling
  const timeScrollRef = useRef<HTMLDivElement>(null)
  const eventsScrollRef = useRef<HTMLDivElement>(null)

  // Filter and process events for the current day, grouped by hall
  const processedEventsByHall = useMemo(() => {
    const dayEvents = getEventsForDate(events, currentDate)
    const eventsByHall = new Map<string, ProcessedEvent[]>()

    // Initialize halls
    halls.forEach((hall) => {
      eventsByHall.set(hall.id, [])
    })

    // Group events by hall
    dayEvents.forEach((event) => {
      if (event.salle && eventsByHall.has(event.salle)) {
        const hallEvents = eventsByHall.get(event.salle)!
        const hallIndex = halls.findIndex((h) => h.id === event.salle)
        const processedEvent = processEvent(event, hallIndex)
        hallEvents.push(processedEvent)
      }
    })

    // Handle overlapping events for each hall
    const result = new Map<string, ProcessedEvent[]>()
    eventsByHall.forEach((hallEvents, hallId) => {
      result.set(hallId, handleEventOverlaps(hallEvents))
    })

    return result
  }, [events, currentDate, halls])

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

      {/* Halls grid container */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Hall headers - sticky */}
        <div
          className={`grid border-b border-border h-12 flex-shrink-0 z-10`}
          style={{ gridTemplateColumns: `repeat(${halls.length}, 1fr)` }}
        >
          {halls.map((hall) => (
            <div
              key={hall.id}
              className="border-r border-border last:border-r-0 flex flex-col items-center justify-center"
              style={{ backgroundColor: hall.color }}
            >
              <div className="text-xs text-white font-medium opacity-90">{formatDate(currentDate, "long")}</div>
              <div className="text-sm font-semibold text-white">{hall.name}</div>
            </div>
          ))}
        </div>

        {/* Scrollable events grid */}
        <div ref={eventsScrollRef} className="flex-1 overflow-y-auto overflow-x-hidden no-scrollbar">
          <div className="relative" style={{ height: "1440px" }}>
            {/* Hour lines */}
            <HourLines />

            {/* Hall columns */}
            <div className={`grid h-full`} style={{ gridTemplateColumns: `repeat(${halls.length}, 1fr)` }}>
              {halls.map((hall, hallIndex) => {
                const hallEvents = processedEventsByHall.get(hall.id) || []
                return (
                  <div
                    key={hall.id}
                    className={`
                      border-r border-border last:border-r-0 relative
                      ${isToday(currentDate) ? "bg-primary/5" : ""}
                    `}
                  >
                    {/* Events for this hall */}
                    {hallEvents.map((event) => (
                      <EventCard key={event.id} event={event} view="day" onClick={() => onEventClick?.(event)} />
                    ))}
                  </div>
                )
              })}
            </div>

            {/* Current time indicator */}
            <Timeline />
          </div>
        </div>
      </div>
    </div>
  )
}
