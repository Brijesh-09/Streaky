import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional


// Initialize Firebase
//@ts-ignore
const app = initializeApp(firebaseConfig);
//@ts-ignore
export const auth = getAuth(app);