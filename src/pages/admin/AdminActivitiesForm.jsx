import React, { useState, useEffect } from 'react';
import { activitiesService } from '../../services/serviceWrapper';
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';
import { simpleLocalUploadService } from '../../services/simpleImageUploadService';

const AdminActivitiesForm = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const isEdit = Boolean(id);
    const [loading, setLoading] = useState(isEdit);

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        fullDescription: '',
        date: '',
        location: '',
    category: 'Activity',
        status: 'completed',
        bgColor: 'bg-blue-500',
        link: '',
        skills: [],
        achievements: [],
        image: '',
        links: []
    });
    
    // Image handling states - sama seperti portfolio
    const [imageFile, setImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState('');
    const [uploading, setUploading] = useState(false);

    // Input states for textarea fields (to properly handle line breaks)
    const [skillsInput, setSkillsInput] = useState('');
    const [achievementsInput, setAchievementsInput] = useState('');
    const [linksInput, setLinksInput] = useState('');

    // Color options untuk background
    const colorOptions = [
        { value: 'bg-blue-500', label: 'Blue', color: 'bg-blue-500' },
        { value: 'bg-green-500', label: 'Green', color: 'bg-green-500' },
        { value: 'bg-red-500', label: 'Red', color: 'bg-red-500' },
        { value: 'bg-yellow-500', label: 'Yellow', color: 'bg-yellow-500' },
        { value: 'bg-purple-500', label: 'Purple', color: 'bg-purple-500' },
        { value: 'bg-pink-500', label: 'Pink', color: 'bg-pink-500' },
        { value: 'bg-indigo-500', label: 'Indigo', color: 'bg-indigo-500' },
        { value: 'bg-teal-500', label: 'Teal', color: 'bg-teal-500' },
        { value: 'bg-orange-500', label: 'Orange', color: 'bg-orange-500' },
        { value: 'bg-gray-600', label: 'Gray', color: 'bg-gray-600' }
    ];

    // Category options (English)
    const categoryOptions = [
        'Activity',
        'Education',
        'Project',
        'Competition',
        'Workshop',
        'Certification',
        'Organization',
        'Volunteer'
    ];

    useEffect(() => {
        if (isEdit) {
            loadActivity();
        }
    }, [id, isEdit]);

    const loadActivity = async () => {
        try {
            setLoading(true);
            const activity = await activitiesService.getById(id);

            // Set form data
            setFormData({
                ...activity,
                skills: activity.skills || [],
                achievements: activity.achievements || [],
                links: activity.links || [],
                image: activity.image || ''
            });

            // Set input states for textarea fields
            setSkillsInput((activity.skills || []).join(', '));
            setAchievementsInput((activity.achievements || []).join('\n'));
            setLinksInput((activity.links || []).map(link => `${link.title}|${link.url}`).join('\n'));
            
            // Set image preview - sama seperti portfolio
            if (activity.image) {
                setImagePreview(activity.image);
            }
        } catch (error) {
            console.error('Error loading activity:', error);
            toast.error('Activity not found');
            navigate('/admin/activities');
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // Skills Handler
    const handleSkillsChange = (e) => {
        const value = e.target.value;
        setSkillsInput(value);

        const skillsArray = value
            .split(',')
            .map(skill => skill.trim())
            .filter(skill => skill !== '');

        setFormData(prev => ({
            ...prev,
            skills: skillsArray
        }));
    };

    // Achievements Handler
    const handleAchievementsChange = (e) => {
        const value = e.target.value;
        setAchievementsInput(value);

        const achievementsArray = value
            .split('\n')
            .map(achievement => achievement.trim())
            .filter(achievement => achievement !== '');

        setFormData(prev => ({
            ...prev,
            achievements: achievementsArray
        }));
    };

    // Links Handler
    const handleLinksChange = (e) => {
        const value = e.target.value;
        setLinksInput(value);

        const linksArray = value
            .split('\n')
            .map(line => line.trim())
            .filter(line => line !== '')
            .map(line => {
                const [title, url] = line.split('|').map(part => part.trim());
                return url ? { title, url } : { title: line, url: line };
            });

        setFormData(prev => ({
            ...prev,
            links: linksArray
        }));
    };

    // Image Handler - EXACT COPY dari Portfolio
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            // Validate file type
            if (!file.type.startsWith('image/')) {
                toast.error('Please select a valid image file');
                return;
            }

            // Validate file size (max 5MB)
            if (file.size > 5 * 1024 * 1024) {
                toast.error('Image size should be less than 5MB');
                return;
            }

            setImageFile(file);

            // Create preview URL - sama seperti portfolio
            const previewUrl = URL.createObjectURL(file);
            setImagePreview(previewUrl);
            
            // Update form data with preview URL temporarily
            setFormData(prev => ({
                ...prev,
                image: previewUrl
            }));
        }
    };

    // Use local upload service to avoid embedding base64 in Firestore

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validation
        if (!formData.title?.trim()) {
            toast.error('Title is required!');
            return;
        }

        if (!formData.description?.trim()) {
            toast.error('Description is required!');
            return;
        }

        try {
            setUploading(true);
            let finalImageData = formData.image;

            // Handle image upload using simple local upload (returns public placeholder URL)
            if (imageFile) {
                try {
                    const uploadResult = await simpleLocalUploadService.uploadImage(imageFile, 'activities');
                    finalImageData = uploadResult.downloadURL;
                } catch (error) {
                    console.error('Error uploading image:', error);
                    toast.error('Failed to process image');
                    return;
                }
            }

            const activityData = {
                ...formData,
                image: finalImageData,
                skills: formData.skills || [],
                achievements: formData.achievements || [],
                links: formData.links || []
            };

            if (isEdit) {
                await activitiesService.update(id, activityData);
                toast.success('Activity updated successfully!');
            } else {
                // Generate new ID for new activity
                const allActivities = await activitiesService.getAll();
                const activityId = allActivities.length > 0 ?
                    Math.max(...allActivities.map(a => a.activityId || 0)) + 1 : 1;
                activityData.activityId = activityId;

                await activitiesService.create(activityData);
                toast.success('Activity created successfully!');
            }

            // Cleanup object URL to prevent memory leaks
            if (imagePreview && imagePreview.startsWith('blob:')) {
                URL.revokeObjectURL(imagePreview);
            }

            navigate('/admin/activities');
        } catch (error) {
            console.error('Error saving activity:', error);
            toast.error(`Failed to save activity: ${error.message}`);
        } finally {
            setUploading(false);
        }
    };

    // Remove current image - EXACT COPY dari Portfolio
    const handleRemoveImage = () => {
        // Cleanup object URL if it exists
        if (imagePreview && imagePreview.startsWith('blob:')) {
            URL.revokeObjectURL(imagePreview);
        }
        
        setImageFile(null);
        setImagePreview('');
        setFormData(prev => ({ ...prev, image: '' }));
    };

    // Cleanup on component unmount
    useEffect(() => {
        return () => {
            if (imagePreview && imagePreview.startsWith('blob:')) {
                URL.revokeObjectURL(imagePreview);
            }
        };
    }, [imagePreview]);

    if (loading && isEdit) {
        return (
            <div className="flex justify-center items-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                <span className="ml-3">Loading activity...</span>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900">
                        {isEdit ? 'Edit Activity' : 'Add New Activity'}
                    </h2>
                    <p className="text-gray-600 mt-1">
                        {isEdit ? 'Update activity information' : 'Create a new activity with detailed information'}
                    </p>
                </div>
                <button
                    onClick={() => navigate('/admin/activities')}
                    className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-md transition-colors flex items-center gap-2"
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    Back to List
                </button>
            </div>

            {/* Form */}
            <div className="bg-white p-6 rounded-lg shadow-md">
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Basic Information */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Title *
                            </label>
                            <input
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleInputChange}
                                required
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Activity title"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Category
                            </label>
                            <select
                                name="category"
                                value={formData.category}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            >
                                {categoryOptions.map(category => (
                                    <option key={category} value={category}>{category}</option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Date
                            </label>
                            <input
                                type="text"
                                name="date"
                                value={formData.date}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="e.g., January - March 2024"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Location
                            </label>
                            <input
                                type="text"
                                name="location"
                                value={formData.location}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="e.g., Jakarta / Remote"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Status
                            </label>
                            <select
                                name="status"
                                value={formData.status}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            >
                                <option value="completed">Completed</option>
                                <option value="ongoing">Ongoing</option>
                                <option value="draft">Draft</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Background Color
                            </label>
                            <div className="grid grid-cols-5 gap-2">
                                {colorOptions.map(option => (
                                    <button
                                        key={option.value}
                                        type="button"
                                        onClick={() => setFormData(prev => ({ ...prev, bgColor: option.value }))}
                                        className={`w-full h-8 rounded-md border-2 ${option.color} ${
                                            formData.bgColor === option.value ? 'border-gray-800 ring-2 ring-gray-800' : 'border-gray-300'
                                        } hover:border-gray-600 transition-colors`}
                                        title={option.label}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Descriptions */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Short Description (for card) *
                        </label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleInputChange}
                            required
                            rows={2}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Brief description shown on activity card"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Full Description (for modal)
                        </label>
                        <textarea
                            name="fullDescription"
                            value={formData.fullDescription}
                            onChange={handleInputChange}
                            rows={4}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Detailed description shown in modal popup"
                        />
                    </div>

                    {/* Skills */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Skills (comma separated)
                        </label>
                        <input
                            type="text"
                            value={skillsInput}
                            onChange={handleSkillsChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="React, JavaScript, Public Speaking, Team Leadership"
                        />
                        <p className="text-xs text-gray-500 mt-1">
                            Separate skills with commas. Example: "React, JavaScript, Public Speaking"
                        </p>
                        {formData.skills.length > 0 && (
                            <div className="mt-2 flex flex-wrap gap-1">
                                {formData.skills.map((skill, index) => (
                                    <span key={index} className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800">
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Achievements */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Achievements (one per line)
                        </label>
                        <textarea
                            value={achievementsInput}
                            onChange={handleAchievementsChange}
                            rows={4}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="First achievement here&#10;Second achievement here&#10;Third achievement here"
                            style={{ whiteSpace: 'pre-wrap' }}
                        />
                        <p className="text-xs text-gray-500 mt-1">
                            Press Enter to start a new line for each achievement
                        </p>
                        {formData.achievements.length > 0 && (
                            <div className="mt-2">
                                <p className="text-sm font-medium text-gray-700">Preview:</p>
                                <ul className="list-disc list-inside text-sm text-gray-600 mt-1">
                                    {formData.achievements.map((achievement, index) => (
                                        <li key={index}>{achievement}</li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>

                    {/* External Links */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            External Links (one per line)
                        </label>
                        <textarea
                            value={linksInput}
                            onChange={handleLinksChange}
                            rows={3}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Certificate|https://certificate-url.com&#10;Project Repository|https://github.com/user/repo&#10;https://example.com"
                            style={{ whiteSpace: 'pre-wrap' }}
                        />
                        <p className="text-xs text-gray-500 mt-1">
                            Format: "Title|URL" (one per line). If no title provided, URL will be used as title.<br />
                            Press Enter to start a new line for each link.
                        </p>
                        {formData.links.length > 0 && (
                            <div className="mt-2">
                                <p className="text-sm font-medium text-gray-700">Preview:</p>
                                <ul className="list-disc list-inside text-sm text-gray-600 mt-1">
                                    {formData.links.map((link, index) => (
                                        <li key={index}>
                                            <span className="font-medium">{link.title}</span> -
                                            <a href={link.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline ml-1">
                                                {link.url}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>

                    {/* Main Link */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Main External Link
                        </label>
                        <input
                            type="url"
                            name="link"
                            value={formData.link}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="https://example.com"
                        />
                        <p className="text-xs text-gray-500 mt-1">Main link that appears as button in modal</p>
                    </div>

                    {/* Image Upload - EXACT COPY dari Portfolio */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Activity Image
                        </label>
                        <div className="space-y-4">
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />

                            {imagePreview && (
                                <div className="relative inline-block">
                                    <img
                                        src={imagePreview}
                                        alt="Activity preview"
                                        className="w-40 h-40 object-cover rounded-md border shadow-sm"
                                    />
                                    <button
                                        type="button"
                                        onClick={handleRemoveImage}
                                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors shadow-sm"
                                        title="Remove image"
                                    >
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                </div>
                            )}

                            <p className="text-xs text-gray-500">
                                Upload an image for the activity. Max size: 5MB. Supported formats: JPG, PNG, GIF, WebP
                            </p>
                        </div>
                    </div>

                    {/* Submit Buttons */}
                    <div className="flex gap-3 pt-4 border-t">
                        <button
                            type="submit"
                            disabled={uploading}
                            className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-6 py-2 rounded-md transition-colors flex items-center gap-2"
                        >
                            {uploading ? (
                                <>
                                    <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Uploading...
                                </>
                            ) : (
                                <>
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isEdit ? "M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" : "M12 4v16m8-8H4"} />
                                    </svg>
                                    {isEdit ? 'Update Activity' : 'Create Activity'}
                                </>
                            )}
                        </button>

                        <button
                            type="button"
                            onClick={() => navigate('/admin/activities')}
                            className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-md transition-colors flex items-center gap-2"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AdminActivitiesForm;