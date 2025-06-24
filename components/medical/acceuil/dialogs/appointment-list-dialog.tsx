"use client"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, MoreHorizontal, ArrowLeft } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import useAcceuilDialogs from "@/hooks/acceuil/useAcceuilDialogs"



// Mock appointment data
const appointments = [
  {
    id: 1,
    patient: {
      name: "Louise Martin",
      email: "louise.martin@example.com",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    date: "15 sept. 2023",
    startTime: "12:00",
    duration: "45min",
    consultationReason: "Visite systématique",
    careType: "-",
    practitioner: "Joe DuBois",
    status: "Confirmé",
    postponeReason: "-",
  },
  {
    id: 2,
    patient: {
      name: "Louise Martin",
      email: "louise.martin@example.com",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    date: "15 sept. 2023",
    startTime: "12:00",
    duration: "45min",
    consultationReason: "Visite systématique",
    careType: "-",
    practitioner: "Joe DuBois",
    status: "À reporter",
    postponeReason: "-",
  },
  {
    id: 3,
    patient: {
      name: "Louise Martin",
      email: "louise.martin@example.com",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    date: "15 sept. 2023",
    startTime: "12:00",
    duration: "45min",
    consultationReason: "-",
    careType: "Chirurgie",
    practitioner: "Joe DuBois",
    status: "À reporter",
    postponeReason: "Absent et justifié",
  },
  {
    id: 4,
    patient: {
      name: "Louise Martin",
      email: "louise.martin@example.com",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    date: "15 sept. 2023",
    startTime: "12:00",
    duration: "45min",
    consultationReason: "-",
    careType: "Prothèse",
    practitioner: "Joe DuBois",
    status: "-",
    postponeReason: "-",
  },
  {
    id: 5,
    patient: {
      name: "Louise Martin",
      email: "louise.martin@example.com",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    date: "15 sept. 2023",
    startTime: "12:00",
    duration: "45min",
    consultationReason: "Visite systématique",
    careType: "-",
    practitioner: "Joe DuBois",
    status: "À reporter",
    postponeReason: "Absent et non justifié",
  },
]

function AppointmentListContent({ onClose }: { onClose: () => void }) {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Confirmé":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Confirmé</Badge>
      case "À reporter":
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">À reporter</Badge>
      default:
        return <span>-</span>
    }
  }

  return (
    <div className="space-y-4">
      {/* Header with Back Button */}
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="sm" onClick={onClose} className="flex items-center gap-2">
          <ArrowLeft className="h-4 w-4" />
          Retour
        </Button>
      </div>

      {/* Title and Filters */}
      <div className="flex items-center justify-between">
        <DialogTitle className="text-2xl font-semibold text-gray-800">Liste des rendez-vous</DialogTitle>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input placeholder="Rechercher un Rendez-vous" className="pl-10 w-64" />
          </div>
          <Select defaultValue="day">
            <SelectTrigger className="w-24">
              <SelectValue placeholder="Jour" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="day">Jour</SelectItem>
              <SelectItem value="week">Semaine</SelectItem>
              <SelectItem value="month">Mois</SelectItem>
            </SelectContent>
          </Select>
          <Select defaultValue="patient">
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Patient" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="patient">Patient</SelectItem>
              <SelectItem value="all">Tous</SelectItem>
            </SelectContent>
          </Select>
          <Select defaultValue="status">
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Statut" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="status">Statut</SelectItem>
              <SelectItem value="confirmed">Confirmé</SelectItem>
              <SelectItem value="postponed">À reporter</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Table */}
      <div className="border rounded-lg overflow-hidden text-sm">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left p-3 font-medium text-gray-600 text-sm">Noms</th>
              <th className="text-left p-3 font-medium text-gray-600 text-sm">Date</th>
              <th className="text-left p-3 font-medium text-gray-600 text-sm">Début</th>
              <th className="text-left p-3 font-medium text-gray-600 text-sm">Durée</th>
              <th className="text-left p-3 font-medium text-gray-600 text-sm">Motif de consultation</th>
              <th className="text-left p-3 font-medium text-gray-600 text-sm">Type de soins</th>
              <th className="text-left p-3 font-medium text-gray-600 text-sm">Praticien traitant</th>
              <th className="text-left p-3 font-medium text-gray-600 text-sm">Statut</th>
              <th className="text-left p-3 font-medium text-gray-600 text-sm">Raison du report</th>
              <th className="text-left p-3 font-medium text-gray-600 text-sm">Actions</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((appointment) => (
              <tr key={appointment.id} className="border-t hover:bg-gray-50">
                <td className="p-3">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={appointment.patient.avatar || "/placeholder.svg"} />
                      <AvatarFallback>LM</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium text-sm">{appointment.patient.name}</div>
                      <div className="text-xs text-gray-500">{appointment.patient.email}</div>
                    </div>
                  </div>
                </td>
                <td className="p-3 text-sm">{appointment.date}</td>
                <td className="p-3 text-sm">{appointment.startTime}</td>
                <td className="p-3 text-sm">{appointment.duration}</td>
                <td className="p-3 text-sm">{appointment.consultationReason}</td>
                <td className="p-3 text-sm">{appointment.careType}</td>
                <td className="p-3">
                  <span className="text-blue-600 hover:underline cursor-pointer text-sm">
                    {appointment.practitioner}
                  </span>
                </td>
                <td className="p-3">{getStatusBadge(appointment.status)}</td>
                <td className="p-3 text-sm">{appointment.postponeReason}</td>
                <td className="p-3">
                  <Button variant="ghost" size="sm">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export function AppointmentListDialog() {
  const { appointmentListDialog } = useAcceuilDialogs()

  return (
    <Dialog open={appointmentListDialog.isOpen} onOpenChange={appointmentListDialog.setIsOpen}>
      <DialogContent className="w-80/100 min-w-[1280px] max-h-[90vh] overflow-y-auto">
        <AppointmentListContent onClose={() => appointmentListDialog.closeDialog()} />
      </DialogContent>
    </Dialog>
  )
}
