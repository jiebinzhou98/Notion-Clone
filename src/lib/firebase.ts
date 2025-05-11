// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "aideation-yt-c581e.firebaseapp.com",
  projectId: "aideation-yt-c581e",
  storageBucket: "aideation-yt-c581e.firebasestorage.app",
  messagingSenderId: "62131128565",
  appId: "1:62131128565:web:8a33e3e7369175defb5dbc"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const storage = getStorage(app)