import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
    UserIcon, 
    CodeBracketIcon, 
    BriefcaseIcon, 
    AcademicCapIcon, 
    EnvelopeIcon,
    PlusIcon
} from '@heroicons/react/24/outline';
import toast from 'react-hot-toast';
import { testFirebaseConnection } from '../utils/firebaseTest';

const AdminDashboard = () => {
    const [stats, setStats] = useState({
        about: 0,
        skills: 0,
        portfolio: 0,
        activities: 0,
        contact: 0
    });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const initDashboard = async () => {
            console.log('AdminDashboard initializing...');
            
            try {
                // Test Firebase connection first
                const firebaseTest = await testFirebaseConnection();
                console.log('Firebase test result:', firebaseTest);
                
                if (firebaseTest.success) {
                    toast.success('Firebase connected successfully');
                } else {
                    toast.error('Firebase connection failed');
                }
                
                // For now, use mock data to prevent Firebase errors
                setStats({
                    about: 3,
                    skills: 8,
                    portfolio: 5,
                    activities: 12,
                    contact: 4
                });
                
            } catch (error) {
                console.error('Dashboard initialization error:', error);
                toast.error('Dashboard initialization failed');
                
                // Still set mock data even if Firebase fails
                setStats({
                    about: 0,
                    skills: 0,
                    portfolio: 0,
                    activities: 0,
                    contact: 0
                });
            }
        };
        
        initDashboard();
    }, []);

    const sections = [
        {
            name: 'About Me',
            href: '/admin/about',
            icon: UserIcon,
            count: stats.about,
            color: 'bg-blue-500'
        },
        {
            name: 'Skills',
            href: '/admin/skills',
            icon: CodeBracketIcon,
            count: stats.skills,
            color: 'bg-green-500'
        },
        {
            name: 'Portfolio',
            href: '/admin/portfolio',
            icon: BriefcaseIcon,
            count: stats.portfolio,
            color: 'bg-purple-500'
        },
        {
            name: 'Activities',
            href: '/admin/activities',
            icon: AcademicCapIcon,
            count: stats.activities,
            color: 'bg-yellow-500'
        },
        {
            name: 'Contact',
            href: '/admin/contact',
            icon: EnvelopeIcon,
            count: stats.contact,
            color: 'bg-red-500'
        }
    ];

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
                <p className="text-gray-600">Manage your portfolio content</p>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {sections.map((section) => (
                    <div key={section.name} className="bg-white overflow-hidden shadow rounded-lg">
                        <div className="p-5">
                            <div className="flex items-center">
                                <div className={`flex-shrink-0 ${section.color} rounded-md p-3`}>
                                    <section.icon className="h-6 w-6 text-white" />
                                </div>
                                <div className="ml-5 w-0 flex-1">
                                    <dl>
                                        <dt className="text-sm font-medium text-gray-500 truncate">
                                            {section.name}
                                        </dt>
                                        <dd className="text-lg font-medium text-gray-900">
                                            {section.count} items
                                        </dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                        <div className="bg-gray-50 px-5 py-3">
                            <div className="text-sm">
                                <Link
                                    to={section.href}
                                    className="font-medium text-indigo-700 hover:text-indigo-900 flex items-center"
                                >
                                    Manage {section.name}
                                    <PlusIcon className="ml-1 h-4 w-4" />
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AdminDashboard;