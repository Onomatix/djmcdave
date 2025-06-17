import React, { useState, useEffect } from 'react';
import { MixmotionPlayer, useStore } from 'mixmotion-player';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShare } from '@fortawesome/free-solid-svg-icons';
import { Music } from 'lucide-react';

const SpiralOverlay = ({ isPlaying }: { isPlaying: boolean }) => {
  const [effectMode, setEffectMode] = useState(0);
  const [colorPhase, setColorPhase] = useState(0);
  
  // Cycle through different effect modes every 8 seconds when playing
  useEffect(() => {
    if (!isPlaying) return;
    
    const effectTimer = setInterval(() => {
      setEffectMode(prev => (prev + 1) % 6); // Back to 6 modes, spotlights separate
    }, 8000);

    return () => clearInterval(effectTimer);
  }, [isPlaying]);

  // Continuous color cycling
  useEffect(() => {
    if (!isPlaying) return;
    
    const colorTimer = setInterval(() => {
      setColorPhase(prev => (prev + 1) % 360);
    }, 100);

    return () => clearInterval(colorTimer);
  }, [isPlaying]);

  return (
    <div className="absolute top-16 md:top-0 left-0 right-0 bottom-0 z-[2] flex items-center justify-center pointer-events-none">
      <div
        className={`lollipop-spiral ${isPlaying ? 'music-playing' : 'music-stopped'}`}
        data-effect-mode={effectMode}
        style={{
          '--color-phase': `${colorPhase}deg`,
          '--effect-mode': effectMode
        } as React.CSSProperties}
      >
        {/* Main spiral layers */}
        <div className="spiral-layer spiral-1"></div>
        <div className="spiral-layer spiral-2"></div>
        <div className="spiral-layer spiral-3"></div>
        <div className="spiral-layer spiral-4"></div>
        <div className="spiral-layer spiral-5"></div>
        
        {/* Effect layers (no more spotlights here) */}
        <div className="effect-layer effect-particles"></div>
        <div className="effect-layer effect-ripples"></div>
        <div className="effect-layer effect-kaleidoscope"></div>
        <div className="effect-layer effect-fractals"></div>
      </div>
    </div>
  );
};

const SpotlightCanvas = ({ isPlaying }: { isPlaying: boolean }) => {
  const [spotlightMode, setSpotlightMode] = useState(0);
  
  // Cycle spotlight patterns every 6 seconds when playing
  useEffect(() => {
    if (!isPlaying) return;
    
    const spotlightTimer = setInterval(() => {
      setSpotlightMode(prev => (prev + 1) % 4); // 4 different spotlight patterns
    }, 6000);

    return () => clearInterval(spotlightTimer);
  }, [isPlaying]);

  return (
    <div className="absolute inset-0 z-[1] pointer-events-none">
      <div
        className={`spotlight-canvas ${isPlaying ? 'spotlight-active' : 'spotlight-inactive'}`}
        data-spotlight-mode={spotlightMode}
      >
        <div className="spotlight-layer spotlight-beams"></div>
        <div className="spotlight-layer spotlight-sweep"></div>
        <div className="spotlight-layer spotlight-atmosphere"></div>
      </div>
    </div>
  );
};

