"use client";

import { useState } from "react";
import type { AgendaView } from "@/lib/agenda/types";
import { formatDate } from "@/lib/agenda/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  ChevronLeft,
  ChevronRight,
  CalendarIcon,
  Plus,
  List,
  Fullscreen
} from "lucide-react";
import { cn } from "@/lib/utils";
import useAcceuilDialogs from "@/hooks/acceuil/useAcceuilDialogs";
import { Switch } from "../ui/switch";
import { Label } from "../ui/label";

/**
 * Agenda Header Props Interface
 */
/**
 * Agenda Header Props Interface
 */
interface AgendaHeaderProps {
  /** Current date being displayed */
  currentDate: Date;
  /** Current view mode */
  currentView: AgendaView;
  /** Whether dual view is enabled */
  isDualView: boolean;
  /** Whether dual view toggle should be shown (only for day view with halls) */
  showDualViewToggle: boolean;
  /** Callback when date navigation occurs */
  onDateChange: (date: Date) => void;
  /** Callback when view changes */
  onViewChange: (view: AgendaView) => void;
  /** Callback when dual view changes */
  onDualViewChange: (isDualView: boolean) => void;
}

/**
 * Agenda Header Component
 * Provides navigation controls, date picker, and view switching buttons
 * Displays current date/period based on selected view
 */
export const AgendaHeader = ({
  currentDate,
  currentView,
  isDualView,
  showDualViewToggle,
  onDateChange,
  onViewChange,
  onDualViewChange,
}: AgendaHeaderProps) => {
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const { programAppointmentDialog, appointmentListDialog, calendarDialog } =
    useAcceuilDialogs();

  /**
   * Navigate to previous period based on current view
   */
  const navigatePrevious = () => {
    const newDate = new Date(currentDate);

    switch (currentView) {
      case "day":
        newDate.setDate(newDate.getDate() - 1);
        break;
      case "week":
        newDate.setDate(newDate.getDate() - 7);
        break;
      case "month":
        newDate.setMonth(newDate.getMonth() - 1);
        break;
    }

    onDateChange(newDate);
  };

  /**
   * Navigate to next period based on current view
   */
  const navigateNext = () => {
    const newDate = new Date(currentDate);

    switch (currentView) {
      case "day":
        newDate.setDate(newDate.getDate() + 1);
        break;
      case "week":
        newDate.setDate(newDate.getDate() + 7);
        break;
      case "month":
        newDate.setMonth(newDate.getMonth() + 1);
        break;
    }

    onDateChange(newDate);
  };

  /**
   * Navigate to today
   */
  const goToToday = () => {
    onDateChange(new Date());
  };

  /**
   * Handle date selection from calendar picker
   */
  const handleDateSelect = (date: Date | undefined) => {
    if (date) {
      onDateChange(date);
      setIsCalendarOpen(false);
    }
  };

  /**
   * Get display title based on current view and date
   */
  const getDisplayTitle = (): string => {
    switch (currentView) {
      case "day":
        return formatDate(currentDate, "long");
      case "week":
        // Show week range
        const weekStart = new Date(currentDate);
        const day = weekStart.getDay();
        const diff = weekStart.getDate() - day + (day === 0 ? -6 : 1);
        weekStart.setDate(diff);

        const weekEnd = new Date(weekStart);
        weekEnd.setDate(weekStart.getDate() + 6);

        if (weekStart.getMonth() === weekEnd.getMonth()) {
          return `${weekStart.getDate()} - ${weekEnd.getDate()} ${weekStart.toLocaleDateString(
            "en-US",
            { month: "long", year: "numeric" }
          )}`;
        } else {
          return `${formatDate(weekStart)} - ${formatDate(weekEnd)}`;
        }
      case "month":
        return currentDate.toLocaleDateString("en-US", {
          month: "long",
          year: "numeric",
        });
      default:
        return "";
    }
  };

  return (
    <div className="flex items-center justify-start space-x-5 p-4 border-b border-border bg-background">
      {/* Left section: Navigation and title */}

      {/* Middle section: Program appointment dialog buttons */}
      <div className="flex items-center space-x-2">
        {/* Program appointment dialog buttons */}
        <Button
          variant={"secondary"}
          onClick={calendarDialog.openDialog}
        >
          <Fullscreen />
        </Button>
        <Button onClick={programAppointmentDialog.openDialog}>
          <Plus />
          Ajouter un RDV
        </Button>
        <Button
          variant={"secondary"}
          onClick={appointmentListDialog.openDialog}
        >
          <List />
          Liste des RDV
        </Button>
      </div>

      {/* Right section: View controls */}
      <div className="flex items-center space-x-1 bg-muted rounded-lg p-1">
        {(["day", "week", "month"] as AgendaView[]).map((view) => (
          <Button
            key={view}
            variant={currentView === view ? "default" : "ghost"}
            size="sm"
            onClick={() => onViewChange(view)}
            className={`
              capitalize font-medium transition-all
              ${
                currentView === view
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }
            `}
          >
            {view === "day" ? "jour" : view === "week" ? "semaine" : "mois"}
          </Button>
        ))}
      </div>
      {/* Center section: Dual view toggle (only shown for day view with halls) */}
      {showDualViewToggle && currentView === "day" && (
        <div className="flex items-center space-x-2">
          <Label htmlFor="dual-view" className="text-sm font-medium">
            Vue partages
          </Label>
          <Switch
            id="dual-view"
            checked={isDualView}
            onCheckedChange={onDualViewChange}
          />
        </div>
      )}
      <div className="flex items-center space-x-4">
        {/* Today button */}
        <Button
          variant="outline"
          size="sm"
          onClick={goToToday}
          className="font-medium"
        >
          Aujourd'hui
        </Button>

        {/* Navigation arrows */}
        <div className="flex items-center space-x-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={navigatePrevious}
            className="h-8 w-8 p-0"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={navigateNext}
            className="h-8 w-8 p-0"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>

        {/* Current period title with calendar picker */}
        <div className="flex items-center space-x-2">
          {/* Calendar date picker */}
          <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className={cn(
                  "h-8 w-8 p-0 hover:bg-muted",
                  isCalendarOpen && "bg-muted"
                )}
              >
                <CalendarIcon className="h-4 w-4" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={currentDate}
                onSelect={handleDateSelect}
              />
            </PopoverContent>
          </Popover>
          <h2 className="text-xl text-foreground">
            {getDisplayTitle()}
          </h2>
        </div>
      </div>
    </div>
  );
};
