import React, { useState, useEffect, useRef } from 'react';
import PortfolioModal from './PortfolioModal';

const PortfolioCard = ({ image, title, description, longDescription = '', link, isExternal = true, delay = 0, tech = null, startDate = null, endDate = null }) => {
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef();

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setTimeout(() => setIsVisible(true), delay);
                }
            },
            { threshold: 0.1 }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => observer.disconnect();
    }, [delay]);

    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleClick = () => {
        setIsModalOpen(true);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            setIsModalOpen(true);
        }
    };

    return (
        <>
        <div
            ref={ref}
            className={`flex flex-col sm:flex-row p-3 sm:p-4 bg-white border-4 border-black shadow-[8px_8px_0_#000] 
            hover:scale-105 hover:transition-all hover:border-yellow-500 hover:shadow-[8px_8px_0_#74247A] cursor-pointer
            transform transition-all duration-700 ${
                isVisible 
                    ? 'translate-y-0 opacity-100' 
                    : 'translate-y-8 opacity-0'
            }`}
        >

            <img
                src={image}
                className="w-full sm:w-3/5 h-auto object-cover shadow-[4px_4px_0_#000] 
                    hover:scale-105 hover:transition-all hover:border-yellow-700 hover:shadow-[8px_8px_0_#74247A]"
                alt={title}
            />

            <div className="mt-3 sm:mt-0 sm:ml-4 flex flex-col flex-1">
                <h5 className="text-base sm:text-lg font-bold">{title}</h5>
                <p className="text-xs sm:text-gray-700 mt-1 sm:mt-2">
                    {description}
                </p>

                <hr className="my-1 sm:my-2" />

                <div className="mt-4 flex justify-end">
                    <button
                        type="button"
                        onClick={(e) => { e.stopPropagation(); setIsModalOpen(true); }}
                        aria-haspopup="dialog"
                        className="flex items-center gap-2 font-semibold bg-yellow-400 text-black border-2 border-yellow-400 
                            font-syne px-3 py-2 text-xs uppercase shadow-[4px_6px_0_#74247A] transition-all duration-200 ease-in-out 
                            cursor-pointer hover:bg-[#74247A] hover:text-yellow-400 hover:shadow-[4px_4px_0_#ffcc00] w-fit"
                    >
                        Learn More
                        <svg className="w-4 h-4 sm:w-5 sm:h-5" viewBox="0 0 46 46" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect x="0.5" y="2.5" width="43" height="43" rx="21.5" fill="#101010" stroke="#101010" />
                            <rect x="2.5" y="0.5" width="43" height="43" rx="21.5" fill="#FFC700" stroke="#101010" />
                            <path d="M27.5418 23.956L27.765 23.1231L27.0183 23.5543L17.7394 28.9114C16.4753 29.6412 14.859 29.2081 14.1292 27.9441C13.3994 26.68 13.8325 25.0637 15.0966 24.3339L24.3754 18.9768L25.0947 18.5615L24.2985 18.3251L19.9365 17.0302C18.5918 16.631 17.8407 15.2018 18.2744 13.8679C18.6992 12.5616 20.1002 11.8447 21.4082 12.2642L31.9983 15.6615C33.2341 16.0579 33.961 17.334 33.6718 18.5992L31.227 29.2919C30.9261 30.6078 29.625 31.4389 28.3046 31.1585C26.9196 30.8644 26.0644 29.4691 26.4309 28.1015L27.5418 23.956Z" fill="#4D21FF" stroke="#101010" strokeWidth="0.714282" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>

        <PortfolioModal
            open={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            title={title}
            image={image}
            description={description}
            longDescription={longDescription}
            link={link}
            tech={tech}
            startDate={startDate}
            endDate={endDate}
        />
        </>
    );
};

export default PortfolioCard;
