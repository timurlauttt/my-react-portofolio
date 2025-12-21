import React, { useState, useEffect, useRef } from 'react';
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

        window.addEventListener('scroll', toggleVisibility);
        return () => {
            window.removeEventListener('scroll', toggleVisibility);
            if (cvTimerRef.current) clearTimeout(cvTimerRef.current);
            if (topTimerRef.current) clearTimeout(topTimerRef.current);
        };
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    // Tooltip states (show on hover/focus/touch)
    const [showTooltipCV, setShowTooltipCV] = useState(false);
    const [showTooltipTop, setShowTooltipTop] = useState(false);
    const cvTimerRef = useRef(null);
    const topTimerRef = useRef(null);
    const [cvHref, setCvHref] = useState('#');

    const showTemporary = (setFn, ref) => {
        // clear any existing timer
        if (ref.current) clearTimeout(ref.current);
        setFn(true);
        ref.current = setTimeout(() => setFn(false), 1800);
    };

    // Load CV link from CV service (Firebase Storage)
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
                // ignore silently
                console.warn('Failed to load CV link from Firebase', err);
            }
        };
        loadCV();
        return () => { mounted = false; };
    }, []);

    return (
        <>
            {isVisible && (
                <div className="fixed right-6 md:right-8 bottom-24 md:bottom-6 z-40 flex items-center gap-3">
                    {/* CV Download Link (temporary anchor to Drive) */}
                    <div className="relative">
                        <a
                            href={cvHref || '#'} /* pulled from Firebase Storage via CV admin page */
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-[#06b6d4] hover:bg-[#0891b2] text-white p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center"
                            aria-label="Download CV"
                            onMouseEnter={() => setShowTooltipCV(true)}
                            onMouseLeave={() => setShowTooltipCV(false)}
                            onFocus={() => setShowTooltipCV(true)}
                            onBlur={() => setShowTooltipCV(false)}
                            onTouchStart={() => showTemporary(setShowTooltipCV, cvTimerRef)}
                        >
                            {/* CV icon (download/file) */}
                            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                                <path d="M12 3v10.586l3.293-3.293 1.414 1.414L12 17.414l-4.707-4.707 1.414-1.414L11 13.586V3h1z" />
                                <path d="M5 20h14v2H5z" />
                            </svg>
                        </a>
                        {showTooltipCV && (
                            <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 whitespace-nowrap bg-black text-white text-xs rounded px-2 py-1 shadow">
                                Download my CV 
                            </div>
                        )}
                    </div>

                    {/* Scroll to top button */}
                    <div className="relative">
                        <button
                            onClick={scrollToTop}
                            className="bg-[#74247A] hover:bg-[#5d1e62] text-white p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group flex items-center justify-center"
                            aria-label="Back to top"
                            onMouseEnter={() => setShowTooltipTop(true)}
                            onMouseLeave={() => setShowTooltipTop(false)}
                            onFocus={() => setShowTooltipTop(true)}
                            onBlur={() => setShowTooltipTop(false)}
                            onTouchStart={() => showTemporary(setShowTooltipTop, topTimerRef)}
                        >
                            <svg className="w-6 h-6 group-hover:-translate-y-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                            </svg>
                        </button>
                        {showTooltipTop && (
                            <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 whitespace-nowrap bg-black text-white text-xs rounded px-2 py-1 shadow">
                                Back to top
                            </div>
                        )}
                    </div>
                </div>
            )}
        </>
    );
};

export default FloatingActionButton;
