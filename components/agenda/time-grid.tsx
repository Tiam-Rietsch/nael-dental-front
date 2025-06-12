"use client"

/**
 * Time Grid Component
 * Renders the time slots (hours) column for week and day views
 * Shows hours from 00:00 to 23:00 with 30-minute intervals
 */
export const TimeGrid = () => {
  // Generate array of hours (0-23)
  const hours = Array.from({ length: 24 }, (_, i) => i)

  return (
    <div className="w-16 border-r border-border bg-muted/30 flex-shrink-0">
      {/* Header spacer to align with day headers */}
      <div className="h-12 border-b border-border" />

      {/* Time slots */}
      <div className="relative">
        {hours.map((hour) => (
          <div key={hour} className="relative">
            {/* Hour slot */}
            <div className="h-[60px] border-b-2 border-border flex items-start justify-end pr-2 pt-1">
              <span className="text-xs text-muted-foreground font-medium">{hour.toString().padStart(2, "0")}:00</span>
            </div>

            {/* 30-minute line (except for the last hour) */}
            {hour < 23 && <div className="absolute top-[30px] left-0 right-0 border-b border-border/30" />}
          </div>
        ))}
      </div>
    </div>
  )
}

/**
 * Hour Lines Component
 * Renders horizontal lines for each hour and 30-minute intervals in the event grid
 * Provides visual separation between time slots
 */
export const HourLines = () => {
  // Generate array of hours (0-23)
  const hours = Array.from({ length: 24 }, (_, i) => i)

  return (
    <div className="absolute inset-0 pointer-events-none no-scrollbar">
      {hours.map((hour) => (
        <div key={hour}>
          {/* Hour line (thicker) */}
          <div className="absolute left-0 right-0 border-b-1 border-border" style={{ top: `${hour * 60}px` }} />

          {/* 30-minute line (lighter, except for the last hour) */}
          {hour < 23 && (
            <div className="absolute left-0 right-0 border-b border-border/40" style={{ top: `${hour * 60 + 30}px` }} />
          )}
        </div>
      ))}
    </div>
  )
}
