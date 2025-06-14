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
import React, { Dispatch, SetStateAction } from 'react'
import {  useForm } from 'react-hook-form'


export default function AddTaskDialog() {
  const { addTaskDialog } = useAcceuilDialogs()

  return (
    <Dialog open={addTaskDialog.isOpen} onOpenChange={addTaskDialog.setIsOpen}>
      <DialogContent>
        <DialogHeader className='py-4'>
          <DialogTitle>Taches</DialogTitle>
        </DialogHeader>
        <AddTaskForm />
      </DialogContent>
    </Dialog>
  )
}

function AddTaskForm() {
  const form = useForm()

  const handleDateSelect = (date: Date | undefined) => {
    if (date) {
      form.setValue("time", date)
    }
  }

  function handleTimeChange(type: "hour" | "minute", value: string) {
    const currentDate = form.getValues("time") || new Date()
    let newDate = new Date(currentDate)

    if (type === "hour") {
      const hour = parseInt(value, 10)
      newDate.setHours(hour)
    } else if (type === "minute") {
      newDate.setMinutes(parseInt(value, 10))
    }

    form.setValue("time", newDate)
  }

  return (
    <Form {...form}>
      <form className='space-y-4'>
        <FormField 
          control={form.control}
          name="title"
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
            name="category"
            render={({ field }) => (
              <FormItem className='w-full'>
                <FormLabel>Categorie</FormLabel>
                <Select>
                  <SelectTrigger className='w-full'>
                    <SelectValue placeholder='Selectionez une categoire' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value='administrative'>Administrative</SelectItem>
                      <SelectItem value='clinique'>Clinique</SelectItem>
                      <SelectItem value='comptable'>Comptable</SelectItem>
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
                <Select>
                  <SelectTrigger className='w-full'>
                    <SelectValue placeholder='Selectionez une categoire' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value='a_faire'>A faire</SelectItem>
                      <SelectItem value='en_cours'>En cours</SelectItem>
                      <SelectItem value='terminer'>Terminer</SelectItem>
                      <SelectItem value='annulle'>Annulee</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="time"
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
          name="required"
          render={({ field }) => (
            <FormItem className='w-full'>
              <FormLabel>Requerant</FormLabel>
              <FormControl>
                <Select>
                  <SelectTrigger className='w-full'>
                    <SelectValue placeholder='Selectionez un requerant' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="1">value 1</SelectItem>
                      <SelectItem value="2">value 2</SelectItem>
                      <SelectItem value="3">value 3</SelectItem>
                      <SelectItem value="4">value 4</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </FormControl>
            </FormItem>
          )}
        />

        <FormField 
          control={form.control} 
          name="executant"
          render={({ field }) => (
            <FormItem className='w-full'>
              <FormLabel>Executant</FormLabel>
              <FormControl>
                <Select>
                  <SelectTrigger className='w-full'>
                    <SelectValue placeholder='Selectionez un executant' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="1">value 1</SelectItem>
                      <SelectItem value="2">value 2</SelectItem>
                      <SelectItem value="3">value 3</SelectItem>
                      <SelectItem value="4">value 4</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </FormControl>
            </FormItem>
          )}
        />

        <div className='w-full flex flex-row justify-end items-center space-x-2'>
          <Button>Sauvegarder</Button>
          <Button variant={"outline"}>Annuler</Button>
        </div>
      </form>
    </Form>
  )
}
