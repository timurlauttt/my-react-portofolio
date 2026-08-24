import React, { useState, useEffect } from "react";
import { useLanguage } from "./contexts/LanguageContext";

function Hero() {
    const { t, lang } = useLanguage();

    // Roles for typewriter animation
    const rolesEn = [
        "Fullstack Web Developer",
        "Information Systems Student @ Telkom University Purwokerto",
        "BNSP Certified and Google AI Professional & Cybersecurity by Coursera"
    ];
    const rolesId = [
        "Pengembang Web Fullstack",
        "Mahasiswa Sistem Informasi @ Telkom University Purwokerto",
        "Bersertifikat BNSP Web Developer dan Google AI Professional & Cybersecurity by Coursera"
    ];

    const currentRoles = lang === 'id' ? rolesId : rolesEn;
    const [roleIndex, setRoleIndex] = useState(0);
    const [displayText, setDisplayText] = useState("");
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        let timer;
        const currentFullText = currentRoles[roleIndex % currentRoles.length];

        if (!isDeleting && displayText.length < currentFullText.length) {
            timer = setTimeout(() => {
                setDisplayText(currentFullText.slice(0, displayText.length + 1));
            }, 60);
        } else if (!isDeleting && displayText.length === currentFullText.length) {
            timer = setTimeout(() => {
                setIsDeleting(true);
            }, 2200);
        } else if (isDeleting && displayText.length > 0) {
            timer = setTimeout(() => {
                setDisplayText(currentFullText.slice(0, displayText.length - 1));
            }, 30);
        } else if (isDeleting && displayText.length === 0) {
            setIsDeleting(false);
            setRoleIndex((prev) => (prev + 1) % currentRoles.length);
        }

        return () => clearTimeout(timer);
    }, [displayText, isDeleting, roleIndex, currentRoles]);

    // Reset typewriter text when language toggles
    useEffect(() => {
        setDisplayText("");
        setIsDeleting(false);
        setRoleIndex(0);
    }, [lang]);

    return (
        <section id="home" className="min-h-[75vh] pt-24 sm:pt-32 md:pt-24 px-4 md:px-40 lg:pt-28 pb-4 bg-white dark:bg-[#0a0a0a] bg-dot-pattern">
            <div className="container mx-auto px-4 md:px-6 rounded-lg border-2 border-black dark:border-neutral-700 shadow-[10px_8px_0_#0f172a] bg-white dark:bg-[#1a1a1a] bg-grid-blueprint p-6 md:p-8">
                
                {/* Available for Work Status Badge */}
                <div className="mb-4 inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full border-2 border-black dark:border-neutral-700 bg-emerald-50 dark:bg-emerald-950/60 shadow-[3px_3px_0_#0f172a] transition-transform hover:-translate-y-0.5">
                    <span className="relative flex h-3 w-3">
                        <span className="animate-pulse-dot absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-100"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                    </span>
                    <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-300">
                        {t('availableBadge')}
                    </span>
                </div>

                <div className="flex flex-col md:flex-row items-center gap-6 md:gap-4">
                    <div className="md:w-3/5 flex flex-col items-start text-start">
                        <h1 className="text-start text-2xl sm:text-xl md:text-5xl lg:text-6xl mb-2 leading-tight dark:text-white">
                            {t('greeting')}
                            <br />
                            <span className="text-3xl md:text-5xl lg:text-6xl font-light">
                                <span className="font-bold">{t('name')}</span>
                            </span>
                        </h1>

                        {/* Interactive Dynamic Typewriter Subtitle */}
                        <div className="h-10 sm:h-8 flex items-center mb-3">
                            <span className="text-sm sm:text-base md:text-lg font-mono font-semibold text-[#0EA5E9] dark:text-[#38BDF8] bg-sky-50 dark:bg-sky-950/40 px-2.5 py-1 rounded border border-sky-300 dark:border-sky-800">
                                &gt; {displayText}
                                <span className="animate-pulse font-bold text-black dark:text-white">|</span>
                            </span>
                        </div>

                        <p className="mt-2 text-gray-700 dark:text-gray-300 bg-white dark:bg-[#1a1a1a] p-4 border border-black/20 dark:border-white/10 rounded shadow-[4px_4px_0_#0f172a] max-w-md text-justify text-sm sm:text-base">
                            {t('heroTagline')}
                        </p>
                    </div>

                    <div className="flex-shrink-0 flex justify-center">
                        <div className="relative group">
                            <img 
                                src="/hero-fix.webp" 
                                alt="Urip Yoga Pangestu" 
                                className="w-56 h-56 sm:w-64 sm:h-64 md:w-96 md:h-96 object-cover rounded-lg border-2 border-black dark:border-neutral-700 shadow-[8px_8px_0_#0f172a] transition-transform duration-300 group-hover:-translate-y-1" 
                                width="384" 
                                height="384" 
                                loading="eager" 
                                fetchPriority="high" 
                                decoding="async" 
                            />
                        </div>
                    </div>
                </div>

                {/* Call to Action Buttons */}
                <div className="mt-8 flex flex-wrap gap-4 justify-center md:justify-start">
                    <a 
                        href="#portfolio" 
                        className="inline-flex items-center justify-center font-bold bg-[#0EA5E9] text-white border-2 border-black px-5 py-2.5 sm:px-6 sm:py-3 text-xs sm:text-sm md:text-base uppercase tracking-wider shadow-[4px_5px_0_#0f172a] transition-all duration-200 ease-in-out cursor-pointer hover:bg-[#0f172a] hover:text-white hover:shadow-[4px_4px_0_#0EA5E9] w-fit rounded-sm"
                    >
                        {t('viewPortfolio')}
                    </a>
                    <a 
                        href="#contact" 
                        className="inline-flex items-center justify-center font-bold bg-white dark:bg-[#222] text-black dark:text-white border-2 border-black dark:border-neutral-600 px-5 py-2.5 sm:px-6 sm:py-3 text-xs sm:text-sm md:text-base uppercase tracking-wider shadow-[4px_5px_0_#0f172a] transition-all duration-200 ease-in-out cursor-pointer hover:bg-black hover:text-white w-fit rounded-sm"
                    >
                        {t('contactMe')}
                    </a>
                </div>
            </div>
        </section>
    );
}

export default Hero;
