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

// Zod schema for memo form validation
const memoSchema = z.object({
  titre: z.string().min(1, "Le titre est requis"),
  description: z.string().min(1, "La description est requise"),
})

type MemoFormData = z.infer<typeof memoSchema>

function MemoForm({ onSubmit, onCancel }: { onSubmit: (data: MemoFormData) => void; onCancel: () => void }) {
  const form = useForm<MemoFormData>({
    resolver: zodResolver(memoSchema),
    defaultValues: {
      titre: "",
      description: "",
    },
  })

  const handleFormSubmit = (data: MemoFormData) => {
    console.log("Memo data:", data)
    onSubmit(data)
  }

  return (
    <div className="bg-yellow-50 p-2 rounded-lg">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-6">
          {/* Title Field */}
          <FormField
            control={form.control}
            name="titre"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-700">Titre</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    className="bg-white border-gray-300 focus:border-yellow-500 focus:ring-yellow-500"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Description Field */}
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-700">Description du mémo</FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    className="min-h-[120px] resize-none bg-white border-gray-300 focus:border-yellow-500 focus:ring-yellow-500"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Action Buttons */}
          <div className="flex justify-end gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              className="px-6 bg-white hover:bg-gray-50 border-gray-300"
            >
              Annuler
            </Button>
            <Button type="submit" className="px-6 bg-yellow-600 hover:bg-yellow-700 text-white">
              Sauvegarder
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}

export function MemoDialog() {
  const { memoDialog } = useAcceuilDialogs(

  )
  const handleFormSubmit = (data: MemoFormData) => {

  }

  const handleCancel = () => {

  }

  return (
    <Dialog open={memoDialog.isOpen} onOpenChange={memoDialog.setIsOpen}>
      <DialogContent className="w-xl bg-yellow-50">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-gray-800">Mémos</DialogTitle>
        </DialogHeader>

        <MemoForm onSubmit={handleFormSubmit} onCancel={handleCancel} />
      </DialogContent>
    </Dialog>
  )
}
