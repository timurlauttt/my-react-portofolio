import { useLanguage } from '../contexts/LanguageContext';
import React, { useState, useEffect, useRef } from 'react';
import { skillsService } from '../services/serviceWrapper';

const SKY_SHADES = [
    '#0EA5E9', // sky-500
    '#38BDF8', // sky-400
    '#0284C7', // sky-600
    '#7DD3FC', // sky-300
    '#0369A1', // sky-700
    '#BAE6FD', // sky-200
];

const FALLBACK_ICONS = Object.freeze({
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
});

const SkillIcon = React.memo(({ skill, delay = 0, index = 0 }) => {
    const [isVisible, setIsVisible] = useState(false);
    const [imageError, setImageError] = useState(false);
    const ref = useRef();

    useEffect(() => {
        let timeoutId;
        const el = ref.current;
        if (!el) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    timeoutId = setTimeout(() => setIsVisible(true), delay);
                    observer.unobserve(el);
                }
            },
            { threshold: 0.1 }
        );

        observer.observe(el);
        return () => {
            if (timeoutId) clearTimeout(timeoutId);
            observer.disconnect();
        };
    }, [delay]);

    const getFallbackIcon = (skillName) => FALLBACK_ICONS[skillName] || `https://via.placeholder.com/48/374151/FFFFFF?text=${skillName.charAt(0)}`;

    const headerColor = SKY_SHADES[index % SKY_SHADES.length];

    return (
        <div
            ref={ref}
            className={`w-full aspect-square border-2 border-black dark:border-neutral-700 shadow-[4px_4px_0_#0f172a] duration-500 transform ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'} group overflow-hidden bg-white dark:bg-[#1a1a1a] rounded`}
        >
            <div
                className="h-12 sm:h-16 md:h-20 w-full flex-shrink-0 flex items-center justify-center"
                style={{ backgroundColor: headerColor }}
            >
                <img
                    src={imageError ? getFallbackIcon(skill.name) : skill.icon}
                    alt={skill.name}
                    className="w-6 h-6 sm:w-8 sm:h-8 md:w-12 md:h-12 object-contain group-hover:scale-110 transition-transform duration-300"
                    loading="lazy"
                    decoding="async"
                    onError={() => setImageError(true)}
                />
            </div>
            <div className="p-1 sm:p-2 flex flex-col flex-grow justify-center bg-white dark:bg-[#1a1a1a]">
                <span className="text-xs md:text-sm font-bold text-gray-800 dark:text-gray-200 text-center leading-tight">
                    {skill.name}
                </span>
            </div>
        </div>
    );
});

const SkillsSection = () => {
    const { t } = useLanguage();
    const [skillsData, setSkillsData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        skillsService.getAll()
            .then(d => setSkillsData(d))
            .catch(() => {})
            .finally(() => setLoading(false));
    }, []);

    const sortedSkills = React.useMemo(() => {
        return [...skillsData].sort((a, b) => (b.skillId || 0) - (a.skillId || 0));
    }, [skillsData]);

    if (loading) {
        return (
            <section className="pt-20 pb-8 px-4 md:px-40 bg-white dark:bg-[#0a0a0a]" id="skills">
                <div>
                    <h1 className="font-bold mt-4 mb-4 text-center text-lg md:text-2xl dark:text-white">{t('skillsTitle')}</h1>
                    <p className="text-gray-600 dark:text-gray-400 text-left text-sm sm:text-base">{t('skillsSubtitle')}</p>
                    <div className="flex justify-center items-center py-16">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#74247A]"></div>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className="pt-20 pb-8 px-4 md:px-40 bg-white dark:bg-[#0a0a0a]" id="skills">
            <div>
                <h1 className="font-bold mt-4 mb-4 text-center text-lg md:text-2xl dark:text-white">{t('skillsTitle')}</h1>
                <p className="text-gray-600 dark:text-gray-400 text-left text-sm md:text-lg">{t('skillsSubtitle')}</p>

                {sortedSkills.length === 0 ? (
                    <div className="text-center py-16">
                        <p className="text-gray-500 dark:text-gray-400 text-lg">{t('noSkills')}</p>
                    </div>
                ) : (
                    <div className="mt-6 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3 sm:gap-4 md:gap-6">
                        {sortedSkills.map((skill, index) => (
                            <SkillIcon key={skill.id} skill={skill} delay={index * 100} index={index} />
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
};

export default React.memo(SkillsSection);
