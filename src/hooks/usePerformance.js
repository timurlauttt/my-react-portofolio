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
            if (entry.isIntersecting) {
                setIsVisible(true);
                observer.unobserve(elementRef);
            }
        }, {
            threshold: 0.1,
            ...options
        });

        observer.observe(elementRef);

        return () => {
            observer.disconnect();
        };
    }, [elementRef]);

    return [setElementRef, isVisible];
};

// Hook for count-up animation (used in stats widgets)
export const useCountUp = (target, duration = 1200) => {
    const [count, setCount] = useState(0);
    const [hasStarted, setHasStarted] = useState(false);

    const setRef = useCallback((node) => {
        if (!node) return;
        if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            setCount(target);
            setHasStarted(true);
            return;
        }
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                setHasStarted(true);
                observer.disconnect();
            }
        }, { threshold: 0.3 });
        observer.observe(node);
    }, [target]);

    useEffect(() => {
        if (!hasStarted) return;
        // reduced motion already handled
        if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            setCount(target);
            return;
        }
        let raf;
        const startTime = performance.now();
        const animate = (now) => {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.round(eased * target));
            if (progress < 1) raf = requestAnimationFrame(animate);
        };
        raf = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(raf);
    }, [hasStarted, target, duration]);

    return [count, setRef];
};

// Hook for reveal-on-scroll (section titles)
export const useReveal = (threshold = 0.15) => {
    const [isVisible, setIsVisible] = useState(false);
    const setRef = useCallback((node) => {
        if (!node) return;
        if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            setIsVisible(true);
            return;
        }
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                setIsVisible(true);
                observer.disconnect();
            }
        }, { threshold });
        observer.observe(node);
    }, [threshold]);
    return [isVisible, setRef];
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
