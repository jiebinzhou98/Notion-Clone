// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage"
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

export async function uploadFileToFirebase(image_url: string, name: string) {
    try{
        const response = await fetch(image_url)
        const buffer = await response.arrayBuffer()
        const file_name = name.replace(' ','') + Date.now + '.jpeg'
        const storageRef = ref(storage, file_name)
        await uploadBytes(storageRef, buffer, {
            contentType: 'image/jpeg'
        })
        const firebase_url = await getDownloadURL(storageRef)
        return firebase_url
    }catch(error){
        console.error(error)
    }
}