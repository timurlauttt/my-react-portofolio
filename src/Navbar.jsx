import React, { useEffect, useState } from "react";

const Navbar = () => {
    const [activeSection, setActiveSection] = useState("home");

    useEffect(() => {
        const handleScroll = () => {
            const sections = Array.from(document.querySelectorAll("section"));
            const viewportCenter = window.scrollY + window.innerHeight / 2;

            // Find the section that contains the viewport center
            const current = sections.find((section) => {
                const top = section.offsetTop;
                const bottom = top + section.offsetHeight;
                return viewportCenter >= top && viewportCenter < bottom;
            });

            if (current) {
                setActiveSection(current.id);
            } else if (sections.length > 0) {
                // Fallback: if none matched (e.g., very top/bottom), pick closest by distance
                const closest = sections.reduce((prev, curr) => {
                    const prevCenter = prev.offsetTop + prev.offsetHeight / 2;
                    const currCenter = curr.offsetTop + curr.offsetHeight / 2;
                    return Math.abs(viewportCenter - currCenter) < Math.abs(viewportCenter - prevCenter) ? curr : prev;
                }, sections[0]);
                setActiveSection(closest.id);
            }
        };

        // run once on mount to set initial active
        handleScroll();
        window.addEventListener("scroll", handleScroll);
        window.addEventListener("resize", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
            window.removeEventListener("resize", handleScroll);
        };
    }, []);

    // helper to build mobile tab class with stronger active styles
    const tabClass = (id) => {
        const base = 'tab-link';
        if (activeSection === id) {
            // add explicit Tailwind border and padding to ensure the top indicator is visible
            return `${base} tab-link-active border-t-4 border-[#74247A] pt-1`;
        }
        return base;
    };

    // Desktop Navbar
    return (
        <>
            {/* Desktop Navbar */}
            <nav className="navbar hidden md:block fixed top-0 w-full bg-white z-50">
                <div className="container mx-auto flex justify-between items-center p-2 md:p-6 text-black">
                    <a
                        href="#home"
                        className={`text-2xl font-bold ms-16  navbar-text hover ${activeSection === "home" ? "navbar-text active" : "text-black"
                            }`}
                    >
                        Urip
                    </a>

                    {/* Menu (Desktop View) */}
                    <ul className="flex space-x-6 me-16">
                        <li>
                            <a
                                href="#portofolio"
                                className={`navbar-text hover ${activeSection === "portofolio" ? "navbar-text active" : "text-black"
                                    }`}
                            >
                                Portfolio
                            </a>
                        </li>
                        <li>
                            <a
                                href="#skills"
                                className={`navbar-text hover ${activeSection === "skills" ? "navbar-text active" : "text-black"
                                    }`}
                            >
                                Skills
                            </a>
                        </li>
                        <li>
                            <a
                                href="#activities"
                                className={`navbar-text hover ${activeSection === "activities" ? "navbar-text active" : "text-black"
                                    }`}
                            >
                                Activities
                            </a>
                        </li>

                        <li>
                            <a
                                href="#contact"
                                className={`navbar-text hover ${activeSection === "contact" ? "navbar-text active" : "text-black"
                                    }`}
                            >
                                Contact
                            </a>
                        </li>
                        <li>
                            <a
                                href="#about-me"
                                className={`navbar-text hover ${activeSection === "about-me" ? "navbar-text active" : "text-black"
                                    }`}
                            >
                                About Me
                            </a>
                        </li>
                    </ul>
                </div>
            </nav>

            {/* Mobile Bottom Tab Navigation */}
            <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50">
                <ul className="flex justify-around items-center h-16">
                    <li>
                        <a
                            href="#portofolio"
                            className={tabClass("portofolio")}
                        >
                            <svg className="w-6 h-6 mx-auto mb-1" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M20 6h-2.18c.09-.31.18-.65.18-1a2.996 2.996 0 0 0-5.252-1.993L12 5.75l-.748-1.743A2.996 2.996 0 0 0 6 4c-.82 0-1.584.271-2.201.741A2.974 2.974 0 0 0 2 7a3 3 0 0 0 3 3h.19C5.92 11.08 7.14 13 9 13h6c1.86 0 3.08-1.92 3.81-3H19a3 3 0 0 0 3-3 2.996 2.996 0 0 0-2-2.814V6zm-9.5 2c-.83 0-1.5-.67-1.5-1.5S9.67 5 10.5 5 12 5.67 12 6.5 11.33 8 10.5 8zm4 0c-.83 0-1.5-.67-1.5-1.5S13.67 5 14.5 5 16 5.67 16 6.5 15.33 8 14.5 8z"></path>
                            </svg>
                            <span className="text-xs">Portfolio</span>
                        </a>
                    </li>
                    <li>
                        <a
                            href="#skills"
                            className={tabClass("skills")}
                        >
                            <svg className="w-6 h-6 mx-auto mb-1" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M13 2h-2v7h2V2zm0 11h-2v2h2v-2zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-13c-2.76 0-5 2.24-5 5h2c0-1.66 1.34-3 3-3s3 1.34 3 3h2c0-2.76-2.24-5-5-5z"></path>
                            </svg>
                            <span className="text-xs">Skills</span>
                        </a>
                    </li>
                    <li>
                        <a
                            href="#activities"
                            className={tabClass("activities")}
                        >
                            <svg className="w-6 h-6 mx-auto mb-1" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"></path>
                            </svg>
                            <span className="text-xs">Activity</span>
                        </a>
                    </li>

                    <li>
                        <a
                            href="#contact"
                            className={tabClass("contact")}
                        >
                            <svg className="w-6 h-6 mx-auto mb-1" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"></path>
                            </svg>
                            <span className="text-xs">Contact</span>
                        </a>
                    </li>
                    <li>
                        <a
                            href="#about-me"
                            className={tabClass("about-me")}
                        >
                            <svg className="w-6 h-6 mx-auto mb-1" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"></path>
                            </svg>
                            <span className="text-xs">About</span>
                        </a>
                    </li>
                </ul>
            </nav>
        </>
    );
};

export default Navbar;