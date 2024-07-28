// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

// TODO : Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCDE-z0h5XsKOhIiEurEK1yY6JuXxzmZRA",
  authDomain: "ai-trip-planner-cc57a.firebaseapp.com",
  projectId: "ai-trip-planner-cc57a",
  storageBucket: "ai-trip-planner-cc57a.appspot.com",
  messagingSenderId: "1003466338552",
  appId: "1:1003466338552:web:334a3f6369863aec954b0d",
  measurementId: "G-79HGY393NT",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
//const analytics = getAnalytics(app);
