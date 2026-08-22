import { useLanguage } from '../../contexts/LanguageContext';
import React, { useState, useEffect } from 'react';
import PortfolioCard from '../../components/PortfolioCard';
import { portfolioService } from '../../services/serviceWrapper';
import { getTranslatedPortfolio } from '../../utils/dynamicTranslations';

function MyPortfolio() {
    const { t, lang } = useLanguage();
    const [portfolioData, setPortfolioData] = useState([]);
    const [loading, setLoading] = useState(true);

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

    if (loading) {
        return (
            <section id="portfolio" className="pt-20 pb-8 px-4 md:px-40 bg-[#f1f2f3] dark:bg-[#0a0a0a]">
                <h1 className="font-bold mt-4 mb-4 text-center text-xl md:text-2xl dark:text-white">{t('portfolioTitle')}</h1>
                <div className="flex justify-center items-center py-16">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#74247A]"></div>
                    <span className="ml-3 text-gray-600 dark:text-gray-400">{t('loading')}</span>
                </div>
            </section>
        );
    }

    return (
        <>
            <section id="portfolio" className="pt-20 pb-8 px-4 md:px-40 bg-[#f1f2f3] dark:bg-[#0a0a0a]">
                <h1 className="font-bold mt-4 mb-4 text-center text-lg md:text-2xl dark:text-white">{t('portfolioTitle')}</h1>
                <p className="text-xs md:text-lg text-gray-600 dark:text-gray-400 mb-8">{t('portfolioSubtitle')}</p>

                {portfolioData.length === 0 && !loading ? (
                    <div className="text-center py-16">
                        <p className="text-gray-500 dark:text-gray-400 text-lg">{t('noPortfolio')}</p>
                        <p className="text-gray-400 text-sm mt-2">{t('noPortfolioDesc')}</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-4 sm:gap-6 p-4 mt-6 w-full">
                        {portfolioData.map((portfolio, index) => {
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
                                    delay={index * 200}
                                    tech={tech}
                                    startDate={startDate}
                                    endDate={endDate}
                                />
                            );
                        })}
                    </div>
                )}
            </section>
        </>
    );
}

export default MyPortfolio;
