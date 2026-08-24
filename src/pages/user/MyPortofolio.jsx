import { useLanguage } from '../../contexts/LanguageContext';
import React, { useState, useEffect, useMemo } from 'react';
import PortfolioCard from '../../components/PortfolioCard';
import GitHubStatsWidget from '../../components/GitHubStatsWidget';
import { portfolioService } from '../../services/serviceWrapper';
import { getTranslatedPortfolio } from '../../utils/dynamicTranslations';

function MyPortfolio() {
    const { t, lang } = useLanguage();
    const [portfolioData, setPortfolioData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeFilter, setActiveFilter] = useState('all');

    useEffect(() => {
        const loadPortfolioData = async () => {
            try {
                setLoading(true);
                const data = await portfolioService.getAll();

                // Sort by portfolioId ascending (ID 1 first, then 2, 3, etc.)
                const sortedData = data.sort((a, b) => (a.portfolioId || 0) - (b.portfolioId || 0));
                setPortfolioData(sortedData);
            } catch {
                setPortfolioData([]);
            } finally {
                setLoading(false);
            }
        };

        loadPortfolioData();
    }, []);

    const filterCategories = [
        { key: 'all', label: t('filterAll') },
        { key: 'webapp', label: t('filterWebApp') },
        { key: 'startup', label: t('filterStartup') },
        { key: 'capstone', label: t('filterCapstone') },
    ];

    const matchesPortfolioFilter = (item, filterKey) => {
        if (filterKey === 'all') return true;
        const cat = (item.category || '').toLowerCase();
        const title = (item.title || '').toLowerCase();
        const tech = (typeof item.tech === 'string' ? item.tech : '').toLowerCase();

        if (filterKey === 'startup') {
            return cat.includes('start') || cat.includes('client') || title.includes('lowcosthost') || title.includes('taman siswa') || title.includes('selis') || title.includes('wedding');
        }
        if (filterKey === 'capstone') {
            return cat.includes('capstone') || cat.includes('academic') || cat.includes('grant') || title.includes('capstone') || title.includes('msib') || title.includes('current') || title.includes('e-catalog') || title.includes('tracer') || title.includes('partnership');
        }
        if (filterKey === 'webapp') {
            return cat.includes('web') || cat.includes('app') || cat.includes('open') || title.includes('app') || title.includes('blog') || title.includes('host') || title.includes('tracer') || title.includes('project') || tech.includes('react') || tech.includes('laravel');
        }
        return true;
    };

    const filteredPortfolios = useMemo(() => {
        if (activeFilter === 'all') return portfolioData;
        return portfolioData.filter(item => matchesPortfolioFilter(item, activeFilter));
    }, [portfolioData, activeFilter]);

    if (loading) {
        return (
            <section id="portfolio" className="pt-20 pb-8 px-4 md:px-40 bg-[#f1f2f3] dark:bg-[#0a0a0a] bg-dot-pattern">
                <h2 className="font-bold mt-4 mb-4 text-center text-xl md:text-2xl dark:text-white">{t('portfolioTitle')}</h2>
                <div className="flex justify-center items-center py-16">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#74247A]"></div>
                    <span className="ml-3 text-gray-600 dark:text-gray-400">{t('loading')}</span>
                </div>
            </section>
        );
    }

    return (
        <section id="portfolio" className="pt-20 pb-8 px-4 md:px-40 bg-[#f1f2f3] dark:bg-[#0a0a0a] bg-dot-pattern">
            <div className="text-center md:text-left">
                <h2 className="font-bold mt-4 mb-2 text-center text-xl md:text-3xl dark:text-white">{t('portfolioTitle')}</h2>
                <p className="text-xs md:text-base text-gray-600 dark:text-gray-400 mb-6 text-center">{t('portfolioSubtitle')}</p>

                {/* Interactive Neo-Brutalist Category Filter Tabs */}
                <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-8">
                    {filterCategories.map(({ key, label }) => {
                        const count = key === 'all' 
                            ? portfolioData.length 
                            : portfolioData.filter(item => matchesPortfolioFilter(item, key)).length;

                        const isActive = activeFilter === key;

                        return (
                            <button
                                key={key}
                                type="button"
                                onClick={() => setActiveFilter(key)}
                                className={`px-3.5 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-bold uppercase rounded-md border-2 border-black dark:border-neutral-700 transition-all duration-200 cursor-pointer flex items-center gap-2 ${
                                    isActive
                                        ? 'bg-[#0EA5E9] text-white shadow-[4px_4px_0_#0f172a] -translate-y-0.5'
                                        : 'bg-white dark:bg-[#1a1a1a] text-gray-800 dark:text-gray-200 shadow-[2px_2px_0_#0f172a] hover:bg-gray-100 dark:hover:bg-[#252525]'
                                }`}
                            >
                                <span>{label}</span>
                                <span className={`text-[10px] px-1.5 py-0.2 rounded font-mono ${
                                    isActive ? 'bg-black text-white' : 'bg-gray-200 dark:bg-neutral-800 text-gray-800 dark:text-gray-200'
                                }`}>
                                    {count}
                                </span>
                            </button>
                        );
                    })}
                </div>

                {filteredPortfolios.length === 0 ? (
                    <div className="text-center py-16">
                        <p className="text-gray-500 dark:text-gray-400 text-lg">{t('noPortfolio')}</p>
                        <p className="text-gray-400 text-sm mt-2">{t('noPortfolioDesc')}</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-4 sm:gap-6 w-full">
                        {filteredPortfolios.map((portfolio, index) => {
                            const tech = portfolio.tech || portfolio.techStack || portfolio.technologies || null;
                            const startDate = portfolio.startDate || portfolio.from || null;
                            const endDate = portfolio.endDate || portfolio.to || null;
                            const translated = getTranslatedPortfolio(portfolio, lang);

                            return (
                                <PortfolioCard
                                    key={portfolio.id || index}
                                    image={portfolio.downloadURL || portfolio.imageUrl || portfolio.image}
                                    title={translated.title}
                                    description={translated.description}
                                    longDescription={translated.longDescription}
                                    link={portfolio.link}
                                    isExternal={portfolio.isExternal !== false}
                                    delay={index * 150}
                                    tech={tech}
                                    startDate={startDate}
                                    endDate={endDate}
                                />
                            );
                        })}
                    </div>
                )}

                {/* GitHub Open Source Stats Widget */}
                <GitHubStatsWidget />
            </div>
        </section>
    );
}

export default MyPortfolio;
