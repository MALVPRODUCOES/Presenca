// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyATbfmmNZhhKwFNwww72AyBN39bkMg8rB8",
  authDomain: "aniversario-2c745.firebaseapp.com",
  projectId: "aniversario-2c745",
  storageBucket: "aniversario-2c745.firebasestorage.app",
  messagingSenderId: "902481257476",
  appId: "1:902481257476:web:c3003195170430e196c151",
  measurementId: "G-X9HFVLN8C3"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
