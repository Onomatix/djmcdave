import { Mail, Phone, MapPin, Instagram, Youtube, Facebook } from 'lucide-react';
import { Link } from 'react-router-dom';
import logo from '../logo.png';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-dj-dark pt-12 pb-6 border-t border-white/10">
      <div className="container mx-auto px-4 md:px-6">
        {/* Top grid: 4 equally spaced & vertically centered columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 items-center text-white">
          
          {/* Column 1: Logo */}
          <div className="flex justify-center sm:justify-start">
            <img
              src={logo}
              alt="DJMC DAVE Logo"
              className="w-[170px] h-[170px] object-contain"
            />
          </div>

          {/* Column 2: Description */}
          <div className="text-sm text-white/70 text-center sm:text-left flex items-center justify-center h-full">
            <p>
              Professional DJ, Remix Producer, Emcee, and founder of SoundKontrols DJ Academy with over 30 years of experience.
            </p>
          </div>

          {/* Column 3: Contact Info */}
          <div className="text-sm text-white/70 space-y-2 text-center sm:text-left flex flex-col justify-center h-full">
            <div className="flex items-center justify-center sm:justify-start gap-2">
              <Mail size={16} />
              <span>dave.ramana@soundkontrols.com</span>
            </div>
            <div className="flex items-center justify-center sm:justify-start gap-2">
              <Mail size={16} />
              <span>info@soundkontrols.com</span>
            </div>
            <div className="flex items-center justify-center sm:justify-start gap-2">
              <Phone size={16} />
              <span>+60162169474</span>
            </div>
            <div className="flex items-start justify-center sm:justify-start gap-2">
              <MapPin size={16} className="mt-1" />
              <span>SK Events, 27 Jalan 14/57, Petaling Jaya, Selangor</span>
            </div>
          </div>

          {/* Column 4: Social Media Icons */}
          <div className="flex justify-center sm:justify-start items-center space-x-5 mt-2 lg:mt-0">
            <a href="https://www.instagram.com/djmcdave?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" target="_blank" rel="noopener noreferrer">
              <Instagram size={24} className="hover:text-dj-purple transition-colors" />
            </a>
            <a href="https://www.youtube.com/@mcdavedj" target="_blank" rel="noopener noreferrer">
              <Youtube size={24} className="hover:text-dj-purple transition-colors" />
            </a>
            <a href="https://www.facebook.com/soundkontrolsdjacademy" target="_blank" rel="noopener noreferrer">
              <Facebook size={24} className="hover:text-dj-purple transition-colors" />
            </a>
            <a href="https://www.tiktok.com/@soundkontrols_djacademy" target="_blank" rel="noopener noreferrer">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 448 512"
                fill="currentColor"
                className="hover:text-dj-purple transition-colors"
              >
                <path d="M448 209.9a210.1 210.1 0 0 1 -122.8-39.3v178.8A162.6 162.6 0 1 1 185 188.3v89.9a74.6 74.6 0 1 0 52.2 71.2V0h88a121.2 121.2 0 0 0 1.9 22.2 121.4 121.4 0 0 0 66.6 93.9A121.5 121.5 0 0 0 448 209.9z" />
              </svg>
            </a>
          </div>
        </div>

        {/* Bottom line */}
        <div className="mt-10 border-t border-white/10 pt-4 text-center text-white/50 text-sm">
          © {currentYear} DJMC DAVE. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
