import React from 'react';

// LinkedIn Icon Component - OFFICIAL LINKEDIN LOGO
export const LinkedInIcon = () => (
    <svg className="absolute top-6 left-6" width="130" height="130" viewBox="0 0 130 130" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g filter="url(#filter0_d_linkedin)">
            {/* White background */}
            <rect width="100" height="100" rx="22" fill="white" />
            
            {/* LinkedIn blue background */}
            <rect x="12" y="12" width="76" height="76" rx="12" fill="#0077B5" />
            
            {/* Official LinkedIn "in" logo */}
            <g transform="translate(50, 50) scale(1.5)">
                {/* Letter "i" */}
                <circle cx="-8" cy="-10" r="2.5" fill="white" />
                <rect x="-10" y="-5" width="4" height="15" fill="white" />
                
                {/* Letter "n" */}
                <rect x="-2" y="-5" width="4" height="15" fill="white" />
                <path d="M2,-5 L2,-2 C2,-2 3.5,-5 7,-5 C10.5,-5 12,-2.5 12,-0.5 L12,10 L8,10 L8,0 C8,-1 7.5,-1.5 6.5,-1.5 C5.5,-1.5 4,-0.5 4,0 L4,10 L0,10 L0,-5 L2,-5 Z" fill="white" />
            </g>
            
            {/* Subtle border */}
            <rect x="12" y="12" width="76" height="76" rx="12" stroke="rgba(0,119,181,0.3)" strokeWidth="1" fill="none" />
        </g>
        <defs>
            <filter id="filter0_d_linkedin" x="0" y="0" width="130" height="130" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                <feOffset dx="5" dy="5" />
                <feGaussianBlur stdDeviation="2.5" />
                <feComposite in2="hardAlpha" operator="out" />
                <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0.467 0 0 0 0 0.71 0 0 0 0.4 0" />
                <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_linkedin" />
                <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_linkedin" result="shape" />
            </filter>
        </defs>
    </svg>
);

// WhatsApp Icon Component - OFFICIAL WHATSAPP LOGO
export const WhatsAppIcon = () => (
    <svg className="absolute top-6 left-6" width="130" height="130" viewBox="0 0 130 130" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g filter="url(#filter0_d_whatsapp)">
            {/* White background with subtle shadow */}
            <rect width="100" height="100" rx="22" fill="white" />
            
            {/* WhatsApp Official Green Circle */}
            <circle cx="50" cy="50" r="38" fill="#25D366" />
            
            {/* Official WhatsApp Logo - Exact Replica */}
            <g transform="translate(50, 50) scale(1.2)">
                {/* Main WhatsApp chat bubble */}
                <path 
                    d="M-15.5,-15.5 C-15.5,-24.1 -9.1,-31 0,-31 C9.1,-31 15.5,-24.1 15.5,-15.5 C15.5,-6.9 9.1,0 0,0 C-2.2,0 -4.3,-0.5 -6.2,-1.4 L-15.5,2.5 L-12.5,-6.2 C-14.2,-8.9 -15.5,-12.1 -15.5,-15.5 Z" 
                    fill="white"
                />
                
                {/* WhatsApp phone handset - Official shape */}
                <path 
                    d="M-8,-12 C-8.5,-12.5 -8.5,-13.2 -8,-13.7 L-6.2,-15.5 C-5.7,-16 -4.8,-16 -4.3,-15.5 L-2.5,-13.7 C-2,-13.2 -2,-12.3 -2.5,-11.8 L-3.5,-10.8 C-2.8,-9.2 -1.2,-7.6 0.4,-6.9 L1.4,-7.9 C1.9,-8.4 2.8,-8.4 3.3,-7.9 L5.1,-6.1 C5.6,-5.6 5.6,-4.7 5.1,-4.2 L3.3,-2.4 C2.8,-1.9 2.1,-1.9 1.6,-2.4 C-1.2,-4.6 -4.6,-8 -6.8,-10.8 C-7.3,-11.3 -7.3,-12 -8,-12 Z" 
                    fill="#25D366"
                />
            </g>
            
            {/* Subtle border for definition */}
            <circle cx="50" cy="50" r="38" stroke="rgba(255,255,255,0.3)" strokeWidth="1" fill="none" />
        </g>
        <defs>
            <filter id="filter0_d_whatsapp" x="0" y="0" width="130" height="130" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                <feOffset dx="5" dy="5" />
                <feGaussianBlur stdDeviation="2.5" />
                <feComposite in2="hardAlpha" operator="out" />
                <feColorMatrix type="matrix" values="0 0 0 0 0.145 0 0 0 0 0.827 0 0 0 0 0.4 0 0 0 0.4 0" />
                <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_whatsapp" />
                <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_whatsapp" result="shape" />
            </filter>
        </defs>
    </svg>
);

