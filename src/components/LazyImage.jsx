import React from 'react';
import { useImageLazyLoading, useIntersectionObserver } from '../hooks/usePerformance';
import { ImagePlaceholder } from './Loading';

const LazyImage = ({ 
    src, 
    alt, 
    className = '', 
    placeholderHeight = 'h-48',
    fallbackSrc = '/api/placeholder/400/300'
}) => {
    const { isLoading, hasError, handleImageLoad, handleImageError } = useImageLazyLoading();
    const [setElementRef, isVisible] = useIntersectionObserver({ threshold: 0.1 });

    return (
        <div ref={setElementRef} className={`relative ${className}`}>
            {isLoading && (
                <ImagePlaceholder height={placeholderHeight} />
            )}
            
            {isVisible && (
                <img
                    src={hasError ? fallbackSrc : src}
                    alt={alt}
                    onLoad={handleImageLoad}
                    onError={handleImageError}
                    className={`${className} ${isLoading ? 'hidden' : 'block'} transition-opacity duration-300`}
                    loading="lazy"
                />
            )}
            
            {hasError && !isLoading && (
                <div className={`${placeholderHeight} bg-gray-100 border-2 border-dashed border-gray-400 flex items-center justify-center`}>
                    <span className="text-gray-500 text-sm">Gambar tidak dapat dimuat</span>
                </div>
            )}
        </div>
    );
};

export default LazyImage;
