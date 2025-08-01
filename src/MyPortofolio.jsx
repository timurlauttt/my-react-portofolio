import React from 'react';
import PortfolioCard from './components/PortfolioCard';
import { portfolioData } from './data/constants';

function MyPortfolio() {
    return (
        <>
            <section id="portofolio" className="min-h-screen py-8 flex flex-col items-center bg-white">
                <h1 className="font-bold mt-4 mb-4 text-center text-lg md:text-2xl">My Portfolio</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-4 sm:gap-6 p-4 mt-6 w-full max-w-6xl">
                    {portfolioData.map((portfolio) => (
                        <PortfolioCard
                            key={portfolio.id}
                            image={portfolio.image}
                            title={portfolio.title}
                            description={portfolio.description}
                            link={portfolio.link}
                            isExternal={portfolio.isExternal}
                        />
                    ))}
                </div>
            </section>
        </>
    );
}

export default MyPortfolio;