import React from 'react';
import { LinkedInIcon, WhatsAppIcon, EmailIcon, GitHubIcon, InstagramIcon, TikTokIcon, FacebookIcon } from './Icons/SocialIcons';

const SKY_SHADES = [
    '#0EA5E9', // sky-500
    '#0284C7', // sky-600
    '#38BDF8', // sky-400
    '#0369A1', // sky-700
    '#7DD3FC', // sky-300
    '#BAE6FD', // sky-200
];

const ICON_MAP = { 
    linkedin: LinkedInIcon, 
    whatsapp: WhatsAppIcon, 
    email: EmailIcon, 
    github: GitHubIcon,
    instagram: InstagramIcon,
    tiktok: TikTokIcon,
    facebook: FacebookIcon
};

const ContactCard = ({ type, href, label, index = 0 }) => {
    const IconComponent = ICON_MAP[type?.toLowerCase()] || EmailIcon;
    const headerColor = SKY_SHADES[index % SKY_SHADES.length];

    return (
        <a href={href} target="_blank" rel="noopener noreferrer" aria-label={`Contact via ${label}`} className="block group w-full">
            <div className="w-full aspect-square border-2 border-black dark:border-neutral-700 shadow-[4px_4px_0_#0f172a] nb-card-hover overflow-hidden bg-white dark:bg-[#1a1a1a] rounded flex flex-col">
                <div className="h-12 sm:h-16 md:h-20 w-full flex-shrink-0 flex items-center justify-center" style={{ backgroundColor: headerColor }}>
                    <div className="relative w-6 h-6 sm:w-8 sm:h-8 md:w-12 md:h-12 flex items-center justify-center">
                        {IconComponent && <IconComponent />}
                    </div>
                </div>
                <div className="p-1 sm:p-2 flex flex-col flex-grow justify-center bg-white dark:bg-[#1a1a1a]">
                    <h3 className="text-xs md:text-sm font-bold text-center leading-tight text-gray-800 dark:text-white truncate px-1">{label}</h3>
                </div>
            </div>
        </a>
    );
};

export default React.memo(ContactCard);
