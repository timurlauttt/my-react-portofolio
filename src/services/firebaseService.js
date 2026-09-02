import { imageUploadService } from './imageUploadService';

// ---------- Lightweight client-side cache for Firestore reads ----------
// Firestore payload was the #1 PSI issue (5 MB). Cache avoids re-fetching
// on every navigation / re-mount and survives soft navigations.
const CACHE_TTL_MS = 5 * 60 * 1000; // 5 minutes
const _cache = new Map(); // key -> { data, ts }
function getCached(key) {
    const entry = _cache.get(key);
    if (!entry) return null;
    if (Date.now() - entry.ts > CACHE_TTL_MS) { _cache.delete(key); return null; }
    return entry.data;
}
function setCached(key, data) { _cache.set(key, { data, ts: Date.now() }); }

// Defer work until browser is idle (or after a short timeout) so LCP is not blocked.
function onIdle(cb) {
    if ('requestIdleCallback' in window) {
        requestIdleCallback(cb, { timeout: 2000 });
    } else {
        setTimeout(cb, 800);
    }
}

// Read-only helper: Firestore rules allow public reads on every collection below,
// so read paths never need to touch Firebase Auth (avoids loading the auth SDK
// and attempting anonymous sign-in on public pages).
async function getFirestoreOnly() {
    const mod = await import('../firebase');
    return await mod.getFirestoreInstance();
}

// Wrap a Firestore read with cache + idle deferral.
// `key` is the cache key, `fetcher` is an async function that does the actual read.
async function cachedRead(key, fetcher) {
    const cached = getCached(key);
    if (cached) return cached;
    // If browser is still in LCP window, wait for idle before hitting network.
    // We still return a promise so callers can await; just the network is deferred.
    const doFetch = async () => {
        const data = await fetcher();
        setCached(key, data);
        return data;
    };
    // If document is already interactive/complete, fetch immediately (user already scrolled).
    if (document.readyState === 'complete') {
        return doFetch();
    }
    // Defer to idle, but with a 1.2s cap so below-fold sections still populate reasonably fast.
    return new Promise((resolve, reject) => {
        let done = false;
        const run = async () => {
            if (done) return;
            done = true;
            try { resolve(await doFetch()); } catch (e) { reject(e); }
        };
        onIdle(run);
        setTimeout(run, 1200);
    });
}

// Write helper: Firestore rules require request.auth != null for write/delete.
async function getFirebase() {
    const mod = await import('../firebase');
    const firestore = await mod.getFirestoreInstance();
    const auth = await mod.getAuthInstance();
    return { firestore, auth };
}

// Ensure user is authenticated before Firestore write operations
const ensureAuth = async (auth) => {
    if (!auth.currentUser) {
        try {
            const { signInAnonymously } = await import('firebase/auth');
            await signInAnonymously(auth);
        } catch (error) {
            console.warn('Anonymous auth failed, continuing without auth:', error);
        }
    }
};

// Collection names
const COLLECTIONS = {
    ABOUT: 'about',
    SKILLS: 'skills',
    PORTFOLIO: 'portfolio',
    ACTIVITIES: 'activities',
    CONTACT: 'contact',
    SETTINGS: 'settings'
};

