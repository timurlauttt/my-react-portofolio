import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { portfolioService } from '../services/serviceWrapper';
import ImageUploader from '../components/ImageUploader';
import toast from 'react-hot-toast';

const AdminPortfolioForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        portfolioId: '',
        title: '',
        description: '',
        image: '',
        imagePath: '',
        imageUrl: '',
        link: '',
        isExternal: true
    });
    const [initialLoading, setInitialLoading] = useState(id ? true : false);

    const isEditMode = !!id;

    useEffect(() => {
        if (isEditMode) {
            loadPortfolioData();
        }
    }, [id]);

    const loadPortfolioData = async () => {
        try {
            setInitialLoading(true);
            const data = await portfolioService.getById(id);
            if (data) {
                setFormData({
                    portfolioId: data.portfolioId || '',
                    title: data.title || '',
                    description: data.description || '',
                    image: data.image || '',
                    imagePath: data.imagePath || '',
                    imageUrl: data.imageUrl || '',
                    link: data.link || '',
                    isExternal: data.isExternal || true
                });
            }
        } catch (error) {
            console.error('Error loading portfolio data:', error);
            toast.error('Failed to load portfolio data');
        } finally {
            setInitialLoading(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
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
        
        if (!formData.portfolioId || !formData.title || !formData.description || !formData.link) {
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
                portfolioId: formData.portfolioId,
                title: formData.title,
                description: formData.description,
                image: formData.image,
                imagePath: formData.imagePath,
                imageUrl: formData.imageUrl,
                link: formData.link,
                isExternal: formData.isExternal
            };
            
            if (isEditMode) {
                await portfolioService.update(id, submitData);
                toast.success('Portfolio item updated successfully');
            } else {
                await portfolioService.create(submitData);
                toast.success('Portfolio item created successfully');
            }
            
            navigate('/admin/portfolio');
        } catch (error) {
            console.error('Error saving portfolio item:', error);
            toast.error('Failed to save portfolio item');
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
                    {isEditMode ? 'Edit Portfolio Item' : 'Add New Portfolio Item'}
                </h1>
                <p className="text-gray-600">
                    {isEditMode ? 'Update portfolio project' : 'Create a new portfolio project'}
                </p>
            </div>

            <div className="bg-white shadow rounded-lg p-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="portfolioId" className="block text-sm font-medium text-gray-700">
                            Portfolio ID *
                        </label>
                        <input
                            type="number"
                            id="portfolioId"
                            name="portfolioId"
                            value={formData.portfolioId}
                            onChange={handleInputChange}
                            required
                            min="1"
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm px-3 py-2 border"
                            placeholder="1"
                        />
                        <p className="mt-1 text-sm text-gray-500">
                            Enter a unique number ID for this portfolio project (e.g., 1, 2, 3...)
                        </p>
                    </div>

                    <div>
                        <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                            Project Title *
                        </label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            value={formData.title}
                            onChange={handleInputChange}
                            required
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm px-3 py-2 border"
                            placeholder="e.g., E-Learning Platform"
                        />
                    </div>

                    <div>
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                            Project Description *
                        </label>
                        <textarea
                            id="description"
                            name="description"
                            rows={4}
                            value={formData.description}
                            onChange={handleInputChange}
                            required
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm px-3 py-2 border"
                            placeholder="Describe your project..."
                        />
                    </div>

                    <div>
                        <ImageUploader
                            onImageUploaded={handleImageUploaded}
                            currentImage={formData.image}
                            folder="portfolio"
                        />
                    </div>

                    <div>
                        <label htmlFor="link" className="block text-sm font-medium text-gray-700">
                            Project Link *
                        </label>
                        <input
                            type="url"
                            id="link"
                            name="link"
                            value={formData.link}
                            onChange={handleInputChange}
                            required
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm px-3 py-2 border"
                            placeholder="https://github.com/username/project"
                        />
                    </div>

                    <div>
                        <div className="flex items-center">
                            <input
                                id="isExternal"
                                name="isExternal"
                                type="checkbox"
                                checked={formData.isExternal}
                                onChange={handleInputChange}
                                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                            />
                            <label htmlFor="isExternal" className="ml-2 block text-sm text-gray-900">
                                External Link (opens in new tab)
                            </label>
                        </div>
                    </div>

                    <div className="flex justify-end space-x-3 pt-6">
                        <button
                            type="button"
                            onClick={() => navigate('/admin/portfolio')}
                            className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? 'Saving...' : (isEditMode ? 'Update Portfolio' : 'Create Portfolio')}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AdminPortfolioForm;