// Gmail Icon Component - OFFICIAL GMAIL LOGO
export const EmailIcon = () => (
    <svg className="absolute top-6 left-6" width="130" height="130" viewBox="0 0 130 130" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g filter="url(#filter0_d_email)">
            {/* White background */}
            <rect width="100" height="100" rx="22" fill="white" />
            
            {/* Official Gmail Logo */}
            <g transform="translate(50, 50) scale(1.8)">
                {/* Gmail envelope base */}
                <rect x="-12" y="-8" width="24" height="16" rx="2" fill="#EA4335" />
                
                {/* Gmail envelope flap - top */}
                <path d="M-12,-8 L0,2 L12,-8 Z" fill="#FBBC04" />
                
                {/* Left side panel */}
                <path d="M-12,-8 L-12,8 L-8,4 L0,-4 Z" fill="#34A853" />
                
                {/* Right side panel */}
                <path d="M12,-8 L12,8 L8,4 L0,-4 Z" fill="#34A853" />
                
                {/* Center fold line */}
                <path d="M0,-4 L0,8" stroke="white" strokeWidth="0.5" opacity="0.8" />
                
                {/* Gmail "M" symbol overlay for instant recognition */}
                <g transform="scale(0.7)">
                    <path d="M-8,-6 L0,2 L8,-6" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                    <circle cx="0" cy="0" r="1" fill="white" />
                </g>
                
                {/* Small "G" indicator */}
                <circle cx="8" cy="6" r="2.5" fill="white" />
                <text x="8" y="7.5" textAnchor="middle" fontSize="3" fontWeight="bold" fill="#EA4335">G</text>
            </g>
            
            {/* Subtle border */}
            <rect x="12" y="12" width="76" height="76" rx="20" stroke="rgba(234,67,53,0.2)" strokeWidth="1" fill="none" />
        </g>
        <defs>
            <filter id="filter0_d_email" x="0" y="0" width="130" height="130" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                <feOffset dx="5" dy="5" />
                <feGaussianBlur stdDeviation="2.5" />
                <feComposite in2="hardAlpha" operator="out" />
                <feColorMatrix type="matrix" values="0 0 0 0 0.918 0 0 0 0 0.263 0 0 0 0 0.208 0 0 0 0.4 0" />
                <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_email" />
                <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_email" result="shape" />
            </filter>
        </defs>
    </svg>
);

// GitHub Icon Component - OFFICIAL GITHUB LOGO
export const GitHubIcon = () => (
    <svg className="absolute top-6 left-6" width="130" height="130" viewBox="0 0 130 130" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g filter="url(#filter0_d_github)">
            {/* White background */}
            <rect width="100" height="100" rx="22" fill="white" />
            
            {/* GitHub dark background circle */}
            <circle cx="50" cy="50" r="38" fill="#181717" />
            
            {/* Official GitHub Octocat Logo */}
            <g transform="translate(50, 50) scale(1.4)">
                <path 
                    d="M0,-20C-11.05,0-20,8.95-20,20C-20,28.85-14.19,36.45-6.175,39.1C-5.025,39.3-4.6,38.625-4.6,38.025V34.725C-9.975,35.925-11.325,32.05-11.325,32.05C-12.375,29.425-13.95,28.775-13.95,28.775C-16.225,27.475-13.775,27.5-13.775,27.5C-11.25,27.675-9.925,30.175-9.925,30.175C-7.675,34.2-4.025,33.075-2.4,32.325C-2.175,30.725-1.525,29.6-0.8,28.875C-5.825,28.125-11.175,26.2-11.175,17.475C-11.175,15.05-10.325,13.075-9.875,11.6C-10.125,10.85-11.025,8.25-9.625,4.7C-9.625,4.7-7.5,4.025-2.425,7.5C-0.775,7.025,0.925,6.775,2.625,6.775C4.325,6.775,6.025,7.025,7.675,7.5C12.75,4.025,14.875,4.7,14.875,4.7C16.275,8.25,15.375,10.85,15.125,11.6C16.575,13.075,17.425,15.05,17.425,17.475C17.425,26.225,12.05,28.1,7,28.85C7.875,29.65,8.675,31.2,8.675,33.575V38.025C8.675,38.625,9.1,39.325,10.275,39.1C18.275,36.425,24.075,28.85,24.075,20C24.075,8.95,15.125,0,4.075,0Z" 
                    fill="white"
                    transform="scale(0.75)"
                />
            </g>
            
            {/* Subtle border */}
            <circle cx="50" cy="50" r="38" stroke="rgba(24,23,23,0.3)" strokeWidth="1" fill="none" />
        </g>
        <defs>
            <filter id="filter0_d_github" x="0" y="0" width="130" height="130" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                <feOffset dx="5" dy="5" />
                <feGaussianBlur stdDeviation="2.5" />
                <feComposite in2="hardAlpha" operator="out" />
                <feColorMatrix type="matrix" values="0 0 0 0 0.094 0 0 0 0 0.09 0 0 0 0 0.09 0 0 0 0.4 0" />
                <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_github" />
                <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_github" result="shape" />
            </filter>
        </defs>
    </svg>
);
