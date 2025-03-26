"use server"

import { auth, db } from "@/firebase/admin";
import { cookies } from "next/headers";
const ONE_WEEK = 60*60*24*7
export async function signUp(params : SignUpParams ){
    const {uid , name , email ,password}  = params;
    try {
        const userRecord  = await db.collection('users').doc(uid).get();
        if(userRecord.exists){
            return{
                success:false,
                message:'User already exists. Please sign in instrd'
            }
        }

        await db.collection('users').doc(uid).set({
            name , email , password
        })

    } catch (error : any) {
        console.log(error);
        if(error.code === 'auth/email-already-exists'){
            return {
                success:false,
                message:'This email is already in use'
            }
        }
        return{
            success:false,
            message:'Error while creating user'
        }
    }
 }

export async function signIn(params:SignInParams){
    const {email ,idToken}  =params;
    try {
        const userRecord = await auth.getUserByEmail(email);
        if(!userRecord){
         return {
            success:false,
            message:'User Does not exist. Create an account'
        }   
        }
        await setSessionCookie(idToken)
    } catch (error) {
        console.log(error)
        return {
            success:false,
            message:'Failed to log into an account'
        }
    }
}

 export async function setSessionCookie(idToken:string){
    const cookieStore = await cookies();
    const sessionCookie = await auth.createSessionCookie(idToken , {
        expiresIn: ONE_WEEK*1000
    })
    cookieStore.set('session' , sessionCookie , {
        maxAge:ONE_WEEK,
        httpOnly:true,
        secure:process.env.NODE_ENV==='production',
        path:'/',
        sameSite:'lax'
    })
 }
