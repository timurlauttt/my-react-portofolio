import { useState, useEffect } from 'react';

export const useVisitorCounter = () => {
    const [visitCount, setVisitCount] = useState(0);
    const [isFirstVisit, setIsFirstVisit] = useState(false);

    useEffect(() => {
        // Get existing visit count from localStorage
        const existingCount = localStorage.getItem('visitCount');
        const lastVisit = localStorage.getItem('lastVisit');
        const today = new Date().toDateString();

        if (!existingCount) {
            // First time visitor
            localStorage.setItem('visitCount', '1');
            localStorage.setItem('lastVisit', today);
            setVisitCount(1);
            setIsFirstVisit(true);
        } else {
            if (lastVisit !== today) {
                // New day visit
                const newCount = parseInt(existingCount) + 1;
                localStorage.setItem('visitCount', newCount.toString());
                localStorage.setItem('lastVisit', today);
                setVisitCount(newCount);
            } else {
                // Same day visit
                setVisitCount(parseInt(existingCount));
            }
        }
    }, []);

    return { visitCount, isFirstVisit };
};
