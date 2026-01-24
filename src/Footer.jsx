import VisitorCounter from './components/VisitorCounter';
import { Link, useLocation } from "react-router-dom";
import { FaInstagram, FaFacebook, FaTiktok, FaWhatsapp, FaLinkedin, FaEnvelope } from "react-icons/fa";

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
                                    <a href="mailto:2211103102@ittelkom-pwt.ac.id"
                                        className="flex items-center gap-2 text-sm hover:text-yellow-300 transition-colors">
                                        <FaEnvelope className="text-lg" />
                                        <span className="break-all">2211103102@ittelkom-pwt.ac.id</span>
                                    </a>
                                </div>
                                <div>
                                    <a href="https://www.linkedin.com/in/urip-yoga-pangestu-65a541231/" target="_blank" rel="noopener noreferrer"
                                        className="flex items-center gap-2 text-sm hover:text-yellow-300 transition-colors">
                                        <FaLinkedin className="text-lg" />
                                        <span>Urip Yoga Pangestu</span>
                                    </a>
                                </div>
                                <div>
                                    <a href="wa.me/6285861466287" target="_blank" rel="noopener noreferrer"
                                        className="flex items-center gap-2 text-sm hover:text-yellow-300 transition-colors">
                                        <FaWhatsapp className="text-lg" />
                                        <span>+6285861466287</span>
                                    </a>
                                </div>
                            </div>
                        </div>

                        {/* Mobile: Navigation */}
                        <div>
                            <h2 className="text-lg font-semibold mb-3 text-left">Navigation</h2>
                            <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm">
                                <a href="/" className="hover:text-yellow-300 transition-colors">Home</a>
                                <a href="/portfolio" className="hover:text-yellow-300 transition-colors">Portfolio</a>
                                <a href="/skills" className="hover:text-yellow-300 transition-colors">Skills</a>
                                <a href="/activities" className="hover:text-yellow-300 transition-colors">Activities</a>
                                <a href="/contact" className="hover:text-yellow-300 transition-colors">Contact</a>
                                <a href="/about" className="hover:text-yellow-300 transition-colors">About</a>
                            </div>
                        </div>

                        {/* Mobile: Social Media */}
                        <div>
                            <h2 className="text-lg font-semibold mb-3 text-left">Social Media</h2>
                            <div className="flex gap-6 text-sm">
                                <div className="flex items-center gap-2">
                                    <a href="https://www.instagram.com/__timurlaut?igsh=MTE5ejg1bG81YmVwcQ==" target="_blank" rel="noopener noreferrer" className="hover:text-yellow-300 transition-colors">
                                        <FaInstagram className="text-lg" />
                                        <span>__timurlaut</span>
                                    </a>
                                </div>
                                <div className="flex items-center gap-2">
                                    <a href="https://www.facebook.com/share/1R9hRtCYSd/" target="_blank" rel="noopener noreferrer" className="hover:text-yellow-300 transition-colors">
                                        <FaFacebook className="text-lg" />
                                        <span>Urip Yoga</span>
                                    </a>
                                </div>
                                <div className="flex items-center gap-2">
                                    <a href="https://www.tiktok.com/@pangestuurip?_t=ZS-8ykixitNw0r&_r=1" target="_blank" rel="noopener noreferrer" className="hover:text-yellow-300 transition-colors">
                                        <FaTiktok className="text-lg" />
                                        <span>pangestuurip</span>
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
                                <li><a href="/" className="hover:text-yellow-300 transition-colors">Home</a></li>
                                <li><a href="/portfolio" className="hover:text-yellow-300 transition-colors">Portfolio</a></li>
                                <li><a href="/skills" className="hover:text-yellow-300 transition-colors">Skills</a></li>
                                <li><a href="/activities" className="hover:text-yellow-300 transition-colors">Activities</a></li>
                                <li><a href="/contact" className="hover:text-yellow-300 transition-colors">Contact</a></li>
                                <li><a href="/about" className="hover:text-yellow-300 transition-colors">About Me</a></li>
                            </ul>
                        </div>

                        {/* Column 3: Social Media */}
                        <div>
                            <h2 className="text-lg font-semibold mb-3">Social Media</h2>
                            <ul className="space-y-2">
                                <li className="flex items-center gap-2">
                                    <a href="https://www.instagram.com/__timurlaut?igsh=MTE5ejg1bG81YmVwcQ==" target="_blank" rel="noopener noreferrer" className="hover:text-yellow-300 transition-colors">
                                        <FaInstagram className="text-xl" /> __timurlaut
                                    </a>
                                </li>
                                <li className="flex items-center gap-2">
                                    <a href="https://www.facebook.com/share/1R9hRtCYSd/" target="_blank" rel="noopener noreferrer" className="hover:text-yellow-300 transition-colors">
                                        <FaFacebook className="text-xl" /> Urip Yoga
                                    </a>
                                </li>
                                <li className="flex items-center gap-2" >
                                    <a href="https://www.tiktok.com/@pangestuurip?_t=ZS-8ykixitNw0r&_r=1" target="_blank" rel="noopener noreferrer" className="hover:text-yellow-300 transition-colors">
                                        <FaTiktok className="text-xl" /> pangestuurip
                                    </a>
                                </li>
                            </ul>
                        </div>

                        {/* Column 4: Contact */}
                        <div>
                            <h2 className="text-lg font-semibold mb-3">Contact</h2>
                            <ul className="space-y-2">
                                <li className="flex items-center gap-2">
                                    <a href="mailto:2211103102@ittelkom-pwt.ac.id"
                                        className="hover:text-yellow-300 transition-colors">
                                        <FaEnvelope className="text-lg" /> 2211103102@ittelkom-pwt.ac.id
                                    </a>
                                </li>
                                <li className="flex items-center gap-2">
                                    <a href="https://www.linkedin.com/in/urip-yoga-pangestu-65a541231/" target="_blank" rel="noopener noreferrer"
                                        className="hover:text-yellow-300 transition-colors">
                                        <FaLinkedin className="text-xl" /> Urip Yoga Pangestu
                                    </a>
                                </li>
                                <li className="flex items-center gap-2">
                                    <a href="wa.me/6285861466287" target="_blank" rel="noopener noreferrer"
                                        className="hover:text-yellow-300 transition-colors">
                                        <FaWhatsapp className="text-xl" /> +6285861466287
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
