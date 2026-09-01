import { useLanguage } from '../../contexts/LanguageContext';
import React, { useState, useEffect } from 'react';
import ContactCard from '../../components/ContactCard';
import { contactService } from '../../services/serviceWrapper';
import { contactData as defaultContacts } from '../../data/constants';
import { useReveal } from '../../hooks/usePerformance';

function Contact() {
    const { t } = useLanguage();
    const [contactData, setContactData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [titleVisible, titleRef] = useReveal(0.2);

    useEffect(() => {
        const loadContactData = async () => {
            try {
                setLoading(true);
                const data = await contactService.getAll();

                if (data && data.length > 0) {
                    const sortedData = data.sort((a, b) => (Number(a.order || a.contactId || 0)) - (Number(b.order || b.contactId || 0)));
                    setContactData(sortedData);
                } else {
                    setContactData(defaultContacts);
                }
            } catch {
                // Fallback to default contacts to ensure page never breaks
                setContactData(defaultContacts);
            } finally {
                setLoading(false);
            }
        };

        loadContactData();
    }, []);

    if (loading) {
        return (
            <section id="contact" className="pt-20 pb-8 px-4 md:px-40 bg-white dark:bg-[#0a0a0a]">
                <div>
                    <div className="text-center mb-8 sm:mb-12">
                        <h2 className="font-bold mt-4 mb-4 text-center text-lg md:text-2xl dark:text-white">{t('contactTitle')}</h2>
                        <p className="text-sm md:text-lg text-gray-700 dark:text-gray-300 text-left leading-relaxed">
                            {t('contactSubtitle')}
                        </p>
                    </div>
                    <div className="flex justify-center items-center py-16">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#74247A]"></div>
                        <span className="ml-3 text-gray-600 dark:text-gray-400">{t('loading')}</span>
                    </div>
                </div>
            </section>
        );
    }

    const displayContacts = contactData.length > 0 ? contactData : defaultContacts;

    return (
        <section id="contact" className="pt-20 pb-8 px-4 md:px-40 bg-white dark:bg-slate-950 bg-dot-pattern">
            <div>
                <div className="text-center mb-8 sm:mb-12">
                    <h2 ref={titleRef} className={`font-bold mt-4 mb-4 text-center text-lg md:text-2xl text-black dark:text-slate-100 reveal ${titleVisible ? 'reveal-visible' : ''}`}>{t('contactTitle')}</h2>
                    <p className={`text-sm md:text-lg text-slate-600 dark:text-slate-400 text-left leading-relaxed reveal ${titleVisible ? 'reveal-visible reveal-delay-1' : ''}`}>
                        {t('contactSubtitle')}
                    </p>
                </div>
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3 sm:gap-4 md:gap-6">
                    {displayContacts.map((contact, index) => (
                        <ContactCard
                            key={contact.id || index}
                            type={contact.type}
                            href={contact.href}
                            bgColor={contact.bgColor}
                            order={contact.order}
                            label={contact.label}
                            index={index}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}

export default Contact;
