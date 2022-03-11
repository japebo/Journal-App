import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"
import { GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyD8y06anb3SlXKH5M4jLZDyaL5CzVAVVdE",
    authDomain: "react-app-curso-ca767.firebaseapp.com",
    projectId: "react-app-curso-ca767",
    storageBucket: "react-app-curso-ca767.appspot.com",
    messagingSenderId: "229659073442",
    appId: "1:229659073442:web:a30ef6c6890cd98e50b0fb"
  };
  
initializeApp(firebaseConfig);

const db = getFirestore();

const googleAuthProvider = new GoogleAuthProvider();

export {
    db,
    googleAuthProvider,
}