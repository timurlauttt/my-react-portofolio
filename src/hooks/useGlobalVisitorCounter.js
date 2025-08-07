// src/hooks/useGlobalVisitorCounter.js
import { useEffect, useState } from "react";

export const useGlobalVisitorCounter = () => {
    const [globalCount, setGlobalCount] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    const NAMESPACE = "timurlauttt-site"; // bebas, tapi harus unik
    const KEY = "visitor_count";

    useEffect(() => {
        const countUrl = `https://api.countapi.xyz/hit/${NAMESPACE}/${KEY}`;

        fetch(countUrl)
            .then((res) => res.json())
            .then((data) => {
                setGlobalCount(data.value);
                setLoading(false);
            })
            .catch(() => {
                setError(true);
                setLoading(false);
            });
    }, []);

    return { globalCount, loading, error };
};
