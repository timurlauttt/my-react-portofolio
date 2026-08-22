import React, { useEffect, useState } from "react";
import { useLanguage } from "../contexts/LanguageContext";

const VisitorCounter = ({ className }) => {
    const { t } = useLanguage();
    const [count, setCount] = useState(null);

    useEffect(() => {
        let mounted = true;
        try {
            const stored = localStorage.getItem('portfolio_visits');
            const baseCount = 1420;
            let current = stored ? parseInt(stored, 10) : baseCount;
            if (!sessionStorage.getItem('visited_session')) {
                current += 1;
                sessionStorage.setItem('visited_session', 'true');
                localStorage.setItem('portfolio_visits', current.toString());
            }
            if (mounted) setCount(current);
        } catch {
            if (mounted) setCount(1421);
        }

        return () => { mounted = false; };
    }, []);

    const countDisplay = count !== null ? count.toLocaleString('id-ID') : t('loading');

    return (
        <p className={className}>
            {t('totalVisits')} : {countDisplay}
        </p>
    );
};

export default VisitorCounter;