// About Service
export const aboutService = {
    getAll: async () => {
        return cachedRead('about', async () => {
            try {
                const firestore = await getFirestoreOnly();
                const { collection, query, orderBy, getDocs } = await import('firebase/firestore/lite');
                const q = query(collection(firestore, COLLECTIONS.ABOUT), orderBy('createdAt', 'desc'));
                const querySnapshot = await getDocs(q);
                return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            } catch (error) {
                console.error('Error fetching about data:', error);
                if (error.code === 'permission-denied') {
                    throw new Error('Permission denied. Please check Firestore rules.');
                }
                throw error;
            }
        });
    },

    getById: async (id) => {
        try {
            const firestore = await getFirestoreOnly();
            const { doc, getDoc } = await import('firebase/firestore/lite');
            const docRef = doc(firestore, COLLECTIONS.ABOUT, id);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                return { id: docSnap.id, ...docSnap.data() };
            }
            return null;
        } catch (error) {
            console.error('Error fetching about item:', error);
            throw error;
        }
    },

    create: async (data) => {
        try {
            const { firestore, auth } = await getFirebase();
            await ensureAuth(auth);
            const aboutData = {
                ...data,
                createdAt: new Date(),
                updatedAt: new Date()
            };
            const { addDoc, collection } = await import('firebase/firestore/lite');
            return await addDoc(collection(firestore, COLLECTIONS.ABOUT), aboutData);
        } catch (error) {
            console.error('Error creating about item:', error);
            if (error.code === 'permission-denied') {
                throw new Error('Permission denied. Please check Firestore rules.');
            }
            throw error;
        }
    },

    update: async (id, data) => {
        try {
            const { firestore, auth } = await getFirebase();
            await ensureAuth(auth);
            const docRef = (await import('firebase/firestore/lite')).doc(firestore, COLLECTIONS.ABOUT, id);
            const updateData = {
                ...data,
                updatedAt: new Date()
            };
            const { updateDoc } = await import('firebase/firestore/lite');
            return await updateDoc(docRef, updateData);
        } catch (error) {
            console.error('Error updating about item:', error);
            throw error;
        }
    },

    delete: async (id) => {
        try {
            // Get document first to check if it has images to delete
            const { firestore, auth } = await getFirebase();
            await ensureAuth(auth);
            const { doc, getDoc } = await import('firebase/firestore/lite');
            const docRef = doc(firestore, COLLECTIONS.ABOUT, id);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                const data = docSnap.data();
                // If document has imagePath, delete the image from storage
                if (data.imagePath) {
                    await imageUploadService.deleteImage(data.imagePath);
                }
            }

            // Delete the document
            const { deleteDoc } = await import('firebase/firestore/lite');
            return await deleteDoc(docRef);
        } catch (error) {
            console.error('Error deleting about item:', error);
            throw error;
        }
    }
};

// Skills Service
export const skillsService = {
    getAll: async () => {
        return cachedRead('skills', async () => {
            const firestore = await getFirestoreOnly();
            const { collection, query, orderBy, getDocs } = await import('firebase/firestore/lite');
            const q = query(collection(firestore, COLLECTIONS.SKILLS), orderBy('createdAt', 'desc'));
            const querySnapshot = await getDocs(q);
            return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        });
    },

    getById: async (id) => {
        const firestore = await getFirestoreOnly();
        const { doc, getDoc } = await import('firebase/firestore/lite');
        const docRef = doc(firestore, COLLECTIONS.SKILLS, id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            return { id: docSnap.id, ...docSnap.data() };
        }
        return null;
    },

    create: async (data) => {
        const { firestore, auth } = await getFirebase();
        await ensureAuth(auth);
        const createData = {
            ...data,
            createdAt: new Date(),
            updatedAt: new Date()
        };
        const { addDoc, collection } = await import('firebase/firestore/lite');
        return await addDoc(collection(firestore, COLLECTIONS.SKILLS), createData);
    },

    update: async (id, data) => {
        const { firestore, auth } = await getFirebase();
        await ensureAuth(auth);
        const { doc, updateDoc } = await import('firebase/firestore/lite');
        const docRef = doc(firestore, COLLECTIONS.SKILLS, id);
        const updateData = {
            ...data,
            updatedAt: new Date()
        };
        return await updateDoc(docRef, updateData);
    },

    delete: async (id) => {
        const { firestore, auth } = await getFirebase();
        await ensureAuth(auth);
        const { doc, deleteDoc } = await import('firebase/firestore/lite');
        const docRef = doc(firestore, COLLECTIONS.SKILLS, id);
        return await deleteDoc(docRef);
    }
};

