import { useLanguage } from "./contexts/LanguageContext";

function Hero() {
    const { t } = useLanguage();

    return (
        <>
            <section id="home" className="min-h-[75vh] pt-24 sm:pt-32 md:pt-24 px-4 md:px-40 lg:pt-28 pb-4 bg-white dark:bg-[#0a0a0a]">
                <div className="container mx-auto px-4 md:px-6 rounded shadow-[10px_8px_0_#0f172a] dark:bg-[#1a1a1a] p-4 md:p-6">
                    <div className="flex flex-col md:flex-row items-center gap-6 md:gap-4">
                        <div className="md:w-3/5 flex flex-col items-start text-start">
                            <h1 className="text-start text-2xl sm:text-xl md:text-5xl lg:text-6xl mb-4 leading-tight dark:text-white">
                                {t('greeting')}
                                <br />
                                <span className="text-3xl md:text-5xl lg:text-6xl font-light">
                                    <span className="font-bold">{t('name')}</span>
                                </span>
                            </h1>
                            <p className="mt-4 text-gray-700 dark:text-gray-300 bg-white dark:bg-[#1a1a1a] p-4 shadow-lg max-w-md text-justify">
                                {t('heroTagline')}
                            </p>
                        </div>
                        <div className="flex-shrink-0 flex justify-center">
                            <img src="/hero-fix.webp" alt="Urip Yoga Pangestu" className="w-56 h-56 sm:w-64 sm:h-64 md:w-96 md:h-96 object-cover rounded shadow-[6px_6px_0_#0f172a]" width="384" height="384" loading="eager" decoding="async" />
                        </div>
                    </div>
                    {/* View Portfolio Button */}
                    <div className="mt-6 flex justify-center md:justify-start">
                        <a href="#portfolio" className="inline-flex items-center justify-center font-bold bg-[#0EA5E9] text-white border-2 border-[#0EA5E9] px-5 py-2.5 sm:px-6 sm:py-3 text-xs sm:text-sm md:text-base uppercase tracking-wider shadow-[4px_5px_0_#0f172a] transition-all duration-200 ease-in-out cursor-pointer hover:bg-[#0f172a] hover:text-white hover:shadow-[4px_4px_0_#0EA5E9] w-fit rounded-sm">
                            {t('viewPortfolio')}
                        </a>
                    </div>
                </div>
            </section>
        </>
    );
}

export default Hero;
