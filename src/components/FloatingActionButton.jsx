import React, { useState, useEffect } from 'react';
import { cvService } from '../services/serviceWrapper';

const FloatingActionButton = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const toggleVisibility = () => {
            if (window.pageYOffset > 300) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener('scroll', toggleVisibility, { passive: true });
        return () => {
            window.removeEventListener('scroll', toggleVisibility);
        };
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const [cvHref, setCvHref] = useState('#');

    useEffect(() => {
        let mounted = true;
        const loadCV = async () => {
            try {
                const cvData = await cvService.get();
                if (!mounted || !cvData) return;
                if (cvData.downloadURL) {
                    setCvHref(cvData.downloadURL);
                }
            } catch (err) {
                // CV link is non-critical, silently ignore failures
            }
        };
        // Defer CV fetch to idle time to avoid blocking initial render
        const idle = window.requestIdleCallback || ((cb) => setTimeout(cb, 2000));
        const cancelIdle = window.cancelIdleCallback || clearTimeout;
        const idleId = idle(() => loadCV());
        return () => { mounted = false; cancelIdle(idleId); };
    }, []);

    return (
        <>
            {isVisible && (
                <div className="fixed right-6 md:right-8 bottom-24 md:bottom-6 z-40 flex items-center gap-3">
                    {/* CV Download Link */}
                    <div className="relative flex flex-col items-center">
                        <a
                            href={cvHref || '#'}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-[#06b6d4] hover:bg-[#0891b2] text-white p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center"
                            aria-label="Download CV"
                        >
                            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                                <path d="M12 3v10.586l3.293-3.293 1.414 1.414L12 17.414l-4.707-4.707 1.414-1.414L11 13.586V3h1z" />
                                <path d="M5 20h14v2H5z" />
                            </svg>
                        </a>
                    </div>

                    {/* Scroll to top button */}
                    <div className="relative flex flex-col items-center">
                        <button
                            onClick={scrollToTop}
                            className="bg-[#74247A] hover:bg-[#5d1e62] text-white p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group flex items-center justify-center"
                            aria-label="Back to top"
                        >
                            <svg className="w-6 h-6 group-hover:-translate-y-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                            </svg>
                        </button>
                        {/* Desktop label - hidden on mobile */}
                        <span className="hidden md:block text-[10px] font-bold mt-1 text-center whitespace-nowrap text-black dark:text-white">Back to Top</span>
                    </div>
                </div>
            )}
        </>
    );
};

export default FloatingActionButton;
