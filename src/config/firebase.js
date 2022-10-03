import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const ENV = import.meta.env;

const firebaseConfig = {
    apiKey: ENV.VITE_FIREBASE_API_KEY,
    authDomain: ENV.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: ENV.VITE_FIREBASE_PROJECT_ID,
    storageBucket: ENV.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: ENV.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: ENV.VITE_FIREBASE_APP_ID,
};

const firebase = initializeApp(firebaseConfig);
export const auth = getAuth(firebase);
export const db = getFirestore(firebase);