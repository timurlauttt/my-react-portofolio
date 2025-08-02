import React, { useState, useEffect } from 'react';

const LoadingScreen = () => {
    const [loading, setLoading] = useState(true);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) {
                    clearInterval(timer);
                    setTimeout(() => setLoading(false), 500);
                    return 100;
                }
                return prev + 10;
            });
        }, 200);

        return () => clearInterval(timer);
    }, []);

    if (!loading) return null;

    return (
        <div className="fixed inset-0 bg-white z-50 flex flex-col items-center justify-center px-4">
            <div className="text-center w-full max-w-md">                
                {/* Custom Loading Animation */}
                <div className="w-full max-w-xs mx-auto mb-4">
                    <div className="relative w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div 
                            className="absolute top-0 left-0 h-full bg-gradient-to-r from-[#74247A] to-[#FFC700] rounded-full transition-all duration-300"
                            style={{ width: `${progress}%` }}
                        ></div>
                    </div>
                </div>
                <p className="text-sm text-gray-500 font-medium">{progress}%</p>
            </div>
        </div>
    );
};

export default LoadingScreen;
