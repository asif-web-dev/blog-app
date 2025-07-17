// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";  
import { getStorage } from "firebase/storage";   
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBElwr-b1dVa910tiLYVA7NSrowIe40YWE",
  authDomain: "blogapp-fe8fd.firebaseapp.com",
  projectId: "blogapp-fe8fd",
  storageBucket: "blogapp-fe8fd.firebasestorage.app",
  messagingSenderId: "199988660512",
  appId: "1:199988660512:web:460605565832bbeb2c6f45",
  measurementId: "G-5P4TJ6BLS1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);