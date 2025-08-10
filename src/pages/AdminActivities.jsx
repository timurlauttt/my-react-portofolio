import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { PlusIcon, PencilIcon, TrashIcon, ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline';
import toast from 'react-hot-toast';
import { activitiesService } from '../services/serviceWrapper';

const AdminActivities = () => {
    console.log('AdminActivities component mounting...');
    const [activitiesData, setActivitiesData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [deleteLoading, setDeleteLoading] = useState(null);

    useEffect(() => {
        console.log('AdminActivities useEffect running...');
        loadActivitiesData();
    }, []);

    const loadActivitiesData = async () => {
        try {
            console.log('Loading activities data...');
            setLoading(true);
            const data = await activitiesService.getAll();
            console.log('Activities data from Firebase:', data);
            // Sort by activityId ascending
            const sortedData = data.sort((a, b) => (a.activityId || 0) - (b.activityId || 0));
            setActivitiesData(sortedData);
            console.log('Activities data loaded successfully');
        } catch (error) {
            console.error('Error loading activities data:', error);
            toast.error('Failed to load activities data');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this activity?')) {
            return;
        }

        try {
            setDeleteLoading(id);
            await activitiesService.delete(id);
            await loadActivitiesData(); // Reload data after deletion
            toast.success('Activity deleted successfully');
        } catch (error) {
            console.error('Error deleting activity:', error);
            toast.error('Failed to delete activity');
        } finally {
            setDeleteLoading(null);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Activities Management</h1>
                    <p className="text-gray-600">Manage your activities and experiences</p>
                </div>
                <Link
                    to="/admin/activities/add"
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    <PlusIcon className="h-4 w-4 mr-2" />
                    Add New
                </Link>
            </div>

            <div className="bg-white shadow overflow-hidden sm:rounded-md">
                <ul className="divide-y divide-gray-200">
                    {activitiesData.length === 0 ? (
                        <li className="px-6 py-4 text-center text-gray-500">
                            No activities found. Add your first activity!
                        </li>
                    ) : (
                        activitiesData.map((item) => (
                            <li key={item.id} className="px-6 py-4">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center">
                                        <div className={`flex-shrink-0 h-12 w-12 rounded ${item.bgColor || 'bg-gray-500'} flex items-center justify-center`}>
                                            <span className="text-white font-bold text-xs">
                                                {item.title.slice(0, 2).toUpperCase()}
                                            </span>
                                        </div>
                                        <div className="ml-4">
                                            <div className="text-sm font-medium text-gray-900">
                                                ID: {item.activityId} - {item.title}
                                            </div>
                                            <div className="text-sm text-gray-500">
                                                {item.description}
                                            </div>
                                            {item.link && item.link !== '#' && (
                                                <div className="flex items-center mt-1">
                                                    <a
                                                        href={item.link}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="text-indigo-600 hover:text-indigo-900 text-sm flex items-center"
                                                    >
                                                        View Activity
                                                        <ArrowTopRightOnSquareIcon className="h-3 w-3 ml-1" />
                                                    </a>
                                                    <span className="ml-2 text-xs text-gray-400">
                                                        {item.isExternal ? 'External' : 'Internal'}
                                                    </span>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    <div className="flex space-x-2">
                                        <Link
                                            to={`/admin/activities/edit/${item.id}`}
                                            className="text-indigo-600 hover:text-indigo-900"
                                        >
                                            <PencilIcon className="h-5 w-5" />
                                        </Link>
                                        <button
                                            onClick={() => handleDelete(item.id)}
                                            disabled={deleteLoading === item.id}
                                            className="text-red-600 hover:text-red-900 disabled:opacity-50"
                                        >
                                            {deleteLoading === item.id ? (
                                                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-red-600"></div>
                                            ) : (
                                                <TrashIcon className="h-5 w-5" />
                                            )}
                                        </button>
                                    </div>
                                </div>
                            </li>
                        ))
                    )}
                </ul>
            </div>
        </div>
    );
};

export default AdminActivities;
