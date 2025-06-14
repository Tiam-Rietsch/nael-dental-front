"use client"
import { CalendarIcon, Clock, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { fr } from "date-fns/locale"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import useAcceuilDialogs from "@/hooks/acceuil/useAcceuilDialogs"

// Zod schema for reprogram appointment form validation
const reprogramSchema = z.object({
  nouvelleDate: z.date({
    required_error: "La nouvelle date est requise",
  }),
  heureDebut: z.string().min(1, "L'heure de début est requise"),
  heureFin: z.string().min(1, "L'heure de fin est requise"),
  motifReport: z.string().min(1, "Le motif du report est requis"),
})

type ReprogramFormData = z.infer<typeof reprogramSchema>

interface ReprogramAppointmentDialogProps {
  open: boolean
  setOpen: (open: boolean) => void
}

function ReprogramAppointmentForm({
  onSubmit,
  onCancel,
}: { onSubmit: (data: ReprogramFormData) => void; onCancel: () => void }) {
  const form = useForm<ReprogramFormData>({
    resolver: zodResolver(reprogramSchema),
    defaultValues: {
      heureDebut: "",
      heureFin: "",
      motifReport: "",
    },
  })

  const handleFormSubmit = (data: ReprogramFormData) => {
    console.log("Reprogram data:", data)
    onSubmit(data)
  }

  return (
    <div className="space-y-6">
      {/* Header with Back Button */}
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="sm" onClick={onCancel} className="flex items-center gap-2">
          <ArrowLeft className="h-4 w-4" />
          Retour
        </Button>
      </div>

      {/* Title */}
      <DialogTitle className="text-2xl font-semibold text-gray-800">Reprogrammer le rendez-vous</DialogTitle>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-6">
          {/* New Date Field */}
          <FormField
            control={form.control}
            name="nouvelleDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-700">Nouvelle date</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !field.value && "text-muted-foreground",
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {field.value ? format(field.value, "PPP", { locale: fr }) : "Sélectionner une date"}
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar mode="single" selected={field.value} onSelect={field.onChange} initialFocus />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Time Fields Row */}
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="heureDebut"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700">Heure de début</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input type="time" {...field} className="pr-10" />
                      {/* <Clock className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" /> */}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="heureFin"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700">Heure de Fin</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input type="time" {...field} className="pr-10" />
                      {/* <Clock className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" /> */}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Reason for Postponement */}
          <FormField
            control={form.control}
            name="motifReport"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-700">Motif du report</FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    className="min-h-[120px] resize-none"
                    placeholder="Expliquez la raison du report..."
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Action Buttons */}
          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="outline" onClick={onCancel} className="px-6">
              Annuler
            </Button>
            <Button type="submit" className="px-6">
              Valider
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}

export function ReprogramAppointmentDialog() {
  const { reprogramAppointmentDialog } = useAcceuilDialogs()

  const handleFormSubmit = (data: ReprogramFormData) => {
    console.log("Appointment rescheduled:", data)
    reprogramAppointmentDialog.closeDialog()
  }

  const handleCancel = () => {
    reprogramAppointmentDialog.closeDialog()
  }

  return (
    <Dialog open={reprogramAppointmentDialog.isOpen} onOpenChange={reprogramAppointmentDialog.setIsOpen}>
      <DialogContent className="max-w-lg">
        <ReprogramAppointmentForm onSubmit={handleFormSubmit} onCancel={handleCancel} />
      </DialogContent>
    </Dialog>
  )
}
