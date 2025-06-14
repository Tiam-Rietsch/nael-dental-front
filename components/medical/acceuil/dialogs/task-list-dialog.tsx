"use client"
import useAcceuilDialogs from "@/hooks/acceuil/useAcceuilDialogs"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, MoreHorizontal, ArrowLeft } from "lucide-react"
import { useState } from "react"


// Mock task data
const tasks = [
  {
    id: 1,
    priority: "high",
    title: "Reprogrammer un RDV",
    description:
      "Lorem ipsum dolor sit amet consectetur. Pellentesque tempor elit sed ut. Adipiscing et id non posuere malesuada ut amet donec faucibus. Ut amet donec pellentesque tempor elit sed ut.",
    requester: "Joe DuBois",
    executor: "Franck Elvis",
    dueDate: "15 sept. 2023",
    time: "12:00",
  },
  {
    id: 2,
    priority: "medium",
    title: "Reprogrammer un RDV",
    description:
      "Lorem ipsum dolor sit amet consectetur. Pellentesque tempor elit sed ut. Adipiscing et id non posuere malesuada ut amet donec faucibus. Ut amet donec pellentesque tempor elit sed ut.",
    requester: "Joe DuBois",
    executor: "Franck Elvis",
    dueDate: "15 sept. 2023",
    time: "12:00",
  },
  {
    id: 3,
    priority: "low",
    title: "Reprogrammer un RDV",
    description:
      "Lorem ipsum dolor sit amet consectetur. Pellentesque tempor elit sed ut. Adipiscing et id non posuere malesuada ut amet donec faucibus. Ut amet donec pellentesque tempor elit sed ut.",
    requester: "Joe DuBois",
    executor: "Franck Elvis",
    dueDate: "15 sept. 2023",
    time: "12:00",
  },
  {
    id: 4,
    priority: "high",
    title: "Reprogrammer un RDV",
    description:
      "Lorem ipsum dolor sit amet consectetur. Pellentesque tempor elit sed ut. Adipiscing et id non posuere malesuada ut amet donec faucibus. Ut amet donec pellentesque tempor elit sed ut.",
    requester: "Joe DuBois",
    executor: "Franck Elvis",
    dueDate: "15 sept. 2023",
    time: "12:00",
  },
  {
    id: 5,
    priority: "success",
    title: "Reprogrammer un RDV",
    description:
      "Lorem ipsum dolor sit amet consectetur. Pellentesque tempor elit sed ut. Adipiscing et id non posuere malesuada ut amet donec faucibus. Ut amet donec pellentesque tempor elit sed ut.",
    requester: "Joe DuBois",
    executor: "Franck Elvis",
    dueDate: "15 sept. 2023",
    time: "12:00",
  },
  {
    id: 6,
    priority: "high",
    title: "Reprogrammer un RDV",
    description:
      "Lorem ipsum dolor sit amet consectetur. Pellentesque tempor elit sed ut. Adipiscing et id non posuere malesuada ut amet donec faucibus. Ut amet donec pellentesque tempor elit sed ut.",
    requester: "Joe DuBois",
    executor: "Franck Elvis",
    dueDate: "15 sept. 2023",
    time: "12:00",
  },
]

function TaskListContent({ onClose }: { onClose: () => void }) {
  const [selectedRequester, setSelectedRequester] = useState("all")
  const [selectedExecutor, setSelectedExecutor] = useState("all")

  // Get unique requesters and executors from tasks
  const uniqueRequesters = Array.from(new Set(tasks.map((task) => task.requester)))
  const uniqueExecutors = Array.from(new Set(tasks.map((task) => task.executor)))

  // Filter tasks based on selected filters
  const filteredTasks = tasks.filter((task) => {
    const matchesRequester = selectedRequester === "all" || task.requester === selectedRequester
    const matchesExecutor = selectedExecutor === "all" || task.executor === selectedExecutor
    return matchesRequester && matchesExecutor
  })

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
                <SelectItem key={requester} value={requester}>
                  {requester}
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
                <SelectItem key={executor} value={executor}>
                  {executor}
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
              <th className="text-left p-3 font-medium text-gray-600 text-sm">Heure</th>
              <th className="text-left p-3 font-medium text-gray-600 text-sm">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredTasks.map((task) => (
              <tr key={task.id} className="border-t hover:bg-gray-50">
                <td className="p-3">
                  <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full ${getPriorityColor(task.priority)}`}></div>
                    <span className="font-medium text-sm">{task.title}</span>
                  </div>
                </td>
                <td className="p-3">
                  <p className="text-sm text-gray-600 max-w-xl wrap">{task.description}</p>
                </td>
                <td className="p-3">
                  <span className="text-blue-600 hover:underline cursor-pointer text-sm">{task.requester}</span>
                </td>
                <td className="p-3">
                  <span className="text-sm">{task.executor}</span>
                </td>
                <td className="p-3">
                  <span className="text-sm">{task.dueDate}</span>
                </td>
                <td className="p-3">
                  <span className="text-sm">{task.time}</span>
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
      <DialogContent className="w-70/100 max-w-90/100">
        <TaskListContent onClose={() => taskListDialog.closeDialog()} />
      </DialogContent>
    </Dialog>
  )
}
