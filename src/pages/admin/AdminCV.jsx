import React, { useState, useEffect } from 'react';
import { cvService } from '../../services/serviceWrapper';
import toast from 'react-hot-toast';
import { 
    LinkIcon, 
    DocumentIcon, 
    TrashIcon,
    ArrowDownTrayIcon,
    CheckCircleIcon
} from '@heroicons/react/24/outline';

const AdminCV = () => {
    const [cvData, setCvData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [deleting, setDeleting] = useState(false);
    const [cvUrl, setCvUrl] = useState('');
    const [fileName, setFileName] = useState('');

    useEffect(() => {
        loadCV();
    }, []);

    const loadCV = async () => {
        try {
            setLoading(true);
            const data = await cvService.get();
            setCvData(data);
        } catch (error) {
            console.error('Error loading CV:', error);
            // Don't show error if CV doesn't exist yet
            if (error.message !== 'No CV found') {
                toast.error('Failed to load CV data');
            }
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async (e) => {
        e.preventDefault();
        
        if (!cvUrl.trim()) {
            toast.error('Please enter a CV URL');
            return;
        }

        try {
            setSaving(true);
            await cvService.save(cvUrl.trim(), fileName.trim() || 'CV.pdf');
            toast.success('CV URL saved successfully!');
            setCvUrl('');
            setFileName('');
            await loadCV();
        } catch (error) {
            console.error('Error saving CV:', error);
            toast.error(error.message || 'Failed to save CV URL');
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async () => {
        if (!window.confirm('Are you sure you want to delete the current CV?')) {
            return;
        }

        try {
            setDeleting(true);
            await cvService.delete();
            toast.success('CV deleted successfully');
            setCvData(null);
        } catch (error) {
            console.error('Error deleting CV:', error);
            toast.error('Failed to delete CV');
        } finally {
            setDeleting(false);
        }
    };

    const formatDate = (date) => {
        if (!date) return 'Unknown';
        const d = date.toDate ? date.toDate() : new Date(date);
        return d.toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto">
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-900">CV Management</h1>
                <p className="text-gray-600">Manage your CV download link</p>
            </div>

            {/* Current CV Display */}
            {cvData && (
                <div className="mb-8 bg-white rounded-lg shadow-md p-6">
                    <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-4">
                            <div className="flex-shrink-0">
                                <CheckCircleIcon className="h-12 w-12 text-green-500" />
                            </div>
                            <div className="flex-1">
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">Current CV</h3>
                                <div className="space-y-1 text-sm text-gray-600">
                                    <p><span className="font-medium">File:</span> {cvData.fileName}</p>
                                    <p><span className="font-medium">URL:</span> <a href={cvData.downloadURL} target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline break-all">{cvData.downloadURL}</a></p>
                                    <p><span className="font-medium">Last Updated:</span> {formatDate(cvData.updatedAt)}</p>
                                </div>
                            </div>
                        </div>
                        <div className="flex space-x-2">
                            <a
                                href={cvData.downloadURL}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                <ArrowDownTrayIcon className="h-4 w-4 mr-2" />
                                Test
                            </a>
                            <button
                                onClick={handleDelete}
                                disabled={deleting}
                                className="inline-flex items-center px-3 py-2 border border-red-300 shadow-sm text-sm font-medium rounded-md text-red-700 bg-white hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50"
                            >
                                <TrashIcon className="h-4 w-4 mr-2" />
                                {deleting ? 'Deleting...' : 'Delete'}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* URL Input Form */}
            <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    {cvData ? 'Update CV URL' : 'Add CV URL'}
                </h3>

                <form onSubmit={handleSave} className="space-y-4">
                    {/* URL Input */}
                    <div>
                        <label htmlFor="cvUrl" className="block text-sm font-medium text-gray-700 mb-2">
                            CV URL <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <LinkIcon className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                type="url"
                                id="cvUrl"
                                value={cvUrl}
                                onChange={(e) => setCvUrl(e.target.value)}
                                placeholder="https://drive.google.com/file/d/..."
                                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                required
                            />
                        </div>
                        <p className="mt-1 text-xs text-gray-500">
                            Paste the public URL of your CV from Google Drive, Dropbox, or any file hosting service
                        </p>
                    </div>

                    {/* File Name Input */}
                    <div>
                        <label htmlFor="fileName" className="block text-sm font-medium text-gray-700 mb-2">
                            Display Name (optional)
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <DocumentIcon className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                type="text"
                                id="fileName"
                                value={fileName}
                                onChange={(e) => setFileName(e.target.value)}
                                placeholder="CV.pdf"
                                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            />
                        </div>
                        <p className="mt-1 text-xs text-gray-500">
                            Optional: Customize the file name displayed to users (default: CV.pdf)
                        </p>
                    </div>

                    {/* Save Button */}
                    <div className="flex justify-end">
                        <button
                            type="submit"
                            disabled={saving}
                            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <LinkIcon className="h-5 w-5 mr-2" />
                            {saving ? 'Saving...' : 'Save CV URL'}
                        </button>
                    </div>
                </form>

                {/* Info Box */}
                <div className="mt-6 bg-blue-50 border border-blue-200 rounded-md p-4">
                    <h4 className="text-sm font-medium text-blue-900 mb-2">📝 How to get a public URL:</h4>
                    <div className="text-sm text-blue-800 space-y-2">
                        <div>
                            <p className="font-medium">Google Drive:</p>
                            <ol className="list-decimal list-inside ml-2 space-y-1">
                                <li>Upload your CV to Google Drive</li>
                                <li>Right-click → Share → Change to "Anyone with the link"</li>
                                <li>Copy the share link</li>
                            </ol>
                        </div>
                        <div>
                            <p className="font-medium">Dropbox:</p>
                            <ol className="list-decimal list-inside ml-2 space-y-1">
                                <li>Upload your CV to Dropbox</li>
                                <li>Click Share → Create link</li>
                                <li>Copy the link</li>
                            </ol>
                        </div>
                        <p className="text-xs mt-2">
                            💡 Make sure the link allows public access so visitors can download your CV
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminCV;
