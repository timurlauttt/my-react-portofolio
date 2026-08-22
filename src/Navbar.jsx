import React, { useEffect, useState, useCallback } from "react";
import { useTheme } from "./contexts/ThemeContext";
import { useLanguage } from "./contexts/LanguageContext";

const navItems = [
  { key: "portfolio", href: "#portfolio" },
  { key: "skills", href: "#skills" },
  { key: "activities", href: "#activities" },
  { key: "contact", href: "#contact" },
  { key: "about", href: "#about" },
];

const allIds = ["home", ...navItems.map((i) => i.href.replace("#", ""))];

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  const { lang, toggleLang, t } = useLanguage();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const visible = new Set();
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          e.isIntersecting ? visible.add(e.target.id) : visible.delete(e.target.id);
        });
        let active = "";
        for (const id of allIds) { if (visible.has(id)) active = id === "home" ? "" : id; }
        setActiveSection(active);
      },
      { rootMargin: "-60px 0px -50% 0px", threshold: 0 }
    );
    const timer = setTimeout(() => {
      allIds.forEach((id) => { const el = document.getElementById(id); if (el) observer.observe(el); });
    }, 50);
    return () => { clearTimeout(timer); observer.disconnect(); };
  }, []);

  const scrollTo = useCallback((e, href) => {
    e.preventDefault();
    const el = document.getElementById(href.replace("#", ""));
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    setIsMenuOpen(false);
  }, []);

  useEffect(() => {
    if (!isMenuOpen) return;
    const h = (e) => { if (e.key === "Escape") setIsMenuOpen(false); };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [isMenuOpen]);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isMenuOpen]);

  return (
    <nav className="navbar fixed top-0 w-full bg-white dark:bg-[#0a0a0a] dark:border-neutral-800 z-50 border-b border-gray-200 px-4 md:px-40 shadow-sm">
      <div className="container mx-auto flex justify-between items-center p-3.5 sm:p-4 md:p-6 text-black dark:text-white">
        {/* Brand / Logo */}
        <button onClick={() => { window.scrollTo({ top: 0, behavior: "smooth" }); setActiveSection(""); }}
          className="text-lg md:text-2xl font-bold hover:text-[#74247A] dark:hover:text-purple-400 dark:text-white transition-colors cursor-pointer">
          Urip
        </button>

        {/* Desktop Nav Links */}
        <ul className="hidden md:flex items-center gap-4">
          {navItems.map((item) => (
            <li key={item.href}>
              <button onClick={(e) => scrollTo(e, item.href)}
                className={`navbar-text font-medium px-3 py-1 text-sm md:text-base cursor-pointer ${activeSection === item.href.replace("#", "") ? "navbar-text active" : "text-black dark:text-gray-200 hover:text-[#0EA5E9] dark:hover:text-sky-400"}`}>
                {t(item.key)}
              </button>
            </li>
          ))}
          <li>
            <a href="https://astro-blog-my-portofolio-guwa.vercel.app/" className="btn btn-md bg-black dark:bg-white text-white dark:text-black rounded-md py-2 px-4 hover:bg-gray-700 dark:hover:bg-gray-200 text-sm font-semibold transition-colors" target="_blank" rel="noopener noreferrer">
              {t("blog")}
            </a>
          </li>
          <li>
            {/* Desktop Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 border border-gray-200 dark:border-neutral-700 rounded-md hover:bg-gray-100 dark:hover:bg-neutral-800 text-gray-700 dark:text-gray-200 transition-colors flex items-center justify-center cursor-pointer"
              title={theme === "light" ? "Switch to Dark Mode" : "Switch to Light Mode"}
              aria-label="Toggle theme"
            >
              {theme === "light" ? (
                <svg className="w-4 h-4 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              ) : (
                <svg className="w-4 h-4 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              )}
            </button>
          </li>
          <li>
            {/* Desktop Language Toggle */}
            <button
              onClick={toggleLang}
              className="px-2.5 py-1.5 border border-gray-200 dark:border-neutral-700 rounded-md hover:bg-gray-100 dark:hover:bg-neutral-800 text-gray-800 dark:text-gray-200 transition-colors flex items-center justify-center cursor-pointer"
              title={lang === "en" ? "Ganti ke Bahasa Indonesia" : "Switch to English"}
              aria-label="Toggle language"
            >
              <span className="text-xs font-mono font-bold tracking-wider">{lang === "en" ? "ID" : "EN"}</span>
            </button>
          </li>
        </ul>

        {/* Mobile Right Controls: Theme + Lang + Hamburger */}
        <div className="flex md:hidden items-center gap-2">
          {/* Theme Toggle (Mobile) */}
          <button
            onClick={toggleTheme}
            className="w-9 h-9 border border-gray-200 dark:border-neutral-700 rounded-md hover:bg-gray-100 dark:hover:bg-neutral-800 text-gray-700 dark:text-gray-200 transition-colors flex items-center justify-center cursor-pointer"
            title={theme === "light" ? "Switch to Dark Mode" : "Switch to Light Mode"}
            aria-label="Toggle theme"
          >
            {theme === "light" ? (
              <svg className="w-4 h-4 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            ) : (
              <svg className="w-4 h-4 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            )}
          </button>

          {/* Language Toggle (Mobile) */}
          <button
            onClick={toggleLang}
            className="h-9 px-2.5 border border-gray-200 dark:border-neutral-700 rounded-md hover:bg-gray-100 dark:hover:bg-neutral-800 text-gray-800 dark:text-gray-200 transition-colors flex items-center justify-center cursor-pointer"
            title={lang === "en" ? "Ganti ke Bahasa Indonesia" : "Switch to English"}
            aria-label="Toggle language"
          >
            <span className="text-xs font-mono font-bold tracking-wider">{lang === "en" ? "ID" : "EN"}</span>
          </button>

          {/* Hamburger Menu Toggle */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="w-9 h-9 p-2 border border-gray-200 dark:border-neutral-700 rounded-md text-black dark:text-white hover:bg-gray-100 dark:hover:bg-neutral-800 transition-colors flex flex-col justify-center items-center cursor-pointer"
            aria-label="Toggle menu"
          >
            <span className={`bg-current block transition-transform duration-300 h-0.5 w-5 rounded-sm ${isMenuOpen ? 'rotate-45 translate-y-1' : '-translate-y-1'}`}></span>
            <span className={`bg-current block transition-opacity duration-200 h-0.5 w-5 rounded-sm my-0.5 ${isMenuOpen ? 'opacity-0' : 'opacity-100'}`}></span>
            <span className={`bg-current block transition-transform duration-300 h-0.5 w-5 rounded-sm ${isMenuOpen ? '-rotate-45 -translate-y-1' : 'translate-y-1'}`}></span>
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      <div id="mobile-menu" className={`md:hidden overflow-hidden transition-all duration-300 ${isMenuOpen ? 'max-h-80 opacity-100' : 'max-h-0 opacity-0'}`}>
        <ul className="flex flex-col space-y-1.5 pb-4 pt-1 bg-white dark:bg-[#0a0a0a] border-t border-gray-100 dark:border-neutral-800 px-4">
          {navItems.map((item) => (
            <li key={item.href}>
              <button onClick={(e) => scrollTo(e, item.href)}
                className={`block w-full text-left py-2.5 px-3.5 rounded-md text-sm cursor-pointer transition-colors ${activeSection === item.href.replace("#", "") ? 'bg-sky-100 text-[#0EA5E9] dark:bg-sky-950/70 dark:text-sky-300 font-semibold' : 'text-black dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-neutral-800'}`}>
                {t(item.key)}
              </button>
            </li>
          ))}
          <li className="pt-1">
            <a href="https://astro-blog-my-portofolio-guwa.vercel.app/" className="block py-2.5 px-3.5 bg-black dark:bg-white text-white dark:text-black rounded-md text-sm font-semibold text-start hover:bg-gray-700 dark:hover:bg-gray-200 transition-colors" target="_blank" rel="noopener noreferrer">
              {t("blog")}
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
