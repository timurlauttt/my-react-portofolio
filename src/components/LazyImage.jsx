import React, { useState } from 'react';

const LazyImage = ({ 
    src, 
    alt, 
    className = '', 
    placeholderHeight = 'h-48',
    fallbackSrc = '/images/placeholder.svg',
    width,
    height 
}) => {
    const [loaded, setLoaded] = useState(false);
    const [hasError, setHasError] = useState(false);
    const [imgSrc, setImgSrc] = useState(src);

    React.useEffect(() => { setImgSrc(src); setHasError(false); setLoaded(false); }, [src]);

    // Don't show error overlay for placeholder - it's always available
    const isPlaceholder = imgSrc === '/images/placeholder.svg' || imgSrc === fallbackSrc;

    return (
        <div className="relative w-full h-full min-h-[12rem] bg-neutral-100 dark:bg-neutral-900 overflow-hidden flex items-center justify-center">
            {!loaded && !hasError && (
                <div className="absolute inset-0 z-0 shimmer-bg" aria-hidden />
            )}
            
            <img
                src={imgSrc}
                alt={alt || 'Image'}
                onLoad={() => setLoaded(true)}
                onError={() => {
                    if (!isPlaceholder && imgSrc !== fallbackSrc) {
                        setImgSrc(fallbackSrc);
                    } else {
                        setLoaded(true);
                        setHasError(true);
                    }
                }}
                className={`w-full h-full object-cover transition-opacity duration-300 ${loaded ? 'opacity-100' : 'opacity-0'} ${className}`}
                loading="lazy"
                decoding="async"
                {...(width ? { width } : {})}
                {...(height ? { height } : {})}
            />
            
            {hasError && !isPlaceholder && (
                <div className="absolute inset-0 bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center p-2">
                    <span className="text-gray-400 dark:text-gray-500 text-xs text-center">Gambar tidak dapat dimuat</span>
                </div>
            )}
        </div>
    );
};

export default LazyImage;
