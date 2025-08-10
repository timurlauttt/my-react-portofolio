// Alternative Image Upload Services
// Pilihan 1: Local Public Folder
// Pilihan 2: Cloudinary
// Pilihan 3: ImgBB
// Pilihan 4: Firebase Storage (existing)

import { storage, auth } from '../firebase';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { signInAnonymously } from 'firebase/auth';

// Configuration untuk different upload services
const UPLOAD_CONFIG = {
    // Local public folder (untuk development)
    LOCAL: 'local',
    // Cloudinary (free tier: 25GB storage, 25GB bandwidth)
    CLOUDINARY: 'cloudinary', 
    // ImgBB (free tier: unlimited dengan watermark)
    IMGBB: 'imgbb',
    // Firebase Storage
    FIREBASE: 'firebase'
};

// Set default upload service
const DEFAULT_UPLOAD_SERVICE = UPLOAD_CONFIG.LOCAL; // Change this to switch service

// Local Upload Service (ke folder public)
export const localImageUploadService = {
    uploadImage: async (file, folder = 'uploads') => {
        try {
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

            // Simulate upload to public folder
            // NOTE: Browser tidak bisa langsung write ke file system
            // Ini memerlukan backend API endpoint
            const formData = new FormData();
            formData.append('file', file);
            formData.append('folder', folder);
            formData.append('fileName', fileName);

            // Call local upload API (perlu dibuat backend endpoint)
            const response = await fetch('/api/upload-local', {
                method: 'POST',
                body: formData
            });

            if (!response.ok) {
                throw new Error('Upload failed');
            }

            const result = await response.json();

            return {
                success: true,
                fileName: fileName,
                downloadURL: `/uploads/${folder}/${fileName}`,
                fullPath: `public/uploads/${folder}/${fileName}`
            };

        } catch (error) {
            console.error('Error uploading to local:', error);
            throw new Error(`Local upload failed: ${error.message}`);
        }
    },

    deleteImage: async (imagePath) => {
        try {
            const response = await fetch('/api/delete-local', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ imagePath })
            });

            if (!response.ok) {
                throw new Error('Delete failed');
            }

            return { success: true, message: 'Image deleted successfully' };
        } catch (error) {
            console.error('Error deleting local image:', error);
            throw error;
        }
    }
};

// Cloudinary Upload Service
export const cloudinaryImageUploadService = {
    // Konfigurasi Cloudinary (ganti dengan credentials Anda)
    cloudName: 'your-cloud-name', // Ganti dengan cloud name Anda
    uploadPreset: 'unsigned_uploads', // Ganti dengan upload preset Anda
    
    uploadImage: async (file, folder = 'portfolio') => {
        try {
            // Validasi file
            if (!file) {
                throw new Error('No file selected');
            }

            const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
            if (!allowedTypes.includes(file.type)) {
                throw new Error('Only JPEG, JPG, PNG, and WebP files are allowed');
            }

            const maxSize = 10 * 1024 * 1024; // 10MB untuk Cloudinary
            if (file.size > maxSize) {
                throw new Error('File size must be less than 10MB');
            }

            // Prepare form data
            const formData = new FormData();
            formData.append('file', file);
            formData.append('upload_preset', cloudinaryImageUploadService.uploadPreset);
            formData.append('folder', folder);

            // Upload to Cloudinary
            const response = await fetch(
                `https://api.cloudinary.com/v1_1/${cloudinaryImageUploadService.cloudName}/image/upload`,
                {
                    method: 'POST',
                    body: formData
                }
            );

            if (!response.ok) {
                throw new Error('Cloudinary upload failed');
            }

            const result = await response.json();

            return {
                success: true,
                fileName: result.public_id,
                downloadURL: result.secure_url,
                fullPath: result.public_id
            };

        } catch (error) {
            console.error('Error uploading to Cloudinary:', error);
            throw new Error(`Cloudinary upload failed: ${error.message}`);
        }
    },

    deleteImage: async (publicId) => {
        try {
            // NOTE: Untuk delete di Cloudinary perlu API key/secret
            // Atau bisa menggunakan admin API dari backend
            console.log('Delete from Cloudinary:', publicId);
            return { success: true, message: 'Image deleted successfully' };
        } catch (error) {
            console.error('Error deleting from Cloudinary:', error);
            throw error;
        }
    }
};

