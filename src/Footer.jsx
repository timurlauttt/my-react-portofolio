function Footer() {
    return (
        <>
            <footer className="footer hidden sm:block bg-[#74247A] text-white py-8 px-10 md:px-40">
                <div className="container mx-auto grid grid-cols-1 md:grid-cols-5 gap-6 text-center md:text-left">

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
                            <li><a href="#" className="hover:underline">Home</a></li>
                            <li><a href="#" className="hover:underline">About Me</a></li>
                            <li><a href="#" className="hover:underline">Portfolio</a></li>
                            <li><a href="#" className="hover:underline">Activities</a></li>
                            <li><a href="#" className="hover:underline">Contact</a></li>
                        </ul>
                    </div>

                    {/* Column 3: Social Media */}
                    <div>
                        <h2 className="text-lg font-semibold mb-3">Social Media</h2>
                        <ul className="space-y-2">
                            <li className="flex items-center gap-2">
                                <i className="fab fa-instagram text-xl"></i> __timurlaut
                            </li>
                            <li className="flex items-center gap-2">
                                <i className="fab fa-facebook text-xl"></i> Urip Yoga
                            </li>
                        </ul>
                    </div>

                    {/* Column 4: Contact */}
                    <div>
                        <h2 className="text-lg font-semibold mb-3">Contact</h2>
                        <ul className="space-y-2">
                            <li className="flex items-center gap-2">
                                <a href="https://wa.me/6285861466287" target="_blank" rel="noopener noreferrer">
                                    <i className="fab fa-whatsapp text-xl"></i> +62-85861466287
                                </a>
                            </li>
                            <li className="flex items-center gap-2">
                                <a href="mailto:2211103102@ittelkom-pwt.ac.id">
                                    <i className="fas fa-envelope text-xl"></i> 2211103102@ittelkom-pwt.ac.id
                                </a>
                            </li>
                            <li className="flex items-center gap-2">
                                <a href="https://www.linkedin.com/me?trk=p_mwlite_feed-secondary_nav" target="_blank" rel="noopener noreferrer">
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
            </footer>

            {/* Footer Bottom */}
            <div className="h-14 flex flex-col items-center justify-center bg-[#FFC700] text-black">
                <p className="text-sm font-semibold">
                    {new Date().getFullYear()} &copy; @timurlauttt
                </p>
            </div>
        </>
    );
}

export default Footer;
