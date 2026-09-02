import { useLanguage } from '../contexts/LanguageContext';
import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import { createPortal } from 'react-dom';
import { skillsService } from '../services/serviceWrapper';
import { useReveal } from '../hooks/usePerformance';

const SKY_SHADES = [
    '#0EA5E9', // sky-500
    '#38BDF8', // sky-400
    '#0284C7', // sky-600
    '#7DD3FC', // sky-300
    '#0369A1', // sky-700
    '#BAE6FD', // sky-200
];

const FALLBACK_ICONS = Object.freeze({
    'Laravel': '/icons/laravel.svg',
    'Django': '/icons/django.svg',
    'React': '/icons/react.svg',
    'JavaScript': '/icons/javascript.svg',
    'PHP': '/icons/php.svg',
    'Tailwind CSS': '/icons/tailwindcss.svg',
    'HTML5': '/icons/html5.svg',
    'CSS3': '/icons/css3.svg',
    'MySQL': '/icons/mysql.svg',
    'Git': '/icons/git.svg',
    'Python': '/icons/python.svg',
    'Bootstrap': '/icons/bootstrap.svg'
});

const SKILL_DETAILS = Object.freeze({
    'Laravel': { category: 'Backend Framework', proficiency: 'skillLevelProficient' },
    'Django': { category: 'Backend Framework', proficiency: 'skillLevelProficient' },
    'React': { category: 'Frontend Library', proficiency: 'skillLevelProficient' },
    'JavaScript': { category: 'Core Language', proficiency: 'skillLevelProficient' },
    'PHP': { category: 'Core Language', proficiency: 'skillLevelProficient' },
    'Tailwind CSS': { category: 'CSS Framework', proficiency: 'skillLevelProficient' },
    'HTML5': { category: 'Markup Language', proficiency: 'skillLevelProficient' },
    'CSS3': { category: 'Stylesheet Language', proficiency: 'skillLevelProficient' },
    'MySQL': { category: 'Relational Database', proficiency: 'skillLevelProficient' },
    'Git': { category: 'Version Control', proficiency: 'skillLevelProficient' },
    'Python': { category: 'Core Language', proficiency: 'skillLevelIntermediate' },
    'Bootstrap': { category: 'CSS Framework', proficiency: 'skillLevelIntermediate' }
});

