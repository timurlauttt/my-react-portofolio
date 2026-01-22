import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
    const location = useLocation();
    const currentPath = location.pathname;
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // helper to check if link is active
    const isActive = (path) => currentPath === path;

    // helper to build link class
    const linkClass = (path) => {
        const base = 'navbar-text hover';
        return isActive(path) ? `${base} navbar-text active` : `${base} text-black`;
    };

    // Toggle menu
    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    // Desktop Navbar
    return (
        <>
            {/* Navbar - Desktop & Mobile */}
            <nav className="navbar fixed top-0 w-full bg-white z-50 border-b border-gray-200 px-4 md:px-16 shadow-sm">
                <div className="container mx-auto flex justify-between items-center p-4 md:p-6 text-black">
                    <Link
                        to="/"
                        className={`text-base md:text-2xl font-bold navbar-text hover ${isActive("/") ? "navbar-text active" : "text-black"}`}
                    >
                        Urip
                    </Link>

                    {/* Hamburger Button - Mobile Only */}
                    <button
                        onClick={toggleMenu}
                        className="md:hidden flex flex-col justify-center items-center w-10 h-10 focus:outline-none"
                        aria-label="Toggle menu"
                    >
                        <span className={`bg-black block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm ${isMenuOpen ? 'rotate-45 translate-y-1' : '-translate-y-0.5'}`}></span>
                        <span className={`bg-black block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm my-0.5 ${isMenuOpen ? 'opacity-0' : 'opacity-100'}`}></span>
                        <span className={`bg-black block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm ${isMenuOpen ? '-rotate-45 -translate-y-1' : 'translate-y-0.5'}`}></span>
                    </button>

                    {/* Menu (Desktop View) */}
                    <ul className="hidden md:flex space-x-6">
                        <li>
                            <Link to="/portfolio" className={linkClass("/portfolio")}>
                                Portfolio
                            </Link>
                        </li>
                        <li>
                            <Link to="/skills" className={linkClass("/skills")}>
                                Skills
                            </Link>
                        </li>
                        <li>
                            <Link to="/activities" className={linkClass("/activities")}>
                                Activities
                            </Link>
                        </li>
                        <li>
                            <Link to="/contact" className={linkClass("/contact")}>
                                Contact
                            </Link>
                        </li>
                        <li>
                            <Link to="/about" className={linkClass("/about")}>
                                About Me
                            </Link>
                        </li>
                        <li>
                            <a href="https://astro-blog-my-portofolio-guwa.vercel.app/" className="btn btn-md bg-black text-white rounded-md py-2 px-4 hover:bg-gray-400" target="_blank" >
                                Blog
                            </a>
                        </li>
                    </ul>
                </div>

                {/* Mobile Menu Dropdown */}
                <div className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${isMenuOpen ? 'max-h-96' : 'max-h-0'}`}>
                    <ul className="flex flex-col space-y-2 px-8 pb-4 bg-white border-t border-gray-100">
                        <li>
                            <Link
                                to="/portfolio"
                                className={`block py-3 px-4 rounded ${isActive("/portfolio") ? "bg-purple-100 text-[#74247A] font-semibold" : "text-black hover:bg-gray-100"}`}
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Portfolio
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/skills"
                                className={`block py-3 px-4 rounded ${isActive("/skills") ? "bg-purple-100 text-[#74247A] font-semibold" : "text-black hover:bg-gray-100"}`}
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Skills
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/activities"
                                className={`block py-3 px-4 rounded ${isActive("/activities") ? "bg-purple-100 text-[#74247A] font-semibold" : "text-black hover:bg-gray-100"}`}
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Activities
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/contact"
                                className={`block py-3 px-4 rounded ${isActive("/contact") ? "bg-purple-100 text-[#74247A] font-semibold" : "text-black hover:bg-gray-100"}`}
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Contact
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/about"
                                className={`block py-3 px-4 rounded ${isActive("/about") ? "bg-purple-100 text-[#74247A] font-semibold" : "text-black hover:bg-gray-100"}`}
                                onClick={() => setIsMenuOpen(false)}
                            >
                                About Me
                            </Link>
                        </li>
                        <li>
                            <a
                                href="https://astro-blog-my-portofolio-guwa.vercel.app/"
                                className="block py-3 px-4 bg-yellow-400 text-black rounded text-start hover:bg-yellow-500"
                                onClick={() => setIsMenuOpen(false)}
                                target="_blank"
                            >
                                Blog
                            </a>
                        </li>
                    </ul>
                </div>
            </nav>
        </>
    );
};

export default Navbar;