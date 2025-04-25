
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ExternalLink, Play } from 'lucide-react';
import { musicData } from '../data/musicData';

const MusicSection = () => {
  const [hoveredTrack, setHoveredTrack] = useState<number | null>(null);
  
  // Display only the first 3 tracks on the home page
  const featuredTracks = musicData.slice(0, 3);
  
  return (
    <section id="music" className="content-section">
      <h2 className="section-title text-center">My Music</h2>
      <p className="section-subtitle">
        Explore my latest releases and mixes across various genres
      </p>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {featuredTracks.map(track => (
          <div 
            key={track.id} 
            className="glass-card overflow-hidden group transition-all duration-300 hover:shadow-lg hover:shadow-dj-purple/20"
            onMouseEnter={() => setHoveredTrack(track.id)}
            onMouseLeave={() => setHoveredTrack(null)}
          >
            <div className="relative h-48 overflow-hidden">
              <img 
                src={track.image} 
                alt={track.title} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <a 
                  href={`https://www.mixcloud.com/soundkontrols/`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="h-14 w-14 bg-dj-purple/90 rounded-full flex items-center justify-center transform translate-y-8 group-hover:translate-y-0 transition-transform duration-500"
                >
                  <Play size={24} className="text-white ml-1" />
                </a>
              </div>
              
              <div className="absolute top-3 right-3">
                <span className="text-xs font-medium bg-dj-purple/80 text-white px-3 py-1 rounded-full backdrop-blur-sm">
                  {track.genre}
                </span>
              </div>
            </div>
            
            <div className="p-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-white text-xl font-bold">{track.title}</h3>
                <span className="text-white/70 text-sm">{track.duration}</span>
              </div>
              
              <div className="flex justify-between items-center mb-4">
                <span className="text-dj-pink text-sm">{track.genre}</span>
                <span className="text-white/50 text-sm">{track.year}</span>
              </div>
              
              <a 
                href={`https://www.mixcloud.com/soundkontrols/`}
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center text-white/80 hover:text-dj-pink transition-colors group"
              >
                <span className="mr-2">Listen on Mixcloud</span>
                <ExternalLink size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
              </a>
            </div>
          </div>
        ))}
      </div>
      
      <div className="text-center mt-12">
        <Link to="/music" className="accent-btn">
          See All Tracks
        </Link>
      </div>
    </section>
  );
};

export default MusicSection;