// Portfolio Service
export const portfolioService = {
    getAll: async () => {
        return cachedRead('portfolio', async () => {
            const firestore = await getFirestoreOnly();
            const { collection, query, orderBy, getDocs } = await import('firebase/firestore/lite');
            const q = query(collection(firestore, COLLECTIONS.PORTFOLIO), orderBy('createdAt', 'desc'));
            const querySnapshot = await getDocs(q);
            return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        });
    },

    getById: async (id) => {
        const firestore = await getFirestoreOnly();
        const { doc, getDoc } = await import('firebase/firestore/lite');
        const docRef = doc(firestore, COLLECTIONS.PORTFOLIO, id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            return { id: docSnap.id, ...docSnap.data() };
        }
        return null;
    },

    create: async (data) => {
        const { firestore, auth } = await getFirebase();
        await ensureAuth(auth);
        const portfolioData = {
            ...data,
            createdAt: new Date(),
            updatedAt: new Date()
        };
        const { addDoc, collection } = await import('firebase/firestore/lite');
        return await addDoc(collection(firestore, COLLECTIONS.PORTFOLIO), portfolioData);
    },

    update: async (id, data) => {
        const { firestore, auth } = await getFirebase();
        await ensureAuth(auth);
        const { doc, updateDoc } = await import('firebase/firestore/lite');
        const docRef = doc(firestore, COLLECTIONS.PORTFOLIO, id);
        const updateData = {
            ...data,
            updatedAt: new Date()
        };
        return await updateDoc(docRef, updateData);
    },

    delete: async (id) => {
        try {
            // Get document first to check if it has images to delete
            const { firestore, auth } = await getFirebase();
            await ensureAuth(auth);
            const { doc, getDoc } = await import('firebase/firestore/lite');
            const docRef = doc(firestore, COLLECTIONS.PORTFOLIO, id);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                const data = docSnap.data();
                // If document has imagePath, delete the image from storage
                if (data.imagePath) {
                    await imageUploadService.deleteImage(data.imagePath);
                }
            }

            // Delete the document
            const { deleteDoc } = await import('firebase/firestore/lite');
            return await deleteDoc(docRef);
        } catch (error) {
            console.error('Error deleting portfolio item:', error);
            throw error;
        }
    }
};

// Activities Service
export const activitiesService = {
    getAll: async () => {
        return cachedRead('activities', async () => {
            const firestore = await getFirestoreOnly();
            const { collection, getDocs } = await import('firebase/firestore/lite');
            const querySnapshot = await getDocs(collection(firestore, COLLECTIONS.ACTIVITIES));
            const docs = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            return docs.sort((a, b) => {
                const ta = a.createdAt?.toDate?.() ?? a.createdAt ?? 0;
                const tb = b.createdAt?.toDate?.() ?? b.createdAt ?? 0;
                return new Date(tb) - new Date(ta);
            });
        });
    },

    getById: async (id) => {
        const firestore = await getFirestoreOnly();
        const { doc, getDoc } = await import('firebase/firestore/lite');
        const docRef = doc(firestore, COLLECTIONS.ACTIVITIES, id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            return { id: docSnap.id, ...docSnap.data() };
        }
        return null;
    },

    create: async (data) => {
        const { firestore, auth } = await getFirebase();
        await ensureAuth(auth);
        const activityData = {
            ...data,
            createdAt: new Date(),
            updatedAt: new Date()
        };
        const { addDoc, collection } = await import('firebase/firestore/lite');
        return await addDoc(collection(firestore, COLLECTIONS.ACTIVITIES), activityData);
    },

    update: async (id, data) => {
        const { firestore, auth } = await getFirebase();
        await ensureAuth(auth);
        const updateData = {
            ...data,
            updatedAt: new Date()
        };
        const { doc, updateDoc } = await import('firebase/firestore/lite');
        const docRef = doc(firestore, COLLECTIONS.ACTIVITIES, id);
        return await updateDoc(docRef, updateData);
    },

    delete: async (id) => {
        const { firestore, auth } = await getFirebase();
        await ensureAuth(auth);
        const { doc, deleteDoc } = await import('firebase/firestore/lite');
        const docRef = doc(firestore, COLLECTIONS.ACTIVITIES, id);
        return await deleteDoc(docRef);
    }
};

