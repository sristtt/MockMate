"use client"

import {z} from "zod"
import {zodResolver} from '@hookform/resolvers/zod'
import {useForm} from "react-hook-form";
import { Button } from "@/components/ui/button"
import {Form} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";

const authFormSchema  = (type : FormType)=>{
    return z.object({
        name:type === 'sign-up' ? z.string().min(3) : z.string().optional(),
        email:z.string().email(),
        password:z.string().min(3)
    })
}
interface Props{
    type:'sign-in' | 'sign-up'
}
const AuthForm = ({type}:Props) => {
    const formSchema = authFormSchema(type);

    const isSignIn = type === 'sign-in';
      // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email:"",
      password:""
    },
  })
 
  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    try {
        
    } catch (error) {
        console.log(error);
        toast.error("There was an error while")
    }
  }
  return (
    <div className="card-border lg:min-w-[566px]">
        <div className="flex flex-col gap-6 card py-14 px-10">
            <div className="flex flex-row gap-2 justify-center">
                <Image src="/logo.svg" alt="logo" width={38} height={38}/> 
                <h2 className="text-primary-100">PrepWise</h2>
        </div>
                <h3>Practice job interview with AI</h3>
     
         <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6 mt-4 form">
       {!isSignIn && <p>Name</p>}
       <p>Email</p>
       <p>Password</p>
        <Button type="submit" className="btn">{isSignIn ? 'Sign In' :'Create an Account'}</Button>
      </form>
    </Form>
    <p className="text-center">
        {isSignIn ? 'No account yet?' :'Have an account already?'}
        <Link href={!isSignIn ? '/sign-in':'/sign-up'} className="font-bold text-user-primary ml-1">
        {!isSignIn ? " Sign in" :" Sign up"}
        </Link>
    </p>
    </div>
       </div>
  )
}

export default AuthForm