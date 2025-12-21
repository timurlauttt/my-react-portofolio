import React, { useState, useRef } from 'react';
import { CloudArrowUpIcon, XMarkIcon, PhotoIcon } from '@heroicons/react/24/outline';
import { imageUploadService, formatFileSize, generateImagePreview } from '../services/imageUploadService';
import toast from 'react-hot-toast';

const ImageUploader = ({ 
    onImageUploaded, 
    currentImage = null, 
    folder = 'portfolio',
    accept = '.jpg,.jpeg,.png,.webp',
    maxSize = 5 * 1024 * 1024, // 5MB
    className = ''
}) => {
    const [uploading, setUploading] = useState(false);
    const [preview, setPreview] = useState(currentImage ? `/images/${currentImage}` : null);
    const [dragActive, setDragActive] = useState(false);
    const fileInputRef = useRef(null);

    const handleFileSelect = async (file) => {
        try {
            setUploading(true);

            // Validate file
            const validation = await imageUploadService.validateImageFile(file);
            if (!validation.isValid) {
                toast.error(validation.errors.join(', '));
                return;
            }

            // Show preview immediately
            const previewUrl = generateImagePreview(file);
            setPreview(previewUrl);

            // Resize image if too large
            const resizedFile = await imageUploadService.resizeImage(file, 800, 600, 0.8);

            // Upload to Firebase
            const result = await imageUploadService.uploadImage(resizedFile, folder);
            
            if (result.success) {
                toast.success('Image uploaded successfully!');
                onImageUploaded({
                    fileName: result.fileName,
                    downloadURL: result.downloadURL,
                    fullPath: result.fullPath
                });
            }

        } catch (error) {
            console.error('Upload error:', error);
            toast.error(error.message || 'Upload failed');
            setPreview(currentImage ? `/images/${currentImage}` : null);
        } finally {
            setUploading(false);
        }
    };

    const handleDrag = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === 'dragenter' || e.type === 'dragover') {
            setDragActive(true);
        } else if (e.type === 'dragleave') {
            setDragActive(false);
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);

        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleFileSelect(e.dataTransfer.files[0]);
        }
    };

    const handleFileInput = (e) => {
        if (e.target.files && e.target.files[0]) {
            handleFileSelect(e.target.files[0]);
        }
    };

    const handleButtonClick = () => {
        fileInputRef.current?.click();
    };

    const removeImage = () => {
        setPreview(null);
        onImageUploaded(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    return (
        <div className={`space-y-4 ${className}`}>
            <div className="block text-sm font-medium text-gray-700">
                Image Upload
            </div>
            
            {/* Upload Area */}
            <div
                className={`relative border-2 border-dashed rounded-lg p-6 transition-colors ${
                    dragActive
                        ? 'border-indigo-500 bg-indigo-50'
                        : 'border-gray-300 hover:border-gray-400'
                } ${uploading ? 'pointer-events-none opacity-50' : ''}`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
            >
                {/* Hidden file input */}
                <input
                    ref={fileInputRef}
                    type="file"
                    accept={accept}
                    onChange={handleFileInput}
                    className="hidden"
                />

                {preview ? (
                    /* Image Preview */
                    <div className="relative">
                        <img
                            src={preview}
                            alt="Preview"
                            className="w-full h-48 object-cover rounded-lg"
                        />
                        {!uploading && (
                            <button
                                type="button"
                                onClick={removeImage}
                                className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                            >
                                <XMarkIcon className="h-4 w-4" />
                            </button>
                        )}
                        {uploading && (
                            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-lg">
                                <div className="text-white text-sm">
                                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto mb-2"></div>
                                    Uploading...
                                </div>
                            </div>
                        )}
                    </div>
                ) : (
                    /* Upload Prompt */
                    <div className="text-center">
                        <PhotoIcon className="mx-auto h-12 w-12 text-gray-400" />
                        <div className="mt-4">
                            <p className="text-sm text-gray-600">
                                {dragActive ? (
                                    <span className="font-medium text-indigo-600">Drop image here</span>
                                ) : (
                                    <>
                                        <button
                                            type="button"
                                            onClick={handleButtonClick}
                                            className="font-medium text-indigo-600 hover:text-indigo-500"
                                        >
                                            Click to upload
                                        </button>
                                        <span> or drag and drop</span>
                                    </>
                                )}
                            </p>
                            <p className="text-xs text-gray-500 mt-1">
                                PNG, JPG, WEBP up to {formatFileSize(maxSize)}
                            </p>
                        </div>
                    </div>
                )}

                {/* Upload Progress */}
                {uploading && (
                    <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-90 rounded-lg">
                        <div className="text-center">
                            <CloudArrowUpIcon className="mx-auto h-8 w-8 text-indigo-600 animate-pulse" />
                            <p className="mt-2 text-sm text-gray-600">Uploading image...</p>
                        </div>
                    </div>
                )}
            </div>

            {/* Help Text */}
            <p className="text-xs text-gray-500">
                Recommended: 800x600px or larger. Images will be automatically resized and optimized.
            </p>
        </div>
    );
};

export default ImageUploader;
