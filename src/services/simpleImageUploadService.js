// Simple Local Image Upload Service
// Upload images as base64 strings to localStorage
// Alternative to Firebase Storage for development

export const simpleLocalUploadService = {
    uploadImage: async (file, folder = 'portfolio') => {
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

            // Validasi ukuran file (maksimal 2MB untuk localStorage)
            const maxSize = 2 * 1024 * 1024; // 2MB
            if (file.size > maxSize) {
                throw new Error('File size must be less than 2MB for local storage');
            }

            // Convert file to base64
            const base64 = await new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.onload = () => resolve(reader.result);
                reader.onerror = reject;
                reader.readAsDataURL(file);
            });

            // Generate unique filename
            const timestamp = Date.now();
            const randomString = Math.random().toString(36).substring(2);
            const fileExtension = file.name.split('.').pop().toLowerCase();
            const fileName = `${timestamp}_${randomString}.${fileExtension}`;
            const fullPath = `${folder}/${fileName}`;

            // Save to localStorage
            const imageData = {
                fileName: fileName,
                fullPath: fullPath,
                base64: base64,
                uploadedAt: new Date().toISOString(),
                originalName: file.name,
                size: file.size,
                type: file.type
            };

            localStorage.setItem(`image_${fullPath}`, JSON.stringify(imageData));

            // Update image registry
            const registry = JSON.parse(localStorage.getItem('image_registry') || '[]');
            registry.push(fullPath);
            localStorage.setItem('image_registry', JSON.stringify(registry));

            return {
                success: true,
                fileName: fileName,
                downloadURL: base64, // Return base64 as URL
                fullPath: fullPath
            };

        } catch (error) {
            console.error('Error uploading to local storage:', error);
            throw new Error(`Local upload failed: ${error.message}`);
        }
    },

    getImage: async (fullPath) => {
        try {
            const imageData = localStorage.getItem(`image_${fullPath}`);
            if (!imageData) {
                throw new Error('Image not found');
            }
            
            const parsed = JSON.parse(imageData);
            return parsed.base64;
        } catch (error) {
            console.error('Error getting image:', error);
            throw error;
        }
    },

    deleteImage: async (fullPath) => {
        try {
            // Remove from localStorage
            localStorage.removeItem(`image_${fullPath}`);

            // Update registry
            const registry = JSON.parse(localStorage.getItem('image_registry') || '[]');
            const updatedRegistry = registry.filter(path => path !== fullPath);
            localStorage.setItem('image_registry', JSON.stringify(updatedRegistry));

            return {
                success: true,
                message: 'Image deleted successfully'
            };
        } catch (error) {
            console.error('Error deleting image:', error);
            throw error;
        }
    },

    getAllImages: () => {
        try {
            const registry = JSON.parse(localStorage.getItem('image_registry') || '[]');
            return registry.map(path => {
                const imageData = localStorage.getItem(`image_${path}`);
                return imageData ? JSON.parse(imageData) : null;
            }).filter(Boolean);
        } catch (error) {
            console.error('Error getting all images:', error);
            return [];
        }
    },

    clearAllImages: () => {
        try {
            const registry = JSON.parse(localStorage.getItem('image_registry') || '[]');
            registry.forEach(path => {
                localStorage.removeItem(`image_${path}`);
            });
            localStorage.removeItem('image_registry');
            return { success: true, message: 'All images cleared' };
        } catch (error) {
            console.error('Error clearing images:', error);
            throw error;
        }
    }
};

// Public Folder Upload Service (requires backend)
export const publicFolderUploadService = {
    uploadImage: async (file, folder = 'uploads') => {
        try {
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

            // Generate unique filename
            const timestamp = Date.now();
            const randomString = Math.random().toString(36).substring(2);
            const fileExtension = file.name.split('.').pop().toLowerCase();
            const fileName = `${timestamp}_${randomString}.${fileExtension}`;

            // Create FormData
            const formData = new FormData();
            formData.append('file', file);
            formData.append('folder', folder);
            formData.append('fileName', fileName);

            // Upload to backend API
            const response = await fetch('/api/upload', {
                method: 'POST',
                body: formData
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.message || 'Upload failed');
            }

            const result = await response.json();

            return {
                success: true,
                fileName: fileName,
                downloadURL: `/${folder}/${fileName}`,
                fullPath: `public/${folder}/${fileName}`
            };

        } catch (error) {
            console.error('Error uploading to public folder:', error);
            throw new Error(`Public folder upload failed: ${error.message}`);
        }
    },

    deleteImage: async (imagePath) => {
        try {
            const response = await fetch('/api/delete', {
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
            console.error('Error deleting from public folder:', error);
            throw error;
        }
    }
};

// Export default simple service
export default simpleLocalUploadService;
