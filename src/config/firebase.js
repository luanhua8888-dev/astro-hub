import { initializeApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

// Check if Firebase environment variables are configured
const isFirebaseConfigured = () => {
    return !!(
        process.env.NEXT_PUBLIC_FIREBASE_API_KEY &&
        process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN &&
        process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID &&
        process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET &&
        process.env.NEXT_PUBLIC_FIREBASE_APP_ID
    );
};

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || 'demo-api-key',
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || 'demo-project.firebaseapp.com',
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || 'demo-project',
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || 'demo-project.appspot.com',
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || '123456789',
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || '1:123456789:web:abcdef',
    measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID || 'G-XXXXXXXXXX',
};

// Initialize Firebase only if it hasn't been initialized yet
let app = null;
let auth = null;
let storage = null;

try {
    if (getApps().length === 0) {
        app = initializeApp(firebaseConfig);
    } else {
        app = getApps()[0];
    }

    // Initialize Firebase Authentication
    auth = getAuth(app);

    // Initialize Firebase Storage
    storage = getStorage(app);
} catch (error) {
    console.warn('Firebase initialization failed:', error.message);
    console.warn('Firebase features will be disabled. Please configure environment variables.');
}

export { auth, storage, isFirebaseConfigured };
export default app;
