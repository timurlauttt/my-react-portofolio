import { 
    collection, 
    doc, 
    getDocs, 
    getDoc, 
    addDoc, 
    updateDoc, 
    deleteDoc, 
    query, 
    orderBy,
    setDoc
} from 'firebase/firestore';
import { firestore, auth, storage } from '../firebase';
import { signInAnonymously } from 'firebase/auth';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { imageUploadService } from './imageUploadService';

// Ensure user is authenticated before Firestore operations
const ensureAuth = async () => {
    if (!auth.currentUser) {
        try {
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
            await ensureAuth();
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
            await ensureAuth();
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
            await ensureAuth();
            const aboutData = {
                ...data,
                createdAt: new Date(),
                updatedAt: new Date()
            };
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
            await ensureAuth();
            const docRef = doc(firestore, COLLECTIONS.ABOUT, id);
            const updateData = {
                ...data,
                updatedAt: new Date()
            };
            return await updateDoc(docRef, updateData);
        } catch (error) {
            console.error('Error updating about item:', error);
            throw error;
        }
    },
    
    delete: async (id) => {
        try {
            // Get document first to check if it has images to delete
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
        const q = query(collection(firestore, COLLECTIONS.SKILLS), orderBy('createdAt', 'desc'));
        const querySnapshot = await getDocs(q);
        return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    },
    
    getById: async (id) => {
        const docRef = doc(firestore, COLLECTIONS.SKILLS, id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            return { id: docSnap.id, ...docSnap.data() };
        }
        return null;
    },
    
    create: async (data) => {
        const createData = {
            ...data,
            createdAt: new Date(),
            updatedAt: new Date()
        };
        return await addDoc(collection(firestore, COLLECTIONS.SKILLS), createData);
    },
    
    update: async (id, data) => {
        const docRef = doc(firestore, COLLECTIONS.SKILLS, id);
        const updateData = {
            ...data,
            updatedAt: new Date()
        };
        return await updateDoc(docRef, updateData);
    },
    
    delete: async (id) => {
        const docRef = doc(firestore, COLLECTIONS.SKILLS, id);
        return await deleteDoc(docRef);
    }
};

// Portfolio Service
export const portfolioService = {
    getAll: async () => {
        const q = query(collection(firestore, COLLECTIONS.PORTFOLIO), orderBy('createdAt', 'desc'));
        const querySnapshot = await getDocs(q);
        return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    },
    
    getById: async (id) => {
        const docRef = doc(firestore, COLLECTIONS.PORTFOLIO, id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            return { id: docSnap.id, ...docSnap.data() };
        }
        return null;
    },
    
    create: async (data) => {
        const portfolioData = {
            ...data,
            createdAt: new Date(),
            updatedAt: new Date()
        };
        return await addDoc(collection(firestore, COLLECTIONS.PORTFOLIO), portfolioData);
    },
    
    update: async (id, data) => {
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
        const querySnapshot = await getDocs(collection(firestore, COLLECTIONS.ACTIVITIES));
        return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    },
    
    getById: async (id) => {
        const docRef = doc(firestore, COLLECTIONS.ACTIVITIES, id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            return { id: docSnap.id, ...docSnap.data() };
        }
        return null;
    },
    
    create: async (data) => {
        return await addDoc(collection(firestore, COLLECTIONS.ACTIVITIES), data);
    },
    
    update: async (id, data) => {
        const docRef = doc(firestore, COLLECTIONS.ACTIVITIES, id);
        return await updateDoc(docRef, data);
    },
    
    delete: async (id) => {
        const docRef = doc(firestore, COLLECTIONS.ACTIVITIES, id);
        return await deleteDoc(docRef);
    }
};

// Contact Service
export const contactService = {
    getAll: async () => {
        const querySnapshot = await getDocs(collection(firestore, COLLECTIONS.CONTACT));
        return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    },
    
    getById: async (id) => {
        const docRef = doc(firestore, COLLECTIONS.CONTACT, id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            return { id: docSnap.id, ...docSnap.data() };
        }
        return null;
    },
    
    create: async (data) => {
        return await addDoc(collection(firestore, COLLECTIONS.CONTACT), data);
    },
    
    update: async (id, data) => {
        const docRef = doc(firestore, COLLECTIONS.CONTACT, id);
        return await updateDoc(docRef, data);
    },
    
    delete: async (id) => {
        const docRef = doc(firestore, COLLECTIONS.CONTACT, id);
        return await deleteDoc(docRef);
    }
};

// CV Service
export const cvService = {
    // Get current CV info
    get: async () => {
        try {
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
            const docRef = doc(firestore, COLLECTIONS.SETTINGS, 'cv');
            await deleteDoc(docRef);

            return true;
        } catch (error) {
            console.error('Error deleting CV:', error);
            throw error;
        }
    }
};

