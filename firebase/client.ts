// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBnfjSjrv9omQvbpsGpbiVu9gvP7QIOZGo",
  authDomain: "prepwise-95e9f.firebaseapp.com",
  projectId: "prepwise-95e9f",
  storageBucket: "prepwise-95e9f.firebasestorage.app",
  messagingSenderId: "286044168715",
  appId: "1:286044168715:web:57e1842aa0fed61df29d0e",
  measurementId: "G-R0MYHS0N26"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);