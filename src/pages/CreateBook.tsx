// import React from 'react'
// import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../components/ui/form'
// import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '../components/ui/breadcrumb'
// import { Link } from 'react-router'
// import { Button } from '../components/ui/button'
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
// import { Input } from '../components/ui/input'
// import { Textarea } from '../components/ui/textarea'

// const CreateBook = () => {
//   return (
//     <section>
//       <Form {...form}>
//         <form >
//           <div className="flex items-center justify-between">
//             <Breadcrumb>
//               <BreadcrumbList>
//                 <BreadcrumbItem>
//                   <BreadcrumbLink href="/dashboard/home">Home</BreadcrumbLink>
//                 </BreadcrumbItem>
//                 <BreadcrumbSeparator />
//                 <BreadcrumbItem>
//                   <BreadcrumbLink href="/dashboard/books">Books</BreadcrumbLink>
//                 </BreadcrumbItem>
//                 <BreadcrumbSeparator />
//                 <BreadcrumbItem>
//                   <BreadcrumbPage>Create</BreadcrumbPage>
//                 </BreadcrumbItem>
//               </BreadcrumbList>
//             </Breadcrumb>
//             <div className="flex items-center gap-4">
//               <Link to="/dashboard/books">
//                 <Button variant={'outline'}>
//                   <span className="ml-2">Cancel</span>
//                 </Button>
//               </Link>
//               <Button type="submit" >
//                 <span className="ml-2">Submit</span>
//               </Button>
//             </div>
//           </div>
//           <Card className="mt-6">
//             <CardHeader>
//               <CardTitle>Create a new book</CardTitle>
//               <CardDescription>
//                 Fill out the form below to create a new book.
//               </CardDescription>
//             </CardHeader>
//             <CardContent>
//               <div className="grid gap-6">
//                 <FormField
//                   control={form.control}
//                   name="title"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel>Title</FormLabel>
//                       <FormControl>
//                         <Input type="text" className="w-full" {...field} />
//                       </FormControl>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />

//                 <FormField
//                   control={form.control}
//                   name="genre"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel>Genre</FormLabel>
//                       <FormControl>
//                         <Input type="text" className="w-full" {...field} />
//                       </FormControl>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />

//                 <FormField
//                   control={form.control}
//                   name="description"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel>Description</FormLabel>
//                       <FormControl>
//                         <Textarea className="min-h-32" {...field} />
//                       </FormControl>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />

//                 <FormField
//                   control={form.control}
//                   name="coverImage"
//                   render={() => (
//                     <FormItem>
//                       <FormLabel>Cover Image</FormLabel>
//                       <FormControl>
//                         <Input
//                           type="file"
//                           className="w-full"
//                           {...coverImageRef}
//                         />
//                       </FormControl>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />

//                 <FormField
//                   control={form.control}
//                   name="file"
//                   render={() => (
//                     <FormItem>
//                       <FormLabel>Book File</FormLabel>
//                       <FormControl>
//                         <Input
//                           type="file"
//                           className="w-full"
//                           {...fileRef}
//                         />
//                       </FormControl>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />
//               </div>
//             </CardContent>
//           </Card>
//         </form>
//       </Form>
//     </section>)
// }

// export default CreateBook

import React, { useRef } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../components/ui/form"

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../components/ui/breadcrumb"

import { Link } from "react-router"
import { Button } from "../components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card"
import { Input } from "../components/ui/input"
import { Textarea } from "../components/ui/textarea"


// -------------------------
// ✔ ZOD VALIDATION SCHEMA
// -------------------------
const createBookSchema = z.object({
  title: z.string().min(1, "Title is required"),
  genre: z.string().min(1, "Genre is required"),
  description: z.string().min(1, "Description is required"),
})

// -------------------------
// ✔ COMPONENT START
// -------------------------
const CreateBook = () => {

  // File inputs: useRef (NOT react-hook-form)
  const coverImageRef = useRef<HTMLInputElement | null>(null)
  const fileRef = useRef<HTMLInputElement | null>(null)

  // ✔ form instance
  const form = useForm<z.infer<typeof createBookSchema>>({
    resolver: zodResolver(createBookSchema),
    defaultValues: {
      title: "",
      genre: "",
      description: "",
    },
  })

  // ✔ Submit handler
  const onSubmit = (data: any) => {
    const coverImage = coverImageRef.current?.files?.[0]
    const bookFile = fileRef.current?.files?.[0]

    console.log("Form data:", data)
    console.log("Cover image:", coverImage)
    console.log("Book file:", bookFile)
  }

  return (
    <section>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex items-center justify-between">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/dashboard/home">Home</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink href="/dashboard/books">Books</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>Create</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>

            <div className="flex items-center gap-4">
              <Link to="/dashboard/books">
                <Button variant="outline">
                  <span className="ml-2">Cancel</span>
                </Button>
              </Link>
              <Button type="submit">
                <span className="ml-2">Submit</span>
              </Button>
            </div>
          </div>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Create a new book</CardTitle>
              <CardDescription>
                Fill out the form below to create a new book.
              </CardDescription>
            </CardHeader>

            <CardContent>
              <div className="grid gap-6">

                {/* TITLE */}
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input {...field} className="w-full" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* GENRE */}
                <FormField
                  control={form.control}
                  name="genre"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Genre</FormLabel>
                      <FormControl>
                        <Input {...field} className="w-full" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* DESCRIPTION */}
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea {...field} className="min-h-32" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* COVER IMAGE */}
                <FormItem>
                  <FormLabel>Cover Image</FormLabel>
                  <FormControl>
                    <Input type="file" ref={coverImageRef} className="w-full" />
                  </FormControl>
                </FormItem>

                {/* BOOK FILE */}
                <FormItem>
                  <FormLabel>Book File</FormLabel>
                  <FormControl>
                    <Input type="file" ref={fileRef} className="w-full" />
                  </FormControl>
                </FormItem>

              </div>
            </CardContent>
          </Card>
        </form>
      </Form>
    </section>
  )
}

export default CreateBook
