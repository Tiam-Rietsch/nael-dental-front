"use client"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import useAcceuilDialogs from "@/hooks/acceuil/useAcceuilDialogs"
import { AlertDialogAction, AlertDialogCancel, AlertDialogFooter } from "@/components/ui/alert-dialog"
import { useState } from "react"
import { showMemoToast } from "../memoToastScheduler"

// Zod schema for memo form validation
const memoSchema = z.object({
  titre: z.string().min(1, "Le titre est requis"),
  description: z.string().min(1, "La description est requise"),
  frequenceAlarme: z.string().min(1, "La fréquence d'alarme est requise"),
  couleur: z.string().min(1, "La couleur est requise"),
})

type MemoFormData = z.infer<typeof memoSchema>

// Color configuration with better contrast and appealing colors
const colorOptions = [
  { 
    value: "yellow", 
    background: "bg-amber-100", 
    dialogBg: "bg-amber-50",
    borderActive: "border-amber-600",
    borderHover: "border-amber-400",
    colorSwatch: "bg-amber-300",
    label: "Jaune" 
  },
  { 
    value: "blue", 
    background: "bg-sky-100", 
    dialogBg: "bg-sky-50",
    borderActive: "border-sky-600",
    borderHover: "border-sky-400",
    colorSwatch: "bg-sky-300",
    label: "Bleu" 
  },
  { 
    value: "green", 
    background: "bg-emerald-100", 
    dialogBg: "bg-emerald-50",
    borderActive: "border-emerald-600",
    borderHover: "border-emerald-400",
    colorSwatch: "bg-emerald-300",
    label: "Vert" 
  },
  { 
    value: "pink", 
    background: "bg-rose-100", 
    dialogBg: "bg-rose-50",
    borderActive: "border-rose-600",
    borderHover: "border-rose-400",
    colorSwatch: "bg-rose-300",
    label: "Rose" 
  },
  { 
    value: "purple", 
    background: "bg-violet-100", 
    dialogBg: "bg-violet-50",
    borderActive: "border-violet-600",
    borderHover: "border-violet-400",
    colorSwatch: "bg-violet-300",
    label: "Violet" 
  },
  { 
    value: "orange", 
    background: "bg-orange-100", 
    dialogBg: "bg-orange-50",
    borderActive: "border-orange-600",
    borderHover: "border-orange-400",
    colorSwatch: "bg-orange-300",
    label: "Orange" 
  },
]

