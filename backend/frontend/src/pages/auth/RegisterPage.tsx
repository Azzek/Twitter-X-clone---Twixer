import { useState } from 'react'
import FormWrapper from './FormWrapper'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { registerSchema } from "@/schema"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useNavigate } from 'react-router-dom'
import Cookies from 'universal-cookie'

const cookies = new Cookies

const RegisterPage = () => {

  const [error, setError] = useState('')
  const navigate = useNavigate()

  const form = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: "",
      email:"",
      password: "",
      confirmPassword:""
    },
  })
  
  function onSubmit(values: z.infer<typeof registerSchema>) {
    fetch('/api/register/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "X-CSRFToken": cookies.get("csrftoken"),
      },
      credentials: 'same-origin',
      body: JSON.stringify({
        username: values.username,
        password: values.password,
        email: values.email,
      }),
    })
    .then((res) => res.json().then(data => ({ status: res.status, body: data })))
    .then(({ status, body }) => {
      if (status >= 200 && status <= 299) {
        navigate('/login')
      } else if (status == 400) {
        setError(body.detail)
      } else {
        setError('Unexpected error');
      }
    })
    .catch((err) => {
      setError('Something went wrong');
      console.log(err);
    });
  }
    

  return (
    <div className='bg-slate-900 w-screen h-screen flex justify-center align-middle items-center'>
        <FormWrapper title='Register' label='Create an account' backButtonLabel='Already have an account? Login here' backButtonHref='/login'>
            <Form {...form}>
            <h1>{error}</h1>
              <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
                <div className='space-y-4'>

                  <FormField
                  control={form.control}
                  name='username'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Username</FormLabel>
                      <FormControl>
                        <Input {...field} type='text' placeholder='Andrew'/>
                      </FormControl>
                      <FormMessage/>
                    </FormItem>
                  )}
                  />
                  
                  <FormField
                  control={form.control}
                  name='email'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input {...field} type='email' placeholder='abc@gmail.com'/>
                      </FormControl>
                      <FormMessage/>
                    </FormItem>
                  )}
                  />

                  <FormField
                  control={form.control}
                  name='password'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input {...field} type='password' placeholder=''/>
                      </FormControl>
                      <FormMessage/>
                    </FormItem>
                  )}
                  />

                  <FormField
                  control={form.control}
                  name='confirmPassword'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirm Password</FormLabel>
                      <FormControl>
                        <Input {...field} type='password' placeholder=''/>
                      </FormControl>
                      <FormMessage/>
                    </FormItem>
                  )}
                  />

                </div>
                <Button type='submit' className='w-full'>
                  Register
                </Button>
              </form>
            </Form>
        </FormWrapper>
    </div>
  )
}

export default RegisterPage