"use client"

import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import TaskItem from './task-item';
import { ScrollArea } from '@/components/ui/scroll-area';
import AddTaskDialog from './dialogs/add-task-dialog';
import useAcceuilDialogs from '@/hooks/acceuil/useAcceuilDialogs';
import { StatutsTacheTodo, TacheTodo } from '@/lib/acceuil/types';
import tacheTodoApi from '@/lib/acceuil/tacheTodoApi';


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
    const aFaire = tachesTodos.filter(todo => todo.statut === StatutsTacheTodo.A_FAIRE)
    const terminee = tachesTodos.filter(todo => todo.statut === StatutsTacheTodo.TERMINEE)
    setTodosAFaire(aFaire)
    setTodosTerminee(terminee)
    taskListDialog.setTodos(aFaire)
  }, [tachesTodos, setTachesTodos])

  return (
    <div className='h-full w-full bg-[#2B4194] text-white px-4 flex flex-col space-y-2'>
      {/* task header section */}
      <div className='h-15 border-b border-gray-300/20 flex flex-row justify-between items-center'>
        <h3 className='text-xl font-bold'>Taches</h3>
          <Button className='text-white hover:bg-[#4b62bd]' onClick={addTaskDialog.openDialog}>
            <Plus />
            <span>Creer</span>
          </Button>
      </div>

      {/* pending task list section */}
      <ScrollArea className='border-b border-gray-300/20 pb-2'>
      <div className='relative h-[45vh] w-full pr-3 '>
        {/* meta data  */}
        <div className='sticky z-10 top-0 py-2 bg-[#2B4194] left-0 w-full flex flex-row justify-between'>
          <h4 className='text-[18px] font-semibold text-white/90'>Taches en cours</h4>
          <span className='bg-[#4b62bd] h-7 w-7 rounded-full flex items-center justify-center text-white/80'>{todosAFaire.length}</span>
        </div>

        {/* task list container */}
        <div className='h-full flex flex-col items-start justify-start w-full space-y-2'>
          {todosAFaire.map((todo) => (
            <TaskItem key={todo.id} todo={todo} checked={false} />
          ))}
        </div>
      </div>
      </ScrollArea>

      {/* done task list section */}
      <ScrollArea>
      <div className='relative h-[33vh] w-full pr-3'>
        {/* meta data  */}
        <div className='sticky z-10 top-0 py-2 bg-[#2B4194] left-0 w-full flex flex-row justify-between'>
          <h4 className='text-[18px] font-semibold text-white/90'>Taches archivees</h4>
          <span className='bg-[#4b62bd] h-7 w-7 rounded-full flex items-center justify-center text-white/80'>{todosTerminee.length}</span>
        </div>

        {/* task list container */}
        <div className='h-full flex flex-col items-start justify-start w-full space-y-2'>
          {todosTerminee.map((todo) => (
            <TaskItem key={todo.id} todo={todo} checked={true} />
          ))}
        </div>
      </div>
      </ScrollArea>

      {/* all tasks buttons */}
      <div className='h-10 border-t pt-3 border-gray-300/20 flex flex-row justify-between items-center'>
        <Button className='cursor-pointer text-white hover:bg-[#4b62bd] w-full' onClick={taskListDialog.openDialog}>
          <span>Voire toutes les taches</span>
        </Button>
      </div>

    </div>
  )
}


