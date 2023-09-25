// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth,GoogleAuthProvider} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCH3tZCxqz2r51U3iU8kWYQ31WyNc9HvX4",
  authDomain: "socialmedia-cd534.firebaseapp.com",
  projectId: "socialmedia-cd534",
  storageBucket: "socialmedia-cd534.appspot.com",
  messagingSenderId: "1005088543301",
  appId: "1:1005088543301:web:70da198d288bd70f62492c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider =new GoogleAuthProvider();
export const db = getFirestore(app);