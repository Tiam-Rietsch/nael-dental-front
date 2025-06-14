/**
 * Agenda Event Interface
 * Represents a single agenda event with all necessary properties
 */
export interface AgendaEvent {
  /** Unique identifier for the event */
  id: string
  /** Event title/name */
  title: string
  /** Detailed description of the event */
  description: string
  /** Start date and time as ISO string or Date object */
  startDateTime: Date | string
  /** Duration of the event in minutes */
  duration: number
  /** Hex color code for the event (e.g., "#ff0000") */
  color: string
  /** Hall/Room ID where the event takes place (optional for backward compatibility) */
  salle?: string
}

/**
 * Hall/Room Interface
 * Represents a hall or room where events can take place
 */
export interface Hall {
  /** Unique identifier for the hall */
  id: string
  /** Display name of the hall */
  name: string
  /** Background color for the hall header */
  color: string
}

/**
 * Agenda View Types
 * Defines the available agenda view modes
 */
export type AgendaView = "day" | "week" | "month"

/**
 * Processed Event Interface
 * Extended event interface with calculated positioning properties
 */
export interface ProcessedEvent extends AgendaEvent {
  /** Start date as Date object for calculations */
  startDate: Date
  /** End date calculated from start + duration */
  endDate: Date
  /** Top position in pixels for grid positioning */
  top: number
  /** Height in pixels based on duration */
  height: number
  /** Width percentage when events overlap */
  width: number
  /** Left offset percentage when events overlap */
  left: number
  /** Column index for week/day views */
  columnIndex: number
}

/**
 * Agenda Props Interface
 * Props for the main Agenda component
 */
export interface AgendaProps {
  /** Array of events to display */
  events: AgendaEvent[]
  /** Array of halls/rooms (optional, required for dual view) */
  halls?: Hall[]
  /** Initial view mode (defaults to 'week') */
  initialView?: AgendaView
  /** Initial date to display (defaults to today) */
  initialDate?: Date
  /** Initial dual view state (defaults to false) */
  initialDualView?: boolean
  /** Optional callback when an event is clicked */
  onEventClick?: (event: AgendaEvent) => void
  /** Optional callback when view changes */
  onViewChange?: (view: AgendaView) => void
  /** Optional callback when date changes */
  onDateChange?: (date: Date) => void
  /** Optional callback when dual view changes */
  onDualViewChange?: (isDualView: boolean) => void
}
