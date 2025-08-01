import React from 'react';
import { useIntersectionObserver } from '../hooks/usePerformance';

// Fade In Animation Component
export const FadeIn = ({ children, className = '', delay = 0 }) => {
    const [setElementRef, isVisible] = useIntersectionObserver();

    return (
        <div
            ref={setElementRef}
            className={`transition-all duration-1000 transform ${
                isVisible 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 translate-y-8'
            } ${className}`}
            style={{ transitionDelay: `${delay}ms` }}
        >
            {children}
        </div>
    );
};

// Slide In From Left
export const SlideInLeft = ({ children, className = '', delay = 0 }) => {
    const [setElementRef, isVisible] = useIntersectionObserver();

    return (
        <div
            ref={setElementRef}
            className={`transition-all duration-1000 transform ${
                isVisible 
                    ? 'opacity-100 translate-x-0' 
                    : 'opacity-0 -translate-x-full'
            } ${className}`}
            style={{ transitionDelay: `${delay}ms` }}
        >
            {children}
        </div>
    );
};

// Slide In From Right
export const SlideInRight = ({ children, className = '', delay = 0 }) => {
    const [setElementRef, isVisible] = useIntersectionObserver();

    return (
        <div
            ref={setElementRef}
            className={`transition-all duration-1000 transform ${
                isVisible 
                    ? 'opacity-100 translate-x-0' 
                    : 'opacity-0 translate-x-full'
            } ${className}`}
            style={{ transitionDelay: `${delay}ms` }}
        >
            {children}
        </div>
    );
};

// Scale In Animation
export const ScaleIn = ({ children, className = '', delay = 0 }) => {
    const [setElementRef, isVisible] = useIntersectionObserver();

    return (
        <div
            ref={setElementRef}
            className={`transition-all duration-700 transform ${
                isVisible 
                    ? 'opacity-100 scale-100' 
                    : 'opacity-0 scale-75'
            } ${className}`}
            style={{ transitionDelay: `${delay}ms` }}
        >
            {children}
        </div>
    );
};

// Stagger Animation for lists
export const StaggerContainer = ({ children, className = '' }) => {
    return (
        <div className={className}>
            {React.Children.map(children, (child, index) => (
                <FadeIn delay={index * 100}>
                    {child}
                </FadeIn>
            ))}
        </div>
    );
};
