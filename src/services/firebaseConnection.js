// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB-IVcvEoN85JdfMhyXU0nMKj6JZ9ZBPcE",
  authDomain: "startpn-53ddb.firebaseapp.com",
  projectId: "startpn-53ddb",
  storageBucket: "startpn-53ddb.appspot.com",
  messagingSenderId: "760220250995",
  appId: "1:760220250995:web:279923205127c1168b8b06",
  measurementId: "G-H8JN5C6GJX"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);