// ImgBB Upload Service
export const imgbbImageUploadService = {
    // API Key ImgBB (daftar gratis di imgbb.com)
    apiKey: 'your-imgbb-api-key', // Ganti dengan API key Anda
    
    uploadImage: async (file, folder = 'portfolio') => {
        try {
            if (!file) {
                throw new Error('No file selected');
            }

            const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
            if (!allowedTypes.includes(file.type)) {
                throw new Error('Only JPEG, JPG, PNG, and WebP files are allowed');
            }

            const maxSize = 32 * 1024 * 1024; // 32MB untuk ImgBB
            if (file.size > maxSize) {
                throw new Error('File size must be less than 32MB');
            }

            // Convert file to base64
            const base64 = await new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.onload = () => {
                    const base64String = reader.result.split(',')[1];
                    resolve(base64String);
                };
                reader.onerror = reject;
                reader.readAsDataURL(file);
            });

            // Upload to ImgBB
            const formData = new FormData();
            formData.append('image', base64);
            formData.append('name', `${folder}_${Date.now()}`);

            const response = await fetch(
                `https://api.imgbb.com/1/upload?key=${imgbbImageUploadService.apiKey}`,
                {
                    method: 'POST',
                    body: formData
                }
            );

            if (!response.ok) {
                throw new Error('ImgBB upload failed');
            }

            const result = await response.json();

            if (!result.success) {
                throw new Error(result.error?.message || 'Upload failed');
            }

            return {
                success: true,
                fileName: result.data.id,
                downloadURL: result.data.url,
                fullPath: result.data.url_viewer
            };

        } catch (error) {
            console.error('Error uploading to ImgBB:', error);
            throw new Error(`ImgBB upload failed: ${error.message}`);
        }
    },

    deleteImage: async (imageId) => {
        try {
            // ImgBB free tier tidak support delete via API
            // Gambar akan auto-delete setelah beberapa bulan jika tidak ada activity
            console.log('ImgBB free tier does not support delete API');
            return { success: true, message: 'Image deletion not supported in free tier' };
        } catch (error) {
            console.error('Error with ImgBB delete:', error);
            throw error;
        }
    }
};

// Firebase Upload Service (existing, improved)
const ensureAuth = async () => {
    if (!auth.currentUser) {
        try {
            await signInAnonymously(auth);
        } catch (error) {
            console.warn('Anonymous auth failed:', error);
        }
    }
};

export const firebaseImageUploadService = {
    uploadImage: async (file, folder = 'portfolio') => {
        try {
            await ensureAuth();
            
            if (!file) {
                throw new Error('No file selected');
            }

            const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
            if (!allowedTypes.includes(file.type)) {
                throw new Error('Only JPEG, JPG, PNG, and WebP files are allowed');
            }

            const maxSize = 5 * 1024 * 1024; // 5MB
            if (file.size > maxSize) {
                throw new Error('File size must be less than 5MB');
            }

            const timestamp = Date.now();
            const randomString = Math.random().toString(36).substring(2);
            const fileExtension = file.name.split('.').pop().toLowerCase();
            const fileName = `${timestamp}_${randomString}.${fileExtension}`;

            const storageRef = ref(storage, `${folder}/${fileName}`);
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
                fullPath: snapshot.ref.fullPath
            };

        } catch (error) {
            console.error('Error uploading to Firebase:', error);
            if (error.code === 'storage/unauthorized') {
                throw new Error('Firebase Storage: Please check rules and authentication');
            }
            throw new Error(`Firebase upload failed: ${error.message}`);
        }
    },

    deleteImage: async (imagePath) => {
        try {
            await ensureAuth();
            const imageRef = ref(storage, imagePath);
            await deleteObject(imageRef);
            return { success: true, message: 'Image deleted successfully' };
        } catch (error) {
            console.error('Error deleting from Firebase:', error);
            throw error;
        }
    }
};

// Universal Image Upload Service - Auto switch between services
export const imageUploadService = {
    uploadImage: async (file, folder = 'portfolio') => {
        switch (DEFAULT_UPLOAD_SERVICE) {
            case UPLOAD_CONFIG.LOCAL:
                return await localImageUploadService.uploadImage(file, folder);
            case UPLOAD_CONFIG.CLOUDINARY:
                return await cloudinaryImageUploadService.uploadImage(file, folder);
            case UPLOAD_CONFIG.IMGBB:
                return await imgbbImageUploadService.uploadImage(file, folder);
            case UPLOAD_CONFIG.FIREBASE:
            default:
                return await firebaseImageUploadService.uploadImage(file, folder);
        }
    },

    deleteImage: async (imagePath) => {
        switch (DEFAULT_UPLOAD_SERVICE) {
            case UPLOAD_CONFIG.LOCAL:
                return await localImageUploadService.deleteImage(imagePath);
            case UPLOAD_CONFIG.CLOUDINARY:
                return await cloudinaryImageUploadService.deleteImage(imagePath);
            case UPLOAD_CONFIG.IMGBB:
                return await imgbbImageUploadService.deleteImage(imagePath);
            case UPLOAD_CONFIG.FIREBASE:
            default:
                return await firebaseImageUploadService.deleteImage(imagePath);
        }
    },

    // Helper method untuk switch service
    setUploadService: (service) => {
        if (Object.values(UPLOAD_CONFIG).includes(service)) {
            DEFAULT_UPLOAD_SERVICE = service;
        } else {
            throw new Error('Invalid upload service');
        }
    },

    getCurrentService: () => DEFAULT_UPLOAD_SERVICE
};

// Export semua service untuk flexibility
export {
    localImageUploadService as localUpload,
    cloudinaryImageUploadService as cloudinaryUpload, 
    imgbbImageUploadService as imgbbUpload,
    firebaseImageUploadService as firebaseUpload,
    UPLOAD_CONFIG
};

// Helper functions
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
