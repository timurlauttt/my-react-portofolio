import React from 'react';

const Container = ({ children, className = '', maxWidth = 'max-w-6xl' }) => {
    return (
        <div className={`container mx-auto ${maxWidth} px-4 ${className}`}>
            {children}
        </div>
    );
};

export default Container;
