// Lazy init Firebase app and provide getters per service to avoid importing whole SDK
let _app = null;
const cache = {};

const firebaseConfig = {
        apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
        authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
        databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL,
        projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
        storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
        messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
        appId: import.meta.env.VITE_FIREBASE_APP_ID,
        measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
};

async function initApp() {
    if (_app) return _app;
    const { initializeApp } = await import('firebase/app');
    _app = initializeApp(firebaseConfig);
    return _app;
}

export async function getAuthInstance() {
    if (cache.auth) return cache.auth;
    const app = await initApp();
    const { getAuth } = await import('firebase/auth');
    const auth = getAuth(app);
    // Automatic anonymous sign-in removed to prevent 400 (Bad Request) errors
    // if the "Anonymous" provider is not enabled in Firebase Console.
    /*
    const { onAuthStateChanged, signInAnonymously } = await import('firebase/auth');
    try {
        onAuthStateChanged(auth, (user) => {
            if (!user) {
                signInAnonymously(auth).catch(() => {});
            }
        });
    } catch (e) {
        // ignore
    }
    */
    cache.auth = auth;
    return auth;
}

export async function getDatabaseInstance() {
    if (cache.database) return cache.database;
    const app = await initApp();
    const { getDatabase } = await import('firebase/database');
    const database = getDatabase(app);
    cache.database = database;
    return database;
}

export async function getFirestoreInstance() {
    if (cache.firestore) return cache.firestore;
    const app = await initApp();
    const { getFirestore } = await import('firebase/firestore');
    const firestore = getFirestore(app);
    cache.firestore = firestore;
    return firestore;
}

export async function getStorageInstance() {
    if (cache.storage) return cache.storage;
    const app = await initApp();
    const { getStorage } = await import('firebase/storage');
    const storage = getStorage(app);
    cache.storage = storage;
    return storage;
}

export async function getAnalyticsInstance() {
    if (cache.analytics) return cache.analytics;
    const app = await initApp();
    try {
        const { getAnalytics } = await import('firebase/analytics');
        const analytics = getAnalytics(app);
        cache.analytics = analytics;
        return analytics;
    } catch (e) {
        return null;
    }
}

