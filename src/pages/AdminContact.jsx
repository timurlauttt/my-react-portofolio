import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { PlusIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import toast from 'react-hot-toast';
import { contactService } from '../services/serviceWrapper';

const AdminContact = () => {
    const [contactData, setContactData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [deleteLoading, setDeleteLoading] = useState(null);

    useEffect(() => {
        loadContactData();
    }, []);

    const loadContactData = async () => {
        try {
            setLoading(true);
            const data = await contactService.getAll();
            // Sort by contactId ascending
            const sortedData = data.sort((a, b) => (a.contactId || 0) - (b.contactId || 0));
            setContactData(sortedData);
        } catch (error) {
            console.error('Error loading contact data:', error);
            toast.error('Failed to load contact data');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this contact?')) {
            return;
        }

        try {
            setDeleteLoading(id);
            await contactService.delete(id);
            await loadContactData(); // Reload data after deletion
            toast.success('Contact deleted successfully');
        } catch (error) {
            console.error('Error deleting contact:', error);
            toast.error('Failed to delete contact');
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
                    <h1 className="text-2xl font-bold text-gray-900">Contact Management</h1>
                    <p className="text-gray-600">Manage your contact information and social links</p>
                </div>
                <Link
                    to="/admin/contact/add"
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    <PlusIcon className="h-4 w-4 mr-2" />
                    Add New
                </Link>
            </div>

            <div className="bg-white shadow overflow-hidden sm:rounded-md">
                <ul className="divide-y divide-gray-200">
                    {contactData.length === 0 ? (
                        <li className="px-6 py-4 text-center text-gray-500">
                            No contact information found. Add your first contact!
                        </li>
                    ) : (
                        contactData.map((item) => (
                            <li key={item.id} className="px-6 py-4">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center">
                                        <div className={`flex-shrink-0 h-12 w-12 rounded ${item.bgColor} flex items-center justify-center`}>
                                            <span className="text-white font-bold text-xs">
                                                {item.type.slice(0, 2).toUpperCase()}
                                            </span>
                                        </div>
                                        <div className="ml-4">
                                            <div className="text-sm font-medium text-gray-900">
                                                ID: {item.contactId} - {item.label}
                                                {item.order && (
                                                    <span className="ml-2 inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                                                        #{item.order}
                                                    </span>
                                                )}
                                            </div>
                                            <div className="text-sm text-gray-500">
                                                Type: {item.type}
                                            </div>
                                            <div className="flex items-center mt-1">
                                                <a
                                                    href={item.href}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-indigo-600 hover:text-indigo-900 text-sm truncate max-w-xs"
                                                >
                                                    {item.href}
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex space-x-2">
                                        <Link
                                            to={`/admin/contact/edit/${item.id}`}
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

export default AdminContact;
