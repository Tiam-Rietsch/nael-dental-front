"use client"

import { useEffect, useState } from "react"
import { getCurrentTimeMinutes } from "@/lib/agenda/utils"

/**
 * Timeline Component
 * Displays a horizontal line indicating the current time on the agenda
 * Updates every minute to stay accurate
 */
export const Timeline = () => {
  // State to track current time in minutes from midnight
  const [currentMinutes, setCurrentMinutes] = useState(getCurrentTimeMinutes())

  // Update timeline every minute
  useEffect(() => {
    const updateTimeline = () => {
      setCurrentMinutes(getCurrentTimeMinutes())
    }

    // Update immediately
    updateTimeline()

    // Set up interval to update every minute
    const interval = setInterval(updateTimeline, 60000)

    // Cleanup interval on unmount
    return () => clearInterval(interval)
  }, [])

  // Calculate position (1px per minute)
  const topPosition = currentMinutes

  return (
    <div className="absolute left-0 right-0 z-20 pointer-events-none" style={{ top: `${topPosition}px` }}>
      {/* Timeline dot */}
      <div className="absolute -translate-y-1/2 -left-1 w-3 h-3 bg-primary rounded-full border-2 border-background" />

      {/* Timeline line */}
      <div className="h-0.5 bg-primary ml-2" />

      {/* Current time label */}
      <div className="absolute -top-2 left-4 text-xs font-medium text-primary bg-background px-1 rounded">
        {new Date().toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        })}
      </div>
    </div>
  )
}
