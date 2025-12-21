import React, { useState, useEffect, useRef } from 'react';
import { skillsService } from '../services/serviceWrapper';

const SkillIcon = ({ skill, delay = 0 }) => {
    const [isVisible, setIsVisible] = useState(false);
    const [imageError, setImageError] = useState(false);
    const ref = useRef();

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setTimeout(() => setIsVisible(true), delay);
                }
            },
            { threshold: 0.1 }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => observer.disconnect();
    }, [delay]);

    const handleImageError = () => {
        setImageError(true);
    };

    // Fallback icon jika gambar gagal load
    const getFallbackIcon = (skillName) => {
        const fallbackIcons = {
            'Laravel': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/laravel/laravel-original.svg',
            'Django': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-original.svg',
            'React': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
            'JavaScript': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg',
            'PHP': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg',
            'Tailwind CSS': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg',
            'HTML5': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg',
            'CSS3': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg',
            'MySQL': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg',
            'Git': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg',
            'Python': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg',
            'Bootstrap': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg'
        };
        return fallbackIcons[skillName] || `https://via.placeholder.com/48/74247A/FFFFFF?text=${skillName.charAt(0)}`;
    };

    return (
        <div 
            ref={ref}
            className={`w-full aspect-square border-2 border-black shadow-[4px_4px_0_#000] hover:scale-105 transition-all duration-500 transform ${
                isVisible 
                    ? 'translate-x-0 opacity-100' 
                    : '-translate-x-full opacity-0'
            } group overflow-hidden bg-white`}
        >
            {/* Colored header section dengan skill icon */}
            <div 
                className="h-12 sm:h-16 md:h-20 w-full flex-shrink-0 flex items-center justify-center"
                style={{ backgroundColor: skill.color || '#374151' }}
            >
                <img 
                    src={imageError ? getFallbackIcon(skill.name) : skill.icon}
                    alt={skill.name}
                    className="w-6 h-6 sm:w-8 sm:h-8 md:w-12 md:h-12 object-contain group-hover:scale-110 transition-transform duration-300"
                    onError={handleImageError}
                />
            </div>
            
            {/* White content area dengan skill name */}
            <div className="p-1 sm:p-2 flex flex-col flex-grow justify-center bg-white">
                <span className="text-xs md:text-sm font-bold text-gray-800 text-center leading-tight">
                    {skill.name}
                </span>
            </div>
        </div>
    );
};

const SkillsSection = () => {
    const [skillsData, setSkillsData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadSkillsData = async () => {
            try {
                console.log('Loading skills data for main page...');
                setLoading(true);
                setError(null);
                const data = await skillsService.getAll();
                console.log('Skills data loaded:', data);
                setSkillsData(data);
            } catch (error) {
                console.error('Error loading skills data:', error);
                setError('Failed to load skills data');
                setSkillsData([]);
            } finally {
                setLoading(false);
            }
        };

        loadSkillsData();
    }, []);

    if (loading) {
        return (
            <section className="py-8 sm:py-16 bg-gray-50" id="skills">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-8 sm:mb-12">
                        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">Technical Skills</h2>
                        <p className="text-gray-600 max-w-2xl mx-auto text-sm sm:text-base">
                            Technologies and tools I use to create amazing digital experiences
                        </p>
                    </div>
                    <div className="flex justify-center items-center py-16">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#74247A]"></div>
                        <span className="ml-3 text-gray-600">Loading skills...</span>
                    </div>
                </div>
            </section>
        );
    }

    if (error) {
        return (
            <section className="py-8 sm:py-16 bg-gray-50" id="skills">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-8 sm:mb-12">
                        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">Technical Skills</h2>
                        <p className="text-gray-600 max-w-2xl mx-auto text-sm sm:text-base">
                            Technologies and tools I use to create amazing digital experiences
                        </p>
                    </div>
                    <div className="text-center py-16">
                        <p className="text-red-600 mb-4">{error}</p>
                        <p className="text-gray-500">Please try again later</p>
                    </div>
                </div>
            </section>
        );
    }

    // Sort skills descending by skillId (FILO - First In, Last Out)
    const sortedSkills = [...skillsData].sort((a, b) => (b.skillId || 0) - (a.skillId || 0));

    return (
        <section className="py-8 sm:py-16 bg-gray-50" id="skills">
            <div className="container mx-auto px-4">
                <div className="text-center mb-8 sm:mb-12">
                    <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">Technical Skills</h2>
                    <p className="text-gray-600 max-w-2xl mx-auto text-sm sm:text-base">
                        Technologies and tools I use to create amazing digital experiences
                    </p>
                </div>
                
                {sortedSkills.length === 0 ? (
                    <div className="text-center py-16">
                        <p className="text-gray-500 text-lg">No skills available yet.</p>
                        <p className="text-gray-400 text-sm mt-2">Add some skills through the admin panel!</p>
                    </div>
                ) : (
                    <>
                        {/* Single grid untuk semua skills */}
                        <div className="max-w-6xl mx-auto">
                            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3 sm:gap-4 md:gap-6">
                                {sortedSkills.map((skill, index) => (
                                    <SkillIcon
                                        key={skill.id}
                                        skill={skill}
                                        delay={index * 100} // Delay per item
                                    />
                                ))}
                            </div>
                        </div>

                        {/* Optional: Continuous animation row */}
                        <div className="mt-12 overflow-hidden bg-white/50 rounded-xl py-4">
                            <div className="flex animate-scroll space-x-8">
                                {[...sortedSkills, ...sortedSkills].map((skill, index) => (
                                    <div key={`scroll-${skill.id}-${index}`} className="flex-shrink-0 flex flex-col items-center opacity-60 hover:opacity-100 transition-opacity">
                                        <img 
                                            src={skill.icon}
                                            alt={skill.name}
                                            className="w-8 h-8"
                                            onError={(e) => {
                                                // Fallback konsisten dengan main grid
                                                const fallbackUrls = {
                                                    'Laravel': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/laravel/laravel-original.svg',
                                                    'Django': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-original.svg',
                                                    'Tailwind CSS': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg',
                                                    'React': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
                                                    'JavaScript': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg',
                                                    'PHP': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg',
                                                    'HTML5': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg',
                                                    'CSS3': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg',
                                                    'MySQL': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg',
                                                    'Git': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg',
                                                    'Python': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg',
                                                    'Bootstrap': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg'
                                                };
                                                
                                                if (fallbackUrls[skill.name] && e.target.src !== fallbackUrls[skill.name]) {
                                                    e.target.src = fallbackUrls[skill.name];
                                                } else {
                                                    e.target.src = `https://via.placeholder.com/32/74247A/FFFFFF?text=${skill.name.charAt(0)}`;
                                                }
                                            }}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </>
                )}
            </div>

            <style jsx>{`
                .animate-scroll {
                    animation: scroll 15s linear infinite;
                }
                @keyframes scroll {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                }
            `}</style>
        </section>
    );
};

export default SkillsSection;
