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
import FornField from "./FornField";
import { useRouter } from "next/navigation";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/firebase/client";
import { signIn, signUp } from "@/lib/actions/auth.action";
import { useState } from "react";

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
    const [isLoading, setisLoading] = useState(false);
    const formSchema = authFormSchema(type);
const  router = useRouter();
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
 
 
async  function onSubmit(values: z.infer<typeof formSchema>) {
const {name , email , password}  =values;

    try {
        if(type === 'sign-up'){
            setisLoading(true);
            const createUserAuth =  await createUserWithEmailAndPassword(auth , email , password);
            const result = await signUp({
                uid:createUserAuth.user.uid,
                name:name!,
                email,
                password
            })
            if(!result?.success){
                toast.error(result?.message)
            }
           toast.success("Account created successfully. Please sign in.");
            router.push("/sign-in")
            setisLoading(false);
        }else{
            try {
                setisLoading(true);
                const {email , password}  =values;
                const userCredentials = await signInWithEmailAndPassword(auth , email , password);
                const idToken = await userCredentials.user.getIdToken();
                if(!idToken){
                    toast.error('Something went wrong')
                }
               const res =  await signIn({email , idToken})
               if(!res?.success){
                 toast.error(res?.message)
               }
               
            router.push("/")
            setisLoading(false);
            } catch (error) {
                console.log(error);
                setisLoading(false);
            }
           
        }
    } catch (error) {
        console.log(error);
        toast.error("There was an error while")
        setisLoading(false);
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
       {!isSignIn && <FornField control={form.control} name={"name"} label="Name" placeholder="Your Name"/>}
     <FornField control={form.control} name={"email"} label="Email" placeholder="Your Email" type="email"/>
       <FornField control={form.control} name={"password"} label="Password" placeholder="Your Password" type="password"/>
        <Button type="submit" className="btn" disabled={isLoading}>{isSignIn ? <>{isLoading ? 'Signing in...':'Sign In'}</> :<>{isLoading?'Creating...':'Create an Account'}</>}</Button>
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