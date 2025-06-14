"use client"

import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import React, { useState } from 'react'
import TaskItem from './task-item';
import { ScrollArea } from '@/components/ui/scroll-area';
import AddTaskDialog from './add-task-dialog';


const TACHES = [
  {
    id: 1,
    task: "Examiner les radios dentaires du patient suivant"
  },
  {
    id: 2,
    task: "Compléter les notes cliniques des consultations précédentes"
  },
  {
    id: 3,
    task: "Répondre aux courriels des patients ou des assurances"
  },
  {
    id: 4,
    task: "Préparer l’ordonnance pour les soins postopératoires"
  },
  {
    id: 5,
    task: "Mettre à jour les paramètres du logiciel de gestion médicale"
  },
  {
    id: 6,
    task: "Envoyer les factures des consultations terminées"
  },
  {
    id: 7,
    task: "Vérifier les antécédents médicaux avant l’anesthésie"
  }
]

const TACHES_DONE = [
  {
    id: 8,
    task: "Vérifier les rendez-vous programmés pour la journée"
  },
  {
    id: 9,
    task: "Effectuer un suivi de douleur pour les patients opérés récemment"
  },
  {
    id: 10,
    task: "Classer les résultats de laboratoire dans les dossiers patients"
  },
  {
    id: 11,
    task: "Consulter la pile de documents laissée par l'assistant"
  },
  {
    id: 12,
    task: "Établir un plan de traitement pour les nouveaux patients"
  },
  {
    id: 13,
    task: "Examiner les documents d’assurance en attente"
  }
];

interface SideTaskViewProps {
  openAddTaskDialog: () => void
}

export default function SideTaskView({ openAddTaskDialog }: SideTaskViewProps) {

  return (
    <div className='h-full w-full bg-[#2B4194] text-white px-4 flex flex-col space-y-2'>
      {/* task header section */}
      <div className='h-15 border-b border-gray-300/20 flex flex-row justify-between items-center'>
        <h3 className='text-xl font-bold'>Taches</h3>
          <Button className='text-white hover:bg-[#4b62bd]' onClick={openAddTaskDialog}>
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
          <span className='bg-[#4b62bd] h-7 w-7 rounded-full flex items-center justify-center text-white/80'>10</span>
        </div>

        {/* task list container */}
        <div className='h-full flex flex-col items-start justify-start w-full space-y-2'>
          {TACHES.map((task) => (
            <TaskItem key={task.id} label={task.task} checked={false} />
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
          <span className='bg-[#4b62bd] h-7 w-7 rounded-full flex items-center justify-center text-white/80'>10</span>
        </div>

        {/* task list container */}
        <div className='h-full flex flex-col items-start justify-start w-full space-y-2'>
          {TACHES_DONE.map((task) => (
            <TaskItem key={task.id} label={task.task} checked={true} />
          ))}
        </div>
      </div>
      </ScrollArea>

      {/* all tasks buttons */}
      <div className='h-10 border-t pt-3 border-gray-300/20 flex flex-row justify-between items-center'>
        <Button className='cursor-pointer text-white hover:bg-[#4b62bd] w-full'>
          <span>Voire toutes les taches</span>
        </Button>
      </div>

    </div>
  )
}


