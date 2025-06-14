"use client"

import useAcceuilDialogs from '@/hooks/acceuil/useAcceuilDialogs'
import { Checkbox } from '@/components/ui/checkbox'
import React, { useState } from 'react'

interface TaskItem {
  label: string
  checked: boolean
}

export default function TaskItem({ label, checked = false }: TaskItem) {
  const [isChecked, setIsChecked] = useState(checked)
  const { taskDetailsDialog } = useAcceuilDialogs()
  return (
    <div className='cursor-pointer w-full pr-5 py-2 flex flex-row items-baseline justify-start space-x-3 text-white/95 h-fit'>
      <Checkbox checked={isChecked} onCheckedChange={() => setIsChecked(prev => !prev)} />
      <span className='text-wrap break-words text-[15px] text-white/85 hover:text-white' onClick={taskDetailsDialog.openDialog}>{label}</span>
    </div>
  )
}
