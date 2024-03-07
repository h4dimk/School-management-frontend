// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "school-management-605ab.firebaseapp.com",
  projectId: "school-management-605ab",
  storageBucket: "school-management-605ab.appspot.com",
  messagingSenderId: "640851792402",
  appId: "1:640851792402:web:d26b00cc6927024a37becb",
  measurementId: "G-W15ETQKV0S",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
