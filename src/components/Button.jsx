import React from 'react';

const Button = ({ 
    href, 
    children, 
    variant = 'primary',
    size = 'base',
    className = '',
    onClick,
    ...props 
}) => {
    const baseClasses = "font-bold border-2 font-syne uppercase transition-all duration-200 ease-in-out cursor-pointer w-fit";
    
    const variants = {
        primary: "bg-yellow-400 text-black border-yellow-400 shadow-[4px_6px_0_#74247A] hover:bg-[#74247A] hover:text-yellow-400 hover:shadow-[4px_4px_0_#ffcc00]",
        secondary: "bg-white text-black border-black shadow-[4px_4px_0_#000] hover:bg-black hover:text-white"
    };
    
    const sizes = {
        sm: "px-3 py-2 text-xs",
        base: "px-4 py-2 text-base",
        lg: "px-6 py-3 text-lg"
    };
    
    const classes = `${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`;
    
    if (href) {
        return (
            <a href={href} className={classes} onClick={onClick} {...props}>
                {children}
            </a>
        );
    }
    
    return (
        <button className={classes} onClick={onClick} {...props}>
            {children}
        </button>
    );
};

export default Button;
