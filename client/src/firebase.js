// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-estate-d7085.firebaseapp.com",
  projectId: "mern-estate-d7085",
  storageBucket: "mern-estate-d7085.appspot.com",
  messagingSenderId: "984979605829",
  appId: "1:984979605829:web:97d9001ec05e8f0030562c"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);