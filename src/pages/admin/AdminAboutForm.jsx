import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { aboutService } from '../../services/serviceWrapper';
import ImageUploader from '../../components/ImageUploader';
import toast from 'react-hot-toast';

const AdminAboutForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [initialLoading, setInitialLoading] = useState(id ? true : false);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        image: '',
        imagePath: '',
        imageUrl: '',
        imageAlt: ''
    });

    const isEditMode = !!id;

    useEffect(() => {
        if (isEditMode) {
            loadAboutData();
        }
    }, [id]);

    const loadAboutData = async () => {
        try {
            setInitialLoading(true);
            const data = await aboutService.getById(id);
            if (data) {
                setFormData({
                    title: data.title || '',
                    description: data.description || '',
                    image: data.image || '',
                    imagePath: data.imagePath || '',
                    imageUrl: data.imageUrl || '',
                    imageAlt: data.imageAlt || ''
                });
            }
        } catch (error) {
            console.error('Error loading about data:', error);
            toast.error('Failed to load about data');
        } finally {
            setInitialLoading(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleImageUploaded = (imageData) => {
        if (imageData) {
            setFormData(prev => ({
                ...prev,
                image: imageData.fileName,
                imagePath: imageData.fullPath,
                imageUrl: imageData.downloadURL
            }));
        } else {
            setFormData(prev => ({
                ...prev,
                image: '',
                imagePath: '',
                imageUrl: ''
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!formData.title || !formData.description) {
            toast.error('Please fill in all required fields');
            return;
        }

        if (!formData.image && !isEditMode) {
            toast.error('Please upload an image');
            return;
        }

        try {
            setLoading(true);
            
            const submitData = {
                title: formData.title,
                description: formData.description,
                image: formData.image,
                imagePath: formData.imagePath,
                imageUrl: formData.imageUrl,
                imageAlt: formData.imageAlt
            };
            
            if (isEditMode) {
                await aboutService.update(id, submitData);
                toast.success('About item updated successfully');
            } else {
                await aboutService.create(submitData);
                toast.success('About item created successfully');
            }
            
            navigate('/admin/about');
        } catch (error) {
            console.error('Error saving about item:', error);
            toast.error('Failed to save about item');
        } finally {
            setLoading(false);
        }
    };

    if (initialLoading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
            </div>
        );
    }

    return (
        <div className="max-w-2xl mx-auto">
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-900">
                    {isEditMode ? 'Edit About Me' : 'Add New About Me'}
                </h1>
                <p className="text-gray-600">
                    {isEditMode ? 'Update about information' : 'Create a new about me section'}
                </p>
            </div>

            <div className="bg-white shadow rounded-lg p-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                            Title *
                        </label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            value={formData.title}
                            onChange={handleInputChange}
                            required
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm px-3 py-2 border"
                            placeholder="e.g., My Background"
                        />
                    </div>

                    <div>
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                            Description *
                        </label>
                        <textarea
                            id="description"
                            name="description"
                            rows={4}
                            value={formData.description}
                            onChange={handleInputChange}
                            required
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm px-3 py-2 border"
                            placeholder="Tell about yourself..."
                        />
                    </div>

                    <div>
                        <ImageUploader
                            onImageUploaded={handleImageUploaded}
                            currentImage={formData.image}
                            folder="about"
                        />
                    </div>

                    <div>
                        <label htmlFor="imageAlt" className="block text-sm font-medium text-gray-700">
                            Image Alt Text
                        </label>
                        <input
                            type="text"
                            id="imageAlt"
                            name="imageAlt"
                            value={formData.imageAlt}
                            onChange={handleInputChange}
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm px-3 py-2 border"
                            placeholder="e.g., Profile photo"
                        />
                    </div>

                    <div className="flex justify-end space-x-3 pt-6">
                        <button
                            type="button"
                            onClick={() => navigate('/admin/about')}
                            className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? 'Saving...' : (isEditMode ? 'Update About' : 'Create About')}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AdminAboutForm;

