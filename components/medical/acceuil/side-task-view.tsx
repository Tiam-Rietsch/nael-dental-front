"use client"

import { Button } from "@/components/ui/button"
import { Plus, CheckCircle2, Clock } from "lucide-react"
import { useEffect, useState } from "react"
import TaskItem from "./task-item"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import useAcceuilDialogs from "@/hooks/acceuil/useAcceuilDialogs"
import { StatutsTacheTodo, type TacheTodo } from "@/lib/acceuil/types"
import tacheTodoApi from "@/lib/acceuil/tacheTodoApi"

export default function SideTaskView() {
  const { addTaskDialog, taskListDialog, taskDetailsDialog } = useAcceuilDialogs()
  const [tachesTodos, setTachesTodos] = useState<TacheTodo[]>([])
  const [todosAFaire, setTodosAFaire] = useState<TacheTodo[]>([])
  const [todosTerminee, setTodosTerminee] = useState<TacheTodo[]>([])

  const loadTachesTodos = async () => {
    await tacheTodoApi.getAll().then(setTachesTodos)
  }

  useEffect(() => {
    loadTachesTodos()
  }, [taskDetailsDialog.isOpen, taskDetailsDialog.closeDialog, addTaskDialog.isOpen, addTaskDialog.closeDialog])

  useEffect(() => {
    const aFaire = tachesTodos.filter((todo) => todo.statut === StatutsTacheTodo.A_FAIRE)
    const terminee = tachesTodos.filter((todo) => todo.statut === StatutsTacheTodo.TERMINEE)
    setTodosAFaire(aFaire)
    setTodosTerminee(terminee)
    taskListDialog.setTodos(aFaire)
  }, [tachesTodos, setTachesTodos])

  return (
    <div className="h-full w-full bg-gray-50 text-[#283874] flex flex-col min-h-0 border-r border-gray-400/40">
      {/* Light header */}
      <div className="bg-white px-4 py-3 border-b border-gray-200 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-[#7F88C1] rounded-full"></div>
            <h3 className="text-md font-semibold text-[#283874]">Tâches</h3>
          </div>
          <Button
            size="sm"
            className="bg-[#7F88C1] hover:bg-[#283874] text-white shadow-sm transition-all duration-200 text-xs h-8 px-3 rounded-lg"
            onClick={addTaskDialog.openDialog}
          >
            <Plus size={14} className="mr-1" />
            Créer
          </Button>
        </div>
      </div>

      <div className="flex-1 flex flex-col min-h-0 p-3 space-y-4">
        {/* Active tasks section */}
        <div className="flex-1 min-h-0">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-2">
              <Clock size={16} className="text-[#7F88C1]" />
              <h4 className="text-sm font-medium text-[#283874]">En cours</h4>
            </div>
            <Badge
              variant="secondary"
              className="bg-[#7F88C1]/10 text-[#7F88C1] border-[#7F88C1]/20 text-xs font-medium px-2 py-1"
            >
              {todosAFaire.length}
            </Badge>
          </div>

          <ScrollArea className="flex-1 min-h-0 rounded-lg bg-white border border-gray-200">
            <div className="p-1">
              {todosAFaire.length > 0 ? (
                <div className="space-y-0">
                  {todosAFaire.map((todo) => (
                    <TaskItem key={todo.id} todo={todo} checked={false} />
                  ))}
                </div>
              ) : (
                <div className="text-xs text-gray-400 text-center py-6 flex flex-col items-center space-y-2">
                  <Clock size={20} className="text-gray-300" />
                  <span>Aucune tâche en cours</span>
                </div>
              )}
            </div>
          </ScrollArea>
        </div>

        {/* Completed tasks section */}
        <div className="flex-1 min-h-0">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-2">
              <CheckCircle2 size={16} className="text-green-500" />
              <h4 className="text-sm font-medium text-[#283874]">Terminées</h4>
            </div>
            <Badge
              variant="secondary"
              className="bg-green-500/10 text-green-600 border-green-500/20 text-xs font-medium px-2 py-1"
            >
              {todosTerminee.length}
            </Badge>
          </div>

          <ScrollArea className="flex-1 min-h-0 rounded-lg bg-white border border-gray-200">
            <div className="p-1">
              {todosTerminee.length > 0 ? (
                <div className="space-y-0">
                  {todosTerminee.map((todo) => (
                    <TaskItem key={todo.id} todo={todo} checked={true} />
                  ))}
                </div>
              ) : (
                <div className="text-xs text-gray-400 text-center py-6 flex flex-col items-center space-y-2">
                  <CheckCircle2 size={20} className="text-gray-300" />
                  <span>Aucune tâche terminée</span>
                </div>
              )}
            </div>
          </ScrollArea>
        </div>
      </div>

      {/* Light footer */}
      <div className="flex-shrink-0 p-3 border-t border-gray-200 bg-white">
        <Button
          variant="outline"
          className="w-full text-[#283874] border-gray-300 hover:bg-[#7F88C1]/5 hover:text-[#283874] hover:border-[#7F88C1] text-md h-8 rounded-lg transition-all duration-200"
          onClick={taskListDialog.openDialog}
        >
          Voir toutes les tâches
        </Button>
      </div>
    </div>
  )
}