const SkillIcon = React.memo(({ skill, delay = 0, index = 0 }) => {
    const { t } = useLanguage();
    const [isVisible, setIsVisible] = useState(false);
    const [imageError, setImageError] = useState(false);
    const [showTooltip, setShowTooltip] = useState(false);
    const ref = useRef();
    const tooltipRef = useRef(null);
    const hideTimerRef = useRef(null);
    const [tooltipStyle, setTooltipStyle] = useState({});
    const [arrowLeft, setArrowLeft] = useState('50%');

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

    const getFallbackIcon = (skillName) => FALLBACK_ICONS[skillName] || `/icons/${skillName.toLowerCase().replace(/\s+/g, '')}.svg`;
    const headerColor = SKY_SHADES[index % SKY_SHADES.length];
    const detail = SKILL_DETAILS[skill.name] || { category: 'Tech Skill', proficiency: 'skillLevelIntermediate' };

    // Portal + fixed positioning: escapes card's transform containing block so tooltip never gets clipped
    useLayoutEffect(() => {
        if (!showTooltip) return;
        const card = ref.current;
        const tip = tooltipRef.current;
        if (!card || !tip) return;
        const updatePosition = () => {
            const c = ref.current;
            const t = tooltipRef.current;
            if (!c || !t) return;
            const cardRect = c.getBoundingClientRect();
            const tipW = t.offsetWidth;
            const tipH = t.offsetHeight;
            const vw = window.innerWidth;
            const vh = window.innerHeight;
            const cardCenter = cardRect.left + cardRect.width / 2;
            let left = cardCenter - tipW / 2;
            left = Math.max(8, Math.min(left, vw - tipW - 8));
            let top = cardRect.top - tipH - 8;
            if (top < 8) top = cardRect.bottom + 8;
            top = Math.max(8, Math.min(top, vh - tipH - 8));
            setTooltipStyle({ position: 'fixed', left: `${left}px`, top: `${top}px` });
            setArrowLeft(`${cardCenter - left}px`);
        };
        let raf1 = requestAnimationFrame(() => {
            const raf2 = requestAnimationFrame(updatePosition);
            // store for cleanup via closure
            updatePosition._raf2 = raf2;
        });
        window.addEventListener('resize', updatePosition);
        window.addEventListener('scroll', updatePosition, { passive: true });
        return () => {
            cancelAnimationFrame(raf1);
            if (updatePosition._raf2) cancelAnimationFrame(updatePosition._raf2);
            window.removeEventListener('resize', updatePosition);
            window.removeEventListener('scroll', updatePosition);
        };
    }, [showTooltip]);

    const handleEnter = () => {
        if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
        setShowTooltip(true);
    };
    const handleLeave = () => {
        if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
        hideTimerRef.current = setTimeout(() => setShowTooltip(false), 120);
    };
    const handleClick = () => {
        setShowTooltip(prev => !prev);
        if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
        hideTimerRef.current = setTimeout(() => setShowTooltip(false), 2800);
    };

    useEffect(() => () => { if (hideTimerRef.current) clearTimeout(hideTimerRef.current); }, []);

    const tooltipNode = showTooltip ? (
        <div
            ref={tooltipRef}
            style={tooltipStyle}
            className="fixed z-[9999] max-w-[min(88vw,280px)] w-max pointer-events-none bg-black text-white text-[11px] sm:text-xs font-mono font-medium px-3 py-2 rounded-lg border border-white/20 shadow-[3px_3px_0_#0EA5E9] animate-fadeIn text-center leading-tight whitespace-normal break-words"
        >
            <span className="font-bold text-[#38BDF8] block sm:inline">{skill.name}</span>
            <span className="text-slate-300 block sm:inline text-[10px] sm:text-xs mt-0.5 sm:mt-0 sm:ml-1">{detail.category}</span>
            <span
                className="absolute top-full w-2.5 h-2.5 bg-black border-r border-b border-white/20 rotate-45 -mt-1.5 -translate-x-1/2"
                style={{ left: arrowLeft }}
                aria-hidden
            />
        </div>
    ) : null;

    return (
        <>
            <div
                ref={ref}
                onMouseEnter={handleEnter}
                onMouseLeave={handleLeave}
                onClick={handleClick}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleClick(); } }}
                onFocus={handleEnter}
                onBlur={handleLeave}
                className={`relative w-full aspect-square border-2 border-black dark:border-slate-300 shadow-[4px_4px_0_#0f172a] dark:shadow-[4px_4px_0_#ffffff] nb-card-hover card-enter ${isVisible ? 'card-enter-visible' : 'card-enter-hidden'} group bg-white dark:bg-slate-900 rounded cursor-pointer touch-manipulation overflow-visible`}
            >
                <div
                    className="h-12 sm:h-16 md:h-20 w-full flex-shrink-0 flex items-center justify-center relative"
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
                <div className="p-1 sm:p-2 flex flex-col flex-grow justify-center bg-white dark:bg-slate-900">
                    <span className="text-[11px] sm:text-xs md:text-sm font-bold text-slate-800 dark:text-slate-100 text-center leading-tight break-words">
                        {skill.name}
                    </span>
                </div>
            </div>
            {tooltipNode && typeof document !== 'undefined' ? createPortal(tooltipNode, document.body) : null}
        </>
    );
});

const SkillsSection = () => {
    const { t } = useLanguage();
    const [skillsData, setSkillsData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [titleVisible, titleRef] = useReveal(0.2);

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
            <section className="pt-20 pb-8 px-4 md:px-40 bg-white dark:bg-slate-950" id="skills">
                <div>
                    <h2 className="font-bold mt-4 mb-4 text-center text-lg md:text-2xl text-black dark:text-slate-100">{t('skillsTitle')}</h2>
                    <p className="text-slate-600 dark:text-slate-400 text-left text-sm sm:text-base">{t('skillsSubtitle')}</p>
                    <div className="flex justify-center items-center py-16">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0EA5E9] dark:border-[#38BDF8]"></div>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className="pt-20 pb-8 px-4 md:px-40 bg-white dark:bg-slate-950 overflow-visible" id="skills">
            <div className="overflow-visible">
                <h2 ref={titleRef} className={`font-bold mt-4 mb-4 text-center text-lg md:text-2xl text-black dark:text-slate-100 reveal ${titleVisible ? 'reveal-visible' : ''}`}>{t('skillsTitle')}</h2>
                <p className={`text-slate-600 dark:text-slate-400 text-left text-sm md:text-lg leading-relaxed reveal ${titleVisible ? 'reveal-visible reveal-delay-1' : ''}`}>{t('skillsSubtitle')}</p>

                {sortedSkills.length === 0 ? (
                    <div className="text-center py-16">
                        <p className="text-slate-500 dark:text-slate-400 text-lg">{t('noSkills')}</p>
                    </div>
                ) : (
                    <div className="mt-6 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3 sm:gap-4 md:gap-6 overflow-visible">
                        {sortedSkills.map((skill, index) => (
                            <SkillIcon key={skill.id} skill={skill} delay={index * 80} index={index} />
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
};

export default React.memo(SkillsSection);
