import React, { useEffect, useState } from "react";
// Lazy-load Firebase helpers to avoid bundling the whole SDK in the main chunk

const VisitorCounter = ({ className }) => {
    const [count, setCount] = useState(null);

    useEffect(() => {
        let mounted = true;

        (async () => {
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
                if (mounted) setCount('tidak tersedia');
            }
        })();

        return () => { mounted = false };
    }, []);

    return (
        <p className={className}>
            Total Kunjungan : {count !== null ? count : "memuat..."}
        </p>
    );
};

export default VisitorCounter;
