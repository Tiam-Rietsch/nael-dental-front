"use client"
import useAcceuilDialogs from "@/hooks/acceuil/useAcceuilDialogs"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import { ArrowLeft } from "lucide-react"
import { StatutsTacheTodo, TacheTodo } from "@/lib/acceuil/types"
import { formatDateFrench } from "@/lib/utils"
import tacheTodoApi from "@/lib/acceuil/tacheTodoApi"



function TaskDetailsContent({ onClose, todo }: { onClose: () => void, todo: TacheTodo }) {

  const handleTerminateTask = async () => {
    await tacheTodoApi.terminer(todo)
    onClose()
  }

  const handleReopenTask = async () => {
    await tacheTodoApi.reopen(todo)
    onClose()
  }

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
      <div className="space-y-1 text-xl">
        <div className="grid grid-cols-3 gap-4 py-1">
          <span className="font-medium text-gray-900">Titre</span>
          <span className="col-span-2 text-gray-600 break-words">{todo.titre}</span>
        </div>

        <div className="grid grid-cols-3 gap-4 py-1">
          <span className="font-medium text-gray-900">Catégorie</span>
          <span className="col-span-2 text-gray-600 break-words">{todo.categorie}</span>
        </div>

        <div className="grid grid-cols-3 gap-4 py-1">
          <span className="font-medium text-gray-900">Statut</span>
          <span className="col-span-2 text-gray-600 break-words">{todo.statut}</span>
        </div>

        <div className="grid grid-cols-3 gap-4 py-1">
          <span className="font-medium text-gray-900">Echeance</span>
          <span className="col-span-2 text-gray-600 break-words">{formatDateFrench(todo.echeance.toString())}</span>
        </div>

        <div className="grid grid-cols-3 gap-4 py-1">
          <span className="font-medium text-gray-900">Description</span>
          <span className="col-span-2 text-gray-600 break-words">{todo.description}</span>
        </div>

        <div className="grid grid-cols-3 gap-4 py-1">
          <span className="font-medium text-gray-900">Requérant</span>
          <span className="col-span-2 text-gray-600 break-words">{todo.requierant?.username}</span>
        </div>

        <div className="grid grid-cols-3 gap-4 py-1">
          <span className="font-medium text-gray-900">Exécutant</span>
          <span className="col-span-2 text-gray-600 break-words">{todo.executant?.username}</span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end gap-3 pt-6">
        {todo.statut === StatutsTacheTodo.TERMINEE ? (
          <Button className="px-6 bg-indigo-600 hover:bg-indigo-700" onClick={() => handleReopenTask()}>Reassigner la tache</Button>
        ): (
          <Button className="px-6 bg-indigo-600 hover:bg-indigo-700" onClick={() => handleTerminateTask()}>Tâche terminée</Button>
        )}
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
        <TaskDetailsContent onClose={() => taskDetailsDialog.closeDialog()} todo={taskDetailsDialog.todo} />
      </DialogContent>
    </Dialog>
  )
}
