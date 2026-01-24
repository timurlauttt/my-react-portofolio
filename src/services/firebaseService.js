import { imageUploadService } from './imageUploadService';

// Backwards-compatible helper: return only firestore and auth instances
async function getFirebase() {
    const mod = await import('../firebase');
    const firestore = await mod.getFirestoreInstance();
    const auth = await mod.getAuthInstance();
    return { firestore, auth };
}

// Ensure user is authenticated before Firestore operations
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
        try {
            const firestore = await getFirestoreInstance();
            const auth = await getAuthInstance();
            await ensureAuth(auth);
            const { collection, query, orderBy, getDocs } = await import('firebase/firestore');
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
    },
    
    getById: async (id) => {
        try {
            const firestore = await getFirestoreInstance();
            const auth = await getAuthInstance();
            await ensureAuth(auth);
            const { doc, getDoc } = await import('firebase/firestore');
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
            const firestore = await getFirestoreInstance();
            const auth = await getAuthInstance();
            await ensureAuth(auth);
            const aboutData = {
                ...data,
                createdAt: new Date(),
                updatedAt: new Date()
            };
            const { addDoc, collection } = await import('firebase/firestore');
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
            const firestore = await getFirestoreInstance();
            const auth = await getAuthInstance();
            await ensureAuth(auth);
            const docRef = (await import('firebase/firestore')).doc(firestore, COLLECTIONS.ABOUT, id);
            const updateData = {
                ...data,
                updatedAt: new Date()
            };
            const { updateDoc } = await import('firebase/firestore');
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
            const { doc, getDoc } = await import('firebase/firestore');
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
            const { deleteDoc } = await import('firebase/firestore');
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
        const { firestore, auth } = await getFirebase();
        await ensureAuth(auth);
        const { collection, query, orderBy, getDocs } = await import('firebase/firestore');
        const q = query(collection(firestore, COLLECTIONS.SKILLS), orderBy('createdAt', 'desc'));
        const querySnapshot = await getDocs(q);
        return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    },
    
    getById: async (id) => {
        const { firestore, auth } = await getFirebase();
        await ensureAuth(auth);
        const { doc, getDoc } = await import('firebase/firestore');
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
        const { addDoc, collection } = await import('firebase/firestore');
        return await addDoc(collection(firestore, COLLECTIONS.SKILLS), createData);
    },
    
    update: async (id, data) => {
        const { firestore, auth } = await getFirebase();
        await ensureAuth(auth);
        const { doc, updateDoc } = await import('firebase/firestore');
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
        const { doc, deleteDoc } = await import('firebase/firestore');
        const docRef = doc(firestore, COLLECTIONS.SKILLS, id);
        return await deleteDoc(docRef);
    }
};

// Portfolio Service
export const portfolioService = {
    getAll: async () => {
        const { firestore, auth } = await getFirebase();
        await ensureAuth(auth);
        const { collection, query, orderBy, getDocs } = await import('firebase/firestore');
        const q = query(collection(firestore, COLLECTIONS.PORTFOLIO), orderBy('createdAt', 'desc'));
        const querySnapshot = await getDocs(q);
        return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    },
    
    getById: async (id) => {
        const { firestore, auth } = await getFirebase();
        await ensureAuth(auth);
        const { doc, getDoc } = await import('firebase/firestore');
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
        const { addDoc, collection } = await import('firebase/firestore');
        return await addDoc(collection(firestore, COLLECTIONS.PORTFOLIO), portfolioData);
    },
    
    update: async (id, data) => {
        const { firestore, auth } = await getFirebase();
        await ensureAuth(auth);
        const { doc, updateDoc } = await import('firebase/firestore');
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
            const { doc, getDoc } = await import('firebase/firestore');
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
            const { deleteDoc } = await import('firebase/firestore');
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
        const { firestore, auth } = await getFirebase();
        await ensureAuth(auth);
        const { collection, getDocs } = await import('firebase/firestore');
        const querySnapshot = await getDocs(collection(firestore, COLLECTIONS.ACTIVITIES));
        return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    },
    
    getById: async (id) => {
        const { firestore, auth } = await getFirebase();
        await ensureAuth(auth);
        const { doc, getDoc } = await import('firebase/firestore');
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
        const { addDoc, collection } = await import('firebase/firestore');
        return await addDoc(collection(firestore, COLLECTIONS.ACTIVITIES), data);
    },
    
    update: async (id, data) => {
        const { firestore, auth } = await getFirebase();
        await ensureAuth(auth);
        const { doc, updateDoc } = await import('firebase/firestore');
        const docRef = doc(firestore, COLLECTIONS.ACTIVITIES, id);
        return await updateDoc(docRef, data);
    },
    
    delete: async (id) => {
        const { firestore, auth } = await getFirebase();
        await ensureAuth(auth);
        const { doc, deleteDoc } = await import('firebase/firestore');
        const docRef = doc(firestore, COLLECTIONS.ACTIVITIES, id);
        return await deleteDoc(docRef);
    }
};

// Contact Service
export const contactService = {
    getAll: async () => {
        const { firestore, auth } = await getFirebase();
        await ensureAuth(auth);
        const { collection, getDocs } = await import('firebase/firestore');
        const querySnapshot = await getDocs(collection(firestore, COLLECTIONS.CONTACT));
        return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    },
    
    getById: async (id) => {
        const { firestore, auth } = await getFirebase();
        await ensureAuth(auth);
        const { doc, getDoc } = await import('firebase/firestore');
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
        const { addDoc, collection } = await import('firebase/firestore');
        return await addDoc(collection(firestore, COLLECTIONS.CONTACT), data);
    },
    
    update: async (id, data) => {
        const { firestore, auth } = await getFirebase();
        await ensureAuth(auth);
        const { doc, updateDoc } = await import('firebase/firestore');
        const docRef = doc(firestore, COLLECTIONS.CONTACT, id);
        return await updateDoc(docRef, data);
    },
    
    delete: async (id) => {
        const { firestore, auth } = await getFirebase();
        await ensureAuth(auth);
        const { doc, deleteDoc } = await import('firebase/firestore');
        const docRef = doc(firestore, COLLECTIONS.CONTACT, id);
        return await deleteDoc(docRef);
    }
};

// CV Service
export const cvService = {
    // Get current CV info
    get: async () => {
        try {
            const { firestore, auth } = await getFirebase();
            await ensureAuth(auth);
            const { doc, getDoc } = await import('firebase/firestore');
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
            const { doc, setDoc } = await import('firebase/firestore');
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
            const { doc, deleteDoc } = await import('firebase/firestore');
            const docRef = doc(firestore, COLLECTIONS.SETTINGS, 'cv');
            await deleteDoc(docRef);

            return true;
        } catch (error) {
            console.error('Error deleting CV:', error);
            throw error;
        }
    }
};

