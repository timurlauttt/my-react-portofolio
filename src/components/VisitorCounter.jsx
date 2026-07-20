import React, { useEffect, useState } from "react";
// Lazy-load Firebase helpers to avoid bundling the whole SDK in the main chunk

const VisitorCounter = ({ className }) => {
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
                if (mounted) setCount('tidak tersedia');
            }
        };

        // Not part of the visible UI's critical content, so push the
        // Realtime Database SDK fetch off the initial render's critical path.
        const idle = window.requestIdleCallback || ((cb) => setTimeout(cb, 200));
        const cancelIdle = window.cancelIdleCallback || clearTimeout;
        const idleId = idle(run);

        return () => { mounted = false; cancelIdle(idleId); };
    }, []);

    return (
        <p className={className}>
            Total Kunjungan : {count !== null ? count : "memuat..."}
        </p>
    );
};

export default VisitorCounter;
