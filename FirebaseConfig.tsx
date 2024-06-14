// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider} from "firebase/auth";
import {getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDA-0FDe1mFw-9HKwqENxWWT7mMI3Ebzr4",
  authDomain: "pawtential-d1b22.firebaseapp.com",
  projectId: "pawtential-d1b22",
  storageBucket: "pawtential-d1b22.appspot.com",
  messagingSenderId: "446504650271",
  appId: "1:446504650271:web:0e9731262206f9184cf72a",
  measurementId: "G-VWMQZLNCNJ"
};


// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(app);
export const FIREBASE_DB = getFirestore(app);
export const GOOGLE_AUTH = new GoogleAuthProvider();