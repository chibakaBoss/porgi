// firebaseConfig.ts
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";


const firebaseConfig = {
  apiKey: "AIzaSyCUYEBK79RlMZQf-VNYfCP6x1aATY5bjd8",
  authDomain: "porgichatroom.firebaseapp.com",
  projectId: "porgichatroom",
  storageBucket: "porgichatroom.firebasestorage.app",
  messagingSenderId: "472911808034",
  appId: "1:472911808034:web:9a6ab56f350708f3d8ac7b",
  measurementId: "G-NM8F5PJZQW"
};

// Initialize Firebase only once
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Firestore DB



// Analytics only on browser
let analytics;
if (typeof window !== "undefined") {
  isSupported().then((yes) => {
    if (yes) {
      analytics = getAnalytics(app);
    }
  });
}

export { analytics, app };
