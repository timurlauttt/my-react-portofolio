import { useLanguage } from '../../contexts/LanguageContext';
import React, { useEffect, useState, useRef, useCallback } from 'react';
import ActivityCard from '../../components/ActivityCard';
import { activitiesService } from '../../services/serviceWrapper';
import { getTranslatedActivity } from '../../utils/dynamicTranslations';

const MyActivities = () => {
    const { t, lang } = useLanguage();
    const [activitiesData, setActivitiesData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // State modal
    const [selectedActivity, setSelectedActivity] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const loadActivitiesData = async () => {
            try {
                setLoading(true);
                const data = await activitiesService.getAll();
                setActivitiesData(data);
            } catch (err) {
                setError('Failed to load activities data');
            } finally {
                setLoading(false);
            }
        };
        loadActivitiesData();
    }, []);

    // Previously used hover timers removed; modal now opens on click/tap

    // Modal accessibility refs
    const modalRef = useRef(null);
    const closeButtonRef = useRef(null);
    const prevActiveElRef = useRef(null);

    // Detect touch devices so we can switch to tap-to-open on mobile
    const [isTouchDevice, setIsTouchDevice] = useState(false);
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const touch = 'ontouchstart' in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0;
            setIsTouchDevice(!!touch);
        }
    }, []);

    // Touch handlers to avoid opening during scroll/swipe
    const touchStartRef = useRef({ x: 0, y: 0, moved: false });

    const openModal = useCallback((activity) => {
        setSelectedActivity(activity);
        setIsModalOpen(true);
    }, []);

    const closeModal = useCallback(() => {
        setIsModalOpen(false);
        setSelectedActivity(null);
    }, []);

    // Accessibility: trap focus inside modal and close on Escape
    useEffect(() => {
        if (!isModalOpen) return;

        prevActiveElRef.current = document.activeElement;

        // Focus the close button when modal opens
        setTimeout(() => {
            if (closeButtonRef.current) closeButtonRef.current.focus();
        }, 0);

        const handleKeyDown = (e) => {
            if (e.key === 'Escape') {
                // Close immediately
                closeModal();
            }

            if (e.key === 'Tab' && modalRef.current) {
                const focusable = modalRef.current.querySelectorAll('a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])');
                if (!focusable.length) return;
                const first = focusable[0];
                const last = focusable[focusable.length - 1];

                if (e.shiftKey) {
                    if (document.activeElement === first) {
                        e.preventDefault();
                        last.focus();
                    }
                } else {
                    if (document.activeElement === last) {
                        e.preventDefault();
                        first.focus();
                    }
                }
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            // Restore focus to previously focused element
            try { prevActiveElRef.current?.focus(); } catch (err) { /* ignore */ }
        };
    }, [isModalOpen]);

    // Animation state for mount animation
    const [isAnimating, setIsAnimating] = useState(false);
    useEffect(() => {
        if (isModalOpen) {
            setIsAnimating(true);
            const t = setTimeout(() => setIsAnimating(false), 300);
            return () => clearTimeout(t);
        }
        return undefined;
    }, [isModalOpen]);

    return (
        <section id="activities" className="pt-20 pb-8 px-4 md:px-40 bg-[#f1f2f3] dark:bg-[#0a0a0a]">
            <div className=" px-3 sm:px-4 text-center">
                <h2 className="font-bold mt-4 mb-4 text-center text-lg md:text-2xl dark:text-white">{t('activitiesTitle')}</h2>
                <p className="text-sm md:text-lg text-gray-600 dark:text-gray-400 mb-8 text-left">{t('activitiesSubtitle')}</p>

                {loading && <p className="text-center">Loading...</p>}
                {error && <p className="text-red-500">{error}</p>}

                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3 sm:gap-4 md:gap-6">
                    {activitiesData.map((activity, index) => {
                        const translated = getTranslatedActivity(activity, lang);
                        return (
                        <div
                            key={activity.activityId || index}
                            className="cursor-pointer"
                            onClick={() => openModal(activity)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' || e.key === ' ') {
                                    e.preventDefault();
                                    openModal(activity);
                                }
                            }}
                            role="button"
                            tabIndex={0}
                            onTouchStart={isTouchDevice ? (e) => {
                                const touch = e.touches && e.touches[0];
                                if (touch) touchStartRef.current = { x: touch.clientX, y: touch.clientY, moved: false };
                            } : undefined}
                            onTouchMove={isTouchDevice ? (e) => {
                                const touch = e.touches && e.touches[0];
                                if (!touch) return;
                                const dx = Math.abs(touch.clientX - (touchStartRef.current.x || 0));
                                const dy = Math.abs(touch.clientY - (touchStartRef.current.y || 0));
                                if (dx > 10 || dy > 10) touchStartRef.current.moved = true;
                            } : undefined}
                            onTouchEnd={isTouchDevice ? () => {
                                if (!touchStartRef.current.moved) {
                                    openModal(activity);
                                }
                                touchStartRef.current = { x: 0, y: 0, moved: false };
                            } : undefined}
                        >
                            <ActivityCard
                                title={translated.title}
                                description={translated.description}
                                link={activity.link}
                                delay={index * 80} index={index}
                            />
                        </div>
                    );})}
                </div>
            </div>

            {/* Modal */}
            {isModalOpen && selectedActivity && (() => {
                const modalTranslated = getTranslatedActivity(selectedActivity, lang);
                return (
                <div
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="activity-modal-title"
                    className="fixed inset-0 z-50 flex items-start sm:items-center justify-center bg-black/50 p-4 sm:p-6 overflow-y-auto"
                    onClick={() => {
                        closeModal();
                    }}
                >
                    <div ref={modalRef} className={`bg-white dark:bg-[#1a1a1a] dark:text-white border-2 md:border-3 border-black dark:border-neutral-700 max-w-3xl w-full sm:w-11/12 md:w-3/4 p-4 sm:p-6 rounded shadow-[10px_8px_0_#0f172a] transform transition-all duration-300 max-h-[90dvh] my-auto flex flex-col overflow-hidden ${isAnimating ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`} onClick={(e) => e.stopPropagation()} aria-describedby="activity-modal-desc">
                        <div className="flex justify-between items-start flex-shrink-0">
                            <div>
                                <h3 className="text-2xl font-semibold dark:text-white">{modalTranslated.title}</h3>
                                <div className="mt-2 flex flex-wrap gap-2 text-sm text-gray-600 dark:text-gray-400">
                                    {modalTranslated.date && <span className="px-2 py-1 bg-gray-100 dark:bg-neutral-800 text-gray-700 dark:text-gray-200 border border-gray-200 dark:border-neutral-700 rounded text-xs">{modalTranslated.date}</span>}
                                    {modalTranslated.location && <span className="px-2 py-1 bg-gray-100 dark:bg-neutral-800 text-gray-700 dark:text-gray-200 border border-gray-200 dark:border-neutral-700 rounded text-xs">{modalTranslated.location}</span>}
                                    {modalTranslated.category && <span className="px-2 py-1 bg-gray-100 dark:bg-neutral-800 text-gray-700 dark:text-gray-200 border border-gray-200 dark:border-neutral-700 rounded text-xs">{modalTranslated.category}</span>}
                                    {modalTranslated.status && <span className="px-2 py-1 bg-gray-100 dark:bg-neutral-800 text-gray-700 dark:text-gray-200 border border-gray-200 dark:border-neutral-700 rounded text-xs capitalize">{modalTranslated.status}</span>}
                                </div>
                            </div>
                            <div className="flex items-start gap-2">
                                <button ref={closeButtonRef} className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white ml-3 p-2 rounded focus:outline-none focus:ring-2 focus:ring-purple-400 cursor-pointer" aria-label="Close activity details" onClick={() => { closeModal(); }}>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                    </svg>
                                </button>
                            </div>
                        </div>

                        {/* Images: support either string or array */}
                        <div className="mt-4 flex-1 min-h-0 overflow-y-auto pr-2 pb-2">
                            {(selectedActivity.images || selectedActivity.image) && (
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {Array.isArray(selectedActivity.images)
                                        ? selectedActivity.images.map((img, i) => (
                                            <div key={i} className="w-full rounded border border-gray-200 dark:border-neutral-700 overflow-hidden bg-gray-50 dark:bg-neutral-900 flex items-center justify-center h-40 sm:h-52 md:h-56">
                                                <img src={img} alt={`${modalTranslated.title}-${i}`} className="max-w-full max-h-full object-contain" />
                                            </div>
                                        ))
                                        : (selectedActivity.images
                                            ? <div className="w-full rounded border border-gray-200 dark:border-neutral-700 overflow-hidden bg-gray-50 dark:bg-neutral-900 flex items-center justify-center h-48 sm:h-60 md:h-72">
                                                <img src={selectedActivity.images} alt={modalTranslated.title} className="max-w-full max-h-full object-contain" />
                                            </div>
                                            : <div className="w-full rounded border border-gray-200 dark:border-neutral-700 overflow-hidden bg-gray-50 dark:bg-neutral-900 flex items-center justify-center h-48 sm:h-60 md:h-72">
                                                <img src={selectedActivity.image} alt={modalTranslated.title} className="max-w-full max-h-full object-contain" />
                                            </div>)
                                    }
                                </div>
                            )}

                            <div id="activity-modal-desc" className="mt-4 text-gray-700 dark:text-gray-300 text-justify">
                                <p>{modalTranslated.fullDescription}</p>
                            </div>

                            {/* Skills */}
                            {selectedActivity.skills && selectedActivity.skills.length > 0 && (
                                <div className="mt-4">
                                    <h4 className="text-sm font-semibold text-gray-800 dark:text-gray-200 mb-2">{t('skillsLabel')}</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {selectedActivity.skills.map((s, i) => (
                                            <span key={i} className="text-xs px-2.5 py-1 bg-indigo-50 dark:bg-purple-950/60 text-indigo-700 dark:text-purple-300 border border-indigo-200 dark:border-purple-800 rounded font-medium">{s}</span>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Achievements */}
                            {modalTranslated.achievements && modalTranslated.achievements.length > 0 && (
                                <div className="mt-4">
                                    <h4 className="text-sm font-semibold text-gray-800 dark:text-gray-200 mb-2">{t('achievements')}</h4>
                                    <ul className="list-disc list-inside text-gray-700 dark:text-gray-300">
                                        {modalTranslated.achievements.map((a, i) => (
                                            <li key={i} className="mb-1">{a}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {/* External Links */}
                            {selectedActivity.links && selectedActivity.links.length > 0 && (
                                <div className="mt-6">
                                    <h4 className="text-sm font-semibold text-gray-800 dark:text-gray-200 mb-2">{t('links')}</h4>
                                    <div className="flex flex-col gap-2">
                                        {selectedActivity.links.map((l, i) => (
                                            <a key={i} href={l.url || l} target="_blank" rel="noopener noreferrer" className="text-[#0EA5E9] dark:text-sky-400 hover:underline">
                                                {l.title || l}
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            )}
                            {selectedActivity.link && (
                                <div className="flex justify-end mt-6 mb-6">
                                    <a href={selectedActivity.link} target="_blank" rel="noopener noreferrer" className="inline-block font-semibold bg-[#0EA5E9] text-white border-2 border-[#0EA5E9] px-4 py-3 text-xs uppercase shadow-[4px_6px_0_#0f172a] hover:bg-[#0f172a] hover:text-white rounded-sm">
                                        {t('moreInfo')}
                                    </a>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                );
            })()}
        </section>
    );
};

export default MyActivities;
