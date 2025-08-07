import VisitorCounter from './components/VisitorCounter';

function Footer() {
    return (
        <>
            <footer className="footer bg-[#74247A] text-white py-6 px-4 sm:py-8 sm:px-10 md:px-40">
                <div className="container mx-auto">
                    {/* Mobile Layout: Stack vertically */}
                    <div className="block sm:hidden space-y-6">
                        {/* Mobile: Name Section */}
                        <div className="text-left">
                            <h1 className="text-xl font-bold leading-tight">
                                Urip Yoga Pangestu
                            </h1>
                        </div>

                        {/* Mobile: Contact Info (Most Important) */}
                        <div>
                            <h2 className="text-lg font-semibold mb-3 text-left">Contact</h2>
                            <div className="space-y-3">
                                <div>
                                    <a href="https://wa.me/6285861466287" target="_blank" rel="noopener noreferrer"
                                        className="flex items-center gap-2 text-sm hover:text-yellow-300 transition-colors">
                                        <i className="fab fa-whatsapp text-lg"></i>
                                        <span>+62-85861466287</span>
                                    </a>
                                </div>
                                <div>
                                    <a href="mailto:2211103102@ittelkom-pwt.ac.id"
                                        className="flex items-center gap-2 text-sm hover:text-yellow-300 transition-colors">
                                        <i className="fas fa-envelope text-lg"></i>
                                        <span className="break-all">2211103102@ittelkom-pwt.ac.id</span>
                                    </a>
                                </div>
                                <div>
                                    <a href="https://www.linkedin.com/me?trk=p_mwlite_feed-secondary_nav" target="_blank" rel="noopener noreferrer"
                                        className="flex items-center gap-2 text-sm hover:text-yellow-300 transition-colors">
                                        <i className="fab fa-linkedin text-lg"></i>
                                        <span>Urip Yoga Pangestu</span>
                                    </a>
                                </div>
                            </div>
                        </div>

                        {/* Mobile: Navigation */}
                        <div>
                            <h2 className="text-lg font-semibold mb-3 text-left">Navigation</h2>
                            <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm">
                                <a href="#" className="hover:text-yellow-300 transition-colors">Home</a>
                                <a href="#about-me" className="hover:text-yellow-300 transition-colors">About</a>
                                <a href="#skills" className="hover:text-yellow-300 transition-colors">Skills</a>
                                <a href="#portfolio" className="hover:text-yellow-300 transition-colors">Portfolio</a>
                                <a href="#activities" className="hover:text-yellow-300 transition-colors">Activities</a>
                                <a href="#contact" className="hover:text-yellow-300 transition-colors">Contact</a>
                            </div>
                        </div>

                        {/* Mobile: Social Media */}
                        <div>
                            <h2 className="text-lg font-semibold mb-3 text-left">Social Media</h2>
                            <div className="flex gap-6 text-sm">
                                <div className="flex items-center gap-2">
                                    <a href="https://www.instagram.com/__timurlaut?igsh=MTE5ejg1bG81YmVwcQ=="target="_blank" rel="noopener noreferrer" className="hover:text-yellow-300 transition-colors">
                                        <i className="fab fa-instagram text-lg"></i>
                                        <span>__timurlaut</span>
                                    </a>
                                </div>
                                <div className="flex items-center gap-2">
                                    <a href="https://www.facebook.com/share/1R9hRtCYSd/" target="_blank" rel="noopener noreferrer" className="hover:text-yellow-300 transition-colors">
                                        <i className="fab fa-facebook text-lg"></i>
                                        <span>Urip Yoga</span>
                                    </a>
                                </div>
                                <div className="flex items-center gap-2">
                                    <a href="#" target="_blank" rel="noopener noreferrer" className="hover:text-yellow-300 transition-colors">
                                        <i className="fab fa-tiktok text-lg"></i>
                                        <span>pangestuuu</span>
                                    </a>
                                </div>
                            </div>
                        </div>

                        {/* Mobile: Collaboration */}
                        <div className="text-left">
                            <h2 className="text-lg font-semibold mb-2">Let's Collaborate</h2>
                            <p className="text-sm opacity-90">and bring extraordinary ideas to life together</p>
                        </div>
                    </div>

                    {/* Desktop Layout: Original Grid */}
                    <div className="hidden sm:grid grid-cols-1 md:grid-cols-5 gap-6 text-center md:text-left">
                        {/* Column 1: Name */}
                        <div>
                            <h1 className="text-2xl font-bold leading-tight">
                                Urip <br /> Yoga <br /> Pangestu
                            </h1>
                        </div>

                        {/* Column 2: Navigation Links */}
                        <div>
                            <h2 className="text-lg font-semibold mb-3">Navigation Links</h2>
                            <ul className="space-y-2">
                                <li><a href="#" className="hover:text-yellow-300 transition-colors">Home</a></li>
                                <li><a href="#about-me" className="hover:text-yellow-300 transition-colors">About Me</a></li>
                                <li><a href="#skills" className="hover:text-yellow-300 transition-colors">Skills</a></li>
                                <li><a href="#portfolio" className="hover:text-yellow-300 transition-colors">Portfolio</a></li>
                                <li><a href="#activities" className="hover:text-yellow-300 transition-colors">Activities</a></li>
                                <li><a href="#contact" className="hover:text-yellow-300 transition-colors">Contact</a></li>
                            </ul>
                        </div>

                        {/* Column 3: Social Media */}
                        <div>
                            <h2 className="text-lg font-semibold mb-3">Social Media</h2>
                            <ul className="space-y-2">
                                <li className="flex items-center gap-2">
                                    <a href="https://www.instagram.com/__timurlaut?igsh=MTE5ejg1bG81YmVwcQ==" target="_blank" rel="noopener noreferrer" className="hover:text-yellow-300 transition-colors">
                                        <i className="fab fa-instagram text-xl"></i> __timurlaut
                                    </a>
                                </li>
                                <li className="flex items-center gap-2">
                                    <a href="https://www.facebook.com/share/1R9hRtCYSd/" target="_blank" rel="noopener noreferrer" className="hover:text-yellow-300 transition-colors">
                                        <i className="fab fa-facebook text-xl"></i> Urip Yoga
                                    </a>
                                </li>
                                <li className="flex-items-center gap-2" > 
                                    <a href="#" target="_blank" rel="noopener noreferrer" className="hover:text-yellow-300 transition-colors">
                                        <i className="fab fa-tiktok text-xl"></i> pangestuuu
                                    </a>
                                </li>
                            </ul>
                        </div>

                        {/* Column 4: Contact */}
                        <div>
                            <h2 className="text-lg font-semibold mb-3">Contact</h2>
                            <ul className="space-y-2">
                                <li className="flex items-center gap-2">
                                    <a href="https://wa.me/6285861466287" target="_blank" rel="noopener noreferrer"
                                        className="hover:text-yellow-300 transition-colors">
                                        <i className="fab fa-whatsapp text-xl"></i> +62-85861466287
                                    </a>
                                </li>
                                <li className="flex items-center gap-2">
                                    <a href="mailto:2211103102@ittelkom-pwt.ac.id"
                                        className="hover:text-yellow-300 transition-colors">
                                        <i className="fas fa-envelope text-lg"></i> 2211103102@ittelkom-pwt.ac.id
                                    </a>
                                </li>
                                <li className="flex items-center gap-2">
                                    <a href="https://www.linkedin.com/me?trk=p_mwlite_feed-secondary_nav" target="_blank" rel="noopener noreferrer"
                                        className="hover:text-yellow-300 transition-colors">
                                        <i className="fab fa-linkedin text-xl"></i> Urip Yoga Pangestu
                                    </a>
                                </li>
                            </ul>
                        </div>

                        {/* Column 5: Additional */}
                        <div>
                            <h2 className="text-lg font-semibold mb-3">Let's Collaborate</h2>
                            <p className="text-sm">and bring extraordinary ideas to life together</p>
                        </div>
                    </div>
                </div>
            </footer>

            {/* Footer Bottom */}
            <div className="h-auto flex flex-col items-center justify-center bg-[#FFC700] text-black py-3">
                <p className="text-sm font-semibold mb-2">
                    {new Date().getFullYear()} &copy; @timurlauttt
                </p>
                <VisitorCounter className="text-black text-xs" />
            </div>
        </>
    );
}
    
export default Footer;
