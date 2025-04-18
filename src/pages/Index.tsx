
import HomeHero from '../components/HomeHero';
import MusicSection from '../components/MusicSection';
import VideoSection from '../components/VideoSection';
import GallerySection from '../components/GallerySection';
import AboutSection from '../components/AboutSection';
import AcademySection from '../components/AcademySection';
import EventsSection from '../components/EventsSection';
import ContactSection from '../components/ContactSection';
import ScrollToTop from '../components/ScrollToTop';
import { useEffect } from 'react';

const Index = () => {
  useEffect(() => {
    // Set document title for the home page
    document.title = "DJ MC Dave | Professional DJ & Producer";
  }, []);

  return (
    <div className="min-h-screen bg-dj-dark">
      <HomeHero />
      <MusicSection />
      <VideoSection />
      <GallerySection />
      <AboutSection />
      <AcademySection />
      <EventsSection />
      <ContactSection />
      <ScrollToTop />
    </div>
  );
};

export default Index;
