import MixmotionSection from "../components/MixmotionSection";
import ScrollToTop from "../components/ScrollToTop";
import { useEffect } from "react";

const MusicPage = () => {
  // Gentle scroll protection - avoid interfering with player controls
  useEffect(() => {
    // Initial scroll setup
    const setupScroll = () => {
      document.body.style.overflow = 'auto';
      document.documentElement.style.overflow = 'auto';
      document.body.style.position = 'static';
      document.documentElement.style.position = 'static';
    };

    setupScroll();

    // Very gentle monitoring - less frequent to avoid interference
    const scrollMonitor = setInterval(() => {
      // Only restore scroll if it's been completely blocked globally
      if (document.body.style.overflow === 'hidden' && 
          !document.body.classList.contains('mixmotion-player-active')) {
        setupScroll();
      }
    }, 5000); // Much less frequent

    // Cleanup
    return () => {
      clearInterval(scrollMonitor);
    };
  }, []);

  return (
    <>
      <style>{`
        /* Music page scroll protection */
        .music-page-wrapper {
          min-height: 100vh;
          overflow-y: auto !important;
          overflow-x: hidden;
          position: relative;
        }
        
        /* Allow MixmotionPlayer full interactivity */
        .music-page-wrapper .mixmotion-player,
        .music-page-wrapper .mixmotion-container,
        .music-page-wrapper iframe,
        .music-page-wrapper button,
        .music-page-wrapper [role="button"] {
          pointer-events: auto !important;
          position: relative !important;
        }
        
        /* Ensure content flows naturally */
        .music-page-content {
          position: relative;
          z-index: 1;
        }
      `}</style>
      
      <div className="music-page-wrapper">
        <div className="min-h-screen pt-20 bg-dj-dark music-page-content">
          <ScrollToTop />
          
          <section className="content-section">
            <h1 className="section-title text-center mb-2">My Music Collection</h1>
            <p className="section-subtitle mb-8">
              Explore my latest mixes and productions across various genres
            </p>
            
            <div className="mixmotion-player-container">
              <MixmotionSection 
                url="https://www.mixcloud.com/soundkontrols/"
                autoPlay={false}
              />
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default MusicPage;

