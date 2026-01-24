import simpleLocalUploadService from './simpleImageUploadService';

// Configuration untuk upload service
const UPLOAD_MODE = {
    FIREBASE: 'firebase',
    LOCAL: 'local'  // localStorage sebagai alternative
};

// Pilih mode upload (change ini untuk switch service)
const CURRENT_MODE = UPLOAD_MODE.LOCAL; // Change to FIREBASE if you want Firebase

// Ensure user is authenticated before upload (for Firebase)
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

// Firebase Upload Service
const firebaseUploadService = {
    uploadImage: async (file, folder = 'portfolio') => {
        try {
            // Ensure authentication (lazy firebase)
            const fb = await import('../firebase');
            const storage = await fb.getStorageInstance();
            const auth = await fb.getAuthInstance();
            await ensureAuth(auth);
            const { ref, uploadBytes, getDownloadURL } = await import('firebase/storage');
            
            // Validasi file
            if (!file) {
                throw new Error('No file selected');
            }

            // Validasi tipe file
            const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
            if (!allowedTypes.includes(file.type)) {
                throw new Error('Only JPEG, JPG, PNG, and WebP files are allowed');
            }

            // Validasi ukuran file (maksimal 5MB)
            const maxSize = 5 * 1024 * 1024; // 5MB
            if (file.size > maxSize) {
                throw new Error('File size must be less than 5MB');
            }

            // Generate nama file yang unik
            const timestamp = Date.now();
            const randomString = Math.random().toString(36).substring(2);
            const fileExtension = file.name.split('.').pop().toLowerCase();
            const fileName = `${timestamp}_${randomString}.${fileExtension}`;

            // Buat reference ke storage path
            const storageRef = ref(storage, `${folder}/${fileName}`);

            // Upload file dengan metadata
            const metadata = {
                contentType: file.type,
                cacheControl: 'public,max-age=3600'
            };

            // Upload file
            const snapshot = await uploadBytes(storageRef, file, metadata);

            // Dapatkan download URL
            const downloadURL = await getDownloadURL(snapshot.ref);

            return {
                success: true,
                fileName: fileName,
                downloadURL: downloadURL,
                fullPath: snapshot.ref.fullPath,
                service: 'firebase'
            };

        } catch (error) {
            console.error('Error uploading to Firebase:', error);
            
            // More specific error handling
            if (error.code === 'storage/unauthorized') {
                throw new Error('Firebase Storage: Please check rules and authentication');
            } else if (error.code === 'storage/canceled') {
                throw new Error('Upload was canceled');
            } else if (error.code === 'storage/unknown') {
                throw new Error('Firebase upload failed: Unknown error occurred');
            } else {
                throw new Error(`Firebase upload failed: ${error.message}`);
            }
        }
    },

    deleteImage: async (imagePath) => {
        try {
            const fb = await import('../firebase');
            const auth = await fb.getAuthInstance();
            await ensureAuth(auth);
            const { ref, deleteObject } = await import('firebase/storage');
            const storage = await fb.getStorageInstance();
            const imageRef = ref(storage, imagePath);
            await deleteObject(imageRef);
            return { success: true, message: 'Image deleted successfully' };
        } catch (error) {
            console.error('Error deleting from Firebase:', error);
            throw error;
        }
    }
};

