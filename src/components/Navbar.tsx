import { useState, useEffect } from 'react';
import { Menu, X, Instagram, Youtube, Facebook, Music } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const baseUrl = import.meta.env.BASE_URL;

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const scrollToSection = (sectionId: string) => {
    if (window.location.pathname === '/') {
      const section = document.getElementById(sectionId);
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-dj-dark/90 backdrop-blur-md py-2 sm:py-3 shadow-lg' : 'py-3 sm:py-6 bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Link to="/" className="flex items-center">
          <img
            src={`${baseUrl}logo.png`}
            alt="DJMC Dave Logo"
            className="h-6 sm:h-8 md:h-10 w-auto object-contain"
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-4 lg:space-x-8">
          <Link to="/" className={`nav-link ${location.pathname === '/' ? 'text-dj-pink' : ''}`}>Home</Link>
          <Link to="/music" className={`nav-link ${location.pathname === '/music' ? 'text-dj-pink' : ''}`}>Music</Link>
          <Link to="/videos" className={`nav-link ${location.pathname === '/videos' ? 'text-dj-pink' : ''}`}>Videos</Link>
          <Link to="/gallery" className={`nav-link ${location.pathname === '/gallery' ? 'text-dj-pink' : ''}`}>Gallery</Link>
          <Link to="/about" className={`nav-link ${location.pathname === '/about' ? 'text-dj-pink' : ''}`}>About</Link>
          <Link to="/academy" className={`nav-link ${location.pathname === '/academy' ? 'text-dj-pink' : ''}`}>DJ Academy</Link>
          <Link to="/events" className={`nav-link ${location.pathname === '/events' ? 'text-dj-pink' : ''}`}>Events</Link>
          <Link to="/contact" className={`nav-link ${location.pathname === '/contact' ? 'text-dj-pink' : ''}`}>Contact</Link>
        </nav>

        {/* Social Icons - Desktop */}
        <div className="hidden md:flex items-center space-x-2 lg:space-x-4">
          <a
            href="https://www.instagram.com/djmcdave?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/70 hover:text-dj-pink transition-colors"
          >
            <Instagram size={18} />
          </a>
          <a
            href="https://www.youtube.com/@mcdavedj"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/70 hover:text-dj-purple transition-colors"
          >
            <Youtube size={18} />
          </a>
          <a
            href="https://www.facebook.com/soundkontrolsdjacademy?mibextid=ZbWKwL"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/70 hover:text-dj-blue transition-colors"
          >
            <Facebook size={18} />
          </a>
          <a
            href="https://www.mixcloud.com/soundkontrols/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/70 hover:text-dj-purple transition-colors"
          >
            <Music size={18} />
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden text-white p-1" onClick={toggleMobileMenu} aria-label="Toggle menu">
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="absolute top-full left-0 right-0 bg-dj-dark/95 backdrop-blur-md py-4 md:hidden">
            <nav className="flex flex-col space-y-4 px-4">
              <Link to="/" className={`nav-link ${location.pathname === '/' ? 'text-dj-pink' : ''}`}>Home</Link>
              <Link to="/music" className={`nav-link ${location.pathname === '/music' ? 'text-dj-pink' : ''}`}>Music</Link>
              <Link to="/videos" className={`nav-link ${location.pathname === '/videos' ? 'text-dj-pink' : ''}`}>Videos</Link>
              <Link to="/gallery" className={`nav-link ${location.pathname === '/gallery' ? 'text-dj-pink' : ''}`}>Gallery</Link>
              <Link to="/about" className={`nav-link ${location.pathname === '/about' ? 'text-dj-pink' : ''}`}>About</Link>
              <Link to="/academy" className={`nav-link ${location.pathname === '/academy' ? 'text-dj-pink' : ''}`}>DJ Academy</Link>
              <Link to="/events" className={`nav-link ${location.pathname === '/events' ? 'text-dj-pink' : ''}`}>Events</Link>
              <Link to="/contact" className={`nav-link ${location.pathname === '/contact' ? 'text-dj-pink' : ''}`}>Contact</Link>
            </nav>

            {/* Social Icons - Mobile */}
            <div className="flex items-center justify-center space-x-6 pt-4 border-t border-white/10">
              <a
                href="https://www.instagram.com/djmcdave?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/70 hover:text-dj-pink transition-colors"
              >
                <Instagram size={20} />
              </a>
              <a
                href="https://www.youtube.com/@mcdavedj"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/70 hover:text-dj-purple transition-colors"
              >
                <Youtube size={20} />
              </a>
              <a
                href="https://www.facebook.com/soundkontrolsdjacademy?mibextid=ZbWKwL"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/70 hover:text-dj-blue transition-colors"
              >
                <Facebook size={20} />
              </a>
              <a
                href="https://www.mixcloud.com/soundkontrols/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/70 hover:text-dj-purple transition-colors"
              >
                <Music size={20} />
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;