function MemoForm({ onSubmit, onCancel, handleColorChange, color }: { 
  onSubmit: (data: MemoFormData) => void; 
  onCancel: () => void; 
  handleColorChange: (color: string) => void; 
  color: string 
}) {
  const form = useForm<MemoFormData>({
    resolver: zodResolver(memoSchema),
    defaultValues: {
      titre: "",
      description: "",
      frequenceAlarme: "1hour",
      couleur: color
    },
  })

const handleMemoSave = () => {
  onSubmit(form.getValues())
}

  const currentColorConfig = colorOptions.find(c => c.value === color) || colorOptions[0]

  return (
    <div className={`${currentColorConfig.background} p-4 rounded-lg transition-all duration-300 ease-in-out`}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleMemoSave)} className="space-y-5">
          <FormField
            control={form.control}
            name="titre"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-800 font-medium">Titre</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="Titre du mémo" 
                    {...field} 
                    className="bg-white/80 border-gray-300 focus:border-gray-500 focus:ring-2 focus:ring-gray-200 transition-all duration-200"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-800 font-medium">Description</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Description du mémo" 
                    {...field} 
                    className="bg-white/80 border-gray-300 focus:border-gray-500 focus:ring-2 focus:ring-gray-200 transition-all duration-200 min-h-[80px] resize-none"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Color Selection Field */}
          <FormField
            control={form.control}
            name="couleur"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-800 font-medium">Couleur du mémo</FormLabel>
                <FormControl>
                  <div className="flex gap-3 flex-wrap">
                    {colorOptions.map((colorOption) => (
                      <button
                        key={colorOption.value}
                        type="button"
                        onClick={() => {
                          field.onChange(colorOption.value)
                          handleColorChange(colorOption.value)
                        }}
                        className={`w-6 h-6 rounded-xl border-2 flex items-center justify-center transition-all duration-200 ease-in-out transform hover:scale-105 hover:shadow-md ${
                          colorOption.colorSwatch
                        } ${
                          field.value === colorOption.value
                            ? `${colorOption.borderActive} scale-110 shadow-lg`
                            : `border-transparent hover:${colorOption.borderHover}`
                        }`}
                        title={colorOption.label}
                      >
                        {field.value === colorOption.value && (
                          <div className="w-2 h-2 bg-gray-800 rounded-full animate-pulse"></div>
                        )}
                      </button>
                    ))}
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Alarm Frequency Field */}
          <FormField
            control={form.control}
            name="frequenceAlarme"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-800 font-medium text-xl">Fréquence d'alarme</FormLabel>
                <FormControl>
                  <select
                    {...field}
                    className="text-md w-full px-4 py-3 bg-white/80 border border-gray-300 rounded-lg focus:border-gray-500 focus:ring-2 focus:ring-gray-200 focus:outline-none transition-all duration-200 text-gray-700"
                  >
                    <option value="30min">Toutes les 30 minutes</option>
                    <option value="1hour">Toutes les heures</option>
                    <option value="2hours">Toutes les 2 heures</option>
                    <option value="3hours">Toutes les 3 heures</option>
                    <option value="6hours">Toutes les 6 heures</option>
                    <option value="12hours">Toutes les 12 heures</option>
                  </select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Form Actions */}
          <div className="flex justify-end gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              className={`px-6 py-2 bg-white/80 hover:bg-gray-50 border-gray-300 text-${color}-700 transition-all duration-200`}
            >
              Annuler
            </Button>
            <Button
              type="submit"
              className={`px-6 py-2  text-white transition-all duration-200 shadow-md hover:shadow-lg`}
            >
              Ajouter
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}

export function MemoDialog() {
  const { memoDialog } = useAcceuilDialogs()
  const [dialogColor, setDialogColor] = useState('yellow')

  const handleFormSubmit = (data: MemoFormData) => {

    const stored = JSON.parse(localStorage.getItem('memos') || '[]')

    const id = Date.now().toString()
    const intervalMap: Record<string, number> = {
      '30min': 30 * 60 * 1000,
      '1hour': 60 * 60 * 1000,
      '2hours': 2 * 60 * 60 * 1000,
      '3hours': 3 * 60 * 60 * 1000,
      '6hours': 6 * 60 * 60 * 1000,
      '12hours': 12 * 60 * 60 * 1000,
    }

    const newMemo = {
      id,
      titre: data.titre,
      description: data.description,
      couleur: data.couleur,
      intervalMs: intervalMap[data.frequenceAlarme],
      lastShown: 0,
    }

    showMemoToast(newMemo)


    const updatedMemos = [...stored, newMemo]
    localStorage.setItem('memos', JSON.stringify(updatedMemos))

    // Show toast immediately
    // console.log(newMemo)

    // Handle form submission
    console.log('Form submitted:', data)
    memoDialog.setIsOpen(false)
  }

  const handleCancel = () => {
    memoDialog.setIsOpen(false)
  }

  const currentColorConfig = colorOptions.find(c => c.value === dialogColor) || colorOptions[0]

  return (
    <Dialog open={memoDialog.isOpen} onOpenChange={memoDialog.setIsOpen}>
      <DialogContent className={`w-xl ${currentColorConfig.dialogBg} transition-all duration-300 ease-in-out border-0 shadow-2xl`}>
        <DialogHeader className="pb-4">
          <DialogTitle className="text-2xl font-bold text-gray-800 text-center">
            📝 Nouveau Mémo
          </DialogTitle>
        </DialogHeader>

        <MemoForm 
          onSubmit={handleFormSubmit} 
          onCancel={handleCancel} 
          color={dialogColor} 
          handleColorChange={(color: string) => setDialogColor(color)} 
        />
      </DialogContent>
    </Dialog>
  )
}