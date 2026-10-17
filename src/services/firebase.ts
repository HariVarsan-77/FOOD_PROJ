import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const fallbackConfig = {
  apiKey: "AIzaSyA404AcaH7V-MuJvCKCRPnK88KMFxUpkH4",
  authDomain: "food-proj-8a9cc.firebaseapp.com",
  projectId: "food-proj-8a9cc",
  storageBucket: "food-proj-8a9cc.firebasestorage.app",
  messagingSenderId: "462082374468",
  appId: "1:462082374468:web:d3cde1e343eba26c64b511",
  measurementId: "G-WWZXXWKNFY",
};

export const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || fallbackConfig.apiKey,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || fallbackConfig.authDomain,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || fallbackConfig.projectId,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || fallbackConfig.storageBucket,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || fallbackConfig.messagingSenderId,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || fallbackConfig.appId,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID || fallbackConfig.measurementId,
};

export function isFirebaseConfigured(): boolean {
  return Boolean(firebaseConfig.apiKey && firebaseConfig.projectId);
}

export function getDb() {
  if (!isFirebaseConfigured()) {
    return null;
  }
  const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
  return getFirestore(app);
}