const MixmotionSection = () => {
  const url = 'https://www.mixcloud.com/DJ_Lollipop/';
  const isPlaying = useStore((state) => state.playing);

  return (
    <>
      <style>{`
        .lollipop-spiral {
          width: 120%;
          max-width: 600px;
          aspect-ratio: 1;
          position: relative;
          transition: all 0.5s ease-in-out;
        }

        .spiral-layer, .effect-layer {
          position: absolute;
          inset: 0;
          border-radius: 50%;
          transition: all 1s ease-in-out;
        }

        /* Base spiral patterns with simpler colors that cycle */
        .spiral-1 {
          background: conic-gradient(
            from calc(var(--color-phase, 0deg) * 1),
            #8CC63F 0deg 60deg,
            #00E5E5 60deg 120deg,
            #9D1BBA 120deg 180deg,
            #F6D842 180deg 240deg,
            #E94D5F 240deg 300deg,
            #D92525 300deg 360deg
          );
          opacity: 0.8;
          transform: scale(1);
          filter: hue-rotate(calc(var(--color-phase, 0deg)));
        }

        .spiral-2 {
          background: conic-gradient(
            from calc(var(--color-phase, 0deg) * 1.5 + 60deg),
            #D92525 0deg 60deg,
            #8CC63F 60deg 120deg,
            #00E5E5 120deg 180deg,
            #9D1BBA 180deg 240deg,
            #F6D842 240deg 300deg,
            #E94D5F 300deg 360deg
          );
          opacity: 0.6;
          transform: scale(0.8);
          filter: hue-rotate(calc(var(--color-phase, 0deg) + 60deg));
        }

        .spiral-3 {
          background: conic-gradient(
            from calc(var(--color-phase, 0deg) * 2 + 120deg),
            #E94D5F 0deg 60deg,
            #D92525 60deg 120deg,
            #8CC63F 120deg 180deg,
            #00E5E5 180deg 240deg,
            #9D1BBA 240deg 300deg,
            #F6D842 300deg 360deg
          );
          opacity: 0.5;
          transform: scale(0.6);
          filter: hue-rotate(calc(var(--color-phase, 0deg) + 120deg));
        }

        .spiral-4 {
          background: radial-gradient(
            circle at 50% 50%,
            #F6D842 0%,
            #E94D5F 30%,
            #D92525 60%,
            transparent 100%
          );
          opacity: 0.4;
          transform: scale(0.4);
          filter: hue-rotate(calc(var(--color-phase, 0deg) + 180deg));
        }

        .spiral-5 {
          background: conic-gradient(
            from calc(var(--color-phase, 0deg) * 3 + 240deg),
            #9D1BBA 0deg 60deg,
            #F6D842 60deg 120deg,
            #E94D5F 120deg 180deg,
            #D92525 180deg 240deg,
            #8CC63F 240deg 300deg,
            #00E5E5 300deg 360deg
          );
          opacity: 0.3;
          transform: scale(0.2);
          filter: hue-rotate(calc(var(--color-phase, 0deg) + 240deg));
        }

        /* Simplified Effect Layers */
        .effect-particles {
          background: 
            radial-gradient(circle at 20% 50%, #FF6B6B 3px, transparent 6px),
            radial-gradient(circle at 80% 30%, #4ECDC4 2px, transparent 5px),
            radial-gradient(circle at 40% 80%, #45B7D1 2px, transparent 5px),
            radial-gradient(circle at 60% 20%, #96CEB4 1px, transparent 4px),
            radial-gradient(circle at 30% 70%, #FFEAA7 2px, transparent 5px);
          background-size: 50px 50px;
          opacity: 0;
        }

        .effect-ripples {
          background: 
            radial-gradient(circle at 50% 50%, transparent 25%, #00E5E5 26%, #00E5E5 27%, transparent 28%),
            radial-gradient(circle at 50% 50%, transparent 45%, #9D1BBA 46%, #9D1BBA 47%, transparent 48%);
          opacity: 0;
        }

        .effect-kaleidoscope {
          background: conic-gradient(
            from 0deg,
            #FF6B6B 0deg 45deg,
            transparent 45deg 90deg,
            #4ECDC4 90deg 135deg,
            transparent 135deg 180deg,
            #45B7D1 180deg 225deg,
            transparent 225deg 270deg,
            #96CEB4 270deg 315deg,
            transparent 315deg 360deg
          );
          opacity: 0;
        }

        .effect-fractals {
          background: 
            radial-gradient(circle at 25% 25%, #FF6B6B 8%, transparent 15%),
            radial-gradient(circle at 75% 25%, #4ECDC4 8%, transparent 15%),
            radial-gradient(circle at 25% 75%, #45B7D1 8%, transparent 15%),
            radial-gradient(circle at 75% 75%, #96CEB4 8%, transparent 15%);
          opacity: 0;
        }

        /* Effect Mode Visibility - Make them much more visible */
        
        /* Mode 0: Classic Spiral Only */
        .lollipop-spiral[data-effect-mode="0"] .effect-particles { opacity: 0; }
        .lollipop-spiral[data-effect-mode="0"] .effect-ripples { opacity: 0; }
        .lollipop-spiral[data-effect-mode="0"] .effect-kaleidoscope { opacity: 0; }
        .lollipop-spiral[data-effect-mode="0"] .effect-fractals { opacity: 0; }

        /* Mode 1: Particle Storm */
        .lollipop-spiral[data-effect-mode="1"] .effect-particles { opacity: 0.9; }
        .lollipop-spiral[data-effect-mode="1"] .spiral-layer { opacity: 0.4; }

        /* Mode 2: Ripple Waves */
        .lollipop-spiral[data-effect-mode="2"] .effect-ripples { opacity: 1; }
        .lollipop-spiral[data-effect-mode="2"] .spiral-layer { transform: scale(1.2); opacity: 0.5; }

        /* Mode 3: Kaleidoscope */
        .lollipop-spiral[data-effect-mode="3"] .effect-kaleidoscope { opacity: 0.9; }
        .lollipop-spiral[data-effect-mode="3"] .spiral-layer { opacity: 0.3; }

        /* Mode 4: Fractal Explosion */
        .lollipop-spiral[data-effect-mode="4"] .effect-fractals { opacity: 1; }
        .lollipop-spiral[data-effect-mode="4"] .spiral-layer { transform: rotate(45deg); opacity: 0.4; }

        /* Mode 5: Everything Combined */
        .lollipop-spiral[data-effect-mode="5"] .effect-particles { opacity: 0.6; }
        .lollipop-spiral[data-effect-mode="5"] .effect-ripples { opacity: 0.5; }
        .lollipop-spiral[data-effect-mode="5"] .effect-kaleidoscope { opacity: 0.4; }
        .lollipop-spiral[data-effect-mode="5"] .effect-fractals { opacity: 0.7; }
        .lollipop-spiral[data-effect-mode="5"] .spiral-layer { opacity: 0.3; }

        /* Music Playing Effects */
        .music-playing {
          filter: blur(0px) brightness(1.2) saturate(1.4);
        }

        .music-playing .spiral-1 {
          animation: spin-1 15s linear infinite, pulse-1 3s ease-in-out infinite alternate;
        }

        .music-playing .spiral-2 {
          animation: spin-2 12s linear infinite reverse, pulse-2 2.5s ease-in-out infinite alternate;
        }

        .music-playing .spiral-3 {
          animation: spin-3 8s linear infinite, pulse-1 2s ease-in-out infinite alternate;
        }

        .music-playing .spiral-4 {
          animation: spin-4 10s linear infinite reverse, pulse-2 1.8s ease-in-out infinite alternate;
        }

        .music-playing .spiral-5 {
          animation: spin-5 6s linear infinite, pulse-1 1.5s ease-in-out infinite alternate;
        }

        .music-playing .effect-particles {
          animation: particle-float 4s ease-in-out infinite, twinkle 1s ease-in-out infinite alternate;
        }

        .music-playing .effect-ripples {
          animation: ripple-pulse 3s ease-in-out infinite;
        }

        .music-playing .effect-kaleidoscope {
          animation: kaleidoscope-spin 6s linear infinite;
        }

        .music-playing .effect-fractals {
          animation: fractal-zoom 8s ease-in-out infinite alternate, fractal-spin 4s linear infinite;
        }

        /* Music Stopped Effects */
        .music-stopped {
          filter: blur(1px) brightness(0.7) saturate(0.8);
          transform: scale(0.95);
        }

        .music-stopped .spiral-layer,
        .music-stopped .effect-layer {
          animation: none;
          opacity: 0.2;
        }

        /* Simplified Keyframe Animations */
        @keyframes spin-1 {
          from { transform: rotate(0deg) scale(1); }
          to { transform: rotate(360deg) scale(1); }
        }

        @keyframes spin-2 {
          from { transform: rotate(0deg) scale(0.8); }
          to { transform: rotate(-360deg) scale(0.8); }
        }

        @keyframes spin-3 {
          from { transform: rotate(0deg) scale(0.6); }
          to { transform: rotate(360deg) scale(0.6); }
        }

        @keyframes spin-4 {
          from { transform: rotate(0deg) scale(0.4); }
          to { transform: rotate(-360deg) scale(0.4); }
        }

        @keyframes spin-5 {
          from { transform: rotate(0deg) scale(0.2); }
          to { transform: rotate(360deg) scale(0.2); }
        }

        @keyframes pulse-1 {
          0% { opacity: 0.3; }
          50% { opacity: 0.8; }
          100% { opacity: 0.3; }
        }

        @keyframes pulse-2 {
          0% { opacity: 0.2; transform: scale(0.9); }
          50% { opacity: 0.7; transform: scale(1.1); }
          100% { opacity: 0.2; transform: scale(0.9); }
        }

        @keyframes particle-float {
          0%, 100% { transform: translate(0, 0); }
          25% { transform: translate(5px, -5px); }
          50% { transform: translate(-3px, -8px); }
          75% { transform: translate(-7px, -3px); }
        }

        @keyframes twinkle {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 1; }
        }

        @keyframes ripple-pulse {
          0% { transform: scale(0.9); opacity: 0.2; }
          50% { transform: scale(1.1); opacity: 1; }
          100% { transform: scale(0.9); opacity: 0.2; }
        }

        @keyframes kaleidoscope-spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        @keyframes fractal-zoom {
          0% { transform: scale(0.8); }
          50% { transform: scale(1.2); }
          100% { transform: scale(0.8); }
        }

        @keyframes fractal-spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        /* Override MixmotionPlayer canvas/artwork background effects */
        .mixmotion-player canvas:not(.player-canvas),
        .mixmotion-player video:not(.player-video),
        .mixmotion-canvas,
        [data-mixmotion] canvas,
        [data-mixmotion] video,
        [class*="canvas"]:not(.spiral-layer):not(.effect-layer),
        [class*="backdrop"],
        [class*="background"]:not(.bg-black),
        [class*="artwork"] {
          opacity: 0 !important;
          visibility: hidden !important;
          z-index: -999 !important;
          display: none !important;
        }

        .mixmotion-player > div > canvas,
        .mixmotion-player > div > video {
          opacity: 0 !important;
          pointer-events: none !important;
        }

        .lollipop-spiral,
        .spiral-layer,
        .effect-layer {
          z-index: 1 !important;
          display: block !important;
          visibility: visible !important;
        }

        .mixmotion-player .controls,
        .mixmotion-player [class*="control"],
        .mixmotion-player [class*="button"],
        .mixmotion-player [class*="ui"] {
          z-index: 10 !important;
          position: relative !important;
        }

        /* Spotlight Canvas System */
        .spotlight-canvas {
          width: 100%;
          height: 100%;
          position: relative;
          transition: all 0.8s ease-in-out;
        }

        .spotlight-layer {
          position: absolute;
          inset: 0;
          transition: all 1s ease-in-out;
        }

        /* Spotlight Beam Patterns */
        .spotlight-beams {
          background: 
            /* Main diagonal stage beams */
            linear-gradient(125deg, transparent 0%, rgba(65, 105, 225, 0.8) 15%, rgba(100, 149, 237, 1) 25%, transparent 35%),
            linear-gradient(55deg, transparent 10%, rgba(138, 43, 226, 0.9) 25%, rgba(147, 112, 219, 1) 35%, transparent 50%),
            linear-gradient(85deg, transparent 5%, rgba(30, 144, 255, 0.8) 20%, rgba(135, 206, 235, 1) 30%, transparent 45%),
            linear-gradient(155deg, transparent 15%, rgba(75, 0, 130, 0.9) 30%, rgba(106, 90, 205, 1) 40%, transparent 55%),
            linear-gradient(35deg, transparent 20%, rgba(0, 102, 255, 0.8) 35%, rgba(65, 105, 225, 1) 45%, transparent 60%);
          opacity: 1;
          mix-blend-mode: normal;
        }

        .spotlight-sweep {
          background: 
            /* Moving sweep beams */
            linear-gradient(45deg, transparent 40%, rgba(65, 105, 225, 1) 50%, transparent 60%),
            linear-gradient(135deg, transparent 35%, rgba(138, 43, 226, 0.9) 45%, transparent 55%),
            linear-gradient(75deg, transparent 45%, rgba(30, 144, 255, 0.8) 55%, transparent 65%);
          opacity: 1;
          mix-blend-mode: normal;
        }

        .spotlight-atmosphere {
          background: 
            /* Atmospheric fog/haze effects */
            radial-gradient(ellipse at 20% 30%, rgba(65, 105, 225, 0.4) 20%, transparent 50%),
            radial-gradient(ellipse at 80% 20%, rgba(138, 43, 226, 0.3) 25%, transparent 55%),
            radial-gradient(ellipse at 30% 80%, rgba(30, 144, 255, 0.4) 30%, transparent 60%),
            radial-gradient(ellipse at 70% 70%, rgba(75, 0, 130, 0.3) 35%, transparent 65%);
          opacity: 1;
          mix-blend-mode: normal;
        }

        /* Spotlight Mode Patterns */
        .spotlight-canvas[data-spotlight-mode="0"] .spotlight-beams { opacity: 1; }
        .spotlight-canvas[data-spotlight-mode="0"] .spotlight-sweep { opacity: 1; }
        .spotlight-canvas[data-spotlight-mode="0"] .spotlight-atmosphere { opacity: 1; }

        .spotlight-canvas[data-spotlight-mode="1"] .spotlight-beams { opacity: 1; }
        .spotlight-canvas[data-spotlight-mode="1"] .spotlight-sweep { opacity: 1; }
        .spotlight-canvas[data-spotlight-mode="1"] .spotlight-atmosphere { opacity: 0.8; }

        .spotlight-canvas[data-spotlight-mode="2"] .spotlight-beams { opacity: 1; }
        .spotlight-canvas[data-spotlight-mode="2"] .spotlight-sweep { opacity: 1; }
        .spotlight-canvas[data-spotlight-mode="2"] .spotlight-atmosphere { opacity: 1; }

        .spotlight-canvas[data-spotlight-mode="3"] .spotlight-beams { opacity: 0.9; }
        .spotlight-canvas[data-spotlight-mode="3"] .spotlight-sweep { opacity: 1; }
        .spotlight-canvas[data-spotlight-mode="3"] .spotlight-atmosphere { opacity: 1; }

        /* Active Spotlight Animations */
        .spotlight-active .spotlight-beams {
          animation: beam-sweep 8s ease-in-out infinite, beam-pulse 3s ease-in-out infinite alternate;
        }

        .spotlight-active .spotlight-sweep {
          animation: sweep-rotate 6s linear infinite, sweep-intensity 2.5s ease-in-out infinite alternate;
        }

        .spotlight-active .spotlight-atmosphere {
          animation: atmosphere-drift 12s ease-in-out infinite, atmosphere-glow 4s ease-in-out infinite alternate;
        }

        /* Inactive Spotlight State */
        .spotlight-inactive {
          filter: brightness(0.8) saturate(1);
          transform: scale(1);
        }

        .spotlight-inactive .spotlight-layer {
          opacity: 0.7;
          animation: none;
        }

        /* Spotlight Keyframe Animations */
        @keyframes beam-sweep {
          0% { transform: rotate(0deg) scaleX(1); }
          25% { transform: rotate(2deg) scaleX(1.05); }
          50% { transform: rotate(-1deg) scaleX(1.1); }
          75% { transform: rotate(3deg) scaleX(1.03); }
          100% { transform: rotate(0deg) scaleX(1); }
        }

        @keyframes beam-pulse {
          0% { opacity: 0.6; filter: brightness(1); }
          50% { opacity: 1; filter: brightness(1.4); }
          100% { opacity: 0.6; filter: brightness(1); }
        }

        @keyframes sweep-rotate {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        @keyframes sweep-intensity {
          0% { opacity: 0.5; filter: blur(0px); }
          50% { opacity: 1; filter: blur(1px); }
          100% { opacity: 0.5; filter: blur(0px); }
        }

        @keyframes atmosphere-drift {
          0% { transform: translateX(0) translateY(0) scale(1); }
          25% { transform: translateX(2px) translateY(-1px) scale(1.02); }
          50% { transform: translateX(-1px) translateY(2px) scale(1.05); }
          75% { transform: translateX(3px) translateY(1px) scale(1.01); }
          100% { transform: translateX(0) translateY(0) scale(1); }
        }

        @keyframes atmosphere-glow {
          0% { filter: brightness(1) saturate(1); }
          50% { filter: brightness(1.3) saturate(1.4); }
          100% { filter: brightness(1) saturate(1); }
        }
      `}</style>
      
      <section className="section-padding bg-gray-50 dark:bg-gray-900 relative z-10 transition-colors duration-300">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex items-center justify-center gap-2 mb-6">
            <Music className="w-6 h-6 text-lollipop-purple animate-pulse" />
            <h2 className="text-2xl md:text-3xl font-bold text-lollipop-dark dark:text-white text-center">Latest Mixes</h2>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 md:p-(-9) shadow-lg">
              <div className="relative w-full aspect-[9/16] md:aspect-[1/1] rounded-lg overflow-hidden bg-black">
                <SpiralOverlay isPlaying={isPlaying} />
                <SpotlightCanvas isPlaying={isPlaying} />
                <MixmotionPlayer
                  url={url}
                  enableBackdropVideo={false}
                  autoPlay={false}
                  width="100%"
                  height="100%"
                  collapsed={false}
                  customButtons={[
                    { action: "previous", align: "center" },
                    { action: "playpause", align: "center" },
                    { action: "next", align: "center" },
                    { action: "videos", align: "right" },
                    { action: "save", align: "right" },
                    {
                      action: "custom",
                      align: "right",
                      label: "Share",
                      faIcon: faShare,
                      onPress: () => {
                        navigator.clipboard.writeText(window.location.href);
                      },
                    },
                  ]}
                />
              </div>
         
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default MixmotionSection; 