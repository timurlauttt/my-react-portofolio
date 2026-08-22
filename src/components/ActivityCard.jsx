import React, { useState, useEffect, useRef } from 'react';

const SKY_SHADES = [
    '#0EA5E9', // sky-500
    '#0284C7', // sky-600
    '#38BDF8', // sky-400
    '#0369A1', // sky-700
    '#7DD3FC', // sky-300
    '#0C4A6E', // sky-900
];

const ActivityCard = ({ title, description, link, isExternal = true, delay = 0, index = 0 }) => {
    const [isVisible, setIsVisible] = useState(false);
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

    const headerColor = SKY_SHADES[index % SKY_SHADES.length];

    return (
        <div
            ref={ref}
            className={`w-full aspect-square border-2 border-black dark:border-neutral-700 shadow-[4px_4px_0_#0f172a] duration-500 transform ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'} group overflow-hidden bg-white dark:bg-[#1a1a1a] rounded`}
        >
            <div
                className="h-14 sm:h-16 md:h-20 w-full flex-shrink-0 flex items-center justify-center relative p-1 sm:p-1.5"
                style={{ backgroundColor: headerColor }}
            >
                {link ? (
                    <a href={link} target={isExternal ? '_blank' : '_self'} rel={isExternal ? 'noopener noreferrer' : ''}
                        className={`font-bold text-center leading-[1.15] sm:leading-tight text-white no-underline px-0.5 line-clamp-3 sm:line-clamp-none ${title.length > 22 ? 'text-[8.5px] sm:text-[10.5px] md:text-xs' : 'text-[9.5px] sm:text-xs md:text-xs'}`} onClick={(e) => e.stopPropagation()}>
                        {title}
                    </a>
                ) : (
                    <h5 className={`font-bold text-center leading-[1.15] sm:leading-tight text-white px-0.5 line-clamp-3 sm:line-clamp-none ${title.length > 22 ? 'text-[8.5px] sm:text-[10.5px] md:text-xs' : 'text-[9.5px] sm:text-xs md:text-xs'}`}>{title}</h5>
                )}
                {link && (
                    <div className="absolute top-1 right-1 opacity-50 group-hover:opacity-100 transition-opacity">
                        <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                    </div>
                )}
            </div>
            <div className="p-1 sm:p-2 flex flex-col flex-grow justify-center bg-white dark:bg-[#1a1a1a] overflow-hidden">
                <p className="text-[9.5px] sm:text-xs text-gray-700 dark:text-gray-300 text-justify leading-[1.2] sm:leading-tight line-clamp-3 sm:line-clamp-4">{description}</p>
            </div>
        </div>
    );
};

export default React.memo(ActivityCard);
