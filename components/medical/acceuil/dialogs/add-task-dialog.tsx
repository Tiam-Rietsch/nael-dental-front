'use client'

import useAcceuilDialogs from '@/hooks/acceuil/useAcceuilDialogs'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { cn } from '@/lib/utils'
import { format } from 'date-fns'
import { CalendarIcon } from 'lucide-react'
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import {  useForm } from 'react-hook-form'
import { User } from '@/lib/auth/type'
import authApi from '@/lib/auth/authApi'
import { CategoriesTacheTodo, StatutsTacheTodo, TacheTodoCreate } from '@/lib/acceuil/types'
import useAuthContext from '@/hooks/auth/useAuthContext'
import tacheTodoApi from '@/lib/acceuil/tacheTodoApi'


export default function AddTaskDialog() {
  const { addTaskDialog } = useAcceuilDialogs()

  return (
    <Dialog open={addTaskDialog.isOpen} onOpenChange={addTaskDialog.setIsOpen}>
      <DialogContent>
        <DialogHeader className='py-4'>
          <DialogTitle>Taches</DialogTitle>
        </DialogHeader>
        <AddTaskForm close={() => addTaskDialog.closeDialog()}/>
      </DialogContent>
    </Dialog>
  )
}

function AddTaskForm({ close }: { close: () => void}) {
  const { currentUser } = useAuthContext()

  const form = useForm({
    defaultValues: {
      titre: '',
      description: '',
      categorie: CategoriesTacheTodo.CLINIQUE,
      statut: StatutsTacheTodo.A_FAIRE,
      echeance: new Date(),
      id_requierant: "",
      id_executant: ""
    }
  })

  const [userList, setUserList] = useState<User[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    authApi.getAllUsers().then(setUserList)
  }, [])

  const handleDateSelect = (date: Date | undefined) => {
    if (date) {
      form.setValue("echeance", date)
    }
  }

  function handleTimeChange(type: "hour" | "minute", value: string) {
    const currentDate = form.getValues("echeance") || new Date()
    let newDate = new Date(currentDate)

    if (type === "hour") {
      const hour = parseInt(value, 10)
      newDate.setHours(hour)
    } else if (type === "minute") {
      newDate.setMinutes(parseInt(value, 10))
    }

    form.setValue("echeance", newDate)
  }

  const onSubmit = async () => {
    setLoading(true)
    const payload: TacheTodoCreate = {...form.getValues(), id_autheur: currentUser?.id.toString() ?? ""}
    await tacheTodoApi.create(payload)
    setLoading(false)
    close()
  }

  return (
    <Form {...form}>
      <form className='space-y-4' onSubmit={form.handleSubmit(onSubmit)}>
        <FormField 
          control={form.control}
          name="titre"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Titre</FormLabel>
              <FormControl>
                <Input {...field}/>
              </FormControl>
            </FormItem>
          )}
        />

        <div className='flex flex-row space-x-2'>
          <FormField 
            control={form.control}
            name="categorie"
            render={({ field }) => (
              <FormItem className='w-full'>
                <FormLabel>Categorie</FormLabel>
                <Select defaultValue={CategoriesTacheTodo.CLINIQUE} value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger className='w-xs'>
                    <SelectValue placeholder='Selectionez une categoire' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value={CategoriesTacheTodo.ADMINISTRATIVE.toString()}>{CategoriesTacheTodo.ADMINISTRATIVE}</SelectItem>
                      <SelectItem value={CategoriesTacheTodo.CLINIQUE.toString()}>{CategoriesTacheTodo.CLINIQUE}</SelectItem>
                      <SelectItem value={CategoriesTacheTodo.COMPTABLE.toString()}>{CategoriesTacheTodo.COMPTABLE}</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />
          <FormField 
            control={form.control}
            name="statut"
            render={({ field }) => (
              <FormItem className='w-full'>
                <FormLabel>Statut</FormLabel>
                <Select defaultValue={StatutsTacheTodo.A_FAIRE} value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger className='w-xs'>
                    <SelectValue placeholder='Selectionez une categoire' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value={StatutsTacheTodo.A_FAIRE}>A faire</SelectItem>
                      <SelectItem value={StatutsTacheTodo.EN_COURS}>En cours</SelectItem>
                      <SelectItem value={StatutsTacheTodo.TERMINEE}>Terminer</SelectItem>
                      <SelectItem value={StatutsTacheTodo.ANNULEE}>Annulee</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="echeance"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Entrez la date et l'heure d'echeance</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "MM/dd/yyyy HH:mm")
                      ) : (
                        <span>MM/DD/YYYY HH:mm</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <div className="sm:flex">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={handleDateSelect}
                      initialFocus
                    />
                    <div className="flex flex-col sm:flex-row sm:h-[300px] divide-y sm:divide-y-0 sm:divide-x">
                      <ScrollArea className="w-64 sm:w-auto">
                        <div className="flex sm:flex-col p-2">
                          {Array.from({ length: 24 }, (_, i) => i)
                            .reverse()
                            .map((hour) => (
                              <Button
                                key={hour}
                                size="icon"
                                variant={
                                  field.value && field.value.getHours() === hour
                                    ? "default"
                                    : "ghost"
                                }
                                className="sm:w-full shrink-0 aspect-square"
                                onClick={() =>
                                  handleTimeChange("hour", hour.toString())
                                }
                              >
                                {hour}
                              </Button>
                            ))}
                        </div>
                        <ScrollBar
                          orientation="horizontal"
                          className="sm:hidden"
                        />
                      </ScrollArea>
                      <ScrollArea className="w-64 sm:w-auto">
                        <div className="flex sm:flex-col p-2">
                          {Array.from({ length: 12 }, (_, i) => i * 5).map(
                            (minute) => (
                              <Button
                                key={minute}
                                size="icon"
                                variant={
                                  field.value &&
                                  field.value.getMinutes() === minute
                                    ? "default"
                                    : "ghost"
                                }
                                className="sm:w-full shrink-0 aspect-square"
                                onClick={() =>
                                  handleTimeChange("minute", minute.toString())
                                }
                              >
                                {minute.toString().padStart(2, "0")}
                              </Button>
                            )
                          )}
                        </div>
                        <ScrollBar
                          orientation="horizontal"
                          className="sm:hidden"
                        />
                      </ScrollArea>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField 
          control={form.control}
          name={"description"}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description de la tache</FormLabel>
              <FormControl>
                <Textarea className='h-[100px]' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField 
          control={form.control} 
          name="id_requierant"
          render={({ field }) => (
            <FormItem className='w-full'>
              <FormLabel>Requerant</FormLabel>
              <FormControl>
                <Select defaultValue={currentUser?.id.toString()} value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger className='w-xs'>
                    <SelectValue placeholder='Selectionez un requerant' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {userList.map((user) => (
                        <SelectItem key={user.id} value={`${user.id}`}>{user.username}</SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </FormControl>
            </FormItem>
          )}
        />

        <FormField 
          control={form.control} 
          name="id_executant"
          render={({ field }) => (
            <FormItem className='w-full'>
              <FormLabel>Executant</FormLabel>
              <FormControl>
                <Select defaultValue={currentUser?.id.toString()} value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger className='w-xs'>
                    <SelectValue placeholder='Selectionez un executant' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {userList.map((user) => (
                        <SelectItem key={user.id} value={`${user.id}`}>{user.username}</SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </FormControl>
            </FormItem>
          )}
        />

        <div className='w-full flex flex-row justify-end items-center space-x-2'>
          <Button disabled={loading}>Sauvegarder</Button>
          <Button disabled={loading} variant={"outline"}>Annuler</Button>
        </div>
      </form>
    </Form>
  )
}
