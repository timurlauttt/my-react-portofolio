import React from 'react';

const Section = ({ 
    id, 
    className = '', 
    backgroundImage,
    children,
    title,
    subtitle 
}) => {
    const bgStyle = backgroundImage ? { backgroundImage: `url(${backgroundImage})` } : {};
    
    return (
        <section 
            id={id} 
            className={`w-full min-h-screen py-16 text-black ${className}`}
            style={bgStyle}
        >
            <div className="container mx-auto px-4">
                {title && (
                    <div className="text-center mb-12">
                        <h1 className="font-bold text-3xl md:text-4xl lg:text-5xl mb-6 text-gray-900">{title}</h1>
                        {subtitle && <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">{subtitle}</p>}
                    </div>
                )}
                {children}
            </div>
        </section>
    );
};

export default Section;
