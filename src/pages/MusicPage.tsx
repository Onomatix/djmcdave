
import { useState } from "react";
import { musicData } from "../data/musicData";
import { Filter, ExternalLink, Play } from "lucide-react";
import ScrollToTop from "../components/ScrollToTop";

const genres = ["All", "Classic Nu Disco", "Classic House Grooves", "80s Extended 12'' Remix", "Euro Disco Club Hits", "Old Skool R&B Classics"];

const MusicPage = () => {
  const [activeGenre, setActiveGenre] = useState("All");
  const [hoveredTrack, setHoveredTrack] = useState<number | null>(null);

  const filteredTracks = musicData.filter(track => {
    return activeGenre === "All" || track.genre === activeGenre;
  });

  return (
    <div className="min-h-screen pt-20 bg-dj-dark">
      <ScrollToTop />
      
      <section className="content-section">
        <h1 className="section-title text-center mb-2">My Music Collection</h1>
        <p className="section-subtitle mb-8">
          Explore my latest mixes and productions across various genres
        </p>
        
        {/* Filters */}
        <div className="mb-10 p-6 glass-card">
          <div className="flex items-center gap-2 mb-6">
            <Filter className="text-dj-purple" size={24} />
            <h2 className="text-xl font-bold text-white">Filter Tracks</h2>
          </div>
          
          <div>
            <h3 className="text-white text-lg mb-3 font-medium">Genre</h3>
            <div className="flex flex-wrap gap-2">
              {genres.map(genre => (
                <button
                  key={genre}
                  className={`filter-btn ${activeGenre === genre ? 'active' : ''}`}
                  onClick={() => setActiveGenre(genre)}
                >
                  {genre}
                </button>
              ))}
            </div>
          </div>
        </div>
        
        {/* Results count */}
        <div className="mb-6">
          <p className="text-white/70">
            Showing <span className="text-dj-pink font-medium">{filteredTracks.length}</span> {filteredTracks.length === 1 ? 'track' : 'tracks'}
          </p>
        </div>
        
        {/* Music Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTracks.map(track => (
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
                    href={track.mixcloudUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="h-16 w-16 bg-dj-purple/90 rounded-full flex items-center justify-center transform translate-y-8 group-hover:translate-y-0 transition-transform duration-500"
                  >
                    <Play size={30} className="text-white ml-1" />
                  </a>
                </div>
                
                <div className="absolute top-3 right-3">
                  <span className="text-xs font-medium bg-dj-purple/80 text-white px-3 py-1 rounded-full backdrop-blur-sm">
                    {track.genre}
                  </span>
                </div>
              </div>
              
              <div className="p-5">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-white text-xl font-bold">{track.title}</h3>
                  <span className="text-white/70 text-sm">{track.duration}</span>
                </div>
                
                <div className="flex justify-between items-center mb-4">
                  <span className="text-dj-pink text-sm">{track.genre}</span>
                  <span className="text-white/50 text-sm">{track.year}</span>
                </div>
                
                <a 
                  href={track.mixcloudUrl}
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
        
        {filteredTracks.length === 0 && (
          <div className="p-10 text-center">
            <p className="text-white/70 text-lg">No tracks found with the selected filters.</p>
            <button 
              onClick={() => {
                setActiveGenre("All");
              }}
              className="accent-btn mt-4"
            >
              Reset Filters
            </button>
          </div>
        )}
      </section>
    </div>
  );
};

export default MusicPage;
