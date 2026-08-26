import { useLanguage } from '../../contexts/LanguageContext';
import { useState, useEffect } from 'react';
import { aboutService } from '../../services/serviceWrapper';

function AboutMe() {
    const { t, lang } = useLanguage();
    const [aboutData, setAboutData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAboutData = async () => {
            try {
                setLoading(true);
                const data = await aboutService.getAll();
                setAboutData(data || []);
            } catch {
                setAboutData([]);
            } finally {
                setLoading(false);
            }
        };

        fetchAboutData();
    }, []);

    // Combine items into sections for a single card
    const backgroundItem = aboutData[0] || null;
    const skillsItem = aboutData[1] || null;
    const hobbiesItem = aboutData[2] || null;

    // Helper for bilingual content with LanguageContext fallbacks
    const getBgTitle = () => {
        if (lang === 'id') return backgroundItem?.title_id || t('background');
        return backgroundItem?.title || t('background');
    };

    const getBgDesc = () => {
        if (lang === 'id') return backgroundItem?.description_id || (!backgroundItem?.description || backgroundItem?.description?.includes('Information Systems student') ? t('backgroundDesc') : backgroundItem?.description);
        return backgroundItem?.description || t('backgroundDesc');
    };

    const getSkillsTitle = () => {
        if (lang === 'id') return skillsItem?.title_id || t('mySkills');
        return skillsItem?.title || t('mySkills');
    };

    const getSkillsDesc = () => {
        if (lang === 'id') return skillsItem?.description_id || (!skillsItem?.description || skillsItem?.description?.includes('PHP-based frameworks') ? t('mySkillsDesc') : skillsItem?.description);
        return skillsItem?.description || t('mySkillsDesc');
    };

    const getHobbiesTitle = () => {
        if (lang === 'id') return hobbiesItem?.title_id || t('hobbies');
        return hobbiesItem?.title || t('hobbies');
    };

    const getHobbiesDesc = () => {
        if (lang === 'id') return hobbiesItem?.description_id || (!hobbiesItem?.description || hobbiesItem?.description?.includes('listening to music') ? t('hobbiesDesc') : hobbiesItem?.description);
        return hobbiesItem?.description || t('hobbiesDesc');
    };

    if (loading) {
        return (
            <section id="about" className="pt-20 pb-8 px-4 md:px-40 bg-[#f1f2f3] dark:bg-[#0a0a0a] text-black dark:text-white">
                <div>
                    <h2 className="font-bold mt-4 mb-4 text-center text-lg md:text-2xl dark:text-white">{t('aboutTitle')}</h2>
                    <div className="flex justify-center items-center py-12">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-black dark:border-white"></div>
                        <span className="ml-3 text-gray-600 dark:text-gray-400">{t('loading')}</span>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section id="about" className="pt-20 pb-8 px-4 md:px-40 bg-[#f1f2f3] dark:bg-slate-950 text-black dark:text-slate-100 bg-dot-pattern">
            <div>
                <h2 className="font-bold mt-4 mb-4 text-center text-lg md:text-2xl text-black dark:text-slate-100">{t('aboutTitle')}</h2>

                <div className="bg-white dark:bg-slate-900 rounded-lg p-6 md:p-8 shadow-[8px_8px_0_#0f172a] dark:shadow-[6px_6px_0px_0px_#ffffff] border-2 border-black dark:border-slate-300">
                    <div>
                        <h3 className="text-sm sm:text-base font-bold mb-3 text-black dark:text-slate-100">{getBgTitle()}</h3>
                        <p className="text-slate-700 dark:text-slate-300 mb-5 text-justify leading-relaxed">{getBgDesc()}</p>
                        
                        <h3 className="text-sm sm:text-base font-bold mb-2 text-black dark:text-slate-100">{getSkillsTitle()}</h3>
                        <p className="text-slate-700 dark:text-slate-300 mb-5 text-justify leading-relaxed">{getSkillsDesc()}</p>

                        <h3 className="text-sm sm:text-base font-bold mb-2 text-black dark:text-slate-100">{getHobbiesTitle()}</h3>
                        <p className="text-slate-700 dark:text-slate-300 text-justify leading-relaxed">{getHobbiesDesc()}</p>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default AboutMe;