"use client"
import useAcceuilDialogs from "@/hooks/acceuil/useAcceuilDialogs"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import { ArrowLeft } from "lucide-react"


// Mock appointment detail data
const appointmentDetails = {
  name: "Talla Fotso",
  email: "tallafotso@gmail.com",
  phone: "+237 687 54 43 67",
  date: "15 sept. 2023",
  startTime: "11:30",
  duration: "12:00",
  appointmentType: "Consultation",
  consultationReason: "Visite systématique",
  careType: "-",
  status: "À reporter",
  postponeReason: "Patient absent et non justifié",
  description: "Lorem ipsum dolor sit amet consectetur. Sit congue elit iaculis ac nulla elementum vitae sit urna.",
  practitioner: "Joe DuBois",
}

function AppointmentDetailsContent({ onClose }: { onClose: () => void }) {
  return (
    <div className="space-y-6">
      {/* Header with Back Button */}
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="sm" onClick={onClose} className="flex items-center gap-2">
          <ArrowLeft className="h-4 w-4" />
          Retour
        </Button>
      </div>

      {/* Title */}
      <DialogTitle className="text-2xl font-semibold text-gray-800">Détails du rendez-vous</DialogTitle>

      {/* Details Grid */}
      <div className="space-y-1 text-xl">
        <div className="grid grid-cols-3 gap-4 py-1">
          <span className="font-medium text-gray-900">Noms</span>
          <span className="col-span-2 text-blue-600 font-medium break-words">{appointmentDetails.name}</span>
        </div>

        <div className="grid grid-cols-3 gap-4 py-1">
          <span className="font-medium text-gray-900">E-mail</span>
          <span className="col-span-2 text-gray-600 break-words">{appointmentDetails.email}</span>
        </div>

        <div className="grid grid-cols-3 gap-4 py-1">
          <span className="font-medium text-gray-900">Téléphone</span>
          <span className="col-span-2 text-gray-600 break-words">{appointmentDetails.phone}</span>
        </div>

        <div className="grid grid-cols-3 gap-4 py-1">
          <span className="font-medium text-gray-900">Date</span>
          <span className="col-span-2 text-gray-600 break-words">{appointmentDetails.date}</span>
        </div>

        <div className="grid grid-cols-3 gap-4 py-1">
          <span className="font-medium text-gray-900">Début</span>
          <span className="col-span-2 text-gray-600 break-words">{appointmentDetails.startTime}</span>
        </div>

        <div className="grid grid-cols-3 gap-4 py-1">
          <span className="font-medium text-gray-900">Durée</span>
          <span className="col-span-2 text-gray-600 break-words">{appointmentDetails.duration}</span>
        </div>

        <div className="grid grid-cols-3 gap-4 py-1">
          <span className="font-medium text-gray-900">Type de rendez-vous</span>
          <span className="col-span-2 text-gray-600 break-words">{appointmentDetails.appointmentType}</span>
        </div>

        <div className="grid grid-cols-3 gap-4 py-1">
          <span className="font-medium text-gray-900">Motif de consultation</span>
          <span className="col-span-2 text-gray-600 break-words">{appointmentDetails.consultationReason}</span>
        </div>

        <div className="grid grid-cols-3 gap-4 py-1">
          <span className="font-medium text-gray-900">Type de soins</span>
          <span className="col-span-2 text-gray-600 break-words">{appointmentDetails.careType}</span>
        </div>

        <div className="grid grid-cols-3 gap-4 py-1">
          <span className="font-medium text-gray-900">Statut</span>
          <span className="col-span-2 text-gray-600 break-words">{appointmentDetails.status}</span>
        </div>

        <div className="grid grid-cols-3 gap-4 py-1">
          <span className="font-medium text-gray-900">Raison du report</span>
          <span className="col-span-2 text-gray-600 break-words">{appointmentDetails.postponeReason}</span>
        </div>

        <div className="grid grid-cols-3 gap-4 py-1">
          <span className="font-medium text-gray-900">Description</span>
          <span className="col-span-2 text-gray-600 break-words">{appointmentDetails.description}</span>
        </div>

        <div className="grid grid-cols-3 gap-4 py-1">
          <span className="font-medium text-gray-900">Praticien traitant</span>
          <span className="col-span-2 text-gray-600 break-words">{appointmentDetails.practitioner}</span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end gap-3 pt-6">
        <Button className="px-6">Modifier</Button>
        <Button variant="destructive" className="px-6">
          Supprimer
        </Button>
      </div>
    </div>
  )
}

export function AppointmentDetailsDialog() {
  const { appointmentDetailsDialog } = useAcceuilDialogs()

  return (
    <Dialog open={appointmentDetailsDialog.isOpen} onOpenChange={appointmentDetailsDialog.setIsOpen}>
      <DialogContent className="w-2xl max-h-[90vh] overflow-y-auto">
        <AppointmentDetailsContent onClose={() => appointmentDetailsDialog.closeDialog()} />
      </DialogContent>
    </Dialog>
  )
}
