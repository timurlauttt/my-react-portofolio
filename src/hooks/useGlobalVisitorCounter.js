import { useState, useEffect } from 'react';

export const useGlobalVisitorCounter = () => {
    const [globalCount, setGlobalCount] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchVisitorCount = async () => {
            try {
                setLoading(true);
                // Replace 'your-website-name' with your actual website identifier
                const response = await fetch('https://api.countapi.xyz/hit/my-react-portfolio/visits');
                
                if (!response.ok) {
                    throw new Error('Failed to fetch visitor count');
                }
                
                const data = await response.json();
                setGlobalCount(data.value);
                setError(null);
            } catch (err) {
                console.error('Error fetching visitor count:', err);
                setError(err.message);
                // Fallback to localStorage if API fails
                const localCount = localStorage.getItem('fallbackVisitCount') || '0';
                const newCount = parseInt(localCount) + 1;
                localStorage.setItem('fallbackVisitCount', newCount.toString());
                setGlobalCount(newCount);
            } finally {
                setLoading(false);
            }
        };

        fetchVisitorCount();
    }, []);

    return { globalCount, loading, error };
};
