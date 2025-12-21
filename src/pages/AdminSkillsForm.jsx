import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { skillsService } from '../services/serviceWrapper';
import toast from 'react-hot-toast';

const AdminSkillsForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [initialLoading, setInitialLoading] = useState(id ? true : false);
    
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors }
    } = useForm();

    const isEditMode = !!id;

    useEffect(() => {
        if (isEditMode) {
            loadSkillData();
        }
    }, [id]);

    const loadSkillData = async () => {
        try {
            setInitialLoading(true);
            const data = await skillsService.getById(id);
            if (data) {
                setValue('name', data.name);
                setValue('icon', data.icon);
                setValue('color', data.color);
                setValue('skillId', data.skillId);
            }
        } catch (error) {
            console.error('Error loading skill data:', error);
            toast.error('Failed to load skill data');
        } finally {
            setInitialLoading(false);
        }
    };

    const onSubmit = async (data) => {
        try {
            setLoading(true);
            
            if (isEditMode) {
                await skillsService.update(id, data);
                toast.success('Skill updated successfully');
            } else {
                await skillsService.create(data);
                toast.success('Skill created successfully');
            }
            
            navigate('/admin/skills');
        } catch (error) {
            console.error('Error saving skill data:', error);
            toast.error(isEditMode ? 'Failed to update skill' : 'Failed to create skill');
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
                    {isEditMode ? 'Edit Skill' : 'Add New Skill'}
                </h1>
                <p className="text-gray-600">
                    {isEditMode ? 'Update your skill information' : 'Create new skill'}
                </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div>
                    <label htmlFor="skillId" className="block text-sm font-medium text-gray-700">
                        Skill ID
                    </label>
                    <input
                        type="number"
                        id="skillId"
                        {...register('skillId', { 
                            required: 'Skill ID is required',
                            min: { value: 1, message: 'ID must be at least 1' }
                        })}
                        className="mt-1 block w-full p-4 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        placeholder="1"
                    />
                    <p className="mt-1 text-sm text-gray-500">
                        Enter a unique number ID for this skill (e.g., 1, 2, 3...)
                    </p>
                    {errors.skillId && (
                        <p className="mt-1 text-sm text-red-600">{errors.skillId.message}</p>
                    )}
                </div>

                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                        Skill Name
                    </label>
                    <input
                        type="text"
                        id="name"
                        {...register('name', { required: 'Skill name is required' })}
                        className="mt-1 block w-full p-4 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        placeholder="e.g., React, JavaScript, Python"
                    />
                    {errors.name && (
                        <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
                    )}
                </div>

                <div>
                    <label htmlFor="icon" className="block text-sm font-medium text-gray-700">
                        Icon URL
                    </label>
                    <input
                        type="url"
                        id="icon"
                        {...register('icon', { required: 'Icon URL is required' })}
                        className="mt-1 block w-full p-4 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        placeholder="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg"
                    />
                    <p className="mt-1 text-sm text-gray-500">
                        Enter the URL of the skill icon (SVG recommended)
                    </p>
                    {errors.icon && (
                        <p className="mt-1 text-sm text-red-600">{errors.icon.message}</p>
                    )}
                </div>

                <div>
                    <label htmlFor="color" className="block text-sm font-medium text-gray-700">
                        Background Color
                    </label>
                    <input
                        type="text"
                        id="color"
                        {...register('color', { required: 'Color is required' })}
                        className="mt-1 block w-full p-4 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        placeholder="#22d3ee"
                    />
                    <p className="mt-1 text-sm text-gray-500">
                        Enter hex color code (e.g., #22d3ee, #f87171)
                    </p>
                    {errors.color && (
                        <p className="mt-1 text-sm text-red-600">{errors.color.message}</p>
                    )}
                </div>

                <div className="flex justify-end space-x-3">
                    <button
                        type="button"
                        onClick={() => navigate('/admin/skills')}
                        className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        disabled={loading}
                        className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? 'Saving...' : (isEditMode ? 'Update' : 'Create')}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AdminSkillsForm;
