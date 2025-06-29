'use client'

import { Trash, X } from 'lucide-react';
import { useEffect } from 'react'
import { toast as sonnerToast} from 'sonner';

interface MemoToastProps {
  id: string | number;
  titre: string;
  description: string;
  couleur: string;
  memo: any; // Full memo object for deletion
}

/** Abstract toast function that takes toast props omitting id */
export function toastMemo(toast: Omit<MemoToastProps, 'id'>) {
  return sonnerToast.custom((id) => (
    <MemoToast
      id={id}
      titre={toast.titre}
      description={toast.description}
      couleur={toast.couleur}
      memo={toast.memo}
    />
  ), {
    duration: 60000
  })
}

/** Show memo toast function that converts memo to toast props */
export function showMemoToast(memo: any) {
  toastMemo({
    titre: memo.titre,
    description: memo.description,
    couleur: memo.couleur,
    memo: memo
  });
}

/** Custom memo toast component */
function MemoToast(props: MemoToastProps) {
  const { titre, description, couleur, memo, id } = props;

  const handleDelete = () => {
    try {
      const existing = JSON.parse(localStorage.getItem('memos') || '[]');
      const filtered = existing.filter((m: any) => m.id !== memo.id);
      localStorage.setItem('memos', JSON.stringify(filtered));
      sonnerToast.dismiss(id);
    } catch (error) {
      console.error('Error removing memo:', error);
    }
  };

  const handleClose = () => {
    sonnerToast.dismiss(id);
  };

  return (
    <div
      className="flex rounded-lg shadow-md ring-1 ring-black/5 min-w-[15vw] items-start border-l-4 p-2"
      style={{ backgroundColor: 'white', borderLeftColor: couleur }}
    >
      <div className="flex flex-1 items-start">
        <div className="w-full">
          <strong className="block text-md text-gray-900">{titre}</strong>
          <p className="text-sm text-gray-600 mt-1">{description}</p>
        </div>
      </div>
      <div className="ml-2 shrink-0 flex gap-2 items-start">
        <button
          onClick={handleClose}
          className="text-md text-gray-500 hover:text-gray-700 rounded"
          title="Fermer"
        >
          <X size={14} />
        </button>
        <button
          onClick={handleDelete}
          className="text-md text-red-500 hover:text-red-700 rounded"
          title="Supprimer"
        >
          <Trash size={14} />
        </button>
      </div>
    </div>
  );
}


export default function MemoToastScheduler() {
  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now()
      const memos = JSON.parse(localStorage.getItem('memos') || '[]')
      const updated = memos.map((memo: any) => {
        if (now - memo.lastShown >= memo.intervalMs) {
          showMemoToast(memo)
          return { ...memo, lastShown: now }
        }
        return memo
      })
      localStorage.setItem('memos', JSON.stringify(updated))
    }, 10000)

    return () => clearInterval(interval)
  }, [])

  return null
}
