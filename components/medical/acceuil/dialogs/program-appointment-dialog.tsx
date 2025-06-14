"use client"
import { CalendarIcon, Search, Check, ChevronsUpDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { fr } from "date-fns/locale"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import useAcceuilDialogs from "@/hooks/acceuil/useAcceuilDialogs"

// Zod schema for form validation
const appointmentSchema = z.object({
  nom: z.string().min(1, "Le nom est requis"),
  prenom: z.string().min(1, "Le prénom est requis"),
  telephone: z.string().min(1, "Le téléphone est requis"),
  date: z.date({
    required_error: "La date est requise",
  }),
  debut: z.string().min(1, "L'heure de début est requise"),
  fin: z.string().min(1, "L'heure de fin est requise"),
  duree: z.string().min(1, "La durée est requise"),
  typeRendezVous: z.string().min(1, "Le type de rendez-vous est requis"),
  priorite: z.string().optional(),
  motifConsultation: z.string().optional(),
  typeSoin: z.string().optional(),
  observations: z.string().optional(),
  praticienTraitant: z.string().optional(),
  salle: z.string().optional(),
})

type AppointmentFormData = z.infer<typeof appointmentSchema>

// Mock patient data
const patients = [
  { id: "1", nom: "Martin", prenom: "Jean", telephone: "01 23 45 67 89" },
  { id: "2", nom: "Dubois", prenom: "Marie", telephone: "01 98 76 54 32" },
  { id: "3", nom: "Bernard", prenom: "Pierre", telephone: "01 11 22 33 44" },
  { id: "4", nom: "Moreau", prenom: "Sophie", telephone: "01 55 66 77 88" },
]

export function ProgramAppointmentDialog() {
  const { programAppointmentDialog } = useAcceuilDialogs()

  const handleFormSubmit = (data: AppointmentFormData) => {
    console.log("Appointment saved:", data)
    programAppointmentDialog.closeDialog()
  }

  const handleCancel = () => {
    programAppointmentDialog.closeDialog()
  }

  return (
    <Dialog open={programAppointmentDialog.isOpen} onOpenChange={programAppointmentDialog.setIsOpen}>
      <DialogContent className="max-w-xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-gray-800">Rendez-vous</DialogTitle>
        </DialogHeader>

        <AppointmentForm onSubmit={handleFormSubmit} onCancel={handleCancel} />
      </DialogContent>
    </Dialog>
  )
}

function AppointmentForm({
  onSubmit,
  onCancel,
}: { onSubmit: (data: AppointmentFormData) => void; onCancel: () => void }) {
  const [selectedPatient, setSelectedPatient] = useState("")
  const [patientSearchOpen, setPatientSearchOpen] = useState(false)

  const form = useForm<AppointmentFormData>({
    resolver: zodResolver(appointmentSchema),
    defaultValues: {
      nom: "",
      prenom: "",
      telephone: "",
      debut: "12:00",
      fin: "13:00",
      duree: "1h",
      typeRendezVous: "consultation",
      priorite: "",
      motifConsultation: "",
      typeSoin: "",
      observations: "",
      praticienTraitant: "",
      salle: "",
    },
  })

  const handlePatientSelect = (patient: (typeof patients)[0]) => {
    form.setValue("nom", patient.nom)
    form.setValue("prenom", patient.prenom)
    form.setValue("telephone", patient.telephone)
    setSelectedPatient(`${patient.prenom} ${patient.nom}`)
    setPatientSearchOpen(false)
  }

  const handleFormSubmit = (data: AppointmentFormData) => {
    console.log("Form data:", data)
    onSubmit(data)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-4">
        {/* Patient Search Combobox */}
        <div className="space-y-2">
          <Popover open={patientSearchOpen} onOpenChange={setPatientSearchOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={patientSearchOpen}
                className="w-full justify-between bg-gray-50 font-normal"
              >
                <div className="flex items-center">
                  <Search className="mr-2 h-4 w-4 text-gray-400" />
                  {selectedPatient || "Rechercher un patient déjà existant"}
                </div>
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-full p-0">
              <Command>
                <CommandInput placeholder="Rechercher un patient..." />
                <CommandList>
                  <CommandEmpty>Aucun patient trouvé.</CommandEmpty>
                  <CommandGroup>
                    {patients.map((patient) => (
                      <CommandItem
                        key={patient.id}
                        value={`${patient.prenom} ${patient.nom}`}
                        onSelect={() => handlePatientSelect(patient)}
                      >
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            selectedPatient === `${patient.prenom} ${patient.nom}` ? "opacity-100" : "opacity-0",
                          )}
                        />
                        {patient.prenom} {patient.nom} - {patient.telephone}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </div>

        {/* Form Fields */}
        <div className="space-y-4">
          {/* Row 1: Patient Name and First Name */}
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="nom"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nom du Patient</FormLabel>
                  <FormControl>
                    <Input {...field} />
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
                  <FormLabel>Prénom du Patient</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Row 2: Phone and Date */}
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="telephone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Téléphone du patient</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Date du Rendez-vous</FormLabel>
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
          </div>

          {/* Row 3: Start, End, Duration on same line */}
          <div className="grid grid-cols-3 gap-4">
            <FormField
              control={form.control}
              name="debut"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Début</FormLabel>
                  <FormControl>
                    <Input type="time" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="fin"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Fin</FormLabel>
                  <FormControl>
                    <Input type="time" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="duree"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Durée</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Row 4: Appointment Type and Priority */}
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="typeRendezVous"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Type de Rendez-vous</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue className="w-full"/>
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="w-full">
                      <SelectItem value="consultation">Consultation</SelectItem>
                      <SelectItem value="suivi">Suivi de soins</SelectItem>
                      <SelectItem value="urgence">Urgence</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="priorite"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Priorité du Rendez-vous</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="-" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="w-full">
                      <SelectItem value="haute">Haute</SelectItem>
                      <SelectItem value="moyenne">Moyenne</SelectItem>
                      <SelectItem value="basse">Basse</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Row 5: Consultation Reason (full width) */}
          <FormField
            control={form.control}
            name="motifConsultation"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Motif de Consultation</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="-" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="w-full">
                    <SelectItem value="fonctionnel">Fonctionnel</SelectItem>
                    <SelectItem value="esthetique">Esthétique</SelectItem>
                    <SelectItem value="esthetique-fonctionnel">Esthétique et fonctionnel</SelectItem>
                    <SelectItem value="visite-systematique">Visite systématique</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Row 6: Type of Care (full width) */}
          <FormField
            control={form.control}
            name="typeSoin"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Type de soin</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="-" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="w-full">
                    <SelectItem value="examen-prevention">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                        Examen et prévention
                      </div>
                    </SelectItem>
                    <SelectItem value="soins-conservateurs">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-blue-400"></div>
                        Soins conservateurs
                      </div>
                    </SelectItem>
                    <SelectItem value="chirurgie">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-red-400"></div>
                        Chirurgie
                      </div>
                    </SelectItem>
                    <SelectItem value="prothese">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-green-400"></div>
                        Prothèse
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Observations */}
        <FormField
          control={form.control}
          name="observations"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Observations</FormLabel>
              <FormControl>
                <Textarea className="min-h-[100px] resize-none" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Bottom Row: Practitioner and Room */}
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="praticienTraitant"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Praticien traitant</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="-" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="w-full">
                    <SelectItem value="dr-martin">Dr. Martin</SelectItem>
                    <SelectItem value="dr-bernard">Dr. Bernard</SelectItem>
                    <SelectItem value="dr-dubois">Dr. Dubois</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="salle"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Salle</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="-" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="w-full">
                    <SelectItem value="salle-1">Salle 1</SelectItem>
                    <SelectItem value="salle-2">Salle 2</SelectItem>
                    <SelectItem value="salle-3">Salle 3</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-3 pt-4">
          <Button type="button" variant="outline" onClick={onCancel} className="px-6">
            Annuler
          </Button>
          <Button type="submit" className="px-6">
            Sauvegarder
          </Button>
        </div>
      </form>
    </Form>
  )
}