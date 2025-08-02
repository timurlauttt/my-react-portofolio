import React, { useState, useEffect } from 'react';

const ScrollProgress = () => {
    const [scrollProgress, setScrollProgress] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
            const progress = (window.scrollY / totalHeight) * 100;
            setScrollProgress(progress);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className="fixed top-0 left-0 w-full h-1 bg-gray-200 z-50">
            <div 
                className="h-full bg-gradient-to-r from-[#74247A] to-[#FFC700] transition-all duration-150"
                style={{ width: `${scrollProgress}%` }}
            ></div>
        </div>
    );
};

export default ScrollProgress;
