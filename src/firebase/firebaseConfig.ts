import { initializeApp, FirebaseApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

interface FirebaseConfig {
    apiKey: string
    authDomain: string
    projectId: string
    storageBucket: string
    messagingSenderId: string
    appId: string
}

const firebaseConfig: FirebaseConfig = {
    apiKey: "AIzaSyDpRxoWD4NSjl-97tOQ-wiM1IQ5rUk9B8o",
    authDomain: "landingpage-fc4b6.firebaseapp.com",
    projectId: "landingpage-fc4b6",
    storageBucket: "landingpage-fc4b6.appspot.com",
    messagingSenderId: "208432620017",
    appId: "1:208432620017:web:93ed3b53db8460038ce450"
  };

  export const firebaseApp: FirebaseApp = initializeApp(firebaseConfig)

  export const db = getFirestore(firebaseApp)