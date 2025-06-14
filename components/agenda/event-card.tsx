"use client"

import type { ProcessedEvent } from "@/lib/agenda/types"
import { formatDate } from "@/lib/agenda/utils"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import useAcceuilDialogs from "@/hooks/acceuil/useAcceuilDialogs"

/**
 * Event Card Props Interface
 */
interface EventCardProps {
  /** The processed event data with positioning */
  event: ProcessedEvent
  /** View mode for different styling */
  view: "day" | "week" | "month"
  /** Optional click handler */
  onClick?: (event: ProcessedEvent) => void
  /** Whether this is a compact view (for month) */
  isCompact?: boolean
}

/**
 * Event Card Component
 * Renders a single agenda event with Notion Calendar-style design
 * Includes hover tooltip with full event details
 */
export const EventCard = ({ event, view, onClick, isCompact = false }: EventCardProps) => {
  const { appointmentDetailsDialog } = useAcceuilDialogs()

  // Handle event click
  const handleClick = () => {
    appointmentDetailsDialog.openDialog()
  }

  // Calculate text color based on background color brightness
  const getTextColor = (backgroundColor: string): string => {
    // Remove # if present
    const hex = backgroundColor.replace("#", "")

    // Convert to RGB
    const r = Number.parseInt(hex.substr(0, 2), 16)
    const g = Number.parseInt(hex.substr(2, 2), 16)
    const b = Number.parseInt(hex.substr(4, 2), 16)

    // Calculate brightness
    const brightness = (r * 299 + g * 587 + b * 114) / 1000

    // Return white for dark colors, black for light colors
    return brightness > 128 ? "#000000" : "#ffffff"
  }

  // Get lighter version of the color for background
  const getLighterColor = (color: string): string => {
    const hex = color.replace("#", "")
    const r = Number.parseInt(hex.substr(0, 2), 16)
    const g = Number.parseInt(hex.substr(2, 2), 16)
    const b = Number.parseInt(hex.substr(4, 2), 16)

    // Make it lighter by blending with white
    const lighten = (c: number) => Math.round(c + (255 - c) * 0.85)

    return `rgb(${lighten(r)}, ${lighten(g)}, ${lighten(b)})`
  }

  // Base styles for the event card (Notion Calendar style)
  const baseStyles = {
    backgroundColor: getLighterColor(event.color),
    borderLeftColor: event.color,
    color: getTextColor(event.color),
  }

  // Position styles for week/day views
  const positionStyles =
    view !== "month"
      ? {
          position: "absolute" as const,
          top: `${event.top}px`,
          height: `${Math.max(event.height, 24)}px`, // Minimum height of 24px for better visibility
          width: `${event.width}%`,
          left: `${event.left}%`,
        }
      : {}

  // Compact styles for month view
  const compactStyles = isCompact
    ? {
        height: "22px",
        fontSize: "11px",
      }
    : {}

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div
            className={`
              rounded-xs cursor-pointer border-l-4 shadow-sm
              transition-all duration-200 hover:shadow-md hover:scale-[1.02]
              flex items-start px-2 py-1 text-xs font-medium
              ${view === "month" ? "mb-1" : "min-h-[24px]"}
              ${isCompact ? "truncate" : ""}
              backdrop-blur-sm
            `}
            style={{
              ...baseStyles,
              ...positionStyles,
              ...compactStyles,
            }}
            onClick={handleClick}
          >
            {/* Color indicator dot for small events */}
            {!isCompact && event.height < 30 && (
              <div className="w-2 h-2 rounded-full mr-2 flex-shrink-0" style={{ backgroundColor: event.color }} />
            )}

            {/* Event content */}
            <div className="flex-1 truncate">
              <div className="font-semibold truncate text-gray-800">{event.title}</div>
              {!isCompact && event.height > 40 && (
                <div className="text-xs text-gray-600 truncate mt-0.5">
                  {formatDate(event.startDate, "time")} - {formatDate(event.endDate, "time")}
                </div>
              )}
            </div>

            {/* Duration indicator for longer events */}
            {!isCompact && event.height > 60 && (
              <div className="text-xs text-gray-500 ml-2 flex-shrink-0">{event.duration}m</div>
            )}
          </div>
        </TooltipTrigger>

        {/* Tooltip with full event details - white background */}
        {/* <TooltipContent side="top" className="max-w-xs bg-white border border-gray-200 text-gray-900 shadow-lg">
          <div className="space-y-2">
            <div className="font-semibold text-gray-900">{event.title}</div>
            <div className="text-sm text-gray-600">{formatDate(event.startDate, "long")}</div>
            <div className="text-sm text-gray-700">
              {formatDate(event.startDate, "time")} - {formatDate(event.endDate, "time")}
            </div>
            <div className="text-xs text-gray-500">Duration: {event.duration} minutes</div>
            {event.description && (
              <div className="text-sm text-gray-700 border-t border-gray-200 pt-2">{event.description}</div>
            )}
          </div>
        </TooltipContent> */}
      </Tooltip>
    </TooltipProvider>
  )
}
