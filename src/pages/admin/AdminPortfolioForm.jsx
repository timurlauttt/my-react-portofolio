import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { portfolioService } from '../../services/serviceWrapper';
import ImageUploader from '../../components/ImageUploader';
import toast from 'react-hot-toast';

const AdminPortfolioForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        portfolioId: '',
        title: '',
        title_id: '',
        category: 'Web App',
        description: '',
        description_id: '',
        longDescription: '',
        longDescription_id: '',
        image: '',
        imagePath: '',
        imageUrl: '',
        link: '',
        isExternal: true,
        tech: '',
        startDate: '',
        endDate: ''
    });
    const [initialLoading, setInitialLoading] = useState(id ? true : false);

    const categoryOptions = [
        'Web App',
        'Start-up',
        'Capstone',
        'Client Project',
        'Open Source'
    ];

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
                    title_id: data.title_id || '',
                    category: data.category || 'Web App',
                    description: data.description || '',
                    description_id: data.description_id || '',
                    longDescription: data.longDescription || data.long_description || '',
                    longDescription_id: data.longDescription_id || '',
                    image: data.image || '',
                    imagePath: data.imagePath || '',
                    imageUrl: data.imageUrl || '',
                    link: data.link || '',
                    isExternal: data.isExternal || true,
                    tech: Array.isArray(data.tech) ? data.tech.join(', ') : (data.tech || data.techStack || data.technologies || ''),
                    startDate: data.startDate || data.from || '',
                    endDate: data.endDate || data.to || ''
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
                title_id: formData.title_id || formData.title,
                category: formData.category || 'Web App',
                description: formData.description,
                description_id: formData.description_id || formData.description,
                longDescription: formData.longDescription,
                longDescription_id: formData.longDescription_id || formData.longDescription,
                image: formData.image,
                imagePath: formData.imagePath,
                imageUrl: formData.imageUrl,
                downloadURL: formData.imageUrl,
                link: formData.link,
                isExternal: formData.isExternal,
                tech: formData.tech ? formData.tech.split(',').map(s => s.trim()).filter(Boolean) : [],
                startDate: formData.startDate || null,
                endDate: formData.endDate || null
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
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                            <p className="mt-1 text-xs text-gray-500">
                                Unique number ID (e.g., 1, 2, 3...)
                            </p>
                        </div>

                        <div>
                            <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                                Project Category *
                            </label>
                            <select
                                id="category"
                                name="category"
                                value={formData.category}
                                onChange={handleInputChange}
                                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm px-3 py-2 border bg-white"
                            >
                                {categoryOptions.map((cat) => (
                                    <option key={cat} value={cat}>
                                        {cat}
                                    </option>
                                ))}
                            </select>
                            <p className="mt-1 text-xs text-gray-500">
                                Determines which filter tab this project belongs to
                            </p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                                Project Title (English) *
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
                            <label htmlFor="title_id" className="block text-sm font-medium text-gray-700">
                                Project Title (Bahasa Indonesia)
                            </label>
                            <input
                                type="text"
                                id="title_id"
                                name="title_id"
                                value={formData.title_id}
                                onChange={handleInputChange}
                                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm px-3 py-2 border"
                                placeholder="opsional (jika berbeda)"
                            />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                            Project Description (English) *
                        </label>
                        <textarea
                            id="description"
                            name="description"
                            rows={3}
                            value={formData.description}
                            onChange={handleInputChange}
                            required
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm px-3 py-2 border"
                            placeholder="Describe your project in English..."
                        />
                    </div>

                    <div>
                        <label htmlFor="description_id" className="block text-sm font-medium text-gray-700">
                            Project Description (Bahasa Indonesia)
                        </label>
                        <textarea
                            id="description_id"
                            name="description_id"
                            rows={3}
                            value={formData.description_id}
                            onChange={handleInputChange}
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm px-3 py-2 border"
                            placeholder="Deskripsikan proyek Anda dalam Bahasa Indonesia..."
                        />
                    </div>

                    <div>
                        <label htmlFor="longDescription" className="block text-sm font-medium text-gray-700">
                            Long Description (English - optional)
                        </label>
                        <textarea
                            id="longDescription"
                            name="longDescription"
                            rows={4}
                            value={formData.longDescription}
                            onChange={handleInputChange}
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm px-3 py-2 border"
                            placeholder="Detailed explanation in English..."
                        />
                    </div>

                    <div>
                        <label htmlFor="longDescription_id" className="block text-sm font-medium text-gray-700">
                            Long Description (Bahasa Indonesia - opsional)
                        </label>
                        <textarea
                            id="longDescription_id"
                            name="longDescription_id"
                            rows={4}
                            value={formData.longDescription_id}
                            onChange={handleInputChange}
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm px-3 py-2 border"
                            placeholder="Penjelasan detail dalam Bahasa Indonesia..."
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
                        <label htmlFor="tech" className="block text-sm font-medium text-gray-700">
                            Tech Stack (comma-separated)
                        </label>
                        <input
                            type="text"
                            id="tech"
                            name="tech"
                            value={formData.tech}
                            onChange={handleInputChange}
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm px-3 py-2 border"
                            placeholder="e.g., React, TailwindCSS, Firebase"
                        />
                        <p className="mt-1 text-sm text-gray-500">List major technologies used, separated by commas.</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="startDate" className="block text-sm font-medium text-gray-700">Start Date</label>
                            <input
                                type="date"
                                id="startDate"
                                name="startDate"
                                value={formData.startDate}
                                onChange={handleInputChange}
                                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm px-3 py-2 border"
                            />
                        </div>
                        <div>
                            <label htmlFor="endDate" className="block text-sm font-medium text-gray-700">End Date</label>
                            <input
                                type="date"
                                id="endDate"
                                name="endDate"
                                value={formData.endDate}
                                onChange={handleInputChange}
                                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm px-3 py-2 border"
                            />
                        </div>
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
