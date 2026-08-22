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
                className={`bg-white dark:bg-[#1a1a1a] border-2 sm:border-3 border-black dark:border-neutral-700 shadow-[6px_6px_0_#0f172a] dark:shadow-[6px_6px_0_#0f172a] cursor-pointer flex flex-col sm:flex-row transform duration-500 rounded ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}
                onClick={() => setIsModalOpen(true)}
                onKeyDown={(e) => { if (e.key === 'Enter') setIsModalOpen(true); }}
                tabIndex={0}
                role="button"
            >
                <div className="w-full sm:w-3/5 h-auto overflow-hidden border-b-2 sm:border-b-0 sm:border-r-2 border-black dark:border-neutral-700">
                    <LazyImage src={image} alt={title} className="w-full h-48 sm:h-full object-cover" placeholderHeight="h-48" width={800} height={450} />
                </div>
                <div className="p-4 flex flex-col flex-1">
                    <h5 className="text-base sm:text-lg font-bold mb-2 text-black dark:text-white">{title}</h5>
                    <p className="text-xs sm:text-sm text-gray-700 dark:text-gray-300 mt-1 sm:mt-2 text-justify line-clamp-3">{description}</p>
                    <div className="mt-3 flex justify-end">
                        <button type="button" onClick={(e) => { e.stopPropagation(); setIsModalOpen(true); }}
                            className="bg-[#0EA5E9] text-white border-2 border-[#0EA5E9] px-3 py-2 text-xs uppercase font-semibold shadow-[4px_6px_0_#0f172a] transition-all duration-200 ease-in-out cursor-pointer hover:bg-[#0f172a] hover:text-white hover:shadow-[4px_4px_0_#0EA5E9] w-fit">
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
