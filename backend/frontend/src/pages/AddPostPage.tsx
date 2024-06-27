import { useState } from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { postSchema } from "@/schema"
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
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const categories:string[] = [
    'cars',
    'house',
    'garden',
    'electronisc',
    'for free',
    'sport',
    'for babies',
    'books',
    'cosmetics',
    'fashion',  
    'for animals',
]

import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useNavigate } from 'react-router-dom'
import api from '@/api'
import { ACCES_TOKEN } from '@/constans'

const AddPostPage = () => {

  const [error, setError] = useState('')
  const [file, setFile] = useState<File | null>(null)
  const navigate = useNavigate()

  const form = useForm({
    resolver: zodResolver(postSchema),
    defaultValues: {
      title:"",
      category:"",
      description:"",
      town:"",
      telNumber:"",
      email:"",
      price:""
    },
  })

  const handleOnChange = (e: React.FormEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement & {
      files: FileList
    }
    setFile(target.files[0])
  }
  
  const onSubmit = async (values: z.infer<typeof postSchema>) => {
    try {
      const formData = new FormData();
      formData.append("title", values.title);
      formData.append("category", values.category);
      formData.append("body", values.description);
      formData.append("town", values.town);
      formData.append("number", values.telNumber);
      formData.append("email", values.email);
      formData.append("price", values.price);
      if (file) {
        formData.append("image", file);
      }
      
      const token = localStorage.getItem(ACCES_TOKEN)
      const res = await api.post('/api/posts/new-post/',formData, { 
        
        headers:{
          Authorization: `Bearer ${token}`
        }
      })
      const result = res.data
      console.log(result)
      if (res.status < 200 || res.status > 299) {
        setError(result.data.detail)
      } else {
        navigate('/')
      }
    } catch(error) {
      console.log(error)
    }
  };
  
    

  return (
    <div className='bg-slate-900 w-screen h-screen+100px flex justify-center align-middle'>
        
        <Card className='lg:w-2/4 md:w-2/3 '>
          <CardHeader className='flex justify-center'>
              <CardTitle className='text-center font-bold text-3xl'>
              </CardTitle>
              <CardDescription className='text-center text-md'>
              </CardDescription>
              <CardContent>
                <Form {...form}>
                  <h1>{error}</h1>
                  <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6' >
                    <div className='space-y-4'>

                      <FormField
                      control={form.control}
                      name='title'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Title</FormLabel>
                          <FormControl>
                            <Input {...field} type='text' placeholder='Post title'/>
                          </FormControl>
                          <FormMessage/>
                        </FormItem>
                      )}
                      />

                      <FormField
                        control={form.control}
                        name="category"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Category</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select category" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {
                                  categories.map((category) => (
                                    <SelectItem key={category} value={category}>{category}</SelectItem>
                                  ))
                                }
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                      control={form.control}
                      name='description'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Description</FormLabel>
                          <FormControl>
                            <Textarea {...field} placeholder='Write here important informations for this post' />
                          </FormControl>
                          <FormMessage/>
                        </FormItem>
                      )}
                      />
                      <FormField
                      control={form.control}
                      name='town'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Town</FormLabel>
                          <FormControl>
                            <Input {...field} type='text' placeholder='Write here town where u selling item'/>
                          </FormControl>
                          <FormMessage/>
                        </FormItem>
                      )}
                      />

                      <FormItem>
                      <FormLabel>Item Photos</FormLabel>
                        <Input onChange={handleOnChange} className='hover:bg-slate-200' name='image' type='file'></Input>
                      </FormItem>

                      <FormField
                        control={form.control}
                        name='price'
                        render={({ field }) => (
                          <FormItem className='mt-6'>
                            <FormLabel>price</FormLabel>
                            <FormControl>
                              <Input {...field} type='number' placeholder='0'/>
                            </FormControl>
                            <FormMessage/>
                          </FormItem>
                        )}
                        />
                      
                      <div className='bg-slate-100 p-5 rounded-lg'>
                        <h1 className='mb-1 text-lg'>Contact details</h1>
                        <p className="text-sm mb-4">at least one required</p>
                        <FormField
                        control={form.control}
                        name='telNumber'
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Phone Number</FormLabel>
                            <FormControl>
                              <Input {...field} type='text' placeholder='123-123-123'/>
                            </FormControl>
                            <FormMessage/>
                          </FormItem>
                        )}
                        />
                        <FormField
                        control={form.control}
                        name='email'
                        render={({ field }) => (
                          <FormItem className='mt-6'>
                            <FormLabel>Email adress</FormLabel>
                            <FormControl>
                              <Input {...field} type='email' placeholder='janek@gmail.com'/>
                            </FormControl>
                            <FormMessage/>
                          </FormItem>
                        )}
                        />
                      </div>
                    </div>
                    <Button type='submit' className='w-full'>
                      Post
                    </Button>
                  </form>
                </Form>
              </CardContent>
          </CardHeader>
        </Card>
        
        
    </div>
  )
}

export default AddPostPage