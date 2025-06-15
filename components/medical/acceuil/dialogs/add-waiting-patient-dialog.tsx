"use client"
import { ArrowLeft, CalendarIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { fr } from "date-fns/locale"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import useAcceuilDialogs from "@/hooks/acceuil/useAcceuilDialogs"
import waitingListApi from "@/lib/acceuil/waitingListApi"
import { getURLFromRedirectError } from "next/dist/client/components/redirect"
import { SexePatient, WaitingPatientCreate } from "@/lib/acceuil/types"
import { useState } from "react"

// Zod schema for waiting patient form validation
const waitingPatientSchema = z.object({
  nom: z.string().min(1, "Le nom est requis"),
  prenom: z.string().min(1, "Le prénom est requis"),
  telephone: z.string().min(1, "Le numéro de téléphone est requis"),
  date_de_naissance: z.date({
    required_error: "La date de naissance est requise",
  }),
  sexe: z.string().min(1, "Le sexe est requis"),
  motif: z.string(),
})

type WaitingPatientFormData = z.infer<typeof waitingPatientSchema>

interface AddWaitingPatientDialogProps {
  open: boolean
  setOpen: (open: boolean) => void
}

type Props = {
  onSubmit: (data: WaitingPatientFormData) => void
  onCancel: () => void
}

export function AddWaitingPatientForm({ onSubmit, onCancel }: Props) {
  const form = useForm({
    resolver: zodResolver(waitingPatientSchema),
    defaultValues: {
      nom: "",
      prenom: "",
      telephone: "",
      date_de_naissance: new Date(),
      sexe: SexePatient.HOMME,
      motif: "",
    },
  })

  const [loading, setLoading] = useState(false)

  const handlSubmit = async () => {
    setLoading(true)
    await waitingListApi.create(form.getValues() as WaitingPatientCreate)
    setLoading(false)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="sm" onClick={onCancel} className="flex items-center gap-2">
          <ArrowLeft className="h-4 w-4" />
          Retour
        </Button>
      </div>

      <DialogTitle className="text-2xl font-semibold text-gray-800">
        Ajouter un patient en attente
      </DialogTitle>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handlSubmit)} className="space-y-6">

          {/* Nom & Prénom */}
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="nom"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nom</FormLabel>
                  <FormControl>
                    <Input type="text" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="prenom"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Prénom</FormLabel>
                  <FormControl>
                    <Input type="text" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Téléphone */}
          <FormField
            control={form.control}
            name="telephone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Numéro de téléphone</FormLabel>
                <FormControl>
                  <Input type="tel" placeholder="Ex: 01 23 45 67 89" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Date de naissance */}
          <FormField
            control={form.control}
            name="date_de_naissance"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Date de naissance</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? format(field.value, "PPP", { locale: fr }) : <span>Sélectionner une date</span>}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar mode="single" selected={field.value} onSelect={field.onChange} initialFocus />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Sexe */}
          <FormField
            control={form.control}
            name="sexe"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Sexe</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={SexePatient.HOMME}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner le sexe" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value={SexePatient.HOMME}>Masculin</SelectItem>
                      <SelectItem value={SexePatient.FEMME}>Féminin</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Motif */}
          <FormField
            control={form.control}
            name="motif"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Motif</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Décrivez le motif de la visite..."
                    className="resize-none min-h-[100px]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Submit / Cancel Buttons */}
          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="outline" onClick={onCancel} disabled={loading}>
              Annuler
            </Button>
            <Button disabled={loading} type="submit" className="bg-indigo-600 hover:bg-indigo-700">
              Ajouter
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}

export default function AddWaitingPatientDialog() {
  const { addWaitingPatientDialog } = useAcceuilDialogs()

  const handleFormSubmit = (data: WaitingPatientFormData) => {
    console.log("Waiting patient added:", data)
    addWaitingPatientDialog.closeDialog()
  }

  const handleCancel = () => {
    addWaitingPatientDialog.closeDialog()
  }

  return (
    <Dialog open={addWaitingPatientDialog.isOpen} onOpenChange={addWaitingPatientDialog.setIsOpen}>
      <DialogContent className="max-w-lg">
        <AddWaitingPatientForm onSubmit={handleFormSubmit} onCancel={handleCancel} />
      </DialogContent>
    </Dialog>
  )
}
