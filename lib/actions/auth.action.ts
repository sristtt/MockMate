"use server"

import { db } from "@/firebase/admin";

export async function signUp(params : SignUpParams ){
    const {uid , name , email}  = params;
    try {
        const userRecord  = await db.collection('users').doc(uid).get();
        if(userRecord.exists){
            return{
                success:false,
                message:'User already exists. Please sign in instrd'
            }
        }

        await db.collection('users').doc(uid).set({
            name , email
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