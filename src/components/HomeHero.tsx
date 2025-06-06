import { ChevronDown, PlayCircle, Calendar, Music } from 'lucide-react';
import heroImage from '../assets/hero/hero.webp';
import mobileHeroImage from '../assets/hero/hero_mobile.webp';
import { useState, useEffect } from 'react';

const HomeHero = () => {
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    // Set initial value
    handleResize();

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };
  const baseUrl = import.meta.env.BASE_URL;

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden" id="home">
      {/* Background Image */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{ 
          backgroundImage: `url(${isMobile ? mobileHeroImage : heroImage})`,
          width: '100%',
          height: '100%'
        }}
      />

      {/* Background Gradient Overlay */}
      <div className="absolute inset-0 z-1 bg-gradient-to-b from-dj-dark/30 to-dj-dark/20" />

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10 text-center">
        <div className="mb-8 flex justify-center animate-fade-in">
          <img 
            src={`${baseUrl}logo.png`}
            alt="DJMC Dave Logo" 
            className="w-3/4 max-w-md md:max-w-lg lg:max-w-xl object-contain"
          />
        </div>
        
        <p className="text-lg sm:text-xl md:text-2xl text-white/80 mb-6 sm:mb-10 max-w-3xl mx-auto animate-fade-in" style={{ animationDelay: '200ms' }}>
          Professional DJ, Producer & Founder of SoundKontrols DJ Academy
        </p>
      </div>

      {/* Scroll Indicator */}
      <div className="scroll-indicator animate-fade-in hidden sm:flex" style={{ animationDelay: '600ms' }}>
        <div className="mouse">
          <div className="mouse-wheel" />
        </div>
        <p className="scroll-text">Scroll Down</p>
      </div>
    </section>
  );
};

export default HomeHero;
