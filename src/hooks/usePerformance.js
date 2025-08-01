import { useState, useEffect, useCallback } from 'react';

// Hook for image lazy loading
export const useImageLazyLoading = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(false);

    const handleImageLoad = useCallback(() => {
        setIsLoading(false);
    }, []);

    const handleImageError = useCallback(() => {
        setIsLoading(false);
        setHasError(true);
    }, []);

    return {
        isLoading,
        hasError,
        handleImageLoad,
        handleImageError
    };
};

// Hook for debounce search/input
export const useDebounce = (value, delay) => {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => {
            clearTimeout(handler);
        };
    }, [value, delay]);

    return debouncedValue;
};

// Hook for intersection observer (scroll animations)
export const useIntersectionObserver = (options = {}) => {
    const [elementRef, setElementRef] = useState(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        if (!elementRef) return;

        const observer = new IntersectionObserver(([entry]) => {
            setIsVisible(entry.isIntersecting);
        }, {
            threshold: 0.1,
            ...options
        });

        observer.observe(elementRef);

        return () => {
            observer.disconnect();
        };
    }, [elementRef, options]);

    return [setElementRef, isVisible];
};

// Hook for local storage
export const useLocalStorage = (key, initialValue) => {
    const [storedValue, setStoredValue] = useState(() => {
        try {
            const item = window.localStorage.getItem(key);
            return item ? JSON.parse(item) : initialValue;
        } catch (error) {
            console.error(`Error reading localStorage key "${key}":`, error);
            return initialValue;
        }
    });

    const setValue = useCallback((value) => {
        try {
            const valueToStore = value instanceof Function ? value(storedValue) : value;
            setStoredValue(valueToStore);
            window.localStorage.setItem(key, JSON.stringify(valueToStore));
        } catch (error) {
            console.error(`Error setting localStorage key "${key}":`, error);
        }
    }, [key, storedValue]);

    return [storedValue, setValue];
};
