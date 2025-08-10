import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import { activitiesService } from '../services/serviceWrapper';

const AdminActivitiesForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        activityId: '',
        title: '',
        description: '',
        link: '',
        isExternal: false,
        bgColor: 'bg-blue-400'
    });

    const isEditMode = !!id;

    useEffect(() => {
        if (isEditMode) {
            loadActivityData();
        }
    }, [id, isEditMode]);

    const loadActivityData = async () => {
        try {
            setLoading(true);
            const data = await activitiesService.getById(id);
            if (data) {
                setFormData({
                    activityId: data.activityId || '',
                    title: data.title || '',
                    description: data.description || '',
                    link: data.link || '',
                    isExternal: data.isExternal || false,
                    bgColor: data.bgColor || 'bg-blue-400'
                });
            }
        } catch (error) {
            console.error('Error loading activity:', error);
            toast.error('Failed to load activity');
            navigate('/admin/activities');
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!formData.activityId || !formData.title || !formData.description) {
            toast.error('Please fill in all required fields');
            return;
        }

        try {
            setLoading(true);
            
            const activityData = {
                ...formData,
                updatedAt: new Date()
            };

            if (isEditMode) {
                await activitiesService.update(id, activityData);
                toast.success('Activity updated successfully');
            } else {
                await activitiesService.create(activityData);
                toast.success('Activity created successfully');
            }
            
            navigate('/admin/activities');
        } catch (error) {
            console.error('Error saving activity:', error);
            toast.error('Failed to save activity');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto">
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-900">
                    {isEditMode ? 'Edit Activity' : 'Add New Activity'}
                </h1>
                <p className="text-gray-600">
                    {isEditMode ? 'Update activity information' : 'Create a new activity entry'}
                </p>
            </div>

            <div className="bg-white shadow rounded-lg p-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="activityId" className="block text-sm font-medium text-gray-700">
                            Activity ID *
                        </label>
                        <input
                            type="number"
                            id="activityId"
                            name="activityId"
                            value={formData.activityId}
                            onChange={handleInputChange}
                            required
                            min="1"
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm px-3 py-2 border"
                            placeholder="1"
                        />
                        <p className="mt-1 text-sm text-gray-500">
                            Enter a unique number ID for this activity (e.g., 1, 2, 3...)
                        </p>
                    </div>

                    <div>
                        <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                            Activity Title *
                        </label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            value={formData.title}
                            onChange={handleInputChange}
                            required
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm px-3 py-2 border"
                            placeholder="e.g., HMSI Member"
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
                            placeholder="Describe your activity..."
                        />
                    </div>

                    <div>
                        <label htmlFor="link" className="block text-sm font-medium text-gray-700">
                            Link (Optional)
                        </label>
                        <input
                            type="url"
                            id="link"
                            name="link"
                            value={formData.link}
                            onChange={handleInputChange}
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm px-3 py-2 border"
                            placeholder="https://example.com"
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

                    <div>
                        <label htmlFor="bgColor" className="block text-sm font-medium text-gray-700">
                            Background Color *
                        </label>
                        <select
                            id="bgColor"
                            name="bgColor"
                            value={formData.bgColor}
                            onChange={handleInputChange}
                            required
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm px-3 py-2 border"
                        >
                            <option value="bg-red-400">Red</option>
                            <option value="bg-blue-400">Blue</option>
                            <option value="bg-green-400">Green</option>
                            <option value="bg-yellow-400">Yellow</option>
                            <option value="bg-purple-400">Purple</option>
                            <option value="bg-pink-400">Pink</option>
                            <option value="bg-indigo-400">Indigo</option>
                            <option value="bg-orange-400">Orange</option>
                        </select>
                    </div>

                    <div className="flex justify-end space-x-3 pt-6">
                        <button
                            type="button"
                            onClick={() => navigate('/admin/activities')}
                            className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? 'Saving...' : (isEditMode ? 'Update Activity' : 'Create Activity')}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AdminActivitiesForm;
