// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database";

// Konfigurasi Firebase
const firebaseConfig = {
    apiKey: "AIzaSyDtp14SNwsk5cCH7jzfyQv41z3xN_NKAB4",
    authDomain: "my-react-portofolio.firebaseapp.com",
    databaseURL: "https://my-react-portofolio-default-rtdb.firebaseio.com",
    projectId: "my-react-portofolio",
    storageBucket: "my-react-portofolio.appspot.com",
    messagingSenderId: "628166590544",
    appId: "1:628166590544:web:3f604fdf13f6c50a0c1155",
    measurementId: "G-C93R3NFRHQ"
};

// Inisialisasi Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const database = getDatabase(app); // ✅ TAMBAHKAN INI

export { database }; // ✅ EKSPOR DATABASE
