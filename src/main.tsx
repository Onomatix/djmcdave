import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Global console override for development - suppress known MixmotionPlayer issues
if (import.meta.env.DEV) {
  const originalError = console.error;
  const originalWarn = console.warn;
  
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
      'TypeError: Failed to fetch \\(app\\.mixcloud\\.com\\)'
    ];
    
    if (!suppressedPatterns.some(pattern => message.match(new RegExp(pattern, 'i')))) {
      originalError.apply(console, args);
    }
  };
  
  console.warn = (...args) => {
    const message = args.join(' ');
    const suppressedPatterns = [
      'mixcloud',
      'encrypted-media',
      'postMessage',
      'player-widget'
    ];
    
    if (!suppressedPatterns.some(pattern => message.toLowerCase().includes(pattern.toLowerCase()))) {
      originalWarn.apply(console, args);
    }
  };
}

createRoot(document.getElementById("root")!).render(<App />);
