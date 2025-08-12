// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCUYEBK79RlMZQf-VNYfCP6x1aATY5bjd8",
  authDomain: "porgichatroom.firebaseapp.com",
  projectId: "porgichatroom",
  storageBucket: "porgichatroom.firebasestorage.app",
  messagingSenderId: "472911808034",
  appId: "1:472911808034:web:9a6ab56f350708f3d8ac7b",
  measurementId: "G-NM8F5PJZQW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);