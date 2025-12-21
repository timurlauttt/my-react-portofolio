import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
    UserIcon, 
    CodeBracketIcon, 
    BriefcaseIcon, 
    AcademicCapIcon, 
    EnvelopeIcon,
    PlusIcon,
    ArrowPathIcon
} from '@heroicons/react/24/outline';
import toast from 'react-hot-toast';
import { 
    aboutService,
    skillsService,
    portfolioService,
    activitiesService,
    contactService
} from '../services/serviceWrapper';

const AdminDashboard = () => {
    const [stats, setStats] = useState({
        about: 0,
        skills: 0,
        portfolio: 0,
        activities: 0,
        contact: 0
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadDashboardStats = async () => {
            console.log('AdminDashboard loading real data...');
            
            try {
                setLoading(true);
                
                // Fetch real data from all services
                const [
                    aboutData,
                    skillsData,
                    portfolioData,
                    activitiesData,
                    contactData
                ] = await Promise.all([
                    aboutService.getAll(),
                    skillsService.getAll(),
                    portfolioService.getAll(),
                    activitiesService.getAll(),
                    contactService.getAll()
                ]);

                console.log('Dashboard data loaded:', {
                    about: aboutData.length,
                    skills: skillsData.length,
                    portfolio: portfolioData.length,
                    activities: activitiesData.length,
                    contact: contactData.length
                });

                setStats({
                    about: aboutData.length,
                    skills: skillsData.length,
                    portfolio: portfolioData.length,
                    activities: activitiesData.length,
                    contact: contactData.length
                });
                
            } catch (error) {
                console.error('Dashboard data loading error:', error);
                toast.error('Failed to load dashboard statistics');
                
                // Set zeros on error
                setStats({
                    about: 0,
                    skills: 0,
                    portfolio: 0,
                    activities: 0,
                    contact: 0
                });
            } finally {
                setLoading(false);
            }
        };
        
        loadDashboardStats();
    }, []);

    const handleRefreshStats = async () => {
        try {
            setLoading(true);
            
            // Fetch fresh data from all services
            const [
                aboutData,
                skillsData,
                portfolioData,
                activitiesData,
                contactData
            ] = await Promise.all([
                aboutService.getAll(),
                skillsService.getAll(),
                portfolioService.getAll(),
                activitiesService.getAll(),
                contactService.getAll()
            ]);

            setStats({
                about: aboutData.length,
                skills: skillsData.length,
                portfolio: portfolioData.length,
                activities: activitiesData.length,
                contact: contactData.length
            });

            toast.success('Dashboard statistics refreshed!');
            
        } catch (error) {
            console.error('Error refreshing dashboard:', error);
            toast.error('Failed to refresh dashboard statistics');
        } finally {
            setLoading(false);
        }
    };

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
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
                    <p className="text-gray-600">Manage your portfolio content</p>
                </div>
                <button
                    onClick={handleRefreshStats}
                    disabled={loading}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <ArrowPathIcon className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
                    {loading ? 'Refreshing...' : 'Refresh Stats'}
                </button>
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
