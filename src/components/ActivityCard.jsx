import React, { useState, useEffect, useRef } from 'react';

const ActivityCard = ({ title, description, bgColor = "bg-yellow-400", link, isExternal = true, delay = 0 }) => {
    const [isVisible, setIsVisible] = useState(false);
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

    const CardContent = () => (
        <div 
            ref={ref}
            className={`w-40 aspect-square border-2 border-black shadow-[4px_4px_0_#000] hover:scale-105 transition-all cursor-pointer flex flex-col group overflow-hidden
            transform duration-600 ${
                isVisible 
                    ? 'translate-x-0 opacity-100 scale-100' 
                    : '-translate-x-8 opacity-0 scale-95'
            }`}
        >
            {/* Colored header section with title */}
            <div className={`${bgColor} h-12 w-full flex-shrink-0 p-2 flex items-center justify-center relative`}>
                <h5 className="font-bold text-center text-xs leading-tight text-white">{title}</h5>
                
                {/* Link indicator icon */}
                {link && (
                    <div className="absolute top-1 right-1 opacity-70 group-hover:opacity-100 transition-opacity">
                        <svg className="w-3 h-3 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                    </div>
                )}
            </div>
            
            {/* White content area with description */}
            <div className="p-2 text-xs flex flex-col flex-grow md:justify-center bg-white">
                <p className="text-gray-700 text-justify">{description}</p>
            </div>
        </div>
    );

    // Render card: only the title/header contains the link (if provided).
    return (
        <div className="block">
            <div className="inline-block">
                {/* Render CardContent but allow the header/title to include the anchor */}
                <div 
                    ref={ref}
                    className={`w-40 aspect-square border-2 border-black shadow-[4px_4px_0_#000] hover:scale-105 transition-all cursor-pointer flex flex-col group overflow-hidden
                    transform duration-600 ${
                        isVisible 
                            ? 'translate-x-0 opacity-100 scale-100' 
                            : '-translate-x-8 opacity-0 scale-95'
                    }`}
                >
                    <div className={`${bgColor} h-12 w-full flex-shrink-0 p-2 flex items-center justify-center relative`}>
                        {link ? (
                            <a
                                href={link}
                                target={isExternal ? '_blank' : '_self'}
                                rel={isExternal ? 'noopener noreferrer' : ''}
                                className="font-bold text-center text-xs leading-tight text-white no-underline"
                                aria-label={`Open ${title} in new tab`}
                                onClick={(e) => e.stopPropagation()}>
                                <h5 className="font-bold text-center text-xs leading-tight text-white">{title}</h5>
                            </a>
                        ) : (
                            <h5 className="font-bold text-center text-xs leading-tight text-white">{title}</h5>
                        )}

                        {/* Link indicator icon (kept for visuals) */}
                        {link && (
                            <div className="absolute top-1 right-1 opacity-70 group-hover:opacity-100 transition-opacity">
                                <svg className="w-3 h-3 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                </svg>
                            </div>
                        )}
                    </div>
                    
                    {/* White content area with description */}
                    <div className="p-2 text-xs flex flex-col flex-grow bg-white">
                        <p className="text-gray-700 text-justify leading-tight">{description}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ActivityCard;