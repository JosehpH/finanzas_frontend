// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getStorage} from "firebase/storage"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: "uploadedfiles-ff00f.firebaseapp.com",
    projectId: "uploadedfiles-ff00f",
    storageBucket: "uploadedfiles-ff00f.appspot.com",
    messagingSenderId: "873799552916",
    appId: "1:873799552916:web:a5b52a95eccdfc4a4f8981",
    measurementId: "G-K9MRL3FL6X"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const storage = getStorage(app);