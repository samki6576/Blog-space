import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAXAtVpeBWpCLJIL2cHAX-xbIFyCY9kF2E",
  authDomain: "track-3447a.firebaseapp.com",
  projectId: "track-3447a",
  storageBucket: "track-3447a.firebasestorage.app",
  messagingSenderId: "63403525240",
  appId: "1:63403525240:web:f8736056791bfbe195198d"
};

// Initialize Firebase only on client side
let app;
let auth;
let db;
let storage;

if (typeof window !== 'undefined') {
  app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);
  auth = getAuth(app);
  db = getFirestore(app);
  storage = getStorage(app);
}

export { auth, db, storage };