"use client"
import useAcceuilDialogs from "@/hooks/acceuil/useAcceuilDialogs"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import { ArrowLeft } from "lucide-react"


// Mock task detail data
const taskDetails = {
  title: "Effectuer une tâche telle",
  category: "Clinique",
  status: "En cours",
  description: "Lorem ipsum dolor sit amet consectetur. Sit congue elit iaculis ac nulla elementum vitae sit urna.",
  requester: "Joe DuBois",
  executor: "Franc Elvis",
}

function TaskDetailsContent({ onClose }: { onClose: () => void }) {
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
      <DialogTitle className="text-2xl font-semibold text-gray-800">Détails de la tâche</DialogTitle>

      {/* Details Grid */}
      <div className="space-y-1 text-base">
        <div className="grid grid-cols-3 gap-4 py-1">
          <span className="font-medium text-gray-900">Titre</span>
          <span className="col-span-2 text-gray-600 break-words">{taskDetails.title}</span>
        </div>

        <div className="grid grid-cols-3 gap-4 py-1">
          <span className="font-medium text-gray-900">Catégorie</span>
          <span className="col-span-2 text-gray-600 break-words">{taskDetails.category}</span>
        </div>

        <div className="grid grid-cols-3 gap-4 py-1">
          <span className="font-medium text-gray-900">Statut</span>
          <span className="col-span-2 text-gray-600 break-words">{taskDetails.status}</span>
        </div>

        <div className="grid grid-cols-3 gap-4 py-1">
          <span className="font-medium text-gray-900">Description</span>
          <span className="col-span-2 text-gray-600 break-words">{taskDetails.description}</span>
        </div>

        <div className="grid grid-cols-3 gap-4 py-1">
          <span className="font-medium text-gray-900">Requérant</span>
          <span className="col-span-2 text-gray-600 break-words">{taskDetails.requester}</span>
        </div>

        <div className="grid grid-cols-3 gap-4 py-1">
          <span className="font-medium text-gray-900">Exécutant</span>
          <span className="col-span-2 text-gray-600 break-words">{taskDetails.executor}</span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end gap-3 pt-6">
        <Button className="px-6 bg-indigo-600 hover:bg-indigo-700">Tâche terminée</Button>
        <Button variant="outline" className="px-6">
          Modifier
        </Button>
      </div>
    </div>
  )
}

export function TaskDetailsDialog() {
  const { taskDetailsDialog } = useAcceuilDialogs()

  return (
    <Dialog open={taskDetailsDialog.isOpen} onOpenChange={taskDetailsDialog.setIsOpen}>
      <DialogContent className="max-w-lg">
        <TaskDetailsContent onClose={() => taskDetailsDialog.closeDialog()} />
      </DialogContent>
    </Dialog>
  )
}
