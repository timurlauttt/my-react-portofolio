import React from 'react';

const NavLink = ({ href, activeSection, sectionId, children, onClick }) => {
    const isActive = activeSection === sectionId;
    
    return (
        <a
            href={href}
            className={`navbar-text hover ${isActive ? "navbar-text active" : "text-black"}`}
            onClick={onClick}
        >
            {children}
        </a>
    );
};

export default NavLink;
