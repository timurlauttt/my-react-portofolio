import React from 'react';

const ActivityModal = ({ isOpen, onClose, activity }) => {
    if (!isOpen || !activity) return null;

    const handleBackdropClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return (
        <div 
            className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
            onClick={handleBackdropClick}
        >
            <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto relative animate-fadeIn">
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 z-10 bg-red-500 hover:bg-red-600 text-white rounded-full p-2 transition-colors shadow-lg"
                    aria-label="Close modal"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                {/* Activity Image */}
                {activity.image && (
                    <div className="w-full h-64 bg-gray-200 rounded-t-lg overflow-hidden">
                        <img 
                            src={activity.image} 
                            alt={activity.title}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                                e.target.style.display = 'none';
                                e.target.nextSibling.style.display = 'flex';
                            }}
                        />
                        {/* Fallback when image fails to load */}
                        <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-6xl font-bold hidden">
                            {activity.title.charAt(0)}
                        </div>
                    </div>
                )}

                <div className="p-6">
                    {/* Activity Header */}
                    <div className="mb-6">
                        <div className="flex items-center gap-2 mb-2 flex-wrap">
                            <div className={`px-3 py-1 rounded-full text-xs font-semibold ${activity.bgColor || 'bg-blue-500'} text-white`}>
                                {activity.category || 'Aktivitas'}
                            </div>
                            {activity.status && (
                                <div className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                    activity.status === 'completed' ? 'bg-green-100 text-green-800' :
                                    activity.status === 'ongoing' ? 'bg-yellow-100 text-yellow-800' :
                                    'bg-gray-100 text-gray-800'
                                }`}>
                                    {activity.status === 'completed' ? 'Selesai' :
                                     activity.status === 'ongoing' ? 'Berlangsung' : 'Draft'}
                                </div>
                            )}
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-3">{activity.title}</h2>
                        
                        {/* Date and Location */}
                        <div className="space-y-2">
                            {activity.date && (
                                <div className="flex items-center gap-2 text-gray-600">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                    <span className="text-sm">{activity.date}</span>
                                </div>
                            )}

                            {activity.location && (
                                <div className="flex items-center gap-2 text-gray-600">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                    <span className="text-sm">{activity.location}</span>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Activity Description */}
                    <div className="mb-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-3">Deskripsi</h3>
                        <div className="text-gray-700 leading-relaxed">
                            {activity.fullDescription ? (
                                <div className="whitespace-pre-line">
                                    {activity.fullDescription}
                                </div>
                            ) : (
                                <p>{activity.description}</p>
                            )}
                        </div>
                    </div>

                    {/* Skills/Technologies Used */}
                    {activity.skills && activity.skills.length > 0 && (
                        <div className="mb-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-3">Skills yang Digunakan</h3>
                            <div className="flex flex-wrap gap-2">
                                {activity.skills.map((skill, index) => (
                                    <span key={index} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Achievements/Results */}
                    {activity.achievements && activity.achievements.length > 0 && (
                        <div className="mb-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-3">Pencapaian</h3>
                            <ul className="space-y-2">
                                {activity.achievements.map((achievement, index) => (
                                    <li key={index} className="flex items-start gap-2">
                                        <svg className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        <span className="text-gray-700">{achievement}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {/* External Links */}
                    {activity.links && activity.links.length > 0 && (
                        <div className="mb-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-3">Link Terkait</h3>
                            <div className="space-y-2">
                                {activity.links.map((link, index) => (
                                    <a 
                                        key={index}
                                        href={link.url} 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors"
                                    >
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                        </svg>
                                        {link.title || link.url}
                                    </a>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Action Buttons */}
                    <div className="flex gap-3 pt-4 border-t">
                        {activity.link && (
                            <a 
                                href={activity.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold text-center transition-colors"
                            >
                                Lihat Link External
                            </a>
                        )}
                        <button
                            onClick={onClose}
                            className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-lg font-semibold transition-colors"
                        >
                            Tutup
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ActivityModal;