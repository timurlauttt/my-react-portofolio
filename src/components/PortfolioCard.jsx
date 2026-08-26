import React, { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import PortfolioModal from './PortfolioModal';
import LazyImage from './LazyImage';

const PortfolioCard = ({ image, title, description, longDescription = '', link, isExternal = true, delay = 0, tech = null, startDate = null, endDate = null }) => {
    const { t } = useLanguage();
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef();

    useEffect(() => {
        let timeoutId;
        const el = ref.current;
        if (!el) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    timeoutId = setTimeout(() => setIsVisible(true), delay);
                    observer.unobserve(el);
                }
            },
            { threshold: 0.1 }
        );

        observer.observe(el);
        return () => {
            if (timeoutId) clearTimeout(timeoutId);
            observer.disconnect();
        };
    }, [delay]);

    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <>
            <div
                ref={ref}
                className={`bg-white dark:bg-slate-900 border-2 sm:border-3 border-black dark:border-slate-300 shadow-[6px_6px_0_#0f172a] dark:shadow-[6px_6px_0px_0px_#ffffff] cursor-pointer flex flex-col sm:flex-row transform duration-500 rounded nb-card-hover ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}
                onClick={() => setIsModalOpen(true)}
                onKeyDown={(e) => { if (e.key === 'Enter') setIsModalOpen(true); }}
                tabIndex={0}
                role="button"
            >
                <div className="w-full sm:w-3/5 h-auto overflow-hidden border-b-2 sm:border-b-0 sm:border-r-2 border-black dark:border-slate-800">
                    <LazyImage src={image} alt={title} className="w-full h-48 sm:h-full object-cover" placeholderHeight="h-48" width={800} height={450} />
                </div>
                <div className="p-4 flex flex-col flex-1">
                    <h3 className="text-base sm:text-lg font-bold mb-2 text-black dark:text-slate-100">{title}</h3>
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-1 sm:mt-2 text-justify line-clamp-3">{description}</p>
                    <div className="mt-3 flex justify-end">
                        <button type="button" onClick={(e) => { e.stopPropagation(); setIsModalOpen(true); }}
                            className="bg-[#0EA5E9] dark:bg-[#38BDF8] text-white dark:text-slate-950 border-2 border-black dark:border-white px-3 py-1.5 text-xs uppercase font-bold shadow-[3px_3px_0_#0f172a] dark:shadow-[3px_3px_0_#ffffff] transition-all duration-200 ease-in-out cursor-pointer hover:translate-x-0.5 hover:translate-y-0.5 w-fit rounded">
                            {t('learnMore')}
                        </button>
                    </div>
                </div>
            </div>
            <PortfolioModal open={isModalOpen} onClose={() => setIsModalOpen(false)} title={title} image={image} description={description} longDescription={longDescription} link={link} tech={tech} startDate={startDate} endDate={endDate} />
        </>
    );
};

export default React.memo(PortfolioCard);
