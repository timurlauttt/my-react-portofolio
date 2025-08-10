// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Konfigurasi Firebase dari environment variables
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
    measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
};

// Inisialisasi Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const database = getDatabase(app);
const auth = getAuth(app);
const firestore = getFirestore(app);
const storage = getStorage(app);

// Enable anonymous authentication for development
import { signInAnonymously, onAuthStateChanged } from "firebase/auth";

// Auto sign in anonymously for development
const initAuth = async () => {
    try {
        onAuthStateChanged(auth, (user) => {
            if (!user) {
                signInAnonymously(auth).catch((error) => {
                    console.log("Anonymous auth failed:", error);
                });
            }
        });
    } catch (error) {
        console.log("Auth initialization failed:", error);
    }
};

// Initialize anonymous auth
initAuth();

export { database, auth, firestore, storage };
