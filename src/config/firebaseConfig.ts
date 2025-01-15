import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { getFirestore } from "firebase/firestore";


// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
    apiKey: "AIzaSyD5LQp5r3QWGceq0r_Vxj3ADUtz9m6HCo4",
    authDomain: "streaky-36a70.firebaseapp.com",
    projectId: "streaky-36a70",
    storageBucket: "streaky-36a70.firebasestorage.app",
    messagingSenderId: "748984888558",
    appId: "1:748984888558:web:b6a591ad055fb99e2417ff",
    measurementId: "G-SKSM8NN2V1"
  };
// Initialize Firebase
//@ts-ignore

const app = initializeApp(firebaseConfig);
//@ts-ignore
export const auth = getAuth(app);
export const db = getFirestore(app)