// Contact Service
export const contactService = {
    getAll: async () => {
        return cachedRead('contact', async () => {
            const firestore = await getFirestoreOnly();
            const { collection, getDocs } = await import('firebase/firestore/lite');
            const querySnapshot = await getDocs(collection(firestore, COLLECTIONS.CONTACT));
            return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        });
    },

    getById: async (id) => {
        const firestore = await getFirestoreOnly();
        const { doc, getDoc } = await import('firebase/firestore/lite');
        const docRef = doc(firestore, COLLECTIONS.CONTACT, id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            return { id: docSnap.id, ...docSnap.data() };
        }
        return null;
    },

    create: async (data) => {
        const { firestore, auth } = await getFirebase();
        await ensureAuth(auth);
        const { addDoc, collection } = await import('firebase/firestore/lite');
        return await addDoc(collection(firestore, COLLECTIONS.CONTACT), data);
    },

    update: async (id, data) => {
        const { firestore, auth } = await getFirebase();
        await ensureAuth(auth);
        const { doc, updateDoc } = await import('firebase/firestore/lite');
        const docRef = doc(firestore, COLLECTIONS.CONTACT, id);
        return await updateDoc(docRef, data);
    },

    delete: async (id) => {
        const { firestore, auth } = await getFirebase();
        await ensureAuth(auth);
        const { doc, deleteDoc } = await import('firebase/firestore/lite');
        const docRef = doc(firestore, COLLECTIONS.CONTACT, id);
        return await deleteDoc(docRef);
    }
};

// CV Service
export const cvService = {
    // Get current CV info
    get: async () => {
        try {
            const firestore = await getFirestoreOnly();
            const { doc, getDoc } = await import('firebase/firestore/lite');
            const docRef = doc(firestore, COLLECTIONS.SETTINGS, 'cv');
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                return docSnap.data();
            }
            return null;
        } catch (error) {
            console.error('Error fetching CV:', error);
            throw error;
        }
    },

    // Save CV URL (admin pastes URL from Google Drive/Dropbox/etc)
    save: async (url, fileName = 'CV.pdf') => {
        try {
            // Validate URL
            if (!url || typeof url !== 'string') {
                throw new Error('Valid URL is required');
            }

            // Basic URL validation
            try {
                new URL(url);
            } catch {
                throw new Error('Invalid URL format');
            }

            // Save to Firestore
            const cvData = {
                fileName,
                downloadURL: url,
                updatedAt: new Date()
            };

            const { firestore, auth } = await getFirebase();
            await ensureAuth(auth);
            const { doc, setDoc } = await import('firebase/firestore/lite');
            const docRef = doc(firestore, COLLECTIONS.SETTINGS, 'cv');
            await setDoc(docRef, cvData);

            return cvData;
        } catch (error) {
            console.error('Error saving CV URL:', error);
            throw error;
        }
    },

    // Delete CV
    delete: async () => {
        try {
            const cvData = await cvService.get();
            if (!cvData) {
                throw new Error('No CV found');
            }

            // Delete from Firestore
            const { firestore, auth } = await getFirebase();
            await ensureAuth(auth);
            const { doc, deleteDoc } = await import('firebase/firestore/lite');
            const docRef = doc(firestore, COLLECTIONS.SETTINGS, 'cv');
            await deleteDoc(docRef);

            return true;
        } catch (error) {
            console.error('Error deleting CV:', error);
            throw error;
        }
    }
};
