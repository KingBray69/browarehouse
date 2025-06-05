// -----------------------------
// Initialize Firebase CLIENT SDK
// -----------------------------
import { initializeApp, getApps, getApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// All keys beginning with NEXT_PUBLIC_ will be injected at build time.
// Make sure they exist in .env.local (and in Vercel’s Environment Variables).
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Initialize or reuse existing Firebase App
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// We only need Storage on the client side to upload images in the Admin UI
const storage = getStorage(app);

export { storage };