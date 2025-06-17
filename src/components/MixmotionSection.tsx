import React, { useState, useEffect } from 'react';
import { MixmotionPlayer, useStore } from 'mixmotion-player';
import styles from './MixmotionSection.module.css';

interface MixmotionSectionProps {
  url: string;
  autoPlay?: boolean;
  customButtons?: any[]; // Using any[] to avoid TypeScript issues with MixmotionPlayer types
}

// Auto-detect environment based on hostname
const getEnvironment = () => {
  const hostname = window.location.hostname;
  return {
    isDevelopment: hostname === 'localhost' || hostname === '127.0.0.1' || hostname.includes('local'),
    isProduction: hostname.includes('vercel.app') || hostname.includes('.com') || hostname.includes('.org'),
    hostname
  };
};

const SpiralOverlay = ({ isPlaying }: { isPlaying: boolean }) => {
  const [effectMode, setEffectMode] = useState(0);
  const [colorPhase, setColorPhase] = useState(0);
  
  // Cycle through different effect modes every 8 seconds when playing
  useEffect(() => {
    if (!isPlaying) return;
    
    const effectTimer = setInterval(() => {
      setEffectMode(prev => (prev + 1) % 6);
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
    <div className="absolute top-16 md:top-0 left-0 right-0 bottom-0 z-[0] flex items-center justify-center pointer-events-none">
      <div
        className={`${styles.lollipopSpiral} ${isPlaying ? styles.musicPlaying : styles.musicStopped}`}
        data-effect-mode={effectMode}
        style={{
          '--color-phase': `${colorPhase}deg`,
          '--effect-mode': effectMode
        } as React.CSSProperties}
      >
        {/* Main spiral layers */}
        <div className={`${styles.spiralLayer} ${styles.spiral1}`}></div>
        <div className={`${styles.spiralLayer} ${styles.spiral2}`}></div>
        <div className={`${styles.spiralLayer} ${styles.spiral3}`}></div>
        <div className={`${styles.spiralLayer} ${styles.spiral4}`}></div>
        <div className={`${styles.spiralLayer} ${styles.spiral5}`}></div>
        
        {/* Effect layers */}
        <div className={`${styles.effectLayer} ${styles.effectParticles}`}></div>
        <div className={`${styles.effectLayer} ${styles.effectRipples}`}></div>
        <div className={`${styles.effectLayer} ${styles.effectKaleidoscope}`}></div>
        <div className={`${styles.effectLayer} ${styles.effectFractals}`}></div>
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
      setSpotlightMode(prev => (prev + 1) % 4);
    }, 6000);

    return () => clearInterval(spotlightTimer);
  }, [isPlaying]);

  return (
    <div className="absolute inset-0 z-[1] pointer-events-none">
      <div
        className={`${styles.spotlightCanvas} ${isPlaying ? styles.spotlightActive : styles.spotlightInactive}`}
        data-spotlight-mode={spotlightMode}
      >
        <div className={`${styles.spotlightLayer} ${styles.spotlightBeams}`}></div>
        <div className={`${styles.spotlightLayer} ${styles.spotlightSweep}`}></div>
        <div className={`${styles.spotlightLayer} ${styles.spotlightAtmosphere}`}></div>
      </div>
    </div>
  );
};

class MixmotionErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(_: Error) {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.warn('MixmotionPlayer error caught:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="w-full h-full flex items-center justify-center bg-black text-white">
          <div className="text-center">
            <p className="mb-2">Audio player temporarily unavailable</p>
            <p className="text-sm text-white/60">Please refresh the page to try again</p>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

const MixmotionSection: React.FC<MixmotionSectionProps> = ({
  url,
  autoPlay = false,
  customButtons = [
    { action: "previous", align: "center" },
    { action: "playpause", align: "center" },
    { action: "next", align: "center" },
  ]
}) => {
  const [playerError, setPlayerError] = useState(false);
  const isPlaying = useStore((state) => state.playing);
  const environment = getEnvironment();

  // Targeted scroll protection - preserve player functionality
  useEffect(() => {
    const protectPageScroll = () => {
      // Only protect against global scroll blocking, not local iframe/component blocking
      if (document.body.style.overflow === 'hidden' && 
          !document.body.hasAttribute('data-mixmotion-scroll-lock')) {
        document.body.style.overflow = 'auto';
      }
      if (document.documentElement.style.overflow === 'hidden' && 
          !document.documentElement.hasAttribute('data-mixmotion-scroll-lock')) {
        document.documentElement.style.overflow = 'auto';
      }
    };

    // Less aggressive monitoring to avoid interfering with player
    const scrollProtector = setInterval(protectPageScroll, 2000);

    return () => clearInterval(scrollProtector);
  }, []);

  // Auto-switching error suppression based on environment
  useEffect(() => {
    // Comprehensive error suppression for MixmotionPlayer issues
    const originalConsoleError = console.error;
    const originalConsoleWarn = console.warn;
    const originalConsoleLog = console.log;

    console.error = (...args) => {
      const message = args.join(' ');
      const suppressedPatterns = [
        'Permissions policy violation',
        'encrypted-media is not allowed',
        'Failed to execute \'postMessage\'',
        'player-widget.mixcloud.com',
        'app.mixcloud.com',
        'Encrypted Media access has been blocked',
        'shows\\[showIndex\\]\\.enable_cover_image',
        'TypeError: Failed to fetch \\(app\\.mixcloud\\.com\\)',
        'Playerwidget received message from incorrect origin',
        'A listener indicated an asynchronous response by returning true'
      ];
      
      if (!suppressedPatterns.some(pattern => message.match(new RegExp(pattern, 'i')))) {
        originalConsoleError.apply(console, args);
      }
    };

    console.warn = (...args) => {
      const message = args.join(' ');
      const suppressedPatterns = [
        'mixcloud',
        'encrypted-media',
        'postMessage',
        'player-widget',
        'permissions policy'
      ];
      
      if (!suppressedPatterns.some(pattern => message.toLowerCase().includes(pattern.toLowerCase()))) {
        originalConsoleWarn.apply(console, args);
      }
    };

    console.log = (...args) => {
      const message = args.join(' ');
      if (message.includes('shows[showIndex].enable_cover_image') && message.includes('undefined')) {
        // Suppress this specific undefined access error
        return;
      }
      originalConsoleLog.apply(console, args);
    };

    // Global error handler for runtime errors
    const originalWindowError = window.onerror;
    window.onerror = function(msg, url, lineNo, columnNo, error) {
      if (typeof msg === 'string') {
        const suppressedErrors = [
          'Cannot read prop',
          'Failed to fetch',
          'postMessage',
          'mixcloud',
          'encrypted-media'
        ];
        
        if (suppressedErrors.some(errorType => msg.includes(errorType))) {
          return true; // Prevent default error handling
        }
      }
      
      if (originalWindowError) {
        return originalWindowError.call(window, msg, url, lineNo, columnNo, error);
      }
      return false;
    };

    return () => {
      console.error = originalConsoleError;
      console.warn = originalConsoleWarn;
      console.log = originalConsoleLog;
      window.onerror = originalWindowError;
    };
  }, []);

  // Environment-specific iframe handling with better interaction support
  useEffect(() => {
    const patchIframes = () => {
      const iframes = document.querySelectorAll('iframe[src*="mixcloud.com"]') as NodeListOf<HTMLIFrameElement>;
      iframes.forEach(iframe => {
        try {
          // Auto-switch iframe attributes based on environment
          if (environment.isDevelopment) {
            // Development: More permissive settings
            iframe.setAttribute('allow', 'encrypted-media; autoplay; fullscreen; microphone');
            iframe.setAttribute('sandbox', 'allow-scripts allow-same-origin allow-presentation allow-pointer-lock');
          } else {
            // Production: Standard settings
            iframe.setAttribute('allow', 'encrypted-media; autoplay; fullscreen');
            iframe.removeAttribute('sandbox');
          }
          
          iframe.style.border = 'none';
          iframe.style.width = '100%';
          iframe.style.height = '100%';
          iframe.style.display = 'block';
          // Ensure proper interaction while maintaining layout
          iframe.style.position = 'absolute';
          iframe.style.top = '0';
          iframe.style.left = '0';
          iframe.style.pointerEvents = 'auto';
          iframe.style.zIndex = '25';
        } catch (e) {
          // Ignore cross-origin access errors
        }
      });
    };

    // Patch iframes periodically
    const intervalId = setInterval(patchIframes, 1000);
    return () => clearInterval(intervalId);
  }, [environment]);

  // Environment-specific postMessage handling
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      let allowedOrigins = [
        'https://player-widget.mixcloud.com',
        'https://www.mixcloud.com',
        'https://mixcloud.com'
      ];
      
      // Auto-switch based on environment
      if (environment.isDevelopment) {
        allowedOrigins.push(
          'http://localhost:8080',
          'http://127.0.0.1:8080',
          `http://${environment.hostname}:8080`,
          `http://${environment.hostname}:5173`,
          `http://${environment.hostname}:8082`, // Added for current dev server
          'http://localhost:5173',
          'http://127.0.0.1:5173',
          'http://localhost:8082',
          'http://127.0.0.1:8082'
        );
      }
      
      const isAllowedOrigin = allowedOrigins.some(origin => 
        event.origin === origin || 
        (environment.isDevelopment && event.origin.includes('localhost')) ||
        (environment.isDevelopment && event.origin.includes('127.0.0.1'))
      );
      
      if (isAllowedOrigin) {
        console.debug(`[${environment.isDevelopment ? 'DEV' : 'PROD'}] Received message from Mixcloud:`, event.data);
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [environment]);

  // Validate URL format
  const isValidUrl = url && (url.includes('mixcloud.com') || url.includes('soundcloud.com'));

  if (!isValidUrl) {
    return (
      <div className="relative w-full aspect-[9/16] md:aspect-[1/1] rounded-lg overflow-hidden bg-black">
        <SpiralOverlay isPlaying={false} />
        <SpotlightCanvas isPlaying={false} />
        <div className="absolute inset-0 flex items-center justify-center text-white">
          <div className="text-center">
            <p className="mb-2">Invalid music URL</p>
            <p className="text-sm text-white/60">Please provide a valid Mixcloud or SoundCloud URL</p>
            <p className="text-xs text-white/40 mt-2">Environment: {environment.isDevelopment ? 'Development' : 'Production'}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full aspect-[9/16] md:aspect-[1/1] rounded-lg overflow-hidden bg-black">
      <SpiralOverlay isPlaying={isPlaying} />
      <SpotlightCanvas isPlaying={isPlaying} />
      
      {/* Player container with proper interaction support and higher z-index */}
      <div 
        className={`absolute inset-0 z-[10] ${styles.playerContainer || ''}`}
        style={{
          position: 'relative',
          contain: 'layout',
          // Ensure this container is above all visual effects
          zIndex: 15
        }}
      >
        <MixmotionErrorBoundary>
          <MixmotionPlayer
            url={url}
            enableBackdropVideo={false}
            autoPlay={autoPlay}
            width="100%"
            height="100%"
            collapsed={false}
            customButtons={customButtons}
            onError={() => setPlayerError(true)}
          />
        </MixmotionErrorBoundary>
      </div>
      
      {/* Environment indicator (dev only) - highest z-index */}
      {environment.isDevelopment && (
        <div className="absolute top-2 right-2 z-[20] text-xs text-white/40 bg-black/50 px-2 py-1 rounded">
          DEV: {environment.hostname}:8082 | Playing: {isPlaying ? '▶️' : '⏸️'} | Styles: {styles.playerContainer ? '✓' : '✗'}
        </div>
      )}
    </div>
  );
};

export default MixmotionSection; 