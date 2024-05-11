import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: "share-my-place-mern.firebaseapp.com",
    projectId: "share-my-place-mern",
    storageBucket: "share-my-place-mern.appspot.com",
    messagingSenderId: "317830399054",
    appId: "1:317830399054:web:47cc23312f68a76203af1f"
};

export const app = initializeApp(firebaseConfig);