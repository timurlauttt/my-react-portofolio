import React, { useEffect, useState, useRef } from 'react';
import ActivityCard from './components/ActivityCard';
import { activitiesService } from './services/serviceWrapper';

const MyActivities = () => {
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

    const openModal = (activity) => {
        setSelectedActivity(activity);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedActivity(null);
    };

    // Immediate open for touch (tap) interactions (kept for touch handling)
    const openModalImmediate = (activity) => openModal(activity);

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
        <section id="activities" className="py-8 sm:py-12">
            <div className="max-w-6xl mx-auto px-3 sm:px-4 text-center">
                <h1 className="font-bold mt-4 mb-4 text-center text-lg md:text-2xl">Activities</h1>
                <p className="text-gray-600 mb-8">Here are some of the activities I've participated during my study, you can click on the cards to find out more!</p>

                {loading && <p className="text-center">Loading...</p>}
                {error && <p className="text-red-500">{error}</p>}

                <div className="grid gap-4 sm:gap-6 md:gap-8 grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                    {activitiesData.map((activity, index) => (
                        <div
                            key={activity.activityId || index}
                            className="inline-block mx-auto"
                            // Use click to open modal (works for mouse and keyboard). Touch handlers still detect tap vs scroll.
                            onClick={() => openModalImmediate(activity)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' || e.key === ' ') {
                                    e.preventDefault();
                                    openModalImmediate(activity);
                                }
                            }}
                            role="button"
                            tabIndex={0}
                            onTouchStart={isTouchDevice ? (e) => {
                                const t = e.touches && e.touches[0];
                                if (t) touchStartRef.current = { x: t.clientX, y: t.clientY, moved: false };
                            } : undefined}
                            onTouchMove={isTouchDevice ? (e) => {
                                const t = e.touches && e.touches[0];
                                if (!t) return;
                                const dx = Math.abs(t.clientX - (touchStartRef.current.x || 0));
                                const dy = Math.abs(t.clientY - (touchStartRef.current.y || 0));
                                if (dx > 10 || dy > 10) touchStartRef.current.moved = true;
                            } : undefined}
                            onTouchEnd={isTouchDevice ? (e) => {
                                // If user didn't move finger significantly, treat as tap
                                if (!touchStartRef.current.moved) {
                                    openModalImmediate(activity);
                                }
                                touchStartRef.current = { x: 0, y: 0, moved: false };
                            } : undefined}
                        >
                            <ActivityCard
                                bgColor={activity.bgColor}
                                title={activity.title}
                                description={activity.description}
                                link={activity.link}
                                delay={index * 80}
                            />
                        </div>
                    ))}
                </div>
            </div>

            {/* Modal */}
            {isModalOpen && selectedActivity && (
                <div
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="activity-modal-title"
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 sm:p-6"
                    // Tap/click overlay closes modal
                        onClick={() => {
                            closeModal();
                        }}
                >
            <div ref={modalRef} className={`bg-white max-w-3xl w-full sm:w-11/12 md:w-3/4 p-4 sm:p-6 rounded shadow-lg transform transition-all duration-300 max-h-[80vh] overflow-hidden ${isAnimating ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`} onClick={(e) => e.stopPropagation()} aria-describedby="activity-modal-desc">
                        <div className="flex justify-between items-start">
                            <div>
                                <h3 className="text-2xl font-semibold">{selectedActivity.title}</h3>
                                <div className="mt-1 flex flex-wrap gap-2 text-sm text-gray-600">
                                    {selectedActivity.date && <span className="px-2 py-1 bg-gray-100 rounded">{selectedActivity.date}</span>}
                                    {selectedActivity.location && <span className="px-2 py-1 bg-gray-100 rounded">{selectedActivity.location}</span>}
                                    {selectedActivity.category && <span className="px-2 py-1 bg-gray-100 rounded">{selectedActivity.category}</span>}
                                    {selectedActivity.status && <span className="px-2 py-1 bg-gray-100 rounded capitalize">{selectedActivity.status}</span>}
                                </div>
                            </div>
                            <div className="flex items-start gap-2">
                                <button ref={closeButtonRef} className="text-gray-600 hover:text-gray-900 ml-3 p-2 rounded focus:outline-none focus:ring-2 focus:ring-indigo-300" aria-label="Close activity details" onClick={() => { closeModal(); }}>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                    </svg>
                                </button>
                            </div>
                        </div>

                        {/* Images: support either string or array */}
                        {/* Image fallback: prefer `images`, fallback to `image` */}
                        {/* Make modal content scrollable and constrain image sizes so layout doesn't break */}
                        <div className="mt-4 overflow-y-auto pr-2 pb-2" style={{ maxHeight: 'calc(80vh - 160px)' }}>
                            {(selectedActivity.images || selectedActivity.image) && (
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {Array.isArray(selectedActivity.images)
                                        ? selectedActivity.images.map((img, i) => (
                                            <div key={i} className="w-full rounded overflow-hidden bg-gray-50 flex items-center justify-center h-40 sm:h-52 md:h-56">
                                                <img src={img} alt={`${selectedActivity.title}-${i}`} className="max-w-full max-h-full object-contain" />
                                            </div>
                                        ))
                                        : (selectedActivity.images
                                            ? <div className="w-full rounded overflow-hidden bg-gray-50 flex items-center justify-center h-48 sm:h-60 md:h-72">
                                                <img src={selectedActivity.images} alt={selectedActivity.title} className="max-w-full max-h-full object-contain" />
                                            </div>
                                            : <div className="w-full rounded overflow-hidden bg-gray-50 flex items-center justify-center h-48 sm:h-60 md:h-72">
                                                <img src={selectedActivity.image} alt={selectedActivity.title} className="max-w-full max-h-full object-contain" />
                                            </div>)
                                    }
                                </div>
                            )}

                            <div id="activity-modal-desc" className="mt-4 text-gray-700 leading-relaxed">
                                <p>{selectedActivity.fullDescription || selectedActivity.description}</p>
                            </div>

                        {/* Skills */}
                            {selectedActivity.skills && selectedActivity.skills.length > 0 && (
                                <div className="mt-4">
                                    <h4 className="text-sm font-medium text-gray-800 mb-2">Skills</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {selectedActivity.skills.map((s, i) => (
                                            <span key={i} className="text-xs px-2 py-1 bg-indigo-50 text-indigo-700 rounded">{s}</span>
                                        ))}
                                    </div>
                                </div>
                            )}

                        {/* Achievements */}
                            {selectedActivity.achievements && selectedActivity.achievements.length > 0 && (
                                <div className="mt-4">
                                    <h4 className="text-sm font-medium text-gray-800 mb-2">Achievements</h4>
                                    <ul className="list-disc list-inside text-gray-700">
                                        {selectedActivity.achievements.map((a, i) => (
                                            <li key={i} className="mb-1">{a}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                        {/* External Links */}
                            {selectedActivity.links && selectedActivity.links.length > 0 && (
                                <div className="mt-8">
                                    <h4 className="text-sm font-medium text-gray-800 mb-2">Links</h4>
                                    <div className="flex flex-col gap-2">
                                        {selectedActivity.links.map((l, i) => (
                                            <a key={i} href={l.url || l} target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline">
                                                {l.title || l}
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            )}
                            {selectedActivity.link && (
                                <div className="flex justify-end mt-6 mb-6">
                                    <a href={selectedActivity.link} target="_blank" rel="noopener noreferrer" className="inline-block font-semibold bg-yellow-400 text-black border-2 border-yellow-400 px-4 py-3 text-xs uppercase shadow-[4px_6px_0_#74247A] hover:bg-[#74247A] hover:text-yellow-400 rounded-sm">
                                        More Info
                                    </a>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
};

export default MyActivities;
