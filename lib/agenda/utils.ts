import type { AgendaEvent, ProcessedEvent } from "./types"

/**
 * Date Utility Functions
 * Collection of helper functions for date manipulation and formatting
 */

/**
 * Formats a date to a readable string
 * @param date - Date to format
 * @param format - Format type ('short', 'long', 'time')
 * @returns Formatted date string
 */
export const formatDate = (date: Date, format: "short" | "long" | "time" = "short"): string => {
  switch (format) {
    case "long":
      return date.toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    case "time":
      return date.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      })
    default:
      return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      })
  }
}

/**
 * Gets the start of the week for a given date
 * @param date - Reference date
 * @returns Date object representing start of week (Monday)
 */
export const getWeekStart = (date: Date): Date => {
  const d = new Date(date)
  const day = d.getDay()
  const diff = d.getDate() - day + (day === 0 ? -6 : 1) // Adjust for Monday start
  return new Date(d.setDate(diff))
}

/**
 * Gets the start of the month for a given date
 * @param date - Reference date
 * @returns Date object representing start of month
 */
export const getMonthStart = (date: Date): Date => {
  return new Date(date.getFullYear(), date.getMonth(), 1)
}

/**
 * Gets the end of the month for a given date
 * @param date - Reference date
 * @returns Date object representing end of month
 */
export const getMonthEnd = (date: Date): Date => {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0)
}

/**
 * Generates an array of dates for a week starting from the given date
 * @param startDate - Start date of the week
 * @returns Array of 7 Date objects representing the week
 */
export const getWeekDates = (startDate: Date): Date[] => {
  const dates: Date[] = []
  for (let i = 0; i < 7; i++) {
    const date = new Date(startDate)
    date.setDate(startDate.getDate() + i)
    dates.push(date)
  }
  return dates
}

/**
 * Generates an array of dates for a month grid (including padding days)
 * @param date - Reference date within the month
 * @returns Array of Date objects for the month grid (42 days)
 */
export const getMonthDates = (date: Date): Date[] => {
  const monthStart = getMonthStart(date)
  const monthEnd = getMonthEnd(date)
  const startDate = getWeekStart(monthStart)

  const dates: Date[] = []
  const current = new Date(startDate)

  // Generate 6 weeks (42 days) to fill the month grid
  for (let i = 0; i < 42; i++) {
    dates.push(new Date(current))
    current.setDate(current.getDate() + 1)
  }

  return dates
}

/**
 * Checks if two dates are on the same day
 * @param date1 - First date
 * @param date2 - Second date
 * @returns Boolean indicating if dates are on same day
 */
export const isSameDay = (date1: Date, date2: Date): boolean => {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  )
}

/**
 * Checks if a date is today
 * @param date - Date to check
 * @returns Boolean indicating if date is today
 */
export const isToday = (date: Date): boolean => {
  return isSameDay(date, new Date())
}

/**
 * Event Processing Functions
 * Functions for processing and positioning agenda events
 */

/**
 * Converts AgendaEvent to ProcessedEvent with positioning data
 * @param event - Raw agenda event
 * @param columnIndex - Column index for positioning
 * @returns ProcessedEvent with calculated positions
 */
export const processEvent = (event: AgendaEvent, columnIndex = 0): ProcessedEvent => {
  const startDate = new Date(event.startDateTime)
  const endDate = new Date(startDate.getTime() + event.duration * 60000) // Convert minutes to milliseconds

  // Calculate position based on time (each hour = 60px, so each minute = 1px)
  const startMinutes = startDate.getHours() * 60 + startDate.getMinutes()
  const top = startMinutes // 1px per minute
  const height = event.duration // 1px per minute

  return {
    ...event,
    startDate,
    endDate,
    top,
    height,
    width: 100, // Will be adjusted for overlapping events
    left: 0, // Will be adjusted for overlapping events
    columnIndex,
  }
}

/**
 * Processes overlapping events and adjusts their width and position
 * @param events - Array of processed events
 * @returns Array of events with adjusted positioning for overlaps
 */
export const handleEventOverlaps = (events: ProcessedEvent[]): ProcessedEvent[] => {
  // Group events by day
  const eventsByDay = new Map<string, ProcessedEvent[]>()

  events.forEach((event) => {
    const dayKey = event.startDate.toDateString()
    if (!eventsByDay.has(dayKey)) {
      eventsByDay.set(dayKey, [])
    }
    eventsByDay.get(dayKey)!.push(event)
  })

  // Process each day's events for overlaps
  const processedEvents: ProcessedEvent[] = []

  eventsByDay.forEach((dayEvents) => {
    // Sort events by start time
    dayEvents.sort((a, b) => a.startDate.getTime() - b.startDate.getTime())

    // Find overlapping groups
    const overlapGroups: ProcessedEvent[][] = []

    dayEvents.forEach((event) => {
      // Find which group this event belongs to (if any)
      let addedToGroup = false

      for (const group of overlapGroups) {
        // Check if this event overlaps with any event in the group
        const overlaps = group.some((groupEvent) => eventsOverlap(event, groupEvent))

        if (overlaps) {
          group.push(event)
          addedToGroup = true
          break
        }
      }

      // If not added to any group, create a new group
      if (!addedToGroup) {
        overlapGroups.push([event])
      }
    })

    // Adjust positioning for each group
    overlapGroups.forEach((group) => {
      const groupSize = group.length
      group.forEach((event, index) => {
        event.width = 100 / groupSize // Divide width equally
        event.left = (100 / groupSize) * index // Position side by side
      })
    })

    processedEvents.push(...dayEvents)
  })

  return processedEvents
}

/**
 * Checks if two events overlap in time
 * @param event1 - First event
 * @param event2 - Second event
 * @returns Boolean indicating if events overlap
 */
export const eventsOverlap = (event1: ProcessedEvent, event2: ProcessedEvent): boolean => {
  return event1.startDate < event2.endDate && event2.startDate < event1.endDate
}

/**
 * Filters events for a specific date
 * @param events - Array of events
 * @param date - Target date
 * @returns Array of events occurring on the specified date
 */
export const getEventsForDate = (events: AgendaEvent[], date: Date): AgendaEvent[] => {
  return events.filter((event) => {
    const eventDate = new Date(event.startDateTime)
    return isSameDay(eventDate, date)
  })
}

/**
 * Gets the current time as minutes from midnight
 * @returns Number of minutes since midnight
 */
export const getCurrentTimeMinutes = (): number => {
  const now = new Date()
  return now.getHours() * 60 + now.getMinutes()
}
