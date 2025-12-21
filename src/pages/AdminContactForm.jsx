import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { contactService } from '../services/serviceWrapper';
import toast from 'react-hot-toast';

const AdminContactForm = () => {
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
            loadContactData();
        }
    }, [id]);

    const loadContactData = async () => {
        try {
            setInitialLoading(true);
            const data = await contactService.getById(id);
            if (data) {
                setValue('contactId', data.contactId);
                setValue('type', data.type);
                setValue('href', data.href);
                setValue('bgColor', data.bgColor);
                setValue('order', data.order);
                setValue('label', data.label);
            }
        } catch (error) {
            console.error('Error loading contact data:', error);
            toast.error('Failed to load contact data');
        } finally {
            setInitialLoading(false);
        }
    };

    const onSubmit = async (data) => {
        try {
            setLoading(true);
            
            if (isEditMode) {
                await contactService.update(id, data);
                toast.success('Contact item updated successfully');
            } else {
                await contactService.create(data);
                toast.success('Contact item created successfully');
            }
            
            navigate('/admin/contact');
        } catch (error) {
            console.error('Error saving contact data:', error);
            toast.error(isEditMode ? 'Failed to update contact item' : 'Failed to create contact item');
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
                    {isEditMode ? 'Edit Contact Item' : 'Add New Contact Item'}
                </h1>
                <p className="text-gray-600">
                    {isEditMode ? 'Update your contact information' : 'Create new contact item'}
                </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div>
                    <label htmlFor="contactId" className="block text-sm font-medium text-gray-700">
                        Contact ID
                    </label>
                    <input
                        type="number"
                        id="contactId"
                        {...register('contactId', { 
                            required: 'Contact ID is required',
                            min: { value: 1, message: 'ID must be at least 1' }
                        })}
                        className="mt-1 block w-full p-4 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        placeholder="1"
                    />
                    <p className="mt-1 text-sm text-gray-500">
                        Enter a unique number ID for this contact item (e.g., 1, 2, 3...)
                    </p>
                    {errors.contactId && (
                        <p className="mt-1 text-sm text-red-600">{errors.contactId.message}</p>
                    )}
                </div>

                <div>
                    <label htmlFor="type" className="block text-sm font-medium text-gray-700">
                        Contact Type
                    </label>
                    <select
                        id="type"
                        {...register('type', { required: 'Contact type is required' })}
                        className="mt-1 block w-full p-4 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    >
                        <option value="">Select contact type</option>
                        <option value="linkedin">LinkedIn</option>
                        <option value="whatsapp">WhatsApp</option>
                        <option value="email">Email</option>
                        <option value="github">GitHub</option>
                        <option value="instagram">Instagram</option>
                        <option value="twitter">Twitter</option>
                        <option value="facebook">Facebook</option>
                        <option value="website">Website</option>
                    </select>
                    {errors.type && (
                        <p className="mt-1 text-sm text-red-600">{errors.type.message}</p>
                    )}
                </div>

                <div>
                    <label htmlFor="label" className="block text-sm font-medium text-gray-700">
                        Display Label
                    </label>
                    <input
                        type="text"
                        id="label"
                        {...register('label', { required: 'Display label is required' })}
                        className="mt-1 block w-full p-4 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        placeholder="e.g., LinkedIn, WhatsApp, Email"
                    />
                    {errors.label && (
                        <p className="mt-1 text-sm text-red-600">{errors.label.message}</p>
                    )}
                </div>

                <div>
                    <label htmlFor="href" className="block text-sm font-medium text-gray-700">
                        Contact URL
                    </label>
                    <input
                        type="url"
                        id="href"
                        {...register('href', { required: 'Contact URL is required' })}
                        className="mt-1 block w-full p-4 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        placeholder="https://linkedin.com/in/username or mailto:email@example.com"
                    />
                    <p className="mt-1 text-sm text-gray-500">
                        Enter the URL or mailto link for the contact
                    </p>
                    {errors.href && (
                        <p className="mt-1 text-sm text-red-600">{errors.href.message}</p>
                    )}
                </div>

                <div>
                    <label htmlFor="bgColor" className="block text-sm font-medium text-gray-700">
                        Background Color
                    </label>
                    <select
                        id="bgColor"
                        {...register('bgColor', { required: 'Background color is required' })}
                        className="mt-1 block w-full p-4 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    >
                        <option value="">Select a color</option>
                        <option value="bg-[#69D3FA]">LinkedIn Blue</option>
                        <option value="bg-[#5CF1A4]">WhatsApp Green</option>
                        <option value="bg-[#FFC700]">Email Yellow</option>
                        <option value="bg-[#FF6B6B]">GitHub Red</option>
                        <option value="bg-[#E4405F]">Instagram Pink</option>
                        <option value="bg-[#1DA1F2]">Twitter Blue</option>
                        <option value="bg-[#1877F2]">Facebook Blue</option>
                        <option value="bg-indigo-600">Indigo</option>
                        <option value="bg-purple-600">Purple</option>
                        <option value="bg-gray-600">Gray</option>
                    </select>
                    <p className="mt-1 text-sm text-gray-500">
                        Choose the background color for the contact button
                    </p>
                    {errors.bgColor && (
                        <p className="mt-1 text-sm text-red-600">{errors.bgColor.message}</p>
                    )}
                </div>

                <div>
                    <label htmlFor="order" className="block text-sm font-medium text-gray-700">
                        Display Order
                    </label>
                    <input
                        type="number"
                        id="order"
                        {...register('order', { required: 'Display order is required' })}
                        className="mt-1 block w-full p-4 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        placeholder="1"
                        min="1"
                    />
                    <p className="mt-1 text-sm text-gray-500">
                        Enter the order number for display (1, 2, 3, etc.)
                    </p>
                    {errors.order && (
                        <p className="mt-1 text-sm text-red-600">{errors.order.message}</p>
                    )}
                </div>

                <div className="flex justify-end space-x-3">
                    <button
                        type="button"
                        onClick={() => navigate('/admin/contact')}
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

export default AdminContactForm;
