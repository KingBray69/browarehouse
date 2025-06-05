// -----------------------------
// Initialize Firebase ADMIN SDK
// -----------------------------

import admin from "firebase-admin";

if (!admin.apps.length) {
  // The JSON file (serviceAccountKey.json) should live at project root.
  // DO NOT commit it to GitHub. Instead, add it temporarily so that
  // Vercel can read it. After deploying, remove the file from source control.
  const serviceAccount = require("../serviceAccountKey.json");

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  });
}

const db = admin.firestore();
const bucket = admin.storage().bucket();

export { db, bucket };