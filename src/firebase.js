// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, doc, getDoc, setDoc, updateDoc, collection, addDoc } from "firebase/firestore"; 

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDuXdo8QuFIQSI3dnStSISR1-w70v_CNXw",
  authDomain: "kompass-4d26e.firebaseapp.com",
  projectId: "kompass-4d26e",
  storageBucket: "kompass-4d26e.appspot.com",
  messagingSenderId: "624994424805",
  appId: "1:624994424805:web:d652df047762b7fc6e410c",
  measurementId: "G-DHP7DDZHJV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db, doc, getDoc, setDoc, updateDoc, collection, addDoc };