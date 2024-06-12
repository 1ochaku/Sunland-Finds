// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// My web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCGdg4QgFRTzujP4elbe5pkXANkuiyOOjg",
  authDomain: "sunland-finds.firebaseapp.com",
  projectId: "sunland-finds",
  storageBucket: "sunland-finds.appspot.com",
  messagingSenderId: "520525709211",
  appId: "1:520525709211:web:83d1c91dc96f4178d56b3e",
  measurementId: "G-GEMB2NZWTC"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);