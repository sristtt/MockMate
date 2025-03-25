import { cert, getApps, initializeApp } from "firebase-admin/app"

const intiFireBaseAdmin = ()=>{
    const apps = getApps();
    if(!apps.length){
        initializeApp({
            credential:cert({
                projectId:process.env.FIREBASE_PROJECT_ID,
                clientEmail:
            })
        })
    }
}