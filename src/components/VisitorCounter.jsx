import React from 'react';
import { useVisitorCounter } from '../hooks/useVisitorCounter';
import { useGlobalVisitorCounter } from '../hooks/useGlobalVisitorCounter';

const VisitorCounter = ({ type = "local", showIcon = true, className = "" }) => {
    const { visitCount, isFirstVisit } = useVisitorCounter();
    const { globalCount, loading, error } = useGlobalVisitorCounter();

    // Local counter - langsung render tanpa loading
    if (type === "local") {
        return (
            <div className={`flex items-center gap-2 ${className}`}>
                {showIcon && (
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"/>
                        <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd"/>
                    </svg>
                )}
                <span>
                    {visitCount} visit{visitCount !== 1 ? 's' : ''}
                    {isFirstVisit && <span className="ml-1 text-yellow-600">👋</span>}
                </span>
            </div>
        );
    }

    // Global counter - pakai loading karena API
    if (loading) {
        return (
            <div className={`flex items-center gap-2 ${className}`}>
                {showIcon && (
                    <svg className="w-4 h-4 animate-pulse" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"/>
                        <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd"/>
                    </svg>
                )}
                <span>Loading...</span>
            </div>
        );
    }

    if (error) {
        return (
            <div className={`flex items-center gap-2 text-red-600 ${className}`}>
                {showIcon && (
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"/>
                    </svg>
                )}
                <span>Count unavailable</span>
            </div>
        );
    }

    return (
        <div className={`flex items-center gap-2 ${className}`}>
            {showIcon && (
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"/>
                    <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd"/>
                </svg>
            )}
            <span>{globalCount.toLocaleString()} visitors</span>
        </div>
    );
};

export default VisitorCounter;
