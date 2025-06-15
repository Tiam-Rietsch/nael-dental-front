"use client"

import useAcceuilDialogs from '@/hooks/acceuil/useAcceuilDialogs'
import { Checkbox } from '@/components/ui/checkbox'
import React, { useState } from 'react'
import { TacheTodo } from '@/lib/acceuil/types'

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
    <div className='cursor-pointer w-full pr-5 py-2 flex flex-row items-baseline justify-start space-x-3 text-white/95 h-fit'>
      <Checkbox checked={checked} />
      <span className='text-wrap break-words text-[15px] text-white/85 hover:text-white' onClick={() => handleTaskClick()}>{todo.titre}</span>
    </div>
  )
}
