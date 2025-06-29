import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import type { WaitingPatient } from "@/lib/acceuil/types"
import { formatDateFrench } from "@/lib/utils"
import { Calendar, Clock, Mail, Phone, MessageCircleMore, Trash, EllipsisVertical } from "lucide-react"

interface WaitingListItemProps {
  waitingPatient: WaitingPatient
}

export default function WaitingListItem({ waitingPatient }: WaitingListItemProps) {
  return (
    <div className="border-l-4 border-l-primary bg-white w-full h-fit rounded-lg flex flex-col border border-gray-200 transition-all duration-300 hover:shadow-lg hover:shadow-gray-200/50 hover:-translate-y-1 cursor-pointer group">
      {/* Header section with avatar and patient info */}
      <div className="w-full flex-1 border-b border-gray-100 p-3 flex flex-row gap-4">
        <div className="flex-shrink-0">
          <Avatar className="w-20 h-20 rounded-lg">
            <AvatarImage
              src="/placeholder.svg"
              alt={`${waitingPatient.patient.nom} ${waitingPatient.patient.prenom}`}
            />
            <AvatarFallback className="bg-blue-100 text-blue-600 font-medium rounded-lg text-3xl">
              {waitingPatient.patient.nom.charAt(0).toUpperCase()}
              {waitingPatient.patient.prenom.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between mb-2">
            <h3 className="font-semibold text-gray-900 text-md leading-tight">
              {waitingPatient.patient.nom} {waitingPatient.patient.prenom}
            </h3>
            <Badge
              variant="secondary"
              className="bg-yellow-100 text-yellow-700 hover:bg-yellow-100 text-sm font-medium"
            >
              En attente
            </Badge>
          </div>

          <div className="space-y-1 mb-3">
            <div className="flex items-center gap-2 text-gray-500 text-sm">
              <Calendar size={14} />
              <span>{formatDateFrench(waitingPatient.date_created.toString())}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-500 text-sm">
              <Mail size={14} />
              <span className="truncate">g.bernard@gmail.com</span>
            </div>
            <div className="flex items-center gap-2 text-gray-500 text-sm">
              <Phone size={14} />
              <span>+337 677 55 66 44</span>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-md font-medium text-gray-700">Non présent</span>
            <div className="flex items-center gap-1">
              <Button
                size="sm"
                variant="ghost"
                className="h-8 w-8 p-0 hover:bg-orange-100 text-orange-600 hover:text-orange-700"
              >
                <Clock size={16} />
              </Button>
              <Button
                size="sm"
                variant="ghost"
                className="h-8 w-8 p-0 hover:bg-green-100 text-green-600 hover:text-green-700"
              >
                <MessageCircleMore size={16} />
              </Button>
              <Button
                size="sm"
                variant="ghost"
                className="h-8 w-8 p-0 hover:bg-red-100 text-red-600 hover:text-red-700"
              >
                <Trash size={16} />
              </Button>
            </div>
          </div>
        </div>

        <div className="flex-shrink-0">
          <Button
            size="sm"
            variant="ghost"
            className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
          >
            <EllipsisVertical size={16} />
          </Button>
        </div>
      </div>

      {/* Footer section with status information */}
      <div className="w-full grid grid-cols-3 divide-x divide-gray-100 bg-gray-50">
        <div className="px-2 py-2 text-center">
          <div className="text-sm font-medium text-gray-500 mb-1">État financier</div>
          <div className="text-sm font-semibold text-green-600">GOOD</div>
        </div>
        <div className="px-2 py-2 text-center">
          <div className="text-sm font-medium text-gray-500 mb-1">État du rendez-vous</div>
          <div className="text-sm font-semibold text-red-600">X</div>
        </div>
        <div className="px-2 py-2 text-center">
          <div className="text-sm font-medium text-gray-500 mb-1">Assurance</div>
          <div className="text-sm font-semibold text-gray-900">COMPLETE</div>
        </div>
      </div>
    </div>
  )
}
