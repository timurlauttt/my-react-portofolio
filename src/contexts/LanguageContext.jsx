import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';

const LanguageContext = createContext(null);

const translations = {
    en: {
        // Navbar
        home: 'Home',
        portfolio: 'Portfolio',
        skills: 'Skills',
        activities: 'Activities',
        contact: 'Contact',
        about: 'About',
        aboutMe: 'About Me',
        blog: 'Blog',
        nav: 'Navigation',
        navigationLinks: 'Navigation Links',
        socialMedia: 'Social Media',
        // Hero
        greeting: 'Hello World!',
        name: 'Urip here.',
        imUrip: "I'm Urip.",
        heroTagline: 'Information Systems student at Telkom University Purwokerto who loves challenges, web development enthusiast, and always open to learning new things.',
        heroDesc: 'Information Systems student at Telkom University Purwokerto who loves challenges, web development enthusiast, and always open to learning new things.',
        viewPortfolio: 'View My Portfolio →',
        // Portfolio
        portfolioTitle: 'My Portfolio',
        portfolioSubtitle: 'Click on the button to find out more!',
        learnMore: 'Learn More',
        openProject: 'Open Project →',
        techStack: 'Tech Stack',
        noPortfolio: 'No portfolio items available yet.',
        noPortfolioDesc: 'Add some projects through the admin panel!',
        // Skills
        skillsTitle: 'Technical Skills',
        skillsSubtitle: 'Technologies and tools I use',
        noSkills: 'No skills available yet.',
        noSkillsDesc: 'Add some skills through the admin panel!',
        // Activities
        activitiesTitle: 'My Activities',
        activitiesSubtitle: 'Click on the cards to find out more',
        noActivities: 'No activities available yet.',
        noActivitiesDesc: 'Add some activities through the admin panel!',
        moreInfo: 'More Info',
        skillsLabel: 'Skills',
        achievements: 'Achievements',
        links: 'Links',
        // Contact
        contactTitle: 'Get In Touch',
        contactSubtitle: "Ready to collaborate? Let's talk.",
        noContact: 'No contact information available yet.',
        noContactDesc: 'Add contact options through the admin panel!',
        contactMe: 'Contact Me',
        // About
        aboutTitle: 'About Me',
        background: 'My Background',
        backgroundDesc: 'I am a 7th semester Information Systems student who likes challenges, is enthusiastic about web development, and is always open to learning new things.',
        mySkills: 'My Skills',
        mySkillsDesc: 'I have hands-on experience in developing websites using PHP-based frameworks such as Laravel and CodeIgniter, as well as Python-based frameworks like Django. I also have a solid foundation in React.js for building modern and interactive front-end interfaces.',
        hobbies: 'My Hobbies',
        hobbiesDesc: 'In my free time, I like listening to music, watching football matches, reading and exploring new technologies.',
        // Footer
        navigation: 'Navigation',
        social: 'Social Media',
        contacts: 'Contact',
        collaborate: "Let's Collaborate",
        collaborateDesc: 'and bring extraordinary ideas to life together',
        totalVisits: 'Total Visits',
        // Loading & Status
        loading: 'Loading...',
        unavailable: 'unavailable',
    },
    id: {
        // Navbar
        home: 'Beranda',
        portfolio: 'Portofolio',
        skills: 'Keahlian',
        activities: 'Aktivitas',
        contact: 'Kontak',
        about: 'Tentang',
        aboutMe: 'Tentang Saya',
        blog: 'Blog',
        nav: 'Navigasi',
        navigationLinks: 'Tautan Navigasi',
        socialMedia: 'Media Sosial',
        // Hero
        greeting: 'Hello World!',
        name: 'Urip di sini.',
        imUrip: 'Saya Urip.',
        heroTagline: 'Mahasiswa Sistem Informasi di Telkom University Purwokerto yang suka tantangan, pengembang web, dan selalu terbuka untuk belajar hal baru.',
        heroDesc: 'Mahasiswa Sistem Informasi di Telkom University Purwokerto yang suka tantangan, pengembang web, dan selalu terbuka untuk belajar hal baru.',
        viewPortfolio: 'Lihat Portofolio Saya →',
        // Portfolio
        portfolioTitle: 'Portofolio Saya',
        portfolioSubtitle: 'Klik pada tombol untuk melihat lebih detail!',
        learnMore: 'Selengkapnya',
        openProject: 'Buka Proyek →',
        techStack: 'Tech Stack',
        noPortfolio: 'Belum ada portofolio tersedia.',
        noPortfolioDesc: 'Tambahkan beberapa proyek melalui panel admin!',
        // Skills
        skillsTitle: 'Keahlian Teknis',
        skillsSubtitle: 'Teknologi dan tools yang saya gunakan',
        noSkills: 'Belum ada keahlian tersedia.',
        noSkillsDesc: 'Tambahkan beberapa keahlian melalui panel admin!',
        // Activities
        activitiesTitle: 'Aktivitas Saya',
        activitiesSubtitle: 'Klik kartu untuk mengetahui lebih lanjut',
        noActivities: 'Belum ada aktivitas tersedia.',
        noActivitiesDesc: 'Tambahkan beberapa aktivitas melalui panel admin!',
        moreInfo: 'Info Lanjut',
        skillsLabel: 'Keahlian',
        achievements: 'Pencapaian',
        links: 'Tautan Terkait',
        // Contact
        contactTitle: 'Hubungi Saya',
        contactSubtitle: 'Siap berkolaborasi? Yuk ngobrol.',
        noContact: 'Belum ada informasi kontak.',
        noContactDesc: 'Tambahkan opsi kontak melalui panel admin!',
        contactMe: 'Hubungi Saya',
        // About
        aboutTitle: 'Tentang Saya',
        background: 'Latar Belakang Saya',
        backgroundDesc: 'Saya mahasiswa semester 7 Sistem Informasi yang suka tantangan, antusias dengan pengembangan web, dan selalu terbuka untuk belajar hal baru.',
        mySkills: 'Keahlian Saya',
        mySkillsDesc: 'Saya memiliki pengalaman praktis dalam mengembangkan website menggunakan framework berbasis PHP seperti Laravel dan CodeIgniter, serta framework berbasis Python seperti Django. Saya juga memiliki dasar yang kuat di React.js untuk membangun antarmuka front-end yang modern dan interaktif.',
        hobbies: 'Hobi Saya',
        hobbiesDesc: 'Di waktu luang, saya suka mendengarkan musik, menonton pertandingan sepak bola, membaca, dan mengeksplorasi teknologi baru.',
        // Footer
        navigation: 'Navigasi',
        social: 'Media Sosial',
        contacts: 'Kontak',
        collaborate: 'Mari Berkolaborasi',
        collaborateDesc: 'dan wujudkan ide-ide luar biasa bersama',
        totalVisits: 'Total Kunjungan',
        // Loading & Status
        loading: 'Memuat...',
        unavailable: 'tidak tersedia',
    }
};

export const LanguageProvider = ({ children }) => {
    const [lang, setLang] = useState(() => {
        if (typeof window !== 'undefined') {
            const saved = localStorage.getItem('lang');
            if (saved && (saved.toLowerCase() === 'en' || saved.toLowerCase() === 'id')) {
                return saved.toLowerCase();
            }
        }
        return 'en';
    });

    useEffect(() => {
        if (typeof window !== 'undefined') {
            localStorage.setItem('lang', lang);
        }
    }, [lang]);

    const toggleLang = useCallback(() => {
        setLang(prev => (prev === 'en' ? 'id' : 'en'));
    }, []);

    const t = useCallback((key) => {
        const activeLang = translations[lang] || translations.en;
        return activeLang?.[key] || translations.en?.[key] || key;
    }, [lang]);

    const value = useMemo(() => ({ lang, toggleLang, t }), [lang, toggleLang, t]);

    return (
        <LanguageContext.Provider value={value}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (!context) {
        return {
            lang: 'en',
            toggleLang: () => {},
            t: (key) => translations.en?.[key] || key
        };
    }
    return context;
};
