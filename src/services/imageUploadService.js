import simpleLocalUploadService from './simpleImageUploadService';

// Mode upload:
// 'direct': Menggunakan WebP Base64 terkompresi langsung ke Firestore (100% GRATIS tanpa butuh Blaze Plan / Storage Bucket)
// 'firebase': Menggunakan Firebase Storage Bucket (memerlukan Blaze Plan)
const UPLOAD_MODE = {
    DIRECT: 'direct',
    FIREBASE: 'firebase',
    LOCAL: 'local'
};

// Default ke DIRECT agar berjalan di Firebase Spark Plan (Gratis) tanpa error 404 / CORS
const CURRENT_MODE = import.meta.env.VITE_STORAGE_MODE === 'firebase' ? UPLOAD_MODE.FIREBASE : UPLOAD_MODE.DIRECT;

// Helper to convert Blob/File to Base64 Data URL
const fileToBase64 = (blob) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(blob);
    });
};

// Direct Optimized Upload Service (Saves clean WebP Data URL to Firestore)
const directUploadService = {
    uploadImage: async (file, folder = 'portfolio') => {
        if (!file) {
            throw new Error('No file selected');
        }

        const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
        if (!allowedTypes.includes(file.type)) {
            throw new Error('Only JPEG, JPG, PNG, and WebP files are allowed');
        }

        const timestamp = Date.now();
        const randomString = Math.random().toString(36).substring(2, 9);
        const fileName = `${timestamp}_${randomString}.webp`;
        const fullPath = `${folder}/${fileName}`;

        // Convert optimized file to Data URL
        const base64Url = await fileToBase64(file);

        return {
            success: true,
            fileName: fileName,
            downloadURL: base64Url,
            fullPath: fullPath,
            service: 'direct'
        };
    },

    deleteImage: async () => {
        return { success: true, message: 'Image reference removed' };
    }
};

// Firebase Upload Service (for when user has Blaze plan)
const firebaseUploadService = {
    uploadImage: async (file, folder = 'portfolio') => {
        if (!file) throw new Error('No file selected');

        const timestamp = Date.now();
        const randomString = Math.random().toString(36).substring(2, 9);
        const fileName = `${timestamp}_${randomString}.webp`;
        const fullPath = `${folder}/${fileName}`;

        try {
            const fb = await import('../firebase');
            const storage = await fb.getStorageInstance();
            const { ref, uploadBytes, getDownloadURL } = await import('firebase/storage');

            const storageRef = ref(storage, fullPath);
            const metadata = {
                contentType: file.type,
                cacheControl: 'public,max-age=3600'
            };

            const snapshot = await uploadBytes(storageRef, file, metadata);
            const downloadURL = await getDownloadURL(snapshot.ref);

            return {
                success: true,
                fileName: fileName,
                downloadURL: downloadURL,
                fullPath: snapshot.ref.fullPath,
                service: 'firebase'
            };
        } catch (error) {
            console.warn('Firebase Storage not available, using Direct fallback:', error);
            return directUploadService.uploadImage(file, folder);
        }
    },

    deleteImage: async (imagePath) => {
        if (!imagePath || imagePath.startsWith('data:')) return { success: true };
        try {
            const fb = await import('../firebase');
            const { ref, deleteObject } = await import('firebase/storage');
            const storage = await fb.getStorageInstance();
            const imageRef = ref(storage, imagePath);
            await deleteObject(imageRef);
            return { success: true };
        } catch {
            return { success: true };
        }
    }
};

// Main Image Upload Service
export const imageUploadService = {
    uploadImage: async (file, folder = 'portfolio') => {
        if (CURRENT_MODE === UPLOAD_MODE.FIREBASE) {
            return await firebaseUploadService.uploadImage(file, folder);
        } else if (CURRENT_MODE === UPLOAD_MODE.LOCAL) {
            const result = await simpleLocalUploadService.uploadImage(file, folder);
            return { ...result, service: 'local' };
        } else {
            return await directUploadService.uploadImage(file, folder);
        }
    },

    deleteImage: async (imagePath) => {
        if (CURRENT_MODE === UPLOAD_MODE.FIREBASE) {
            return await firebaseUploadService.deleteImage(imagePath);
        } else if (CURRENT_MODE === UPLOAD_MODE.LOCAL) {
            return await simpleLocalUploadService.deleteImage(imagePath);
        } else {
            return await directUploadService.deleteImage(imagePath);
        }
    },

    getCurrentMode: () => CURRENT_MODE,
    
    getImage: async (imagePath) => {
        if (CURRENT_MODE === UPLOAD_MODE.LOCAL) {
            return await simpleLocalUploadService.getImage(imagePath);
        }
        return imagePath;
    },

    getAllImages: () => {
        if (CURRENT_MODE === UPLOAD_MODE.LOCAL) {
            return simpleLocalUploadService.getAllImages();
        }
        return [];
    },

    clearAllImages: () => {
        return { success: true };
    },

    uploadMultipleImages: async (files, folder = 'portfolio') => {
        if (!files || files.length === 0) throw new Error('No files selected');
        return Promise.all(Array.from(files).map(f => imageUploadService.uploadImage(f, folder)));
    },

    validateImageFile: (file) => {
        const errors = [];
        if (!file) {
            errors.push('No file selected');
            return { isValid: false, errors };
        }

        const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
        if (!allowedTypes.includes(file.type)) {
            errors.push('Only JPEG, JPG, PNG, and WebP files are allowed');
        }

        const maxSize = 10 * 1024 * 1024; // 10MB
        if (file.size > maxSize) {
            errors.push('File size must be less than 10MB');
        }

        return new Promise((resolve) => {
            const img = new Image();
            img.onload = () => {
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

    // Resize & compress image using Canvas API to compact WebP
    resizeImage: (file, maxWidth = 800, maxHeight = 600, quality = 0.8) => {
        return new Promise((resolve) => {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            const img = new Image();

            img.onload = () => {
                let { width, height } = img;
                
                if (width > maxWidth || height > maxHeight) {
                    const ratio = Math.min(maxWidth / width, maxHeight / height);
                    width = Math.round(width * ratio);
                    height = Math.round(height * ratio);
                }

                canvas.width = width;
                canvas.height = height;

                ctx.drawImage(img, 0, 0, width, height);

                canvas.toBlob(
                    (blob) => {
                        if (!blob) {
                            resolve(file);
                            return;
                        }
                        resolve(new File([blob], file.name.replace(/\.[^/.]+$/, "") + '.webp', {
                            type: 'image/webp',
                            lastModified: Date.now()
                        }));
                    },
                    'image/webp',
                    quality
                );
            };

            img.onerror = () => resolve(file);
            img.src = URL.createObjectURL(file);
        });
    },

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
            img.onerror = () => resolve({ name: file.name, size: file.size, type: file.type });
            img.src = URL.createObjectURL(file);
        });
    }
};

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

export { UPLOAD_MODE, CURRENT_MODE };
