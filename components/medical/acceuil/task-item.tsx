"use client"

import useAcceuilDialogs from "@/hooks/acceuil/useAcceuilDialogs"
import { Checkbox } from "@/components/ui/checkbox"
import type { TacheTodo } from "@/lib/acceuil/types"

interface TaskItemProps {
  checked: boolean
  todo: TacheTodo
}

export default function TaskItem({ checked = false, todo }: TaskItemProps) {
  const { taskDetailsDialog } = useAcceuilDialogs()

  const handleTaskClick = () => {
    taskDetailsDialog.setTodo(todo)
    taskDetailsDialog.openDialog()
  }

  return (
    <div className="group cursor-pointer w-full px-2 py-1.5 flex flex-row items-baseline space-x-2 hover:bg-[#7F88C1]/5 transition-all duration-200 border-b border-gray-100 last:border-b-0">
      <div className="flex-shrink-0 mt-0.5">
        <Checkbox
          checked={checked}
          className="h-4 w-4 border-gray-300 data-[state=checked]:bg-[#7F88C1] data-[state=checked]:border-[#7F88C1] data-[state=checked]:text-white"
        />
      </div>
      <div className="min-w-0 w-full">
        <span
          className={`text-md lcursor-pointer transition-all duration-200 block truncate w-[15vw] ${
            checked ? "text-gray-400 line-through" : "text-[#283874] group-hover:text-[#283874]"
          }`}
          onClick={handleTaskClick}
        >
          {todo.titre}
          {todo.titre}
          {todo.titre}
          {todo.titre}
        </span>
      </div>
    </div>
  )
}
