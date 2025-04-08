// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: "codechallenge-drivedrop.firebaseapp.com",
  projectId: "codechallenge-drivedrop",
  storageBucket: "codechallenge-drivedrop.firebasestorage.app",
  messagingSenderId: "1029646173810",
  appId: "1:1029646173810:web:ecfa285f320df4d54fa4eb"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };