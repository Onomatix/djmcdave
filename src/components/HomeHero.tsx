import { ChevronDown, PlayCircle, Calendar, Music } from 'lucide-react';

const HomeHero = () => {
  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };
  const baseUrl = import.meta.env.BASE_URL;

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden" id="home">
      {/* Background Gradient */}
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-dj-dark to-dj-dark/80"></div>

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
        
        {/* CTA Buttons */}
        {/* <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 animate-fade-in" style={{ animationDelay: '400ms' }}>
          <button 
            onClick={() => scrollToSection('music')} 
            className="w-full sm:w-auto accent-btn"
          >
            <Music className="mr-2" size={18} />
            Listen Now
          </button>
          <button 
            onClick={() => scrollToSection('videos')} 
            className="w-full sm:w-auto accent-btn-outline"
          >
            <PlayCircle className="mr-2" size={18} />
            Watch Videos
          </button>
          <button 
            onClick={() => scrollToSection('events')} 
            className="w-full sm:w-auto accent-btn-outline"
          >
            <Calendar className="mr-2" size={18} />
            Events
          </button>
        </div> */}
      </div>

      {/* Scroll Indicator */}
      <div className="scroll-indicator animate-fade-in hidden sm:flex" style={{ animationDelay: '600ms' }}>
        <div className="mouse">
          <div className="mouse-wheel"></div>
        </div>
        <p className="scroll-text">Scroll Down</p>
      </div>
    </section>
  );
};

export default HomeHero;
