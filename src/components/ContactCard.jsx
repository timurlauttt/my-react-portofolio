import React from 'react';
import { LinkedInIcon, WhatsAppIcon, EmailIcon, GitHubIcon } from './Icons/SocialIcons';

const ContactCard = ({ type, href, bgColor, order = "order-1", label }) => {
    const iconComponents = {
        linkedin: LinkedInIcon,
        whatsapp: WhatsAppIcon,
        email: EmailIcon,
        github: GitHubIcon
    };

    const IconComponent = iconComponents[type];

    return (
        <a 
            href={href} 
            target="_blank" 
            rel="noopener noreferrer"
            aria-label={`Contact via ${label}`}
            className="block group w-full max-w-[280px]"
        >
            <div className={`relative w-full min-h-[250px] ${bgColor} border-4 border-black shadow-[10px_10px_0_#000] 
                group-hover:scale-105 group-hover:shadow-[15px_15px_0_#000] group-hover:-translate-y-2 
                transition-all duration-300 ease-out cursor-pointer flex flex-col justify-center items-center 
                p-6 ${order} sm:order-none overflow-hidden`}>
                
                {IconComponent && <IconComponent />}
                
                <div className="absolute bottom-4 left-4 right-4 transform group-hover:scale-105 transition-all duration-300">
                    <h3 className="text-lg font-bold text-black text-center bg-white/95 backdrop-blur-sm px-4 py-3 
                        rounded-xl shadow-xl border-2 border-black group-hover:bg-white group-hover:shadow-2xl 
                        transition-all duration-300">
                        {label}
                    </h3>
                </div>
            </div>
        </a>
    );
};

export default ContactCard;
