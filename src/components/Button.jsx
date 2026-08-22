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
        primary: "bg-[#0EA5E9] text-black border-[#0EA5E9] shadow-[4px_6px_0_#0f172a] hover:bg-[#0f172a] hover:text-white hover:shadow-[4px_4px_0_#0EA5E9]",
        secondary: "bg-white text-black border-black shadow-[4px_4px_0_#0f172a] hover:bg-black hover:text-white"
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
