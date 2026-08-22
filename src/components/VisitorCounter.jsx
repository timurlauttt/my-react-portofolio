import React, { useEffect, useState } from "react";
import { useLanguage } from "../contexts/LanguageContext";

const VisitorCounter = ({ className }) => {
    const { t } = useLanguage();
    const [count, setCount] = useState(null);

    useEffect(() => {
        let mounted = true;

        const run = async () => {
            try {
                const fb = await import('../firebase');
                const database = await fb.getDatabaseInstance();
                const { ref, get, set, increment } = await import('firebase/database');
                const counterRef = ref(database, 'visitor_count');

                const snapshot = await get(counterRef);
                if (!mounted) return;

                if (snapshot.exists()) {
                    await set(counterRef, increment(1));
                    setCount(snapshot.val() + 1);
                } else {
                    await set(counterRef, 1);
                    setCount(1);
                }
            } catch (error) {
                console.error('Error reading visitor count:', error);
                if (mounted) setCount('error');
            }
        };

        const idle = window.requestIdleCallback || ((cb) => setTimeout(cb, 200));
        const cancelIdle = window.cancelIdleCallback || clearTimeout;
        const idleId = idle(run);

        return () => { mounted = false; cancelIdle(idleId); };
    }, []);

    const countDisplay = count === 'error' ? t('unavailable') : (count !== null ? count : t('loading'));

    return (
        <p className={className}>
            {t('totalVisits')} : {countDisplay}
        </p>
    );
};

export default VisitorCounter;
