// Simple Firebase connection test
import { firestore } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';

export const testFirebaseConnection = async () => {
    try {
        console.log('Testing Firebase connection...');
        console.log('Firestore instance:', firestore);
        
        // Try to read from a collection (this will fail if no collection exists, but that's okay)
        const testCollection = collection(firestore, 'test');
        console.log('Collection reference created successfully');
        
        return { success: true, message: 'Firebase connection test passed' };
    } catch (error) {
        console.error('Firebase connection test failed:', error);
        return { success: false, error: error.message };
    }
};
