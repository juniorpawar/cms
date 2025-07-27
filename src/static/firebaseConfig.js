import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage"


// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: "project-cms-ae6db.firebaseapp.com",
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: "project-cms-ae6db.firebasestorage.app",
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const storage = getStorage(app);

export { storage };