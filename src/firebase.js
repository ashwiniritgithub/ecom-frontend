// src/firebase.js
import { initializeApp } from 'firebase/app'; // Firebase initialization
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail, GoogleAuthProvider, signInWithPopup, OAuthProvider } from 'firebase/auth'; // Import authentication methods

// Firebase configuration from Firebase Console
const firebaseConfig = {
    apiKey: "AIzaSyAggw2J2RigWTofv-aAVUtEV7ubRGInKDA",
    authDomain: "e-com-app-2b9a8.firebaseapp.com",
    projectId: "e-com-app-2b9a8",
    storageBucket: "e-com-app-2b9a8.firebasestorage.app",
    messagingSenderId: "551788815093",
    appId: "1:551788815093:web:8825887e75fa1ea73fdbbc",
    measurementId: "G-4DFF097HCR"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get Firebase Auth instance
const auth = getAuth(app);

// Export Firebase methods
export { auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail, GoogleAuthProvider, signInWithPopup, OAuthProvider };
export default app;
