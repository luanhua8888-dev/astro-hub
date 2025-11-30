import { initializeApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyB_EyF6_4oGC9UVPfTHgzDXv0Hn9ox8rfY",
    authDomain: "astro-hub-8edde.firebaseapp.com",
    projectId: "astro-hub-8edde",
    storageBucket: "astro-hub-8edde.firebasestorage.app",
    messagingSenderId: "69487445696",
    appId: "1:69487445696:web:56a5d559ce48cfc8340f25",
    measurementId: "G-9B4B57QCQP"
};

// Initialize Firebase only if it hasn't been initialized yet
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

// Initialize Firebase Authentication
export const auth = getAuth(app);

export default app;
