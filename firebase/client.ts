import { initializeApp, getApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyCEDsxuYnlj5ugmGkKJdVe0_zjmV0250fs",
  authDomain: "prepwise-3bbfb.firebaseapp.com",
  projectId: "prepwise-3bbfb",
  storageBucket: "prepwise-3bbfb.firebasestorage.app",
  messagingSenderId: "764770576110",
  appId: "1:764770576110:web:5c512a395784173808f5ff",
  measurementId: "G-QLQK5Y5M40"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
// const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const db = getFirestore(app);