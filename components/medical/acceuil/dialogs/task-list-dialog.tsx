"use client"
import useAcceuilDialogs from "@/hooks/acceuil/useAcceuilDialogs"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, MoreHorizontal, ArrowLeft } from "lucide-react"
import { useState } from "react"
import { TacheTodo } from "@/lib/acceuil/types"
import { formatDateFrench } from "@/lib/utils"


function TaskListContent({ onClose, todos }: { onClose: () => void, todos: TacheTodo[] }) {
  const [selectedRequester, setSelectedRequester] = useState("all")
  const [selectedExecutor, setSelectedExecutor] = useState("all")

  // Get unique requesters and executors from tasks
  const uniqueRequesters = Array.from(new Set(todos.map((task) => task.requierant)))
  const uniqueExecutors = Array.from(new Set(todos.map((task) => task.executant)))

  // // Filter tasks based on selected filters,
  // const filteredTasks = todos.filter((task) => {
  //   const matchesRequester = selectedRequester === "all" || task.requierant === selectedRequester
  //   const matchesExecutor = selectedExecutor === "all" || task.executant === selectedExecutor
  //   return matchesRequester && matchesExecutor
  // })

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-500"
      case "medium":
        return "bg-blue-500"
      case "low":
        return "bg-yellow-500"
      case "success":
        return "bg-green-500"
      default:
        return "bg-gray-500"
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
        <DialogTitle className="text-2xl font-semibold text-gray-800">Liste des tâches</DialogTitle>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input placeholder="Rechercher une tâche" className="pl-10 w-64" />
          </div>
          <Select defaultValue="all">
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Toutes les tâches" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Toutes les tâches</SelectItem>
              <SelectItem value="pending">En cours</SelectItem>
              <SelectItem value="completed">Terminées</SelectItem>
            </SelectContent>
          </Select>
          <Select value={selectedRequester} onValueChange={setSelectedRequester}>
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Requérant" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous</SelectItem>
              {uniqueRequesters.map((requester) => (
                <SelectItem key={requester?.id.toString()} value={requester?.id.toString() ?? ""}>
                  {requester?.username}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={selectedExecutor} onValueChange={setSelectedExecutor}>
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Exécutant" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous</SelectItem>
              {uniqueExecutors.map((executor) => (
                <SelectItem key={executor?.id} value={executor?.id.toString() ?? ""}>
                  {executor?.username}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Table */}
      <div className="border rounded-lg overflow-hidden text-sm">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left p-3 font-medium text-gray-600 text-sm">Titre</th>
              <th className="text-left p-3 font-medium text-gray-600 text-sm">Description</th>
              <th className="text-left p-3 font-medium text-gray-600 text-sm">Requérant</th>
              <th className="text-left p-3 font-medium text-gray-600 text-sm">Exécutant</th>
              <th className="text-left p-3 font-medium text-gray-600 text-sm">Date d'échéance</th>
              <th className="text-left p-3 font-medium text-gray-600 text-sm">Actions</th>
            </tr>
          </thead>
          <tbody>
            {todos.map((task) => (
              <tr key={task.id} className="border-t hover:bg-gray-50">
                <td className="p-3">
                  <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full ${getPriorityColor("high")}`}></div>
                    <span className="font-medium text-sm">{task.titre}</span>
                  </div>
                </td>
                <td className="p-3">
                  <p className="text-sm text-gray-600 max-w-xl wrap">{task.description}</p>
                </td>
                <td className="p-3">
                  <span className="text-blue-600 hover:underline cursor-pointer text-sm">{task.requierant?.username}</span>
                </td>
                <td className="p-3">
                  <span className="text-sm">{task.executant?.username}</span>
                </td>
                <td className="p-3">
                  <span className="text-sm">{formatDateFrench(task.echeance.toString())}</span>
                </td>
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

export function TaskListDialog() {
  const { taskListDialog } = useAcceuilDialogs()

  return (
    <Dialog open={taskListDialog.isOpen} onOpenChange={taskListDialog.setIsOpen}>
      <DialogContent className="w-80/100 min-w-[1280px] max-w-90/100">
        <TaskListContent onClose={() => taskListDialog.closeDialog()} todos={taskListDialog.todos}/>
      </DialogContent>
    </Dialog>
  )
}
