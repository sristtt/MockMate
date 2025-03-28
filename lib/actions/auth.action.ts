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

        return{
            success:true,
            message:'Successfully Created an account.Sign in to go home page'
        }
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

        return {
            success:true,
            message:'Successfully Signed In...'
        }
    } catch (error : any) {
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

export async function getCurrentUser() :Promise<User| null> {
    const cookieStore = await cookies();
    
    const sessionCookie  = cookieStore.get('session')?.value;
    if(!sessionCookie) return null;
    try {
        const decodeclaims = await auth.verifySessionCookie(sessionCookie , true);
        const userReocord = await db.collection('users').doc(decodeclaims.uid).get();
        if(!userReocord.exists) return null;
        return{
            ...userReocord.data(),
            id:userReocord.id
        } as User;
    } catch (error) {
        console.log(error)
        return null
    }
}
export const isAuthenticated  = async()=>{
    const user = await getCurrentUser();

    return !!user;
}

export async function getInterviewByUserId(userid:string):Promise<Interview[]|null>{
    const interviews = await db.collection('interviews')
    .where('userId' , '==' , userid)
    .orderBy('createdAt' , 'desc')
    .get()

    return interviews.docs.map((doc)=>({
        id:doc.id,
        ...doc.data()
    }))as Interview[]
}