// Main Image Upload Service - Auto switch based on CURRENT_MODE
export const imageUploadService = {
    uploadImage: async (file, folder = 'portfolio') => {
        if (CURRENT_MODE === UPLOAD_MODE.LOCAL) {
            const result = await simpleLocalUploadService.uploadImage(file, folder);
            return { ...result, service: 'local' };
        } else {
            return await firebaseUploadService.uploadImage(file, folder);
        }
    },

    deleteImage: async (imagePath) => {
        if (CURRENT_MODE === UPLOAD_MODE.LOCAL) {
            return await simpleLocalUploadService.deleteImage(imagePath);
        } else {
            return await firebaseUploadService.deleteImage(imagePath);
        }
    },

    // Helper methods
    getCurrentMode: () => CURRENT_MODE,
    
    // Get image (useful for local mode)
    getImage: async (imagePath) => {
        if (CURRENT_MODE === UPLOAD_MODE.LOCAL) {
            return await simpleLocalUploadService.getImage(imagePath);
        } else {
            // For Firebase, imagePath already is downloadURL
            return imagePath;
        }
    },

    // Get all uploaded images
    getAllImages: () => {
        if (CURRENT_MODE === UPLOAD_MODE.LOCAL) {
            return simpleLocalUploadService.getAllImages();
        } else {
            return []; // Firebase doesn't have local registry
        }
    },

    // Clear all images (useful for local mode)
    clearAllImages: () => {
        if (CURRENT_MODE === UPLOAD_MODE.LOCAL) {
            return simpleLocalUploadService.clearAllImages();
        } else {
            return { success: false, message: 'Not available for Firebase mode' };
        }
    },

    // Upload multiple images sekaligus
    uploadMultipleImages: async (files, folder = 'portfolio') => {
        try {
            if (!files || files.length === 0) {
                throw new Error('No files selected');
            }

            const uploadPromises = Array.from(files).map(file => 
                imageUploadService.uploadImage(file, folder)
            );

            const results = await Promise.all(uploadPromises);
            return results;

        } catch (error) {
            console.error('Error uploading multiple images:', error);
            throw error;
        }
    },

    // Validate image file
    validateImageFile: (file) => {
        const errors = [];

        if (!file) {
            errors.push('No file selected');
            return { isValid: false, errors };
        }

        // Check file type
        const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
        if (!allowedTypes.includes(file.type)) {
            errors.push('Only JPEG, JPG, PNG, and WebP files are allowed');
        }

        // Check file size - adjust based on mode
        const maxSize = CURRENT_MODE === UPLOAD_MODE.LOCAL ? 2 * 1024 * 1024 : 5 * 1024 * 1024; // 2MB for local, 5MB for Firebase
        if (file.size > maxSize) {
            const maxSizeMB = CURRENT_MODE === UPLOAD_MODE.LOCAL ? '2MB' : '5MB';
            errors.push(`File size must be less than ${maxSizeMB}`);
        }

        // Check image dimensions (optional)
        return new Promise((resolve) => {
            const img = new Image();
            img.onload = () => {
                // Optional: Check minimum dimensions
                const minWidth = 100;
                const minHeight = 100;
                
                if (img.width < minWidth || img.height < minHeight) {
                    errors.push(`Image must be at least ${minWidth}x${minHeight} pixels`);
                }

                resolve({
                    isValid: errors.length === 0,
                    errors: errors,
                    dimensions: { width: img.width, height: img.height }
                });
            };

            img.onerror = () => {
                errors.push('Invalid image file');
                resolve({ isValid: false, errors });
            };

            img.src = URL.createObjectURL(file);
        });
    },

    // Resize image sebelum upload (menggunakan Canvas API)
    resizeImage: (file, maxWidth = 800, maxHeight = 600, quality = 0.8) => {
        return new Promise((resolve) => {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            const img = new Image();

            img.onload = () => {
                // Calculate new dimensions
                let { width, height } = img;
                
                if (width > maxWidth || height > maxHeight) {
                    const ratio = Math.min(maxWidth / width, maxHeight / height);
                    width *= ratio;
                    height *= ratio;
                }

                // Set canvas dimensions
                canvas.width = width;
                canvas.height = height;

                // Draw and resize image
                ctx.drawImage(img, 0, 0, width, height);

                // Convert canvas to blob
                canvas.toBlob(
                    (blob) => {
                        resolve(new File([blob], file.name, {
                            type: file.type,
                            lastModified: Date.now()
                        }));
                    },
                    file.type,
                    quality
                );
            };

            img.src = URL.createObjectURL(file);
        });
    },

    // Get image metadata
    getImageMetadata: (file) => {
        return new Promise((resolve) => {
            const img = new Image();
            img.onload = () => {
                resolve({
                    name: file.name,
                    size: file.size,
                    type: file.type,
                    width: img.width,
                    height: img.height,
                    lastModified: file.lastModified
                });
            };
            img.src = URL.createObjectURL(file);
        });
    }
};

// Utility functions
export const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

export const generateImagePreview = (file) => {
    return URL.createObjectURL(file);
};

// Export modes for external use
export { UPLOAD_MODE, CURRENT_MODE };
