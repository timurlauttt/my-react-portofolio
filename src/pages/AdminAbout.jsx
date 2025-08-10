import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { PlusIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import toast from 'react-hot-toast';
import { aboutService } from '../services/serviceWrapper';

const AdminAbout = () => {
    const [aboutData, setAboutData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [deleteLoading, setDeleteLoading] = useState(null);

    useEffect(() => {
        loadAboutData();
    }, []);

    const loadAboutData = async () => {
        try {
            setLoading(true);
            const data = await aboutService.getAll();
            setAboutData(data);
        } catch (error) {
            console.error('Error loading about data:', error);
            toast.error('Failed to load about data');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this item?')) {
            return;
        }

        try {
            setDeleteLoading(id);
            await aboutService.delete(id);
            await loadAboutData(); // Reload data after deletion
            toast.success('Item deleted successfully');
        } catch (error) {
            console.error('Error deleting item:', error);
            toast.error('Failed to delete item');
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
                    <h1 className="text-2xl font-bold text-gray-900">About Me Management</h1>
                    <p className="text-gray-600">Manage your about me content</p>
                </div>
                <Link
                    to="/admin/about/add"
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    <PlusIcon className="h-4 w-4 mr-2" />
                    Add New
                </Link>
            </div>

            <div className="bg-white shadow overflow-hidden sm:rounded-md">
                <ul className="divide-y divide-gray-200">
                    {aboutData.length === 0 ? (
                        <li className="px-6 py-4 text-center text-gray-500">
                            No about me content found. Add your first item!
                        </li>
                    ) : (
                        aboutData.map((item) => (
                            <li key={item.id} className="px-6 py-4">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center">
                                        <div className="flex-shrink-0 h-12 w-12">
                                            <img
                                                className="h-12 w-12 rounded-full object-cover"
                                                src={item.imageUrl || `/${item.image}`}
                                                alt={item.imageAlt || item.title}
                                                onError={(e) => {
                                                    e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDgiIGhlaWdodD0iNDgiIHZpZXdCb3g9IjAgMCA0OCA0OCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMjQiIGN5PSIyNCIgcj0iMjQiIGZpbGw9IiNGM0Y0RjYiLz4KPGNpcmNsZSBjeD0iMjQiIGN5PSIxOCIgcj0iNiIgZmlsbD0iIzlDQTNBRiIvPgo8cGF0aCBkPSJNMzYgNDBDMzYgMzIuMjY4IDMwLjczMiAyNiAyNCAyNkMxNy4yNjggMjYgMTIgMzIuMjY4IDEyIDQwIiBmaWxsPSIjOUNBM0FGIi8+Cjwvc3ZnPgo=';
                                                }}
                                            />
                                        </div>
                                        <div className="ml-4">
                                            <div className="text-sm font-medium text-gray-900">
                                                {item.title}
                                            </div>
                                            <div className="text-sm text-gray-500">
                                                {item.description}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex space-x-2">
                                        <Link
                                            to={`/admin/about/edit/${item.id}`}
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

export default AdminAbout;
