import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { PlusIcon, PencilIcon, TrashIcon, ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline';
import toast from 'react-hot-toast';
import { portfolioService } from '../services/serviceWrapper';

console.log('AdminPortfolio.jsx loading...');

const AdminPortfolio = () => {
    console.log('AdminPortfolio component mounting...');
    const [portfolioData, setPortfolioData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [deleteLoading, setDeleteLoading] = useState(null);

    useEffect(() => {
        console.log('AdminPortfolio useEffect running...');
        loadPortfolioData();
    }, []);

    const loadPortfolioData = async () => {
        try {
            console.log('Loading portfolio data...');
            setLoading(true);
            const data = await portfolioService.getAll();
            console.log('Portfolio data:', data);
            // Sort by portfolioId ascending
            const sortedData = data.sort((a, b) => (a.portfolioId || 0) - (b.portfolioId || 0));
            setPortfolioData(sortedData);
            console.log('Portfolio data loaded successfully');
        } catch (error) {
            console.error('Error loading portfolio data:', error);
            toast.error('Failed to load portfolio data');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this portfolio item?')) {
            return;
        }

        try {
            setDeleteLoading(id);
            await portfolioService.delete(id);
            setPortfolioData(prev => prev.filter(item => item.id !== id));
            toast.success('Portfolio item deleted successfully');
        } catch (error) {
            console.error('Error deleting portfolio item:', error);
            toast.error('Failed to delete portfolio item');
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
                    <h1 className="text-2xl font-bold text-gray-900">Portfolio Management</h1>
                    <p className="text-gray-600">Manage your portfolio projects</p>
                </div>
                <Link
                    to="/admin/portfolio/add"
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    <PlusIcon className="h-4 w-4 mr-2" />
                    Add New
                </Link>
            </div>

            <div className="bg-white shadow overflow-hidden sm:rounded-md">
                <ul className="divide-y divide-gray-200">
                    {portfolioData.length === 0 ? (
                        <li className="px-6 py-4 text-center text-gray-500">
                            No portfolio items found. Add your first project!
                        </li>
                    ) : (
                        portfolioData.map((item) => (
                            <li key={item.id} className="px-6 py-4">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center">
                                        <div className="flex-shrink-0 h-16 w-16">
                                            <img
                                                className="h-16 w-16 rounded-lg object-cover"
                                                src={item.imageUrl || `/${item.image}`}
                                                alt={item.title}
                                                onError={(e) => {
                                                    e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIHZpZXdCb3g9IjAgMCA2NCA2NCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjY0IiBoZWlnaHQ9IjY0IiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0yMS4zMzMzIDQyLjY2NjdIMzJWMzJIMjEuMzMzM1Y0Mi42NjY3WiIgZmlsbD0iIzlDQTNBRiIvPgo8L3N2Zz4K';
                                                }}
                                            />
                                        </div>
                                        <div className="ml-4">
                                            <div className="text-sm font-medium text-gray-900">
                                                ID: {item.portfolioId} - {item.title}
                                            </div>
                                            <div className="text-sm text-gray-500">
                                                {item.description}
                                            </div>
                                            <div className="flex items-center mt-1">
                                                <a
                                                    href={item.link}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-indigo-600 hover:text-indigo-900 text-sm flex items-center"
                                                >
                                                    View Project
                                                    <ArrowTopRightOnSquareIcon className="h-3 w-3 ml-1" />
                                                </a>
                                                <span className="ml-2 text-xs text-gray-400">
                                                    {item.isExternal ? 'External' : 'Internal'}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex space-x-2">
                                        <Link
                                            to={`/admin/portfolio/edit/${item.id}`}
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

export default AdminPortfolio;
