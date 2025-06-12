"use client"

import type React from "react"

import { useMemo, useState } from "react"
import type { AgendaEvent } from "@/lib/agenda/types"
import { getMonthDates, getEventsForDate, formatDate, isToday } from "@/lib/agenda/utils"
import { EventCard } from "./event-card"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

/**
 * Month View Props Interface
 */
interface MonthViewProps {
  /** Current date to display month for */
  currentDate: Date
  /** Array of events to display */
  events: AgendaEvent[]
  /** Optional event click handler */
  onEventClick?: (event: AgendaEvent) => void
  /** Optional day click handler for navigation */
  onDayClick?: (date: Date) => void
}

/**
 * Month View Component
 * Displays a traditional monthly agenda grid
 * Shows events stacked vertically in each day cell
 * Includes "others" button when more than 5 events per day
 * Features proper scrolling behavior and day navigation
 */
export const MonthView = ({ currentDate, events, onEventClick, onDayClick }: MonthViewProps) => {
  // State for "others" modal
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [showOthersModal, setShowOthersModal] = useState(false)

  // Get all dates for the month grid (6 weeks)
  const monthDates = useMemo(() => getMonthDates(currentDate), [currentDate])

  // Group events by date
  const eventsByDate = useMemo(() => {
    const grouped = new Map<string, AgendaEvent[]>()

    monthDates.forEach((date) => {
      const dateKey = date.toDateString()
      const dayEvents = getEventsForDate(events, date)
      grouped.set(dateKey, dayEvents)
    })

    return grouped
  }, [events, monthDates])

  // Handle "others" button click
  const handleOthersClick = (date: Date, event: React.MouseEvent) => {
    event.stopPropagation() // Prevent day click
    setSelectedDate(date)
    setShowOthersModal(true)
  }

  // Handle day cell click
  const handleDayClick = (date: Date) => {
    onDayClick?.(date)
  }

  // Handle event click (prevent day navigation)
  const handleEventClick = (event: AgendaEvent, clickEvent: React.MouseEvent) => {
    clickEvent.stopPropagation() // Prevent day click
    onEventClick?.(event)
  }

  // Get events for selected date (for modal)
  const selectedDateEvents = selectedDate ? eventsByDate.get(selectedDate.toDateString()) || [] : []

  // Day names for headers
  const dayNames = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]

  // Check if date is in current month
  const isCurrentMonth = (date: Date) => {
    return date.getMonth() === currentDate.getMonth()
  }

  return (
    <>
      <div className="h-full bg-background flex flex-col overflow-hidden">
        {/* Day headers - sticky */}
        <div className="grid grid-cols-7 border-b border-border bg-muted/30 flex-shrink-0">
          {dayNames.map((day) => (
            <div key={day} className="h-10 border-r border-border last:border-r-0 flex items-center justify-center">
              <span className="text-sm font-medium text-muted-foreground">{day}</span>
            </div>
          ))}
        </div>

        {/* Scrollable calendar grid */}
        <div className="flex-1 overflow-y-auto">
          <div className="grid grid-cols-7" style={{ minHeight: "100%" }}>
            {monthDates.map((date, index) => {
              const dateKey = date.toDateString()
              const dayEvents = eventsByDate.get(dateKey) || []
              const visibleEvents = dayEvents.slice(0, 5) // Show max 5 events
              const hiddenEventsCount = Math.max(0, dayEvents.length - 5)

              return (
                <div
                  key={date.toISOString()}
                  className={`
                    border-r border-b border-border last:border-r-0 p-1 overflow-hidden
                    ${!isCurrentMonth(date) ? "bg-muted/20 text-muted-foreground" : ""}
                    ${isToday(date) ? "bg-primary/10" : ""}
                    min-h-[120px] flex flex-col cursor-pointer hover:bg-muted/30 transition-colors
                  `}
                  onClick={() => handleDayClick(date)}
                >
                  {/* Date number */}
                  <div className="flex items-center justify-between mb-1">
                    <span
                      className={`
                        text-sm font-medium
                        ${isToday(date) ? "text-primary font-bold" : ""}
                        ${!isCurrentMonth(date) ? "text-muted-foreground" : ""}
                      `}
                    >
                      {date.getDate()}
                    </span>
                  </div>

                  {/* Events */}
                  <div className="flex-1 space-y-1">
                    {visibleEvents.map((event) => (
                      <div key={event.id} onClick={(e) => handleEventClick(event, e)}>
                        <EventCard
                          event={{
                            ...event,
                            startDate: new Date(event.startDateTime),
                            endDate: new Date(new Date(event.startDateTime).getTime() + event.duration * 60000),
                            top: 0,
                            height: 20,
                            width: 100,
                            left: 0,
                            columnIndex: 0,
                          }}
                          view="month"
                          onClick={() => {}} // Handled by parent div
                          isCompact
                        />
                      </div>
                    ))}

                    {/* "Others" button */}
                    {hiddenEventsCount > 0 && (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-5 w-full text-xs text-muted-foreground hover:text-foreground p-0"
                        onClick={(e) => handleOthersClick(date, e)}
                      >
                        +{hiddenEventsCount} others
                      </Button>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Others Modal */}
      <Dialog open={showOthersModal} onOpenChange={setShowOthersModal}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Events for {selectedDate && formatDate(selectedDate, "long")}</DialogTitle>
          </DialogHeader>

          <div className="space-y-2 max-h-96 overflow-y-auto">
            {selectedDateEvents.map((event) => (
              <div
                key={event.id}
                className="p-3 rounded-lg border cursor-pointer hover:bg-muted/50 transition-colors"
                style={{ borderLeftColor: event.color, borderLeftWidth: "4px" }}
                onClick={() => {
                  onEventClick?.(event)
                  setShowOthersModal(false)
                }}
              >
                <div className="font-semibold">{event.title}</div>
                <div className="text-sm text-muted-foreground">
                  {formatDate(new Date(event.startDateTime), "time")} -{" "}
                  {formatDate(new Date(new Date(event.startDateTime).getTime() + event.duration * 60000), "time")}
                </div>
                {event.description && <div className="text-sm mt-1">{event.description}</div>}
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
