"use client"

import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import Link from 'next/link'
import React from 'react'
import { useForm } from 'react-hook-form'

export default function RegisterPage() {
  return (
    <div className="h-full bg-blue-500/30 flex flex-col items-center justify-center">
      <div className="bg-white w-[400px] h-fit p-10 shadow-xl rounded-md flex flex-col space-y-4">

        <RegisterForm />

        <div className="relative">
          <span className="absolute top-0 left-0 -translate-y-1/2 block border-1 w-full bg-gray-600"></span>
          <span className="absolute top-0 left-1/2 -translate-y-1/2 -translate-x-1/2 bg-white text-md text-gray-400 px-2">Ou continuer avec</span>
        </div>

        <div className='flex flex-row items-center justify-between'>
          <Button className='w-49/100 rounded-xl' variant={'outline'}>Google</Button>
          <Button className='w-49/100 rounded-xl' variant={'outline'}>Facebook</Button>
        </div>

        <div className='w-full flex justify-center items-center'>
          <p className='text-md'>
            Pas encore de compte ? 
            <Link href="login" className='text-primary hover:underline transition-300'> S'inscrire</Link>
          </p>
        </div>
      </div>
    </div>
  )
}



function RegisterForm() {
  const form = useForm()
  return (
    <Form { ...form }>
      <form className="flex flex-col space-y-4">
        <FormField
          control={form.control}
          name='username'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nom utilisateur</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField 
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Mot de passe</FormLabel>
              <FormControl>
                <Input {...field} type='password' />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField 
          control={form.control}
          name="confirm_password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirmer le Mot de passe</FormLabel>
              <FormControl>
                <Input {...field} type='password' />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button className="bg-primary text-primary-foreground w-full">S'inscrire</Button>
      </form>
    </Form>
  )
}
