import React, { useState, useEffect } from "react";
import { useLanguage } from "./contexts/LanguageContext";

function Hero() {
  const { t, lang } = useLanguage();

  // Roles for typewriter animation
  const rolesEn = [
    "Fullstack Web Developer",
    "Information Systems Student @ Telkom University Purwokerto",
    "BNSP Certified and Google AI Professional & Cybersecurity by Coursera",
  ];
  const rolesId = [
    "Pengembang Web Fullstack",
    "Mahasiswa Sistem Informasi @ Telkom University Purwokerto",
    "Bersertifikat BNSP Web Developer dan Google AI Professional & Cybersecurity by Coursera",
  ];

  const currentRoles = lang === "id" ? rolesId : rolesEn;
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
    <section
      id="home"
      className="min-h-[75vh] pt-24 sm:pt-32 md:pt-24 px-4 md:px-40 lg:pt-28 pb-4 bg-white dark:bg-slate-950 bg-dot-pattern overflow-visible"
    >
      <div className="container mx-auto px-3 sm:px-4 md:px-6 rounded-lg border-2 border-black dark:border-slate-300 shadow-[8px_8px_0_#0f172a] dark:shadow-[6px_6px_0px_0px_#ffffff] bg-white dark:bg-slate-900 bg-grid-blueprint animate-drift p-4 sm:p-6 md:p-8 overflow-visible">
        {/* Available for Work Status Badge */}
        <div className="mb-4 inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full border-2 border-black dark:border-emerald-500/40 bg-emerald-50 dark:bg-emerald-950/80 shadow-[3px_3px_0_#0f172a] dark:shadow-[3px_3px_0_#ffffff] transition-transform hover:-translate-y-0.5">
          <span className="relative flex h-3 w-3">
            <span className="animate-pulse-dot absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-100"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
          </span>
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-400">
            {t("availableBadge")}
          </span>
        </div>

        <div className="flex flex-col md:flex-row items-center gap-6 md:gap-4">
          <div className="md:w-3/5 flex flex-col items-start text-start w-full min-w-0">
            <h1 className="text-start text-2xl sm:text-xl md:text-5xl lg:text-6xl mb-2 leading-tight text-black dark:text-slate-100 break-words">
              {t("greeting")}
              <br />
              <span className="text-3xl md:text-5xl lg:text-6xl font-light">
                <span className="font-bold">{t("name")}</span>
              </span>
            </h1>

            {/* Interactive Dynamic Typewriter Subtitle */}
            <div className="min-h-10 sm:min-h-8 flex items-start sm:items-center mb-3 w-full max-w-full overflow-hidden">
              <span className="text-xs sm:text-base md:text-lg font-mono font-semibold text-[#0EA5E9] dark:text-[#38BDF8] bg-sky-50 dark:bg-sky-950 px-2.5 py-1.5 rounded border border-sky-300 dark:border-sky-800 break-words leading-snug max-w-full">
                &gt; {displayText}
                <span className="animate-pulse font-bold text-black dark:text-slate-100">
                  |
                </span>
              </span>
            </div>

            <p className="mt-2 text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-950 p-3 sm:p-4 border-2 border-black dark:border-slate-800 rounded shadow-[4px_4px_0_#0f172a] dark:shadow-[4px_4px_0_#ffffff] w-full max-w-md text-left sm:text-justify text-sm sm:text-base leading-relaxed break-words">
              {t("heroTagline")}
            </p>
          </div>

          <div className="flex-shrink-0 flex justify-center">
            <div className="relative group animate-float">
              <img
                src="/hero-384.webp"
                srcSet="/hero-224.webp 224w, /hero-256.webp 256w, /hero-320.webp 320w, /hero-384.webp 384w, /hero-480.webp 480w, /hero-640.webp 640w"
                sizes="(max-width: 640px) 224px, (max-width: 768px) 256px, 384px"
                alt="Urip Yoga Pangestu"
                className="w-56 h-56 sm:w-64 sm:h-64 md:w-96 md:h-96 object-cover rounded-lg border-2 border-black dark:border-slate-300 shadow-[8px_8px_0_#0f172a] dark:shadow-[6px_6px_0px_0px_#ffffff] transition-transform duration-300 group-hover:-translate-y-1"
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
            className="inline-flex items-center justify-center font-bold bg-[#0EA5E9] dark:bg-[#38BDF8] text-white dark:text-slate-950 border-2 border-black dark:border-white px-5 py-2.5 sm:px-6 sm:py-3 text-xs sm:text-sm md:text-base uppercase tracking-wider shadow-[4px_4px_0_#0f172a] dark:shadow-[4px_4px_0_#ffffff] transition-all duration-200 ease-in-out cursor-pointer hover:translate-x-0.5 hover:translate-y-0.5 w-fit rounded"
          >
            {t("viewPortfolio")}
          </a>
          <a
            href="#contact"
            className="inline-flex items-center justify-center font-bold bg-white dark:bg-slate-950 text-black dark:text-slate-100 border-2 border-black dark:border-slate-300 px-5 py-2.5 sm:px-6 sm:py-3 text-xs sm:text-sm md:text-base uppercase tracking-wider shadow-[4px_4px_0_#0f172a] dark:shadow-[4px_4px_0_#ffffff] transition-all duration-200 ease-in-out cursor-pointer hover:translate-x-0.5 hover:translate-y-0.5 w-fit rounded"
          >
            {t("contactMe")}
          </a>
        </div>
      </div>
    </section>
  );
}

export default Hero;
