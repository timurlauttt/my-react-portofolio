import React, { useState, useEffect } from 'react';
import PortfolioCard from '../../components/PortfolioCard';
import { portfolioService } from '../../services/serviceWrapper';

function MyPortfolio() {
    const [portfolioData, setPortfolioData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadPortfolioData = async () => {
            try {
                console.log('Loading portfolio data for main page...');
                setLoading(true);
                setError(null);
                const data = await portfolioService.getAll();
                console.log('Portfolio data loaded:', data);
                // Sort by portfolioId ascending (ID 1 first, then 2, 3, etc.)
                const sortedData = data.sort((a, b) => (a.portfolioId || 0) - (b.portfolioId || 0));
                setPortfolioData(sortedData);
            } catch (error) {
                console.error('Error loading portfolio data:', error);
                setError('Failed to load portfolio data');
                // Fallback to empty array to prevent crash
                setPortfolioData([]);
            } finally {
                setLoading(false);
            }
        };

        loadPortfolioData();
    }, []);

    if (loading) {
        return (
            <section id="portofolio" className="pt-20 py-8 flex flex-col items-center bg-white">
                <h1 className="font-bold mt-4 mb-4 text-center text-xl md:text-2xl">Portfolio</h1>
                <div className="flex justify-center items-center py-16">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#74247A]"></div>
                    <span className="ml-3 text-gray-600">Loading portfolio...</span>
                </div>
            </section>
        );
    }

    return (
        <>
            <section id="portofolio" className="pt-20 py-8 flex flex-col items-center bg-white">
                <h1 className="font-bold mt-4 mb-4 text-center text-lg md:text-2xl">Portfolio</h1>
                <p className=" sm:text-xs text-gray-600 mb-8">click on the button to find out more!</p>

                {portfolioData.length === 0 && !loading ? (
                    <div className="text-center py-16">
                        <p className="text-gray-500 text-lg">No portfolio items available yet.</p>
                        <p className="text-gray-400 text-sm mt-2">Add some projects through the admin panel!</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-4 sm:gap-6 p-4 mt-6 w-full max-w-6xl">
                        {portfolioData.map((portfolio, index) => {
                            const tech = portfolio.tech || portfolio.techStack || portfolio.technologies || null;
                            const startDate = portfolio.startDate || portfolio.from || null;
                            const endDate = portfolio.endDate || portfolio.to || null;

                            return (
                                <PortfolioCard
                                    key={portfolio.id}
                                    image={portfolio.downloadURL || portfolio.imageUrl || portfolio.image}
                                    title={portfolio.title}
                                    description={portfolio.description}
                                    longDescription={portfolio.longDescription || portfolio.long_description || ''}
                                    link={portfolio.link}
                                    isExternal={portfolio.isExternal !== false} // default to true
                                    delay={index * 200} // Staggered animation delay
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
