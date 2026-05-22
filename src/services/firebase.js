import { initializeApp } from 'firebase/app';
import { getAuth, signInAnonymously } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

let app = null;
let auth = null;
let db = null;
let isFirebaseEnabled = false;

try {
  // Validate presence of required firebase keys
  if (firebaseConfig.apiKey && firebaseConfig.projectId) {
    app = initializeApp(firebaseConfig);
    auth = getAuth(app);
    db = getFirestore(app);
    isFirebaseEnabled = true;
    console.log("Firebase initialized successfully.");
  } else {
    console.warn("Firebase configuration keys are missing. Using local storage fallbacks.");
  }
} catch (error) {
  console.error("Firebase initialization failed:", error);
}

/**
 * Perform anonymous authentication in Firebase.
 * Returns the authenticated user object or null if failed/disabled.
 */
export async function getAnonymousUser() {
  if (!isFirebaseEnabled || !auth) return null;
  try {
    const userCredential = await signInAnonymously(auth);
    return userCredential.user;
  } catch (error) {
    console.error("Firebase Anonymous Auth failed:", error);
    return null;
  }
}

export { app, auth, db, isFirebaseEnabled };
