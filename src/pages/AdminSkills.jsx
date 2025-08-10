import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { PlusIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import toast from 'react-hot-toast';
import { skillsService } from '../services/serviceWrapper';

const AdminSkills = () => {
    const [skillsData, setSkillsData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [deleteLoading, setDeleteLoading] = useState(null);

    useEffect(() => {
        loadSkillsData();
    }, []);

    const loadSkillsData = async () => {
        try {
            setLoading(true);
            const data = await skillsService.getAll();
            // Sort by skillId descending
            const sortedData = data.sort((a, b) => (b.skillId || 0) - (a.skillId || 0));
            setSkillsData(sortedData);
        } catch (error) {
            console.error('Error loading skills data:', error);
            toast.error('Failed to load skills data');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this skill?')) {
            return;
        }

        try {
            setDeleteLoading(id);
            await skillsService.delete(id);
            await loadSkillsData(); // Reload data after deletion
            toast.success('Skill deleted successfully');
        } catch (error) {
            console.error('Error deleting skill:', error);
            toast.error('Failed to delete skill');
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
                    <h1 className="text-2xl font-bold text-gray-900">Skills Management</h1>
                    <p className="text-gray-600">Manage your technical skills and expertise</p>
                </div>
                <Link
                    to="/admin/skills/add"
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    <PlusIcon className="h-4 w-4 mr-2" />
                    Add New
                </Link>
            </div>

            <div className="bg-white shadow overflow-hidden sm:rounded-md">
                <ul className="divide-y divide-gray-200">
                    {skillsData.length === 0 ? (
                        <li className="px-6 py-4 text-center text-gray-500">
                            No skills found. Add your first skill!
                        </li>
                    ) : (
                        skillsData.map((item) => (
                            <li key={item.id} className="px-6 py-4">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center">
                                    <div 
                                        className="flex-shrink-0 h-12 w-12 rounded flex items-center justify-center"
                                        style={{ backgroundColor: item.color || '#6366F1' }}
                                    >
                                        {item.icon ? (
                                            <img 
                                                src={item.icon} 
                                                alt={item.name}
                                                className="w-8 h-8 object-contain"
                                                onError={(e) => {
                                                    e.target.style.display = 'none';
                                                    e.target.nextElementSibling.style.display = 'block';
                                                }}
                                            />
                                        ) : (
                                            <span className="text-white font-bold text-xs">
                                                {item.name.slice(0, 2).toUpperCase()}
                                            </span>
                                        )}
                                        <span 
                                            className="text-white font-bold text-xs hidden"
                                        >
                                            {item.name.slice(0, 2).toUpperCase()}
                                        </span>
                                    </div>
                                    <div className="ml-4">
                                        <div className="text-sm font-medium text-gray-900">
                                            ID: {item.skillId} - {item.name}
                                        </div>
                                        {item.icon && (
                                            <div className="text-sm text-gray-500">
                                                Icon: {item.icon.length > 40 ? `${item.icon.substring(0, 40)}...` : item.icon}
                                            </div>
                                        )}
                                        {item.color && (
                                            <div className="flex items-center mt-1">
                                                <div 
                                                    className="w-4 h-4 rounded mr-2 border border-gray-200"
                                                    style={{ backgroundColor: item.color }}
                                                />
                                                <span className="text-xs text-gray-500">
                                                    {item.color}
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                                    <div className="flex space-x-2">
                                        <Link
                                            to={`/admin/skills/edit/${item.id}`}
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

export default AdminSkills;
