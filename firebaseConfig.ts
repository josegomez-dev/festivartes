import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyCBwDxr5GtqyZc2WT800atkzOy8_VBWLNA",
    authDomain: "festivartes-76b25.firebaseapp.com",
    projectId: "festivartes-76b25",
    storageBucket: "festivartes-76b25.firebasestorage.app",
    messagingSenderId: "393343832329",
    appId: "1:393343832329:web:13cef8d76d4ca5cdb583d8",
    measurementId: "G-2NGGLHDCV6"
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);

export { auth, app };
