import VisitorCounter from "./components/VisitorCounter";
import { useLanguage } from "./contexts/LanguageContext";
import {
  FaInstagram,
  FaFacebook,
  FaTiktok,
  FaWhatsapp,
  FaLinkedin,
  FaEnvelope,
} from "react-icons/fa";

function Footer() {
  const { t } = useLanguage();

  return (
    <>
      <footer className="footer bg-slate-950 text-slate-100 border-t border-slate-200 dark:border-slate-800 py-8 px-4 sm:py-10 sm:px-10 md:px-40">
        <div className="container mx-auto">
          {/* Mobile Layout: Stack vertically */}
          <div className="block sm:hidden space-y-6">
            {/* Mobile: Name Section */}
            <div className="text-left">
              <p className="text-xl font-bold leading-tight text-slate-100">
                Urip Yoga Pangestu
              </p>
            </div>

            {/* Mobile: Contact Info */}
            <div>
              <h3 className="text-lg font-bold mb-3 text-left text-slate-100">
                {t("contact")}
              </h3>
              <div className="space-y-3">
                <div>
                  <a
                    href="mailto:hello@pangestudev.web.id"
                    className="flex items-center gap-2 text-sm text-slate-300 hover:text-[#38BDF8] transition-colors"
                  >
                    <FaEnvelope className="text-lg text-[#38BDF8]" />
                    <span className="break-all">
                      2211103102@ittelkom-pwt.ac.id
                    </span>
                  </a>
                </div>
                <div>
                  <a
                    href="https://www.linkedin.com/in/urip-yoga-pangestu-65a541231/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm text-slate-300 hover:text-[#38BDF8] transition-colors"
                  >
                    <FaLinkedin className="text-lg text-[#38BDF8]" />
                    <span>Urip Yoga Pangestu</span>
                  </a>
                </div>
                <div>
                  <a
                    href="https://wa.me/6285861466287"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm text-slate-300 hover:text-[#38BDF8] transition-colors"
                  >
                    <FaWhatsapp className="text-lg text-[#38BDF8]" />
                    <span>+6285861466287</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Mobile: Navigation */}
            <div>
              <h3 className="text-lg font-bold mb-3 text-left text-slate-100">
                {t("navigation")}
              </h3>
              <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm">
                <a
                  href="#home"
                  className="text-slate-300 hover:text-[#38BDF8] transition-colors"
                >
                  {t("home")}
                </a>
                <a
                  href="#portfolio"
                  className="text-slate-300 hover:text-[#38BDF8] transition-colors"
                >
                  {t("portfolio")}
                </a>
                <a
                  href="#skills"
                  className="text-slate-300 hover:text-[#38BDF8] transition-colors"
                >
                  {t("skills")}
                </a>
                <a
                  href="#activities"
                  className="text-slate-300 hover:text-[#38BDF8] transition-colors"
                >
                  {t("activities")}
                </a>
                <a
                  href="#contact"
                  className="text-slate-300 hover:text-[#38BDF8] transition-colors"
                >
                  {t("contact")}
                </a>
                <a
                  href="#about"
                  className="text-slate-300 hover:text-[#38BDF8] transition-colors"
                >
                  {t("about")}
                </a>
              </div>
            </div>

            {/* Mobile: Social Media */}
            <div>
              <h3 className="text-lg font-bold mb-3 text-left text-slate-100">
                {t("social")}
              </h3>
              <div className="flex gap-6 text-sm">
                <div className="flex items-center gap-2">
                  <a
                    href="https://www.instagram.com/__timurlaut?igsh=MTE5ejg1bG81YmVwcQ=="
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-300 hover:text-[#38BDF8] transition-colors"
                  >
                    <FaInstagram className="text-lg" />
                    <span>__timurlaut</span>
                  </a>
                </div>
                <div>
                  <a
                    href="https://www.facebook.com/share/1R9hRtCYSd/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-300 hover:text-[#38BDF8] transition-colors"
                  >
                    <FaFacebook className="text-lg" />
                    <span>Urip Yoga</span>
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <a
                    href="https://www.tiktok.com/@pangestuurip?_t=ZS-8ykixitNw0r&_r=1"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-300 hover:text-[#38BDF8] transition-colors"
                  >
                    <FaTiktok className="text-lg" />
                    <span>pangestuurip</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Mobile: Collaboration */}
            <div className="text-left">
              <h3 className="text-lg font-bold mb-2 text-slate-100">
                {t("collaborate")}
              </h3>
              <p className="text-sm text-slate-400">{t("collaborateDesc")}</p>
            </div>
          </div>

          {/* Desktop Layout */}
          <div className="hidden sm:grid grid-cols-1 md:grid-cols-5 gap-6 text-center md:text-left">
            {/* Column 1: Name */}
            <div>
              <p className="text-2xl font-bold leading-tight text-slate-100">
                Urip <br /> Yoga <br /> Pangestu
              </p>
            </div>

            {/* Column 2: Navigation Links */}
            <div>
              <h3 className="text-lg font-bold mb-3 text-slate-100">
                {t("navigationLinks")}
              </h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#home"
                    className="text-slate-300 hover:text-[#38BDF8] transition-colors"
                  >
                    {t("home")}
                  </a>
                </li>
                <li>
                  <a
                    href="#portfolio"
                    className="text-slate-300 hover:text-[#38BDF8] transition-colors"
                  >
                    {t("portfolio")}
                  </a>
                </li>
                <li>
                  <a
                    href="#skills"
                    className="text-slate-300 hover:text-[#38BDF8] transition-colors"
                  >
                    {t("skills")}
                  </a>
                </li>
                <li>
                  <a
                    href="#activities"
                    className="text-slate-300 hover:text-[#38BDF8] transition-colors"
                  >
                    {t("activities")}
                  </a>
                </li>
                <li>
                  <a
                    href="#contact"
                    className="text-slate-300 hover:text-[#38BDF8] transition-colors"
                  >
                    {t("contact")}
                  </a>
                </li>
                <li>
                  <a
                    href="#about"
                    className="text-slate-300 hover:text-[#38BDF8] transition-colors"
                  >
                    {t("aboutMe")}
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 3: Social Media */}
            <div>
              <h3 className="text-lg font-bold mb-3 text-slate-100">
                {t("social")}
              </h3>
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <a
                    href="https://www.instagram.com/__timurlaut?igsh=MTE5ejg1bG81YmVwcQ=="
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-300 hover:text-[#38BDF8] transition-colors"
                  >
                    <FaInstagram className="text-xl text-[#38BDF8]" />{" "}
                    __timurlaut
                  </a>
                </li>
                <li className="flex items-center gap-2">
                  <a
                    href="https://www.facebook.com/share/1R9hRtCYSd/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-300 hover:text-[#38BDF8] transition-colors"
                  >
                    <FaFacebook className="text-xl text-[#38BDF8]" /> Urip Yoga
                  </a>
                </li>
                <li className="flex items-center gap-2">
                  <a
                    href="https://www.tiktok.com/@pangestuurip?_t=ZS-8ykixitNw0r&_r=1"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-300 hover:text-[#38BDF8] transition-colors"
                  >
                    <FaTiktok className="text-xl text-[#38BDF8]" /> pangestuurip
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 4: Contact */}
            <div>
              <h3 className="text-lg font-bold mb-3 text-slate-100">
                {t("contact")}
              </h3>
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <a
                    href="mailto:2211103102@ittelkom-pwt.ac.id"
                    className="text-slate-300 hover:text-[#38BDF8] transition-colors"
                  >
                    <FaEnvelope className="text-lg text-[#38BDF8]" />{" "}
                    2211103102@ittelkom-pwt.ac.id
                  </a>
                </li>
                <li className="flex items-center gap-2">
                  <a
                    href="https://www.linkedin.com/in/urip-yoga-pangestu-65a541231/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-300 hover:text-[#38BDF8] transition-colors"
                  >
                    <FaLinkedin className="text-xl text-[#38BDF8]" /> Urip Yoga
                    Pangestu
                  </a>
                </li>
                <li className="flex items-center gap-2">
                  <a
                    href="https://wa.me/6285861466287"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-300 hover:text-[#38BDF8] transition-colors"
                  >
                    <FaWhatsapp className="text-xl text-[#38BDF8]" />{" "}
                    +6285861466287
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 5: Collaboration */}
            <div>
              <h3 className="text-lg font-bold mb-3 text-slate-100">
                {t("collaborate")}
              </h3>
              <p className="text-sm text-slate-400">{t("collaborateDesc")}</p>
            </div>
          </div>
        </div>
      </footer>

      {/* Footer Bottom */}
      <div className="h-auto flex flex-col items-center justify-center bg-white dark:bg-slate-900 text-black dark:text-slate-100 border-t border-slate-200 dark:border-slate-800 py-4">
        <p className="text-sm font-bold mb-2">
          {new Date().getFullYear()} &copy; @timurlauttt
        </p>
        <VisitorCounter className="text-slate-700 dark:text-slate-300 text-xs" />
      </div>
    </>
  );
}

export default Footer;
