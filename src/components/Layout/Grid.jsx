import React from 'react';

const Grid = ({ 
    children, 
    cols = 1, 
    gap = 4, 
    className = '',
    responsive = {
        sm: 2,
        md: 3,
        lg: 4
    }
}) => {
    const responsiveClasses = Object.entries(responsive)
        .map(([breakpoint, colCount]) => `${breakpoint}:grid-cols-${colCount}`)
        .join(' ');
    
    return (
        <div className={`grid grid-cols-${cols} ${responsiveClasses} gap-${gap} ${className}`}>
            {children}
        </div>
    );
};

export default Grid;
